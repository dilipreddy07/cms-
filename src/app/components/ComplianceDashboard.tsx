import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { AlertCircle, CheckCircle, Clock, FileText, AlertTriangle, TrendingUp } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";

const complianceData = [
  { name: 'GDPR', compliant: 85, nonCompliant: 15 },
  { name: 'SOC 2', compliant: 92, nonCompliant: 8 },
  { name: 'HIPAA', compliant: 78, nonCompliant: 22 },
  { name: 'ISO 27001', compliant: 88, nonCompliant: 12 },
  { name: 'PCI DSS', compliant: 95, nonCompliant: 5 },
];

const riskDistribution = [
  { name: 'Critical', value: 3, color: '#ef4444' },
  { name: 'High', value: 8, color: '#f97316' },
  { name: 'Medium', value: 15, color: '#eab308' },
  { name: 'Low', value: 24, color: '#22c55e' },
];

const trendData = [
  { month: 'Jan', compliance: 75 },
  { month: 'Feb', compliance: 78 },
  { month: 'Mar', compliance: 82 },
  { month: 'Apr', compliance: 84 },
  { month: 'May', compliance: 86 },
  { month: 'Jun', compliance: 88 },
];

export function ComplianceDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Compliance Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your organization's compliance status
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Compliance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">88%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Frameworks</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              GDPR, SOC 2, HIPAA, ISO 27001, PCI DSS
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tasks</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">5 overdue</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Risks</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Require immediate attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Compliance by Framework</CardTitle>
            <CardDescription>Current compliance status across frameworks</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={complianceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="compliant" fill="#22c55e" name="Compliant %" />
                <Bar dataKey="nonCompliant" fill="#ef4444" name="Non-Compliant %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Distribution</CardTitle>
            <CardDescription>Breakdown of identified risks by severity</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`risk-dist-cell-${entry.name}-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Compliance Trend</CardTitle>
          <CardDescription>6-month compliance score trend</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="compliance" stroke="#3b82f6" strokeWidth={2} name="Compliance Score %" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Latest compliance-related activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">GDPR Data Processing Audit Completed</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>
            </div>
            <div className="flex items-start gap-4">
              <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">SOC 2 Control Review Scheduled</p>
                <p className="text-xs text-muted-foreground">5 hours ago</p>
              </div>
              <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">In Progress</Badge>
            </div>
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">Critical Risk Identified in Access Controls</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Critical</Badge>
            </div>
            <div className="flex items-start gap-4">
              <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">HIPAA Security Policy Updated</p>
                <p className="text-xs text-muted-foreground">2 days ago</p>
              </div>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Updated</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}