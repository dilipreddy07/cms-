import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";
import { Download, FileText, Share2, TrendingUp, Clock, AlertCircle, CheckCircle2 } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export function ProjectReportsView() {
  const handleDownloadReport = () => {
    console.log("Downloading comprehensive project report...");
    alert("Project report download initiated!");
  };

  const handleShareReport = () => {
    console.log("Sharing project report...");
    alert("Share functionality opened!");
  };

  const handleDownloadPDF = () => {
    console.log("Downloading PDF report...");
    alert("PDF report download initiated!");
  };

  const handleExportExcel = () => {
    console.log("Exporting to Excel...");
    alert("Excel export initiated!");
  };

  const handleShareStakeholders = () => {
    console.log("Sharing with stakeholders...");
    alert("Stakeholder share functionality opened!");
  };

  const projectData = [
    {
      projectName: "ISO 27001 Implementation",
      completionPercentage: 65,
      totalTasks: 45,
      completedTasks: 29,
      openIssues: 3,
      activeRisks: 2
    },
    {
      projectName: "GDPR Compliance Program",
      completionPercentage: 45,
      totalTasks: 38,
      completedTasks: 17,
      openIssues: 5,
      activeRisks: 3
    },
    {
      projectName: "Quality Management System",
      completionPercentage: 85,
      totalTasks: 32,
      completedTasks: 27,
      openIssues: 1,
      activeRisks: 1
    }
  ];

  const taskProgressData = [
    { id: "jan", month: "Jan", completed: 45, planned: 50 },
    { id: "feb", month: "Feb", completed: 72, planned: 80 },
    { id: "mar", month: "Mar", completed: 98, planned: 110 },
    { id: "apr", month: "Apr", completed: 125, planned: 140 },
    { id: "may", month: "May", completed: 152, planned: 165 },
    { id: "jun", month: "Jun", completed: 180, planned: 190 }
  ];

  const issueResolutionData = [
    { id: "jan", month: "Jan", open: 12, resolved: 8 },
    { id: "feb", month: "Feb", open: 15, resolved: 11 },
    { id: "mar", month: "Mar", open: 18, resolved: 14 },
    { id: "apr", month: "Apr", open: 14, resolved: 16 },
    { id: "may", month: "May", open: 11, resolved: 19 },
    { id: "jun", month: "Jun", open: 9, resolved: 21 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Progress Tracking</h2>
            <p className="text-white/90 mt-1">Monitor procedure status, version, and overall progress</p>
          </div>
          <div className="flex gap-2">
            <Button className="bg-white text-teal-600 hover:bg-teal-50" onClick={handleDownloadReport}>
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
            <Button className="bg-white/20 text-white hover:bg-white/30" onClick={handleShareReport}>
              <Share2 className="h-4 w-4 mr-2" />
              Share Report
            </Button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">{projectData.length}</div>
                <p className="text-sm text-white/80 mt-1">Active Projects</p>
              </div>
              <div className="p-3 bg-white/20 backdrop-blur rounded-lg">
                <FileText className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">
                  {projectData.reduce((sum, p) => sum + p.completedTasks, 0)}
                </div>
                <p className="text-sm text-white/80 mt-1">Completed Tasks</p>
              </div>
              <div className="p-3 bg-white/20 backdrop-blur rounded-lg">
                <CheckCircle2 className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-red-500 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">
                  {projectData.reduce((sum, p) => sum + p.openIssues, 0)}
                </div>
                <p className="text-sm text-white/80 mt-1">Open Issues</p>
              </div>
              <div className="p-3 bg-white/20 backdrop-blur rounded-lg">
                <AlertCircle className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">
                  {Math.round(projectData.reduce((sum, p) => sum + p.completionPercentage, 0) / projectData.length)}%
                </div>
                <p className="text-sm text-white/80 mt-1">Avg Completion</p>
              </div>
              <div className="p-3 bg-white/20 backdrop-blur rounded-lg">
                <TrendingUp className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Project Progress Summary</CardTitle>
          <CardDescription>Overview of all active projects</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {projectData.map((project, idx) => (
            <div key={idx} className="space-y-3 pb-6 border-b last:border-b-0">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-lg">{project.projectName}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {project.completedTasks} of {project.totalTasks} tasks completed
                  </p>
                </div>
                <Badge className={project.completionPercentage >= 70 ? "bg-green-500" : project.completionPercentage >= 40 ? "bg-blue-500" : "bg-yellow-500"}>
                  {project.completionPercentage}% Complete
                </Badge>
              </div>
              <Progress value={project.completionPercentage} className="h-3" />
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{project.completedTasks} Tasks Done</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">{project.openIssues} Open Issues</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">{project.activeRisks} Active Risks</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Task Completion Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Task Completion Trend</CardTitle>
            <CardDescription>Completed vs Planned Tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={taskProgressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2} name="Completed" />
                  <Line type="monotone" dataKey="planned" stroke="#3b82f6" strokeWidth={2} name="Planned" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Issue Resolution Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Issue Resolution Trend</CardTitle>
            <CardDescription>Open vs Resolved Issues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={issueResolutionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="open" fill="#ef4444" name="Open Issues" />
                  <Bar dataKey="resolved" fill="#10b981" name="Resolved Issues" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Milestone Status */}
      <Card>
        <CardHeader>
          <CardTitle>Milestone Status Across Projects</CardTitle>
          <CardDescription>Current status of key project milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { project: "ISO 27001 Implementation", milestone: "Implementation Phase", status: "In Progress", progress: 65 },
              { project: "ISO 27001 Implementation", milestone: "Internal Audit", status: "Pending", progress: 0 },
              { project: "GDPR Compliance Program", milestone: "Privacy Policy Update", status: "In Progress", progress: 45 },
              { project: "Quality Management System", milestone: "Certification Prep", status: "In Progress", progress: 85 }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div>
                      <h4 className="font-medium">{item.milestone}</h4>
                      <p className="text-sm text-muted-foreground">{item.project}</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Progress value={item.progress} className="h-2" />
                  </div>
                </div>
                <Badge className={item.status === "In Progress" ? "bg-blue-500" : "bg-gray-500"}>
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Export Options</CardTitle>
          <CardDescription>Download or share project reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white" onClick={handleDownloadPDF}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF Report
            </Button>
            <Button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white" onClick={handleExportExcel}>
              <Download className="h-4 w-4 mr-2" />
              Export to Excel
            </Button>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white" onClick={handleShareStakeholders}>
              <Share2 className="h-4 w-4 mr-2" />
              Share with Stakeholders
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}