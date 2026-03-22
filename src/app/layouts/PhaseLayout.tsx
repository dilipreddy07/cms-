import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Layers,
  Play,
  Target,
  Eye,
  Shield,
  ListChecks,
  AlertTriangle,
  BarChart3,
  ClipboardList,
  AlertCircle,
  TrendingUp,
  FileText,
  CheckCircle,
  LogOut,
  Activity,
} from "lucide-react";

type RoleId = "process-head" | "hr-head" | "hr-executive";
type PhaseId = "definition" | "implementation" | "validation";

interface PhaseLayoutProps {
  role: RoleId;
  phase: PhaseId;
}

interface SidebarItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const phaseConfig: Record<PhaseId, {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  textColor: string;
  bgColor: string;
}> = {
  definition: {
    label: "Definition",
    icon: Layers,
    color: "from-blue-500 to-cyan-500",
    textColor: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  implementation: {
    label: "Implementation",
    icon: Play,
    color: "from-emerald-500 to-teal-500",
    textColor: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  validation: {
    label: "Validation",
    icon: Target,
    color: "from-purple-500 to-pink-500",
    textColor: "text-purple-600",
    bgColor: "bg-purple-50",
  },
};

const roleLabels: Record<RoleId, string> = {
  "process-head": "Process Head",
  "hr-head": "HR Head",
  "hr-executive": "HR Executive",
};

// Sidebar items per role + phase combination
const sidebarItems: Record<string, SidebarItem[]> = {
  "process-head/definition": [
    { path: "", label: "Dashboard", icon: Eye },
    { path: "standards", label: "Standards", icon: Shield },
    { path: "tasks", label: "Task Management", icon: ListChecks },
    { path: "risks", label: "Associated Risks", icon: AlertTriangle },
    { path: "status", label: "Definition Status", icon: BarChart3 },
  ],
  "process-head/implementation": [
    { path: "", label: "Dashboard", icon: Eye },
    { path: "execute", label: "Implementation", icon: TrendingUp },
    { path: "issues", label: "Issue Management", icon: AlertCircle },
    { path: "risks", label: "Risk Management", icon: AlertTriangle },
    { path: "progress", label: "Progress Tracking", icon: FileText },
  ],
  "process-head/validation": [
    { path: "", label: "Dashboard", icon: Eye },
    { path: "review", label: "Review", icon: ClipboardList },
    { path: "quality", label: "Quality Verification", icon: CheckCircle },
    { path: "metrics", label: "Project Metrics", icon: BarChart3 },
  ],
  "hr-head/definition": [
    { path: "", label: "Dashboard", icon: Eye },
    { path: "activities", label: "Activities", icon: Activity },
  ],
  "hr-head/validation": [
    { path: "", label: "Dashboard", icon: Eye },
    { path: "review", label: "Review", icon: ClipboardList },
  ],
  "hr-executive/implementation": [
    { path: "", label: "Dashboard", icon: Eye },
    { path: "activities", label: "Activities", icon: Activity },
  ],
};

export default function PhaseLayout({ role, phase }: PhaseLayoutProps) {
  const navigate = useNavigate();
  const config = phaseConfig[phase];
  const PhaseIcon = config.icon;
  const items = sidebarItems[`${role}/${phase}`] || [];
  const basePath = `/${role}/${phase}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Top header bar */}
      <div className={`bg-gradient-to-r ${config.color} text-white px-6 py-3 flex items-center justify-between shadow-md`}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <PhaseIcon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-base leading-tight">{roleLabels[role]} Dashboard</h1>
            <p className="text-xs text-white/80">{config.label} Phase</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm hidden sm:flex">
            {config.label}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="text-white hover:bg-white/20 border border-white/30"
          >
            <LogOut className="h-4 w-4 mr-1" />
            Exit
          </Button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar — scoped to current phase only */}
        <aside className="w-64 flex-shrink-0 bg-white border-r min-h-[calc(100vh-52px)] shadow-sm">
          <div className="p-3 space-y-1">
            <div className="pb-2">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3">
                {config.label} Phase
              </p>
            </div>

            {items.map((item) => {
              const ItemIcon = item.icon;
              const to = item.path ? `${basePath}/${item.path}` : basePath;

              return (
                <NavLink
                  key={item.path}
                  to={to}
                  end={item.path === ""}
                  className={({ isActive }) =>
                    cn(
                      "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all text-left text-sm font-medium",
                      isActive
                        ? `bg-gradient-to-r ${config.color} text-white shadow-sm`
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    )
                  }
                >
                  <ItemIcon className="h-4 w-4 flex-shrink-0" />
                  <span className="text-xs leading-tight">{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </aside>

        {/* Main content — only renders the matched child route */}
        <main className="flex-1 min-w-0 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
