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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/app/components/ui/dialog";
import {
  ListChecks,
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  Upload,
  Download,
  Eye,
  Search,
  Calendar,
  FileText,
  Save,
  FileEdit,
} from "lucide-react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

interface Checklist {
  checklist_id: string;
  name: string;
  description: string;
  mapped_procedure: string;
  mapped_procedure_name?: string;
  file_url: string | null;
  file_type: "doc" | "pdf" | null;
  file_content?: string | null;
  version: string;
  status: "Draft" | "Review" | "Approved";
  created_at: string;
  updated_at: string;
}

interface ChecklistsViewProps {
  standardCode: string;
  standardName: string;
  selectedProcedure: { id: string; name: string } | null;
  onBack: () => void;
  isEmbedded?: boolean;
}

export function ChecklistsView({ 
  standardCode, 
  standardName, 
  selectedProcedure, 
  onBack,
  isEmbedded = false
}: ChecklistsViewProps) {
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [isEditRecordSheetOpen, setIsEditRecordSheetOpen] = useState(false);
  const [isEditFileDialogOpen, setIsEditFileDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedChecklist, setSelectedChecklist] = useState<Checklist | null>(null);
  const [editedFileContent, setEditedFileContent] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [checklists, setChecklists] = useState<Checklist[]>([]);
  const [procedures, setProcedures] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-8ab67d1d`;

  const [newChecklist, setNewChecklist] = useState<Partial<Checklist>>({
    name: "",
    description: "",
    mapped_procedure: selectedProcedure?.id || "",
    version: "v1.0",
    status: "Draft",
  });

  // Load procedures for mapping
  useEffect(() => {
    loadProcedures();
  }, [standardCode]);

  // Load checklists
  useEffect(() => {
    loadChecklists();
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

  const loadChecklists = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE}/checklists/standard/${standardCode}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setChecklists(result.data || []);
        }
      }
    } catch (err) {
      console.error("Error loading checklists:", err);
      setChecklists([]);
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

  const handleAddChecklist = async () => {
    if (!newChecklist.name || !newChecklist.mapped_procedure) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setIsSaving(true);

      const formData = new FormData();
      formData.append("name", newChecklist.name);
      formData.append("description", newChecklist.description || "");
      formData.append("mapped_procedure", newChecklist.mapped_procedure);
      formData.append("standard_id", standardCode);
      formData.append("version", newChecklist.version || "v1.0");
      formData.append("status", newChecklist.status || "Draft");

      if (uploadedFile) {
        formData.append("file", uploadedFile);
      }

      const response = await fetch(`${API_BASE}/checklists`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          await loadChecklists();
          setIsAddSheetOpen(false);
          setNewChecklist({
            name: "",
            description: "",
            mapped_procedure: selectedProcedure?.id || "",
            version: "v1.0",
            status: "Draft",
          });
          setUploadedFile(null);
          alert("Checklist added successfully!");
        }
      }
    } catch (err) {
      console.error("Error adding checklist:", err);
      alert("Failed to add checklist");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditRecord = (checklist: Checklist) => {
    setSelectedChecklist(checklist);
    setIsEditRecordSheetOpen(true);
  };

  const handleUpdateRecord = async () => {
    if (!selectedChecklist) return;

    try {
      setIsSaving(true);

      const formData = new FormData();
      formData.append("name", selectedChecklist.name);
      formData.append("description", selectedChecklist.description || "");
      formData.append("mapped_procedure", selectedChecklist.mapped_procedure);
      formData.append("version", selectedChecklist.version);
      formData.append("status", selectedChecklist.status);

      const response = await fetch(`${API_BASE}/checklists/${selectedChecklist.checklist_id}`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          await loadChecklists();
          setIsEditRecordSheetOpen(false);
          setSelectedChecklist(null);
          alert("Checklist updated successfully!");
        }
      }
    } catch (err) {
      console.error("Error updating checklist:", err);
      alert("Failed to update checklist");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditFile = async (checklist: Checklist) => {
    if (!checklist.file_url) {
      alert("No file to edit. Please upload a file first.");
      return;
    }

    setSelectedChecklist(checklist);
    
    try {
      const response = await fetch(`${API_BASE}/checklists/${checklist.checklist_id}/content`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data?.content) {
          setEditedFileContent(result.data.content);
        } else {
          setEditedFileContent(
            `=== ${checklist.name} ===\n\n` +
            `Mapped Procedure: ${checklist.mapped_procedure_name || checklist.mapped_procedure}\n` +
            `Version: ${checklist.version}\n` +
            `Status: ${checklist.status}\n\n` +
            `--- Checklist Items ---\n\n` +
            `☐ Item 1: Review and verify requirements\n` +
            `☐ Item 2: Prepare necessary documentation\n` +
            `☐ Item 3: Execute procedure steps\n` +
            `☐ Item 4: Validate results\n` +
            `☐ Item 5: Sign off and archive\n\n` +
            `--- Notes ---\n` +
            `Add any additional notes here...\n\n` +
            `--- End of Checklist ---`
          );
        }
      }
    } catch (err) {
      console.error("Error fetching checklist content:", err);
      setEditedFileContent(
        `=== ${checklist.name} ===\n\n` +
        `--- Checklist Items ---\n\n` +
        `☐ Item 1: \n` +
        `☐ Item 2: \n` +
        `☐ Item 3: \n\n` +
        `--- End of Checklist ---`
      );
    }
    
    setIsEditFileDialogOpen(true);
  };

  const handleSaveFileContent = async () => {
    if (!selectedChecklist) return;

    try {
      setIsSaving(true);

      const response = await fetch(`${API_BASE}/checklists/${selectedChecklist.checklist_id}/content`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: editedFileContent
        })
      });

      if (response.ok) {
        await loadChecklists();
        setIsEditFileDialogOpen(false);
        setSelectedChecklist(null);
        setEditedFileContent("");
        alert("Checklist content saved successfully!");
      }
    } catch (err) {
      console.error("Error saving checklist content:", err);
      alert("Content updated locally (demo mode)");
      setIsEditFileDialogOpen(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteChecklist = async (id: string) => {
    if (!confirm("Are you sure you want to delete this checklist?")) return;

    try {
      const response = await fetch(`${API_BASE}/checklists/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      if (response.ok) {
        await loadChecklists();
        alert("Checklist deleted successfully!");
      }
    } catch (err) {
      console.error("Error deleting checklist:", err);
      alert("Failed to delete checklist");
    }
  };

  const handleUploadDocument = async (checklist: Checklist) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.doc,.docx,.pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf';
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      try {
        setIsSaving(true);

        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(`${API_BASE}/checklists/${checklist.checklist_id}`, {
          method: "PUT",
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: formData
        });

        if (response.ok) {
          await loadChecklists();
          alert(checklist.file_url ? "File re-uploaded successfully!" : "File uploaded successfully!");
        }
      } catch (err) {
        console.error("Error uploading file:", err);
        alert("Failed to upload file");
      } finally {
        setIsSaving(false);
      }
    };

    input.click();
  };

  const handleDownload = async (checklist: Checklist, format: "doc" | "pdf") => {
    if (!checklist.file_url) {
      alert("No file available for download");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/checklists/${checklist.checklist_id}/download?format=${format}`, {
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

  const handleViewDocument = (checklist: Checklist) => {
    setSelectedChecklist(checklist);
    setIsViewDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-green-500 text-white";
      case "Review": return "bg-yellow-500 text-white";
      case "Draft": return "bg-gray-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  // Filter checklists
  const filteredChecklists = checklists.filter(checklist => {
    const matchesSearch = checklist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          checklist.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || checklist.status === filterStatus;
    return matchesSearch && matchesStatus;
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
                    placeholder="Search checklists..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button 
                  onClick={() => setIsAddSheetOpen(true)}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Checklist
                </Button>
              </div>

              <div className="flex items-center gap-4">
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

                {(searchTerm || filterStatus !== "all") && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      setSearchTerm("");
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
      {filteredChecklists.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="p-4 bg-gray-100 rounded-full mb-4">
            <ListChecks className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Checklists Found</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {searchTerm || filterStatus !== "all"
              ? "No checklists match your filters"
              : "Get started by adding your first checklist"}
          </p>
          <Button 
            onClick={() => setIsAddSheetOpen(true)}
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add First Checklist
          </Button>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="font-semibold">ID</TableHead>
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Description</TableHead>
                <TableHead className="font-semibold">Mapped Procedure</TableHead>
                <TableHead className="font-semibold">Version</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Last Updated</TableHead>
                <TableHead className="text-right font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredChecklists.map((checklist) => (
                <TableRow key={checklist.checklist_id} className="hover:bg-gray-50 transition-colors">
                  <TableCell className="font-medium">{checklist.checklist_id}</TableCell>
                  <TableCell className="font-medium max-w-[200px]">
                    <div className="truncate">{checklist.name}</div>
                  </TableCell>
                  <TableCell className="max-w-[250px]">
                    <div className="text-sm text-muted-foreground truncate">
                      {checklist.description || "No description"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="whitespace-nowrap">
                      {checklist.mapped_procedure_name || checklist.mapped_procedure}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {checklist.version}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(checklist.status)}>
                      {checklist.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {checklist.updated_at}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="hover:bg-gray-200">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>Document Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        
                        {checklist.file_url ? (
                          <>
                            <DropdownMenuItem onClick={() => handleViewDocument(checklist)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View File
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditFile(checklist)}>
                              <FileEdit className="mr-2 h-4 w-4" />
                              Edit File
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUploadDocument(checklist)}>
                              <Upload className="mr-2 h-4 w-4" />
                              Re-upload File
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDownload(checklist, "doc")}>
                              <Download className="mr-2 h-4 w-4" />
                              Download DOC
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDownload(checklist, "pdf")}>
                              <Download className="mr-2 h-4 w-4" />
                              Download PDF
                            </DropdownMenuItem>
                          </>
                        ) : (
                          <DropdownMenuItem onClick={() => handleUploadDocument(checklist)}>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Document
                          </DropdownMenuItem>
                        )}
                        
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Record Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        
                        <DropdownMenuItem onClick={() => handleEditRecord(checklist)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Record
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteChecklist(checklist.checklist_id)}
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

      {/* Add Checklist Sheet */}
      <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
        <SheetContent className="sm:max-w-[600px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Add New Checklist</SheetTitle>
            <SheetDescription>
              Create a checklist mapped to a procedure
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Checklist Name *</Label>
              <Input
                id="name"
                value={newChecklist.name}
                onChange={(e) => setNewChecklist({ ...newChecklist, name: e.target.value })}
                placeholder="Enter checklist name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="procedure">Mapped Procedure *</Label>
              <Select
                value={newChecklist.mapped_procedure}
                onValueChange={(value) => setNewChecklist({ ...newChecklist, mapped_procedure: value })}
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
            <div className="grid gap-2">
              <Label htmlFor="template-name">Template Name *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tpl-security-policy">Security Policy Template</SelectItem>
                  <SelectItem value="tpl-risk-assessment">Risk Assessment Template</SelectItem>
                  <SelectItem value="tpl-incident-response">Incident Response Template</SelectItem>
                  <SelectItem value="tpl-access-control">Access Control Template</SelectItem>
                  <SelectItem value="tpl-data-protection">Data Protection Template</SelectItem>
                  <SelectItem value="tpl-bcp">Business Continuity Template</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Maps checklist to a specific template for traceability</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="file">Upload File (Optional)</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-green-500 transition-colors">
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
                <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                  <FileText className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-900">{uploadedFile.name}</span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="version">Version</Label>
                <Input
                  id="version"
                  value={newChecklist.version}
                  onChange={(e) => setNewChecklist({ ...newChecklist, version: e.target.value })}
                  placeholder="v1.0"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={newChecklist.status} 
                  onValueChange={(value) => setNewChecklist({ ...newChecklist, status: value as "Draft" | "Review" | "Approved" })}
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
                value={newChecklist.description}
                onChange={(e) => setNewChecklist({ ...newChecklist, description: e.target.value })}
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
              onClick={handleAddChecklist}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white"
              disabled={!newChecklist.name || !newChecklist.mapped_procedure || isSaving}
            >
              {isSaving ? "Adding..." : "Add Checklist"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Edit Record Sheet */}
      <Sheet open={isEditRecordSheetOpen} onOpenChange={setIsEditRecordSheetOpen}>
        <SheetContent className="sm:max-w-[600px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Edit Checklist Record</SheetTitle>
            <SheetDescription>
              Update checklist metadata
            </SheetDescription>
          </SheetHeader>
          {selectedChecklist && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Checklist Name *</Label>
                <Input
                  id="edit-name"
                  value={selectedChecklist.name}
                  onChange={(e) => setSelectedChecklist({ ...selectedChecklist, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-procedure">Mapped Procedure *</Label>
                <Select 
                  value={selectedChecklist.mapped_procedure} 
                  onValueChange={(value) => setSelectedChecklist({ ...selectedChecklist, mapped_procedure: value })}
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
                    value={selectedChecklist.version}
                    onChange={(e) => setSelectedChecklist({ ...selectedChecklist, version: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select 
                    value={selectedChecklist.status} 
                    onValueChange={(value) => setSelectedChecklist({ ...selectedChecklist, status: value as "Draft" | "Review" | "Approved" })}
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
                  value={selectedChecklist.description}
                  onChange={(e) => setSelectedChecklist({ ...selectedChecklist, description: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
          )}
          <SheetFooter>
            <Button variant="outline" onClick={() => setIsEditRecordSheetOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleUpdateRecord}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white"
              disabled={isSaving}
            >
              {isSaving ? "Updating..." : "Update Record"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Edit File Dialog */}
      <Dialog open={isEditFileDialogOpen} onOpenChange={setIsEditFileDialogOpen}>
        <DialogContent className="sm:max-w-[800px] h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Edit Checklist File - {selectedChecklist?.name}</DialogTitle>
            <DialogDescription>
              Virtual editor - Edit checklist content
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-hidden">
            <Textarea
              value={editedFileContent}
              onChange={(e) => setEditedFileContent(e.target.value)}
              className="h-full w-full font-mono text-sm resize-none"
              placeholder="Checklist content will appear here..."
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditFileDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSaveFileContent}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white"
              disabled={isSaving}
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Document Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>{selectedChecklist?.name}</DialogTitle>
            <DialogDescription>Checklist Details</DialogDescription>
          </DialogHeader>
          {selectedChecklist && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Checklist ID</Label>
                  <p className="font-medium">{selectedChecklist.checklist_id}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Mapped Procedure</Label>
                  <Badge variant="outline">
                    {selectedChecklist.mapped_procedure_name || selectedChecklist.mapped_procedure}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Version</Label>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {selectedChecklist.version}
                  </Badge>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <Badge className={getStatusColor(selectedChecklist.status)}>
                    {selectedChecklist.status}
                  </Badge>
                </div>
              </div>
              {selectedChecklist.description && (
                <div>
                  <Label className="text-muted-foreground">Description</Label>
                  <p className="mt-1 text-sm">{selectedChecklist.description}</p>
                </div>
              )}
              <div>
                <Label className="text-muted-foreground">File Status</Label>
                <p className="font-medium">
                  {selectedChecklist.file_url ? `Uploaded (${selectedChecklist.file_type?.toUpperCase()})` : "Not uploaded"}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
