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
import { Plus, Edit, UserPlus, XCircle, AlertOctagon, Search } from "lucide-react";

interface Issue {
  issueId: string;
  issueTitle: string;
  description: string;
  category: "Technical Issue" | "Resource Issue" | "Requirement Clarification" | "Process Deviation";
  priority: "Critical" | "High" | "Medium" | "Low";
  assignedOwner: string;
  createdDate: string;
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  resolutionNotes: string;
}

export function IssueManagementView() {
  const [issues, setIssues] = useState<Issue[]>([
    {
      issueId: "ISS001",
      issueTitle: "Access Control System Configuration Error",
      description: "Unable to configure role-based access control due to system compatibility issues",
      category: "Technical Issue",
      priority: "Critical",
      assignedOwner: "Mike Wilson",
      createdDate: "2024-03-10",
      status: "In Progress",
      resolutionNotes: "Investigating compatibility with existing infrastructure"
    },
    {
      issueId: "ISS002",
      issueTitle: "Documentation Resource Shortage",
      description: "Insufficient technical writers to complete policy documentation on time",
      category: "Resource Issue",
      priority: "High",
      assignedOwner: "Sarah Johnson",
      createdDate: "2024-03-12",
      status: "Open",
      resolutionNotes: ""
    },
    {
      issueId: "ISS003",
      issueTitle: "GDPR Data Processing Requirements Unclear",
      description: "Need clarification on data retention requirements for specific data categories",
      category: "Requirement Clarification",
      priority: "Medium",
      assignedOwner: "John Smith",
      createdDate: "2024-03-08",
      status: "Resolved",
      resolutionNotes: "Clarified with legal team - 7 year retention for financial data"
    },
    {
      issueId: "ISS004",
      issueTitle: "Unapproved Change to Security Procedure",
      description: "Security procedure was modified without going through change control process",
      category: "Process Deviation",
      priority: "High",
      assignedOwner: "Emily Davis",
      createdDate: "2024-03-15",
      status: "Open",
      resolutionNotes: ""
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredIssues = issues.filter(issue =>
    issue.issueTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    issue.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-600";
      case "High": return "bg-orange-500";
      case "Medium": return "bg-yellow-500";
      case "Low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved": return "bg-green-500";
      case "In Progress": return "bg-blue-500";
      case "Pending": return "bg-yellow-500";
      case "Escalated": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const handleAddIssue = () => {
    console.log("Add issue functionality");
    // Implementation for adding issue
  };

  const handleEditIssue = (issueId: string) => {
    console.log("Edit issue:", issueId);
    // Implementation for editing issue
  };

  const handleAssignOwner = (issueId: string) => {
    console.log("Assign owner to issue:", issueId);
    // Implementation for assigning owner
  };

  const handleResolveIssue = (issueId: string) => {
    if (confirm(`Are you sure you want to resolve issue ${issueId}?`)) {
      setIssues(issues.map(issue => 
        issue.issueId === issueId ? { ...issue, status: "Resolved" } : issue
      ));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Issue Management</h2>
            <p className="text-white/90 mt-1">Track problems and blockers encountered during project execution</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-white text-orange-600 hover:bg-orange-50">
                <Plus className="h-4 w-4 mr-2" />
                Create Issue
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Issue</DialogTitle>
                <DialogDescription>Report a new project issue or blocker</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="issueTitle">Issue Title</Label>
                  <Input id="issueTitle" placeholder="Enter issue title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe the issue in detail" rows={4} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Technical Issue</SelectItem>
                        <SelectItem value="resource">Resource Issue</SelectItem>
                        <SelectItem value="requirement">Requirement Clarification</SelectItem>
                        <SelectItem value="process">Process Deviation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="owner">Assigned Owner</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select owner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john">John Smith</SelectItem>
                      <SelectItem value="sarah">Sarah Johnson</SelectItem>
                      <SelectItem value="mike">Mike Wilson</SelectItem>
                      <SelectItem value="emily">Emily Davis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button className="bg-gradient-to-r from-orange-500 to-red-500 text-white">Create Issue</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{issues.length}</div>
            <p className="text-sm text-white/80 mt-1">Total Issues</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-red-500 to-orange-500 text-white">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{issues.filter(i => i.status === "Open").length}</div>
            <p className="text-sm text-white/80 mt-1">Open Issues</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{issues.filter(i => i.status === "In Progress").length}</div>
            <p className="text-sm text-white/80 mt-1">In Progress</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{issues.filter(i => i.status === "Resolved").length}</div>
            <p className="text-sm text-white/80 mt-1">Resolved</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-red-600 to-pink-600 text-white">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{issues.filter(i => i.priority === "Critical").length}</div>
            <p className="text-sm text-white/80 mt-1">Critical</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search issues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Issues Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Issues List</CardTitle>
              <CardDescription>Showing {filteredIssues.length} issues</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Issue ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Assigned Owner</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIssues.map((issue) => (
                <TableRow key={issue.issueId}>
                  <TableCell className="font-medium">{issue.issueId}</TableCell>
                  <TableCell className="font-medium max-w-xs truncate">{issue.issueTitle}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{issue.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(issue.priority)}>{issue.priority}</Badge>
                  </TableCell>
                  <TableCell>{issue.assignedOwner}</TableCell>
                  <TableCell>{issue.createdDate}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(issue.status)}>{issue.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditIssue(issue.issueId)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleAssignOwner(issue.issueId)}>
                        <UserPlus className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleResolveIssue(issue.issueId)}>
                        <XCircle className="h-4 w-4" />
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