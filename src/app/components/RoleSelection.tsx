import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Badge } from "@/app/components/ui/badge";
import { 
  Shield, 
  Settings, 
  Briefcase, 
  TrendingUp, 
  Users, 
  Search, 
  ArrowRight,
  Lock,
  CheckCircle2,
  FileText
} from "lucide-react";
import { motion } from "motion/react";

interface Role {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  permissions: string[];
  responsibilities: string[];
  color: string;
  bgColor: string;
  accessLevel: string;
}

const roles: Role[] = [
  {
    id: "system-admin",
    name: "System Admin",
    title: "System Administrator",
    description: "Full system access with administrative privileges",
    icon: <Shield className="h-10 w-10" />,
    permissions: [
      "Full system configuration",
      "User management & permissions",
      "System-wide settings",
      "Security & audit controls",
      "Database management"
    ],
    responsibilities: [
      "System maintenance",
      "Security oversight",
      "User access control",
      "System updates"
    ],
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50 border-red-200",
    accessLevel: "Administrator"
  },
  {
    id: "process-manager",
    name: "Process Manager",
    title: "Process Manager",
    description: "Manage and oversee compliance processes and workflows",
    icon: <Settings className="h-10 w-10" />,
    permissions: [
      "Process definition & editing",
      "Workflow management",
      "Process validation",
      "Standards & procedures",
      "Process documentation"
    ],
    responsibilities: [
      "Define processes",
      "Monitor compliance",
      "Process optimization",
      "Documentation management"
    ],
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50 border-blue-200",
    accessLevel: "Manager"
  },
  {
    id: "project-manager",
    name: "Project Manager",
    title: "Project Manager",
    description: "Oversee compliance projects and task execution",
    icon: <Briefcase className="h-10 w-10" />,
    permissions: [
      "Project planning",
      "Task assignment",
      "Team coordination",
      "Progress tracking",
      "Resource allocation"
    ],
    responsibilities: [
      "Project delivery",
      "Team management",
      "Timeline tracking",
      "Stakeholder reporting"
    ],
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50 border-purple-200",
    accessLevel: "Manager"
  },
  {
    id: "top-management",
    name: "Top Management",
    title: "Top Management",
    description: "Executive oversight and strategic decision making",
    icon: <TrendingUp className="h-10 w-10" />,
    permissions: [
      "Executive dashboard",
      "Strategic analytics",
      "Risk overview",
      "Compliance reports",
      "Approval workflows"
    ],
    responsibilities: [
      "Strategic oversight",
      "Risk assessment",
      "Policy approval",
      "Budget decisions"
    ],
    color: "from-amber-500 to-amber-600",
    bgColor: "bg-amber-50 border-amber-200",
    accessLevel: "Executive"
  },
  {
    id: "team-member",
    name: "Team Member",
    title: "Team Member",
    description: "Execute assigned tasks and contribute to compliance activities",
    icon: <Users className="h-10 w-10" />,
    permissions: [
      "View assigned tasks",
      "Update task status",
      "Access documents",
      "Submit reports",
      "View dashboards"
    ],
    responsibilities: [
      "Complete tasks",
      "Follow procedures",
      "Submit updates",
      "Collaborate with team"
    ],
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50 border-green-200",
    accessLevel: "Member"
  },
  {
    id: "qmics-executive",
    name: "QMICS Executive",
    title: "QMICS Executive",
    description: "Manage documents, approvals, employees, and role requests",
    icon: <FileText className="h-10 w-10" />,
    permissions: [
      "Manage QMS & ISMS documents",
      "Approve document requests",
      "View employee allocation",
      "Review role requests",
      "Document library management"
    ],
    responsibilities: [
      "Document management",
      "Approval workflows",
      "Employee oversight",
      "Role assignment reviews"
    ],
    color: "from-cyan-500 to-teal-600",
    bgColor: "bg-cyan-50 border-cyan-200",
    accessLevel: "Executive"
  },
  {
    id: "process-executor",
    name: "Process Executor",
    title: "Process Executor",
    description: "Execute processes and collaborate with the team",
    icon: <FileText className="h-10 w-10" />,
    permissions: [
      "Process Execution",
      "Team Collaboration",
      "Task Updates"
    ],
    responsibilities: [
      "Execute processes",
      "Collaborate with team",
      "Update tasks"
    ],
    color: "from-cyan-500 to-teal-600",
    bgColor: "bg-cyan-50 border-cyan-200",
    accessLevel: "Member"
  }
];

