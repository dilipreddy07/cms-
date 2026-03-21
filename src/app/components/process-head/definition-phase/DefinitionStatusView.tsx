import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";
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
  Download, 
  Search, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertCircle,
  Filter,
  Eye,
  TrendingUp
} from "lucide-react";

interface ProcedureProcess {
  id: string;
  procedureName: string;
  standard: string;
  department: string;
  version: string;
  status: "Draft" | "In Review" | "Approved" | "Rejected" | "In Progress";
  lastUpdated: string;
  responsiblePerson: string;
  completionPercentage: number;
}

export function DefinitionStatusView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterStandard, setFilterStandard] = useState<string>("all");

  // Procedure status derived from template completion
  // Status is computed: 100% → Approved, >50% → In Progress, >0% → Draft, 0% → Not Started
  const deriveStatus = (completion: number): ProcedureProcess["status"] => {
    if (completion >= 100) return "Approved";
    if (completion >= 50) return "In Progress";
    if (completion > 0) return "Draft";
    return "Draft";
  };

  // Data derived from templates - each procedure's completion reflects its template fill status
  const [procedures] = useState<ProcedureProcess[]>([
    {
      id: "P001",
      procedureName: "Information Security Incident Management",
      standard: "ISO 27001",
      department: "IT Security",
      version: "2.1",
      status: deriveStatus(100),
      lastUpdated: "2024-03-10",
      responsiblePerson: "John Smith",
      completionPercentage: 100
    },
    {
      id: "P002",
      procedureName: "Access Control Management",
      standard: "ISO 27001",
      department: "IT",
      version: "1.5",
      status: deriveStatus(85),
      lastUpdated: "2024-03-12",
      responsiblePerson: "Sarah Johnson",
      completionPercentage: 85
    },
    {
      id: "P003",
      procedureName: "Data Backup and Recovery",
      standard: "ISO 27001",
      department: "IT Operations",
      version: "3.0",
      status: deriveStatus(60),
      lastUpdated: "2024-03-11",
      responsiblePerson: "Michael Chen",
      completionPercentage: 60
    },
    {
      id: "P004",
      procedureName: "Risk Assessment Procedure",
      standard: "ISO 27001",
      department: "Risk Management",
      version: "2.0",
      status: deriveStatus(100),
      lastUpdated: "2024-02-28",
      responsiblePerson: "Emily Davis",
      completionPercentage: 100
    },
    {
      id: "P005",
      procedureName: "Change Management Process",
      standard: "ISO 9001",
      department: "Quality",
      version: "1.0",
      status: deriveStatus(35),
      lastUpdated: "2024-03-13",
      responsiblePerson: "David Wilson",
      completionPercentage: 35
    },
    {
      id: "P006",
      procedureName: "Vendor Security Assessment",
      standard: "ISO 27001",
      department: "Procurement",
      version: "1.2",
      status: deriveStatus(75),
      lastUpdated: "2024-03-09",
      responsiblePerson: "Lisa Anderson",
      completionPercentage: 75
    },
    {
      id: "P007",
      procedureName: "Business Continuity Planning",
      standard: "ISO 22301",
      department: "Operations",
      version: "2.5",
      status: deriveStatus(100),
      lastUpdated: "2024-03-05",
      responsiblePerson: "Robert Taylor",
      completionPercentage: 100
    },
    {
      id: "P008",
      procedureName: "Asset Management Process",
      standard: "ISO 27001",
      department: "IT",
      version: "1.8",
      status: deriveStatus(45),
      lastUpdated: "2024-03-08",
      responsiblePerson: "Jennifer Martinez",
      completionPercentage: 45
    },
    {
      id: "P009",
      procedureName: "Employee Onboarding Security",
      standard: "ISO 27001",
      department: "HR",
      version: "1.1",
      status: deriveStatus(50),
      lastUpdated: "2024-03-12",
      responsiblePerson: "Mark Thompson",
      completionPercentage: 50
    },
    {
      id: "P010",
      procedureName: "Data Privacy Protection",
      standard: "GDPR",
      department: "Legal",
      version: "3.2",
      status: deriveStatus(100),
      lastUpdated: "2024-03-01",
      responsiblePerson: "Amanda White",
      completionPercentage: 100
    }
  ]);

  // Filter procedures
  const filteredProcedures = procedures.filter((proc) => {
    const matchesSearch = proc.procedureName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         proc.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         proc.responsiblePerson.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || proc.status === filterStatus;
    const matchesStandard = filterStandard === "all" || proc.standard === filterStandard;
    return matchesSearch && matchesStatus && matchesStandard;
  });

  // Get status statistics
  const statusStats = {
    total: procedures.length,
    approved: procedures.filter(p => p.status === "Approved").length,
    inReview: procedures.filter(p => p.status === "In Review").length,
    inProgress: procedures.filter(p => p.status === "In Progress").length,
    draft: procedures.filter(p => p.status === "Draft").length,
    rejected: procedures.filter(p => p.status === "Rejected").length,
  };

  const overallCompletion = Math.round(
    procedures.reduce((sum, p) => sum + p.completionPercentage, 0) / procedures.length
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-green-500";
      case "In Review": return "bg-blue-500";
      case "In Progress": return "bg-yellow-500";
      case "Draft": return "bg-gray-500";
      case "Rejected": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved": return <CheckCircle className="h-4 w-4" />;
      case "In Review": return <Eye className="h-4 w-4" />;
      case "In Progress": return <Clock className="h-4 w-4" />;
      case "Draft": return <FileText className="h-4 w-4" />;
      case "Rejected": return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  // Get unique standards for filter
  const uniqueStandards = Array.from(new Set(procedures.map(p => p.standard)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Definition Status</h2>
            <p className="text-white/90 mt-1">Status derived from template completion progress</p>
          </div>
          <Button className="bg-white text-green-600 hover:bg-green-50">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{statusStats.total}</div>
            <p className="text-sm text-white/80 mt-1">Total Procedures</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <div className="text-3xl font-bold">{statusStats.approved}</div>
            </div>
            <p className="text-sm text-white/80 mt-1">Approved</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-400 to-indigo-500 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              <div className="text-3xl font-bold">{statusStats.inReview}</div>
            </div>
            <p className="text-sm text-white/80 mt-1">In Review</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <div className="text-3xl font-bold">{statusStats.inProgress}</div>
            </div>
            <p className="text-sm text-white/80 mt-1">In Progress</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-gray-400 to-gray-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              <div className="text-3xl font-bold">{statusStats.draft}</div>
            </div>
            <p className="text-sm text-white/80 mt-1">Draft</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-red-500 to-pink-500 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5" />
              <div className="text-3xl font-bold">{statusStats.rejected}</div>
            </div>
            <p className="text-sm text-white/80 mt-1">Rejected</p>
          </CardContent>
        </Card>
      </div>

      {/* Overall Completion */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-purple-600" />
                Overall Progress
              </CardTitle>
              <CardDescription>Average completion across all procedures</CardDescription>
            </div>
            <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {overallCompletion}%
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={overallCompletion} className="h-4" />
        </CardContent>
      </Card>

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
                placeholder="Search procedures..."
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
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="In Review">In Review</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStandard} onValueChange={setFilterStandard}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by standard" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Standards</SelectItem>
                {uniqueStandards.map((standard) => (
                  <SelectItem key={standard} value={standard}>
                    {standard}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Procedures Table */}
      <Card>
        <CardHeader>
          <CardTitle>Procedure Status Details</CardTitle>
          <CardDescription>
            Showing {filteredProcedures.length} of {procedures.length} procedures
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Procedure Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Responsible Person</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProcedures.length > 0 ? (
                  filteredProcedures.map((procedure) => (
                    <TableRow key={procedure.id}>
                      <TableCell className="font-medium">{procedure.id}</TableCell>
                      <TableCell className="font-medium max-w-xs">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          {procedure.procedureName}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(procedure.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(procedure.status)}
                            {procedure.status}
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">v{procedure.version}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {procedure.lastUpdated}
                      </TableCell>
                      <TableCell>{procedure.responsiblePerson}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No procedures found matching your filters
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Status Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Status Distribution</CardTitle>
          <CardDescription>Visual breakdown of procedure statuses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { label: "Approved", count: statusStats.approved, color: "bg-green-500", percentage: (statusStats.approved / statusStats.total) * 100 },
              { label: "In Review", count: statusStats.inReview, color: "bg-blue-500", percentage: (statusStats.inReview / statusStats.total) * 100 },
              { label: "In Progress", count: statusStats.inProgress, color: "bg-yellow-500", percentage: (statusStats.inProgress / statusStats.total) * 100 },
              { label: "Draft", count: statusStats.draft, color: "bg-gray-500", percentage: (statusStats.draft / statusStats.total) * 100 },
              { label: "Rejected", count: statusStats.rejected, color: "bg-red-500", percentage: (statusStats.rejected / statusStats.total) * 100 }
            ].map((stat) => (
              <div key={stat.label} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${stat.color}`} />
                    <span className="font-medium">{stat.label}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.count} procedures ({Math.round(stat.percentage)}%)
                  </div>
                </div>
                <Progress value={stat.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
