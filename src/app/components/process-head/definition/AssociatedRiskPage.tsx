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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  AlertTriangle,
  Plus,
  X,
  Link,
  ShieldAlert,
} from "lucide-react";

type Severity = "low" | "medium" | "high";

interface Risk {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  mitigationPlan: string;
  linkedTo: string;
  linkedType: "template" | "task";
}

const mockRisks: Risk[] = [
  {
    id: "r1",
    title: "Data breach through unauthorized access",
    description: "Risk of sensitive data exposure due to weak access controls",
    severity: "high",
    mitigationPlan: "Implement MFA across all systems and conduct quarterly access reviews",
    linkedTo: "Risk Register Template",
    linkedType: "template",
  },
  {
    id: "r2",
    title: "Non-compliance with audit requirements",
    description: "Failure to meet ISO 9001 audit documentation standards",
    severity: "medium",
    mitigationPlan: "Schedule monthly documentation reviews and assign audit preparation tasks",
    linkedTo: "Complete ISO 9001 audit preparation",
    linkedType: "task",
  },
  {
    id: "r3",
    title: "Vendor service disruption",
    description: "Critical vendor failing to deliver services as per SLA",
    severity: "medium",
    mitigationPlan: "Maintain backup vendor agreements and conduct quarterly vendor performance reviews",
    linkedTo: "Vendor Evaluation Template",
    linkedType: "template",
  },
  {
    id: "r4",
    title: "Incident response delay",
    description: "Slow response time to security incidents due to unclear procedures",
    severity: "high",
    mitigationPlan: "Conduct bi-annual incident response drills and update response playbooks",
    linkedTo: "File incident report for server outage",
    linkedType: "task",
  },
  {
    id: "r5",
    title: "Process deviation in manufacturing",
    description: "Minor deviations from standard operating procedures",
    severity: "low",
    mitigationPlan: "Implement automated process monitoring and regular staff training",
    linkedTo: "CAPA Form Template",
    linkedType: "template",
  },
  {
    id: "r6",
    title: "Document version control failure",
    description: "Risk of using outdated documents due to poor version management",
    severity: "low",
    mitigationPlan: "Deploy document management system with version tracking and automated alerts",
    linkedTo: "Update risk register entries",
    linkedType: "task",
  },
];

const mockLinkedItems = {
  template: [
    "Audit Report Template",
    "CAPA Form Template",
    "Risk Register Template",
    "Incident Report Template",
    "Vendor Evaluation Template",
  ],
  task: [
    "Complete ISO 9001 audit preparation",
    "Update risk register entries",
    "File incident report for server outage",
    "Vendor quarterly assessment",
    "Submit CAPA for process deviation",
  ],
};

function getSeverityBadge(severity: Severity) {
  const config: Record<Severity, { className: string; label: string }> = {
    high: { className: "bg-red-100 text-red-800 border-red-300", label: "High" },
    medium: { className: "bg-amber-100 text-amber-800 border-amber-300", label: "Medium" },
    low: { className: "bg-green-100 text-green-800 border-green-300", label: "Low" },
  };
  const c = config[severity];
  return <Badge variant="outline" className={c.className}>{c.label}</Badge>;
}

function AssociatedRiskPage() {
  const [risks, setRisks] = useState<Risk[]>(mockRisks);
  const [showForm, setShowForm] = useState(false);
  const [newRisk, setNewRisk] = useState({
    title: "",
    description: "",
    severity: "medium" as Severity,
    mitigationPlan: "",
    linkedTo: "",
    linkedType: "template" as "template" | "task",
  });

  const handleCreate = () => {
    if (!newRisk.title.trim()) return;
    const risk: Risk = {
      id: `r-${Date.now()}`,
      title: newRisk.title,
      description: newRisk.description,
      severity: newRisk.severity,
      mitigationPlan: newRisk.mitigationPlan,
      linkedTo: newRisk.linkedTo || "Unlinked",
      linkedType: newRisk.linkedType,
    };
    setRisks([risk, ...risks]);
    setNewRisk({ title: "", description: "", severity: "medium", mitigationPlan: "", linkedTo: "", linkedType: "template" });
    setShowForm(false);
  };

  const severityCounts = {
    high: risks.filter((r) => r.severity === "high").length,
    medium: risks.filter((r) => r.severity === "medium").length,
    low: risks.filter((r) => r.severity === "low").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Associated Risks</h1>
          <p className="text-muted-foreground mt-1">
            Map and manage risks linked to templates and tasks with mitigation plans.
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? (
            <>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Add Risk
            </>
          )}
        </Button>
      </div>

      {/* Severity Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-red-200">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">High Severity</p>
              <p className="text-2xl font-bold text-red-600">{severityCounts.high}</p>
            </div>
            <ShieldAlert className="h-8 w-8 text-red-400" />
          </CardContent>
        </Card>
        <Card className="border-amber-200">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Medium Severity</p>
              <p className="text-2xl font-bold text-amber-600">{severityCounts.medium}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-amber-400" />
          </CardContent>
        </Card>
        <Card className="border-green-200">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Low Severity</p>
              <p className="text-2xl font-bold text-green-600">{severityCounts.low}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-green-400" />
          </CardContent>
        </Card>
      </div>

      {/* Add Risk Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Add New Risk</CardTitle>
            <CardDescription>Define the risk details and link it to a template or task.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Risk Title *</label>
                <Input
                  placeholder="Enter risk title"
                  value={newRisk.title}
                  onChange={(e) => setNewRisk({ ...newRisk, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Severity</label>
                <Select value={newRisk.severity} onValueChange={(v) => setNewRisk({ ...newRisk, severity: v as Severity })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Description</label>
                <Input
                  placeholder="Describe the risk"
                  value={newRisk.description}
                  onChange={(e) => setNewRisk({ ...newRisk, description: e.target.value })}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Mitigation Plan</label>
                <Input
                  placeholder="Describe the mitigation strategy"
                  value={newRisk.mitigationPlan}
                  onChange={(e) => setNewRisk({ ...newRisk, mitigationPlan: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Link Type</label>
                <Select value={newRisk.linkedType} onValueChange={(v) => setNewRisk({ ...newRisk, linkedType: v as "template" | "task", linkedTo: "" })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="template">Template</SelectItem>
                    <SelectItem value="task">Task</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Link To</label>
                <Select value={newRisk.linkedTo} onValueChange={(v) => setNewRisk({ ...newRisk, linkedTo: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select item" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockLinkedItems[newRisk.linkedType].map((item) => (
                      <SelectItem key={item} value={item}>{item}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button onClick={handleCreate}>Add Risk</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Risk Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Risk Register</CardTitle>
          <CardDescription>{risks.length} risk(s) identified</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Risk Title</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Mitigation Plan</TableHead>
                <TableHead>Linked To</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {risks.map((risk) => (
                <TableRow key={risk.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{risk.title}</p>
                      <p className="text-xs text-muted-foreground">{risk.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getSeverityBadge(risk.severity)}</TableCell>
                  <TableCell className="text-sm max-w-xs">{risk.mitigationPlan}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <Link className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm">{risk.linkedTo}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="capitalize">{risk.linkedType}</Badge>
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

export default AssociatedRiskPage;
