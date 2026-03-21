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
import { Plus, Edit, TrendingUp, TrendingDown, Download, BarChart3 } from "lucide-react";
import { Progress } from "@/app/components/ui/progress";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface ProjectMetric {
  id: string;
  projectName: string;
  metricName: string;
  metricValue: string;
  measurementDate: string;
  remarks: string;
}

export function ProjectMetricsView() {
  const [metrics, setMetrics] = useState<ProjectMetric[]>([
    {
      id: "PM001",
      projectName: "ISO 27001 Implementation",
      metricName: "Task Completion Rate",
      metricValue: "95%",
      measurementDate: "2026-03-15",
      remarks: "Excellent completion rate. All critical tasks completed on time."
    },
    {
      id: "PM002",
      projectName: "ISO 27001 Implementation",
      metricName: "Issue Resolution Time",
      metricValue: "2.3 days",
      measurementDate: "2026-03-15",
      remarks: "Average resolution time within acceptable range."
    },
    {
      id: "PM003",
      projectName: "GDPR Compliance Project",
      metricName: "Risk Mitigation Effectiveness",
      metricValue: "88%",
      measurementDate: "2026-04-20",
      remarks: "Most identified risks successfully mitigated. 3 risks still under review."
    },
    {
      id: "PM004",
      projectName: "SOC 2 Audit Preparation",
      metricName: "Schedule Performance",
      metricValue: "-5 days",
      measurementDate: "2026-03-25",
      remarks: "Project behind schedule due to additional documentation requirements."
    }
  ]);

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<ProjectMetric | null>(null);

  const handleExportMetrics = () => {
    console.log("Exporting metrics...");
    alert("Metrics export initiated!");
  };

  const handleAddMetric = () => {
    console.log("Add metric record");
    setAddDialogOpen(false);
  };

  const handleEdit = (metric: ProjectMetric) => {
    setSelectedMetric(metric);
    setEditDialogOpen(true);
  };

  // Sample data for charts
  const taskCompletionData = [
    { month: 'Jan', completed: 45, planned: 50 },
    { month: 'Feb', completed: 68, planned: 70 },
    { month: 'Mar', completed: 92, planned: 95 },
    { month: 'Apr', completed: 78, planned: 80 }
  ];

  const issueResolutionData = [
    { week: 'Week 1', resolved: 12, raised: 15 },
    { week: 'Week 2', resolved: 18, raised: 20 },
    { week: 'Week 3', resolved: 22, raised: 22 },
    { week: 'Week 4', resolved: 25, raised: 24 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Project Metrics</h2>
            <p className="text-purple-50 mt-1">Measure project performance and effectiveness</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20" onClick={handleExportMetrics}>
              <Download className="h-4 w-4 mr-2" />
              Export Metrics
            </Button>
            <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-white text-purple-600 hover:bg-purple-50">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Metric Record
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Metric Record</DialogTitle>
                  <DialogDescription>Record a new project performance metric</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="projectName">Project Name *</Label>
                    <Input id="projectName" placeholder="Enter project name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="metricName">Metric Name *</Label>
                    <Input id="metricName" placeholder="e.g., Task Completion Rate" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="metricValue">Metric Value *</Label>
                      <Input id="metricValue" placeholder="e.g., 95%" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="measurementDate">Measurement Date *</Label>
                      <Input id="measurementDate" type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="remarks">Remarks</Label>
                    <Textarea id="remarks" placeholder="Add observations or notes about this metric" rows={4} />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setAddDialogOpen(false)}>Cancel</Button>
                  <Button className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white" onClick={handleAddMetric}>Add Metric</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-green-50">Tasks Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">283</div>
              <div className="p-3 bg-white/20 backdrop-blur rounded-lg">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-2">
              <Progress value={87} className="h-2 bg-white/30" />
              <p className="text-xs text-green-50 mt-1">87% completion rate</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-blue-50">Issues Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">77/81</div>
              <div className="p-3 bg-white/20 backdrop-blur rounded-lg">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-2">
              <Progress value={95} className="h-2 bg-white/30" />
              <p className="text-xs text-blue-50 mt-1">95% resolution rate</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-500 to-orange-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-amber-50">Active Risks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">5</div>
              <div className="p-3 bg-white/20 backdrop-blur rounded-lg">
                <TrendingDown className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-2">
              <Progress value={12} className="h-2 bg-white/30" />
              <p className="text-xs text-amber-50 mt-1">12% of total risks</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-purple-50">Schedule Variance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">-2d</div>
              <div className="p-3 bg-white/20 backdrop-blur rounded-lg">
                <BarChart3 className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-2">
              <Badge className="bg-white/20 text-white">On Track</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="border-b bg-gray-50">
            <CardTitle className="text-gray-900">Task Completion Trend</CardTitle>
            <CardDescription>Completed vs Planned Tasks</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={taskCompletionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="planned" stroke="#a78bfa" fill="#ddd6fe" fillOpacity={0.6} name="Planned" />
                <Area type="monotone" dataKey="completed" stroke="#10b981" fill="#86efac" fillOpacity={0.6} name="Completed" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b bg-gray-50">
            <CardTitle className="text-gray-900">Issue Resolution Performance</CardTitle>
            <CardDescription>Issues Raised vs Resolved</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={issueResolutionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="week" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Bar dataKey="raised" fill="#f59e0b" name="Raised" />
                <Bar dataKey="resolved" fill="#10b981" name="Resolved" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Metrics Table */}
      <Card>
        <CardHeader>
          <CardTitle>Project Metrics Records</CardTitle>
          <CardDescription>Showing {metrics.length} metric records</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric ID</TableHead>
                <TableHead>Project Name</TableHead>
                <TableHead>Metric Name</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Measurement Date</TableHead>
                <TableHead>Remarks</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {metrics.map((metric) => (
                <TableRow key={metric.id}>
                  <TableCell className="font-medium">{metric.id}</TableCell>
                  <TableCell>{metric.projectName}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{metric.metricName}</Badge>
                  </TableCell>
                  <TableCell className="font-bold">{metric.metricValue}</TableCell>
                  <TableCell>{new Date(metric.measurementDate).toLocaleDateString()}</TableCell>
                  <TableCell className="max-w-xs truncate">{metric.remarks}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(metric)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Update Metric Record</DialogTitle>
            <DialogDescription>Modify metric values and remarks</DialogDescription>
          </DialogHeader>
          {selectedMetric && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-metricValue">Metric Value *</Label>
                <Input id="edit-metricValue" defaultValue={selectedMetric.metricValue} placeholder="e.g., 95%" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-remarks">Remarks</Label>
                <Textarea 
                  id="edit-remarks" 
                  defaultValue={selectedMetric.remarks}
                  placeholder="Add observations or notes about this metric" 
                  rows={6} 
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}