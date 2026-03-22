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
  CheckCircle2,
  Clock,
  PlayCircle,
  Filter,
  Plus,
  MoreHorizontal,
  ArrowUpDown,
  Search,
} from "lucide-react";

type TaskStatus = "Completed" | "In Progress" | "Pending" | "On Hold";
type TaskPriority = "High" | "Medium" | "Low";
type TaskType = "Policy" | "Training" | "Compliance" | "Process" | "System";

interface Task {
  id: string;
  name: string;
  type: TaskType;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  assignee: string;
}

interface ActivityLog {
  id: string;
  taskId: string;
  taskName: string;
  action: string;
  user: string;
  timestamp: string;
}

const initialTasks: Task[] = [
  {
    id: "T-001",
    name: "Update Employee Handbook",
    type: "Policy",
    priority: "High",
    status: "In Progress",
    dueDate: "2026-03-28",
    assignee: "Amanda Torres",
  },
  {
    id: "T-002",
    name: "Conduct Anti-Harassment Training",
    type: "Training",
    priority: "High",
    status: "Pending",
    dueDate: "2026-04-05",
    assignee: "James Miller",
  },
  {
    id: "T-003",
    name: "Benefits Enrollment System Upgrade",
    type: "System",
    priority: "Medium",
    status: "In Progress",
    dueDate: "2026-04-10",
    assignee: "Rachel Kim",
  },
  {
    id: "T-004",
    name: "EEOC Compliance Audit Preparation",
    type: "Compliance",
    priority: "High",
    status: "Pending",
    dueDate: "2026-04-01",
    assignee: "Carlos Mendez",
  },
  {
    id: "T-005",
    name: "Onboarding Process Automation",
    type: "Process",
    priority: "Medium",
    status: "In Progress",
    dueDate: "2026-04-15",
    assignee: "Sophie Zhang",
  },
  {
    id: "T-006",
    name: "Quarterly Performance Review Setup",
    type: "Process",
    priority: "Medium",
    status: "Completed",
    dueDate: "2026-03-20",
    assignee: "Amanda Torres",
  },
  {
    id: "T-007",
    name: "Workplace Safety Policy Revision",
    type: "Policy",
    priority: "Low",
    status: "Completed",
    dueDate: "2026-03-18",
    assignee: "James Miller",
  },
  {
    id: "T-008",
    name: "Diversity & Inclusion Training Module",
    type: "Training",
    priority: "High",
    status: "In Progress",
    dueDate: "2026-03-30",
    assignee: "Rachel Kim",
  },
  {
    id: "T-009",
    name: "HRIS Data Migration Validation",
    type: "System",
    priority: "High",
    status: "On Hold",
    dueDate: "2026-04-12",
    assignee: "Carlos Mendez",
  },
  {
    id: "T-010",
    name: "Leave Policy Compliance Review",
    type: "Compliance",
    priority: "Low",
    status: "Completed",
    dueDate: "2026-03-15",
    assignee: "Sophie Zhang",
  },
];

const statusOptions: TaskStatus[] = [
  "Pending",
  "In Progress",
  "Completed",
  "On Hold",
];

const statusStyles: Record<TaskStatus, string> = {
  Completed: "bg-green-100 text-green-800",
  "In Progress": "bg-blue-100 text-blue-800",
  Pending: "bg-amber-100 text-amber-800",
  "On Hold": "bg-gray-100 text-gray-800",
};

const priorityStyles: Record<TaskPriority, string> = {
  High: "bg-red-100 text-red-800",
  Medium: "bg-orange-100 text-orange-800",
  Low: "bg-slate-100 text-slate-800",
};

const typeStyles: Record<TaskType, string> = {
  Policy: "bg-purple-100 text-purple-800",
  Training: "bg-indigo-100 text-indigo-800",
  Compliance: "bg-teal-100 text-teal-800",
  Process: "bg-cyan-100 text-cyan-800",
  System: "bg-pink-100 text-pink-800",
};

