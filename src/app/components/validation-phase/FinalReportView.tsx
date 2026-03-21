import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Plus, FileText, Download, Eye, CheckCircle, Clock, Send } from "lucide-react";

interface FinalReport {
  id: string;
  projectName: string;
  reportDate: string;
  preparedBy: string;
  approvalStatus: "Approved" | "Pending Review" | "Draft";
  summaryComments: string;
}

export function FinalReportView() {
  const [reports, setReports] = useState<FinalReport[]>([
    {
      id: "FR001",
      projectName: "ISO 27001 Implementation",
      reportDate: "2026-03-20",
      preparedBy: "Process Head",
      approvalStatus: "Approved",
      summaryComments: "All project objectives achieved. Compliance verified and documented. Ready for certification audit."
    },
    {
      id: "FR002",
      projectName: "GDPR Compliance Project",
      reportDate: "2026-04-22",
      preparedBy: "Process Head",
      approvalStatus: "Pending Review",
      summaryComments: "Project substantially complete. Awaiting final privacy impact assessments before approval."
    },
    {
      id: "FR003",
      projectName: "SOC 2 Audit Preparation",
      reportDate: "2026-03-28",
      preparedBy: "Process Head",
      approvalStatus: "Draft",
      summaryComments: "Additional documentation required. Access control gaps identified and being addressed."
    }
  ]);

  const [generateDialogOpen, setGenerateDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<FinalReport | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-green-500 text-white";
      case "Pending Review": return "bg-amber-500 text-white";
      case "Draft": return "bg-gray-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const handleView = (report: FinalReport) => {
    setSelectedReport(report);
    setViewDialogOpen(true);
  };

  const handleApprove = (id: string) => {
    setReports(reports.map(r => r.id === id ? { ...r, approvalStatus: "Approved" as const } : r));
  };

  const handleGenerateReport = () => {
    console.log("Generating final report...");
    alert("Final report generation initiated!");
    setGenerateDialogOpen(false);
  };

  const handleDownloadPDF = () => {
    console.log("Downloading PDF...");
    alert("PDF download initiated!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Objective Achievement Progress</h2>
            <p className="text-white/90 mt-1">Track and document achievement of process objectives</p>
          </div>
          <Dialog open={generateDialogOpen} onOpenChange={setGenerateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-white text-orange-600 hover:bg-orange-50">
                <Plus className="h-4 w-4 mr-2" />
                Generate Final Report
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Generate Final Report</DialogTitle>
                <DialogDescription>Create a comprehensive final report documenting project completion</DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="space-y-2">
                  <Label htmlFor="projectName">Project Name *</Label>
                  <Input id="projectName" placeholder="Enter project name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="preparedBy">Prepared By *</Label>
                    <Input id="preparedBy" defaultValue="Process Head" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reportDate">Report Date *</Label>
                    <Input id="reportDate" type="date" />
                  </div>
                </div>

                {/* Report Sections */}
                <div className="space-y-4 border-t pt-4">
                  <h3 className="font-semibold text-lg">Report Content</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="projectOverview">Project Overview</Label>
                    <Textarea id="projectOverview" placeholder="Describe the project scope and purpose" rows={3} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="projectObjectives">Project Objectives</Label>
                    <Textarea id="projectObjectives" placeholder="List key project objectives and goals" rows={3} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="milestoneSummary">Milestone Completion Summary</Label>
                      <Textarea id="milestoneSummary" placeholder="Summary of completed milestones" rows={3} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taskSummary">Task Completion Summary</Label>
                      <Textarea id="taskSummary" placeholder="Summary of task completion" rows={3} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="issueSummary">Issue Summary</Label>
                      <Textarea id="issueSummary" placeholder="Summary of issues identified and resolved" rows={3} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="riskSummary">Risk Summary</Label>
                      <Textarea id="riskSummary" placeholder="Summary of risks and mitigation" rows={3} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="qualityResults">Quality Verification Results</Label>
                    <Textarea id="qualityResults" placeholder="Summary of quality verification outcomes" rows={3} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="performanceMetrics">Performance Metrics</Label>
                    <Textarea id="performanceMetrics" placeholder="Key performance indicators and results" rows={3} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="summaryComments">Summary Comments</Label>
                    <Textarea id="summaryComments" placeholder="Overall project assessment and recommendations" rows={4} />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setGenerateDialogOpen(false)}>Cancel</Button>
                <Button className="bg-gradient-to-r from-orange-500 to-amber-500 text-white" onClick={handleGenerateReport}>
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{reports.length}</div>
            <p className="text-sm text-blue-50 mt-1">Total Reports</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{reports.filter(r => r.approvalStatus === "Approved").length}</div>
            <p className="text-sm text-green-50 mt-1">Approved</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-500 to-orange-500 text-white">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{reports.filter(r => r.approvalStatus === "Pending Review").length}</div>
            <p className="text-sm text-amber-50 mt-1">Pending Review</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-gray-500 to-slate-500 text-white">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{reports.filter(r => r.approvalStatus === "Draft").length}</div>
            <p className="text-sm text-gray-50 mt-1">Drafts</p>
          </CardContent>
        </Card>
      </div>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Final Reports List</CardTitle>
              <CardDescription>Showing {reports.length} final reports</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report ID</TableHead>
                <TableHead>Project Name</TableHead>
                <TableHead>Report Date</TableHead>
                <TableHead>Prepared By</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.id}</TableCell>
                  <TableCell>{report.projectName}</TableCell>
                  <TableCell>{new Date(report.reportDate).toLocaleDateString()}</TableCell>
                  <TableCell>{report.preparedBy}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(report.approvalStatus)}>
                      {report.approvalStatus === "Approved" && <CheckCircle className="h-3 w-3 mr-1" />}
                      {report.approvalStatus === "Pending Review" && <Clock className="h-3 w-3 mr-1" />}
                      {report.approvalStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleView(report)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={handleDownloadPDF}>
                        <Download className="h-4 w-4" />
                      </Button>
                      {report.approvalStatus === "Pending Review" && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleApprove(report.id)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                      {report.approvalStatus === "Approved" && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Report Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Final Report Details</DialogTitle>
            <DialogDescription>Comprehensive project completion report</DialogDescription>
          </DialogHeader>
          {selectedReport && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-semibold">Report ID</Label>
                  <div className="p-2 border rounded-md bg-gray-50">{selectedReport.id}</div>
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold">Status</Label>
                  <Badge className={getStatusColor(selectedReport.approvalStatus)}>
                    {selectedReport.approvalStatus}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-semibold">Project Name</Label>
                <div className="p-2 border rounded-md bg-gray-50">{selectedReport.projectName}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-semibold">Report Date</Label>
                  <div className="p-2 border rounded-md bg-gray-50">
                    {new Date(selectedReport.reportDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold">Prepared By</Label>
                  <div className="p-2 border rounded-md bg-gray-50">{selectedReport.preparedBy}</div>
                </div>
              </div>

              {/* Report Content Sections */}
              <div className="border-t pt-4 space-y-4">
                <h3 className="font-semibold text-lg">Report Content</h3>

                <div className="space-y-2">
                  <Label className="font-semibold">Project Overview</Label>
                  <div className="p-3 border rounded-md bg-gray-50 min-h-[60px]">
                    {selectedReport.projectName} was initiated to achieve compliance certification and implement necessary controls.
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="font-semibold">Project Objectives</Label>
                  <div className="p-3 border rounded-md bg-gray-50 min-h-[60px]">
                    • Achieve full compliance certification<br />
                    • Implement all required controls and processes<br />
                    • Document all procedures and evidence
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-semibold">Milestone Completion</Label>
                    <div className="p-3 border rounded-md bg-gray-50">
                      All 8 project milestones completed successfully
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-semibold">Task Completion</Label>
                    <div className="p-3 border rounded-md bg-gray-50">
                      283/325 tasks completed (87%)
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="font-semibold">Summary Comments</Label>
                  <div className="p-3 border rounded-md bg-gray-50 min-h-[80px]">
                    {selectedReport.summaryComments}
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>Close</Button>
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white" onClick={handleDownloadPDF}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}