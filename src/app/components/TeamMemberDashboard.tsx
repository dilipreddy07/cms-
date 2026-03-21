import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";
import { 
  CheckSquare, 
  FileText, 
  Calendar, 
  MessageSquare,
  Bell,
  BookOpen,
  Award,
  Target,
  Settings,
  ArrowUpRight,
  AlertCircle,
  TrendingUp,
  Users,
  LogOut,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

type TeamPage = "dashboard" | "my-tasks" | "documents" | "training" | "calendar" | "messages" | "certifications" | "help";

interface TeamMemberDashboardProps {
  department: string;
  process: string;
  onLogout?: () => void;
}

export function TeamMemberDashboard({ department, process, onLogout }: TeamMemberDashboardProps) {
  const [currentPage, setCurrentPage] = useState<TeamPage>("dashboard");

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      window.location.href = '/';
    }
  };

  const menuItems = [
    { id: "dashboard" as TeamPage, label: "Dashboard", icon: Target },
    { id: "my-tasks" as TeamPage, label: "My Tasks", icon: CheckSquare },
    { id: "documents" as TeamPage, label: "Documents", icon: FileText },
    { id: "training" as TeamPage, label: "Training & Learning", icon: BookOpen },
    { id: "calendar" as TeamPage, label: "Calendar & Schedule", icon: Calendar },
    { id: "messages" as TeamPage, label: "Messages", icon: MessageSquare },
    { id: "certifications" as TeamPage, label: "Certifications", icon: Award },
    { id: "help" as TeamPage, label: "Help & Support", icon: Bell }
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
        <Card className="sticky top-6 border-0 shadow-lg bg-gradient-to-br from-orange-50 to-amber-50">
          <CardHeader className="pb-3 border-b border-orange-100">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg shadow-md">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-sm bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent font-bold">Team Panel</CardTitle>
                <p className="text-xs text-orange-600">Team Member</p>
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
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium shadow-md"
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
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left hover:bg-white/60 text-gray-700 hover:text-gray-900">
                <div className="p-1.5 rounded-md bg-white text-gray-600">
                  <User className="h-4 w-4" />
                </div>
                <span className="text-sm">Profile</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  View Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
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
function DashboardContent({ onNavigate }: { onNavigate: (page: TeamPage) => void }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-xl shadow-lg p-6 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">My Workspace</h2>
            <p className="text-orange-100 mt-1">Track your tasks and compliance activities</p>
          </div>
          <Badge className="px-4 py-2 bg-white text-orange-600 hover:bg-orange-50">Team Member</Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-cyan-400 to-blue-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-cyan-50">My Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">24</div>
              <div className="p-3 bg-white/20 backdrop-blur rounded-lg">
                <CheckSquare className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <ArrowUpRight className="h-3 w-3" />
              <p className="text-xs font-medium">18 completed this week</p>
            </div>
            <Progress value={75} className="h-1 mt-2 bg-white/30" />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-400 to-indigo-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-purple-50">Pending Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">6</div>
              <div className="p-3 bg-white/20 backdrop-blur rounded-lg">
                <Clock className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <Clock className="h-3 w-3" />
              <p className="text-xs">Due this week</p>
            </div>
            <Progress value={42} className="h-1 mt-2 bg-white/30" />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-400 to-orange-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-amber-50">Training Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">82%</div>
              <div className="p-3 bg-white/20 backdrop-blur rounded-lg">
                <BookOpen className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-3 w-3" />
              <p className="text-xs font-medium">5 of 6 modules complete</p>
            </div>
            <Progress value={82} className="h-1 mt-2 bg-white/30" />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-400 to-teal-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-emerald-50">Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">3</div>
              <div className="p-3 bg-white/20 backdrop-blur rounded-lg">
                <Award className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <Award className="h-3 w-3" />
              <p className="text-xs font-medium">All up to date</p>
            </div>
            <Progress value={100} className="h-1 mt-2 bg-white/30" />
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="border-b bg-gray-50">
            <CardTitle className="text-gray-900">Task Completion Trend</CardTitle>
            <CardDescription>Weekly task completion statistics</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={[
                { week: 'W1', tasks: 12 },
                { week: 'W2', tasks: 15 },
                { week: 'W3', tasks: 18 },
                { week: 'W4', tasks: 20 },
                { week: 'W5', tasks: 18 },
                { week: 'W6', tasks: 24 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="week" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Area type="monotone" dataKey="tasks" stroke="#f59e0b" fill="#fbbf24" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b bg-gray-50">
            <CardTitle className="text-gray-900">Time Distribution</CardTitle>
            <CardDescription>Hours spent by activity</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[
                { activity: 'Tasks', hours: 25 },
                { activity: 'Training', hours: 8 },
                { activity: 'Meetings', hours: 5 },
                { activity: 'Review', hours: 4 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="activity" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Bar dataKey="hours" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">Task Performance</CardTitle>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">+12.5%</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Completed</span>
                <span className="text-sm font-medium text-green-600">18 tasks</span>
              </div>
              <Progress value={75} className="h-2" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">In Progress</span>
                <span className="text-sm font-medium text-blue-600">4 tasks</span>
              </div>
              <Progress value={17} className="h-2" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Pending</span>
                <span className="text-sm font-medium text-amber-600">2 tasks</span>
              </div>
              <Progress value={8} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">Training Status</CardTitle>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">+18.2%</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">GDPR Compliance</span>
                <span className="text-sm font-medium text-gray-900">100%</span>
              </div>
              <Progress value={100} className="h-2" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Security Awareness</span>
                <span className="text-sm font-medium text-gray-900">85%</span>
              </div>
              <Progress value={85} className="h-2" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Data Protection</span>
                <span className="text-sm font-medium text-gray-900">60%</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">Productivity Score</CardTitle>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">+8.7%</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">On-time Completion</span>
                <span className="text-sm font-medium text-gray-900">92%</span>
              </div>
              <Progress value={92} className="h-2" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Quality Score</span>
                <span className="text-sm font-medium text-gray-900">88%</span>
              </div>
              <Progress value={88} className="h-2" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Response Time</span>
                <span className="text-sm font-medium text-gray-900">85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => onNavigate("my-tasks")}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <CheckSquare className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-gray-900">My Tasks</CardTitle>
                <CardDescription>View & manage tasks</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <CheckSquare className="mr-2 h-4 w-4" />
              View All Tasks
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Clock className="mr-2 h-4 w-4" />
              Pending Actions
            </Button>
            <div className="pt-2 text-sm text-blue-600 font-medium">
              6 tasks due this week
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => onNavigate("documents")}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-gray-900">Documents</CardTitle>
                <CardDescription>Access resources</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" />
              View Documents
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Upload File
            </Button>
            <div className="pt-2 text-sm text-purple-600 font-medium">
              42 documents available
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => onNavigate("training")}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-gray-900">Training</CardTitle>
                <CardDescription>Learning modules</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <BookOpen className="mr-2 h-4 w-4" />
              View Courses
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Target className="mr-2 h-4 w-4" />
              Continue Learning
            </Button>
            <div className="pt-2 text-sm text-green-600 font-medium">
              1 module remaining
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => onNavigate("calendar")}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <Calendar className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <CardTitle className="text-gray-900">Calendar</CardTitle>
                <CardDescription>Schedule & events</CardDescription>
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
              Upcoming Events
            </Button>
            <div className="pt-2 text-sm text-indigo-600 font-medium">
              3 events this week
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => onNavigate("messages")}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-100 rounded-lg">
                <MessageSquare className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <CardTitle className="text-gray-900">Messages</CardTitle>
                <CardDescription>Team communication</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <MessageSquare className="mr-2 h-4 w-4" />
              View Messages
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </Button>
            <div className="pt-2 text-sm text-amber-600 font-medium">
              2 unread messages
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => onNavigate("certifications")}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-cyan-100 rounded-lg">
                <Award className="h-6 w-6 text-cyan-600" />
              </div>
              <div>
                <CardTitle className="text-gray-900">Certifications</CardTitle>
                <CardDescription>Track credentials</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Award className="mr-2 h-4 w-4" />
              View Certificates
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Target className="mr-2 h-4 w-4" />
              Earn More
            </Button>
            <div className="pt-2 text-sm text-cyan-600 font-medium">
              3 active certifications
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-gray-900">My Recent Activity</CardTitle>
          <CardDescription>Latest actions and updates</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3">
            {[
              { action: "Completed GDPR training module", user: "Team Member", time: "5 minutes ago", color: "bg-blue-500", icon: BookOpen },
              { action: "Submitted document review", user: "team@company.com", time: "12 minutes ago", color: "bg-green-500", icon: FileText },
              { action: "Task marked as complete", user: "Team Member", time: "25 minutes ago", color: "bg-amber-500", icon: CheckSquare },
              { action: "Attended compliance training", user: "team@company.com", time: "1 hour ago", color: "bg-purple-500", icon: Award },
              { action: "Updated task status", user: "Team Member", time: "2 hours ago", color: "bg-cyan-500", icon: Target }
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