import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";
import { 
  BarChart3, 
  Briefcase, 
  CheckCircle, 
  Users, 
  Calendar, 
  Target,
  FileText,
  Clock,
  Settings,
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
  LogOut,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

type ProjectPage = "dashboard" | "projects" | "tasks" | "team" | "timeline" | "milestones" | "resources" | "reports";

interface ProjectManagerDashboardProps {
  department: string;
  process: string;
  onLogout?: () => void;
}

export function ProjectManagerDashboard({ department, process, onLogout }: ProjectManagerDashboardProps) {
  const [currentPage, setCurrentPage] = useState<ProjectPage>("dashboard");

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      window.location.href = '/';
    }
  };

  const menuItems = [
    { id: "dashboard" as ProjectPage, label: "Dashboard", icon: BarChart3 },
    { id: "projects" as ProjectPage, label: "Active Projects", icon: Briefcase },
    { id: "tasks" as ProjectPage, label: "Task Management", icon: CheckCircle },
    { id: "team" as ProjectPage, label: "Team Members", icon: Users },
    { id: "timeline" as ProjectPage, label: "Project Timeline", icon: Calendar },
    { id: "milestones" as ProjectPage, label: "Milestones", icon: Target },
    { id: "resources" as ProjectPage, label: "Resources", icon: FileText },
    { id: "reports" as ProjectPage, label: "Reports", icon: BarChart3 }
  ];

  const renderContent = () => {
    if (currentPage === "dashboard") {
      return <DashboardContent onNavigate={setCurrentPage} />;
    }
    return (
      <div className="p-6">
        <div className="mb-6">
          <Button variant="outline" onClick={() => setCurrentPage("dashboard")}>
            ← Back to Dashboard
          </Button>
        </div>
        <div className="text-center py-12">
          <h3 className="text-2xl font-bold mb-2">
            {menuItems.find(m => m.id === currentPage)?.label}
          </h3>
          <p className="text-muted-foreground">Content for this section</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex gap-6 pb-6">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <Card className="sticky top-6 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardHeader className="pb-3 border-b border-blue-100">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg shadow-md">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-sm bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-bold">Project Panel</CardTitle>
                <p className="text-xs text-blue-600">Project Management</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-1 pb-6">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left",
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium shadow-md"
                      : "hover:bg-white/60 text-gray-700 hover:text-gray-900"
                  )}
                >
                  <div className={cn(
                    "p-1.5 rounded-md",
                    isActive ? "bg-white/20 text-white" : "bg-white text-gray-600"
                  )}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
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
function DashboardContent({ onNavigate }: { onNavigate: (page: ProjectPage) => void }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-xl shadow-lg p-6 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Project Management</h2>
            <p className="text-blue-100 mt-1">Oversee compliance projects and team tasks</p>
          </div>
          <Badge className="px-4 py-2 bg-white text-blue-600 hover:bg-blue-50">Project Manager</Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-cyan-400 to-blue-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-cyan-50">Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">12</div>
              <div className="p-3 bg-white/20 backdrop-blur rounded-lg">
                <Briefcase className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <ArrowUpRight className="h-3 w-3" />
              <p className="text-xs font-medium">2 starting this week</p>
            </div>
            <Progress value={75} className="h-1 mt-2 bg-white/30" />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-400 to-indigo-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-purple-50">Tasks Assigned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">87</div>
              <div className="p-3 bg-white/20 backdrop-blur rounded-lg">
                <CheckCircle className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <CheckCircle className="h-3 w-3" />
              <p className="text-xs">68 completed</p>
            </div>
            <Progress value={78} className="h-1 mt-2 bg-white/30" />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-400 to-orange-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-amber-50">Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">34</div>
              <div className="p-3 bg-white/20 backdrop-blur rounded-lg">
                <Users className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <Users className="h-3 w-3" />
              <p className="text-xs font-medium">Across all projects</p>
            </div>
            <Progress value={85} className="h-1 mt-2 bg-white/30" />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-400 to-teal-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-emerald-50">On Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">92%</div>
              <div className="p-3 bg-white/20 backdrop-blur rounded-lg">
                <Target className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-3 w-3" />
              <p className="text-xs font-medium">Delivery rate</p>
            </div>
            <Progress value={92} className="h-1 mt-2 bg-white/30" />
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="border-b bg-gray-50">
            <CardTitle className="text-gray-900">Project Completion Trend</CardTitle>
            <CardDescription>Monthly project delivery statistics</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={[
                { month: 'Jan', projects: 5 },
                { month: 'Feb', projects: 7 },
                { month: 'Mar', projects: 9 },
                { month: 'Apr', projects: 10 },
                { month: 'May', projects: 11 },
                { month: 'Jun', projects: 12 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Area type="monotone" dataKey="projects" stroke="#3b82f6" fill="#93c5fd" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b bg-gray-50">
            <CardTitle className="text-gray-900">Task Distribution</CardTitle>
            <CardDescription>Tasks by status breakdown</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Completed', value: 68, color: '#10b981' },
                    { name: 'In Progress', value: 12, color: '#3b82f6' },
                    { name: 'Pending', value: 5, color: '#f59e0b' },
                    { name: 'Blocked', value: 2, color: '#ef4444' }
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {[
                    { name: 'Completed', value: 68, color: '#10b981' },
                    { name: 'In Progress', value: 12, color: '#3b82f6' },
                    { name: 'Pending', value: 5, color: '#f59e0b' },
                    { name: 'Blocked', value: 2, color: '#ef4444' }
                  ].map((entry, index) => (
                    <Cell key={`task-dist-cell-${entry.name}-${index}`} fill={entry.color} />
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
              <CardTitle className="text-sm font-medium text-gray-700">Project Progress</CardTitle>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">+8.2%</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">GDPR Implementation</span>
                <span className="text-sm font-medium text-gray-900">75%</span>
              </div>
              <Progress value={75} className="h-2" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">SOC 2 Audit</span>
                <span className="text-sm font-medium text-gray-900">60%</span>
              </div>
              <Progress value={60} className="h-2" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Risk Assessment</span>
                <span className="text-sm font-medium text-gray-900">90%</span>
              </div>
              <Progress value={90} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">Task Status</CardTitle>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">+12.5%</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Completed</span>
                <span className="text-sm font-medium text-green-600">68 tasks</span>
              </div>
              <Progress value={78} className="h-2" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">In Progress</span>
                <span className="text-sm font-medium text-blue-600">12 tasks</span>
              </div>
              <Progress value={14} className="h-2" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Pending</span>
                <span className="text-sm font-medium text-amber-600">7 tasks</span>
              </div>
              <Progress value={8} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">Team Performance</CardTitle>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">+5.7%</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">On Time Delivery</span>
                <span className="text-sm font-medium text-gray-900">92%</span>
              </div>
              <Progress value={92} className="h-2" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Resource Utilization</span>
                <span className="text-sm font-medium text-gray-900">85%</span>
              </div>
              <Progress value={85} className="h-2" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Quality Score</span>
                <span className="text-sm font-medium text-gray-900">88%</span>
              </div>
              <Progress value={88} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => onNavigate("projects")}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-gray-900">Active Projects</CardTitle>
                <CardDescription>Manage ongoing projects</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Briefcase className="mr-2 h-4 w-4" />
              View All Projects
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Create Project
            </Button>
            <div className="pt-2 text-sm text-blue-600 font-medium">
              12 active projects
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => onNavigate("tasks")}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-gray-900">Task Management</CardTitle>
                <CardDescription>Track and assign tasks</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <CheckCircle className="mr-2 h-4 w-4" />
              View All Tasks
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Assign Tasks
            </Button>
            <div className="pt-2 text-sm text-purple-600 font-medium">
              87 total tasks
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => onNavigate("team")}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-gray-900">Team Management</CardTitle>
                <CardDescription>Manage team members</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              View Team
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Manage Roles
            </Button>
            <div className="pt-2 text-sm text-green-600 font-medium">
              34 team members
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => onNavigate("timeline")}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <Calendar className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <CardTitle className="text-gray-900">Project Timeline</CardTitle>
                <CardDescription>Schedule & deadlines</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="mr-2 h-4 w-4" />
              View Schedule
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Clock className="mr-2 h-4 w-4" />
              Set Deadlines
            </Button>
            <div className="pt-2 text-sm text-indigo-600 font-medium">
              24 upcoming deadlines
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => onNavigate("milestones")}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-100 rounded-lg">
                <Target className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <CardTitle className="text-gray-900">Milestones</CardTitle>
                <CardDescription>Track key objectives</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Target className="mr-2 h-4 w-4" />
              View Milestones
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Add Milestone
            </Button>
            <div className="pt-2 text-sm text-amber-600 font-medium">
              8 key milestones
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => onNavigate("reports")}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-cyan-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-cyan-600" />
              </div>
              <div>
                <CardTitle className="text-gray-900">Reports & Analytics</CardTitle>
                <CardDescription>Project insights</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <BarChart3 className="mr-2 h-4 w-4" />
              View Reports
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
            <div className="pt-2 text-sm text-cyan-600 font-medium">
              15 reports available
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-gray-900">Recent Project Activity</CardTitle>
          <CardDescription>Latest project actions and updates</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3">
            {[
              { action: "GDPR project milestone completed", user: "Project Manager", time: "5 minutes ago", color: "bg-blue-500", icon: Target },
              { action: "New task assigned to Team Alpha", user: "project@company.com", time: "12 minutes ago", color: "bg-green-500", icon: CheckCircle },
              { action: "SOC 2 timeline updated", user: "Project Manager", time: "25 minutes ago", color: "bg-amber-500", icon: Calendar },
              { action: "Team meeting scheduled", user: "project@company.com", time: "1 hour ago", color: "bg-purple-500", icon: Users },
              { action: "Project report generated", user: "Project Manager", time: "2 hours ago", color: "bg-cyan-500", icon: FileText }
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
}