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
  CheckCircle,
  XCircle,
  Clock,
  Search,
  MessageSquare,
} from "lucide-react";

type ReviewStatus = "Pending Review" | "Approved" | "Rejected";

interface ReviewTask {
  id: string;
  taskName: string;
  submittedBy: string;
  completionDate: string;
  status: ReviewStatus;
  reviewNotes: string;
}

const initialTasks: ReviewTask[] = [
  {
    id: "1",
    taskName: "Safety Inspection Protocol",
    submittedBy: "Alice Martin",
    completionDate: "2026-03-18",
    status: "Pending Review",
    reviewNotes: "",
  },
  {
    id: "2",
    taskName: "Environmental Impact Assessment",
    submittedBy: "Bob Richards",
    completionDate: "2026-03-17",
    status: "Approved",
    reviewNotes: "Meets all regulatory requirements. Well documented.",
  },
  {
    id: "3",
    taskName: "Quality Control Checklist - Phase A",
    submittedBy: "Carol Zhang",
    completionDate: "2026-03-16",
    status: "Rejected",
    reviewNotes: "Missing documentation for items 4-7. Please resubmit.",
  },
  {
    id: "4",
    taskName: "Risk Mitigation Plan",
    submittedBy: "David Kim",
    completionDate: "2026-03-19",
    status: "Pending Review",
    reviewNotes: "",
  },
  {
    id: "5",
    taskName: "Compliance Audit Report",
    submittedBy: "Eva Gonzalez",
    completionDate: "2026-03-15",
    status: "Approved",
    reviewNotes: "Thorough audit with clear findings and recommendations.",
  },
  {
    id: "6",
    taskName: "Training Completion Records",
    submittedBy: "Frank Liu",
    completionDate: "2026-03-20",
    status: "Pending Review",
    reviewNotes: "",
  },
  {
    id: "7",
    taskName: "Operational Readiness Assessment",
    submittedBy: "Grace Thompson",
    completionDate: "2026-03-14",
    status: "Rejected",
    reviewNotes: "Several criteria not met. Needs rework on sections 2 and 5.",
  },
  {
    id: "8",
    taskName: "Data Integrity Verification",
    submittedBy: "Henry Park",
    completionDate: "2026-03-21",
    status: "Pending Review",
    reviewNotes: "",
  },
];

function ReviewPage() {
  const [tasks, setTasks] = useState<ReviewTask[]>(initialTasks);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = filterStatus === "all" || task.status === filterStatus;
    const matchesSearch =
      task.taskName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.submittedBy.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleApprove = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, status: "Approved" as ReviewStatus, reviewNotes: noteText || task.reviewNotes }
          : task
      )
    );
    setActiveNoteId(null);
    setNoteText("");
  };

  const handleReject = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, status: "Rejected" as ReviewStatus, reviewNotes: noteText || task.reviewNotes }
          : task
      )
    );
    setActiveNoteId(null);
    setNoteText("");
  };

  const toggleNotes = (taskId: string, existingNotes: string) => {
    if (activeNoteId === taskId) {
      setActiveNoteId(null);
      setNoteText("");
    } else {
      setActiveNoteId(taskId);
      setNoteText(existingNotes);
    }
  };

  const getStatusBadge = (status: ReviewStatus) => {
    switch (status) {
      case "Approved":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="mr-1 h-3 w-3" /> Approved
          </Badge>
        );
      case "Rejected":
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="mr-1 h-3 w-3" /> Rejected
          </Badge>
        );
      case "Pending Review":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="mr-1 h-3 w-3" /> Pending Review
          </Badge>
        );
    }
  };

  const statusCounts = {
    all: tasks.length,
    pending: tasks.filter((t) => t.status === "Pending Review").length,
    approved: tasks.filter((t) => t.status === "Approved").length,
    rejected: tasks.filter((t) => t.status === "Rejected").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Review Tasks</h2>
        <p className="text-muted-foreground">
          Review and approve or reject completed tasks
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{statusCounts.all}</div>
            <p className="text-xs text-muted-foreground">Total Tasks</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</div>
            <p className="text-xs text-muted-foreground">Pending Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{statusCounts.approved}</div>
            <p className="text-xs text-muted-foreground">Approved</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">{statusCounts.rejected}</div>
            <p className="text-xs text-muted-foreground">Rejected</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Task Review Queue</CardTitle>
          <CardDescription>
            Approve or reject tasks, and add review notes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks or submitters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Pending Review">Pending Review</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task Name</TableHead>
                  <TableHead>Submitted By</TableHead>
                  <TableHead>Completion Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.map((task) => (
                  <>
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.taskName}</TableCell>
                      <TableCell>{task.submittedBy}</TableCell>
                      <TableCell>{task.completionDate}</TableCell>
                      <TableCell>{getStatusBadge(task.status)}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleNotes(task.id, task.reviewNotes)}
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </TableCell>
                      <TableCell className="text-right">
                        {task.status === "Pending Review" && (
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-600 hover:text-green-700 hover:bg-green-50"
                              onClick={() => handleApprove(task.id)}
                            >
                              <CheckCircle className="mr-1 h-4 w-4" /> Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleReject(task.id)}
                            >
                              <XCircle className="mr-1 h-4 w-4" /> Reject
                            </Button>
                          </div>
                        )}
                        {task.status !== "Pending Review" && (
                          <span className="text-sm text-muted-foreground">Reviewed</span>
                        )}
                      </TableCell>
                    </TableRow>
                    {activeNoteId === task.id && (
                      <TableRow key={`${task.id}-notes`}>
                        <TableCell colSpan={6}>
                          <div className="p-2 space-y-2">
                            <label className="text-sm font-medium">Review Notes</label>
                            <textarea
                              className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              placeholder="Add review notes..."
                              value={noteText}
                              onChange={(e) => setNoteText(e.target.value)}
                            />
                            {task.status === "Pending Review" && (
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700"
                                  onClick={() => handleApprove(task.id)}
                                >
                                  Approve with Notes
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleReject(task.id)}
                                >
                                  Reject with Notes
                                </Button>
                              </div>
                            )}
                            {task.reviewNotes && task.status !== "Pending Review" && (
                              <p className="text-sm text-muted-foreground italic">
                                Previous notes: {task.reviewNotes}
                              </p>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
                {filteredTasks.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No tasks found matching your criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ReviewPage;
