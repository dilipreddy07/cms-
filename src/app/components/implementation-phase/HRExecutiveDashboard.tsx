import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  ClipboardList,
  TrendingUp,
  CheckCircle2,
  Clock,
  Users,
  FileText,
  Activity,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Filter
} from "lucide-react";

interface DashboardData {
  totalProcedures: number;
  inProgressProcedures: number;
  completedProcedures: number;
  pendingTasks: number;
}

interface ActivityLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  type: "procedure" | "policy" | "resource" | "task";
}

interface HRExecutiveDashboardProps {
  onNavigate?: (section: string) => void;
}

export function HRExecutiveDashboard({ onNavigate }: HRExecutiveDashboardProps) {
  const [filterDepartment, setFilterDepartment] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Dashboard data
  const dashboardData: DashboardData = {
    totalProcedures: 24,
    inProgressProcedures: 12,
    completedProcedures: 8,
    pendingTasks: 18
  };

  // Recent activities
  const recentActivities: ActivityLog[] = [
    {
      id: "1",
      action: "Employee Onboarding Procedure started",
      user: "Sarah Johnson",
      timestamp: "2024-03-15 14:30",
      type: "procedure"
    },
    {
      id: "2",
      action: "Data Protection Policy implementation completed",
      user: "Michael Chen",
      timestamp: "2024-03-15 13:15",
      type: "policy"
    },
    {
      id: "3",
      action: "Resource assigned to Training Management",
      user: "Emily Davis",
      timestamp: "2024-03-15 11:45",
      type: "resource"
    },
    {
      id: "4",
      action: "Performance Review Procedure updated",
      user: "John Smith",
      timestamp: "2024-03-15 10:20",
      type: "procedure"
    },
    {
      id: "5",
      action: "Compliance training task completed",
      user: "Lisa Anderson",
      timestamp: "2024-03-15 09:00",
      type: "task"
    },
    {
      id: "6",
      action: "Leave Policy implementation in progress",
      user: "David Wilson",
      timestamp: "2024-03-14 16:40",
      type: "policy"
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "procedure": return <FileText className="h-4 w-4 text-blue-600" />;
      case "policy": return <ClipboardList className="h-4 w-4 text-purple-600" />;
      case "resource": return <Users className="h-4 w-4 text-green-600" />;
      case "task": return <CheckCircle2 className="h-4 w-4 text-orange-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getActivityBadgeColor = (type: string) => {
    switch (type) {
      case "procedure": return "bg-blue-100 text-blue-700";
      case "policy": return "bg-purple-100 text-purple-700";
      case "resource": return "bg-green-100 text-green-700";
      case "task": return "bg-orange-100 text-orange-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const completionRate = Math.round((dashboardData.completedProcedures / dashboardData.totalProcedures) * 100);
  const progressRate = Math.round((dashboardData.inProgressProcedures / dashboardData.totalProcedures) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Implementation Dashboard
        </h2>
        <p className="text-muted-foreground mt-1">
          Real-time overview of execution activities and progress tracking
        </p>
      </div>

      {/* Filters */}
      <Card className="border-2">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="hr">HR</SelectItem>
                <SelectItem value="it">IT</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="not-started">Not Started</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            {(filterDepartment !== "all" || filterStatus !== "all") && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  setFilterDepartment("all");
                  setFilterStatus("all");
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Procedures */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white cursor-pointer hover:shadow-xl transition-all">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-white/80 mb-1">Total Procedures Assigned</p>
                <div className="text-4xl font-bold mb-2">{dashboardData.totalProcedures}</div>
                <div className="flex items-center gap-1 text-sm text-white/90">
                  <ArrowUpRight className="h-4 w-4" />
                  <span>4 new this week</span>
                </div>
              </div>
              <div className="p-3 bg-white/20 rounded-lg">
                <ClipboardList className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* In Progress */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white cursor-pointer hover:shadow-xl transition-all">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-white/80 mb-1">In Progress</p>
                <div className="text-4xl font-bold mb-2">{dashboardData.inProgressProcedures}</div>
                <div className="flex items-center gap-1 text-sm text-white/90">
                  <TrendingUp className="h-4 w-4" />
                  <span>{progressRate}% of total</span>
                </div>
              </div>
              <div className="p-3 bg-white/20 rounded-lg">
                <Clock className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Completed */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white cursor-pointer hover:shadow-xl transition-all">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-white/80 mb-1">Completed Procedures</p>
                <div className="text-4xl font-bold mb-2">{dashboardData.completedProcedures}</div>
                <div className="flex items-center gap-1 text-sm text-white/90">
                  <ArrowUpRight className="h-4 w-4" />
                  <span>{completionRate}% completion</span>
                </div>
              </div>
              <div className="p-3 bg-white/20 rounded-lg">
                <CheckCircle2 className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-red-500 text-white cursor-pointer hover:shadow-xl transition-all">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-white/80 mb-1">Pending Tasks</p>
                <div className="text-4xl font-bold mb-2">{dashboardData.pendingTasks}</div>
                <div className="flex items-center gap-1 text-sm text-white/90">
                  <ArrowDownRight className="h-4 w-4" />
                  <span>3 due today</span>
                </div>
              </div>
              <div className="p-3 bg-white/20 rounded-lg">
                <Activity className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="shadow-lg border-2">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-purple-600" />
                Recent Activities
              </CardTitle>
              <CardDescription>Latest updates and changes across all procedures and policies</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-4 rounded-lg border hover:bg-gray-50 transition-colors"
              >
                <div className="p-2 bg-gray-100 rounded-lg">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.action}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-muted-foreground">by {activity.user}</span>
                        <Badge className={getActivityBadgeColor(activity.type) + " text-xs"}>
                          {activity.type}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground whitespace-nowrap">
                      <Calendar className="h-3 w-3" />
                      {activity.timestamp}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-2 hover:shadow-lg transition-all cursor-pointer" onClick={() => onNavigate?.("resources")}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Resources Tracking</h3>
                <p className="text-sm text-muted-foreground">Manage team assignments</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-lg transition-all cursor-pointer" onClick={() => onNavigate?.("policies")}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                <ClipboardList className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Policy Implementation</h3>
                <p className="text-sm text-muted-foreground">Track policy execution</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-lg transition-all cursor-pointer">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">View Reports</h3>
                <p className="text-sm text-muted-foreground">Generate progress reports</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
