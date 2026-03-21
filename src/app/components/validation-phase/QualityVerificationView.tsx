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
import { Plus, Edit, Eye, CheckCircle, XCircle, Search } from "lucide-react";

interface QualityVerification {
  id: string;
  projectName: string;
  standardName: string;
  checklistItemsReviewed: number;
  totalChecklistItems: number;
  verificationResult: "Passed" | "Failed" | "Pending";
  reviewer: string;
  verificationDate: string;
  observations: string;
}

export function QualityVerificationView() {
  const [verifications, setVerifications] = useState<QualityVerification[]>([
    {
      id: "QV001",
      projectName: "ISO 27001 Implementation",
      standardName: "ISO 27001:2013",
      checklistItemsReviewed: 114,
      totalChecklistItems: 114,
      verificationResult: "Passed",
      reviewer: "Jane Wilson",
      verificationDate: "2026-03-20",
      observations: "All security controls implemented correctly. Documentation is comprehensive and meets standard requirements."
    },
    {
      id: "QV002",
      projectName: "GDPR Compliance Project",
      standardName: "GDPR",
      checklistItemsReviewed: 45,
      totalChecklistItems: 52,
      verificationResult: "Pending",
      reviewer: "Tom Anderson",
      verificationDate: "2026-04-22",
      observations: "Awaiting final privacy impact assessments and data processing records."
    },
    {
      id: "QV003",
      projectName: "SOC 2 Audit Preparation",
      standardName: "SOC 2 Type II",
      checklistItemsReviewed: 64,
      totalChecklistItems: 64,
      verificationResult: "Failed",
      reviewer: "Lisa Chen",
      verificationDate: "2026-03-28",
      observations: "Access control logs incomplete. Incident response procedures need additional documentation and testing evidence."
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterResult, setFilterResult] = useState("all");
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedVerification, setSelectedVerification] = useState<QualityVerification | null>(null);

  const filteredVerifications = verifications.filter(verification => {
    const matchesSearch = verification.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         verification.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         verification.standardName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesResult = filterResult === "all" || verification.verificationResult === filterResult;
    return matchesSearch && matchesResult;
  });

  const getResultColor = (result: string) => {
    switch (result) {
      case "Passed": return "bg-green-500 text-white";
      case "Failed": return "bg-red-500 text-white";
      case "Pending": return "bg-amber-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const handleView = (verification: QualityVerification) => {
    setSelectedVerification(verification);
    setViewDialogOpen(true);
  };

  const handleEdit = (verification: QualityVerification) => {
    setSelectedVerification(verification);
    setEditDialogOpen(true);
  };

  const handleApprove = (id: string) => {
    setVerifications(verifications.map(v => v.id === id ? { ...v, verificationResult: "Passed" as const } : v));
  };

  const handleReject = (id: string) => {
    setVerifications(verifications.map(v => v.id === id ? { ...v, verificationResult: "Failed" as const } : v));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Quality Verification</h2>
            <p className="text-green-50 mt-1">Ensure completed work complies with quality standards and compliance requirements</p>
          </div>
          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-white text-emerald-600 hover:bg-emerald-50">
                <Plus className="h-4 w-4 mr-2" />
                Add Quality Verification
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add Quality Verification Record</DialogTitle>
                <DialogDescription>Create a new quality verification entry</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="projectName">Project Name *</Label>
                    <Input id="projectName" placeholder="Enter project name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="standardName">Standard Name *</Label>
                    <Input id="standardName" placeholder="e.g., ISO 27001:2013" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="itemsReviewed">Checklist Items Reviewed *</Label>
                    <Input id="itemsReviewed" type="number" placeholder="e.g., 50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalItems">Total Checklist Items *</Label>
                    <Input id="totalItems" type="number" placeholder="e.g., 60" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="reviewer">Reviewer *</Label>
                    <Input id="reviewer" placeholder="Enter reviewer name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="verificationDate">Verification Date *</Label>
                    <Input id="verificationDate" type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="verificationResult">Verification Result *</Label>
                  <Select defaultValue="Pending">
                    <SelectTrigger>
                      <SelectValue placeholder="Select result" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Passed">Passed</SelectItem>
                      <SelectItem value="Failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="observations">Observations</Label>
                  <Textarea id="observations" placeholder="Add verification observations and notes" rows={4} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setAddDialogOpen(false)}>Cancel</Button>
                <Button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">Add Verification</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{verifications.length}</div>
            <p className="text-sm text-blue-50 mt-1">Total Verifications</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{verifications.filter(v => v.verificationResult === "Passed").length}</div>
            <p className="text-sm text-green-50 mt-1">Passed</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-500 to-orange-500 text-white">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{verifications.filter(v => v.verificationResult === "Pending").length}</div>
            <p className="text-sm text-amber-50 mt-1">Pending</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-red-500 to-pink-500 text-white">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{verifications.filter(v => v.verificationResult === "Failed").length}</div>
            <p className="text-sm text-red-50 mt-1">Failed</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Quality Verifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by project, ID, or standard..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterResult} onValueChange={setFilterResult}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Result" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Results</SelectItem>
                <SelectItem value="Passed">Passed</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Verifications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Quality Verifications List</CardTitle>
          <CardDescription>Showing {filteredVerifications.length} quality verifications</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Verification ID</TableHead>
                <TableHead>Project Name</TableHead>
                <TableHead>Standard</TableHead>
                <TableHead>Items Reviewed</TableHead>
                <TableHead>Reviewer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVerifications.map((verification) => (
                <TableRow key={verification.id}>
                  <TableCell className="font-medium">{verification.id}</TableCell>
                  <TableCell>{verification.projectName}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{verification.standardName}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">
                        {verification.checklistItemsReviewed}/{verification.totalChecklistItems}
                      </span>
                      {verification.checklistItemsReviewed === verification.totalChecklistItems && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{verification.reviewer}</TableCell>
                  <TableCell>{new Date(verification.verificationDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge className={getResultColor(verification.verificationResult)}>
                      {verification.verificationResult}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleView(verification)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(verification)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      {verification.verificationResult === "Pending" && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleApprove(verification.id)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleReject(verification.id)}
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
            <DialogTitle>View Quality Verification</DialogTitle>
            <DialogDescription>Detailed quality verification information</DialogDescription>
          </DialogHeader>
          {selectedVerification && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-semibold">Verification ID</Label>
                  <div className="p-2 border rounded-md bg-gray-50">{selectedVerification.id}</div>
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold">Verification Result</Label>
                  <Badge className={getResultColor(selectedVerification.verificationResult)}>
                    {selectedVerification.verificationResult}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-semibold">Project Name</Label>
                  <div className="p-2 border rounded-md bg-gray-50">{selectedVerification.projectName}</div>
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold">Standard Name</Label>
                  <div className="p-2 border rounded-md bg-gray-50">{selectedVerification.standardName}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-semibold">Checklist Items Reviewed</Label>
                  <div className="p-2 border rounded-md bg-gray-50">
                    {selectedVerification.checklistItemsReviewed} / {selectedVerification.totalChecklistItems}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold">Reviewer</Label>
                  <div className="p-2 border rounded-md bg-gray-50">{selectedVerification.reviewer}</div>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Verification Date</Label>
                <div className="p-2 border rounded-md bg-gray-50">
                  {new Date(selectedVerification.verificationDate).toLocaleDateString()}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Observations</Label>
                <div className="p-3 border rounded-md bg-gray-50 min-h-[100px]">
                  {selectedVerification.observations || "No observations provided"}
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
            <DialogTitle>Update Quality Verification</DialogTitle>
            <DialogDescription>Modify verification result and observations</DialogDescription>
          </DialogHeader>
          {selectedVerification && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-result">Verification Result *</Label>
                <Select defaultValue={selectedVerification.verificationResult}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select result" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Passed">Passed</SelectItem>
                    <SelectItem value="Failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-observations">Observations</Label>
                <Textarea 
                  id="edit-observations" 
                  defaultValue={selectedVerification.observations}
                  placeholder="Add verification observations and notes" 
                  rows={6} 
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
