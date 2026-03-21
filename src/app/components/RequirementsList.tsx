import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { CheckCircle, XCircle, Clock, Plus, Search, Filter } from "lucide-react";

interface Requirement {
  id: string;
  framework: string;
  requirementId: string;
  title: string;
  description: string;
  status: 'Compliant' | 'Non-Compliant' | 'In Progress' | 'Not Started';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  owner: string;
  dueDate: string;
  evidence: string[];
}

const initialRequirements: Requirement[] = [
  {
    id: '1',
    framework: 'GDPR',
    requirementId: 'Art. 32',
    title: 'Security of Processing',
    description: 'Implement appropriate technical and organizational measures to ensure security',
    status: 'Compliant',
    priority: 'Critical',
    owner: 'Sarah Johnson',
    dueDate: '2026-02-15',
    evidence: ['Security Policy v2.1', 'Encryption Standards']
  },
  {
    id: '2',
    framework: 'SOC 2',
    requirementId: 'CC6.1',
    title: 'Logical and Physical Access Controls',
    description: 'The entity implements logical access security software, infrastructure, and architectures',
    status: 'Compliant',
    priority: 'Critical',
    owner: 'Michael Chen',
    dueDate: '2026-03-01',
    evidence: ['Access Control Matrix', 'IAM Documentation']
  },
  {
    id: '3',
    framework: 'HIPAA',
    requirementId: '164.308(a)(1)(ii)(B)',
    title: 'Risk Management',
    description: 'Implement security measures to reduce risks and vulnerabilities',
    status: 'In Progress',
    priority: 'High',
    owner: 'Emma Davis',
    dueDate: '2026-01-25',
    evidence: ['Risk Assessment Report']
  },
  {
    id: '4',
    framework: 'ISO 27001',
    requirementId: 'A.9.2',
    title: 'User Access Management',
    description: 'Ensure authorized user access and prevent unauthorized access',
    status: 'Compliant',
    priority: 'High',
    owner: 'David Wilson',
    dueDate: '2026-02-20',
    evidence: ['User Access Policy', 'Access Review Logs']
  },
  {
    id: '5',
    framework: 'PCI DSS',
    requirementId: '3.4',
    title: 'Render PAN Unreadable',
    description: 'Render Primary Account Number unreadable anywhere it is stored',
    status: 'Compliant',
    priority: 'Critical',
    owner: 'Lisa Anderson',
    dueDate: '2026-02-10',
    evidence: ['Encryption Configuration', 'Tokenization System']
  },
  {
    id: '6',
    framework: 'GDPR',
    requirementId: 'Art. 17',
    title: 'Right to Erasure',
    description: 'Provide data subjects the right to have personal data erased',
    status: 'In Progress',
    priority: 'High',
    owner: 'Sarah Johnson',
    dueDate: '2026-01-30',
    evidence: ['Data Deletion Workflow']
  },
  {
    id: '7',
    framework: 'SOC 2',
    requirementId: 'CC7.2',
    title: 'System Monitoring',
    description: 'The entity monitors system components',
    status: 'Non-Compliant',
    priority: 'Critical',
    owner: 'Michael Chen',
    dueDate: '2026-01-20',
    evidence: []
  },
  {
    id: '8',
    framework: 'HIPAA',
    requirementId: '164.312(a)(2)(i)',
    title: 'Unique User Identification',
    description: 'Assign a unique name and/or number for identifying and tracking user identity',
    status: 'Compliant',
    priority: 'Medium',
    owner: 'Emma Davis',
    dueDate: '2026-03-15',
    evidence: ['User Directory', 'Authentication Logs']
  }
];

export function RequirementsList() {
  const [requirements, setRequirements] = useState<Requirement[]>(initialRequirements);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFramework, setFilterFramework] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [open, setOpen] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Compliant':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Non-Compliant':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'In Progress':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'Not Started':
        return <Clock className="h-4 w-4 text-gray-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Compliant':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Non-Compliant':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'In Progress':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Not Started':
        return 'bg-gray-50 text-gray-700 border-gray-200';
      default:
        return '';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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

  const filteredRequirements = requirements.filter((req) => {
    const matchesSearch = req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         req.requirementId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFramework = filterFramework === 'all' || req.framework === filterFramework;
    const matchesStatus = filterStatus === 'all' || req.status === filterStatus;
    return matchesSearch && matchesFramework && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Compliance Requirements</h2>
          <p className="text-muted-foreground">
            Track and manage compliance requirements across frameworks
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Requirement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Requirement</DialogTitle>
              <DialogDescription>
                Add a new compliance requirement to track
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="framework">Framework</Label>
                  <Select>
                    <SelectTrigger id="framework">
                      <SelectValue placeholder="Select framework" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gdpr">GDPR</SelectItem>
                      <SelectItem value="soc2">SOC 2</SelectItem>
                      <SelectItem value="hipaa">HIPAA</SelectItem>
                      <SelectItem value="iso27001">ISO 27001</SelectItem>
                      <SelectItem value="pcidss">PCI DSS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="reqId">Requirement ID</Label>
                  <Input id="reqId" placeholder="e.g., Art. 32" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Requirement title" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Detailed description" rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="owner">Owner</Label>
                  <Input id="owner" placeholder="Responsible person" />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Add Requirement</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search requirements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterFramework} onValueChange={setFilterFramework}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
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
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Compliant">Compliant</SelectItem>
                  <SelectItem value="Non-Compliant">Non-Compliant</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Not Started">Not Started</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Framework</TableHead>
                <TableHead>Requirement ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Evidence</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequirements.map((req) => (
                <TableRow key={req.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell>
                    <Badge variant="outline">{req.framework}</Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{req.requirementId}</TableCell>
                  <TableCell className="max-w-xs">
                    <div className="font-medium">{req.title}</div>
                    <div className="text-sm text-muted-foreground truncate">{req.description}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(req.status)}
                      <Badge variant="outline" className={getStatusColor(req.status)}>
                        {req.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getPriorityColor(req.priority)}>
                      {req.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{req.owner}</TableCell>
                  <TableCell>{new Date(req.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{req.evidence.length} files</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
