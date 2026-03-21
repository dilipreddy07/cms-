import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  ChevronRight,
  Home
} from "lucide-react";
import { HRExecutiveDashboard as Dashboard } from "./implementation-phase/HRExecutiveDashboard";
import { ResourcesTrackingView } from "./implementation-phase/ResourcesTrackingView";
import { PolicyImplementationView } from "./implementation-phase/PolicyImplementationView";

export function HRExecutiveDashboard() {
  const [activeSection, setActiveSection] = useState<"dashboard" | "resources" | "policies">("dashboard");

  const menuItems = [
    {
      id: "dashboard" as const,
      label: "Dashboard",
      icon: LayoutDashboard,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: "resources" as const,
      label: "Resources Tracking",
      icon: Users,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: "policies" as const,
      label: "Policy Implementation",
      icon: ClipboardList,
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white shadow-lg">
        <div className="px-8 py-6">
          <div className="flex items-center gap-2 text-sm mb-2">
            <Home className="h-4 w-4" />
            <ChevronRight className="h-4 w-4" />
            <span className="text-purple-100">HR Executive</span>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium">Implementation</span>
          </div>
          <h1 className="text-3xl font-bold">HR Executive - Implementation</h1>
          <p className="text-purple-100 mt-1">
            Execute procedures, track resources, and implement policies
          </p>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-72 bg-white border-r min-h-screen p-6">
          <div className="space-y-2">
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Implementation
              </h3>
            </div>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start transition-all ${
                    isActive
                      ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg hover:shadow-xl`
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => setActiveSection(item.id)}
                >
                  <Icon className={`h-5 w-5 mr-3 ${isActive ? "" : "text-gray-500"}`} />
                  <span className="font-medium">{item.label}</span>
                </Button>
              );
            })}
          </div>

          {/* Info Card */}
          <Card className="mt-8 p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <h4 className="font-semibold text-sm text-gray-900 mb-2">
              💡 Implementation Phase
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Execute procedures defined in the Standard phase. Track resources and implement policies across your organization.
            </p>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeSection === "dashboard" && (
            <Dashboard onNavigate={setActiveSection} />
          )}
          {activeSection === "resources" && (
            <ResourcesTrackingView />
          )}
          {activeSection === "policies" && (
            <PolicyImplementationView />
          )}
        </div>
      </div>
    </div>
  );
}
