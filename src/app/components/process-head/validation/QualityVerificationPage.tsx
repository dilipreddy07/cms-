"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  ShieldCheck,
  Search,
  UserCheck,
} from "lucide-react";
import { Input } from "@/app/components/ui/input";

type ComplianceStatus = "Compliant" | "Non-Compliant" | "Partial";

interface ComplianceItem {
  id: string;
  item: string;
  standard: string;
  status: ComplianceStatus;
  verifiedBy: string | null;
  verifiedDate: string | null;
  notes: string;
}

interface StandardBreakdown {
  standard: string;
  total: number;
  compliant: number;
  nonCompliant: number;
  partial: number;
}

const initialItems: ComplianceItem[] = [
  {
    id: "1",
    item: "Document Control Procedures",
    standard: "ISO 9001",
    status: "Compliant",
    verifiedBy: "Sarah Chen",
    verifiedDate: "2026-03-20",
    notes: "All documents properly versioned and controlled.",
  },
  {
    id: "2",
    item: "Environmental Monitoring System",
    standard: "ISO 14001",
    status: "Non-Compliant",
    verifiedBy: "Mark Johnson",
    verifiedDate: "2026-03-19",
    notes: "Monitoring frequency below required threshold.",
  },
  {
    id: "3",
    item: "Risk Assessment Methodology",
    standard: "ISO 31000",
    status: "Compliant",
    verifiedBy: "Emily Davis",
    verifiedDate: "2026-03-18",
    notes: "Risk framework properly implemented.",
  },
  {
    id: "4",
    item: "Incident Reporting Process",
    standard: "ISO 45001",
    status: "Partial",
    verifiedBy: null,
    verifiedDate: null,
    notes: "Reporting mechanism exists but response times not documented.",
  },
  {
    id: "5",
    item: "Corrective Action Procedures",
    standard: "ISO 9001",
    status: "Compliant",
    verifiedBy: "Sarah Chen",
    verifiedDate: "2026-03-17",
    notes: "CAPA process well established and tracked.",
  },
  {
    id: "6",
    item: "Waste Management Protocol",
    standard: "ISO 14001",
    status: "Partial",
    verifiedBy: null,
    verifiedDate: null,
    notes: "Waste segregation in place, disposal records incomplete.",
  },
  {
    id: "7",
    item: "Information Security Controls",
    standard: "ISO 27001",
    status: "Non-Compliant",
    verifiedBy: "James Wilson",
    verifiedDate: "2026-03-16",
    notes: "Access controls need updating; encryption not fully deployed.",
  },
  {
    id: "8",
    item: "Employee Training Records",
    standard: "ISO 45001",
    status: "Compliant",
    verifiedBy: "Emily Davis",
    verifiedDate: "2026-03-21",
    notes: "All training records up to date.",
  },
  {
    id: "9",
    item: "Supplier Evaluation Criteria",
    standard: "ISO 9001",
    status: "Compliant",
    verifiedBy: "Sarah Chen",
    verifiedDate: "2026-03-15",
    notes: "Supplier assessment process documented and followed.",
  },
  {
    id: "10",
    item: "Business Continuity Plan",
    standard: "ISO 27001",
    status: "Partial",
    verifiedBy: null,
    verifiedDate: null,
    notes: "Plan exists but has not been tested in the last 12 months.",
  },
  {
    id: "11",
    item: "Emergency Response Procedures",
    standard: "ISO 45001",
    status: "Compliant",
    verifiedBy: "Mark Johnson",
    verifiedDate: "2026-03-14",
    notes: "Drills conducted quarterly as required.",
  },
  {
    id: "12",
    item: "Risk Treatment Plans",
    standard: "ISO 31000",
    status: "Non-Compliant",
    verifiedBy: "James Wilson",
    verifiedDate: "2026-03-13",
    notes: "Treatment plans not updated after latest risk assessment.",
  },
];

