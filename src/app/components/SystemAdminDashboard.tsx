import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Progress } from "@/app/components/ui/progress";
import { 
  Users, 
  Settings, 
  Shield, 
  Building2, 
  BookOpen, 
  ClipboardList,
  UserCog,
  Lock,
  KeyRound,
  Activity,
  Bell,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  AlertTriangle,
  FileText,
  BarChart3,
  LayoutDashboard,
  LogOut,
  User,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DepartmentsPage } from "./admin/DepartmentsPage";
import { DepartmentUsersPage } from "./admin/DepartmentUsersPage";
import { UserAccessesPage } from "./admin/UserAccessesPage";
import { CompanyInformationPage } from "./admin/CompanyInformationPage";
import { NotificationsPage } from "./admin/NotificationsPage";
import { SettingsPage } from "./admin/SettingsPage";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getDepartmentData } from "@/app/config/departmentData";
import { getDepartmentConfig } from "@/app/config/departmentConfig";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

type AdminPage = "dashboard" | "departments" | "department-users" | "user-accesses" | "company-info" | "notifications" | "settings";

interface SystemAdminDashboardProps {
  department: string;
  process: string;
  onLogout?: () => void;
}

export function SystemAdminDashboard({ department, process, onLogout }: SystemAdminDashboardProps) {
  const [currentPage, setCurrentPage] = useState<AdminPage>("dashboard");
  const [unreadNotifications] = useState(8); // Notification count
  
  // Get department-specific data
  const deptData = getDepartmentData(department);
  const deptConfig = getDepartmentConfig(department);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      window.location.href = '/';
    }
  };

  const menuItems = [
    {
      id: "dashboard" as AdminPage,
      label: "Dashboard",
      icon: LayoutDashboard,
      color: "text-gray-600",
      bgColor: "bg-gray-100"
    },
    {
      id: "departments" as AdminPage,
      label: "Departments",
      icon: Building2,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      id: "department-users" as AdminPage,
      label: "Department Users",
      icon: UserCog,
      color: "text-amber-600",
      bgColor: "bg-amber-100"
    },
    {
      id: "user-accesses" as AdminPage,
      label: "User Accesses",
      icon: KeyRound,
      color: "text-red-600",
      bgColor: "bg-red-100"
    },
    {
      id: "company-info" as AdminPage,
      label: "Company Information",
      icon: Info,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      id: "notifications" as AdminPage,
      label: "Notifications",
      icon: Bell,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      id: "settings" as AdminPage,
      label: "Settings",
      icon: Settings,
      color: "text-gray-600",
      bgColor: "bg-gray-100"
    }
  ];

  const renderContent = () => {
    switch (currentPage) {
      case "departments":
        return <DepartmentsPage onBack={() => setCurrentPage("dashboard")} />;
      case "department-users":
        return <DepartmentUsersPage onBack={() => setCurrentPage("dashboard")} />;
      case "user-accesses":
        return <UserAccessesPage onBack={() => setCurrentPage("dashboard")} />;
      case "company-info":
        return <CompanyInformationPage onBack={() => setCurrentPage("dashboard")} />;
      case "notifications":
        return <NotificationsPage onBack={() => setCurrentPage("dashboard")} />;
      case "settings":
        return <SettingsPage onBack={() => setCurrentPage("dashboard")} />;
      default:
        return <DashboardContent onNavigate={setCurrentPage} deptData={deptData} deptConfig={deptConfig} />;
    }
  };

  return (
    <div className="flex gap-6 pb-6">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <Card className="sticky top-6 border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50">
          <CardHeader className="pb-3 border-b border-purple-100">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-md">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-sm bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">Admin Panel</CardTitle>
                <p className="text-xs text-purple-600">System Configuration</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-1 pb-6">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              const showBadge = item.id === "notifications" && unreadNotifications > 0;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left",
                    isActive
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium shadow-md"
                      : "hover:bg-white/60 text-gray-700 hover:text-gray-900"
                  )}
                >
                  <div className={cn(
                    "p-1.5 rounded-md",
                    isActive ? "bg-white/20 text-white" : "bg-white text-gray-600"
                  )}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm flex-1">{item.label}</span>
                  {showBadge && (
                    <Badge className={cn(
                      "ml-auto text-xs px-1.5 py-0.5",
                      isActive 
                        ? "bg-white text-purple-600" 
                        : "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                    )}>
                      {unreadNotifications}
                    </Badge>
                  )}
                </button>
              );
            })}
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left hover:bg-white/60 text-gray-700 hover:text-gray-900">
                <div className="p-1.5 rounded-md bg-white text-gray-600">
                  <LogOut className="h-4 w-4" />
                </div>
                <span className="text-sm">Logout</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Are you sure?</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {renderContent()}
      </div>
    </div>
  );
}

