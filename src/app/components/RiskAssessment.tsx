import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { AlertTriangle, Plus, TrendingDown, TrendingUp } from "lucide-react";

interface Risk {
  id: string;
  title: string;
  description: string;
  category: string;
  likelihood: 'Very Low' | 'Low' | 'Medium' | 'High' | 'Very High';
  impact: 'Very Low' | 'Low' | 'Medium' | 'High' | 'Very High';
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Mitigated' | 'Accepted';
  owner: string;
  identifiedDate: string;
  targetDate: string;
  mitigationPlan: string;
  frameworks: string[];
}

const initialRisks: Risk[] = [
  {
    id: '1',
    title: 'Inadequate Access Controls',
    description: 'Current access control mechanisms do not fully meet SOC 2 requirements for segregation of duties',
    category: 'Access Management',
    likelihood: 'High',
    impact: 'High',
    severity: 'Critical',
    status: 'In Progress',
    owner: 'Michael Chen',
    identifiedDate: '2026-01-08',
    targetDate: '2026-02-15',
    mitigationPlan: 'Implement role-based access control (RBAC) system with proper segregation of duties',
    frameworks: ['SOC 2', 'ISO 27001']
  },
  {
    id: '2',
    title: 'Data Encryption at Rest Gaps',
    description: 'Some database instances lack encryption at rest as required by PCI DSS',
    category: 'Data Security',
    likelihood: 'Medium',
    impact: 'Very High',
    severity: 'Critical',
    status: 'Open',
    owner: 'Lisa Anderson',
    identifiedDate: '2026-01-10',
    targetDate: '2026-01-25',
    mitigationPlan: 'Enable encryption at rest for all database instances and implement key management',
    frameworks: ['PCI DSS', 'GDPR']
  },
  {
    id: '3',
    title: 'Incomplete Audit Logging',
    description: 'Audit logs do not capture all required events as per HIPAA requirements',
    category: 'Monitoring & Logging',
    likelihood: 'Medium',
    impact: 'High',
    severity: 'High',
    status: 'In Progress',
    owner: 'Emma Davis',
    identifiedDate: '2026-01-05',
    targetDate: '2026-02-01',
    mitigationPlan: 'Enhance logging mechanisms to capture all security-relevant events',
    frameworks: ['HIPAA', 'SOC 2']
  },
  {
    id: '4',
    title: 'Third-Party Vendor Assessment',
    description: 'Not all third-party vendors have completed security assessments',
    category: 'Vendor Management',
    likelihood: 'Medium',
    impact: 'Medium',
    severity: 'Medium',
    status: 'Open',
    owner: 'David Wilson',
    identifiedDate: '2026-01-12',
    targetDate: '2026-03-01',
    mitigationPlan: 'Conduct security assessments for all critical third-party vendors',
    frameworks: ['SOC 2', 'ISO 27001']
  },
  {
    id: '5',
    title: 'Outdated Security Training',
    description: 'Employee security awareness training content is over 12 months old',
    category: 'Training & Awareness',
    likelihood: 'Low',
    impact: 'Medium',
    severity: 'Medium',
    status: 'Mitigated',
    owner: 'Sarah Johnson',
    identifiedDate: '2025-12-15',
    targetDate: '2026-01-15',
    mitigationPlan: 'Update and deploy new security awareness training program',
    frameworks: ['GDPR', 'ISO 27001']
  },
  {
    id: '6',
    title: 'Incident Response Plan Not Tested',
    description: 'Incident response plan has not been tested in the past 12 months',
    category: 'Incident Management',
    likelihood: 'Low',
    impact: 'High',
    severity: 'Medium',
    status: 'Open',
    owner: 'Michael Chen',
    identifiedDate: '2026-01-14',
    targetDate: '2026-02-28',
    mitigationPlan: 'Schedule and conduct tabletop exercise for incident response',
    frameworks: ['SOC 2', 'HIPAA', 'ISO 27001']
  }
];

