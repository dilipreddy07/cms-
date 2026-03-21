import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
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
  Users,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  UserPlus
} from "lucide-react";

interface Resource {
  id: string;
  name: string;
  email: string;
  department: string;
  assignedProcedure: string;
  role: string;
  status: "Not Started" | "In Progress" | "Completed";
  lastUpdated: string;
  assignedDate: string;
}

export function ResourcesTrackingView() {
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProcedure, setFilterProcedure] = useState<string>("all");
  const [filterEmployee, setFilterEmployee] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const [newResource, setNewResource] = useState<Partial<Resource>>({
    name: "",
    email: "",
    department: "",
    assignedProcedure: "",
    role: "",
    status: "Not Started"
  });

  // Sample resources data
  const [resources, setResources] = useState<Resource[]>([
    {
      id: "R001",
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      department: "HR",
      assignedProcedure: "Employee Onboarding Procedure",
      role: "Process Owner",
      status: "In Progress",
      lastUpdated: "2024-03-15",
      assignedDate: "2024-03-01"
    },
    {
      id: "R002",
      name: "Michael Chen",
      email: "michael.chen@company.com",
      department: "HR",
      assignedProcedure: "Performance Review Procedure",
      role: "Team Lead",
      status: "In Progress",
      lastUpdated: "2024-03-14",
      assignedDate: "2024-02-28"
    },
    {
      id: "R003",
      name: "Emily Davis",
      email: "emily.davis@company.com",
      department: "HR",
      assignedProcedure: "Training Management Procedure",
      role: "Coordinator",
      status: "Completed",
      lastUpdated: "2024-03-13",
      assignedDate: "2024-02-15"
    },
    {
      id: "R004",
      name: "John Smith",
      email: "john.smith@company.com",
      department: "HR",
      assignedProcedure: "Leave Management Procedure",
      role: "Administrator",
      status: "Not Started",
      lastUpdated: "2024-03-10",
      assignedDate: "2024-03-08"
    },
    {
      id: "R005",
      name: "Lisa Anderson",
      email: "lisa.anderson@company.com",
      department: "Compliance",
      assignedProcedure: "Compliance Audit Procedure",
      role: "Auditor",
      status: "In Progress",
      lastUpdated: "2024-03-12",
      assignedDate: "2024-02-20"
    },
    {
      id: "R006",
      name: "David Wilson",
      email: "david.wilson@company.com",
      department: "HR",
      assignedProcedure: "Recruitment Procedure",
      role: "Recruiter",
      status: "In Progress",
      lastUpdated: "2024-03-11",
      assignedDate: "2024-02-25"
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

  const handleAddResource = () => {
    const resource: Resource = {
      id: `R${String(resources.length + 1).padStart(3, '0')}`,
      name: newResource.name || "",
      email: newResource.email || "",
      department: newResource.department || "",
      assignedProcedure: newResource.assignedProcedure || "",
      role: newResource.role || "",
      status: newResource.status || "Not Started",
      lastUpdated: new Date().toISOString().split('T')[0],
      assignedDate: new Date().toISOString().split('T')[0]
    };

    setResources([...resources, resource]);
    setIsAddSheetOpen(false);
    setNewResource({
      name: "",
      email: "",
      department: "",
      assignedProcedure: "",
      role: "",
      status: "Not Started"
    });
    alert("Resource assigned successfully!");
  };

  const handleEditResource = (resource: Resource) => {
    setSelectedResource(resource);
    setIsEditSheetOpen(true);
  };

  const handleUpdateResource = () => {
    if (!selectedResource) return;

    setResources(resources.map(r => 
      r.id === selectedResource.id 
        ? { ...selectedResource, lastUpdated: new Date().toISOString().split('T')[0] } 
        : r
    ));

    setIsEditSheetOpen(false);
    setSelectedResource(null);
    alert("Resource updated successfully!");
  };

  const handleDeleteResource = (id: string) => {
    if (!confirm("Are you sure you want to remove this resource assignment?")) return;

    setResources(resources.filter(r => r.id !== id));
    alert("Resource removed successfully!");
  };

  const handleViewResource = (resource: Resource) => {
    setSelectedResource(resource);
    setIsViewDialogOpen(true);
  };

  const handleReassign = (resource: Resource) => {
    setSelectedResource(resource);
    setIsEditSheetOpen(true);
  };

  // Filter resources
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          resource.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          resource.assignedProcedure.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProcedure = filterProcedure === "all" || resource.assignedProcedure === filterProcedure;
    const matchesEmployee = filterEmployee === "all" || resource.name === filterEmployee;
    const matchesStatus = filterStatus === "all" || resource.status === filterStatus;

    return matchesSearch && matchesProcedure && matchesEmployee && matchesStatus;
  });

  // Get unique procedures and employees for filters
  const uniqueProcedures = Array.from(new Set(resources.map(r => r.assignedProcedure)));
  const uniqueEmployees = Array.from(new Set(resources.map(r => r.name)));

  // Calculate stats
  const totalResources = resources.length;
  const inProgress = resources.filter(r => r.status === "In Progress").length;
  const completed = resources.filter(r => r.status === "Completed").length;
  const notStarted = resources.filter(r => r.status === "Not Started").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Resources Tracking
        </h2>
        <p className="text-muted-foreground mt-1">
          Track and manage all resources involved in procedure execution
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/80">Total Resources</p>
                <div className="text-3xl font-bold mt-1">{totalResources}</div>
              </div>
              <Users className="h-8 w-8 text-white/60" />
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

        <Card className="border-0 shadow-lg bg-gradient-to-br from-gray-500 to-gray-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/80">Not Started</p>
                <div className="text-3xl font-bold mt-1">{notStarted}</div>
              </div>
              <XCircle className="h-8 w-8 text-white/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Search */}
      <Card className="shadow-lg border-2">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or procedure..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button 
                onClick={() => setIsAddSheetOpen(true)}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Assign Resource
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filters:</span>
              </div>
              <Select value={filterProcedure} onValueChange={setFilterProcedure}>
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="By Procedure" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Procedures</SelectItem>
                  {uniqueProcedures.map((proc) => (
                    <SelectItem key={proc} value={proc}>{proc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterEmployee} onValueChange={setFilterEmployee}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="By Employee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Employees</SelectItem>
                  {uniqueEmployees.map((emp) => (
                    <SelectItem key={emp} value={emp}>{emp}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

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

              {(searchTerm || filterProcedure !== "all" || filterEmployee !== "all" || filterStatus !== "all") && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setSearchTerm("");
                    setFilterProcedure("all");
                    setFilterEmployee("all");
                    setFilterStatus("all");
                  }}
                >
                  Clear All
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resources Table */}
      <Card className="shadow-lg border-2">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Resources List
              </CardTitle>
              <CardDescription>
                {filteredResources.length} resource(s) assigned to procedures
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {filteredResources.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="p-4 bg-gray-100 rounded-full mb-4">
                <Users className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Resources Found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {searchTerm || filterProcedure !== "all" || filterEmployee !== "all" || filterStatus !== "all"
                  ? "No resources match your current filters"
                  : "Get started by assigning resources to procedures"}
              </p>
              {!searchTerm && filterProcedure === "all" && filterEmployee === "all" && filterStatus === "all" && (
                <Button 
                  onClick={() => setIsAddSheetOpen(true)}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Assign First Resource
                </Button>
              )}
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="font-semibold">ID</TableHead>
                    <TableHead className="font-semibold">Resource Name</TableHead>
                    <TableHead className="font-semibold">Email</TableHead>
                    <TableHead className="font-semibold">Department</TableHead>
                    <TableHead className="font-semibold">Assigned Procedure</TableHead>
                    <TableHead className="font-semibold">Role</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Last Updated</TableHead>
                    <TableHead className="text-right font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResources.map((resource) => (
                    <TableRow key={resource.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell className="font-medium">{resource.id}</TableCell>
                      <TableCell className="font-medium">{resource.name}</TableCell>
                      <TableCell className="text-sm text-gray-600">{resource.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{resource.department}</Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{resource.assignedProcedure}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">{resource.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(resource.status) + " flex items-center gap-1 w-fit"}>
                          {getStatusIcon(resource.status)}
                          {resource.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {resource.lastUpdated}
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
                            <DropdownMenuItem onClick={() => handleViewResource(resource)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditResource(resource)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Update Status
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleReassign(resource)}>
                              <UserPlus className="mr-2 h-4 w-4" />
                              Reassign
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleDeleteResource(resource.id)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remove
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

      {/* Add Resource Sheet */}
      <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
        <SheetContent className="sm:max-w-[600px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Assign New Resource</SheetTitle>
            <SheetDescription>
              Assign a resource to a procedure for execution
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Employee Name *</Label>
              <Input
                id="name"
                value={newResource.name}
                onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
                placeholder="Enter employee name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={newResource.email}
                onChange={(e) => setNewResource({ ...newResource, email: e.target.value })}
                placeholder="employee@company.com"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="department">Department *</Label>
                <Select 
                  value={newResource.department} 
                  onValueChange={(value) => setNewResource({ ...newResource, department: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="IT">IT</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="Compliance">Compliance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role *</Label>
                <Select 
                  value={newResource.role} 
                  onValueChange={(value) => setNewResource({ ...newResource, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Process Owner">Process Owner</SelectItem>
                    <SelectItem value="Team Lead">Team Lead</SelectItem>
                    <SelectItem value="Coordinator">Coordinator</SelectItem>
                    <SelectItem value="Administrator">Administrator</SelectItem>
                    <SelectItem value="Auditor">Auditor</SelectItem>
                    <SelectItem value="Recruiter">Recruiter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="procedure">Assigned Procedure *</Label>
              <Select 
                value={newResource.assignedProcedure} 
                onValueChange={(value) => setNewResource({ ...newResource, assignedProcedure: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select procedure" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Employee Onboarding Procedure">Employee Onboarding Procedure</SelectItem>
                  <SelectItem value="Performance Review Procedure">Performance Review Procedure</SelectItem>
                  <SelectItem value="Training Management Procedure">Training Management Procedure</SelectItem>
                  <SelectItem value="Leave Management Procedure">Leave Management Procedure</SelectItem>
                  <SelectItem value="Compliance Audit Procedure">Compliance Audit Procedure</SelectItem>
                  <SelectItem value="Recruitment Procedure">Recruitment Procedure</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={newResource.status} 
                onValueChange={(value) => setNewResource({ ...newResource, status: value as "Not Started" | "In Progress" | "Completed" })}
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
          </div>
          <SheetFooter>
            <Button variant="outline" onClick={() => setIsAddSheetOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddResource}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
              disabled={!newResource.name || !newResource.email || !newResource.department || !newResource.assignedProcedure || !newResource.role}
            >
              Assign Resource
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Edit Resource Sheet */}
      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent className="sm:max-w-[600px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Update Resource Assignment</SheetTitle>
            <SheetDescription>
              Update resource details and status
            </SheetDescription>
          </SheetHeader>
          {selectedResource && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Employee Name *</Label>
                <Input
                  id="edit-name"
                  value={selectedResource.name}
                  onChange={(e) => setSelectedResource({ ...selectedResource, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email *</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={selectedResource.email}
                  onChange={(e) => setSelectedResource({ ...selectedResource, email: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-department">Department *</Label>
                  <Select 
                    value={selectedResource.department} 
                    onValueChange={(value) => setSelectedResource({ ...selectedResource, department: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HR">HR</SelectItem>
                      <SelectItem value="IT">IT</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Operations">Operations</SelectItem>
                      <SelectItem value="Compliance">Compliance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-role">Role *</Label>
                  <Select 
                    value={selectedResource.role} 
                    onValueChange={(value) => setSelectedResource({ ...selectedResource, role: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Process Owner">Process Owner</SelectItem>
                      <SelectItem value="Team Lead">Team Lead</SelectItem>
                      <SelectItem value="Coordinator">Coordinator</SelectItem>
                      <SelectItem value="Administrator">Administrator</SelectItem>
                      <SelectItem value="Auditor">Auditor</SelectItem>
                      <SelectItem value="Recruiter">Recruiter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-procedure">Assigned Procedure *</Label>
                <Select 
                  value={selectedResource.assignedProcedure} 
                  onValueChange={(value) => setSelectedResource({ ...selectedResource, assignedProcedure: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Employee Onboarding Procedure">Employee Onboarding Procedure</SelectItem>
                    <SelectItem value="Performance Review Procedure">Performance Review Procedure</SelectItem>
                    <SelectItem value="Training Management Procedure">Training Management Procedure</SelectItem>
                    <SelectItem value="Leave Management Procedure">Leave Management Procedure</SelectItem>
                    <SelectItem value="Compliance Audit Procedure">Compliance Audit Procedure</SelectItem>
                    <SelectItem value="Recruitment Procedure">Recruitment Procedure</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select 
                  value={selectedResource.status} 
                  onValueChange={(value) => setSelectedResource({ ...selectedResource, status: value as "Not Started" | "In Progress" | "Completed" })}
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
            </div>
          )}
          <SheetFooter>
            <Button variant="outline" onClick={() => setIsEditSheetOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleUpdateResource}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
            >
              Update Resource
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* View Resource Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedResource?.name}</DialogTitle>
            <DialogDescription>Resource Assignment Details</DialogDescription>
          </DialogHeader>
          {selectedResource && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Resource ID</Label>
                  <p className="font-medium">{selectedResource.id}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="font-medium">{selectedResource.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Department</Label>
                  <Badge variant="outline">{selectedResource.department}</Badge>
                </div>
                <div>
                  <Label className="text-muted-foreground">Role</Label>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">{selectedResource.role}</Badge>
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">Assigned Procedure</Label>
                <p className="font-medium mt-1">{selectedResource.assignedProcedure}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Status</Label>
                <div className="mt-1">
                  <Badge className={getStatusColor(selectedResource.status) + " flex items-center gap-1 w-fit"}>
                    {getStatusIcon(selectedResource.status)}
                    {selectedResource.status}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Assigned Date</Label>
                  <p className="font-medium">{selectedResource.assignedDate}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Last Updated</Label>
                  <p className="font-medium">{selectedResource.lastUpdated}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