interface RoleSelectionProps {
  department: string;
  process: string;
  onRoleSelect: (roleId: string, userName: string, userEmail: string) => void;
  onBack: () => void;
}

export function RoleSelection({ department, process, onRoleSelect, onBack }: RoleSelectionProps) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);

  const handleSelect = (roleId: string) => {
    setSelectedRole(roleId);
  };

  const handleContinue = () => {
    if (selectedRole && userName && userEmail) {
      onRoleSelect(selectedRole, userName, userEmail);
    }
  };

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isFormValid = selectedRole && userName.trim() !== "" && userEmail.trim() !== "" && userEmail.includes("@");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Role-Based Access Control</h1>
              <p className="text-sm text-muted-foreground">
                {department.charAt(0).toUpperCase() + department.slice(1)} • {process.charAt(0).toUpperCase() + process.slice(1)}
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={onBack}>
            Back to Process Selection
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Select Your Role</h2>
            <p className="text-muted-foreground">
              Choose your role to access the compliance management system
            </p>
          </div>

          {/* Search */}
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredRoles.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`cursor-pointer transition-all duration-200 h-full ${
                  selectedRole === role.id
                    ? "border-2 border-primary shadow-xl ring-2 ring-primary/20"
                    : "hover:shadow-lg hover:border-primary/50"
                }`}
                onClick={() => handleSelect(role.id)}
                onMouseEnter={() => setHoveredRole(role.id)}
                onMouseLeave={() => setHoveredRole(null)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${role.color} text-white`}>
                      {role.icon}
                    </div>
                    {selectedRole === role.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-primary rounded-full p-1"
                      >
                        <CheckCircle2 className="h-5 w-5 text-white" />
                      </motion.div>
                    )}
                  </div>
                  <CardTitle className="text-xl mb-1">{role.title}</CardTitle>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {role.accessLevel}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm">{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Permissions */}
                    <div>
                      <h4 className="text-sm font-semibold mb-2 text-muted-foreground">
                        Permissions
                      </h4>
                      <ul className="space-y-1">
                        {role.permissions.slice(0, 3).map((permission, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs">
                            <div className={`mt-0.5 w-1 h-1 rounded-full flex-shrink-0 ${
                              selectedRole === role.id ? "bg-primary" : "bg-gray-300"
                            }`} />
                            <span className="text-muted-foreground">{permission}</span>
                          </li>
                        ))}
                        {role.permissions.length > 3 && (
                          <li className="text-xs text-primary font-medium pl-3">
                            +{role.permissions.length - 3} more
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* User Information Form */}
        {selectedRole && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto mb-6"
          >
            <Card className="border-primary/50 bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Complete Your Profile</CardTitle>
                <CardDescription>
                  Enter your details to access the system as{" "}
                  <span className="font-semibold text-primary">
                    {roles.find((r) => r.id === selectedRole)?.title}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="userName">Full Name *</Label>
                    <Input
                      id="userName"
                      placeholder="Enter your full name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userEmail">Email Address *</Label>
                    <Input
                      id="userEmail"
                      type="email"
                      placeholder="your.email@company.com"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Selected Role Summary */}
                <div className={`p-4 rounded-lg border ${roles.find((r) => r.id === selectedRole)?.bgColor}`}>
                  <h4 className="font-semibold mb-3">Your Access Level</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Key Permissions:</p>
                      <ul className="space-y-1">
                        {roles
                          .find((r) => r.id === selectedRole)
                          ?.permissions.slice(0, 4)
                          .map((permission, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-xs">
                              <CheckCircle2 className="h-3 w-3 text-primary" />
                              <span>{permission}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Main Responsibilities:</p>
                      <ul className="space-y-1">
                        {roles
                          .find((r) => r.id === selectedRole)
                          ?.responsibilities.map((resp, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-xs">
                              <CheckCircle2 className="h-3 w-3 text-primary" />
                              <span>{resp}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Continue Button */}
                <div className="flex justify-end pt-4">
                  <Button
                    size="lg"
                    onClick={handleContinue}
                    disabled={!isFormValid}
                    className="px-8"
                  >
                    Access Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Info Message */}
        {!selectedRole && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Lock className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-blue-900">Secure Access Control</h4>
                    <p className="text-sm text-blue-700">
                      Each role has specific permissions tailored to their responsibilities. Select the
                      role that matches your position in the organization to access appropriate features
                      and data within the compliance management system.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}