export function RiskAssessment() {
  const [risks, setRisks] = useState<Risk[]>(initialRisks);
  const [open, setOpen] = useState(false);
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'High':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Medium':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Low':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return '';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'In Progress':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Mitigated':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Accepted':
        return 'bg-gray-50 text-gray-700 border-gray-200';
      default:
        return '';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'Critical':
      case 'High':
        return <TrendingUp className="h-4 w-4" />;
      case 'Medium':
      case 'Low':
        return <TrendingDown className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const filteredRisks = risks.filter((risk) => {
    const matchesSeverity = filterSeverity === 'all' || risk.severity === filterSeverity;
    const matchesStatus = filterStatus === 'all' || risk.status === filterStatus;
    return matchesSeverity && matchesStatus;
  });

  const riskStats = {
    total: risks.length,
    critical: risks.filter(r => r.severity === 'Critical').length,
    high: risks.filter(r => r.severity === 'High').length,
    open: risks.filter(r => r.status === 'Open').length,
    mitigated: risks.filter(r => r.status === 'Mitigated').length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Risk Assessment</h2>
          <p className="text-muted-foreground">
            Identify, assess, and manage compliance risks
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Risk
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Risk</DialogTitle>
              <DialogDescription>
                Document a new compliance risk
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Risk Title</Label>
                <Input id="title" placeholder="Brief description of the risk" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Detailed risk description" rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="access">Access Management</SelectItem>
                      <SelectItem value="data">Data Security</SelectItem>
                      <SelectItem value="monitoring">Monitoring & Logging</SelectItem>
                      <SelectItem value="vendor">Vendor Management</SelectItem>
                      <SelectItem value="training">Training & Awareness</SelectItem>
                      <SelectItem value="incident">Incident Management</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="owner">Risk Owner</Label>
                  <Input id="owner" placeholder="Responsible person" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="likelihood">Likelihood</Label>
                  <Select>
                    <SelectTrigger id="likelihood">
                      <SelectValue placeholder="Select likelihood" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="verylow">Very Low</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="veryhigh">Very High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="impact">Impact</Label>
                  <Select>
                    <SelectTrigger id="impact">
                      <SelectValue placeholder="Select impact" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="verylow">Very Low</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="veryhigh">Very High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="mitigation">Mitigation Plan</Label>
                <Textarea id="mitigation" placeholder="Describe the mitigation strategy" rows={3} />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Add Risk</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Risk Statistics */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Risks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{riskStats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Critical</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{riskStats.critical}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">High</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{riskStats.high}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Open</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{riskStats.open}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Mitigated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{riskStats.mitigated}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <Select value={filterSeverity} onValueChange={setFilterSeverity}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Severities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severities</SelectItem>
            <SelectItem value="Critical">Critical</SelectItem>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Open">Open</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Mitigated">Mitigated</SelectItem>
            <SelectItem value="Accepted">Accepted</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Risks List */}
      <div className="grid gap-4">
        {filteredRisks.map((risk) => (
          <Card key={risk.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`p-3 rounded-lg ${risk.severity === 'Critical' || risk.severity === 'High' ? 'bg-red-100' : 'bg-yellow-100'}`}>
                    <AlertTriangle className={`h-6 w-6 ${risk.severity === 'Critical' || risk.severity === 'High' ? 'text-red-600' : 'text-yellow-600'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle>{risk.title}</CardTitle>
                      <Badge variant="outline" className={getSeverityColor(risk.severity)}>
                        {getSeverityIcon(risk.severity)}
                        <span className="ml-1">{risk.severity}</span>
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(risk.status)}>
                        {risk.status}
                      </Badge>
                    </div>
                    <CardDescription>{risk.description}</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Category</p>
                    <p className="font-medium">{risk.category}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Owner</p>
                    <p className="font-medium">{risk.owner}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Likelihood</p>
                    <p className="font-medium">{risk.likelihood}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Impact</p>
                    <p className="font-medium">{risk.impact}</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">Mitigation Plan</p>
                  <p className="text-sm">{risk.mitigationPlan}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex gap-2">
                    {risk.frameworks.map((framework) => (
                      <Badge key={framework} variant="secondary">{framework}</Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 text-sm text-muted-foreground">
                    <span>Target: {new Date(risk.targetDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Update Status</Button>
                  <Button variant="outline" size="sm">Add Mitigation</Button>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
