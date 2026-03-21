import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Badge } from "@/app/components/ui/badge";
import { Building2, Plus, Search, Edit, Trash2, ArrowLeft, Users } from "lucide-react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";

interface Department {
  id: string;
  name: string;
  code: string;
  description: string;
  headOfDepartment: string;
  userCount: number;
  status: "active" | "inactive";
}

interface DepartmentsPageProps {
  onBack: () => void;
}

export function DepartmentsPage({ onBack }: DepartmentsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newDepartment, setNewDepartment] = useState({ 
    name: "", 
    code: "", 
    description: "",
    headOfDepartment: ""
  });

  const [departments, setDepartments] = useState<Department[]>([
    {
      id: "1",
      name: "Quality Assurance",
      code: "QA",
      description: "Quality control and testing",
      headOfDepartment: "John Smith",
      userCount: 24,
      status: "active"
    },
    {
      id: "2",
      name: "Engineering",
      code: "ENG",
      description: "Product development and engineering",
      headOfDepartment: "Sarah Johnson",
      userCount: 45,
      status: "active"
    },
    {
      id: "3",
      name: "Information Technology",
      code: "IT",
      description: "IT infrastructure and support",
      headOfDepartment: "Michael Chen",
      userCount: 32,
      status: "active"
    },
    {
      id: "4",
      name: "Human Resources",
      code: "HR",
      description: "Employee management and recruitment",
      headOfDepartment: "Emily Davis",
      userCount: 18,
      status: "active"
    },
    {
      id: "5",
      name: "Operations",
      code: "OPS",
      description: "Daily operations and logistics",
      headOfDepartment: "David Wilson",
      userCount: 38,
      status: "active"
    },
    {
      id: "6",
      name: "Compliance",
      code: "COMP",
      description: "Regulatory compliance and audits",
      headOfDepartment: "Lisa Anderson",
      userCount: 28,
      status: "active"
    },
    {
      id: "7",
      name: "Finance",
      code: "FIN",
      description: "Financial management and accounting",
      headOfDepartment: "Robert Taylor",
      userCount: 22,
      status: "active"
    },
    {
      id: "8",
      name: "Research & Development",
      code: "R&D",
      description: "Innovation and product research",
      headOfDepartment: "Jennifer Martinez",
      userCount: 41,
      status: "active"
    }
  ]);

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddDepartment = () => {
    if (newDepartment.name && newDepartment.code) {
      const dept: Department = {
        id: String(departments.length + 1),
        name: newDepartment.name,
        code: newDepartment.code,
        description: newDepartment.description,
        headOfDepartment: newDepartment.headOfDepartment,
        userCount: 0,
        status: "active"
      };
      setDepartments([...departments, dept]);
      setNewDepartment({ name: "", code: "", description: "", headOfDepartment: "" });
      setIsAddDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Departments Management</h2>
            <p className="text-green-100 mt-1">Manage organizational departments and units</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-white text-green-600 hover:bg-green-50">
                <Plus className="mr-2 h-4 w-4" />
                Add Department
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Department</DialogTitle>
                <DialogDescription>
                  Create a new organizational department
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Department Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Marketing"
                      value={newDepartment.name}
                      onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="code">Department Code</Label>
                    <Input
                      id="code"
                      placeholder="e.g., MKT"
                      value={newDepartment.code}
                      onChange={(e) => setNewDepartment({ ...newDepartment, code: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="Brief description of the department"
                    value={newDepartment.description}
                    onChange={(e) => setNewDepartment({ ...newDepartment, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="head">Head of Department</Label>
                  <Input
                    id="head"
                    placeholder="e.g., Jane Doe"
                    value={newDepartment.headOfDepartment}
                    onChange={(e) => setNewDepartment({ ...newDepartment, headOfDepartment: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddDepartment}>Create Department</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search departments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Departments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{departments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Active Departments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{departments.filter(d => d.status === "active").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{departments.reduce((acc, d) => acc + d.userCount, 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Avg. Users/Dept</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {Math.round(departments.reduce((acc, d) => acc + d.userCount, 0) / departments.length)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Departments Table */}
      <Card>
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-gray-900">Departments Data</CardTitle>
          <CardDescription>View and manage all organizational departments</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">ID</TableHead>
                  <TableHead className="font-semibold">Department Name</TableHead>
                  <TableHead className="font-semibold">Code</TableHead>
                  <TableHead className="font-semibold">Description</TableHead>
                  <TableHead className="font-semibold">Head of Department</TableHead>
                  <TableHead className="font-semibold">User Count</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDepartments.map((dept) => (
                  <TableRow key={dept.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{dept.id}</TableCell>
                    <TableCell className="font-semibold">{dept.name}</TableCell>
                    <TableCell>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded font-semibold border">{dept.code}</code>
                    </TableCell>
                    <TableCell className="max-w-md text-gray-600">{dept.description}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{dept.headOfDepartment}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Users className="h-3 w-3 text-gray-500" />
                        <span className="font-medium">{dept.userCount}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={dept.status === "active" ? "default" : "secondary"}>
                        {dept.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="hover:bg-blue-50">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}