"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import {
  Shield,
  Lock,
  Settings,
  FileText,
  LayoutTemplate,
  CheckSquare,
  Upload,
  Download,
  Eye,
  Pencil,
  Plus,
  Trash2,
  ArrowLeft,
} from "lucide-react";

type Standard = "qms" | "isms" | "custom";
type StandardType = "procedures" | "templates" | "checklist";

interface Procedure {
  id: string;
  fileName: string;
  standard: string;
  status: "draft" | "approved" | "in-review";
  uploadedAt: string;
}

interface Template {
  id: string;
  name: string;
  standard: string;
  fields: number;
  status: "active" | "draft" | "archived";
  createdAt: string;
}

interface ChecklistItem {
  id: string;
  title: string;
  linkedTo: string;
  linkedType: string;
  items: number;
  completed: number;
  status: "complete" | "in-progress" | "not-started";
}

const mockProcedures: Record<Standard, Procedure[]> = {
  qms: [
    { id: "p1", fileName: "Document Control Procedure.pdf", standard: "ISO 9001", status: "approved", uploadedAt: "2026-03-10" },
    { id: "p2", fileName: "Internal Audit Procedure.docx", standard: "ISO 9001", status: "in-review", uploadedAt: "2026-03-15" },
    { id: "p3", fileName: "Corrective Action Procedure.pdf", standard: "ISO 9001", status: "draft", uploadedAt: "2026-03-18" },
    { id: "p4", fileName: "Management Review Procedure.pdf", standard: "ISO 9001", status: "approved", uploadedAt: "2026-03-05" },
  ],
  isms: [
    { id: "p5", fileName: "Risk Assessment Procedure.pdf", standard: "ISO 27001", status: "approved", uploadedAt: "2026-03-08" },
    { id: "p6", fileName: "Access Control Policy.docx", standard: "ISO 27001", status: "in-review", uploadedAt: "2026-03-12" },
    { id: "p7", fileName: "Incident Response Procedure.pdf", standard: "ISO 27001", status: "draft", uploadedAt: "2026-03-20" },
  ],
  custom: [
    { id: "p8", fileName: "Custom Compliance Procedure.pdf", standard: "Custom", status: "draft", uploadedAt: "2026-03-19" },
    { id: "p9", fileName: "Vendor Assessment Procedure.docx", standard: "Custom", status: "approved", uploadedAt: "2026-03-14" },
  ],
};

const mockTemplates: Record<Standard, Template[]> = {
  qms: [
    { id: "t1", name: "Audit Report Template", standard: "ISO 9001", fields: 12, status: "active", createdAt: "2026-03-01" },
    { id: "t2", name: "CAPA Form Template", standard: "ISO 9001", fields: 8, status: "active", createdAt: "2026-03-05" },
    { id: "t3", name: "Training Record Template", standard: "ISO 9001", fields: 6, status: "draft", createdAt: "2026-03-18" },
  ],
  isms: [
    { id: "t4", name: "Risk Register Template", standard: "ISO 27001", fields: 14, status: "active", createdAt: "2026-02-28" },
    { id: "t5", name: "Incident Report Template", standard: "ISO 27001", fields: 10, status: "draft", createdAt: "2026-03-16" },
  ],
  custom: [
    { id: "t6", name: "Vendor Evaluation Template", standard: "Custom", fields: 9, status: "active", createdAt: "2026-03-10" },
  ],
};

const mockChecklists: Record<Standard, ChecklistItem[]> = {
  qms: [
    { id: "c1", title: "Document Control Checklist", linkedTo: "Document Control Procedure", linkedType: "Procedure", items: 10, completed: 8, status: "in-progress" },
    { id: "c2", title: "Audit Preparation Checklist", linkedTo: "Audit Report Template", linkedType: "Template", items: 15, completed: 15, status: "complete" },
    { id: "c3", title: "Management Review Checklist", linkedTo: "Management Review Procedure", linkedType: "Procedure", items: 12, completed: 0, status: "not-started" },
  ],
  isms: [
    { id: "c4", title: "Access Review Checklist", linkedTo: "Access Control Policy", linkedType: "Policy", items: 8, completed: 5, status: "in-progress" },
    { id: "c5", title: "Incident Handling Checklist", linkedTo: "Incident Report Template", linkedType: "Template", items: 12, completed: 12, status: "complete" },
  ],
  custom: [
    { id: "c6", title: "Vendor Onboarding Checklist", linkedTo: "Vendor Assessment Procedure", linkedType: "Procedure", items: 7, completed: 3, status: "in-progress" },
  ],
};

