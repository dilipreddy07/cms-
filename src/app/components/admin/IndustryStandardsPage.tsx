import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Badge } from "@/app/components/ui/badge";
import { BookOpen, Plus, Search, Edit, Trash2, ArrowLeft, FileText } from "lucide-react";
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

interface IndustryStandard {
  id: string;
  name: string;
  code: string;
  description: string;
  industryType: string;
  requirementsCount: number;
  status: "active" | "inactive";
  version: string;
}

interface IndustryStandardsPageProps {
  onBack: () => void;
}

export function IndustryStandardsPage({ onBack }: IndustryStandardsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newStandard, setNewStandard] = useState({ 
    name: "", 
    code: "", 
    description: "", 
    industryType: "",
    version: ""
  });

  const [standards, setStandards] = useState<IndustryStandard[]>([
    {
      id: "1",
      name: "ISO 9001",
      code: "ISO-9001:2015",
      description: "Quality Management Systems",
      industryType: "Software",
      requirementsCount: 85,
      status: "active",
      version: "2015"
    },
    {
      id: "2",
      name: "ISO 27001",
      code: "ISO-27001:2022",
      description: "Information Security Management",
      industryType: "Software",
      requirementsCount: 114,
      status: "active",
      version: "2022"
    },
    {
      id: "3",
      name: "GDPR",
      code: "GDPR-EU",
      description: "General Data Protection Regulation",
      industryType: "Software",
      requirementsCount: 99,
      status: "active",
      version: "2018"
    },
    {
      id: "4",
      name: "SOC 2",
      code: "SOC2-TYPE2",
      description: "Service Organization Control 2",
      industryType: "Software",
      requirementsCount: 64,
      status: "active",
      version: "2023"
    },
    {
      id: "5",
      name: "HIPAA",
      code: "HIPAA-US",
      description: "Health Insurance Portability and Accountability Act",
      industryType: "Health Care",
      requirementsCount: 78,
      status: "active",
      version: "2013"
    },
    {
      id: "6",
      name: "FDA 21 CFR Part 11",
      code: "FDA-21CFR11",
      description: "Electronic Records and Signatures",
      industryType: "Life Science",
      requirementsCount: 45,
      status: "active",
      version: "2021"
    },
    {
      id: "7",
      name: "ISO 13485",
      code: "ISO-13485:2016",
      description: "Medical Devices Quality Management",
      industryType: "Health Care",
      requirementsCount: 92,
      status: "active",
      version: "2016"
    },
    {
      id: "8",
      name: "IATF 16949",
      code: "IATF-16949:2016",
      description: "Automotive Quality Management System",
      industryType: "Automotive",
      requirementsCount: 105,
      status: "active",
      version: "2016"
    },
    {
      id: "9",
      name: "ISO 22000",
      code: "ISO-22000:2018",
      description: "Food Safety Management",
      industryType: "Food",
      requirementsCount: 68,
      status: "active",
      version: "2018"
    },
    {
      id: "10",
      name: "ISO 14001",
      code: "ISO-14001:2015",
      description: "Environmental Management",
      industryType: "Engineering",
      requirementsCount: 74,
      status: "active",
      version: "2015"
    },
    {
      id: "11",
      name: "ISO 45001",
      code: "ISO-45001:2018",
      description: "Occupational Health and Safety",
      industryType: "Engineering",
      requirementsCount: 82,
      status: "active",
      version: "2018"
    },
    {
      id: "12",
      name: "GMP",
      code: "GMP-EU",
      description: "Good Manufacturing Practice",
      industryType: "Life Science",
      requirementsCount: 96,
      status: "active",
      version: "2022"
    }
  ]);

  const filteredStandards = standards.filter(standard =>
    standard.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    standard.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    standard.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddStandard = () => {
    if (newStandard.name && newStandard.code && newStandard.industryType) {
      const standard: IndustryStandard = {
        id: String(standards.length + 1),
        name: newStandard.name,
        code: newStandard.code,
        description: newStandard.description,
        industryType: newStandard.industryType,
        requirementsCount: 0,
        status: "active",
        version: newStandard.version
      };
      setStandards([...standards, standard]);
      setNewStandard({ name: "", code: "", description: "", industryType: "", version: "" });
      setIsAddDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Industry Standards Management</h2>
          <p className="text-muted-foreground">Manage compliance standards and frameworks</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Standard
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Industry Standard</DialogTitle>
              <DialogDescription>
                Create a new compliance standard or framework
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Standard Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., ISO 9001"
                    value={newStandard.name}
                    onChange={(e) => setNewStandard({ ...newStandard, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Standard Code</Label>
                  <Input
                    id="code"
                    placeholder="e.g., ISO-9001:2015"
                    value={newStandard.code}
                    onChange={(e) => setNewStandard({ ...newStandard, code: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Brief description of the standard"
                  value={newStandard.description}
                  onChange={(e) => setNewStandard({ ...newStandard, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industryType">Industry Type</Label>
                  <Select value={newStandard.industryType} onValueChange={(value) => setNewStandard({ ...newStandard, industryType: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Software">Software</SelectItem>
                      <SelectItem value="Life Science">Life Science</SelectItem>
                      <SelectItem value="Health Care">Health Care</SelectItem>
                      <SelectItem value="Automotive">Automotive</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Food">Food</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="version">Version</Label>
                  <Input
                    id="version"
                    placeholder="e.g., 2015"
                    value={newStandard.version}
                    onChange={(e) => setNewStandard({ ...newStandard, version: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddStandard}>Create Standard</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search standards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Standards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{standards.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Standards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{standards.filter(s => s.status === "active").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{standards.reduce((acc, s) => acc + s.requirementsCount, 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Industry Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{new Set(standards.map(s => s.industryType)).size}</div>
          </CardContent>
        </Card>
      </div>

      {/* Standards Table */}
      <Card>
        <CardHeader>
          <CardTitle>Industry Standards Data</CardTitle>
          <CardDescription>View and manage all compliance standards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-bold">ID</TableHead>
                  <TableHead className="font-bold">Standard Name</TableHead>
                  <TableHead className="font-bold">Code</TableHead>
                  <TableHead className="font-bold">Description</TableHead>
                  <TableHead className="font-bold">Industry Type</TableHead>
                  <TableHead className="font-bold">Requirements</TableHead>
                  <TableHead className="font-bold">Version</TableHead>
                  <TableHead className="font-bold">Status</TableHead>
                  <TableHead className="font-bold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStandards.map((standard) => (
                  <TableRow key={standard.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{standard.id}</TableCell>
                    <TableCell className="font-semibold">{standard.name}</TableCell>
                    <TableCell><code className="text-xs bg-muted px-2 py-1 rounded">{standard.code}</code></TableCell>
                    <TableCell className="max-w-md">{standard.description}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{standard.industryType}</Badge>
                    </TableCell>
                    <TableCell className="text-center">{standard.requirementsCount}</TableCell>
                    <TableCell>{standard.version}</TableCell>
                    <TableCell>
                      <Badge variant={standard.status === "active" ? "default" : "secondary"}>
                        {standard.status}
                      </Badge>
                    </TableCell>
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
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}