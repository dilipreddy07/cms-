import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { Search, Filter, FileText, User, Shield, AlertCircle, CheckCircle, Eye } from "lucide-react";

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  framework?: string;
  status: 'Success' | 'Failed' | 'Warning';
  ipAddress: string;
  details: string;
}

const initialLogs: AuditLog[] = [
  {
    id: '1',
    timestamp: '2026-01-16 14:32:15',
    user: 'Sarah Johnson',
    action: 'Updated Document',
    resource: 'GDPR Data Processing Agreement',
    framework: 'GDPR',
    status: 'Success',
    ipAddress: '192.168.1.45',
    details: 'Updated version from 1.0 to 1.1'
  },
  {
    id: '2',
    timestamp: '2026-01-16 13:18:42',
    user: 'Michael Chen',
    action: 'Completed Task',
    resource: 'Implement Multi-Factor Authentication',
    framework: 'SOC 2',
    status: 'Success',
    ipAddress: '192.168.1.52',
    details: 'Task marked as completed'
  },
  {
    id: '3',
    timestamp: '2026-01-16 12:05:33',
    user: 'Emma Davis',
    action: 'Risk Assessment Updated',
    resource: 'Incomplete Audit Logging',
    framework: 'HIPAA',
    status: 'Success',
    ipAddress: '192.168.1.78',
    details: 'Changed status from Open to In Progress'
  },
  {
    id: '4',
    timestamp: '2026-01-16 11:42:21',
    user: 'David Wilson',
    action: 'Framework Review',
    resource: 'ISO 27001 Compliance Framework',
    framework: 'ISO 27001',
    status: 'Success',
    ipAddress: '192.168.1.33',
    details: 'Quarterly review completed'
  },
  {
    id: '5',
    timestamp: '2026-01-16 10:27:18',
    user: 'Lisa Anderson',
    action: 'Failed Login Attempt',
    resource: 'System Access',
    status: 'Failed',
    ipAddress: '203.45.67.89',
    details: 'Invalid credentials - 3 attempts'
  },
  {
    id: '6',
    timestamp: '2026-01-16 09:54:12',
    user: 'Sarah Johnson',
    action: 'Uploaded Document',
    resource: 'Security Policy Update',
    framework: 'Multiple',
    status: 'Success',
    ipAddress: '192.168.1.45',
    details: 'New security policy document added'
  },
  {
    id: '7',
    timestamp: '2026-01-16 09:31:05',
    user: 'Michael Chen',
    action: 'Requirement Status Changed',
    resource: 'SOC 2 - CC7.2 System Monitoring',
    framework: 'SOC 2',
    status: 'Warning',
    ipAddress: '192.168.1.52',
    details: 'Changed from Compliant to Non-Compliant'
  },
  {
    id: '8',
    timestamp: '2026-01-15 16:45:38',
    user: 'Emma Davis',
    action: 'User Access Review',
    resource: 'Quarterly Access Rights Audit',
    framework: 'HIPAA',
    status: 'Success',
    ipAddress: '192.168.1.78',
    details: 'Access review initiated for 47 users'
  },
  {
    id: '9',
    timestamp: '2026-01-15 15:22:19',
    user: 'David Wilson',
    action: 'Evidence Attached',
    resource: 'PCI DSS Requirement 3.4',
    framework: 'PCI DSS',
    status: 'Success',
    ipAddress: '192.168.1.33',
    details: 'Attached encryption configuration document'
  },
  {
    id: '10',
    timestamp: '2026-01-15 14:10:47',
    user: 'Lisa Anderson',
    action: 'Framework Added',
    resource: 'PCI DSS v4.0',
    framework: 'PCI DSS',
    status: 'Success',
    ipAddress: '192.168.1.67',
    details: 'New compliance framework initialized'
  }
];

export function AuditLogs() {
  const [logs, setLogs] = useState<AuditLog[]>(initialLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterAction, setFilterAction] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Failed':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Warning':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default:
        return '';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Failed':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'Warning':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.resource.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || log.status === filterStatus;
    const matchesAction = filterAction === 'all' || log.action === filterAction;
    return matchesSearch && matchesStatus && matchesAction;
  });

  const logStats = {
    total: logs.length,
    success: logs.filter(l => l.status === 'Success').length,
    failed: logs.filter(l => l.status === 'Failed').length,
    warning: logs.filter(l => l.status === 'Warning').length
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Audit Logs</h2>
        <p className="text-muted-foreground">
          Track all compliance-related activities and changes
        </p>
      </div>

      {/* Log Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{logStats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Successful</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{logStats.success}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Failed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{logStats.failed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Warnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{logStats.warning}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Success">Success</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
                  <SelectItem value="Warning">Warning</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterAction} onValueChange={setFilterAction}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All Actions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="Updated Document">Updated Document</SelectItem>
                  <SelectItem value="Completed Task">Completed Task</SelectItem>
                  <SelectItem value="Risk Assessment Updated">Risk Assessment</SelectItem>
                  <SelectItem value="Framework Review">Framework Review</SelectItem>
                  <SelectItem value="Uploaded Document">Uploaded Document</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Framework</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{log.user}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{log.action}</TableCell>
                  <TableCell className="max-w-xs truncate">{log.resource}</TableCell>
                  <TableCell>
                    {log.framework && (
                      <Badge variant="outline">{log.framework}</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(log.status)}
                      <Badge variant="outline" className={getStatusColor(log.status)}>
                        {log.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{log.ipAddress}</TableCell>
                  <TableCell className="max-w-xs truncate text-sm text-muted-foreground">{log.details}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
