import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";
import {
  Eye,
  Shield,
  ClipboardCheck,
  FileText,
  ListChecks,
  AlertCircle,
  AlertTriangle,
  BarChart3,
  TrendingUp,
  CheckCircle,
  Clock,
  Layers,
  Play,
  Target,
  ChevronDown,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import { ProjectDataProvider, useProjectData } from "@/app/context/ProjectDataContext";
import { SelectedStandardsView } from "@/app/components/SelectedStandardsView";
import { SelectedStandardDetailsView } from "@/app/components/process-head/definition-phase/SelectedStandardDetailsView";
import { RiskProcedureView } from "@/app/components/process-head/definition-phase/RiskProcedureView";
import { DefinitionStatusView } from "@/app/components/process-head/definition-phase/DefinitionStatusView";
import { ProjectProgressView } from "@/app/components/implementation-phase/ProjectProgressView";
import { TaskManagementView } from "@/app/components/implementation-phase/TaskManagementView";
import { IssueManagementView } from "@/app/components/implementation-phase/IssueManagementView";
import { RiskMonitoringView } from "@/app/components/implementation-phase/RiskMonitoringView";
import { ProjectReportsView } from "@/app/components/implementation-phase/ProjectReportsView";
import { ValidationDashboardView } from "@/app/components/validation-phase/ValidationDashboardView";
import { ProjectReviewView } from "@/app/components/validation-phase/ProjectReviewView";
import { QualityVerificationView } from "@/app/components/validation-phase/QualityVerificationView";
import { ProjectMetricsView } from "@/app/components/validation-phase/ProjectMetricsView";
import { FinalReportView } from "@/app/components/validation-phase/FinalReportView";

// ─── Types ──────────────────────────────────────────────────────────────────
type ProcessPage =
  | "dashboard"
  // Definition Phase
  | "standard"
  | "risk-procedure"
  | "definition-status"
  // Implementation Phase
  | "procedure-implementation"
  | "task-management"
  | "issue-management"
  | "risk-management"
  | "progress-tracking"
  // Validation Phase
  | "quality-verification"
  | "project-metrics"
  | "objective-achievement-progress";

type PhaseType = "definition" | "implementation" | "validation";

interface ProcessHeadDashboardProps {
  department: string;
  phase: PhaseType;
  systemConfig?: {
    industry: string;
    department: string;
    complianceStandards: string[];
    clientName: string;
    location: string;
    address: string;
    organizationSize: string;
  };
  onLogout?: () => void;
}

// ─── Sidebar structure ───────────────────────────────────────────────────────
const SIDEBAR_PHASES = [
  {
    id: "definition" as PhaseType,
    label: "Definition",
    icon: Layers,
    color: "from-blue-500 to-cyan-500",
    textColor: "text-blue-600",
    bgColor: "bg-blue-50",
    items: [
      { id: "standard" as ProcessPage, label: "Standard", icon: Shield },
      { id: "risk-procedure" as ProcessPage, label: "Risk Procedure", icon: AlertCircle },
      { id: "definition-status" as ProcessPage, label: "Definition Status", icon: BarChart3 },
      { id: "task-management" as ProcessPage, label: "Task Management", icon: ListChecks },
    ],
  },
  {
    id: "implementation" as PhaseType,
    label: "Implementation",
    icon: Play,
    color: "from-emerald-500 to-teal-500",
    textColor: "text-emerald-600",
    bgColor: "bg-emerald-50",
    items: [
      { id: "procedure-implementation" as ProcessPage, label: "Procedure Implementation", icon: TrendingUp },
      { id: "issue-management" as ProcessPage, label: "Issue Management", icon: AlertTriangle },
      { id: "risk-management" as ProcessPage, label: "Risk Management", icon: AlertCircle },
      { id: "progress-tracking" as ProcessPage, label: "Progress Tracking", icon: FileText },
    ],
  },
  {
    id: "validation" as PhaseType,
    label: "Validation",
    icon: Target,
    color: "from-purple-500 to-pink-500",
    textColor: "text-purple-600",
    bgColor: "bg-purple-50",
    items: [
      { id: "quality-verification" as ProcessPage, label: "Quality Verification", icon: CheckCircle },
      { id: "project-metrics" as ProcessPage, label: "Project Metrics", icon: BarChart3 },
      { id: "objective-achievement-progress" as ProcessPage, label: "Objective Achievement", icon: FileText },
    ],
  },
];

// ─── Dashboard content ───────────────────────────────────────────────────────
function ProcessHeadDashboardContent({ department, phase: initialPhase, systemConfig, onLogout }: ProcessHeadDashboardProps) {
  const [currentPage, setCurrentPage] = useState<ProcessPage>("dashboard");
  const [selectedStandard, setSelectedStandard] = useState<{ code: string; name: string } | null>(null);
  const [expandedPhases, setExpandedPhases] = useState<Set<PhaseType>>(new Set(["definition", "implementation", "validation"]));
  const projectData = useProjectData();

  const togglePhase = (phaseId: PhaseType) => {
    setExpandedPhases((prev) => {
      const next = new Set(prev);
      if (next.has(phaseId)) next.delete(phaseId);
      else next.add(phaseId);
      return next;
    });
  };

  const getActivePhaseBadge = (): PhaseType => {
    if (currentPage === "dashboard") return initialPhase;
    for (const p of SIDEBAR_PHASES) {
      if (p.items.some((i) => i.id === currentPage)) return p.id;
    }
    return initialPhase;
  };

  const navigate = (page: ProcessPage) => {
    setCurrentPage(page);
    setSelectedStandard(null);
  };

  const renderContent = () => {
    if (selectedStandard) {
      return (
        <SelectedStandardDetailsView
          standard={selectedStandard}
          onBack={() => setSelectedStandard(null)}
        />
      );
    }
    if (currentPage === "dashboard") {
      return <UnifiedDashboard onNavigate={navigate} />;
    }
    // Definition
    if (currentPage === "standard")
      return (
        <SelectedStandardsView
          complianceStandards={systemConfig?.complianceStandards || []}
          industry={systemConfig?.industry || department}
          onSelectStandard={(std) => setSelectedStandard(std)}
        />
      );
    if (currentPage === "risk-procedure") return <RiskProcedureView />;
    if (currentPage === "definition-status") return <DefinitionStatusView />;
    // Implementation
    if (currentPage === "procedure-implementation") return <ProjectProgressView />;
    if (currentPage === "task-management") return <TaskManagementView department={department} />;
    if (currentPage === "issue-management") return <IssueManagementView />;
    if (currentPage === "risk-management") return <RiskMonitoringView />;
    if (currentPage === "progress-tracking") return <ProjectReportsView />;
    // Validation
    if (currentPage === "quality-verification") return <QualityVerificationView />;
    if (currentPage === "project-metrics") return <ProjectMetricsView />;
    if (currentPage === "objective-achievement-progress") return <FinalReportView />;
    return null;
  };

  const activePhase = getActivePhaseBadge();
  const activePhaseMeta = SIDEBAR_PHASES.find((p) => p.id === activePhase)!;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Top header bar */}
      <div className={`bg-gradient-to-r ${activePhaseMeta.color} text-white px-6 py-3 flex items-center justify-between shadow-md`}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <activePhaseMeta.icon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-base leading-tight">Process Head Dashboard</h1>
            <p className="text-xs text-white/80">{department} · {activePhaseMeta.label} Phase</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm hidden sm:flex">
            {currentPage === "dashboard" ? "Overview" : currentPage.replace(/-/g, " ")}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout || (() => (window.location.href = "/"))}
            className="text-white hover:bg-white/20 border border-white/30"
          >
            <LogOut className="h-4 w-4 mr-1" />
            Logout
          </Button>
        </div>
      </div>

      <div className="flex">
        {/* ── Sidebar ── */}
        <div className="w-64 flex-shrink-0 bg-white border-r min-h-[calc(100vh-52px)] shadow-sm">
          <div className="p-3 space-y-1">
            {/* Dashboard button */}
            <button
              onClick={() => navigate("dashboard")}
              className={cn(
                "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all text-left text-sm font-medium",
                currentPage === "dashboard"
                  ? "bg-gradient-to-r from-slate-700 to-slate-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <div className={cn("p-1.5 rounded-md", currentPage === "dashboard" ? "bg-white/20" : "bg-gray-100")}>
                <Eye className="h-4 w-4" />
              </div>
              Dashboard Overview
            </button>

            <div className="pt-1 pb-0.5">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3">Phases</p>
            </div>

            {/* Phase groups */}
            {SIDEBAR_PHASES.map((phaseGroup) => {
              const PhaseIcon = phaseGroup.icon;
              const isExpanded = expandedPhases.has(phaseGroup.id);
              const isActivePhase = phaseGroup.items.some((i) => i.id === currentPage);

              return (
                <div key={phaseGroup.id} className="space-y-0.5">
                  {/* Phase header */}
                  <button
                    onClick={() => togglePhase(phaseGroup.id)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all text-left",
                      isActivePhase
                        ? `bg-gradient-to-r ${phaseGroup.color} text-white shadow-md`
                        : `${phaseGroup.bgColor} ${phaseGroup.textColor} hover:opacity-90`
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <PhaseIcon className="h-4 w-4" />
                      <span className="text-xs font-bold uppercase tracking-wide">{phaseGroup.label}</span>
                    </div>
                    {isExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                  </button>

                  {/* Phase items */}
                  {isExpanded && (
                    <div className="ml-3 pl-2 border-l-2 border-gray-200 space-y-0.5">
                      {phaseGroup.items.map((item) => {
                        const ItemIcon = item.icon;
                        const isActive = currentPage === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => navigate(item.id)}
                            className={cn(
                              "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-all text-left text-sm",
                              isActive
                                ? `bg-gradient-to-r ${phaseGroup.color} text-white shadow-sm font-medium`
                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                            )}
                          >
                            <ItemIcon className="h-3.5 w-3.5 flex-shrink-0" />
                            <span className="text-xs leading-tight">{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Main content ── */}
        <div className="flex-1 min-w-0 p-6 overflow-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

// ─── Unified Dashboard ────────────────────────────────────────────────────────
function UnifiedDashboard({ onNavigate }: { onNavigate: (page: ProcessPage) => void }) {
  const projectData = useProjectData();

  return (
    <div className="space-y-6">
      {/* Phase progress cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Definition */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white overflow-hidden relative">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full" />
          <div className="absolute -right-2 top-8 w-14 h-14 bg-white/10 rounded-full" />
          <CardHeader className="pb-2 relative z-10">
            <div className="flex items-center justify-between">
              <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm"><Layers className="h-5 w-5" /></div>
              <Badge className="bg-white/20 text-white border-white/30 text-xs">PHASE 1</Badge>
            </div>
            <CardTitle className="text-lg font-bold mt-2">Definition</CardTitle>
            <CardDescription className="text-blue-100 text-xs">Standards, risks & documentation</CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold mb-1">{projectData.standardDocuments?.length || 0}</div>
            <p className="text-xs text-blue-100 mb-3">documents defined</p>
            <Progress value={72} className="h-1.5 bg-white/30" />
            <p className="text-xs text-blue-100 mt-1">72% complete</p>
          </CardContent>
        </Card>

        {/* Implementation */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white overflow-hidden relative">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full" />
          <div className="absolute -right-2 top-8 w-14 h-14 bg-white/10 rounded-full" />
          <CardHeader className="pb-2 relative z-10">
            <div className="flex items-center justify-between">
              <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm"><Play className="h-5 w-5" /></div>
              <Badge className="bg-white/20 text-white border-white/30 text-xs">PHASE 2</Badge>
            </div>
            <CardTitle className="text-lg font-bold mt-2">Implementation</CardTitle>
            <CardDescription className="text-emerald-100 text-xs">Tasks, issues & execution</CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold mb-1">{projectData.tasks?.length || 0}</div>
            <p className="text-xs text-emerald-100 mb-3">active tasks</p>
            <Progress value={60} className="h-1.5 bg-white/30" />
            <p className="text-xs text-emerald-100 mt-1">60% complete</p>
          </CardContent>
        </Card>

        {/* Validation */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white overflow-hidden relative">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full" />
          <div className="absolute -right-2 top-8 w-14 h-14 bg-white/10 rounded-full" />
          <CardHeader className="pb-2 relative z-10">
            <div className="flex items-center justify-between">
              <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm"><Target className="h-5 w-5" /></div>
              <Badge className="bg-white/20 text-white border-white/30 text-xs">PHASE 3</Badge>
            </div>
            <CardTitle className="text-lg font-bold mt-2">Validation</CardTitle>
            <CardDescription className="text-purple-100 text-xs">Quality checks & approvals</CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold mb-1">{projectData.qualityVerifications?.length || 0}</div>
            <p className="text-xs text-purple-100 mb-3">verifications done</p>
            <Progress value={45} className="h-1.5 bg-white/30" />
            <p className="text-xs text-purple-100 mt-1">45% complete</p>
          </CardContent>
        </Card>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="pt-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Requirements</p>
                <div className="text-2xl font-bold text-gray-900 mt-1">{projectData.complianceRequirements?.length || 0}</div>
              </div>
              <div className="p-2.5 bg-blue-100 rounded-xl"><ClipboardCheck className="h-5 w-5 text-blue-600" /></div>
            </div>
          </CardContent>
        </Card>
        <Card className="border shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="pt-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Open Issues</p>
                <div className="text-2xl font-bold text-gray-900 mt-1">{projectData.issues?.filter((i) => i.status === "Open").length || 0}</div>
              </div>
              <div className="p-2.5 bg-amber-100 rounded-xl"><AlertTriangle className="h-5 w-5 text-amber-600" /></div>
            </div>
          </CardContent>
        </Card>
        <Card className="border shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="pt-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Validated</p>
                <div className="text-2xl font-bold text-gray-900 mt-1">{projectData.projectReviews?.length || 0}</div>
              </div>
              <div className="p-2.5 bg-emerald-100 rounded-xl"><CheckCircle className="h-5 w-5 text-emerald-600" /></div>
            </div>
          </CardContent>
        </Card>
        <Card className="border shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="pt-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Completion</p>
                <div className="text-2xl font-bold text-gray-900 mt-1">87%</div>
              </div>
              <div className="p-2.5 bg-purple-100 rounded-xl"><TrendingUp className="h-5 w-5 text-purple-600" /></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-sm">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 border-b rounded-t-xl">
          <CardTitle className="text-base">Quick Actions — All Phases</CardTitle>
          <CardDescription className="text-xs">Jump directly to any phase section</CardDescription>
        </CardHeader>
        <CardContent className="pt-5">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              { page: "standard" as ProcessPage, label: "Standards", icon: Shield, color: "from-blue-500 to-cyan-500" },
              { page: "risk-procedure" as ProcessPage, label: "Risk Procedure", icon: AlertCircle, color: "from-red-500 to-orange-400" },
              { page: "definition-status" as ProcessPage, label: "Definition Status", icon: BarChart3, color: "from-sky-500 to-blue-500" },
              { page: "task-management" as ProcessPage, label: "Task Management", icon: ListChecks, color: "from-emerald-500 to-teal-500" },
              { page: "issue-management" as ProcessPage, label: "Issue Management", icon: AlertTriangle, color: "from-amber-500 to-orange-500" },
              { page: "progress-tracking" as ProcessPage, label: "Progress Tracking", icon: TrendingUp, color: "from-green-500 to-emerald-400" },
              { page: "quality-verification" as ProcessPage, label: "Quality Verification", icon: CheckCircle, color: "from-purple-500 to-violet-500" },
              { page: "project-metrics" as ProcessPage, label: "Project Metrics", icon: BarChart3, color: "from-pink-500 to-rose-500" },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.page}
                  onClick={() => onNavigate(action.page)}
                  className={cn(
                    "h-auto py-3 flex-col gap-1.5 bg-gradient-to-br text-white shadow-sm hover:shadow-md transition-all",
                    action.color
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium leading-tight text-center">{action.label}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card className="shadow-sm">
          <CardHeader className="border-b bg-gray-50 rounded-t-xl">
            <CardTitle className="text-sm">Project Progress Trend</CardTitle>
            <CardDescription className="text-xs">Monthly completion across all phases</CardDescription>
          </CardHeader>
          <CardContent className="pt-5">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart
                data={[
                  { month: "Jan", definition: 20, implementation: 5, validation: 0 },
                  { month: "Feb", definition: 45, implementation: 15, validation: 5 },
                  { month: "Mar", definition: 72, implementation: 35, validation: 15 },
                  { month: "Apr", definition: 85, implementation: 55, validation: 30 },
                  { month: "May", definition: 90, implementation: 70, validation: 45 },
                  { month: "Jun", definition: 95, implementation: 85, validation: 60 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#9ca3af" tick={{ fontSize: 11 }} />
                <YAxis stroke="#9ca3af" tick={{ fontSize: 11 }} />
                <Tooltip />
                <Area type="monotone" dataKey="definition" stroke="#3b82f6" fill="#bfdbfe" fillOpacity={0.6} name="Definition" />
                <Area type="monotone" dataKey="implementation" stroke="#10b981" fill="#a7f3d0" fillOpacity={0.6} name="Implementation" />
                <Area type="monotone" dataKey="validation" stroke="#8b5cf6" fill="#ddd6fe" fillOpacity={0.6} name="Validation" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="border-b bg-gray-50 rounded-t-xl">
            <CardTitle className="text-sm">Work Distribution by Phase</CardTitle>
            <CardDescription className="text-xs">Items per phase</CardDescription>
          </CardHeader>
          <CardContent className="pt-5">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Definition", value: (projectData.complianceRequirements?.length || 2) + (projectData.standardDocuments?.length || 3), fill: "#3b82f6" },
                    { name: "Implementation", value: (projectData.tasks?.length || 4) + (projectData.issues?.length || 2), fill: "#10b981" },
                    { name: "Validation", value: (projectData.projectReviews?.length || 2) + (projectData.qualityVerifications?.length || 1), fill: "#8b5cf6" },
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={85}
                  dataKey="value"
                >
                  {["#3b82f6", "#10b981", "#8b5cf6"].map((color, idx) => (
                    <Cell key={`cell-${idx}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent activities */}
      <Card className="shadow-sm">
        <CardHeader className="bg-gray-50 border-b rounded-t-xl">
          <CardTitle className="text-sm">Recent Activity — All Phases</CardTitle>
          <CardDescription className="text-xs">Latest updates from Definition, Implementation, and Validation</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-2">
            {[
              { action: "New compliance requirement added", phase: "Definition", time: "5 min ago", color: "bg-blue-500", icon: ClipboardCheck },
              { action: "Task completed: Asset Inventory", phase: "Implementation", time: "12 min ago", color: "bg-emerald-500", icon: CheckCircle },
              { action: "Quality verification passed", phase: "Validation", time: "25 min ago", color: "bg-purple-500", icon: Shield },
              { action: "Risk assessment updated", phase: "Definition", time: "1 hr ago", color: "bg-red-500", icon: AlertCircle },
              { action: "Final report approved", phase: "Validation", time: "2 hr ago", color: "bg-pink-500", icon: FileText },
            ].map((activity, idx) => {
              const Icon = activity.icon;
              return (
                <div key={idx} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-all">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 ${activity.color} rounded-lg flex-shrink-0`}>
                      <Icon className="h-3.5 w-3.5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">
                        <Badge variant="outline" className="mr-1 text-xs py-0">{activity.phase}</Badge>
                        {activity.time}
                      </p>
                    </div>
                  </div>
                  <Clock className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Exported wrapper ─────────────────────────────────────────────────────────
export default function ProcessHeadDashboard(props: ProcessHeadDashboardProps) {
  return (
    <ProjectDataProvider>
      <ProcessHeadDashboardContent {...props} />
    </ProjectDataProvider>
  );
}
