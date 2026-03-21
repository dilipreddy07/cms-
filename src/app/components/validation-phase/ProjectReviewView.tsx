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
import { Plus, Edit, Eye, CheckCircle, XCircle, Clock, Search } from "lucide-react";

interface ProjectReview {
  id: string;
  projectName: string;
  projectManager: string;
  startDate: string;
  completionDate: string;
  milestonesCompleted: number;
  totalMilestones: number;
  deliverablesSubmitted: number;
  totalDeliverables: number;
  reviewStatus: "Approved" | "Pending" | "Rework Required";
  reviewerComments: string;
}

export function ProjectReviewView() {
  const [reviews, setReviews] = useState<ProjectReview[]>([
    {
      id: "PR001",
      projectName: "ISO 27001 Implementation",
      projectManager: "John Smith",
      startDate: "2026-01-10",
      completionDate: "2026-03-15",
      milestonesCompleted: 8,
      totalMilestones: 8,
      deliverablesSubmitted: 12,
      totalDeliverables: 12,
      reviewStatus: "Approved",
      reviewerComments: "All deliverables meet requirements. Excellent documentation quality."
    },
    {
      id: "PR002",
      projectName: "GDPR Compliance Project",
      projectManager: "Sarah Johnson",
      startDate: "2026-02-01",
      completionDate: "2026-04-20",
      milestonesCompleted: 6,
      totalMilestones: 7,
      deliverablesSubmitted: 10,
      totalDeliverables: 11,
      reviewStatus: "Pending",
      reviewerComments: "Awaiting final deliverable submission."
    },
    {
      id: "PR003",
      projectName: "SOC 2 Audit Preparation",
      projectManager: "Michael Brown",
      startDate: "2026-01-15",
      completionDate: "2026-03-25",
      milestonesCompleted: 5,
      totalMilestones: 6,
      deliverablesSubmitted: 8,
      totalDeliverables: 10,
      reviewStatus: "Rework Required",
      reviewerComments: "Documentation incomplete. Security controls need additional evidence."
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<ProjectReview | null>(null);

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.projectManager.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || review.reviewStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-green-500 text-white";
      case "Pending": return "bg-amber-500 text-white";
      case "Rework Required": return "bg-red-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved": return <CheckCircle className="h-4 w-4" />;
      case "Pending": return <Clock className="h-4 w-4" />;
      case "Rework Required": return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleView = (review: ProjectReview) => {
    setSelectedReview(review);
    setViewDialogOpen(true);
  };

  const handleEdit = (review: ProjectReview) => {
    setSelectedReview(review);
    setEditDialogOpen(true);
  };

  const handleApprove = (id: string) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, reviewStatus: "Approved" as const } : r));
  };

  const handleRequestRework = (id: string) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, reviewStatus: "Rework Required" as const } : r));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Project Review</h2>
            <p className="text-blue-50 mt-1">Evaluate project deliverables and verify completion status</p>
          </div>
          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-white text-purple-600 hover:bg-purple-50">
                <Plus className="h-4 w-4 mr-2" />
                Create Project Review
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Project Review</DialogTitle>
                <DialogDescription>Add a new project review to evaluate deliverables and completion</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="projectName">Project Name *</Label>
                    <Input id="projectName" placeholder="Enter project name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="projectManager">Project Manager *</Label>
                    <Input id="projectManager" placeholder="Enter manager name" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input id="startDate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="completionDate">Completion Date *</Label>
                    <Input id="completionDate" type="date" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="milestonesCompleted">Milestones Completed *</Label>
                    <Input id="milestonesCompleted" type="number" placeholder="e.g., 8" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalMilestones">Total Milestones *</Label>
                    <Input id="totalMilestones" type="number" placeholder="e.g., 10" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="deliverablesSubmitted">Deliverables Submitted *</Label>
                    <Input id="deliverablesSubmitted" type="number" placeholder="e.g., 12" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalDeliverables">Total Deliverables *</Label>
                    <Input id="totalDeliverables" type="number" placeholder="e.g., 15" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reviewStatus">Review Status *</Label>
                  <Select defaultValue="Pending">
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="Rework Required">Rework Required</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reviewerComments">Reviewer Comments</Label>
                  <Textarea id="reviewerComments" placeholder="Add review comments or observations" rows={4} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setAddDialogOpen(false)}>Cancel</Button>
                <Button className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">Create Review</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{reviews.length}</div>
            <p className="text-sm text-blue-50 mt-1">Total Reviews</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{reviews.filter(r => r.reviewStatus === "Approved").length}</div>
            <p className="text-sm text-green-50 mt-1">Approved</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-500 to-orange-500 text-white">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{reviews.filter(r => r.reviewStatus === "Pending").length}</div>
            <p className="text-sm text-amber-50 mt-1">Pending Review</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-red-500 to-pink-500 text-white">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{reviews.filter(r => r.reviewStatus === "Rework Required").length}</div>
            <p className="text-sm text-red-50 mt-1">Rework Required</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Project Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by project name, ID, or manager..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Rework Required">Rework Required</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reviews Table */}
      <Card>
        <CardHeader>
          <CardTitle>Project Reviews List</CardTitle>
          <CardDescription>Showing {filteredReviews.length} project reviews</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Review ID</TableHead>
                <TableHead>Project Name</TableHead>
                <TableHead>Project Manager</TableHead>
                <TableHead>Milestones</TableHead>
                <TableHead>Deliverables</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">{review.id}</TableCell>
                  <TableCell>{review.projectName}</TableCell>
                  <TableCell>{review.projectManager}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{review.milestonesCompleted}/{review.totalMilestones}</span>
                      {review.milestonesCompleted === review.totalMilestones && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{review.deliverablesSubmitted}/{review.totalDeliverables}</span>
                      {review.deliverablesSubmitted === review.totalDeliverables && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(review.reviewStatus)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(review.reviewStatus)}
                        {review.reviewStatus}
                      </span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleView(review)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(review)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      {review.reviewStatus === "Pending" && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleApprove(review.id)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleRequestRework(review.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>View Project Review</DialogTitle>
            <DialogDescription>Detailed project review information</DialogDescription>
          </DialogHeader>
          {selectedReview && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-semibold">Review ID</Label>
                  <div className="p-2 border rounded-md bg-gray-50">{selectedReview.id}</div>
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold">Review Status</Label>
                  <Badge className={getStatusColor(selectedReview.reviewStatus)}>
                    {selectedReview.reviewStatus}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-semibold">Project Name</Label>
                  <div className="p-2 border rounded-md bg-gray-50">{selectedReview.projectName}</div>
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold">Project Manager</Label>
                  <div className="p-2 border rounded-md bg-gray-50">{selectedReview.projectManager}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-semibold">Start Date</Label>
                  <div className="p-2 border rounded-md bg-gray-50">{new Date(selectedReview.startDate).toLocaleDateString()}</div>
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold">Completion Date</Label>
                  <div className="p-2 border rounded-md bg-gray-50">{new Date(selectedReview.completionDate).toLocaleDateString()}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-semibold">Milestones Completed</Label>
                  <div className="p-2 border rounded-md bg-gray-50">
                    {selectedReview.milestonesCompleted} / {selectedReview.totalMilestones}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold">Deliverables Submitted</Label>
                  <div className="p-2 border rounded-md bg-gray-50">
                    {selectedReview.deliverablesSubmitted} / {selectedReview.totalDeliverables}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Reviewer Comments</Label>
                <div className="p-3 border rounded-md bg-gray-50 min-h-[80px]">
                  {selectedReview.reviewerComments || "No comments provided"}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Update Project Review</DialogTitle>
            <DialogDescription>Modify project review details and status</DialogDescription>
          </DialogHeader>
          {selectedReview && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-status">Review Status *</Label>
                <Select defaultValue={selectedReview.reviewStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Rework Required">Rework Required</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-comments">Reviewer Comments</Label>
                <Textarea 
                  id="edit-comments" 
                  defaultValue={selectedReview.reviewerComments}
                  placeholder="Add review comments or observations" 
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
