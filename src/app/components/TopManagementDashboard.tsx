import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";
import { 
  Shield, 
  TrendingUp, 
  DollarSign, 
  BarChart3,
  FileText,
  Target,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Settings,
  Award,
  LogOut,
  User,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

type ManagementPage = "dashboard" | "overview" | "compliance" | "risk" | "performance" | "budgets" | "audits" | "strategy";

interface TopManagementDashboardProps {
  department: string;
  process: string;
  onLogout?: () => void;
}

export function TopManagementDashboard({ department, process, onLogout }: TopManagementDashboardProps) {
  const [currentPage, setCurrentPage] = useState<ManagementPage>("dashboard");

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      window.location.href = '/';
    }
  };

  const menuItems = [
    { id: "dashboard" as ManagementPage, label: "Dashboard", icon: BarChart3 },
    { id: "overview" as ManagementPage, label: "Executive Overview", icon: TrendingUp },
    { id: "compliance" as ManagementPage, label: "Compliance Status", icon: Shield },
    { id: "risk" as ManagementPage, label: "Risk Management", icon: AlertTriangle },
    { id: "performance" as ManagementPage, label: "Performance Metrics", icon: Target },
    { id: "budgets" as ManagementPage, label: "Budget & Resources", icon: DollarSign },
    { id: "audits" as ManagementPage, label: "Audit Reports", icon: FileText },
    { id: "strategy" as ManagementPage, label: "Strategic Planning", icon: Award }
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
        <Card className="sticky top-6 border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-teal-50">
          <CardHeader className="pb-3 border-b border-emerald-100">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg shadow-md">
                <Award className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-sm bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-bold">Executive Panel</CardTitle>
                <p className="text-xs text-emerald-600">Top Management</p>
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
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium shadow-md"
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
          <CardContent className="space-y-1 pb-6">
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left hover:bg-white/60 text-gray-700 hover:text-gray-900">
                <div className="p-1.5 rounded-md bg-white text-gray-600">
                  <User className="h-4 w-4" />
                </div>
                <span className="text-sm">User Settings</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
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
function DashboardContent({ onNavigate }: { onNavigate: (page: ManagementPage) => void }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-xl shadow-lg p-6 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Executive Dashboard</h2>
            <p className="text-emerald-100 mt-1">Strategic oversight and compliance monitoring</p>
          </div>
          <Badge className="px-4 py-2 bg-white text-emerald-600 hover:bg-emerald-50">Top Management</Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-cyan-400 to-blue-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-cyan-50">Overall Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">94%</div>
              <div className="p-3 bg-white/20 backdrop-blur rounded-lg">
                <Shield className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <ArrowUpRight className="h-3 w-3" />
              <p className="text-xs font-medium">+5.2% from last quarter</p>
            </div>
            <Progress value={94} className="h-1 mt-2 bg-white/30" />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-400 to-indigo-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-purple-50">Active Risks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">7</div>
              <div className="p-3 bg-white/20 backdrop-blur rounded-lg">
                <AlertTriangle className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <AlertTriangle className="h-3 w-3" />
              <p className="text-xs">2 high priority</p>
            </div>
            <Progress value={25} className="h-1 mt-2 bg-white/30" />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-400 to-orange-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-amber-50">Budget Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">$2.4M</div>
              <div className="p-3 bg-white/20 backdrop-blur rounded-lg">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-3 w-3" />
              <p className="text-xs font-medium">68% of $3.5M budget</p>
            </div>
            <Progress value={68} className="h-1 mt-2 bg-white/30" />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-400 to-teal-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-emerald-50">Team Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">88%</div>
              <div className="p-3 bg-white/20 backdrop-blur rounded-lg">
                <Target className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <CheckCircle2 className="h-3 w-3" />
              <p className="text-xs font-medium">KPIs on track</p>
            </div>
            <Progress value={88} className="h-1 mt-2 bg-white/30" />
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="border-b bg-gray-50">
            <CardTitle className="text-gray-900">Compliance Trend</CardTitle>
            <CardDescription>Quarterly compliance performance</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={[
                { quarter: 'Q1', rate: 85 },
                { quarter: 'Q2', rate: 88 },
                { quarter: 'Q3', rate: 91 },
                { quarter: 'Q4', rate: 94 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="quarter" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Area type="monotone" dataKey="rate" stroke="#10b981" fill="#6ee7b7" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b bg-gray-50">
            <CardTitle className="text-gray-900">Risk Category Distribution</CardTitle>
            <CardDescription>Risks by severity level</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'High', value: 2, color: '#ef4444' },
                    { name: 'Medium', value: 3, color: '#f59e0b' },
                    { name: 'Low', value: 2, color: '#10b981' }
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
                    { name: 'High', value: 2, color: '#ef4444' },
                    { name: 'Medium', value: 3, color: '#f59e0b' },
                    { name: 'Low', value: 2, color: '#10b981' }
                  ].map((entry, index) => (
                    <Cell key={`risk-category-cell-${entry.name}-${index}`} fill={entry.color} />
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
              <CardTitle className="text-sm font-medium text-gray-700">Compliance Standards</CardTitle>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">+5.2%</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">GDPR</span>
                <span className="text-sm font-medium text-gray-900">96%</span>
              </div>
              <Progress value={96} className="h-2" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">ISO 27001</span>
                <span className="text-sm font-medium text-gray-900">92%</span>
              </div>
              <Progress value={92} className="h-2" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">SOC 2</span>
                <span className="text-sm font-medium text-gray-900">94%</span>
              </div>
              <Progress value={94} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">Strategic Goals</CardTitle>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">+12.3%</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Achieved</span>
                <span className="text-sm font-medium text-green-600">24 goals</span>
              </div>
              <Progress value={75} className="h-2" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">In Progress</span>
                <span className="text-sm font-medium text-blue-600">6 goals</span>
              </div>
              <Progress value={19} className="h-2" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Pending</span>
                <span className="text-sm font-medium text-amber-600">2 goals</span>
              </div>
              <Progress value={6} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">Department Health</CardTitle>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">+8.4%</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Operational</span>
                <span className="text-sm font-medium text-gray-900">92%</span>
              </div>
              <Progress value={92} className="h-2" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Staffing</span>
                <span className="text-sm font-medium text-gray-900">88%</span>
              </div>
              <Progress value={88} className="h-2" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Budget</span>
                <span className="text-sm font-medium text-gray-900">85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Management Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => onNavigate("overview")}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-gray-900">Executive Overview</CardTitle>
                <CardDescription>Key metrics & insights</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <TrendingUp className="mr-2 h-4 w-4" />
              View KPIs
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </Button>
            <div className="pt-2 text-sm text-blue-600 font-medium">
              32 KPIs tracked
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => onNavigate("compliance")}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-gray-900">Compliance Status</CardTitle>
                <CardDescription>Regulatory overview</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Shield className="mr-2 h-4 w-4" />
              View Status
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Reports
            </Button>
            <div className="pt-2 text-sm text-green-600 font-medium">
              94% compliant
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => onNavigate("risk")}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <CardTitle className="text-gray-900">Risk Management</CardTitle>
                <CardDescription>Risk portfolio</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <AlertTriangle className="mr-2 h-4 w-4" />
              View Risks
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Target className="mr-2 h-4 w-4" />
              Mitigation Plans
            </Button>
            <div className="pt-2 text-sm text-red-600 font-medium">
              7 active risks
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => onNavigate("performance")}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-gray-900">Performance Metrics</CardTitle>
                <CardDescription>Team & goals</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Target className="mr-2 h-4 w-4" />
              View Metrics
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Team Performance
            </Button>
            <div className="pt-2 text-sm text-purple-600 font-medium">
              88% target achievement
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => onNavigate("budgets")}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <CardTitle className="text-gray-900">Budget & Resources</CardTitle>
                <CardDescription>Financial oversight</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <DollarSign className="mr-2 h-4 w-4" />
              View Budget
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </Button>
            <div className="pt-2 text-sm text-amber-600 font-medium">
              $2.4M utilized
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => onNavigate("strategy")}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-cyan-100 rounded-lg">
                <Award className="h-6 w-6 text-cyan-600" />
              </div>
              <div>
                <CardTitle className="text-gray-900">Strategic Planning</CardTitle>
                <CardDescription>Long-term goals</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Award className="mr-2 h-4 w-4" />
              View Strategy
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Set Goals
            </Button>
            <div className="pt-2 text-sm text-cyan-600 font-medium">
              18 strategic initiatives
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-gray-900">Executive Activity Log</CardTitle>
          <CardDescription>Latest strategic actions and decisions</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3">
            {[
              { action: "Q4 compliance review completed", user: "Top Management", time: "5 minutes ago", color: "bg-blue-500", icon: Shield },
              { action: "Strategic goal updated: Market expansion", user: "executive@company.com", time: "12 minutes ago", color: "bg-green-500", icon: Award },
              { action: "Risk mitigation plan approved", user: "Top Management", time: "25 minutes ago", color: "bg-amber-500", icon: AlertTriangle },
              { action: "Budget allocation reviewed", user: "executive@company.com", time: "1 hour ago", color: "bg-purple-500", icon: DollarSign },
              { action: "Performance KPIs updated", user: "Top Management", time: "2 hours ago", color: "bg-cyan-500", icon: Target }
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