function QualityVerificationPage() {
  const [items, setItems] = useState<ComplianceItem[]>(initialItems);
  const [filterStandard, setFilterStandard] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = items.filter((item) => {
    const matchesStandard = filterStandard === "all" || item.standard === filterStandard;
    const matchesStatus = filterStatus === "all" || item.status === filterStatus;
    const matchesSearch = item.item.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStandard && matchesStatus && matchesSearch;
  });

  const overallScore = Math.round(
    (items.filter((i) => i.status === "Compliant").length / items.length) * 100
  );

  const standards = Array.from(new Set(items.map((i) => i.standard)));

  const standardBreakdowns: StandardBreakdown[] = standards.map((standard) => {
    const standardItems = items.filter((i) => i.standard === standard);
    return {
      standard,
      total: standardItems.length,
      compliant: standardItems.filter((i) => i.status === "Compliant").length,
      nonCompliant: standardItems.filter((i) => i.status === "Non-Compliant").length,
      partial: standardItems.filter((i) => i.status === "Partial").length,
    };
  });

  const handleMarkVerified = (itemId: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              status: "Compliant" as ComplianceStatus,
              verifiedBy: "Current User",
              verifiedDate: "2026-03-22",
            }
          : item
      )
    );
  };

  const getStatusBadge = (status: ComplianceStatus) => {
    switch (status) {
      case "Compliant":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="mr-1 h-3 w-3" /> Compliant
          </Badge>
        );
      case "Non-Compliant":
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="mr-1 h-3 w-3" /> Non-Compliant
          </Badge>
        );
      case "Partial":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <AlertTriangle className="mr-1 h-3 w-3" /> Partial
          </Badge>
        );
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Quality Verification</h2>
        <p className="text-muted-foreground">
          Ensure compliance with organizational and regulatory standards
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5" />
            Overall Compliance Score
          </CardTitle>
          <CardDescription>Aggregate compliance across all standards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className={`text-4xl font-bold ${getScoreColor(overallScore)}`}>
              {overallScore}%
            </div>
            <div className="flex-1">
              <Progress value={overallScore} className="h-3" />
              <p className="text-xs text-muted-foreground mt-1">
                {items.filter((i) => i.status === "Compliant").length} of {items.length} items
                fully compliant
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {standardBreakdowns.map((breakdown) => {
          const score = Math.round((breakdown.compliant / breakdown.total) * 100);
          return (
            <Card key={breakdown.standard}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{breakdown.standard}</CardTitle>
                <CardDescription>{breakdown.total} items</CardDescription>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}%</div>
                <Progress value={score} className="h-2 mt-2" />
                <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
                  <span className="text-green-600">{breakdown.compliant} pass</span>
                  <span className="text-yellow-600">{breakdown.partial} partial</span>
                  <span className="text-red-600">{breakdown.nonCompliant} fail</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Compliance Checklist</CardTitle>
          <CardDescription>
            Detailed view of all compliance items and their verification status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterStandard} onValueChange={setFilterStandard}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Standard" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Standards</SelectItem>
                  {standards.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Compliant">Compliant</SelectItem>
                  <SelectItem value="Non-Compliant">Non-Compliant</SelectItem>
                  <SelectItem value="Partial">Partial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Standard</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Verified By</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{item.item}</p>
                        <p className="text-xs text-muted-foreground">{item.notes}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.standard}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>
                      {item.verifiedBy ? (
                        <div className="flex items-center gap-1">
                          <UserCheck className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{item.verifiedBy}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">Not verified</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {item.verifiedDate || "-"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {item.status !== "Compliant" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={() => handleMarkVerified(item.id)}
                        >
                          <CheckCircle className="mr-1 h-4 w-4" />
                          Mark Verified
                        </Button>
                      )}
                      {item.status === "Compliant" && (
                        <span className="text-sm text-green-600 flex items-center justify-end gap-1">
                          <CheckCircle className="h-4 w-4" /> Verified
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {filteredItems.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No compliance items found matching your criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default QualityVerificationPage;
