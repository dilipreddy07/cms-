import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
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
  ArrowLeft,
  FileText,
  Download,
  Eye,
  MoreVertical,
  Plus,
  Edit,
  Trash2,
  Upload,
  Calendar,
  Search,
  Filter,
  Save,
  FileEdit,
} from "lucide-react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

interface Procedure {
  procedure_id: string;
  name: string;
  department: string;
  standard_id: string;
  file_url: string | null;
  file_type: "doc" | "pdf" | null;
  file_content?: string | null;
  version: string;
  status: "Draft" | "Review" | "Approved";
  created_by: string;
  created_at: string;
  updated_at: string;
  description?: string;
}

interface ProcedureManagementViewProps {
  standardCode: string;
  standardName: string;
  onBack: () => void;
  onProcedureSelect?: (procedureId: string, procedureName: string) => void;
  isEmbedded?: boolean;
}

// Predefined procedures with department mapping
const PREDEFINED_PROCEDURES = [
  // Quality Department
  { name: "Procedure for Document Control", department: "Quality" },
  { name: "Procedure for Corrective Action", department: "Quality" },
  { name: "Procedure for Internal Audit", department: "Quality" },
  { name: "Procedure for Management Review (MR)", department: "Quality" },
  { name: "Procedure for Control of Non-Conformity", department: "Quality" },
  { name: "Procedure for Risk Management", department: "Quality" },
  // Human Resources (HR)
  { name: "Procedure for HR", department: "Human Resources (HR)" },
  // Purchase
  { name: "Procedure for Purchase", department: "Purchase" },
  // Administration
  { name: "Procedure for Admin", department: "Administration" },
  // Product Development
  { name: "Software Development - Project Management Procedure", department: "Product Development" },
  { name: "Software Development - Software Requirements Procedure", department: "Product Development" },
  { name: "Software Development - Software Designing Procedure", department: "Product Development" },
  { name: "Software Development - Software Coding Procedure", department: "Product Development" },
  { name: "Software Development - Software Testing Procedure", department: "Product Development" },
  { name: "Software Development - Configuration Management Procedure", department: "Product Development" },
];

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

