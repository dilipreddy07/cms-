import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Badge } from "@/app/components/ui/badge";
import { UserCog, Plus, Search, Edit, Trash2, ArrowLeft, Mail, Phone } from "lucide-react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";

interface DepartmentUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  status: "active" | "inactive";
  joinedDate: string;
}

interface DepartmentUsersPageProps {
  onBack: () => void;
}

export function DepartmentUsersPage({ onBack }: DepartmentUsersPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({ 
    name: "", 
    email: "", 
    phone: "",
    department: "",
    role: ""
  });

  const [users, setUsers] = useState<DepartmentUser[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@company.com",
      phone: "+1 (555) 123-4567",
      department: "Quality Assurance",
      role: "QA Manager",
      status: "active",
      joinedDate: "2023-01-15"
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      phone: "+1 (555) 234-5678",
      department: "Engineering",
      role: "Senior Engineer",
      status: "active",
      joinedDate: "2023-02-20"
    },
    {
      id: "3",
      name: "Michael Chen",
      email: "michael.chen@company.com",
      phone: "+1 (555) 345-6789",
      department: "Information Technology",
      role: "IT Director",
      status: "active",
      joinedDate: "2023-03-10"
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.davis@company.com",
      phone: "+1 (555) 456-7890",
      department: "Human Resources",
      role: "HR Manager",
      status: "active",
      joinedDate: "2023-04-05"
    },
    {
      id: "5",
      name: "David Wilson",
      email: "david.wilson@company.com",
      phone: "+1 (555) 567-8901",
      department: "Operations",
      role: "Operations Lead",
      status: "active",
      joinedDate: "2023-05-12"
    },
    {
      id: "6",
      name: "Lisa Anderson",
      email: "lisa.anderson@company.com",
      phone: "+1 (555) 678-9012",
      department: "Compliance",
      role: "Compliance Officer",
      status: "active",
      joinedDate: "2023-06-18"
    },
    {
      id: "7",
      name: "Robert Taylor",
      email: "robert.taylor@company.com",
      phone: "+1 (555) 789-0123",
      department: "Finance",
      role: "Financial Analyst",
      status: "active",
      joinedDate: "2023-07-22"
    },
    {
      id: "8",
      name: "Jennifer Martinez",
      email: "jennifer.martinez@company.com",
      phone: "+1 (555) 890-1234",
      department: "Research & Development",
      role: "Research Lead",
      status: "active",
      joinedDate: "2023-08-30"
    }
  ]);

  const departments = [
    "Quality Assurance",
    "Engineering",
    "Information Technology",
    "Human Resources",
    "Operations",
    "Compliance",
    "Finance",
    "Research & Development"
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = filterDepartment === "all" || user.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.department) {
      const user: DepartmentUser = {
        id: String(users.length + 1),
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        department: newUser.department,
        role: newUser.role,
        status: "active",
        joinedDate: new Date().toISOString().split('T')[0]
      };
      setUsers([...users, user]);
      setNewUser({ name: "", email: "", phone: "", department: "", role: "" });
      setIsAddDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Department Users Management</h2>
          <p className="text-muted-foreground">Assign and manage users across departments</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Assign User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign User to Department</DialogTitle>
              <DialogDescription>
                Add a user and assign them to a department
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Jane Doe"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="e.g., jane.doe@company.com"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  placeholder="e.g., +1 (555) 000-0000"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select value={newUser.department} onValueChange={(value) => setNewUser({ ...newUser, department: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  placeholder="e.g., Senior Analyst"
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddUser}>Assign User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{users.filter(u => u.status === "active").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Departments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{departments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Filtered Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{filteredUsers.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Department User Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.department}</Badge>
                  </TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{user.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === "active" ? "default" : "secondary"}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(user.joinedDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-destructive" />
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