export default function ImplementationActivities() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activityLog, setActivityLog] = useState<ActivityLog[]>([
    {
      id: "A-001",
      taskId: "T-006",
      taskName: "Quarterly Performance Review Setup",
      action: "Marked as Completed",
      user: "Amanda Torres",
      timestamp: "2026-03-20 16:30",
    },
    {
      id: "A-002",
      taskId: "T-007",
      taskName: "Workplace Safety Policy Revision",
      action: "Marked as Completed",
      user: "James Miller",
      timestamp: "2026-03-18 14:15",
    },
    {
      id: "A-003",
      taskId: "T-010",
      taskName: "Leave Policy Compliance Review",
      action: "Marked as Completed",
      user: "Sophie Zhang",
      timestamp: "2026-03-15 11:00",
    },
  ]);

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === "All" || task.status === statusFilter;
    const matchesSearch =
      searchQuery === "" ||
      task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assignee.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleStatusUpdate = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      const newLog: ActivityLog = {
        id: `A-${Date.now()}`,
        taskId,
        taskName: task.name,
        action: `Status changed to ${newStatus}`,
        user: task.assignee,
        timestamp: new Date().toISOString().replace("T", " ").slice(0, 16),
      };
      setActivityLog((prev) => [newLog, ...prev]);
    }
  };

  const getNextStatus = (current: TaskStatus): TaskStatus | null => {
    const flow: Record<TaskStatus, TaskStatus | null> = {
      Pending: "In Progress",
      "In Progress": "Completed",
      "On Hold": "In Progress",
      Completed: null,
    };
    return flow[current];
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Implementation Activities
        </h2>
        <p className="text-muted-foreground">
          Manage and track HR implementation task execution and activities.
        </p>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Status:</span>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant={statusFilter === "All" ? "default" : "outline"}
                  onClick={() => setStatusFilter("All")}
                >
                  All
                </Button>
                {statusOptions.map((status) => (
                  <Button
                    key={status}
                    size="sm"
                    variant={
                      statusFilter === status ? "default" : "outline"
                    }
                    onClick={() => setStatusFilter(status)}
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Task Execution Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowUpDown className="h-5 w-5" />
            Task Execution
          </CardTitle>
          <CardDescription>
            {filteredTasks.length} task{filteredTasks.length !== 1 ? "s" : ""}{" "}
            {statusFilter !== "All" ? `with status "${statusFilter}"` : "total"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>Task Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No tasks found matching the current filters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredTasks.map((task) => {
                  const nextStatus = getNextStatus(task.status);
                  return (
                    <TableRow key={task.id}>
                      <TableCell className="font-mono text-xs">
                        {task.id}
                      </TableCell>
                      <TableCell className="font-medium">
                        {task.name}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${typeStyles[task.type]}`}
                        >
                          {task.type}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${priorityStyles[task.priority]}`}
                        >
                          {task.priority}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${statusStyles[task.status]}`}
                        >
                          {task.status === "Completed" && (
                            <CheckCircle2 className="h-3 w-3" />
                          )}
                          {task.status === "In Progress" && (
                            <PlayCircle className="h-3 w-3" />
                          )}
                          {task.status === "Pending" && (
                            <Clock className="h-3 w-3" />
                          )}
                          {task.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm">{task.dueDate}</TableCell>
                      <TableCell className="text-sm">
                        {task.assignee}
                      </TableCell>
                      <TableCell className="text-right">
                        {nextStatus ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleStatusUpdate(task.id, nextStatus)
                            }
                          >
                            {nextStatus === "In Progress"
                              ? "Start"
                              : nextStatus === "Completed"
                                ? "Complete"
                                : nextStatus}
                          </Button>
                        ) : (
                          <Badge variant="outline" className="text-green-700">
                            Done
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Activity Log */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Activity Log
          </CardTitle>
          <CardDescription>
            Record of all task status changes and updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          {activityLog.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-8">
              No activities logged yet.
            </p>
          ) : (
            <div className="space-y-3">
              {activityLog.map((log) => (
                <div
                  key={log.id}
                  className="flex items-start gap-3 border-b pb-3 last:border-0 last:pb-0"
                >
                  <div className="mt-0.5">
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{log.taskName}</p>
                    <p className="text-xs text-muted-foreground">
                      {log.action} &middot; {log.user} &middot; {log.timestamp}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">
                    {log.taskId}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
