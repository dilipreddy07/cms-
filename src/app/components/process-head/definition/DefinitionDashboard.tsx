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
import { Progress } from "@/app/components/ui/progress";
import {
  FileText,
  LayoutTemplate,
  ListChecks,
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  Clock,
  BarChart3,
} from "lucide-react";

interface DefinitionDashboardProps {
  onNavigate: (page: string) => void;
}

const statsData = [
  {
    title: "Total Procedures",
    count: 24,
    completed: 18,
    icon: FileText,
    gradient: "from-blue-500 to-blue-700",
    page: "standards",
  },
  {
    title: "Templates",
    count: 16,
    completed: 12,
    icon: LayoutTemplate,
    gradient: "from-emerald-500 to-emerald-700",
    page: "standards",
  },
  {
    title: "Tasks",
    count: 32,
    completed: 20,
    icon: ListChecks,
    gradient: "from-violet-500 to-violet-700",
    page: "tasks",
  },
  {
    title: "Risks Identified",
    count: 14,
    completed: 9,
    icon: AlertTriangle,
    gradient: "from-amber-500 to-amber-700",
    page: "risks",
  },
];

const quickActions = [
  {
    title: "Standards & Procedures",
    description:
      "Manage QMS, ISMS, and custom standards with procedures, templates, and checklists.",
    icon: FileText,
    page: "standards",
  },
  {
    title: "Task Management",
    description:
      "Create and assign tasks manually, track progress across teams.",
    icon: ListChecks,
    page: "tasks",
  },
  {
    title: "Associated Risks",
    description:
      "Map and manage risks linked to templates and tasks with mitigation plans.",
    icon: AlertTriangle,
    page: "risks",
  },
  {
    title: "Definition Status",
    description:
      "View overall completion status for procedures, templates, tasks, and risks.",
    icon: BarChart3,
    page: "status",
  },
];

const statusSummary = [
  { label: "Procedures", completed: 18, total: 24 },
  { label: "Templates", completed: 12, total: 16 },
  { label: "Tasks", completed: 20, total: 32 },
  { label: "Risk Mitigations", completed: 9, total: 14 },
];

function DefinitionDashboard({ onNavigate }: DefinitionDashboardProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Definition Phase Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Overview of procedures, templates, tasks, and risks across all
          standards.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          const percentage = Math.round((stat.completed / stat.count) * 100);
          return (
            <Card
              key={index}
              className={`cursor-pointer transition-transform duration-200 hover:scale-[1.02] bg-gradient-to-br ${stat.gradient} text-white border-0`}
              onClick={() => onNavigate(stat.page)}
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <Icon className="h-8 w-8 opacity-90" />
                  <span className="text-3xl font-bold">{stat.count}</span>
                </div>
                <p className="text-sm font-medium opacity-90">{stat.title}</p>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs opacity-80 mb-1">
                    <span>
                      {stat.completed}/{stat.count} completed
                    </span>
                    <span>{percentage}%</span>
                  </div>
                  <div className="w-full bg-white/30 rounded-full h-1.5">
                    <div
                      className="bg-white rounded-full h-1.5 transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Overall Status Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Overall Status Summary</CardTitle>
          <CardDescription>
            Completion progress across all definition areas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {statusSummary.map((item, index) => {
            const percentage = Math.round(
              (item.completed / item.total) * 100
            );
            return (
              <div key={index} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{item.label}</span>
                  <span className="text-muted-foreground">
                    {item.completed} of {item.total} ({percentage}%)
                  </span>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card
                key={index}
                className="cursor-pointer transition-all duration-200 hover:shadow-md"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => onNavigate(action.page)}
              >
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="rounded-lg bg-muted p-2.5 shrink-0">
                    <Icon className="h-5 w-5 text-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm">{action.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {action.description}
                    </p>
                  </div>
                  <ArrowRight
                    className={`h-4 w-4 mt-1 shrink-0 transition-transform ${
                      hoveredCard === index
                        ? "translate-x-1 text-foreground"
                        : "text-muted-foreground"
                    }`}
                  />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
          <CardDescription>
            Latest updates across the definition phase
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                icon: CheckCircle,
                text: "ISO 27001 Risk Assessment procedure approved",
                time: "2 hours ago",
                color: "text-emerald-500",
              },
              {
                icon: Clock,
                text: "QMS Audit Checklist updated and pending review",
                time: "4 hours ago",
                color: "text-amber-500",
              },
              {
                icon: FileText,
                text: "New corrective action template uploaded",
                time: "6 hours ago",
                color: "text-blue-500",
              },
              {
                icon: AlertTriangle,
                text: "High severity risk flagged for data handling procedure",
                time: "1 day ago",
                color: "text-red-500",
              },
            ].map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 py-2 border-b last:border-b-0"
                >
                  <Icon className={`h-4 w-4 shrink-0 ${activity.color}`} />
                  <span className="text-sm flex-1">{activity.text}</span>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default DefinitionDashboard;
