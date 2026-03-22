"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
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
  Plus,
  ListChecks,
  Filter,
  X,
} from "lucide-react";

type Priority = "low" | "medium" | "high";
type TaskStatus = "pending" | "in-progress" | "completed";

interface Task {
  id: string;
  title: string;
  description: string;
  template: string;
  assignedTo: string;
  priority: Priority;
  deadline: string;
  status: TaskStatus;
}

const mockTemplates = [
  "Audit Report Template",
  "CAPA Form Template",
  "Risk Register Template",
  "Incident Report Template",
  "Vendor Evaluation Template",
];

const mockTasks: Task[] = [
  { id: "t1", title: "Complete ISO 9001 audit preparation", description: "Prepare all documents for the upcoming audit", template: "Audit Report Template", assignedTo: "Sarah Chen", priority: "high", deadline: "2026-04-01", status: "in-progress" },
  { id: "t2", title: "Update risk register entries", description: "Review and update all risk entries for Q1", template: "Risk Register Template", assignedTo: "Mark Johnson", priority: "medium", deadline: "2026-04-05", status: "pending" },
  { id: "t3", title: "File incident report for server outage", description: "Document the March 15 server outage incident", template: "Incident Report Template", assignedTo: "David Lee", priority: "high", deadline: "2026-03-25", status: "completed" },
  { id: "t4", title: "Vendor quarterly assessment", description: "Conduct Q1 vendor performance assessment", template: "Vendor Evaluation Template", assignedTo: "Emily Wang", priority: "low", deadline: "2026-04-15", status: "pending" },
  { id: "t5", title: "Submit CAPA for process deviation", description: "Complete corrective action for manufacturing deviation", template: "CAPA Form Template", assignedTo: "Sarah Chen", priority: "medium", deadline: "2026-04-10", status: "in-progress" },
  { id: "t6", title: "Review access control documentation", description: "Annual review of access control policies", template: "Audit Report Template", assignedTo: "James Park", priority: "medium", deadline: "2026-04-08", status: "pending" },
];

function getStatusBadge(status: TaskStatus) {
  const config: Record<TaskStatus, { variant: "default" | "secondary" | "outline"; label: string; className: string }> = {
    completed: { variant: "default", label: "Completed", className: "bg-emerald-600 hover:bg-emerald-700" },
    "in-progress": { variant: "secondary", label: "In Progress", className: "bg-amber-500 text-white hover:bg-amber-600" },
    pending: { variant: "outline", label: "Pending", className: "" },
  };
  const c = config[status];
  return <Badge variant={c.variant} className={c.className}>{c.label}</Badge>;
}

function getPriorityBadge(priority: Priority) {
  const config: Record<Priority, { className: string; label: string }> = {
    high: { className: "bg-red-100 text-red-800 border-red-200", label: "High" },
    medium: { className: "bg-amber-100 text-amber-800 border-amber-200", label: "Medium" },
    low: { className: "bg-green-100 text-green-800 border-green-200", label: "Low" },
  };
  const c = config[priority];
  return <Badge variant="outline" className={c.className}>{c.label}</Badge>;
}

function TaskManagement() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    template: "",
    assignedTo: "",
    priority: "medium" as Priority,
    deadline: "",
  });

  const handleCreateTask = () => {
    if (!newTask.title.trim() || !newTask.template) return;
    const task: Task = {
      id: `t-${Date.now()}`,
      title: newTask.title,
      description: newTask.description,
      template: newTask.template,
      assignedTo: newTask.assignedTo || "Unassigned",
      priority: newTask.priority,
      deadline: newTask.deadline || "No deadline",
      status: "pending",
    };
    setTasks([task, ...tasks]);
    setNewTask({ title: "", description: "", template: "", assignedTo: "", priority: "medium", deadline: "" });
    setShowCreateForm(false);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filterStatus !== "all" && task.status !== filterStatus) return false;
    if (filterPriority !== "all" && task.priority !== filterPriority) return false;
    return true;
  });

  const statusCounts = {
    pending: tasks.filter((t) => t.status === "pending").length,
    "in-progress": tasks.filter((t) => t.status === "in-progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Task Management</h1>
          <p className="text-muted-foreground mt-1">
            Create and assign tasks manually, linked to templates.
          </p>
        </div>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          {showCreateForm ? (
            <>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Create Task
            </>
          )}
        </Button>
      </div>

      {/* Status Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold">{statusCounts.pending}</p>
            </div>
            <ListChecks className="h-8 w-8 text-muted-foreground" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">In Progress</p>
              <p className="text-2xl font-bold text-amber-600">{statusCounts["in-progress"]}</p>
            </div>
            <ListChecks className="h-8 w-8 text-amber-500" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold text-emerald-600">{statusCounts.completed}</p>
            </div>
            <ListChecks className="h-8 w-8 text-emerald-500" />
          </CardContent>
        </Card>
      </div>

      {/* Create Task Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Create New Task</CardTitle>
            <CardDescription>Select a template and fill in task details manually.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Template *</label>
                <Select value={newTask.template} onValueChange={(v) => setNewTask({ ...newTask, template: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockTemplates.map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Task Title *</label>
                <Input
                  placeholder="Enter task title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Description</label>
                <Input
                  placeholder="Enter task description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Assign To</label>
                <Input
                  placeholder="User or role name"
                  value={newTask.assignedTo}
                  onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <Select value={newTask.priority} onValueChange={(v) => setNewTask({ ...newTask, priority: v as Priority })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Deadline</label>
                <Input
                  type="date"
                  value={newTask.deadline}
                  onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                />
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button onClick={handleCreateTask}>Create Task</Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters and Task Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Task List</CardTitle>
              <CardDescription>{filteredTasks.length} task(s) found</CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task Title</TableHead>
                <TableHead>Template</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{task.title}</p>
                      <p className="text-xs text-muted-foreground">{task.description}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{task.template}</TableCell>
                  <TableCell className="text-sm">{task.assignedTo}</TableCell>
                  <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                  <TableCell className="text-sm">{task.deadline}</TableCell>
                  <TableCell>{getStatusBadge(task.status)}</TableCell>
                </TableRow>
              ))}
              {filteredTasks.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No tasks match the current filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default TaskManagement;
