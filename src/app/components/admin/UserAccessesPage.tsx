import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Badge } from "@/app/components/ui/badge";
import { KeyRound, Plus, Search, Edit, Trash2, ArrowLeft, Shield, Lock, Unlock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Checkbox } from "@/app/components/ui/checkbox";

interface Permission {
  id: string;
  name: string;
  description: string;
}

interface AccessLevel {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  color: string;
}

interface UserAccessesPageProps {
  onBack: () => void;
}

export function UserAccessesPage({ onBack }: UserAccessesPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newAccessLevel, setNewAccessLevel] = useState({ 
    name: "", 
    description: "",
    selectedPermissions: [] as string[]
  });

  const availablePermissions: Permission[] = [
    { id: "read_all", name: "Read All Data", description: "View all system data" },
    { id: "write_all", name: "Write All Data", description: "Create and modify all data" },
    { id: "delete_all", name: "Delete All Data", description: "Delete any system data" },
    { id: "manage_users", name: "Manage Users", description: "Create, edit, and delete users" },
    { id: "manage_departments", name: "Manage Departments", description: "Manage department structure" },
    { id: "manage_standards", name: "Manage Standards", description: "Configure compliance standards" },
    { id: "view_reports", name: "View Reports", description: "Access all reports and analytics" },
    { id: "export_data", name: "Export Data", description: "Export system data" },
    { id: "system_config", name: "System Configuration", description: "Modify system settings" },
    { id: "audit_logs", name: "View Audit Logs", description: "Access audit trail" }
  ];

  const [accessLevels, setAccessLevels] = useState<AccessLevel[]>([
    {
      id: "1",
      name: "System Administrator",
      description: "Full system access with all permissions",
      permissions: ["read_all", "write_all", "delete_all", "manage_users", "manage_departments", "manage_standards", "view_reports", "export_data", "system_config", "audit_logs"],
      userCount: 3,
      color: "red"
    },
    {
      id: "2",
      name: "Process Manager",
      description: "Manage processes and workflows",
      permissions: ["read_all", "write_all", "manage_standards", "view_reports", "export_data"],
      userCount: 12,
      color: "blue"
    },
    {
      id: "3",
      name: "Project Manager",
      description: "Manage projects and tasks",
      permissions: ["read_all", "write_all", "view_reports", "export_data"],
      userCount: 24,
      color: "green"
    },
    {
      id: "4",
      name: "Top Management",
      description: "Executive level access",
      permissions: ["read_all", "view_reports", "export_data", "audit_logs"],
      userCount: 8,
      color: "purple"
    },
    {
      id: "5",
      name: "Team Member",
      description: "Basic user access",
      permissions: ["read_all"],
      userCount: 201,
      color: "gray"
    }
  ]);

  const filteredAccessLevels = accessLevels.filter(level =>
    level.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    level.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddAccessLevel = () => {
    if (newAccessLevel.name && newAccessLevel.description) {
      const level: AccessLevel = {
        id: String(accessLevels.length + 1),
        name: newAccessLevel.name,
        description: newAccessLevel.description,
        permissions: newAccessLevel.selectedPermissions,
        userCount: 0,
        color: "cyan"
      };
      setAccessLevels([...accessLevels, level]);
      setNewAccessLevel({ name: "", description: "", selectedPermissions: [] });
      setIsAddDialogOpen(false);
    }
  };

  const togglePermission = (permissionId: string) => {
    setNewAccessLevel(prev => ({
      ...prev,
      selectedPermissions: prev.selectedPermissions.includes(permissionId)
        ? prev.selectedPermissions.filter(id => id !== permissionId)
        : [...prev.selectedPermissions, permissionId]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">User Access Management</h2>
          <p className="text-muted-foreground">Control user permissions and access levels</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Access Level
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Access Level</DialogTitle>
              <DialogDescription>
                Define a new access level with specific permissions
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Access Level Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Auditor"
                  value={newAccessLevel.name}
                  onChange={(e) => setNewAccessLevel({ ...newAccessLevel, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Brief description of this access level"
                  value={newAccessLevel.description}
                  onChange={(e) => setNewAccessLevel({ ...newAccessLevel, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Permissions</Label>
                <div className="border rounded-lg p-4 max-h-64 overflow-y-auto space-y-3">
                  {availablePermissions.map((permission) => (
                    <div key={permission.id} className="flex items-start space-x-3">
                      <Checkbox
                        id={permission.id}
                        checked={newAccessLevel.selectedPermissions.includes(permission.id)}
                        onCheckedChange={() => togglePermission(permission.id)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor={permission.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {permission.name}
                        </label>
                        <p className="text-xs text-muted-foreground">
                          {permission.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddAccessLevel}>Create Access Level</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search access levels..."
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
            <CardTitle className="text-sm font-medium text-muted-foreground">Access Levels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{accessLevels.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{accessLevels.reduce((acc, l) => acc + l.userCount, 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{availablePermissions.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Admin Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{accessLevels.find(l => l.id === "1")?.userCount || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Access Levels List */}
      <div className="space-y-4">
        {filteredAccessLevels.map((level) => (
          <Card key={level.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 bg-${level.color}-100 rounded-lg`}>
                    <KeyRound className={`h-6 w-6 text-${level.color}-600`} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{level.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{level.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="px-3 py-1">
                    {level.userCount} users
                  </Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm font-medium">
                  <span>Permissions ({level.permissions.length})</span>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                  {level.permissions.map((permissionId) => {
                    const permission = availablePermissions.find(p => p.id === permissionId);
                    return permission ? (
                      <Badge key={permissionId} variant="secondary" className="justify-start">
                        <Shield className="mr-1 h-3 w-3" />
                        {permission.name}
                      </Badge>
                    ) : null;
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}