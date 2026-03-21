import { useState, useEffect } from "react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
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
  Layers,
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  Upload,
  Download,
  Search,
  Calendar,
  FileText,
} from "lucide-react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

const DEPARTMENTS = [
  "Quality",
  "Human Resources (HR)",
  "Purchase",
  "Administration",
  "Product Development",
  "Information Technology (IT)",
  "Finance / Accounts",
  "Operations",
  "Sales & Marketing",
  "Customer Support / Service"
];

interface Template {
  id: string;
  title: string;
  department: string;
  mapped_procedure?: string;
  mapped_procedure_name?: string;
  file_url: string | null;
  file_type: "doc" | "pdf" | null;
  version: string;
  created_at: string;
  updated_at: string;
}

interface TemplatesViewProps {
  standardCode: string;
  standardName: string;
  selectedProcedure: { id: string; name: string } | null;
  onBack: () => void;
  isEmbedded?: boolean;
}

export function TemplatesView({ 
  standardCode, 
  standardName, 
  selectedProcedure, 
  onBack,
  isEmbedded = false
}: TemplatesViewProps) {
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Template | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [items, setItems] = useState<Template[]>([]);
  const [procedures, setProcedures] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-8ab67d1d`;

  const [newItem, setNewItem] = useState<Partial<Template>>({
    title: "",
    department: "",
    version: "v1.0",
    mapped_procedure: "",
  });

  // Load procedures for mapping
  useEffect(() => {
    loadProcedures();
  }, [standardCode]);

  // Load templates
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
      const response = await fetch(`${API_BASE}/templates/standard/${standardCode}`, {
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
      console.error("Error loading templates:", err);
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleAddItem = async () => {
    if (!newItem.title || !newItem.department) {
      alert("Please fill in all required fields (Title and Department)");
      return;
    }

    try {
      setIsSaving(true);

      const formData = new FormData();
      formData.append("title", newItem.title || "");
      formData.append("department", newItem.department || "");
      formData.append("version", newItem.version || "v1.0");
      if (newItem.mapped_procedure) {
        formData.append("mapped_procedure", newItem.mapped_procedure);
      }
      formData.append("standard_id", standardCode);

      if (uploadedFile) {
        formData.append("file", uploadedFile);
      }

      const response = await fetch(`${API_BASE}/templates`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          await loadItems();
          setIsAddSheetOpen(false);
          setNewItem({
            title: "",
            department: "",
            version: "v1.0",
            mapped_procedure: "",
          });
          setUploadedFile(null);
          alert("Template added successfully!");
        }
      }
    } catch (err) {
      console.error("Error adding template:", err);
      alert("Failed to add template");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditItem = (item: Template) => {
    setSelectedItem(item);
    setIsEditSheetOpen(true);
  };

  const handleUpdateItem = async () => {
    if (!selectedItem || !selectedItem.title || !selectedItem.department) {
      alert("Please fill in all required fields (Title and Department)");
      return;
    }

    try {
      setIsSaving(true);

      const formData = new FormData();
      formData.append("title", selectedItem.title);
      formData.append("department", selectedItem.department);
      formData.append("version", selectedItem.version);
      if (selectedItem.mapped_procedure) {
        formData.append("mapped_procedure", selectedItem.mapped_procedure);
      }

      if (uploadedFile) {
        formData.append("file", uploadedFile);
      }

      const response = await fetch(`${API_BASE}/templates/${selectedItem.id}`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          await loadItems();
          setIsEditSheetOpen(false);
          setSelectedItem(null);
          setUploadedFile(null);
          alert("Template updated successfully!");
        }
      }
    } catch (err) {
      console.error("Error updating template:", err);
      alert("Failed to update template");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this template?")) return;

    try {
      const response = await fetch(`${API_BASE}/templates/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          await loadItems();
          alert("Template deleted successfully!");
        }
      }
    } catch (err) {
      console.error("Error deleting template:", err);
      alert("Failed to delete template");
    }
  };

  const handleDownload = async (item: Template) => {
    if (!item.file_url) {
      alert("No file available for download");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/templates/${item.id}/download`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data?.url) {
          const link = document.createElement('a');
          link.href = result.data.url;
          link.download = result.data.filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    } catch (err) {
      console.error("Error downloading file:", err);
      alert("Failed to download file");
    }
  };

  // Filter items
  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Filters & Search - Only show when not embedded */}
      {!isEmbedded && (
        <Card className="shadow-lg border-2">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button 
                onClick={() => setIsAddSheetOpen(true)}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Template
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Table */}
      {filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="p-4 bg-gray-100 rounded-full mb-4">
            <Layers className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Templates Found</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {searchTerm
              ? "No templates match your search"
              : "Get started by adding your first template"}
          </p>
          <Button 
            onClick={() => setIsAddSheetOpen(true)}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add First Template
          </Button>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="font-semibold">ID</TableHead>
                <TableHead className="font-semibold">Title</TableHead>
                <TableHead className="font-semibold">Department</TableHead>
                <TableHead className="font-semibold">Procedure</TableHead>
                <TableHead className="font-semibold">Version</TableHead>
                <TableHead className="font-semibold">File Status</TableHead>
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
                    <Badge variant="outline" className="whitespace-nowrap">{item.department}</Badge>
                  </TableCell>
                  <TableCell>
                    {item.mapped_procedure ? (
                      <Badge variant="outline" className="whitespace-nowrap bg-blue-50 text-blue-700">
                        {item.mapped_procedure_name || item.mapped_procedure}
                      </Badge>
                    ) : (
                      <span className="text-sm text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700">
                      {item.version}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {item.file_url ? (
                      <Badge className="bg-green-500 text-white">
                        Uploaded ({item.file_type?.toUpperCase()})
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-gray-500">
                        Not Uploaded
                      </Badge>
                    )}
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
                        {item.file_url && (
                          <>
                            <DropdownMenuItem onClick={() => handleDownload(item)}>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                          </>
                        )}
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
            <SheetTitle>Add New Template</SheetTitle>
            <SheetDescription>
              Create a new template for a specific department
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Template Title *</Label>
              <Input
                id="title"
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                placeholder="Enter template title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="department">Department *</Label>
              <Select 
                value={newItem.department} 
                onValueChange={(value) => setNewItem({ ...newItem, department: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {DEPARTMENTS.map((dept) => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="procedure">Procedure (Optional)</Label>
              <Select 
                value={newItem.mapped_procedure || "none"} 
                onValueChange={(value) => setNewItem({ ...newItem, mapped_procedure: value === "none" ? "" : value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select procedure (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">- None -</SelectItem>
                  {procedures.map((proc) => (
                    <SelectItem key={proc.procedure_id} value={proc.procedure_id}>
                      {proc.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
              <Label htmlFor="file">Upload File (Optional)</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-orange-500 transition-colors">
                <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  {uploadedFile ? uploadedFile.name : "Click to upload or drag and drop"}
                </p>
                <p className="text-xs text-muted-foreground mb-4">DOC, DOCX, or PDF file</p>
                <Input
                  id="file"
                  type="file"
                  accept=".doc,.docx,.pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf"
                  onChange={handleFileUpload}
                  className="max-w-xs mx-auto"
                />
              </div>
              {uploadedFile && (
                <div className="flex items-center gap-2 p-2 bg-orange-50 rounded">
                  <FileText className="h-4 w-4 text-orange-600" />
                  <span className="text-sm text-orange-900">{uploadedFile.name}</span>
                </div>
              )}
            </div>
          </div>
          <SheetFooter>
            <Button variant="outline" onClick={() => setIsAddSheetOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddItem}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white"
              disabled={!newItem.title || !newItem.department || isSaving}
            >
              {isSaving ? "Adding..." : "Add Template"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Edit Sheet */}
      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent className="sm:max-w-[600px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Edit Template</SheetTitle>
            <SheetDescription>
              Update template information
            </SheetDescription>
          </SheetHeader>
          {selectedItem && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Template Title *</Label>
                <Input
                  id="edit-title"
                  value={selectedItem.title}
                  onChange={(e) => setSelectedItem({ ...selectedItem, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-department">Department *</Label>
                <Select 
                  value={selectedItem.department} 
                  onValueChange={(value) => setSelectedItem({ ...selectedItem, department: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPARTMENTS.map((dept) => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-procedure">Procedure (Optional)</Label>
                <Select 
                  value={selectedItem.mapped_procedure || "none"} 
                  onValueChange={(value) => setSelectedItem({ ...selectedItem, mapped_procedure: value === "none" ? "" : value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">- None -</SelectItem>
                    {procedures.map((proc) => (
                      <SelectItem key={proc.procedure_id} value={proc.procedure_id}>
                        {proc.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-version">Version</Label>
                <Input
                  id="edit-version"
                  value={selectedItem.version}
                  onChange={(e) => setSelectedItem({ ...selectedItem, version: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-file">Upload New File (Optional)</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-orange-500 transition-colors">
                  <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    {uploadedFile ? uploadedFile.name : "Click to upload or drag and drop"}
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">DOC, DOCX, or PDF file</p>
                  <Input
                    id="edit-file"
                    type="file"
                    accept=".doc,.docx,.pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf"
                    onChange={handleFileUpload}
                    className="max-w-xs mx-auto"
                  />
                </div>
                {uploadedFile && (
                  <div className="flex items-center gap-2 p-2 bg-orange-50 rounded">
                    <FileText className="h-4 w-4 text-orange-600" />
                    <span className="text-sm text-orange-900">{uploadedFile.name}</span>
                  </div>
                )}
              </div>
            </div>
          )}
          <SheetFooter>
            <Button variant="outline" onClick={() => setIsEditSheetOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleUpdateItem}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white"
              disabled={!selectedItem?.title || !selectedItem?.department || isSaving}
            >
              {isSaving ? "Updating..." : "Update Template"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
