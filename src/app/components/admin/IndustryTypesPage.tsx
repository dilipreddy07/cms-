import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Badge } from "@/app/components/ui/badge";
import { Building2, Plus, Search, Edit, Trash2, ArrowLeft } from "lucide-react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";

interface IndustryType {
  id: string;
  name: string;
  description: string;
  standardsCount: number;
  departmentsCount: number;
  status: "active" | "inactive";
  createdAt: string;
}

interface IndustryTypesPageProps {
  onBack: () => void;
}

export function IndustryTypesPage({ onBack }: IndustryTypesPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newIndustryType, setNewIndustryType] = useState({ name: "", description: "" });

  const [industryTypes, setIndustryTypes] = useState<IndustryType[]>([
    {
      id: "1",
      name: "Software",
      description: "Software development and IT services",
      standardsCount: 8,
      departmentsCount: 12,
      status: "active",
      createdAt: "2024-01-15"
    },
    {
      id: "2",
      name: "Life Science",
      description: "Pharmaceutical and biotechnology",
      standardsCount: 15,
      departmentsCount: 8,
      status: "active",
      createdAt: "2024-01-20"
    },
    {
      id: "3",
      name: "Health Care",
      description: "Medical and healthcare services",
      standardsCount: 12,
      departmentsCount: 10,
      status: "active",
      createdAt: "2024-02-01"
    },
    {
      id: "4",
      name: "Automotive",
      description: "Automotive manufacturing and services",
      standardsCount: 10,
      departmentsCount: 15,
      status: "active",
      createdAt: "2024-02-10"
    },
    {
      id: "5",
      name: "Engineering",
      description: "Engineering and construction",
      standardsCount: 9,
      departmentsCount: 11,
      status: "active",
      createdAt: "2024-02-15"
    },
    {
      id: "6",
      name: "Food",
      description: "Food production and processing",
      standardsCount: 11,
      departmentsCount: 7,
      status: "active",
      createdAt: "2024-03-01"
    }
  ]);

  const filteredIndustryTypes = industryTypes.filter(type =>
    type.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    type.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddIndustryType = () => {
    if (newIndustryType.name && newIndustryType.description) {
      const newType: IndustryType = {
        id: String(industryTypes.length + 1),
        name: newIndustryType.name,
        description: newIndustryType.description,
        standardsCount: 0,
        departmentsCount: 0,
        status: "active",
        createdAt: new Date().toISOString().split('T')[0]
      };
      setIndustryTypes([...industryTypes, newType]);
      setNewIndustryType({ name: "", description: "" });
      setIsAddDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Industry Types Management</h2>
            <p className="text-blue-100 mt-1">Manage industry classifications and categories</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-white text-blue-600 hover:bg-blue-50">
                <Plus className="mr-2 h-4 w-4" />
                Add Industry Type
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Industry Type</DialogTitle>
                <DialogDescription>
                  Create a new industry type classification
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Industry Type Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Manufacturing"
                    value={newIndustryType.name}
                    onChange={(e) => setNewIndustryType({ ...newIndustryType, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="Brief description of the industry type"
                    value={newIndustryType.description}
                    onChange={(e) => setNewIndustryType({ ...newIndustryType, description: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddIndustryType}>Create Industry Type</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search industry types..."
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
            <CardTitle className="text-sm font-medium text-gray-600">Total Industry Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{industryTypes.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Active Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{industryTypes.filter(t => t.status === "active").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Standards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{industryTypes.reduce((acc, t) => acc + t.standardsCount, 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Departments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{industryTypes.reduce((acc, t) => acc + t.departmentsCount, 0)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Industry Types Table */}
      <Card>
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-gray-900">Industry Types Data</CardTitle>
          <CardDescription>View and manage all industry type records</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">ID</TableHead>
                  <TableHead className="font-semibold">Industry Type</TableHead>
                  <TableHead className="font-semibold">Description</TableHead>
                  <TableHead className="font-semibold">Standards</TableHead>
                  <TableHead className="font-semibold">Departments</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Created Date</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIndustryTypes.map((type) => (
                  <TableRow key={type.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{type.id}</TableCell>
                    <TableCell className="font-semibold">{type.name}</TableCell>
                    <TableCell className="max-w-md text-gray-600">{type.description}</TableCell>
                    <TableCell className="text-center">{type.standardsCount}</TableCell>
                    <TableCell className="text-center">{type.departmentsCount}</TableCell>
                    <TableCell>
                      <Badge variant={type.status === "active" ? "default" : "secondary"}>
                        {type.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(type.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="hover:bg-blue-50">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
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