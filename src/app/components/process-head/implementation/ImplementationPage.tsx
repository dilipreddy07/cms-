"use client";

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
  Search,
  Filter,
  CheckCircle2,
  Clock,
  PlayCircle,
  MoreHorizontal,
} from "lucide-react";

type TaskStatus = "Pending" | "In Progress" | "Completed";
type TaskPriority = "Low" | "Medium" | "High" | "Critical";

interface Task {
  id: string;
  name: string;
  assignedBy: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
}

const mockTasks: Task[] = [
  {
    id: "T-001",
    name: "Implement Access Control Policy",
    assignedBy: "Michael Roberts",
    priority: "High",
    status: "In Progress",
    dueDate: "2026-03-28",
  },
  {
    id: "T-002",
    name: "Deploy Data Encryption Standards",
    assignedBy: "Jennifer Lee",
    priority: "Critical",
    status: "Pending",
    dueDate: "2026-04-02",
  },
  {
    id: "T-003",
    name: "Configure Network Monitoring Tools",
    assignedBy: "Michael Roberts",
    priority: "High",
    status: "In Progress",
    dueDate: "2026-03-30",
  },
  {
    id: "T-004",
    name: "Complete Security Awareness Training Module",
    assignedBy: "Amanda Foster",
    priority: "Medium",
    status: "Completed",
    dueDate: "2026-03-20",
  },
  {
    id: "T-005",
    name: "Set Up Vulnerability Scanning Schedule",
    assignedBy: "Jennifer Lee",
    priority: "High",
    status: "Pending",
    dueDate: "2026-04-05",
  },
  {
    id: "T-006",
    name: "Document Incident Response Procedures",
    assignedBy: "Amanda Foster",
    priority: "Medium",
    status: "Completed",
    dueDate: "2026-03-18",
  },
  {
    id: "T-007",
    name: "Review Third-Party Vendor Agreements",
    assignedBy: "Michael Roberts",
    priority: "Low",
    status: "Pending",
    dueDate: "2026-04-10",
  },
  {
    id: "T-008",
    name: "Implement Multi-Factor Authentication",
    assignedBy: "Jennifer Lee",
    priority: "Critical",
    status: "In Progress",
    dueDate: "2026-03-25",
  },
  {
    id: "T-009",
    name: "Conduct Backup and Recovery Test",
    assignedBy: "Amanda Foster",
    priority: "Medium",
    status: "Completed",
    dueDate: "2026-03-15",
  },
  {
    id: "T-010",
    name: "Update Firewall Rules and ACLs",
    assignedBy: "Michael Roberts",
    priority: "High",
    status: "In Progress",
    dueDate: "2026-03-27",
  },
];

const statusConfig: Record<TaskStatus, { variant: "default" | "secondary" | "destructive" | "outline"; className: string }> = {
  Pending: { variant: "outline", className: "border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-50" },
  "In Progress": { variant: "outline", className: "border-blue-300 bg-blue-50 text-blue-800 hover:bg-blue-50" },
  Completed: { variant: "outline", className: "border-green-300 bg-green-50 text-green-800 hover:bg-green-50" },
};

const priorityConfig: Record<TaskPriority, string> = {
  Low: "text-slate-600",
  Medium: "text-amber-600",
  High: "text-orange-600 font-semibold",
  Critical: "text-red-600 font-bold",
};

export default function ImplementationPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assignedBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || task.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const statusIcon = (status: TaskStatus) => {
    switch (status) {
      case "Pending":
        return <Clock className="h-3.5 w-3.5" />;
      case "In Progress":
        return <PlayCircle className="h-3.5 w-3.5" />;
      case "Completed":
        return <CheckCircle2 className="h-3.5 w-3.5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Implementation Tasks</h2>
        <p className="text-muted-foreground">
          Execute and manage assigned implementation tasks.
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search tasks or assignee..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tasks Table */}
      <Card>
        <CardHeader>
          <CardTitle>Assigned Tasks</CardTitle>
          <CardDescription>
            {filteredTasks.length} task{filteredTasks.length !== 1 ? "s" : ""} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task Name</TableHead>
                <TableHead>Assigned By</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{task.name}</p>
                      <p className="text-xs text-muted-foreground">{task.id}</p>
                    </div>
                  </TableCell>
                  <TableCell>{task.assignedBy}</TableCell>
                  <TableCell>
                    <span className={priorityConfig[task.priority]}>{task.priority}</span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={statusConfig[task.status].variant}
                      className={`gap-1 ${statusConfig[task.status].className}`}
                    >
                      {statusIcon(task.status)}
                      {task.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={new Date(task.dueDate) < new Date() && task.status !== "Completed" ? "text-red-600 font-medium" : ""}>
                      {task.dueDate}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={task.status}
                      onValueChange={(value) => handleStatusChange(task.id, value as TaskStatus)}
                    >
                      <SelectTrigger className="h-8 w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
              {filteredTasks.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
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
