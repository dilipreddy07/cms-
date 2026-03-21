import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Progress } from "@/app/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/app/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import {
  ClipboardList,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Eye,
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  Link2,
  TrendingUp
} from "lucide-react";
import { Textarea } from "@/app/components/ui/textarea";

interface PolicyImplementation {
  id: string;
  policyName: string;
  mappedProcedure: string;
  assignedResource: string;
  implementationStatus: "Not Started" | "In Progress" | "Completed";
  completionProgress: number;
  startDate: string;
  dueDate: string;
  lastUpdated: string;
  notes?: string;
}

export function PolicyImplementationView() {
  const [isUpdateSheetOpen, setIsUpdateSheetOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyImplementation | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterResource, setFilterResource] = useState<string>("all");

  // Sample policy implementation data
  const [policies, setPolicies] = useState<PolicyImplementation[]>([
    {
      id: "PI001",
      policyName: "Data Protection Policy",
      mappedProcedure: "Information Security Procedure",
      assignedResource: "Michael Chen",
      implementationStatus: "Completed",
      completionProgress: 100,
      startDate: "2024-02-15",
      dueDate: "2024-03-15",
      lastUpdated: "2024-03-14",
      notes: "Successfully implemented across all departments. All compliance requirements met."
    },
    {
      id: "PI002",
      policyName: "Employee Code of Conduct",
      mappedProcedure: "Employee Onboarding Procedure",
      assignedResource: "Sarah Johnson",
      implementationStatus: "In Progress",
      completionProgress: 75,
      startDate: "2024-02-20",
      dueDate: "2024-03-25",
      lastUpdated: "2024-03-15",
      notes: "Training sessions ongoing. Expected completion by end of week."
    },
    {
      id: "PI003",
      policyName: "Remote Work Policy",
      mappedProcedure: "Work From Home Procedure",
      assignedResource: "Emily Davis",
      implementationStatus: "In Progress",
      completionProgress: 60,
      startDate: "2024-03-01",
      dueDate: "2024-03-30",
      lastUpdated: "2024-03-13",
      notes: "Equipment distribution phase in progress. IT setup pending."
    },
    {
      id: "PI004",
      policyName: "Leave Policy",
      mappedProcedure: "Leave Management Procedure",
      assignedResource: "David Wilson",
      implementationStatus: "In Progress",
      completionProgress: 45,
      startDate: "2024-02-25",
      dueDate: "2024-03-28",
      lastUpdated: "2024-03-12",
      notes: "System integration in progress. Manager training scheduled for next week."
    },
    {
      id: "PI005",
      policyName: "Performance Management Policy",
      mappedProcedure: "Performance Review Procedure",
      assignedResource: "Lisa Anderson",
      implementationStatus: "Not Started",
      completionProgress: 0,
      startDate: "2024-03-10",
      dueDate: "2024-04-10",
      lastUpdated: "2024-03-10",
      notes: "Awaiting approval from top management."
    },
    {
      id: "PI006",
      policyName: "Training & Development Policy",
      mappedProcedure: "Training Management Procedure",
      assignedResource: "John Smith",
      implementationStatus: "In Progress",
      completionProgress: 85,
      startDate: "2024-02-10",
      dueDate: "2024-03-20",
      lastUpdated: "2024-03-15",
      notes: "Final review in progress. Documentation being prepared."
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-500 text-white";
      case "In Progress": return "bg-yellow-500 text-white";
      case "Not Started": return "bg-gray-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed": return <CheckCircle2 className="h-4 w-4" />;
      case "In Progress": return <Clock className="h-4 w-4" />;
      case "Not Started": return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return "bg-green-500";
    if (progress >= 50) return "bg-yellow-500";
    return "bg-gray-500";
  };

  const handleUpdatePolicy = (policy: PolicyImplementation) => {
    setSelectedPolicy(policy);
    setIsUpdateSheetOpen(true);
  };

  const handleSaveUpdate = () => {
    if (!selectedPolicy) return;

    setPolicies(policies.map(p => 
      p.id === selectedPolicy.id 
        ? { ...selectedPolicy, lastUpdated: new Date().toISOString().split('T')[0] } 
        : p
    ));

    setIsUpdateSheetOpen(false);
    setSelectedPolicy(null);
    alert("Policy implementation updated successfully!");
  };

  const handleViewPolicy = (policy: PolicyImplementation) => {
    setSelectedPolicy(policy);
    setIsViewDialogOpen(true);
  };

  const handleViewProcedure = (procedureName: string) => {
    alert(`Viewing linked procedure: ${procedureName}`);
  };

  // Filter policies
  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = policy.policyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          policy.mappedProcedure.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          policy.assignedResource.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || policy.implementationStatus === filterStatus;
    const matchesResource = filterResource === "all" || policy.assignedResource === filterResource;

    return matchesSearch && matchesStatus && matchesResource;
  });

  // Get unique resources for filter
  const uniqueResources = Array.from(new Set(policies.map(p => p.assignedResource)));

  // Calculate stats
  const totalPolicies = policies.length;
  const inProgress = policies.filter(p => p.implementationStatus === "In Progress").length;
  const completed = policies.filter(p => p.implementationStatus === "Completed").length;
  const notStarted = policies.filter(p => p.implementationStatus === "Not Started").length;
  const avgCompletion = Math.round(policies.reduce((sum, p) => sum + p.completionProgress, 0) / policies.length);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Policy Implementation
        </h2>
        <p className="text-muted-foreground mt-1">
          Execute and track policies mapped to procedures
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/80">Total Policies</p>
                <div className="text-3xl font-bold mt-1">{totalPolicies}</div>
              </div>
              <ClipboardList className="h-8 w-8 text-white/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-500 to-amber-500 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/80">In Progress</p>
                <div className="text-3xl font-bold mt-1">{inProgress}</div>
              </div>
              <Clock className="h-8 w-8 text-white/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/80">Completed</p>
                <div className="text-3xl font-bold mt-1">{completed}</div>
              </div>
              <CheckCircle2 className="h-8 w-8 text-white/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/80">Avg. Completion</p>
                <div className="text-3xl font-bold mt-1">{avgCompletion}%</div>
              </div>
              <TrendingUp className="h-8 w-8 text-white/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Search */}
      <Card className="shadow-lg border-2">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by policy, procedure, or resource..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filters:</span>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="By Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Not Started">Not Started</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterResource} onValueChange={setFilterResource}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="By Resource" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Resources</SelectItem>
                  {uniqueResources.map((resource) => (
                    <SelectItem key={resource} value={resource}>{resource}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {(searchTerm || filterStatus !== "all" || filterResource !== "all") && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setSearchTerm("");
                    setFilterStatus("all");
                    setFilterResource("all");
                  }}
                >
                  Clear All
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Policies Table */}
      <Card className="shadow-lg border-2">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-purple-600" />
                Policy Implementation List
              </CardTitle>
              <CardDescription>
                {filteredPolicies.length} policy implementation(s) tracked
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {filteredPolicies.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="p-4 bg-gray-100 rounded-full mb-4">
                <ClipboardList className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Policies Found</h3>
              <p className="text-sm text-muted-foreground">
                {searchTerm || filterStatus !== "all" || filterResource !== "all"
                  ? "No policies match your current filters"
                  : "No policy implementations available"}
              </p>
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="font-semibold">ID</TableHead>
                    <TableHead className="font-semibold">Policy Name</TableHead>
                    <TableHead className="font-semibold">Mapped Procedure</TableHead>
                    <TableHead className="font-semibold">Assigned Resource</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Completion Progress</TableHead>
                    <TableHead className="font-semibold">Due Date</TableHead>
                    <TableHead className="text-right font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPolicies.map((policy) => (
                    <TableRow key={policy.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell className="font-medium">{policy.id}</TableCell>
                      <TableCell className="font-medium max-w-xs truncate">{policy.policyName}</TableCell>
                      <TableCell>
                        <Button
                          variant="link"
                          size="sm"
                          className="p-0 h-auto font-normal text-blue-600 hover:text-blue-800"
                          onClick={() => handleViewProcedure(policy.mappedProcedure)}
                        >
                          <Link2 className="h-3 w-3 mr-1" />
                          {policy.mappedProcedure}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          {policy.assignedResource}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(policy.implementationStatus) + " flex items-center gap-1 w-fit"}>
                          {getStatusIcon(policy.implementationStatus)}
                          {policy.implementationStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={policy.completionProgress} className="w-24 h-2" />
                          <span className="text-sm font-medium text-muted-foreground">
                            {policy.completionProgress}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {policy.dueDate}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="hover:bg-gray-200">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleViewPolicy(policy)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdatePolicy(policy)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Update Status
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleViewProcedure(policy.mappedProcedure)}>
                              <FileText className="mr-2 h-4 w-4" />
                              View Procedure
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Update Policy Sheet */}
      <Sheet open={isUpdateSheetOpen} onOpenChange={setIsUpdateSheetOpen}>
        <SheetContent className="sm:max-w-[600px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Update Implementation Status</SheetTitle>
            <SheetDescription>
              Update the implementation status and progress
            </SheetDescription>
          </SheetHeader>
          {selectedPolicy && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Policy Name</Label>
                <p className="font-medium text-gray-900">{selectedPolicy.policyName}</p>
              </div>
              <div className="grid gap-2">
                <Label>Mapped Procedure</Label>
                <p className="font-medium text-gray-600">{selectedPolicy.mappedProcedure}</p>
              </div>
              <div className="grid gap-2">
                <Label>Assigned Resource</Label>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 w-fit">
                  {selectedPolicy.assignedResource}
                </Badge>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Implementation Status *</Label>
                <Select 
                  value={selectedPolicy.implementationStatus} 
                  onValueChange={(value) => setSelectedPolicy({ 
                    ...selectedPolicy, 
                    implementationStatus: value as "Not Started" | "In Progress" | "Completed",
                    completionProgress: value === "Completed" ? 100 : value === "Not Started" ? 0 : selectedPolicy.completionProgress
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Not Started">Not Started</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-progress">Completion Progress (%)</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="edit-progress"
                    type="number"
                    min="0"
                    max="100"
                    value={selectedPolicy.completionProgress}
                    onChange={(e) => {
                      const value = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
                      setSelectedPolicy({ ...selectedPolicy, completionProgress: value });
                    }}
                    className="w-24"
                  />
                  <Progress value={selectedPolicy.completionProgress} className="flex-1 h-3" />
                  <span className="text-sm font-medium text-muted-foreground w-12 text-right">
                    {selectedPolicy.completionProgress}%
                  </span>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-notes">Notes</Label>
                <Textarea
                  id="edit-notes"
                  value={selectedPolicy.notes}
                  onChange={(e) => setSelectedPolicy({ ...selectedPolicy, notes: e.target.value })}
                  placeholder="Add implementation notes..."
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Start Date</Label>
                  <p className="text-sm text-muted-foreground">{selectedPolicy.startDate}</p>
                </div>
                <div className="grid gap-2">
                  <Label>Due Date</Label>
                  <p className="text-sm text-muted-foreground">{selectedPolicy.dueDate}</p>
                </div>
              </div>
            </div>
          )}
          <SheetFooter>
            <Button variant="outline" onClick={() => setIsUpdateSheetOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSaveUpdate}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
            >
              Save Changes
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* View Policy Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>{selectedPolicy?.policyName}</DialogTitle>
            <DialogDescription>Policy Implementation Details</DialogDescription>
          </DialogHeader>
          {selectedPolicy && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Policy ID</Label>
                  <p className="font-medium">{selectedPolicy.id}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Assigned Resource</Label>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {selectedPolicy.assignedResource}
                  </Badge>
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">Mapped Procedure</Label>
                <div className="mt-1">
                  <Button
                    variant="link"
                    size="sm"
                    className="p-0 h-auto font-medium text-blue-600 hover:text-blue-800"
                    onClick={() => handleViewProcedure(selectedPolicy.mappedProcedure)}
                  >
                    <Link2 className="h-4 w-4 mr-1" />
                    {selectedPolicy.mappedProcedure}
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Implementation Status</Label>
                  <div className="mt-1">
                    <Badge className={getStatusColor(selectedPolicy.implementationStatus) + " flex items-center gap-1 w-fit"}>
                      {getStatusIcon(selectedPolicy.implementationStatus)}
                      {selectedPolicy.implementationStatus}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Completion Progress</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress value={selectedPolicy.completionProgress} className="flex-1 h-3" />
                    <span className="text-sm font-medium">{selectedPolicy.completionProgress}%</span>
                  </div>
                </div>
              </div>
              {selectedPolicy.notes && (
                <div>
                  <Label className="text-muted-foreground">Notes</Label>
                  <p className="mt-1 text-sm">{selectedPolicy.notes}</p>
                </div>
              )}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-muted-foreground">Start Date</Label>
                  <p className="font-medium">{selectedPolicy.startDate}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Due Date</Label>
                  <p className="font-medium">{selectedPolicy.dueDate}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Last Updated</Label>
                  <p className="font-medium">{selectedPolicy.lastUpdated}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
