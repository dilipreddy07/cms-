import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { FileText, Upload, Download, Eye, Folder, Search, Filter } from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  framework: string;
  category: string;
  version: string;
  uploadedBy: string;
  uploadedDate: string;
  size: string;
  status: 'Current' | 'Under Review' | 'Archived';
}

const initialDocuments: Document[] = [
  {
    id: '1',
    name: 'Information Security Policy',
    type: 'PDF',
    framework: 'ISO 27001',
    category: 'Policy',
    version: '2.1',
    uploadedBy: 'David Wilson',
    uploadedDate: '2026-01-10',
    size: '2.4 MB',
    status: 'Current'
  },
  {
    id: '2',
    name: 'GDPR Data Processing Agreement',
    type: 'DOCX',
    framework: 'GDPR',
    category: 'Agreement',
    version: '1.0',
    uploadedBy: 'Sarah Johnson',
    uploadedDate: '2026-01-08',
    size: '156 KB',
    status: 'Current'
  },
  {
    id: '3',
    name: 'SOC 2 Control Matrix',
    type: 'XLSX',
    framework: 'SOC 2',
    category: 'Assessment',
    version: '3.2',
    uploadedBy: 'Michael Chen',
    uploadedDate: '2026-01-15',
    size: '1.8 MB',
    status: 'Current'
  },
  {
    id: '4',
    name: 'HIPAA Security Risk Assessment',
    type: 'PDF',
    framework: 'HIPAA',
    category: 'Assessment',
    version: '1.5',
    uploadedBy: 'Emma Davis',
    uploadedDate: '2026-01-05',
    size: '3.2 MB',
    status: 'Current'
  },
  {
    id: '5',
    name: 'Access Control Procedures',
    type: 'PDF',
    framework: 'SOC 2',
    category: 'Procedure',
    version: '1.8',
    uploadedBy: 'Michael Chen',
    uploadedDate: '2026-01-12',
    size: '892 KB',
    status: 'Current'
  },
  {
    id: '6',
    name: 'PCI DSS Compliance Report',
    type: 'PDF',
    framework: 'PCI DSS',
    category: 'Report',
    version: '2024-Q4',
    uploadedBy: 'Lisa Anderson',
    uploadedDate: '2026-01-14',
    size: '4.1 MB',
    status: 'Current'
  },
  {
    id: '7',
    name: 'Incident Response Plan',
    type: 'DOCX',
    framework: 'ISO 27001',
    category: 'Procedure',
    version: '2.0',
    uploadedBy: 'David Wilson',
    uploadedDate: '2025-12-20',
    size: '645 KB',
    status: 'Under Review'
  },
  {
    id: '8',
    name: 'Data Retention Schedule',
    type: 'XLSX',
    framework: 'GDPR',
    category: 'Policy',
    version: '1.3',
    uploadedBy: 'Sarah Johnson',
    uploadedDate: '2026-01-03',
    size: '234 KB',
    status: 'Current'
  },
  {
    id: '9',
    name: 'Business Continuity Plan',
    type: 'PDF',
    framework: 'ISO 27001',
    category: 'Procedure',
    version: '3.0',
    uploadedBy: 'David Wilson',
    uploadedDate: '2025-11-15',
    size: '1.5 MB',
    status: 'Archived'
  },
  {
    id: '10',
    name: 'Employee Security Training Materials',
    type: 'PDF',
    framework: 'Multiple',
    category: 'Training',
    version: '2.0',
    uploadedBy: 'Sarah Johnson',
    uploadedDate: '2026-01-11',
    size: '5.6 MB',
    status: 'Current'
  }
];

export function DocumentsRepository() {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFramework, setFilterFramework] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Current':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Under Review':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Archived':
        return 'bg-gray-50 text-gray-700 border-gray-200';
      default:
        return '';
    }
  };

  const getTypeIcon = (type: string) => {
    return <FileText className="h-4 w-4 text-muted-foreground" />;
  };

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFramework = filterFramework === 'all' || doc.framework === filterFramework;
    const matchesCategory = filterCategory === 'all' || doc.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus;
    return matchesSearch && matchesFramework && matchesCategory && matchesStatus;
  });

  const categoryStats = {
    policy: documents.filter(d => d.category === 'Policy').length,
    procedure: documents.filter(d => d.category === 'Procedure').length,
    assessment: documents.filter(d => d.category === 'Assessment').length,
    report: documents.filter(d => d.category === 'Report').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Document Repository</h2>
          <p className="text-muted-foreground">
            Manage compliance policies, procedures, and evidence
          </p>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </div>

      {/* Category Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Policies</CardTitle>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categoryStats.policy}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Procedures</CardTitle>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categoryStats.procedure}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assessments</CardTitle>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categoryStats.assessment}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reports</CardTitle>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categoryStats.report}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
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
                  <SelectItem value="Multiple">Multiple</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Policy">Policy</SelectItem>
                  <SelectItem value="Procedure">Procedure</SelectItem>
                  <SelectItem value="Assessment">Assessment</SelectItem>
                  <SelectItem value="Report">Report</SelectItem>
                  <SelectItem value="Agreement">Agreement</SelectItem>
                  <SelectItem value="Training">Training</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Current">Current</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                  <SelectItem value="Archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Framework</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Uploaded By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
                <TableRow key={doc.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(doc.type)}
                      <span className="font-medium">{doc.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{doc.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{doc.framework}</Badge>
                  </TableCell>
                  <TableCell>{doc.category}</TableCell>
                  <TableCell className="font-mono text-sm">{doc.version}</TableCell>
                  <TableCell>{doc.uploadedBy}</TableCell>
                  <TableCell>{new Date(doc.uploadedDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-muted-foreground">{doc.size}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(doc.status)}>
                      {doc.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
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
