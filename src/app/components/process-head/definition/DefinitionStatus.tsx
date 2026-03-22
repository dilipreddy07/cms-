import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";
import {
  FileText,
  Layers,
  ListChecks,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

const statusData = {
  procedures: { total: 24, completed: 18, inProgress: 4, pending: 2, percentage: 75 },
  templates: { total: 16, completed: 12, inProgress: 3, pending: 1, percentage: 75 },
  tasks: { total: 32, completed: 20, inProgress: 8, pending: 4, percentage: 63 },
  risks: { total: 14, high: 3, medium: 6, low: 5, mitigated: 8, percentage: 57 },
};

export default function DefinitionStatus() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Definition Status</h2>
        <p className="text-sm text-gray-500 mt-1">Overall status of all definition phase items</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
          <CardContent className="pt-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-blue-100 uppercase">Procedures</p>
                <div className="text-3xl font-bold mt-1">{statusData.procedures.total}</div>
                <p className="text-xs text-blue-100 mt-1">{statusData.procedures.percentage}% complete</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl"><FileText className="h-6 w-6" /></div>
            </div>
            <Progress value={statusData.procedures.percentage} className="mt-3 h-1.5 bg-white/30" />
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
          <CardContent className="pt-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-emerald-100 uppercase">Templates</p>
                <div className="text-3xl font-bold mt-1">{statusData.templates.total}</div>
                <p className="text-xs text-emerald-100 mt-1">{statusData.templates.percentage}% complete</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl"><Layers className="h-6 w-6" /></div>
            </div>
            <Progress value={statusData.templates.percentage} className="mt-3 h-1.5 bg-white/30" />
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md bg-gradient-to-br from-purple-500 to-pink-500 text-white">
          <CardContent className="pt-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-purple-100 uppercase">Tasks</p>
                <div className="text-3xl font-bold mt-1">{statusData.tasks.total}</div>
                <p className="text-xs text-purple-100 mt-1">{statusData.tasks.percentage}% complete</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl"><ListChecks className="h-6 w-6" /></div>
            </div>
            <Progress value={statusData.tasks.percentage} className="mt-3 h-1.5 bg-white/30" />
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md bg-gradient-to-br from-red-500 to-orange-500 text-white">
          <CardContent className="pt-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-red-100 uppercase">Risks</p>
                <div className="text-3xl font-bold mt-1">{statusData.risks.total}</div>
                <p className="text-xs text-red-100 mt-1">{statusData.risks.mitigated} mitigated</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl"><AlertTriangle className="h-6 w-6" /></div>
            </div>
            <Progress value={statusData.risks.percentage} className="mt-3 h-1.5 bg-white/30" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader className="border-b bg-gray-50">
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" /> Procedures Breakdown
            </CardTitle>
            <CardDescription className="text-xs">Status of all defined procedures</CardDescription>
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /><span className="text-sm">Completed</span></div>
              <Badge className="bg-green-100 text-green-700">{statusData.procedures.completed}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-blue-500" /><span className="text-sm">In Progress</span></div>
              <Badge className="bg-blue-100 text-blue-700">{statusData.procedures.inProgress}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><XCircle className="h-4 w-4 text-gray-400" /><span className="text-sm">Pending</span></div>
              <Badge className="bg-gray-100 text-gray-700">{statusData.procedures.pending}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="border-b bg-gray-50">
            <CardTitle className="text-base flex items-center gap-2">
              <Layers className="h-5 w-5 text-emerald-600" /> Templates Breakdown
            </CardTitle>
            <CardDescription className="text-xs">Status of all defined templates</CardDescription>
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /><span className="text-sm">Completed</span></div>
              <Badge className="bg-green-100 text-green-700">{statusData.templates.completed}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-blue-500" /><span className="text-sm">In Progress</span></div>
              <Badge className="bg-blue-100 text-blue-700">{statusData.templates.inProgress}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><XCircle className="h-4 w-4 text-gray-400" /><span className="text-sm">Pending</span></div>
              <Badge className="bg-gray-100 text-gray-700">{statusData.templates.pending}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="border-b bg-gray-50">
            <CardTitle className="text-base flex items-center gap-2">
              <ListChecks className="h-5 w-5 text-purple-600" /> Tasks Breakdown
            </CardTitle>
            <CardDescription className="text-xs">Status of all assigned tasks</CardDescription>
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /><span className="text-sm">Completed</span></div>
              <Badge className="bg-green-100 text-green-700">{statusData.tasks.completed}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-blue-500" /><span className="text-sm">In Progress</span></div>
              <Badge className="bg-blue-100 text-blue-700">{statusData.tasks.inProgress}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><XCircle className="h-4 w-4 text-gray-400" /><span className="text-sm">Pending</span></div>
              <Badge className="bg-gray-100 text-gray-700">{statusData.tasks.pending}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="border-b bg-gray-50">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" /> Risks Breakdown
            </CardTitle>
            <CardDescription className="text-xs">Risk severity distribution</CardDescription>
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500" /><span className="text-sm">High Severity</span></div>
              <Badge className="bg-red-100 text-red-700">{statusData.risks.high}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-500" /><span className="text-sm">Medium Severity</span></div>
              <Badge className="bg-amber-100 text-amber-700">{statusData.risks.medium}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500" /><span className="text-sm">Low Severity</span></div>
              <Badge className="bg-green-100 text-green-700">{statusData.risks.low}</Badge>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Mitigated</span>
                <Badge className="bg-blue-100 text-blue-700">{statusData.risks.mitigated} / {statusData.risks.total}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
