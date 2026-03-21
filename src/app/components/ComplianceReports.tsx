import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { FileText, Download, Calendar, TrendingUp } from "lucide-react";
import { useState } from "react";

const frameworkComplianceData = [
  { framework: 'GDPR', score: 85, requirements: 68, completed: 58 },
  { framework: 'SOC 2', score: 92, requirements: 52, completed: 48 },
  { framework: 'HIPAA', score: 78, requirements: 45, completed: 35 },
  { framework: 'ISO 27001', score: 88, requirements: 114, completed: 100 },
  { framework: 'PCI DSS', score: 95, requirements: 78, completed: 74 },
];

const radarData = [
  { category: 'Access Control', score: 90 },
  { category: 'Data Security', score: 85 },
  { category: 'Risk Management', score: 78 },
  { category: 'Incident Response', score: 82 },
  { category: 'Training & Awareness', score: 88 },
  { category: 'Vendor Management', score: 75 },
];

const complianceHistory = [
  { month: 'Jul', score: 75 },
  { month: 'Aug', score: 78 },
  { month: 'Sep', score: 80 },
  { month: 'Oct', score: 82 },
  { month: 'Nov', score: 85 },
  { month: 'Dec', score: 87 },
  { month: 'Jan', score: 88 },
];

interface Report {
  id: string;
  name: string;
  framework: string;
  type: string;
  generatedDate: string;
  period: string;
  status: 'Final' | 'Draft' | 'In Review';
  score: number;
}

const recentReports: Report[] = [
  {
    id: '1',
    name: 'Q4 2025 SOC 2 Compliance Report',
    framework: 'SOC 2',
    type: 'Quarterly',
    generatedDate: '2026-01-15',
    period: 'Q4 2025',
    status: 'Final',
    score: 92
  },
  {
    id: '2',
    name: 'January 2026 GDPR Compliance Status',
    framework: 'GDPR',
    type: 'Monthly',
    generatedDate: '2026-01-10',
    period: 'Jan 2026',
    status: 'Final',
    score: 85
  },
  {
    id: '3',
    name: 'Annual ISO 27001 Assessment',
    framework: 'ISO 27001',
    type: 'Annual',
    generatedDate: '2026-01-08',
    period: '2025',
    status: 'Draft',
    score: 88
  },
  {
    id: '4',
    name: 'Q4 2025 HIPAA Security Assessment',
    framework: 'HIPAA',
    type: 'Quarterly',
    generatedDate: '2026-01-05',
    period: 'Q4 2025',
    status: 'In Review',
    score: 78
  },
  {
    id: '5',
    name: 'PCI DSS Annual Compliance Report',
    framework: 'PCI DSS',
    type: 'Annual',
    generatedDate: '2026-01-12',
    period: '2025',
    status: 'Final',
    score: 95
  }
];

export function ComplianceReports() {
  const [selectedFramework, setSelectedFramework] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Final':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Draft':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'In Review':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      default:
        return '';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const filteredReports = selectedFramework === 'all' 
    ? recentReports 
    : recentReports.filter(r => r.framework === selectedFramework);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Compliance Reports</h2>
          <p className="text-muted-foreground">
            Generate and view compliance reports and analytics
          </p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Generate New Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Compliance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">88%</div>
            <p className="text-xs text-muted-foreground">
              Across all frameworks
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentReports.length}</div>
            <p className="text-xs text-muted-foreground">
              Generated this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Highest Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">95%</div>
            <p className="text-xs text-muted-foreground">
              PCI DSS compliance
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Review</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Feb 15</div>
            <p className="text-xs text-muted-foreground">
              SOC 2 quarterly review
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Framework Compliance Scores</CardTitle>
            <CardDescription>Current compliance percentage by framework</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={frameworkComplianceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="framework" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#3b82f6" name="Compliance Score %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Control Category Assessment</CardTitle>
            <CardDescription>Compliance scores across control categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="category" />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar name="Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Compliance Trend (7 Months)</CardTitle>
          <CardDescription>Overall compliance score over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={complianceHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="score" fill="#22c55e" name="Compliance Score %" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>Generated compliance reports</CardDescription>
            </div>
            <Select value={selectedFramework} onValueChange={setSelectedFramework}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Frameworks" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Frameworks</SelectItem>
                <SelectItem value="GDPR">GDPR</SelectItem>
                <SelectItem value="SOC 2">SOC 2</SelectItem>
                <SelectItem value="HIPAA">HIPAA</SelectItem>
                <SelectItem value="ISO 27001">ISO 27001</SelectItem>
                <SelectItem value="PCI DSS">PCI DSS</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{report.name}</h4>
                      <Badge variant="outline" className={getStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Badge variant="secondary">{report.framework}</Badge>
                      </span>
                      <span>{report.type}</span>
                      <span>Period: {report.period}</span>
                      <span>Generated: {new Date(report.generatedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getScoreColor(report.score)}`}>
                      {report.score}%
                    </div>
                    <p className="text-xs text-muted-foreground">Score</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Metrics */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Framework Compliance Details</CardTitle>
            <CardDescription>Detailed compliance metrics by framework</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {frameworkComplianceData.map((framework) => (
                <div key={framework.framework} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{framework.framework}</p>
                      <p className="text-sm text-muted-foreground">
                        {framework.completed} / {framework.requirements} requirements
                      </p>
                    </div>
                    <div className={`text-xl font-bold ${getScoreColor(framework.score)}`}>
                      {framework.score}%
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${framework.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Control Category Scores</CardTitle>
            <CardDescription>Performance across different control areas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {radarData.map((category) => (
                <div key={category.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{category.category}</p>
                    <div className={`text-xl font-bold ${getScoreColor(category.score)}`}>
                      {category.score}%
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${category.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
