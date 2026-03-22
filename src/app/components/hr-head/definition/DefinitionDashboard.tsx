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
  ClipboardList,
  LayoutTemplate,
  ShieldCheck,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertTriangle,
} from "lucide-react";

interface DefinitionDashboardProps {
  onNavigate: (page: string) => void;
}

const statsData = [
  {
    title: "Total HR Policies",
    count: 18,
    completed: 14,
    icon: FileText,
    gradient: "from-blue-500 to-blue-700",
    page: "policies",
  },
  {
    title: "Procedures Defined",
    count: 32,
    completed: 26,
    icon: ClipboardList,
    gradient: "from-emerald-500 to-emerald-700",
    page: "procedures",
  },
  {
    title: "Templates",
    count: 22,
    completed: 17,
    icon: LayoutTemplate,
    gradient: "from-violet-500 to-violet-700",
    page: "templates",
  },
  {
    title: "Compliance Items",
    count: 15,
    completed: 10,
    icon: ShieldCheck,
    gradient: "from-amber-500 to-amber-700",
    page: "compliance",
  },
];

const progressOverview = [
  { label: "HR Policies", completed: 14, total: 18 },
  { label: "Procedures", completed: 26, total: 32 },
  { label: "Templates", completed: 17, total: 22 },
  { label: "Compliance Items", completed: 10, total: 15 },
];

const quickLinks = [
  {
    title: "HR Policies",
    description:
      "Define and manage organizational HR policies including leave, conduct, and benefits.",
    icon: FileText,
    page: "policies",
  },
  {
    title: "Procedures",
    description:
      "Create standard operating procedures for recruitment, onboarding, and offboarding.",
    icon: ClipboardList,
    page: "procedures",
  },
  {
    title: "Templates",
    description:
      "Manage HR document templates such as offer letters, contracts, and evaluation forms.",
    icon: LayoutTemplate,
    page: "templates",
  },
  {
    title: "Compliance Management",
    description:
      "Track labor law compliance, audit readiness, and regulatory requirements.",
    icon: ShieldCheck,
    page: "compliance",
  },
];

function DefinitionDashboard({ onNavigate }: DefinitionDashboardProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          HR Definition Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Overview of HR policies, procedures, templates, and compliance items.
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

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Progress Overview</CardTitle>
          <CardDescription>
            Completion progress across all HR definition areas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {progressOverview.map((item, index) => {
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

      {/* Quick Links */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <Card
                key={index}
                className="cursor-pointer transition-all duration-200 hover:shadow-md"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => onNavigate(link.page)}
              >
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="rounded-lg bg-muted p-2.5 shrink-0">
                    <Icon className="h-5 w-5 text-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm">{link.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {link.description}
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
            Latest updates across the HR definition phase
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                icon: CheckCircle,
                text: "Employee Code of Conduct policy finalized",
                time: "1 hour ago",
                color: "text-emerald-500",
              },
              {
                icon: Clock,
                text: "Recruitment SOP updated and pending review",
                time: "3 hours ago",
                color: "text-amber-500",
              },
              {
                icon: FileText,
                text: "New performance review template uploaded",
                time: "5 hours ago",
                color: "text-blue-500",
              },
              {
                icon: AlertTriangle,
                text: "Labor compliance gap identified in leave policy",
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