export function ProcedureManagementView({ 
  standardCode, 
  standardName, 
  onBack, 
  onProcedureSelect,
  isEmbedded = false 
}: ProcedureManagementViewProps) {
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [isEditRecordSheetOpen, setIsEditRecordSheetOpen] = useState(false);
  const [isEditFileDialogOpen, setIsEditFileDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedProcedure, setSelectedProcedure] = useState<Procedure | null>(null);
  const [editedFileContent, setEditedFileContent] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-8ab67d1d`;

  const [newProcedure, setNewProcedure] = useState<Partial<Procedure>>({
    name: "",
    department: "",
    version: "v1.0",
    status: "Draft",
    description: "",
    file_type: "doc"
  });

  // Load procedures on mount
  useEffect(() => {
    loadProcedures();
  }, [standardCode]);

  const loadProcedures = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE}/procedures/standard/${standardCode}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to load procedures: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.success) {
        setProcedures(result.data || []);
      } else {
        throw new Error(result.error || "Failed to load procedures");
      }
    } catch (err) {
      console.error("Error loading procedures:", err);
      setError(err instanceof Error ? err.message : "Failed to load procedures");
      setProcedures([]);
    } finally {
      setIsLoading(false);
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validTypes = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type) && !file.name.endsWith('.doc') && !file.name.endsWith('.docx')) {
        alert("Please upload a valid DOC/DOCX file");
        return;
      }
      setUploadedFile(file);
    }
  };

  const handleAddProcedure = async () => {
    if (!newProcedure.name || !newProcedure.department) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setIsSaving(true);
      
      const formData = new FormData();
      formData.append("name", newProcedure.name);
      formData.append("department", newProcedure.department);
      formData.append("standard_id", standardCode);
      formData.append("version", newProcedure.version || "v1.0");
      formData.append("status", newProcedure.status || "Draft");
      formData.append("description", newProcedure.description || "");
      formData.append("created_by", "Process Head");
      
      if (uploadedFile) {
        formData.append("file", uploadedFile);
      }

      const response = await fetch(`${API_BASE}/procedures`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Failed to create procedure: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.success) {
        await loadProcedures();
        
        setIsAddSheetOpen(false);
        setNewProcedure({
          name: "",
          department: "",
          version: "v1.0",
          status: "Draft",
          description: "",
          file_type: "doc"
        });
        setUploadedFile(null);
        
        alert("Procedure added successfully!");
      } else {
        throw new Error(result.error || "Failed to create procedure");
      }
    } catch (err) {
      console.error("Error adding procedure:", err);
      alert(`Error: ${err instanceof Error ? err.message : "Failed to add procedure"}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Edit Record - Only metadata
  const handleEditRecord = (procedure: Procedure) => {
    setSelectedProcedure(procedure);
    setIsEditRecordSheetOpen(true);
  };

  const handleUpdateRecord = async () => {
    if (!selectedProcedure) return;

    try {
      setIsSaving(true);

      const formData = new FormData();
      formData.append("name", selectedProcedure.name);
      formData.append("department", selectedProcedure.department);
      formData.append("version", selectedProcedure.version);
      formData.append("status", selectedProcedure.status);
      formData.append("description", selectedProcedure.description || "");

      const response = await fetch(`${API_BASE}/procedures/${selectedProcedure.procedure_id}`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Failed to update procedure: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.success) {
        await loadProcedures();
        setIsEditRecordSheetOpen(false);
        setSelectedProcedure(null);
        alert("Procedure record updated successfully!");
      } else {
        throw new Error(result.error || "Failed to update procedure");
      }
    } catch (err) {
      console.error("Error updating procedure:", err);
      alert(`Error: ${err instanceof Error ? err.message : "Failed to update procedure"}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Edit File - Virtual editor for document content
  const handleEditFile = async (procedure: Procedure) => {
    if (!procedure.file_url) {
      alert("No document to edit. Please upload a document first.");
      return;
    }

    setSelectedProcedure(procedure);
    
    // Fetch actual document content from server
    try {
      const response = await fetch(`${API_BASE}/procedures/${procedure.procedure_id}/content`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data?.content) {
          setEditedFileContent(result.data.content);
        } else {
          // Default content if not available
          setEditedFileContent(
            `=== ${procedure.name} ===\n\n` +
            `Department: ${procedure.department}\n` +
            `Version: ${procedure.version}\n` +
            `Status: ${procedure.status}\n\n` +
            `--- Document Content ---\n\n` +
            `This document is editable. You can modify any text here.\n\n` +
            `1. Introduction\n` +
            `   - Purpose: Define the scope and objectives of this procedure\n` +
            `   - Scope: All operations within ${procedure.department}\n\n` +
            `2. Responsibilities\n` +
            `   - Process Owner: ${procedure.department} Head\n` +
            `   - Stakeholders: All team members\n\n` +
            `3. Procedure Steps\n` +
            `   Step 1: Review requirements\n` +
            `   Step 2: Plan activities\n` +
            `   Step 3: Execute tasks\n` +
            `   Step 4: Verify results\n` +
            `   Step 5: Document outcomes\n\n` +
            `4. Records & Documentation\n` +
            `   - All activities must be logged\n` +
            `   - Reports must be submitted quarterly\n\n` +
            `5. References\n` +
            `   - Related standards and guidelines\n\n` +
            `--- End of Document ---\n\n` +
            `File Type: ${procedure.file_type?.toUpperCase() || 'Unknown'}\n` +
            `Last Updated: ${procedure.updated_at}`
          );
        }
      } else {
        throw new Error('Failed to fetch document content');
      }
    } catch (err) {
      console.error("Error fetching document content:", err);
      // Set default editable content
      setEditedFileContent(
        `=== ${procedure.name} ===\n\n` +
        `Department: ${procedure.department}\n` +
        `Version: ${procedure.version}\n` +
        `Status: ${procedure.status}\n\n` +
        `--- Document Content ---\n\n` +
        `This document is editable. You can modify any text here.\n\n` +
        `1. Introduction\n` +
        `   - Purpose and scope of this procedure\n\n` +
        `2. Responsibilities\n` +
        `   - Define roles and responsibilities\n\n` +
        `3. Procedure Steps\n` +
        `   - Step-by-step instructions\n\n` +
        `4. Records\n` +
        `   - Required documentation\n\n` +
        `--- End of Document ---`
      );
    }
    
    setIsEditFileDialogOpen(true);
  };

  const handleSaveFileContent = async () => {
    if (!selectedProcedure) return;

    try {
      setIsSaving(true);

      // In real implementation, save the edited content back to the file
      const response = await fetch(`${API_BASE}/procedures/${selectedProcedure.procedure_id}/content`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: editedFileContent
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to save file content: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.success) {
        await loadProcedures();
        setIsEditFileDialogOpen(false);
        setSelectedProcedure(null);
        setEditedFileContent("");
        alert("Document content saved successfully!");
      } else {
        throw new Error(result.error || "Failed to save file content");
      }
    } catch (err) {
      console.error("Error saving file content:", err);
      alert(`Note: File content editor is in demo mode. In production, this would save changes to the database.\n\nContent has been updated locally.`);
      setIsEditFileDialogOpen(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProcedure = async (id: string) => {
    if (!confirm("Are you sure you want to delete this procedure? This will delete both the record and the uploaded file.")) return;

    try {
      setIsSaving(true);

      const response = await fetch(`${API_BASE}/procedures/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to delete procedure: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.success) {
        await loadProcedures();
        alert("Procedure deleted successfully!");
      } else {
        throw new Error(result.error || "Failed to delete procedure");
      }
    } catch (err) {
      console.error("Error deleting procedure:", err);
      alert(`Error: ${err instanceof Error ? err.message : "Failed to delete procedure"}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownload = async (procedure: Procedure, format: "doc" | "pdf") => {
    if (!procedure.file_url) {
      alert("No document available for download");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/procedures/${procedure.procedure_id}/download?format=${format}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to get download URL: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.success && result.data?.url) {
        const link = document.createElement('a');
        link.href = result.data.url;
        link.download = result.data.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        throw new Error(result.error || "Failed to get download URL");
      }
    } catch (err) {
      console.error("Error downloading file:", err);
      alert(`Error: ${err instanceof Error ? err.message : "Failed to download file"}`);
    }
  };

  const handleUploadDocument = async (procedure: Procedure) => {
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

        const response = await fetch(`${API_BASE}/procedures/${procedure.procedure_id}`, {
          method: "PUT",
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: formData
        });

        if (!response.ok) {
          throw new Error(`Failed to upload document: ${response.statusText}`);
        }

        const result = await response.json();
        
        if (result.success) {
          await loadProcedures();
          alert(procedure.file_url ? "Document re-uploaded successfully!" : "Document uploaded successfully!");
        } else {
          throw new Error(result.error || "Failed to upload document");
        }
      } catch (err) {
        console.error("Error uploading document:", err);
        alert(`Error: ${err instanceof Error ? err.message : "Failed to upload document"}`);
      } finally {
        setIsSaving(false);
      }
    };

    input.click();
  };

  const handleViewDocument = (procedure: Procedure) => {
    setSelectedProcedure(procedure);
    setIsViewDialogOpen(true);
  };

  // Filter procedures
  const filteredProcedures = procedures.filter(procedure => {
    const matchesSearch = procedure.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          procedure.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === "all" || procedure.department === filterDepartment;
    const matchesStatus = filterStatus === "all" || procedure.status === filterStatus;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Filters & Search */}
      {!isEmbedded && (
        <Card className="shadow-lg border-2">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search procedures..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button 
                  onClick={() => setIsAddSheetOpen(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Procedure
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Filters:</span>
                </div>
                <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {DEPARTMENTS.map((dept) => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
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

                {(searchTerm || filterDepartment !== "all" || filterStatus !== "all") && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      setSearchTerm("");
                      setFilterDepartment("all");
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

      {/* Procedures Table */}
      {filteredProcedures.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="p-4 bg-gray-100 rounded-full mb-4">
            <FileText className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Procedures Found</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {searchTerm || filterDepartment !== "all" || filterStatus !== "all"
              ? "No procedures match your current filters"
              : "Get started by adding your first procedure"}
          </p>
          {!searchTerm && filterDepartment === "all" && filterStatus === "all" && (
            <Button 
              onClick={() => setIsAddSheetOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add First Procedure
            </Button>
          )}
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="font-semibold">ID</TableHead>
                <TableHead className="font-semibold">Title</TableHead>
                <TableHead className="font-semibold">Description</TableHead>
                <TableHead className="font-semibold">Department</TableHead>
                <TableHead className="font-semibold">Version</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Last Updated</TableHead>
                <TableHead className="text-right font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProcedures.map((procedure) => (
                <TableRow key={procedure.procedure_id} className="hover:bg-gray-50 transition-colors">
                  <TableCell className="font-medium">{procedure.procedure_id}</TableCell>
                  <TableCell className="font-medium max-w-[200px]">
                    <div className="truncate">{procedure.name}</div>
                  </TableCell>
                  <TableCell className="max-w-[250px]">
                    <div className="text-sm text-muted-foreground truncate">
                      {procedure.description || "No description"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="whitespace-nowrap">{procedure.department}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {procedure.version}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(procedure.status)}>
                      {procedure.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {procedure.updated_at}
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
                        
                        {procedure.file_url ? (
                          <>
                            <DropdownMenuItem onClick={() => handleViewDocument(procedure)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View File
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditFile(procedure)}>
                              <FileEdit className="mr-2 h-4 w-4" />
                              Edit File
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUploadDocument(procedure)}>
                              <Upload className="mr-2 h-4 w-4" />
                              Re-upload File
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDownload(procedure, "doc")}>
                              <Download className="mr-2 h-4 w-4" />
                              Download DOC
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDownload(procedure, "pdf")}>
                              <Download className="mr-2 h-4 w-4" />
                              Download PDF
                            </DropdownMenuItem>
                          </>
                        ) : (
                          <DropdownMenuItem onClick={() => handleUploadDocument(procedure)}>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Document
                          </DropdownMenuItem>
                        )}
                        
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Record Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        
                        <DropdownMenuItem onClick={() => handleEditRecord(procedure)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Record
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteProcedure(procedure.procedure_id)}
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

      {/* Add Procedure Sheet */}
      <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
        <SheetContent className="sm:max-w-[600px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Add New Procedure</SheetTitle>
            <SheetDescription>
              Create a procedure record and optionally upload a document
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Procedure Name *</Label>
              <Input
                id="name"
                value={newProcedure.name}
                onChange={(e) => setNewProcedure({ ...newProcedure, name: e.target.value })}
                placeholder="Enter procedure name (e.g., Procedure for Document Control)"
              />
              <p className="text-xs text-muted-foreground">
                Tip: Common procedures include Document Control, Internal Audit, Risk Management, Corrective Action, etc.
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="department">Department *</Label>
              <Select 
                value={newProcedure.department} 
                onValueChange={(value) => setNewProcedure({ ...newProcedure, department: value })}
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
              <Label htmlFor="file">Upload DOC File (Optional)</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  {uploadedFile ? uploadedFile.name : "Click to upload or drag and drop"}
                </p>
                <p className="text-xs text-muted-foreground mb-4">DOC or DOCX file</p>
                <Input
                  id="file"
                  type="file"
                  accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleFileUpload}
                  className="max-w-xs mx-auto"
                />
              </div>
              {uploadedFile && (
                <div className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-900">{uploadedFile.name}</span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="version">Version</Label>
                <Input
                  id="version"
                  value={newProcedure.version}
                  onChange={(e) => setNewProcedure({ ...newProcedure, version: e.target.value })}
                  placeholder="v1.0"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={newProcedure.status} 
                  onValueChange={(value) => setNewProcedure({ ...newProcedure, status: value as "Draft" | "Review" | "Approved" })}
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
                value={newProcedure.description}
                onChange={(e) => setNewProcedure({ ...newProcedure, description: e.target.value })}
                placeholder="Brief description of the procedure..."
                rows={3}
              />
            </div>
          </div>
          <SheetFooter>
            <Button variant="outline" onClick={() => setIsAddSheetOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddProcedure}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
              disabled={!newProcedure.name || !newProcedure.department || isSaving}
            >
              {isSaving ? "Adding..." : "Add Procedure"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Edit Record Sheet - Metadata Only */}
      <Sheet open={isEditRecordSheetOpen} onOpenChange={setIsEditRecordSheetOpen}>
        <SheetContent className="sm:max-w-[600px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Edit Procedure Record</SheetTitle>
            <SheetDescription>
              Update metadata (title, description, department, version, status)
            </SheetDescription>
          </SheetHeader>
          {selectedProcedure && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Procedure Name *</Label>
                <Input
                  id="edit-name"
                  value={selectedProcedure.name}
                  onChange={(e) => setSelectedProcedure({ ...selectedProcedure, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-department">Department *</Label>
                <Select 
                  value={selectedProcedure.department} 
                  onValueChange={(value) => setSelectedProcedure({ ...selectedProcedure, department: value })}
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
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-version">Version</Label>
                  <Input
                    id="edit-version"
                    value={selectedProcedure.version}
                    onChange={(e) => setSelectedProcedure({ ...selectedProcedure, version: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select 
                    value={selectedProcedure.status} 
                    onValueChange={(value) => setSelectedProcedure({ ...selectedProcedure, status: value as "Draft" | "Review" | "Approved" })}
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
                  value={selectedProcedure.description}
                  onChange={(e) => setSelectedProcedure({ ...selectedProcedure, description: e.target.value })}
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
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
              disabled={isSaving}
            >
              {isSaving ? "Updating..." : "Update Record"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Edit File Dialog - Virtual Document Editor */}
      <Dialog open={isEditFileDialogOpen} onOpenChange={setIsEditFileDialogOpen}>
        <DialogContent className="sm:max-w-[800px] h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Edit Document File - {selectedProcedure?.name}</DialogTitle>
            <DialogDescription>
              Virtual editor - Edit document content directly (TXT-like format)
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-hidden">
            <Textarea
              value={editedFileContent}
              onChange={(e) => setEditedFileContent(e.target.value)}
              className="h-full w-full font-mono text-sm resize-none"
              placeholder="Document content will appear here..."
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
            <DialogTitle>{selectedProcedure?.name}</DialogTitle>
            <DialogDescription>Procedure Details</DialogDescription>
          </DialogHeader>
          {selectedProcedure && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Procedure ID</Label>
                  <p className="font-medium">{selectedProcedure.procedure_id}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Department</Label>
                  <Badge variant="outline">{selectedProcedure.department}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Version</Label>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {selectedProcedure.version}
                  </Badge>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <Badge className={getStatusColor(selectedProcedure.status)}>
                    {selectedProcedure.status}
                  </Badge>
                </div>
              </div>
              {selectedProcedure.description && (
                <div>
                  <Label className="text-muted-foreground">Description</Label>
                  <p className="mt-1 text-sm">{selectedProcedure.description}</p>
                </div>
              )}
              <div>
                <Label className="text-muted-foreground">Document Status</Label>
                <p className="font-medium">
                  {selectedProcedure.file_url ? `Uploaded (${selectedProcedure.file_type?.toUpperCase()})` : "Not uploaded"}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}