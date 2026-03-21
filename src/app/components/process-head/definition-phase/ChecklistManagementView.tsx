import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Progress } from "@/app/components/ui/progress";
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
import { Plus, ListChecks, Users, CheckCircle } from "lucide-react";

interface Checklist {
  checklistId: string;
  checklistName: string;
  linkedStandard: string;
  department: string;
  checklistOwner: string;
  totalItems: number;
  completedItems: number;
  completionStatus: number;
}

export function ChecklistManagementView() {
  const [checklists, setChecklists] = useState<Checklist[]>([
    {
      checklistId: "CL001",
      checklistName: "ISO 27001 Implementation Checklist",
      linkedStandard: "ISO 27001",
      department: "IT",
      checklistOwner: "John Smith",
      totalItems: 20,
      completedItems: 15,
      completionStatus: 75
    },
    {
      checklistId: "CL002",
      checklistName: "Quality Management System Checklist",
      linkedStandard: "ISO 9001",
      department: "Quality",
      checklistOwner: "Sarah Johnson",
      totalItems: 15,
      completedItems: 15,
      completionStatus: 100
    },
    {
      checklistId: "CL003",
      checklistName: "GDPR Compliance Checklist",
      linkedStandard: "GDPR",
      department: "Legal",
      checklistOwner: "Mike Wilson",
      totalItems: 25,
      completedItems: 10,
      completionStatus: 40
    }
  ]);

  const getCompletionColor = (percentage: number) => {
    if (percentage === 100) return "bg-green-500";
    if (percentage >= 70) return "bg-blue-500";
    if (percentage >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Checklist Management</h2>
            <p className="text-white/90 mt-1">Manage checklist structures and track checklist completion</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-white text-teal-600 hover:bg-teal-50">
                <Plus className="h-4 w-4 mr-2" />
                Create Checklist
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Checklist</DialogTitle>
                <DialogDescription>Create a new compliance checklist structure</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Checklist Name</Label>
                  <Input id="name" placeholder="Enter checklist name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="standard">Linked Standard</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select standard" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="iso27001">ISO 27001</SelectItem>
                        <SelectItem value="iso9001">ISO 9001</SelectItem>
                        <SelectItem value="gdpr">GDPR</SelectItem>
                        <SelectItem value="hipaa">HIPAA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dept">Department</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="it">IT</SelectItem>
                        <SelectItem value="hr">HR</SelectItem>
                        <SelectItem value="quality">Quality</SelectItem>
                        <SelectItem value="legal">Legal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="owner">Checklist Owner</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select owner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john">John Smith</SelectItem>
                      <SelectItem value="sarah">Sarah Johnson</SelectItem>
                      <SelectItem value="mike">Mike Wilson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button className="bg-gradient-to-r from-teal-500 to-blue-500 text-white">Create Checklist</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{checklists.length}</div>
            <p className="text-sm text-white/80 mt-1">Total Checklists</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{checklists.filter(c => c.completionStatus === 100).length}</div>
            <p className="text-sm text-white/80 mt-1">Completed</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{checklists.reduce((sum, c) => sum + c.totalItems, 0)}</div>
            <p className="text-sm text-white/80 mt-1">Total Items</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">
              {Math.round(checklists.reduce((sum, c) => sum + c.completionStatus, 0) / checklists.length)}%
            </div>
            <p className="text-sm text-white/80 mt-1">Average Completion</p>
          </CardContent>
        </Card>
      </div>

      {/* Checklists Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Checklists Overview</CardTitle>
              <CardDescription>Showing {checklists.length} checklists</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Checklist Name</TableHead>
                <TableHead>Standard</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {checklists.map((checklist) => (
                <TableRow key={checklist.checklistId}>
                  <TableCell className="font-medium">{checklist.checklistId}</TableCell>
                  <TableCell className="font-medium">{checklist.checklistName}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{checklist.linkedStandard}</Badge>
                  </TableCell>
                  <TableCell>{checklist.department}</TableCell>
                  <TableCell>{checklist.checklistOwner}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Progress value={checklist.completionStatus} className="h-2" />
                        <span className="text-sm font-medium">{checklist.completionStatus}%</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getCompletionColor(checklist.completionStatus)}>
                      {checklist.completedItems}/{checklist.totalItems}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <ListChecks className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Users className="h-4 w-4" />
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
