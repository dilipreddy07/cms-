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
  Plus,
  Bug,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock,
  X,
} from "lucide-react";

type IssueStatus = "Open" | "In Progress" | "Resolved" | "Closed";
type IssuePriority = "Low" | "Medium" | "High" | "Critical";
type IssueCategory = "Technical" | "Process" | "Compliance" | "Resource" | "Other";

interface Issue {
  id: string;
  title: string;
  description: string;
  owner: string;
  status: IssueStatus;
  priority: IssuePriority;
  category: IssueCategory;
  createdDate: string;
}

const mockIssues: Issue[] = [
  {
    id: "ISS-001",
    title: "SSL Certificate Renewal Failure",
    description: "Automated SSL certificate renewal failed for three production endpoints.",
    owner: "Sarah Chen",
    status: "Open",
    priority: "Critical",
    category: "Technical",
    createdDate: "2026-03-20",
  },
  {
    id: "ISS-002",
    title: "Incomplete Audit Trail Logging",
    description: "Database audit logs missing entries for DELETE operations on sensitive tables.",
    owner: "Mark Johnson",
    status: "In Progress",
    priority: "High",
    category: "Compliance",
    createdDate: "2026-03-18",
  },
  {
    id: "ISS-003",
    title: "Delayed Vendor Security Assessment",
    description: "Third-party vendor has not provided security assessment documentation within SLA.",
    owner: "Priya Patel",
    status: "Open",
    priority: "Medium",
    category: "Process",
    createdDate: "2026-03-17",
  },
  {
    id: "ISS-004",
    title: "Insufficient Training Resources",
    description: "Security awareness training platform license capacity exceeded for new hires.",
    owner: "David Kim",
    status: "Resolved",
    priority: "Low",
    category: "Resource",
    createdDate: "2026-03-15",
  },
  {
    id: "ISS-005",
    title: "Firewall Rule Conflict",
    description: "Conflicting firewall rules causing intermittent connectivity issues in DMZ.",
    owner: "Lisa Wang",
    status: "In Progress",
    priority: "High",
    category: "Technical",
    createdDate: "2026-03-14",
  },
  {
    id: "ISS-006",
    title: "Policy Document Version Mismatch",
    description: "Published policy documents on intranet are outdated versions.",
    owner: "Sarah Chen",
    status: "Closed",
    priority: "Medium",
    category: "Process",
    createdDate: "2026-03-10",
  },
];

const statusConfig: Record<IssueStatus, { className: string; icon: typeof AlertCircle }> = {
  Open: { className: "border-red-300 bg-red-50 text-red-800 hover:bg-red-50", icon: AlertCircle },
  "In Progress": { className: "border-blue-300 bg-blue-50 text-blue-800 hover:bg-blue-50", icon: Clock },
  Resolved: { className: "border-green-300 bg-green-50 text-green-800 hover:bg-green-50", icon: CheckCircle2 },
  Closed: { className: "border-slate-300 bg-slate-50 text-slate-800 hover:bg-slate-50", icon: XCircle },
};

const priorityConfig: Record<IssuePriority, string> = {
  Low: "border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-50",
  Medium: "border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-50",
  High: "border-orange-300 bg-orange-50 text-orange-700 hover:bg-orange-50",
  Critical: "border-red-300 bg-red-50 text-red-700 hover:bg-red-50",
};

interface NewIssueForm {
  title: string;
  description: string;
  owner: string;
  priority: IssuePriority;
  category: IssueCategory;
}

const emptyForm: NewIssueForm = {
  title: "",
  description: "",
  owner: "",
  priority: "Medium",
  category: "Technical",
};

export default function IssueManagementPage() {
  const [issues, setIssues] = useState<Issue[]>(mockIssues);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<NewIssueForm>(emptyForm);

  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.owner.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || issue.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddIssue = () => {
    if (!form.title.trim() || !form.owner.trim()) return;

    const newIssue: Issue = {
      id: `ISS-${String(issues.length + 1).padStart(3, "0")}`,
      title: form.title,
      description: form.description,
      owner: form.owner,
      status: "Open",
      priority: form.priority,
      category: form.category,
      createdDate: new Date().toISOString().split("T")[0],
    };

    setIssues((prev) => [newIssue, ...prev]);
    setForm(emptyForm);
    setShowForm(false);
  };

  const handleStatusChange = (issueId: string, newStatus: IssueStatus) => {
    setIssues((prev) =>
      prev.map((issue) =>
        issue.id === issueId ? { ...issue, status: newStatus } : issue
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Issue Management</h2>
          <p className="text-muted-foreground">
            Log, track, and resolve implementation issues.
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? "Cancel" : "Log New Issue"}
        </Button>
      </div>

      {/* New Issue Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bug className="h-5 w-5" />
              Log New Issue
            </CardTitle>
            <CardDescription>Provide details about the issue to create a new entry.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium">Title</label>
                <Input
                  placeholder="Enter issue title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium">Description</label>
                <Input
                  placeholder="Describe the issue in detail"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Assign Owner</label>
                <Input
                  placeholder="Owner name"
                  value={form.owner}
                  onChange={(e) => setForm({ ...form, owner: e.target.value })}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Priority</label>
                <Select
                  value={form.priority}
                  onValueChange={(value) => setForm({ ...form, priority: value as IssuePriority })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Category</label>
                <Select
                  value={form.category}
                  onValueChange={(value) => setForm({ ...form, category: value as IssueCategory })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technical">Technical</SelectItem>
                    <SelectItem value="Process">Process</SelectItem>
                    <SelectItem value="Compliance">Compliance</SelectItem>
                    <SelectItem value="Resource">Resource</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button onClick={handleAddIssue} className="w-full">
                  Submit Issue
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search issues or owner..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Issues Table */}
      <Card>
        <CardHeader>
          <CardTitle>Issue Log</CardTitle>
          <CardDescription>
            {filteredIssues.length} issue{filteredIssues.length !== 1 ? "s" : ""} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIssues.map((issue) => {
                const StatusIcon = statusConfig[issue.status].icon;
                return (
                  <TableRow key={issue.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{issue.title}</p>
                        <p className="text-xs text-muted-foreground">{issue.id} / {issue.category}</p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden max-w-[250px] truncate md:table-cell">
                      {issue.description}
                    </TableCell>
                    <TableCell>{issue.owner}</TableCell>
                    <TableCell>
                      <Select
                        value={issue.status}
                        onValueChange={(value) => handleStatusChange(issue.id, value as IssueStatus)}
                      >
                        <SelectTrigger className="h-8 w-[130px] border-0 p-0">
                          <Badge variant="outline" className={`gap-1 ${statusConfig[issue.status].className}`}>
                            <StatusIcon className="h-3 w-3" />
                            {issue.status}
                          </Badge>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Open">Open</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="Resolved">Resolved</SelectItem>
                          <SelectItem value="Closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={priorityConfig[issue.priority]}>
                        {issue.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{issue.createdDate}</TableCell>
                  </TableRow>
                );
              })}
              {filteredIssues.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    No issues match the current filters.
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
