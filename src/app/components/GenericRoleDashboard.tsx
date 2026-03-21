import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";
import { 
  FileText, 
  ListChecks,
  Users,
  BarChart3,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  Settings
} from "lucide-react";
import { getRoleDisplayName } from "@/app/config/rolesConfig";

interface GenericRoleDashboardProps {
  department: string;
  process: string;
  roleId: string;
  onLogout?: () => void;
}

export function GenericRoleDashboard({ department, process, roleId, onLogout }: GenericRoleDashboardProps) {
  const roleName = getRoleDisplayName(roleId);
  
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      window.location.href = '/';
    }
  };
  
  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{roleName} Dashboard</h2>
            <p className="text-purple-100 mt-1">
              {department} Department - {process.charAt(0).toUpperCase() + process.slice(1)} Phase
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="px-4 py-2 bg-white text-purple-600 hover:bg-purple-50">
              {roleName}
            </Badge>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-400 to-blue-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-blue-50">Assigned Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">12</div>
              <div className="p-3 bg-white/20 backdrop-blur rounded-lg">
                <ListChecks className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <Clock className="h-3 w-3" />
              <p className="text-xs font-medium">3 pending completion</p>
            </div>
            <Progress value={75} className="h-1 mt-2 bg-white/30" />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-400 to-purple-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-purple-50">Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">28</div>
              <div className="p-3 bg-white/20 backdrop-blur rounded-lg">
                <FileText className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-3 w-3" />
              <p className="text-xs font-medium">5 new this week</p>
            </div>
            <Progress value={85} className="h-1 mt-2 bg-white/30" />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-400 to-emerald-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-emerald-50">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">45</div>
              <div className="p-3 bg-white/20 backdrop-blur rounded-lg">
                <CheckCircle className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <CheckCircle className="h-3 w-3" />
              <p className="text-xs font-medium">8 this month</p>
            </div>
            <Progress value={90} className="h-1 mt-2 bg-white/30" />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-400 to-amber-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-amber-50">Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">3</div>
              <div className="p-3 bg-white/20 backdrop-blur rounded-lg">
                <AlertCircle className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <AlertCircle className="h-3 w-3" />
              <p className="text-xs font-medium">Needs attention</p>
            </div>
            <Progress value={20} className="h-1 mt-2 bg-white/30" />
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-all">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <ListChecks className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-gray-900">My Tasks</CardTitle>
                <CardDescription>View and manage assigned tasks</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
              View Tasks
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-gray-900">Documents</CardTitle>
                <CardDescription>Access documents and files</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
              View Documents
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <CardTitle className="text-gray-900">Reports</CardTitle>
                <CardDescription>View analytics and reports</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700">
              View Reports
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-gray-900">Recent Activity</CardTitle>
          <CardDescription>Your latest actions and updates</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {[
              { action: "Completed task: Review compliance documents", time: "2 hours ago", color: "bg-green-500", icon: CheckCircle },
              { action: "Updated document: Security Policy v2.1", time: "5 hours ago", color: "bg-blue-500", icon: FileText },
              { action: "Commented on: Risk Assessment Report", time: "1 day ago", color: "bg-purple-500", icon: ListChecks },
              { action: "Assigned to: New compliance checklist", time: "2 days ago", color: "bg-amber-500", icon: AlertCircle }
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
                      <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Team Collaboration (for head roles) */}
      {roleId.includes('head') && (
        <Card>
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Overview
            </CardTitle>
            <CardDescription>Manage your team members and assignments</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Team Members</h4>
                <p className="text-3xl font-bold text-gray-900">8</p>
                <p className="text-sm text-gray-600 mt-1">Active team members</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Team Tasks</h4>
                <p className="text-3xl font-bold text-gray-900">42</p>
                <p className="text-sm text-gray-600 mt-1">Total assigned tasks</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}