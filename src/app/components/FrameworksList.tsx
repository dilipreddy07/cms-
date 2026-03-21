import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Shield, Plus, FileText, Calendar, Users } from "lucide-react";

interface Framework {
  id: string;
  name: string;
  description: string;
  category: string;
  compliance: number;
  totalRequirements: number;
  completedRequirements: number;
  status: 'Active' | 'In Progress' | 'Pending';
  owner: string;
  lastReviewed: string;
}

const initialFrameworks: Framework[] = [
  {
    id: '1',
    name: 'GDPR',
    description: 'General Data Protection Regulation - EU data privacy and protection',
    category: 'Data Privacy',
    compliance: 85,
    totalRequirements: 68,
    completedRequirements: 58,
    status: 'Active',
    owner: 'Sarah Johnson',
    lastReviewed: '2026-01-10'
  },
  {
    id: '2',
    name: 'SOC 2 Type II',
    description: 'Service Organization Control 2 - Trust service criteria',
    category: 'Security & Privacy',
    compliance: 92,
    totalRequirements: 52,
    completedRequirements: 48,
    status: 'Active',
    owner: 'Michael Chen',
    lastReviewed: '2026-01-08'
  },
  {
    id: '3',
    name: 'HIPAA',
    description: 'Health Insurance Portability and Accountability Act',
    category: 'Healthcare',
    compliance: 78,
    totalRequirements: 45,
    completedRequirements: 35,
    status: 'In Progress',
    owner: 'Emma Davis',
    lastReviewed: '2026-01-05'
  },
  {
    id: '4',
    name: 'ISO 27001',
    description: 'Information Security Management System standard',
    category: 'Security',
    compliance: 88,
    totalRequirements: 114,
    completedRequirements: 100,
    status: 'Active',
    owner: 'David Wilson',
    lastReviewed: '2026-01-12'
  },
  {
    id: '5',
    name: 'PCI DSS',
    description: 'Payment Card Industry Data Security Standard',
    category: 'Financial',
    compliance: 95,
    totalRequirements: 78,
    completedRequirements: 74,
    status: 'Active',
    owner: 'Lisa Anderson',
    lastReviewed: '2026-01-14'
  }
];

export function FrameworksList() {
  const [frameworks, setFrameworks] = useState<Framework[]>(initialFrameworks);
  const [open, setOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'In Progress':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Pending':
        return 'bg-gray-50 text-gray-700 border-gray-200';
      default:
        return '';
    }
  };

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 90) return 'text-green-600';
    if (compliance >= 75) return 'text-blue-600';
    if (compliance >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Compliance Frameworks</h2>
          <p className="text-muted-foreground">
            Manage and track compliance frameworks
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Framework
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Framework</DialogTitle>
              <DialogDescription>
                Add a new compliance framework to track
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Framework Name</Label>
                <Input id="name" placeholder="e.g., CCPA, NIST CSF" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="privacy">Data Privacy</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="financial">Financial</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Framework description" rows={3} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="owner">Framework Owner</Label>
                <Input id="owner" placeholder="Responsible person" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Add Framework</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {frameworks.map((framework) => (
          <Card key={framework.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle>{framework.name}</CardTitle>
                      <Badge variant="outline" className={getStatusColor(framework.status)}>
                        {framework.status}
                      </Badge>
                    </div>
                    <CardDescription>{framework.description}</CardDescription>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold ${getComplianceColor(framework.compliance)}`}>
                    {framework.compliance}%
                  </div>
                  <p className="text-xs text-muted-foreground">Compliance</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Requirements Progress</span>
                    <span className="font-medium">
                      {framework.completedRequirements} / {framework.totalRequirements}
                    </span>
                  </div>
                  <Progress value={(framework.completedRequirements / framework.totalRequirements) * 100} />
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-muted-foreground">Category</p>
                      <p className="font-medium">{framework.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-muted-foreground">Owner</p>
                      <p className="font-medium">{framework.owner}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-muted-foreground">Last Reviewed</p>
                      <p className="font-medium">{new Date(framework.lastReviewed).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm">View Details</Button>
                  <Button variant="outline" size="sm">View Requirements</Button>
                  <Button variant="outline" size="sm">Generate Report</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