// Dashboard Content Component
function DashboardContent({ onNavigate, deptData, deptConfig }: { onNavigate: (page: AdminPage) => void, deptData: any, deptConfig: any }) {
  const renderOverview = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-xl shadow-lg p-6 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">System Administration</h2>
            <p className="text-purple-100 mt-1">Manage system configuration and user access</p>
          </div>
          <Badge className="px-4 py-2 bg-white text-purple-600 hover:bg-purple-50">Administrator</Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-cyan-400 to-blue-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-cyan-50">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{deptData.totalUsers}</div>
              <div className="p-3 bg-white/20 backdrop-blur rounded-lg">
                <Users className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <ArrowUpRight className="h-3 w-3" />
              <p className="text-xs font-medium">+12 this month</p>
            </div>
            <Progress value={75} className="h-1 mt-2 bg-white/30" />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-400 to-indigo-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-purple-50">Active Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{deptData.activeSessions}</div>
              <div className="p-3 bg-white/20 backdrop-blur rounded-lg">
                <Activity className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <Clock className="h-3 w-3" />
              <p className="text-xs">Real-time active</p>
            </div>
            <Progress value={42} className="h-1 mt-2 bg-white/30" />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-400 to-orange-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-amber-50">Security Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{deptData.securityAlerts}</div>
              <div className="p-3 bg-white/20 backdrop-blur rounded-lg">
                <Bell className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <AlertTriangle className="h-3 w-3" />
              <p className="text-xs font-medium">Requires attention</p>
            </div>
            <Progress value={15} className="h-1 mt-2 bg-white/30" />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-400 to-teal-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-emerald-50">System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{deptData.systemHealth}%</div>
              <div className="p-3 bg-white/20 backdrop-blur rounded-lg">
                <CheckCircle2 className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-3 w-3" />
              <p className="text-xs font-medium">All systems operational</p>
            </div>
            <Progress value={deptData.systemHealth} className="h-1 mt-2 bg-white/30" />
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="border-b bg-gray-50">
            <CardTitle className="text-gray-900">User Growth Trend</CardTitle>
            <CardDescription>Monthly user registration statistics</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={deptData.userGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Area type="monotone" dataKey="users" stroke="#3b82f6" fill="#93c5fd" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b bg-gray-50">
            <CardTitle className="text-gray-900">Department Distribution</CardTitle>
            <CardDescription>Users by department breakdown</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={deptData.departmentBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {deptData.departmentBreakdown.map((entry: any, index: number) => (
                    <Cell key={`dept-breakdown-cell-${entry.name}-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">Compliance Rate</CardTitle>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">+5.2%</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">GDPR</span>
                <span className="text-sm font-medium text-gray-900">94%</span>
              </div>
              <Progress value={94} className="h-2" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">ISO 27001</span>
                <span className="text-sm font-medium text-gray-900">88%</span>
              </div>
              <Progress value={88} className="h-2" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">SOC 2</span>
                <span className="text-sm font-medium text-gray-900">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">Task Completion</CardTitle>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">+8.1%</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Completed</span>
                <span className="text-sm font-medium text-green-600">156 tasks</span>
              </div>
              <Progress value={78} className="h-2" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">In Progress</span>
                <span className="text-sm font-medium text-blue-600">32 tasks</span>
              </div>
              <Progress value={16} className="h-2" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Overdue</span>
                <span className="text-sm font-medium text-red-600">12 tasks</span>
              </div>
              <Progress value={6} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">Document Status</CardTitle>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">+12%</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Approved</span>
                <span className="text-sm font-medium text-gray-900">245 docs</span>
              </div>
              <Progress value={85} className="h-2" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Pending Review</span>
                <span className="text-sm font-medium text-gray-900">28 docs</span>
              </div>
              <Progress value={10} className="h-2" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Draft</span>
                <span className="text-sm font-medium text-gray-900">15 docs</span>
              </div>
              <Progress value={5} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => onNavigate("departments")}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <Building2 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-gray-900">Departments</CardTitle>
                <CardDescription>Manage organizational units</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" onClick={(e) => { e.stopPropagation(); onNavigate("departments"); }}>
              <Building2 className="mr-2 h-4 w-4" />
              View Departments
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={(e) => { e.stopPropagation(); onNavigate("departments"); }}>
              <Settings className="mr-2 h-4 w-4" />
              Configure Departments
            </Button>
            <div className="pt-2 text-sm text-green-600 font-medium">
              8 departments active
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => onNavigate("department-users")}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-100 rounded-lg">
                <UserCog className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <CardTitle className="text-gray-900">Department Users</CardTitle>
                <CardDescription>Assign users to departments</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" onClick={(e) => { e.stopPropagation(); onNavigate("department-users"); }}>
              <Users className="mr-2 h-4 w-4" />
              View User Assignments
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={(e) => { e.stopPropagation(); onNavigate("department-users"); }}>
              <UserCog className="mr-2 h-4 w-4" />
              Manage Assignments
            </Button>
            <div className="pt-2 text-sm text-amber-600 font-medium">
              248 users assigned
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => onNavigate("user-accesses")}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-100 rounded-lg">
                <KeyRound className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <CardTitle className="text-gray-900">User Accesses</CardTitle>
                <CardDescription>Control user permissions</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" onClick={(e) => { e.stopPropagation(); onNavigate("user-accesses"); }}>
              <Lock className="mr-2 h-4 w-4" />
              View Access Levels
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={(e) => { e.stopPropagation(); onNavigate("user-accesses"); }}>
              <KeyRound className="mr-2 h-4 w-4" />
              Manage Permissions
            </Button>
            <div className="pt-2 text-sm text-red-600 font-medium">
              5 access levels defined
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-gray-900">Recent System Activity</CardTitle>
          <CardDescription>Latest administrative actions and system events</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3">
            {[
              { action: "Industry type 'Software' updated", user: "System Admin", time: "5 minutes ago", color: "bg-blue-500", icon: FileText },
              { action: "New department 'Quality Assurance' created", user: "admin@company.com", time: "12 minutes ago", color: "bg-green-500", icon: Building2 },
              { action: "User access level modified for 5 users", user: "System Admin", time: "25 minutes ago", color: "bg-amber-500", icon: Users },
              { action: "Compliance checklist template created", user: "admin@company.com", time: "1 hour ago", color: "bg-purple-500", icon: ClipboardList },
              { action: "Industry standard 'ISO 9001' updated", user: "System Admin", time: "2 hours ago", color: "bg-cyan-500", icon: BookOpen }
            ].map((activity, idx) => {
              const Icon = activity.icon;
              return (
                <div key={idx} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-all">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 ${activity.color} rounded-lg`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{activity.user}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{activity.time}</span>
                    <Clock className="h-3 w-3 text-gray-400" />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {renderOverview()}
    </div>
  );
}