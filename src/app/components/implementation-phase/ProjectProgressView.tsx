import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Progress } from "@/app/components/ui/progress";
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
import { Plus, Edit, Eye, Target, TrendingUp } from "lucide-react";

interface Milestone {
  milestoneName: string;
  dueDate: string;
  status: "Completed" | "In Progress" | "Pending";
}

interface Project {
  projectId: string;
  projectName: string;
  projectManager: string;
  startDate: string;
  expectedCompletionDate: string;
  completionPercentage: number;
  status: "Active" | "On Hold" | "Completed" | "Delayed";
  remarks: string;
  milestones: Milestone[];
}

export function ProjectProgressView() {
  const [projects, setProjects] = useState<Project[]>([
    {
      projectId: "PRJ001",
      projectName: "ISO 27001 Implementation",
      projectManager: "John Smith",
      startDate: "2024-01-15",
      expectedCompletionDate: "2024-06-30",
      completionPercentage: 65,
      status: "Active",
      remarks: "On track with minor delays in documentation",
      milestones: [
        { milestoneName: "Gap Analysis", dueDate: "2024-02-15", status: "Completed" },
        { milestoneName: "Policy Development", dueDate: "2024-03-30", status: "Completed" },
        { milestoneName: "Implementation", dueDate: "2024-05-15", status: "In Progress" },
        { milestoneName: "Internal Audit", dueDate: "2024-06-15", status: "Pending" }
      ]
    },
    {
      projectId: "PRJ002",
      projectName: "GDPR Compliance Program",
      projectManager: "Sarah Johnson",
      startDate: "2024-02-01",
      expectedCompletionDate: "2024-07-31",
      completionPercentage: 45,
      status: "Active",
      remarks: "Resource constraints affecting timeline",
      milestones: [
        { milestoneName: "Data Mapping", dueDate: "2024-03-15", status: "Completed" },
        { milestoneName: "Privacy Policy Update", dueDate: "2024-04-30", status: "In Progress" },
        { milestoneName: "Training Rollout", dueDate: "2024-06-30", status: "Pending" }
      ]
    },
    {
      projectId: "PRJ003",
      projectName: "Quality Management System",
      projectManager: "Mike Wilson",
      startDate: "2024-01-10",
      expectedCompletionDate: "2024-05-30",
      completionPercentage: 85,
      status: "Active",
      remarks: "Ahead of schedule",
      milestones: [
        { milestoneName: "Process Documentation", dueDate: "2024-02-28", status: "Completed" },
        { milestoneName: "System Implementation", dueDate: "2024-04-15", status: "Completed" },
        { milestoneName: "Certification Prep", dueDate: "2024-05-20", status: "In Progress" }
      ]
    }
  ]);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-blue-500";
      case "Completed": return "bg-green-500";
      case "On Hold": return "bg-yellow-500";
      case "Delayed": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getMilestoneStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-500";
      case "In Progress": return "bg-blue-500";
      case "Pending": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Procedure Implementation</h2>
            <p className="text-white/90 mt-1">Track procedures under execution with implementation status and progress</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-white text-blue-600 hover:bg-blue-50">
                <Plus className="h-4 w-4 mr-2" />
                Create Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>Start a new compliance implementation project</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="projectName">Project Name</Label>
                  <Input id="projectName" placeholder="Enter project name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="manager">Project Manager</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select manager" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john">John Smith</SelectItem>
                        <SelectItem value="sarah">Sarah Johnson</SelectItem>
                        <SelectItem value="mike">Mike Wilson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="onhold">On Hold</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input id="startDate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">Expected Completion Date</Label>
                    <Input id="endDate" type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="remarks">Remarks</Label>
                  <Textarea id="remarks" placeholder="Project notes and remarks" rows={3} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">Create Project</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{projects.length}</div>
            <p className="text-sm text-white/80 mt-1">Total Projects</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{projects.filter(p => p.status === "Active").length}</div>
            <p className="text-sm text-white/80 mt-1">Active Projects</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">
              {Math.round(projects.reduce((sum, p) => sum + p.completionPercentage, 0) / projects.length)}%
            </div>
            <p className="text-sm text-white/80 mt-1">Average Completion</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-red-500 text-white">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">
              {projects.reduce((sum, p) => sum + p.milestones.length, 0)}
            </div>
            <p className="text-sm text-white/80 mt-1">Total Milestones</p>
          </CardContent>
        </Card>
      </div>

      {/* Projects Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Projects Overview</CardTitle>
              <CardDescription>Showing {projects.length} projects</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project ID</TableHead>
                <TableHead>Project Name</TableHead>
                <TableHead>Manager</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Expected End</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.projectId}>
                  <TableCell className="font-medium">{project.projectId}</TableCell>
                  <TableCell className="font-medium">{project.projectName}</TableCell>
                  <TableCell>{project.projectManager}</TableCell>
                  <TableCell>{project.startDate}</TableCell>
                  <TableCell>{project.expectedCompletionDate}</TableCell>
                  <TableCell>
                    <div className="space-y-1 min-w-[140px]">
                      <div className="flex items-center gap-2">
                        <Progress value={project.completionPercentage} className="h-2" />
                        <span className="text-xs font-medium">{project.completionPercentage}%</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedProject(project)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>{project.projectName}</DialogTitle>
                            <DialogDescription>Project details and milestones</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="text-muted-foreground">Project Manager</Label>
                                <p className="font-medium">{project.projectManager}</p>
                              </div>
                              <div>
                                <Label className="text-muted-foreground">Status</Label>
                                <div className="mt-1">
                                  <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="text-muted-foreground">Start Date</Label>
                                <p className="font-medium">{project.startDate}</p>
                              </div>
                              <div>
                                <Label className="text-muted-foreground">Expected Completion</Label>
                                <p className="font-medium">{project.expectedCompletionDate}</p>
                              </div>
                            </div>
                            <div>
                              <Label className="text-muted-foreground">Overall Progress</Label>
                              <div className="mt-2">
                                <Progress value={project.completionPercentage} className="h-3" />
                                <p className="text-sm mt-1 font-medium">{project.completionPercentage}% Complete</p>
                              </div>
                            </div>
                            <div>
                              <Label className="text-muted-foreground">Remarks</Label>
                              <p className="text-sm mt-1">{project.remarks}</p>
                            </div>
                            <div>
                              <Label className="text-muted-foreground mb-2 block">Milestones</Label>
                              <div className="space-y-2">
                                {project.milestones.map((milestone, idx) => (
                                  <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                      <Target className="h-4 w-4 text-muted-foreground" />
                                      <div>
                                        <p className="font-medium text-sm">{milestone.milestoneName}</p>
                                        <p className="text-xs text-muted-foreground">Due: {milestone.dueDate}</p>
                                      </div>
                                    </div>
                                    <Badge className={getMilestoneStatusColor(milestone.status)}>
                                      {milestone.status}
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}