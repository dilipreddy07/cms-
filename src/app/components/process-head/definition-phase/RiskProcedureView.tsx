import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
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
  AlertTriangle, 
  FileText, 
  Search, 
  Filter,
  Eye,
  Download,
  Shield
} from "lucide-react";

interface ProcedureRisk {
  procedureId: string;
  procedureName: string;
  standard: string;
  version: string;
  riskId: string;
  riskTitle: string;
  riskCategory: string;
  impactLevel: "Critical" | "High" | "Medium" | "Low";
  riskScore: number;
  mitigationStatus: "Open" | "In Progress" | "Mitigated" | "Closed";
  riskOwner: string;
  lastAssessed: string;
}

export function RiskProcedureView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterImpact, setFilterImpact] = useState<string>("all");

  // Sample procedure risk data - mapping procedures to their associated risks
  const [procedureRisks] = useState<ProcedureRisk[]>([
    {
      procedureId: "P001",
      procedureName: "Information Security Incident Management",
      standard: "ISO 27001",
      version: "2.1",
      riskId: "RISK001",
      riskTitle: "Data Breach Risk",
      riskCategory: "Security",
      impactLevel: "Critical",
      riskScore: 18,
      mitigationStatus: "In Progress",
      riskOwner: "John Smith",
      lastAssessed: "2024-03-10"
    },
    {
      procedureId: "P002",
      procedureName: "Access Control Management",
      standard: "ISO 27001",
      version: "1.5",
      riskId: "RISK005",
      riskTitle: "Unauthorized Access Risk",
      riskCategory: "Security",
      impactLevel: "High",
      riskScore: 15,
      mitigationStatus: "In Progress",
      riskOwner: "Sarah Johnson",
      lastAssessed: "2024-03-12"
    },
    {
      procedureId: "P003",
      procedureName: "Data Backup and Recovery",
      standard: "ISO 27001",
      version: "3.0",
      riskId: "RISK003",
      riskTitle: "System Downtime",
      riskCategory: "Operational",
      impactLevel: "High",
      riskScore: 15,
      mitigationStatus: "Open",
      riskOwner: "Michael Chen",
      lastAssessed: "2024-03-11"
    },
    {
      procedureId: "P004",
      procedureName: "Risk Assessment Procedure",
      standard: "ISO 27001",
      version: "2.0",
      riskId: "RISK002",
      riskTitle: "Non-compliance Penalties",
      riskCategory: "Compliance",
      impactLevel: "High",
      riskScore: 12,
      mitigationStatus: "Mitigated",
      riskOwner: "Emily Davis",
      lastAssessed: "2024-02-28"
    },
    {
      procedureId: "P005",
      procedureName: "Change Management Process",
      standard: "ISO 9001",
      version: "1.0",
      riskId: "RISK006",
      riskTitle: "Process Failure Risk",
      riskCategory: "Operational",
      impactLevel: "Medium",
      riskScore: 9,
      mitigationStatus: "Open",
      riskOwner: "David Wilson",
      lastAssessed: "2024-03-13"
    },
    {
      procedureId: "P006",
      procedureName: "Vendor Security Assessment",
      standard: "ISO 27001",
      version: "1.2",
      riskId: "RISK007",
      riskTitle: "Third-Party Security Risk",
      riskCategory: "Security",
      impactLevel: "High",
      riskScore: 14,
      mitigationStatus: "In Progress",
      riskOwner: "Lisa Anderson",
      lastAssessed: "2024-03-09"
    },
    {
      procedureId: "P007",
      procedureName: "Business Continuity Planning",
      standard: "ISO 22301",
      version: "2.5",
      riskId: "RISK008",
      riskTitle: "Business Interruption Risk",
      riskCategory: "Operational",
      impactLevel: "Critical",
      riskScore: 20,
      mitigationStatus: "Mitigated",
      riskOwner: "Robert Taylor",
      lastAssessed: "2024-03-05"
    },
    {
      procedureId: "P008",
      procedureName: "Asset Management Process",
      standard: "ISO 27001",
      version: "1.8",
      riskId: "RISK009",
      riskTitle: "Asset Loss Risk",
      riskCategory: "Operational",
      impactLevel: "Medium",
      riskScore: 10,
      mitigationStatus: "Open",
      riskOwner: "Jennifer Martinez",
      lastAssessed: "2024-03-08"
    },
    {
      procedureId: "P009",
      procedureName: "Employee Onboarding Security",
      standard: "ISO 27001",
      version: "1.1",
      riskId: "RISK010",
      riskTitle: "Insider Threat Risk",
      riskCategory: "Security",
      impactLevel: "High",
      riskScore: 16,
      mitigationStatus: "In Progress",
      riskOwner: "Mark Thompson",
      lastAssessed: "2024-03-12"
    },
    {
      procedureId: "P010",
      procedureName: "Data Privacy Protection",
      standard: "GDPR",
      version: "3.2",
      riskId: "RISK011",
      riskTitle: "Privacy Violation Risk",
      riskCategory: "Compliance",
      impactLevel: "Critical",
      riskScore: 19,
      mitigationStatus: "Mitigated",
      riskOwner: "Amanda White",
      lastAssessed: "2024-03-01"
    }
  ]);

  // Filter procedure risks
  const filteredRisks = procedureRisks.filter((risk) => {
    const matchesSearch = risk.procedureName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         risk.riskTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         risk.procedureId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         risk.riskId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || risk.mitigationStatus === filterStatus;
    const matchesImpact = filterImpact === "all" || risk.impactLevel === filterImpact;
    return matchesSearch && matchesStatus && matchesImpact;
  });

  // Get statistics
  const stats = {
    total: procedureRisks.length,
    critical: procedureRisks.filter(r => r.impactLevel === "Critical").length,
    high: procedureRisks.filter(r => r.impactLevel === "High").length,
    open: procedureRisks.filter(r => r.mitigationStatus === "Open").length,
    inProgress: procedureRisks.filter(r => r.mitigationStatus === "In Progress").length,
    mitigated: procedureRisks.filter(r => r.mitigationStatus === "Mitigated" || r.mitigationStatus === "Closed").length,
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Critical": return "bg-red-600";
      case "High": return "bg-orange-500";
      case "Medium": return "bg-yellow-500";
      case "Low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Closed": return "bg-green-500";
      case "Mitigated": return "bg-blue-500";
      case "In Progress": return "bg-yellow-500";
      case "Open": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score >= 16) return "bg-red-600";
    if (score >= 10) return "bg-orange-500";
    if (score >= 5) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Associated Risk</h2>
            <p className="text-white/90 mt-1">View all procedures with associated risk data from templates</p>
          </div>
          <Button className="bg-white text-red-600 hover:bg-red-50">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{stats.total}</div>
            <p className="text-sm text-white/80 mt-1">Total Procedures</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-red-500 to-orange-500 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              <div className="text-3xl font-bold">{stats.critical}</div>
            </div>
            <p className="text-sm text-white/80 mt-1">Critical Risks</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-400 to-red-400 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <div className="text-3xl font-bold">{stats.high}</div>
            </div>
            <p className="text-sm text-white/80 mt-1">High Risks</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{stats.open}</div>
            <p className="text-sm text-white/80 mt-1">Open</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-500 to-yellow-600 text-white">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{stats.inProgress}</div>
            <p className="text-sm text-white/80 mt-1">In Progress</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{stats.mitigated}</div>
            <p className="text-sm text-white/80 mt-1">Mitigated</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search procedures or risks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Mitigated">Mitigated</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterImpact} onValueChange={setFilterImpact}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by impact" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Impact Levels</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Procedure Risks Table */}
      <Card>
        <CardHeader>
          <CardTitle>Procedures with Associated Risks</CardTitle>
          <CardDescription>
            Showing {filteredRisks.length} of {procedureRisks.length} procedure-risk mappings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Procedure ID</TableHead>
                  <TableHead>Procedure Name</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Risk ID</TableHead>
                  <TableHead>Associated Risk Data</TableHead>
                  <TableHead>Impact</TableHead>
                  <TableHead>Risk Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Risk Owner</TableHead>
                  <TableHead>Last Assessed</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRisks.length > 0 ? (
                  filteredRisks.map((risk) => (
                    <TableRow key={`${risk.procedureId}-${risk.riskId}`}>
                      <TableCell className="font-medium">{risk.procedureId}</TableCell>
                      <TableCell className="font-medium max-w-xs">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div>{risk.procedureName}</div>
                            <div className="text-xs text-muted-foreground mt-0.5">
                              <Badge variant="outline" className="text-xs">{risk.standard}</Badge>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">v{risk.version}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{risk.riskId}</TableCell>
                      <TableCell className="max-w-xs">
                        <div className="flex flex-col gap-1">
                          <div className="font-medium">{risk.riskTitle}</div>
                          <Badge variant="outline" className="w-fit text-xs">{risk.riskCategory}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getImpactColor(risk.impactLevel)}>
                          {risk.impactLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getRiskScoreColor(risk.riskScore)}>
                          {risk.riskScore}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(risk.mitigationStatus)}>
                          {risk.mitigationStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>{risk.riskOwner}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {risk.lastAssessed}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={11} className="text-center py-8 text-muted-foreground">
                      No procedure-risk mappings found matching your filters
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Risk Categories Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Security Risks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {procedureRisks.filter(r => r.riskCategory === "Security").length}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Procedures with security risks
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Compliance Risks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">
              {procedureRisks.filter(r => r.riskCategory === "Compliance").length}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Procedures with compliance risks
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Operational Risks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {procedureRisks.filter(r => r.riskCategory === "Operational").length}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Procedures with operational risks
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
