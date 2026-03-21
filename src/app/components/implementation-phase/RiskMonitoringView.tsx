import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
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
import { Plus, Edit, UserPlus, XCircle, Shield } from "lucide-react";
import { PieChart as RechartsPieChart, Pie as RechartsPie, Cell as RechartsCell, ResponsiveContainer as RechartsResponsiveContainer, Legend, Tooltip } from "recharts";

interface Risk {
  riskId: string;
  riskTitle: string;
  riskCategory: "Schedule Delay" | "Resource Availability" | "Technical Risk" | "Compliance Risk";
  description: string;
  impactLevel: "Critical" | "High" | "Medium" | "Low";
  probabilityLevel: "Very High" | "High" | "Medium" | "Low";
  riskScore: number;
  owner: string;
  mitigationPlan: string;
  status: "Open" | "Monitoring" | "Mitigated" | "Closed";
}

export function RiskMonitoringView() {
  const [risks, setRisks] = useState<Risk[]>([
    {
      riskId: "RISK001",
      riskTitle: "Project Timeline Delay",
      riskCategory: "Schedule Delay",
      description: "Risk of project completion delay due to resource constraints",
      impactLevel: "High",
      probabilityLevel: "Medium",
      riskScore: 15,
      owner: "John Smith",
      mitigationPlan: "Allocate additional resources and adjust timeline",
      status: "Monitoring"
    },
    {
      riskId: "RISK002",
      riskTitle: "Key Personnel Unavailability",
      riskCategory: "Resource Availability",
      description: "Risk of key team members being unavailable during critical project phases",
      impactLevel: "Critical",
      probabilityLevel: "Low",
      riskScore: 12,
      owner: "Sarah Johnson",
      mitigationPlan: "Cross-train team members and document critical knowledge",
      status: "Monitoring"
    },
    {
      riskId: "RISK003",
      riskTitle: "System Integration Failure",
      riskCategory: "Technical Risk",
      description: "Risk of integration issues between new compliance system and existing infrastructure",
      impactLevel: "High",
      probabilityLevel: "High",
      riskScore: 20,
      owner: "Mike Wilson",
      mitigationPlan: "Conduct thorough integration testing and maintain rollback plan",
      status: "Open"
    },
    {
      riskId: "RISK004",
      riskTitle: "Regulatory Changes During Implementation",
      riskCategory: "Compliance Risk",
      description: "Risk of regulatory requirements changing during project implementation",
      impactLevel: "Medium",
      probabilityLevel: "Medium",
      riskScore: 9,
      owner: "Emily Davis",
      mitigationPlan: "Monitor regulatory updates and maintain flexible implementation approach",
      status: "Mitigated"
    }
  ]);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Critical": return "bg-red-600";
      case "High": return "bg-orange-500";
      case "Medium": return "bg-yellow-500";
      case "Low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "bg-red-500";
      case "Monitoring": return "bg-yellow-500";
      case "Mitigated": return "bg-green-500";
      case "Closed": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score >= 16) return "bg-red-600";
    if (score >= 10) return "bg-orange-500";
    if (score >= 5) return "bg-yellow-500";
    return "bg-green-500";
  };

  const riskByCategory = [
    { id: "schedule", name: "Schedule Delay", value: risks.filter(r => r.riskCategory === "Schedule Delay").length, color: "#ef4444" },
    { id: "resource", name: "Resource", value: risks.filter(r => r.riskCategory === "Resource Availability").length, color: "#f59e0b" },
    { id: "technical", name: "Technical", value: risks.filter(r => r.riskCategory === "Technical Risk").length, color: "#3b82f6" },
    { id: "compliance", name: "Compliance", value: risks.filter(r => r.riskCategory === "Compliance Risk").length, color: "#8b5cf6" }
  ];

  const handleAddRisk = () => {
    console.log("Add risk functionality");
    // Implementation for adding risk
  };

  const handleEditRisk = (riskId: string) => {
    console.log("Edit risk:", riskId);
    // Implementation for editing risk
  };

  const handleAssignOwner = (riskId: string) => {
    console.log("Assign owner to risk:", riskId);
    // Implementation for assigning owner
  };

  const handleMitigateRisk = (riskId: string) => {
    if (confirm(`Are you sure you want to mitigate risk ${riskId}?`)) {
      setRisks(risks.map(risk => 
        risk.riskId === riskId ? { ...risk, status: "Mitigated" } : risk
      ));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Risk Management</h2>
            <p className="text-white/90 mt-1">Manage risk assessment and monitoring data for all procedures</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-white text-orange-600 hover:bg-orange-50">
                <Plus className="h-4 w-4 mr-2" />
                Add Risk
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Risk</DialogTitle>
                <DialogDescription>Identify and document a new project risk</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="riskTitle">Risk Title</Label>
                  <Input id="riskTitle" placeholder="Enter risk title" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Risk Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="schedule">Schedule Delay</SelectItem>
                        <SelectItem value="resource">Resource Availability</SelectItem>
                        <SelectItem value="technical">Technical Risk</SelectItem>
                        <SelectItem value="compliance">Compliance Risk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="owner">Risk Owner</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select owner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john">John Smith</SelectItem>
                        <SelectItem value="sarah">Sarah Johnson</SelectItem>
                        <SelectItem value="mike">Mike Wilson</SelectItem>
                        <SelectItem value="emily">Emily Davis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe the risk" rows={3} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="impact">Impact Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select impact" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="probability">Probability Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select probability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="veryhigh">Very High</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mitigation">Mitigation Plan</Label>
                  <Textarea id="mitigation" placeholder="Describe mitigation strategies" rows={3} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button className="bg-gradient-to-r from-orange-500 to-red-500 text-white">Add Risk</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{risks.length}</div>
            <p className="text-sm text-white/80 mt-1">Total Risks</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-red-500 to-orange-500 text-white">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{risks.filter(r => r.status === "Open").length}</div>
            <p className="text-sm text-white/80 mt-1">Open Risks</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{risks.filter(r => r.status === "Monitoring").length}</div>
            <p className="text-sm text-white/80 mt-1">Monitoring</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{risks.filter(r => r.status === "Mitigated").length}</div>
            <p className="text-sm text-white/80 mt-1">Mitigated</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-red-600 to-pink-600 text-white">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{risks.filter(r => r.impactLevel === "Critical").length}</div>
            <p className="text-sm text-white/80 mt-1">Critical</p>
          </CardContent>
        </Card>
      </div>

      {/* Risk Distribution Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Distribution by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <RechartsResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <RechartsPie
                  data={riskByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {riskByCategory.map((entry, index) => (
                    <RechartsCell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </RechartsPie>
                <Tooltip />
                <Legend />
              </RechartsPieChart>
            </RechartsResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Risks Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Risk Register</CardTitle>
              <CardDescription>Showing {risks.length} identified risks</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Risk ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Impact</TableHead>
                <TableHead>Probability</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {risks.map((risk) => (
                <TableRow key={risk.riskId}>
                  <TableCell className="font-medium">{risk.riskId}</TableCell>
                  <TableCell className="font-medium">{risk.riskTitle}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{risk.riskCategory}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getImpactColor(risk.impactLevel)}>{risk.impactLevel}</Badge>
                  </TableCell>
                  <TableCell>{risk.probabilityLevel}</TableCell>
                  <TableCell>
                    <Badge className={getRiskScoreColor(risk.riskScore)}>{risk.riskScore}</Badge>
                  </TableCell>
                  <TableCell>{risk.owner}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(risk.status)}>{risk.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditRisk(risk.riskId)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleAssignOwner(risk.riskId)}>
                        <UserPlus className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleMitigateRisk(risk.riskId)}>
                        <XCircle className="h-4 w-4" />
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