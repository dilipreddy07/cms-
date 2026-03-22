"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
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
  Shield,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  TrendingDown,
  Clock,
} from "lucide-react";

type Severity = "Low" | "Medium" | "High";
type MitigationStatus = "Not Started" | "In Progress" | "Mitigated";

interface Risk {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  mitigationStatus: MitigationStatus;
  owner: string;
}

const mockRisks: Risk[] = [
  {
    id: "RSK-001",
    title: "Unauthorized Data Access",
    description: "Risk of unauthorized access to sensitive data due to insufficient role-based access controls.",
    severity: "High",
    mitigationStatus: "In Progress",
    owner: "Sarah Chen",
  },
  {
    id: "RSK-002",
    title: "Single Point of Failure in Authentication",
    description: "MFA rollout incomplete; single-factor auth remains on legacy systems.",
    severity: "High",
    mitigationStatus: "Not Started",
    owner: "Mark Johnson",
  },
  {
    id: "RSK-003",
    title: "Outdated Encryption Protocols",
    description: "Several internal services still using TLS 1.0 for inter-service communication.",
    severity: "High",
    mitigationStatus: "In Progress",
    owner: "Lisa Wang",
  },
  {
    id: "RSK-004",
    title: "Insufficient Backup Frequency",
    description: "Critical database backups running on a 24-hour cycle instead of the required 4-hour cycle.",
    severity: "Medium",
    mitigationStatus: "Mitigated",
    owner: "David Kim",
  },
  {
    id: "RSK-005",
    title: "Vendor SLA Non-Compliance",
    description: "Cloud provider has not met agreed-upon uptime SLA for three consecutive months.",
    severity: "Medium",
    mitigationStatus: "In Progress",
    owner: "Priya Patel",
  },
  {
    id: "RSK-006",
    title: "Incomplete Audit Logging",
    description: "Some microservices do not emit audit logs for state-changing operations.",
    severity: "Medium",
    mitigationStatus: "Not Started",
    owner: "Mark Johnson",
  },
  {
    id: "RSK-007",
    title: "Delayed Patch Management",
    description: "Non-critical security patches have not been applied within the 30-day policy window.",
    severity: "Low",
    mitigationStatus: "Mitigated",
    owner: "Sarah Chen",
  },
  {
    id: "RSK-008",
    title: "Training Material Gaps",
    description: "Security awareness training does not cover latest phishing techniques.",
    severity: "Low",
    mitigationStatus: "In Progress",
    owner: "Amanda Foster",
  },
  {
    id: "RSK-009",
    title: "Physical Access Control Weakness",
    description: "Server room badge access list has not been reviewed in over 6 months.",
    severity: "Low",
    mitigationStatus: "Not Started",
    owner: "David Kim",
  },
];

const severityConfig: Record<Severity, { className: string; color: string }> = {
  Low: { className: "border-green-300 bg-green-50 text-green-800 hover:bg-green-50", color: "text-green-600" },
  Medium: { className: "border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-50", color: "text-amber-600" },
  High: { className: "border-red-300 bg-red-50 text-red-800 hover:bg-red-50", color: "text-red-600" },
};

const mitigationConfig: Record<MitigationStatus, { className: string; icon: typeof Clock }> = {
  "Not Started": { className: "border-slate-300 bg-slate-50 text-slate-800 hover:bg-slate-50", icon: Clock },
  "In Progress": { className: "border-blue-300 bg-blue-50 text-blue-800 hover:bg-blue-50", icon: ShieldAlert },
  Mitigated: { className: "border-green-300 bg-green-50 text-green-800 hover:bg-green-50", icon: ShieldCheck },
};

export default function RiskManagementPage() {
  const [risks, setRisks] = useState<Risk[]>(mockRisks);

  const handleMitigationChange = (riskId: string, newStatus: MitigationStatus) => {
    setRisks((prev) =>
      prev.map((risk) =>
        risk.id === riskId ? { ...risk, mitigationStatus: newStatus } : risk
      )
    );
  };

  const highCount = risks.filter((r) => r.severity === "High").length;
  const mediumCount = risks.filter((r) => r.severity === "Medium").length;
  const lowCount = risks.filter((r) => r.severity === "Low").length;
  const mitigatedCount = risks.filter((r) => r.mitigationStatus === "Mitigated").length;

  const summaryCards = [
    {
      title: "Total Risks",
      value: risks.length,
      icon: Shield,
      color: "text-slate-700",
      bg: "bg-slate-50",
    },
    {
      title: "High Severity",
      value: highCount,
      icon: AlertTriangle,
      color: "text-red-700",
      bg: "bg-red-50",
    },
    {
      title: "Medium Severity",
      value: mediumCount,
      icon: ShieldAlert,
      color: "text-amber-700",
      bg: "bg-amber-50",
    },
    {
      title: "Mitigated",
      value: mitigatedCount,
      icon: TrendingDown,
      color: "text-green-700",
      bg: "bg-green-50",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Risk Management</h2>
        <p className="text-muted-foreground">
          Monitor and manage risks identified during implementation.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                <div className={`rounded-md p-2 ${card.bg}`}>
                  <Icon className={`h-4 w-4 ${card.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{card.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Risk Table */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Register</CardTitle>
          <CardDescription>
            {risks.length} risk{risks.length !== 1 ? "s" : ""} tracked &middot; {highCount} high severity &middot; {mitigatedCount} mitigated
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Mitigation Status</TableHead>
                <TableHead>Owner</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {risks.map((risk) => {
                const MitigationIcon = mitigationConfig[risk.mitigationStatus].icon;
                return (
                  <TableRow key={risk.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{risk.title}</p>
                        <p className="text-xs text-muted-foreground">{risk.id}</p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden max-w-[280px] truncate md:table-cell">
                      {risk.description}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`gap-1 ${severityConfig[risk.severity].className}`}>
                        <AlertTriangle className={`h-3 w-3 ${severityConfig[risk.severity].color}`} />
                        {risk.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={risk.mitigationStatus}
                        onValueChange={(value) => handleMitigationChange(risk.id, value as MitigationStatus)}
                      >
                        <SelectTrigger className="h-8 w-[150px] border-0 p-0">
                          <Badge variant="outline" className={`gap-1 ${mitigationConfig[risk.mitigationStatus].className}`}>
                            <MitigationIcon className="h-3 w-3" />
                            {risk.mitigationStatus}
                          </Badge>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Not Started">Not Started</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="Mitigated">Mitigated</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>{risk.owner}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
