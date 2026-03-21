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
import { Plus, Edit, Trash2, UserPlus, CheckCircle, Search } from "lucide-react";

interface Task {
  taskId: string;
  taskName: string;
  projectName: string;
  assignedMember: string;
  startDate: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
  status: "Not Started" | "In Progress" | "Completed" | "Blocked";
  progressPercentage: number;
  description: string;
}

export function TaskManagementView() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      taskId: "TSK001",
      taskName: "Conduct Gap Analysis",
      projectName: "ISO 27001 Implementation",
      assignedMember: "John Smith",
      startDate: "2024-03-01",
      dueDate: "2024-03-15",
      priority: "High",
      status: "Completed",
      progressPercentage: 100,
      description: "Complete gap analysis against ISO 27001 requirements"
    },
    {
      taskId: "TSK002",
      taskName: "Develop Information Security Policy",
      projectName: "ISO 27001 Implementation",
      assignedMember: "Sarah Johnson",
      startDate: "2024-03-10",
      dueDate: "2024-03-25",
      priority: "High",
      status: "In Progress",
      progressPercentage: 70,
      description: "Create comprehensive information security policy document"
    },
    {
      taskId: "TSK003",
      taskName: "Configure Access Control System",
      projectName: "ISO 27001 Implementation",
      assignedMember: "Mike Wilson",
      startDate: "2024-03-15",
      dueDate: "2024-03-30",
      priority: "Medium",
      status: "In Progress",
      progressPercentage: 45,
      description: "Set up and configure access control mechanisms"
    },
    {
      taskId: "TSK004",
      taskName: "Data Mapping Exercise",
      projectName: "GDPR Compliance Program",
      assignedMember: "Emily Davis",
      startDate: "2024-03-05",
      dueDate: "2024-03-20",
      priority: "High",
      status: "Blocked",
      progressPercentage: 30,
      description: "Map all personal data processing activities"
    },
    {
      taskId: "TSK005",
      taskName: "Update Privacy Policy",
      projectName: "GDPR Compliance Program",
      assignedMember: "John Smith",
      startDate: "2024-03-20",
      dueDate: "2024-04-05",
      priority: "Medium",
      status: "Not Started",
      progressPercentage: 0,
      description: "Revise privacy policy to align with GDPR requirements"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterProject, setFilterProject] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.taskName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignedMember.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProject = filterProject === "all" || task.projectName === filterProject;
    const matchesStatus = filterStatus === "all" || task.status === filterStatus;
    return matchesSearch && matchesProject && matchesStatus;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-500";
      case "Medium": return "bg-yellow-500";
      case "Low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-500";
      case "In Progress": return "bg-blue-500";
      case "Not Started": return "bg-gray-500";
      case "Blocked": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const handleAddTask = () => {
    console.log("Add task functionality");
    // Implementation for adding task
  };

  const handleEditTask = (taskId: string) => {
    console.log("Edit task:", taskId);
    // Implementation for editing task
  };

  const handleAssignMember = (taskId: string) => {
    console.log("Assign member to task:", taskId);
    // Implementation for assigning member
  };

  const handleDeleteTask = (taskId: string) => {
    if (confirm(`Are you sure you want to delete task ${taskId}?`)) {
      setTasks(tasks.filter(task => task.taskId !== taskId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Task Management</h2>
            <p className="text-white/90 mt-1">Manage project tasks and assignments</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-white text-purple-600 hover:bg-purple-50">
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
                <DialogDescription>Create a new project task</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="taskName">Task Name</Label>
                  <Input id="taskName" placeholder="Enter task name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="procedure">Procedure (from Standard)</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select procedure" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="p001">Information Security Incident Management</SelectItem>
                        <SelectItem value="p002">Access Control Management</SelectItem>
                        <SelectItem value="p003">Data Backup and Recovery</SelectItem>
                        <SelectItem value="p004">Risk Assessment Procedure</SelectItem>
                        <SelectItem value="p005">Change Management Process</SelectItem>
                        <SelectItem value="p006">Vendor Security Assessment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="template">Template (from Standard)</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tpl001">Security Policy Template</SelectItem>
                        <SelectItem value="tpl002">Risk Assessment Template</SelectItem>
                        <SelectItem value="tpl003">Incident Response Template</SelectItem>
                        <SelectItem value="tpl004">Access Control Template</SelectItem>
                        <SelectItem value="tpl005">Data Protection Template</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="assignee">Assigned Member</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select member" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john">John Smith</SelectItem>
                        <SelectItem value="sarah">Sarah Johnson</SelectItem>
                        <SelectItem value="mike">Mike Wilson</SelectItem>
                        <SelectItem value="emily">Emily Davis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="manager">Manager (Definition Phase)</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select manager" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mgr-john">John Smith (Security Manager)</SelectItem>
                        <SelectItem value="mgr-sarah">Sarah Johnson (Compliance Lead)</SelectItem>
                        <SelectItem value="mgr-robert">Robert Taylor (Operations Head)</SelectItem>
                        <SelectItem value="mgr-lisa">Lisa Anderson (Procurement Head)</SelectItem>
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
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input id="dueDate" type="date" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
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
                        <SelectItem value="notstarted">Not Started</SelectItem>
                        <SelectItem value="inprogress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="blocked">Blocked</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Task description" rows={3} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">Add Task</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{tasks.length}</div>
            <p className="text-sm text-white/80 mt-1">Total Tasks</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{tasks.filter(t => t.status === "Completed").length}</div>
            <p className="text-sm text-white/80 mt-1">Completed</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{tasks.filter(t => t.status === "In Progress").length}</div>
            <p className="text-sm text-white/80 mt-1">In Progress</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-red-500 to-orange-500 text-white">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{tasks.filter(t => t.status === "Blocked").length}</div>
            <p className="text-sm text-white/80 mt-1">Blocked</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">
              {Math.round(tasks.reduce((sum, t) => sum + t.progressPercentage, 0) / tasks.length)}%
            </div>
            <p className="text-sm text-white/80 mt-1">Avg Progress</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterProject} onValueChange={setFilterProject}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                <SelectItem value="ISO 27001 Implementation">ISO 27001 Implementation</SelectItem>
                <SelectItem value="GDPR Compliance Program">GDPR Compliance Program</SelectItem>
                <SelectItem value="Quality Management System">Quality Management System</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Not Started">Not Started</SelectItem>
                <SelectItem value="Blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tasks Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Tasks List</CardTitle>
              <CardDescription>Showing {filteredTasks.length} tasks</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task ID</TableHead>
                <TableHead>Task Name</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow key={task.taskId}>
                  <TableCell className="font-medium">{task.taskId}</TableCell>
                  <TableCell className="font-medium">{task.taskName}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{task.projectName}</Badge>
                  </TableCell>
                  <TableCell>{task.assignedMember}</TableCell>
                  <TableCell>{task.dueDate}</TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 min-w-[120px]">
                      <div className="flex items-center gap-2">
                        <Progress value={task.progressPercentage} className="h-2" />
                        <span className="text-xs font-medium">{task.progressPercentage}%</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditTask(task.taskId)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleAssignMember(task.taskId)}>
                        <UserPlus className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteTask(task.taskId)}>
                        <Trash2 className="h-4 w-4" />
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