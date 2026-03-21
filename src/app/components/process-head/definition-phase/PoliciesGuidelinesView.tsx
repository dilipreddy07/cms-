import { useState, useEffect } from "react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/app/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {
  Shield,
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  FileText,
  Search,
  Filter,
  Calendar,
} from "lucide-react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

interface PolicyGuideline {
  id: string;
  title: string;
  type: "Policy" | "Guideline";
  description: string;
  mapped_procedure: string;
  mapped_procedure_name?: string;
  version: string;
  status: "Draft" | "Review" | "Approved";
  created_at: string;
  updated_at: string;
}

interface PoliciesGuidelinesViewProps {
  standardCode: string;
  standardName: string;
  selectedProcedure: { id: string; name: string } | null;
  onBack: () => void;
  isEmbedded?: boolean;
}

export function PoliciesGuidelinesView({ 
  standardCode, 
  standardName, 
  selectedProcedure, 
  onBack, 
  isEmbedded = false 
}: PoliciesGuidelinesViewProps) {
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PolicyGuideline | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [items, setItems] = useState<PolicyGuideline[]>([]);
  const [procedures, setProcedures] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-8ab67d1d`;

  const [newItem, setNewItem] = useState<Partial<PolicyGuideline>>({
    title: "",
    type: "Policy",
    description: "",
    version: "v1.0",
    status: "Draft",
    mapped_procedure: selectedProcedure?.id || "",
  });

  // Load procedures for mapping
  useEffect(() => {
    loadProcedures();
  }, [standardCode]);

  // Load policies and guidelines
  useEffect(() => {
    loadItems();
  }, [standardCode]);

  const loadProcedures = async () => {
    try {
      const response = await fetch(`${API_BASE}/procedures/standard/${standardCode}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setProcedures(result.data || []);
        }
      }
    } catch (err) {
      console.error("Error loading procedures:", err);
    }
  };

  const loadItems = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE}/policies-guidelines/standard/${standardCode}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setItems(result.data || []);
        }
      }
    } catch (err) {
      console.error("Error loading policies/guidelines:", err);
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddItem = async () => {
    if (!newItem.title || !newItem.mapped_procedure) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setIsSaving(true);

      const response = await fetch(`${API_BASE}/policies-guidelines`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...newItem,
          standard_id: standardCode
        })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          await loadItems();
          setIsAddSheetOpen(false);
          setNewItem({
            title: "",
            type: "Policy",
            description: "",
            version: "v1.0",
            status: "Draft",
            mapped_procedure: selectedProcedure?.id || "",
          });
          alert("Item added successfully!");
        }
      }
    } catch (err) {
      console.error("Error adding item:", err);
      alert("Failed to add item");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditItem = (item: PolicyGuideline) => {
    setSelectedItem(item);
    setIsEditSheetOpen(true);
  };

  const handleUpdateItem = async () => {
    if (!selectedItem) return;

    try {
      setIsSaving(true);

      const response = await fetch(`${API_BASE}/policies-guidelines/${selectedItem.id}`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedItem)
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          await loadItems();
          setIsEditSheetOpen(false);
          setSelectedItem(null);
          alert("Item updated successfully!");
        }
      }
    } catch (err) {
      console.error("Error updating item:", err);
      alert("Failed to update item");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const response = await fetch(`${API_BASE}/policies-guidelines/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          await loadItems();
          alert("Item deleted successfully!");
        }
      }
    } catch (err) {
      console.error("Error deleting item:", err);
      alert("Failed to delete item");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-green-500 text-white";
      case "Review": return "bg-yellow-500 text-white";
      case "Draft": return "bg-gray-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getTypeColor = (type: string) => {
    return type === "Policy" ? "bg-purple-100 text-purple-700 border-purple-200" : "bg-pink-100 text-pink-700 border-pink-200";
  };

  // Filter items
  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || item.type === filterType;
    const matchesStatus = filterStatus === "all" || item.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Filters & Search - Only show when not embedded */}
      {!isEmbedded && (
        <Card className="shadow-lg border-2">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search policies and guidelines..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button 
                  onClick={() => setIsAddSheetOpen(true)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Policy/Guideline
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Filters:</span>
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Policy">Policy</SelectItem>
                    <SelectItem value="Guideline">Guideline</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Review">Review</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                  </SelectContent>
                </Select>

                {(searchTerm || filterType !== "all" || filterStatus !== "all") && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      setSearchTerm("");
                      setFilterType("all");
                      setFilterStatus("all");
                    }}
                  >
                    Clear All
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Table */}
      {filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="p-4 bg-gray-100 rounded-full mb-4">
            <Shield className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Policies or Guidelines Found</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {searchTerm || filterType !== "all" || filterStatus !== "all"
              ? "No items match your current filters"
              : "Get started by adding your first policy or guideline"}
          </p>
          <Button 
            onClick={() => setIsAddSheetOpen(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add First Item
          </Button>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="font-semibold">ID</TableHead>
                <TableHead className="font-semibold">Title</TableHead>
                <TableHead className="font-semibold">Type</TableHead>
                <TableHead className="font-semibold">Description</TableHead>
                <TableHead className="font-semibold">Mapped Procedure</TableHead>
                <TableHead className="font-semibold">Version</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Last Updated</TableHead>
                <TableHead className="text-right font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id} className="hover:bg-gray-50 transition-colors">
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell className="font-medium max-w-[200px]">
                    <div className="truncate">{item.title}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getTypeColor(item.type)}>
                      {item.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[250px]">
                    <div className="text-sm text-muted-foreground truncate">
                      {item.description || "No description"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="whitespace-nowrap">
                      {item.mapped_procedure_name || item.mapped_procedure}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {item.version}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {item.updated_at}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="hover:bg-gray-200">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleEditItem(item)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Add Sheet */}
      <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
        <SheetContent className="sm:max-w-[600px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Add New Policy/Guideline</SheetTitle>
            <SheetDescription>
              Create a new policy or guideline mapped to a procedure
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="type">Type *</Label>
              <Select 
                value={newItem.type} 
                onValueChange={(value) => setNewItem({ ...newItem, type: value as "Policy" | "Guideline" })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Policy">Policy</SelectItem>
                  <SelectItem value="Guideline">Guideline</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                placeholder="Enter title (e.g., Information Security Policy)"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="procedure">Mapped Procedure *</Label>
              <Select 
                value={newItem.mapped_procedure} 
                onValueChange={(value) => setNewItem({ ...newItem, mapped_procedure: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select procedure" />
                </SelectTrigger>
                <SelectContent>
                  {procedures.map((proc) => (
                    <SelectItem key={proc.procedure_id} value={proc.procedure_id}>
                      {proc.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="version">Version</Label>
                <Input
                  id="version"
                  value={newItem.version}
                  onChange={(e) => setNewItem({ ...newItem, version: e.target.value })}
                  placeholder="v1.0"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={newItem.status} 
                  onValueChange={(value) => setNewItem({ ...newItem, status: value as "Draft" | "Review" | "Approved" })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Review">Review</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                placeholder="Brief description..."
                rows={3}
              />
            </div>
          </div>
          <SheetFooter>
            <Button variant="outline" onClick={() => setIsAddSheetOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddItem}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
              disabled={!newItem.title || !newItem.mapped_procedure || isSaving}
            >
              {isSaving ? "Adding..." : "Add Item"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Edit Sheet */}
      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent className="sm:max-w-[600px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Edit Policy/Guideline</SheetTitle>
            <SheetDescription>
              Update policy or guideline information
            </SheetDescription>
          </SheetHeader>
          {selectedItem && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-type">Type *</Label>
                <Select 
                  value={selectedItem.type} 
                  onValueChange={(value) => setSelectedItem({ ...selectedItem, type: value as "Policy" | "Guideline" })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Policy">Policy</SelectItem>
                    <SelectItem value="Guideline">Guideline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Title *</Label>
                <Input
                  id="edit-title"
                  value={selectedItem.title}
                  onChange={(e) => setSelectedItem({ ...selectedItem, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-procedure">Mapped Procedure *</Label>
                <Select 
                  value={selectedItem.mapped_procedure} 
                  onValueChange={(value) => setSelectedItem({ ...selectedItem, mapped_procedure: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {procedures.map((proc) => (
                      <SelectItem key={proc.procedure_id} value={proc.procedure_id}>
                        {proc.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-version">Version</Label>
                  <Input
                    id="edit-version"
                    value={selectedItem.version}
                    onChange={(e) => setSelectedItem({ ...selectedItem, version: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select 
                    value={selectedItem.status} 
                    onValueChange={(value) => setSelectedItem({ ...selectedItem, status: value as "Draft" | "Review" | "Approved" })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Review">Review</SelectItem>
                      <SelectItem value="Approved">Approved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={selectedItem.description}
                  onChange={(e) => setSelectedItem({ ...selectedItem, description: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
          )}
          <SheetFooter>
            <Button variant="outline" onClick={() => setIsEditSheetOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleUpdateItem}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
              disabled={isSaving}
            >
              {isSaving ? "Updating..." : "Update Item"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