const standardOptions = [
  { key: "qms" as Standard, label: "QMS", description: "Quality Management System (ISO 9001)", icon: Shield, color: "from-blue-500 to-blue-700" },
  { key: "isms" as Standard, label: "ISMS", description: "Information Security Management System (ISO 27001)", icon: Lock, color: "from-emerald-500 to-emerald-700" },
  { key: "custom" as Standard, label: "Custom Standard", description: "Define and manage your own standards", icon: Settings, color: "from-violet-500 to-violet-700" },
];

function getStatusBadge(status: string) {
  const map: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
    approved: { variant: "default", label: "Approved" },
    active: { variant: "default", label: "Active" },
    complete: { variant: "default", label: "Complete" },
    "in-review": { variant: "secondary", label: "In Review" },
    "in-progress": { variant: "secondary", label: "In Progress" },
    draft: { variant: "outline", label: "Draft" },
    archived: { variant: "destructive", label: "Archived" },
    "not-started": { variant: "outline", label: "Not Started" },
  };
  const config = map[status] || { variant: "outline" as const, label: status };
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

function ProceduresTab({ standard }: { standard: Standard }) {
  const [procedures, setProcedures] = useState(mockProcedures[standard]);
  const [newFileName, setNewFileName] = useState("");

  const handleUpload = () => {
    if (!newFileName.trim()) return;
    const standardLabel = standard === "qms" ? "ISO 9001" : standard === "isms" ? "ISO 27001" : "Custom";
    const newProc: Procedure = {
      id: `p-${Date.now()}`,
      fileName: newFileName,
      standard: standardLabel,
      status: "draft",
      uploadedAt: new Date().toISOString().split("T")[0],
    };
    setProcedures([newProc, ...procedures]);
    setNewFileName("");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Input
          placeholder="Enter file name to upload..."
          value={newFileName}
          onChange={(e) => setNewFileName(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={handleUpload} size="sm">
          <Upload className="h-4 w-4 mr-2" />
          Upload
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>File Name</TableHead>
            <TableHead>Standard</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Uploaded</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {procedures.map((proc) => (
            <TableRow key={proc.id}>
              <TableCell className="font-medium">{proc.fileName}</TableCell>
              <TableCell>{proc.standard}</TableCell>
              <TableCell>{getStatusBadge(proc.status)}</TableCell>
              <TableCell>{proc.uploadedAt}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function TemplatesTab({ standard }: { standard: Standard }) {
  const [templates, setTemplates] = useState(mockTemplates[standard]);
  const [showForm, setShowForm] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState("");
  const [newFieldCount, setNewFieldCount] = useState("");

  const handleCreate = () => {
    if (!newTemplateName.trim()) return;
    const standardLabel = standard === "qms" ? "ISO 9001" : standard === "isms" ? "ISO 27001" : "Custom";
    const newTemplate: Template = {
      id: `t-${Date.now()}`,
      name: newTemplateName,
      standard: standardLabel,
      fields: parseInt(newFieldCount) || 0,
      status: "draft",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setTemplates([newTemplate, ...templates]);
    setNewTemplateName("");
    setNewFieldCount("");
    setShowForm(false);
  };

  return (
    <div className="space-y-4">
      {showForm ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Create New Template</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              placeholder="Template name"
              value={newTemplateName}
              onChange={(e) => setNewTemplateName(e.target.value)}
            />
            <Input
              placeholder="Number of form fields"
              type="number"
              value={newFieldCount}
              onChange={(e) => setNewFieldCount(e.target.value)}
            />
            <div className="flex gap-2">
              <Button onClick={handleCreate} size="sm">Save Template</Button>
              <Button variant="outline" size="sm" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="flex items-center gap-3">
          <Button size="sm" onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Template
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload Template
          </Button>
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Template Name</TableHead>
            <TableHead>Standard</TableHead>
            <TableHead>Fields</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {templates.map((tmpl) => (
            <TableRow key={tmpl.id}>
              <TableCell className="font-medium">{tmpl.name}</TableCell>
              <TableCell>{tmpl.standard}</TableCell>
              <TableCell>{tmpl.fields}</TableCell>
              <TableCell>{getStatusBadge(tmpl.status)}</TableCell>
              <TableCell>{tmpl.createdAt}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <Button variant="ghost" size="sm">
                    <Pencil className="h-4 w-4" />
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
    </div>
  );
}

function ChecklistTab({ standard }: { standard: Standard }) {
  const [checklists, setChecklists] = useState(mockChecklists[standard]);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newLinkedTo, setNewLinkedTo] = useState("");
  const [newLinkedType, setNewLinkedType] = useState("");
  const [newItemCount, setNewItemCount] = useState("");

  const handleCreate = () => {
    if (!newTitle.trim()) return;
    const newChecklist: ChecklistItem = {
      id: `c-${Date.now()}`,
      title: newTitle,
      linkedTo: newLinkedTo || "Unlinked",
      linkedType: newLinkedType || "Procedure",
      items: parseInt(newItemCount) || 0,
      completed: 0,
      status: "not-started",
    };
    setChecklists([newChecklist, ...checklists]);
    setNewTitle("");
    setNewLinkedTo("");
    setNewLinkedType("");
    setNewItemCount("");
    setShowForm(false);
  };

  return (
    <div className="space-y-4">
      {showForm ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Create New Checklist</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Checklist title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
            <Input placeholder="Linked to (procedure/template/policy name)" value={newLinkedTo} onChange={(e) => setNewLinkedTo(e.target.value)} />
            <Input placeholder="Linked type (Procedure / Template / Policy / Guideline)" value={newLinkedType} onChange={(e) => setNewLinkedType(e.target.value)} />
            <Input placeholder="Number of items" type="number" value={newItemCount} onChange={(e) => setNewItemCount(e.target.value)} />
            <div className="flex gap-2">
              <Button onClick={handleCreate} size="sm">Create Checklist</Button>
              <Button variant="outline" size="sm" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button size="sm" onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Checklist
        </Button>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Checklist Title</TableHead>
            <TableHead>Linked To</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {checklists.map((cl) => (
            <TableRow key={cl.id}>
              <TableCell className="font-medium">{cl.title}</TableCell>
              <TableCell>{cl.linkedTo}</TableCell>
              <TableCell>{cl.linkedType}</TableCell>
              <TableCell>{cl.completed}/{cl.items}</TableCell>
              <TableCell>{getStatusBadge(cl.status)}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <Button variant="ghost" size="sm">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function Standards() {
  const [selectedStandard, setSelectedStandard] = useState<Standard | null>(null);
  const [selectedType, setSelectedType] = useState<StandardType | null>(null);

  if (!selectedStandard) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Standards & Procedures</h1>
          <p className="text-muted-foreground mt-1">
            Select a standard to manage its procedures, templates, and checklists.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {standardOptions.map((opt) => {
            const Icon = opt.icon;
            return (
              <Card
                key={opt.key}
                className={`cursor-pointer transition-transform duration-200 hover:scale-[1.02] bg-gradient-to-br ${opt.color} text-white border-0`}
                onClick={() => setSelectedStandard(opt.key)}
              >
                <CardContent className="p-6 text-center">
                  <Icon className="h-10 w-10 mx-auto mb-3 opacity-90" />
                  <h3 className="text-lg font-bold">{opt.label}</h3>
                  <p className="text-sm opacity-80 mt-1">{opt.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  const currentStandard = standardOptions.find((s) => s.key === selectedStandard)!;
  const CurrentIcon = currentStandard.icon;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => { setSelectedStandard(null); setSelectedType(null); }}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <div className="flex items-center gap-2">
          <CurrentIcon className="h-5 w-5" />
          <h1 className="text-2xl font-bold tracking-tight">{currentStandard.label}</h1>
        </div>
      </div>
      <p className="text-muted-foreground">{currentStandard.description}</p>

      <Tabs
        defaultValue="procedures"
        value={selectedType || "procedures"}
        onValueChange={(v) => setSelectedType(v as StandardType)}
      >
        <TabsList>
          <TabsTrigger value="procedures">
            <FileText className="h-4 w-4 mr-2" />
            Procedures
          </TabsTrigger>
          <TabsTrigger value="templates">
            <LayoutTemplate className="h-4 w-4 mr-2" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="checklist">
            <CheckSquare className="h-4 w-4 mr-2" />
            Checklist
          </TabsTrigger>
        </TabsList>

        <TabsContent value="procedures">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Procedures</CardTitle>
              <CardDescription>Upload, view, download, and edit procedure documents.</CardDescription>
            </CardHeader>
            <CardContent>
              <ProceduresTab standard={selectedStandard} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Templates</CardTitle>
              <CardDescription>Create, upload, and manage dynamic form templates.</CardDescription>
            </CardHeader>
            <CardContent>
              <TemplatesTab standard={selectedStandard} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checklist">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Checklists</CardTitle>
              <CardDescription>Create and assign checklists to procedures, templates, policies, or guidelines.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChecklistTab standard={selectedStandard} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Standards;
