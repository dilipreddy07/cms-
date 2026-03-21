import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Badge } from "@/app/components/ui/badge";
import { ClipboardList, Plus, Search, Edit, Trash2, ArrowLeft, FileText, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";

interface ComplianceChecklist {
  id: string;
  name: string;
  standard: string;
  description: string;
  itemsCount: number;
  completedCount: number;
  category: string;
  status: "active" | "draft" | "archived";
  lastUpdated: string;
}

interface ComplianceChecklistPageProps {
  onBack: () => void;
}

export function ComplianceChecklistPage({ onBack }: ComplianceChecklistPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newChecklist, setNewChecklist] = useState({ 
    name: "", 
    standard: "",
    description: "",
    category: ""
  });

  const [checklists, setChecklists] = useState<ComplianceChecklist[]>([
    {
      id: "1",
      name: "ISO 9001 Quality Management",
      standard: "ISO 9001",
      description: "Quality management system requirements checklist",
      itemsCount: 85,
      completedCount: 72,
      category: "Quality Management",
      status: "active",
      lastUpdated: "2024-01-15"
    },
    {
      id: "2",
      name: "ISO 27001 Information Security",
      standard: "ISO 27001",
      description: "Information security controls checklist",
      itemsCount: 114,
      completedCount: 98,
      category: "Security",
      status: "active",
      lastUpdated: "2024-01-18"
    },
    {
      id: "3",
      name: "GDPR Data Protection",
      standard: "GDPR",
      description: "General data protection regulation compliance",
      itemsCount: 99,
      completedCount: 85,
      category: "Privacy",
      status: "active",
      lastUpdated: "2024-01-20"
    },
    {
      id: "4",
      name: "SOC 2 Type II Controls",
      standard: "SOC 2",
      description: "Service organization control 2 checklist",
      itemsCount: 64,
      completedCount: 52,
      category: "Security",
      status: "active",
      lastUpdated: "2024-01-22"
    },
    {
      id: "5",
      name: "HIPAA Security Rule",
      standard: "HIPAA",
      description: "Healthcare data security requirements",
      itemsCount: 78,
      completedCount: 65,
      category: "Healthcare",
      status: "active",
      lastUpdated: "2024-01-25"
    },
    {
      id: "6",
      name: "FDA 21 CFR Part 11",
      standard: "FDA 21 CFR",
      description: "Electronic records and signatures compliance",
      itemsCount: 45,
      completedCount: 38,
      category: "Life Science",
      status: "active",
      lastUpdated: "2024-02-01"
    },
    {
      id: "7",
      name: "ISO 13485 Medical Devices",
      standard: "ISO 13485",
      description: "Medical devices quality management",
      itemsCount: 92,
      completedCount: 76,
      category: "Medical",
      status: "active",
      lastUpdated: "2024-02-05"
    },
    {
      id: "8",
      name: "IATF 16949 Automotive QMS",
      standard: "IATF 16949",
      description: "Automotive quality management system",
      itemsCount: 105,
      completedCount: 88,
      category: "Automotive",
      status: "active",
      lastUpdated: "2024-02-08"
    },
    {
      id: "9",
      name: "ISO 22000 Food Safety",
      standard: "ISO 22000",
      description: "Food safety management system",
      itemsCount: 68,
      completedCount: 54,
      category: "Food Safety",
      status: "active",
      lastUpdated: "2024-02-10"
    },
    {
      id: "10",
      name: "ISO 14001 Environmental",
      standard: "ISO 14001",
      description: "Environmental management system",
      itemsCount: 74,
      completedCount: 62,
      category: "Environment",
      status: "active",
      lastUpdated: "2024-02-12"
    },
    {
      id: "11",
      name: "ISO 45001 OH&S",
      standard: "ISO 45001",
      description: "Occupational health and safety management",
      itemsCount: 82,
      completedCount: 69,
      category: "Safety",
      status: "active",
      lastUpdated: "2024-02-15"
    },
    {
      id: "12",
      name: "GMP Compliance Checklist",
      standard: "GMP",
      description: "Good manufacturing practice requirements",
      itemsCount: 96,
      completedCount: 80,
      category: "Manufacturing",
      status: "active",
      lastUpdated: "2024-02-18"
    },
    {
      id: "13",
      name: "Internal Audit Checklist",
      standard: "General",
      description: "General internal audit procedures",
      itemsCount: 42,
      completedCount: 0,
      category: "Audit",
      status: "draft",
      lastUpdated: "2024-02-20"
    },
    {
      id: "14",
      name: "Risk Assessment Template",
      standard: "General",
      description: "Comprehensive risk assessment checklist",
      itemsCount: 56,
      completedCount: 0,
      category: "Risk Management",
      status: "draft",
      lastUpdated: "2024-02-22"
    },
    {
      id: "15",
      name: "Supplier Audit Checklist",
      standard: "General",
      description: "Third-party supplier assessment",
      itemsCount: 38,
      completedCount: 0,
      category: "Procurement",
      status: "draft",
      lastUpdated: "2024-02-25"
    }
  ]);

  const categories = [
    "Quality Management",
    "Security",
    "Privacy",
    "Healthcare",
    "Life Science",
    "Medical",
    "Automotive",
    "Food Safety",
    "Environment",
    "Safety",
    "Manufacturing",
    "Audit",
    "Risk Management",
    "Procurement"
  ];

  const filteredChecklists = checklists.filter(checklist => {
    const matchesSearch = checklist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      checklist.standard.toLowerCase().includes(searchQuery.toLowerCase()) ||
      checklist.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || checklist.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddChecklist = () => {
    if (newChecklist.name && newChecklist.standard && newChecklist.category) {
      const checklist: ComplianceChecklist = {
        id: String(checklists.length + 1),
        name: newChecklist.name,
        standard: newChecklist.standard,
        description: newChecklist.description,
        itemsCount: 0,
        completedCount: 0,
        category: newChecklist.category,
        status: "draft",
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setChecklists([...checklists, checklist]);
      setNewChecklist({ name: "", standard: "", description: "", category: "" });
      setIsAddDialogOpen(false);
    }
  };

  const getCompletionPercentage = (completed: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Compliance Checklist Management</h2>
          <p className="text-muted-foreground">Manage compliance checklist templates</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Checklist
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Checklist</DialogTitle>
              <DialogDescription>
                Create a new compliance checklist template
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Checklist Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., PCI DSS Compliance"
                  value={newChecklist.name}
                  onChange={(e) => setNewChecklist({ ...newChecklist, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="standard">Standard/Framework</Label>
                <Input
                  id="standard"
                  placeholder="e.g., PCI DSS"
                  value={newChecklist.standard}
                  onChange={(e) => setNewChecklist({ ...newChecklist, standard: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Brief description of the checklist"
                  value={newChecklist.description}
                  onChange={(e) => setNewChecklist({ ...newChecklist, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={newChecklist.category} onValueChange={(value) => setNewChecklist({ ...newChecklist, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddChecklist}>Create Checklist</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search checklists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Checklists</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{checklists.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Checklists</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{checklists.filter(c => c.status === "active").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{checklists.reduce((acc, c) => acc + c.itemsCount, 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {Math.round(checklists.reduce((acc, c) => acc + getCompletionPercentage(c.completedCount, c.itemsCount), 0) / checklists.length)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Checklists Table */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Checklists Data</CardTitle>
          <CardDescription>View and manage all compliance checklist templates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-bold">ID</TableHead>
                  <TableHead className="font-bold">Checklist Name</TableHead>
                  <TableHead className="font-bold">Standard</TableHead>
                  <TableHead className="font-bold">Description</TableHead>
                  <TableHead className="font-bold">Category</TableHead>
                  <TableHead className="font-bold">Items</TableHead>
                  <TableHead className="font-bold">Completed</TableHead>
                  <TableHead className="font-bold">Progress</TableHead>
                  <TableHead className="font-bold">Status</TableHead>
                  <TableHead className="font-bold">Last Updated</TableHead>
                  <TableHead className="font-bold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredChecklists.map((checklist) => {
                  const completionPercentage = getCompletionPercentage(checklist.completedCount, checklist.itemsCount);
                  return (
                    <TableRow key={checklist.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{checklist.id}</TableCell>
                      <TableCell className="font-semibold">{checklist.name}</TableCell>
                      <TableCell>
                        <code className="text-xs bg-muted px-2 py-1 rounded">{checklist.standard}</code>
                      </TableCell>
                      <TableCell className="max-w-md">{checklist.description}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{checklist.category}</Badge>
                      </TableCell>
                      <TableCell className="text-center">{checklist.itemsCount}</TableCell>
                      <TableCell className="text-center">{checklist.completedCount}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary rounded-full h-2 transition-all"
                              style={{ width: `${completionPercentage}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium min-w-[3ch]">{completionPercentage}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          checklist.status === "active" ? "default" : 
                          checklist.status === "draft" ? "secondary" : 
                          "outline"
                        }>
                          {checklist.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(checklist.lastUpdated).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}