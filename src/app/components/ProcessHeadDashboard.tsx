import { useState } from "react";
import {
  Shield,
  FileText,
  ListChecks,
  AlertCircle,
  AlertTriangle,
  BarChart3,
  TrendingUp,
  CheckCircle,
  Layers,
  Play,
  Target,
  ChevronDown,
  ChevronRight,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
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
import { QualityVerificationView } from "@/app/components/validation-phase/QualityVerificationView";
import { ProjectMetricsView } from "@/app/components/validation-phase/ProjectMetricsView";
import { FinalReportView } from "@/app/components/validation-phase/FinalReportView";

type ProcessPage =
  // Definition Phase
  | "standard"
  | "associated-risk"
  | "definition-status"
  | "task-management-def"
  // Implementation Phase
  | "procedure-implementation"
  | "issue-management"
  | "risk-management"
  | "progress-tracking"
  // Validation Phase
  | "quality-verification"
  | "project-metrics"
  | "objective-achievement";

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

interface SidebarSection {
  id: PhaseType;
  label: string;
  icon: React.ElementType;
  items: { id: ProcessPage; label: string; icon: React.ElementType }[];
}

function ProcessHeadDashboardContent({ department, phase, systemConfig, onLogout }: ProcessHeadDashboardProps) {
  const defaultPage: ProcessPage = phase === "definition" ? "standard"
    : phase === "implementation" ? "procedure-implementation"
    : "quality-verification";

  const [currentPage, setCurrentPage] = useState<ProcessPage>(defaultPage);
  const [selectedStandard, setSelectedStandard] = useState<{ code: string; name: string } | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    [phase]: true,
  });

  const sections: SidebarSection[] = [
    {
      id: "definition",
      label: "DEFINITION",
      icon: Layers,
      items: [
        { id: "standard", label: "Standard", icon: Shield },
        { id: "associated-risk", label: "Associated Risk", icon: AlertCircle },
        { id: "definition-status", label: "Definition Status", icon: BarChart3 },
        { id: "task-management-def", label: "Task Management", icon: ListChecks },
      ],
    },
    {
      id: "implementation",
      label: "IMPLEMENTATION",
      icon: Play,
      items: [
        { id: "procedure-implementation", label: "Procedure Implementation", icon: TrendingUp },
        { id: "issue-management", label: "Issue Management", icon: AlertTriangle },
        { id: "risk-management", label: "Risk Management", icon: AlertCircle },
        { id: "progress-tracking", label: "Progress Tracking", icon: FileText },
      ],
    },
    {
      id: "validation",
      label: "VALIDATION",
      icon: Target,
      items: [
        { id: "quality-verification", label: "Quality Verification", icon: CheckCircle },
        { id: "project-metrics", label: "Project Metrics", icon: BarChart3 },
        { id: "objective-achievement", label: "Objective Achievement", icon: Target },
      ],
    },
  ];

  // Filter sections based on the current phase - only show the selected phase
  const visibleSections = sections.filter(s => s.id === phase);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
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

    // Definition Phase Pages
    if (currentPage === "standard") {
      return (
        <SelectedStandardsView
          complianceStandards={systemConfig?.complianceStandards || []}
          industry={systemConfig?.industry || department}
          onSelectStandard={(standard) => setSelectedStandard(standard)}
        />
      );
    }
    if (currentPage === "associated-risk") return <RiskProcedureView />;
    if (currentPage === "definition-status") return <DefinitionStatusView />;
    if (currentPage === "task-management-def") return <TaskManagementView />;

    // Implementation Phase Pages
    if (currentPage === "procedure-implementation") return <ProjectProgressView />;
    if (currentPage === "issue-management") return <IssueManagementView />;
    if (currentPage === "risk-management") return <RiskMonitoringView />;
    if (currentPage === "progress-tracking") return <ProjectReportsView />;

    // Validation Phase Pages
    if (currentPage === "quality-verification") return <QualityVerificationView />;
    if (currentPage === "project-metrics") return <ProjectMetricsView />;
    if (currentPage === "objective-achievement") return <FinalReportView />;

    return null;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Floating Sidebar */}
      <aside
        className={cn(
          "fixed top-[73px] left-0 bottom-0 z-40 flex flex-col bg-white/95 backdrop-blur-md border-r border-gray-200 shadow-xl transition-all duration-300",
          sidebarCollapsed ? "w-16" : "w-60"
        )}
      >
        {/* Collapse Toggle */}
        <div className="flex items-center justify-end p-3 border-b border-gray-100">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 transition-colors"
          >
            {sidebarCollapsed ? (
              <PanelLeft className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          {visibleSections.map((section) => {
            const SectionIcon = section.icon;
            const isExpanded = expandedSections[section.id] !== false;

            return (
              <div key={section.id} className="mb-1">
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-left transition-all group",
                    "hover:bg-gray-50 text-gray-600"
                  )}
                >
                  <SectionIcon className="h-4 w-4 text-purple-500 flex-shrink-0" />
                  {!sidebarCollapsed && (
                    <>
                      <span className="text-[11px] font-bold tracking-wider text-gray-500 flex-1">
                        {section.label}
                      </span>
                      {isExpanded ? (
                        <ChevronDown className="h-3 w-3 text-gray-400" />
                      ) : (
                        <ChevronRight className="h-3 w-3 text-gray-400" />
                      )}
                    </>
                  )}
                </button>

                {/* Section Items */}
                {isExpanded && (
                  <div className={cn("space-y-0.5", !sidebarCollapsed && "ml-2 pl-2 border-l border-gray-100")}>
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = currentPage === item.id;

                      return (
                        <button
                          key={item.id}
                          onClick={() => setCurrentPage(item.id)}
                          className={cn(
                            "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all text-left text-sm",
                            isActive
                              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                              : "hover:bg-gray-50 text-gray-600 hover:text-gray-900"
                          )}
                          title={sidebarCollapsed ? item.label : undefined}
                        >
                          <Icon
                            className={cn(
                              "h-4 w-4 flex-shrink-0",
                              isActive ? "text-white" : "text-gray-400"
                            )}
                          />
                          {!sidebarCollapsed && (
                            <span className="truncate text-[13px]">{item.label}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div
        className={cn(
          "flex-1 transition-all duration-300 p-6",
          sidebarCollapsed ? "ml-16" : "ml-60"
        )}
      >
        {renderContent()}
      </div>
    </div>
  );
}

export function ProcessHeadDashboard(props: ProcessHeadDashboardProps) {
  return (
    <ProjectDataProvider>
      <ProcessHeadDashboardContent {...props} />
    </ProjectDataProvider>
  );
}
