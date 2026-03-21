import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Badge } from "@/app/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
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
  ArrowLeft, 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Users, 
  Calendar,
  Save,
  Upload,
  FileText,
  Briefcase,
  UserPlus,
  MoreVertical,
  Pencil,
  Trash2,
  Search,
  Building,
  BarChart3
} from "lucide-react";

interface CompanyInformationPageProps {
  onBack: () => void;
}

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  joinDate: string;
  status: "Active" | "Inactive";
}

interface Project {
  id: string;
  name: string;
  description: string;
  status: "Active" | "Completed" | "On Hold";
  startDate: string;
  endDate: string;
}

export function CompanyInformationPage({ onBack }: CompanyInformationPageProps) {
  const [companyInfo, setCompanyInfo] = useState({
    companyName: "TechCorp Solutions Inc.",
    legalName: "TechCorp Solutions Incorporated",
    registrationNumber: "REG-2024-123456",
    taxId: "TAX-987654321",
    industry: "Information Technology",
    companySize: "201-500 employees",
    foundedDate: "2015-03-15",
    website: "https://www.techcorp-solutions.com",
    email: "info@techcorp-solutions.com",
    phone: "+1 (555) 123-4567",
    address: "123 Tech Boulevard, Suite 500",
    city: "San Francisco",
    state: "California",
    zipCode: "94105",
    country: "United States",
    description: "Leading provider of enterprise software solutions specializing in compliance management systems and business process automation.",
    mission: "To empower organizations with innovative technology solutions that drive compliance, efficiency, and growth.",
    vision: "To be the global leader in enterprise compliance and automation solutions.",
    ceo: "John Smith",
    cfo: "Sarah Johnson",
    cto: "Michael Chen"
  });

  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@techcorp.com",
      phone: "+1 (555) 123-4501",
      position: "Chief Executive Officer",
      department: "Executive",
      joinDate: "2015-03-15",
      status: "Active"
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@techcorp.com",
      phone: "+1 (555) 123-4502",
      position: "Chief Financial Officer",
      department: "Finance",
      joinDate: "2015-06-01",
      status: "Active"
    },
    {
      id: "3",
      name: "Michael Chen",
      email: "michael.chen@techcorp.com",
      phone: "+1 (555) 123-4503",
      position: "Chief Technology Officer",
      department: "Technology",
      joinDate: "2016-01-15",
      status: "Active"
    }
  ]);

  const [projects] = useState<Project[]>([
    {
      id: "1",
      name: "Compliance Platform 2.0",
      description: "Next generation compliance management system",
      status: "Active",
      startDate: "2024-01-15",
      endDate: "2024-12-31"
    },
    {
      id: "2",
      name: "Security Audit Framework",
      description: "Comprehensive security audit framework implementation",
      status: "Active",
      startDate: "2024-02-01",
      endDate: "2024-08-30"
    },
    {
      id: "3",
      name: "Data Migration Project",
      description: "Legacy system data migration to new platform",
      status: "Completed",
      startDate: "2023-09-01",
      endDate: "2024-02-28"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [newEmployee, setNewEmployee] = useState<Partial<Employee>>({
    name: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    joinDate: "",
    status: "Active"
  });

  const handleSave = () => {
    alert("Company information updated successfully!");
  };

  const handleLogoUpload = () => {
    alert("Logo upload functionality - File picker would open here");
  };

  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.email || !newEmployee.position || !newEmployee.department) {
      alert("Please fill in all required fields");
      return;
    }

    const employee: Employee = {
      id: String(employees.length + 1),
      name: newEmployee.name || "",
      email: newEmployee.email || "",
      phone: newEmployee.phone || "",
      position: newEmployee.position || "",
      department: newEmployee.department || "",
      joinDate: newEmployee.joinDate || new Date().toISOString().split('T')[0],
      status: newEmployee.status || "Active"
    };

    setEmployees([...employees, employee]);
    setIsAddSheetOpen(false);
    setNewEmployee({
      name: "",
      email: "",
      phone: "",
      position: "",
      department: "",
      joinDate: "",
      status: "Active"
    });
    alert("Employee added successfully!");
  };

  const handleDeleteEmployee = (id: string) => {
    if (confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter(emp => emp.id !== id));
      alert("Employee deleted successfully!");
    }
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsEditSheetOpen(true);
  };

  const handleUpdateEmployee = () => {
    if (!editingEmployee) return;

    setEmployees(employees.map(emp => 
      emp.id === editingEmployee.id ? editingEmployee : emp
    ));
    setIsEditSheetOpen(false);
    setEditingEmployee(null);
    alert("Employee updated successfully!");
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-xl shadow-lg p-6 text-white">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 text-white hover:bg-white/20"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Company Information</h2>
            <p className="text-white/90 mt-1">Comprehensive company details, employees, and projects</p>
          </div>
          <Badge className="px-4 py-2 bg-white text-blue-600 hover:bg-blue-50">
            <Building2 className="h-4 w-4 mr-2" />
            Organization Profile
          </Badge>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-white border shadow-sm p-1">
          <TabsTrigger value="overview" className="gap-2">
            <Building className="h-4 w-4" />
            Company Overview
          </TabsTrigger>
          <TabsTrigger value="employees" className="gap-2">
            <Users className="h-4 w-4" />
            Employees ({employees.length})
          </TabsTrigger>
          <TabsTrigger value="projects" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Projects ({projects.length})
          </TabsTrigger>
        </TabsList>

        {/* Company Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/80">Employees</p>
                    <div className="text-3xl font-bold mt-1">{employees.length}</div>
                  </div>
                  <Users className="h-8 w-8 text-white/60" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/80">Departments</p>
                    <div className="text-3xl font-bold mt-1">12</div>
                  </div>
                  <Briefcase className="h-8 w-8 text-white/60" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/80">Years Active</p>
                    <div className="text-3xl font-bold mt-1">9</div>
                  </div>
                  <Calendar className="h-8 w-8 text-white/60" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-red-500 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/80">Documents</p>
                    <div className="text-3xl font-bold mt-1">1,248</div>
                  </div>
                  <FileText className="h-8 w-8 text-white/60" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Company Logo */}
          <Card>
            <CardHeader>
              <CardTitle>Company Logo</CardTitle>
              <CardDescription>Upload your company logo for branding</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center border-2 border-dashed border-blue-300">
                  <Building2 className="h-16 w-16 text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-3">
                    Recommended size: 512x512 pixels. Supported formats: PNG, JPG, SVG
                  </p>
                  <Button onClick={handleLogoUpload} variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload New Logo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>General company details and registration information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    value={companyInfo.companyName}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, companyName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="legalName">Legal Name</Label>
                  <Input
                    id="legalName"
                    value={companyInfo.legalName}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, legalName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registrationNumber">Registration Number</Label>
                  <Input
                    id="registrationNumber"
                    value={companyInfo.registrationNumber}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, registrationNumber: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxId">Tax ID / EIN</Label>
                  <Input
                    id="taxId"
                    value={companyInfo.taxId}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, taxId: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={companyInfo.industry} onValueChange={(value) => setCompanyInfo({ ...companyInfo, industry: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Information Technology">Information Technology</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="Retail">Retail</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companySize">Company Size</Label>
                  <Select value={companyInfo.companySize} onValueChange={(value) => setCompanyInfo({ ...companyInfo, companySize: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10 employees">1-10 employees</SelectItem>
                      <SelectItem value="11-50 employees">11-50 employees</SelectItem>
                      <SelectItem value="51-200 employees">51-200 employees</SelectItem>
                      <SelectItem value="201-500 employees">201-500 employees</SelectItem>
                      <SelectItem value="501-1000 employees">501-1000 employees</SelectItem>
                      <SelectItem value="1000+ employees">1000+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="foundedDate">Founded Date</Label>
                  <Input
                    id="foundedDate"
                    type="date"
                    value={companyInfo.foundedDate}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, foundedDate: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Primary contact details for your organization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="website"
                      value={companyInfo.website}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, website: e.target.value })}
                      className="pl-9"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={companyInfo.email}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                      className="pl-9"
                    />
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={companyInfo.phone}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
                      className="pl-9"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address */}
          <Card>
            <CardHeader>
              <CardTitle>Address</CardTitle>
              <CardDescription>Corporate headquarters location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="address"
                      value={companyInfo.address}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, address: e.target.value })}
                      className="pl-9"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={companyInfo.city}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, city: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State / Province</Label>
                    <Input
                      id="state"
                      value={companyInfo.state}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, state: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP / Postal Code</Label>
                    <Input
                      id="zipCode"
                      value={companyInfo.zipCode}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, zipCode: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select value={companyInfo.country} onValueChange={(value) => setCompanyInfo({ ...companyInfo, country: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="United States">United States</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                      <SelectItem value="Germany">Germany</SelectItem>
                      <SelectItem value="France">France</SelectItem>
                      <SelectItem value="Australia">Australia</SelectItem>
                      <SelectItem value="India">India</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Description */}
          <Card>
            <CardHeader>
              <CardTitle>Company Description</CardTitle>
              <CardDescription>Overview and mission of your organization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={companyInfo.description}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, description: e.target.value })}
                    rows={4}
                    placeholder="Describe your company..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mission">Mission Statement</Label>
                  <Textarea
                    id="mission"
                    value={companyInfo.mission}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, mission: e.target.value })}
                    rows={3}
                    placeholder="Company mission..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vision">Vision Statement</Label>
                  <Textarea
                    id="vision"
                    value={companyInfo.vision}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, vision: e.target.value })}
                    rows={3}
                    placeholder="Company vision..."
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Leadership */}
          <Card>
            <CardHeader>
              <CardTitle>Leadership Team</CardTitle>
              <CardDescription>Key executives and leadership</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="ceo">Chief Executive Officer</Label>
                  <Input
                    id="ceo"
                    value={companyInfo.ceo}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, ceo: e.target.value })}
                    placeholder="CEO Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cfo">Chief Financial Officer</Label>
                  <Input
                    id="cfo"
                    value={companyInfo.cfo}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, cfo: e.target.value })}
                    placeholder="CFO Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cto">Chief Technology Officer</Label>
                  <Input
                    id="cto"
                    value={companyInfo.cto}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, cto: e.target.value })}
                    placeholder="CTO Name"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onBack}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </TabsContent>

        {/* Employees Tab */}
        <TabsContent value="employees" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Employee Management</CardTitle>
                  <CardDescription>Add and manage company employees</CardDescription>
                </div>
                <Button 
                  onClick={() => setIsAddSheetOpen(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Employee
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Search */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              {/* Employee Table */}
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEmployees.length > 0 ? (
                      filteredEmployees.map((employee) => (
                        <TableRow key={employee.id}>
                          <TableCell className="font-medium">{employee.name}</TableCell>
                          <TableCell>{employee.email}</TableCell>
                          <TableCell>{employee.phone}</TableCell>
                          <TableCell>{employee.position}</TableCell>
                          <TableCell>{employee.department}</TableCell>
                          <TableCell>{new Date(employee.joinDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge className={employee.status === "Active" ? "bg-green-500" : "bg-gray-500"}>
                              {employee.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleEditEmployee(employee)}>
                                  <Pencil className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleDeleteEmployee(employee.id)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                          No employees found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Management</CardTitle>
              <CardDescription>View and manage company projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">{project.name}</TableCell>
                        <TableCell>{project.description}</TableCell>
                        <TableCell>{new Date(project.startDate).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(project.endDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge 
                            className={
                              project.status === "Active" ? "bg-green-500" : 
                              project.status === "Completed" ? "bg-blue-500" : 
                              "bg-yellow-500"
                            }
                          >
                            {project.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Employee Sheet */}
      <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
        <SheetContent className="sm:max-w-[600px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Add New Employee</SheetTitle>
            <SheetDescription>
              Enter the employee details to add them to the company.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="emp-name">Full Name *</Label>
              <Input
                id="emp-name"
                value={newEmployee.name}
                onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="emp-email">Email *</Label>
              <Input
                id="emp-email"
                type="email"
                value={newEmployee.email}
                onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                placeholder="john.doe@company.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="emp-phone">Phone</Label>
              <Input
                id="emp-phone"
                value={newEmployee.phone}
                onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="emp-position">Position *</Label>
              <Input
                id="emp-position"
                value={newEmployee.position}
                onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                placeholder="Software Engineer"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="emp-department">Department *</Label>
              <Select 
                value={newEmployee.department} 
                onValueChange={(value) => setNewEmployee({ ...newEmployee, department: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Executive">Executive</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Human Resources">Human Resources</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="emp-joindate">Join Date</Label>
              <Input
                id="emp-joindate"
                type="date"
                value={newEmployee.joinDate}
                onChange={(e) => setNewEmployee({ ...newEmployee, joinDate: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="emp-status">Status</Label>
              <Select 
                value={newEmployee.status} 
                onValueChange={(value) => setNewEmployee({ ...newEmployee, status: value as "Active" | "Inactive" })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <SheetFooter>
            <Button variant="outline" onClick={() => setIsAddSheetOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddEmployee} className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              Add Employee
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Edit Employee Sheet */}
      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent className="sm:max-w-[600px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Edit Employee</SheetTitle>
            <SheetDescription>
              Update the employee details.
            </SheetDescription>
          </SheetHeader>
          {editingEmployee && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-emp-name">Full Name *</Label>
                <Input
                  id="edit-emp-name"
                  value={editingEmployee.name}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-emp-email">Email *</Label>
                <Input
                  id="edit-emp-email"
                  type="email"
                  value={editingEmployee.email}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, email: e.target.value })}
                  placeholder="john.doe@company.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-emp-phone">Phone</Label>
                <Input
                  id="edit-emp-phone"
                  value={editingEmployee.phone}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-emp-position">Position *</Label>
                <Input
                  id="edit-emp-position"
                  value={editingEmployee.position}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, position: e.target.value })}
                  placeholder="Software Engineer"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-emp-department">Department *</Label>
                <Select 
                  value={editingEmployee.department} 
                  onValueChange={(value) => setEditingEmployee({ ...editingEmployee, department: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Executive">Executive</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Human Resources">Human Resources</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-emp-joindate">Join Date</Label>
                <Input
                  id="edit-emp-joindate"
                  type="date"
                  value={editingEmployee.joinDate}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, joinDate: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-emp-status">Status</Label>
                <Select 
                  value={editingEmployee.status} 
                  onValueChange={(value) => setEditingEmployee({ ...editingEmployee, status: value as "Active" | "Inactive" })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <SheetFooter>
            <Button variant="outline" onClick={() => setIsEditSheetOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateEmployee} className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              Update Employee
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
