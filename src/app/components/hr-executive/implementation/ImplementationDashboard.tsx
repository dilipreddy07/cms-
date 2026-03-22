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
  ClipboardList,
  PlayCircle,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  Activity,
  Users,
  FileText,
  CalendarCheck,
} from "lucide-react";

interface ImplementationDashboardProps {
  onNavigate: (page: string) => void;
}

interface RecentActivity {
  id: string;
  action: string;
  task: string;
  user: string;
  timestamp: string;
  type: "completed" | "started" | "issue" | "update";
}

const mockActivities: RecentActivity[] = [
  {
    id: "1",
    action: "Completed",
    task: "Employee Onboarding Checklist Revision",
    user: "Amanda Torres",
    timestamp: "2026-03-22 10:15",
    type: "completed",
  },
  {
    id: "2",
    action: "Started",
    task: "Performance Review Cycle Q1 Setup",
    user: "James Miller",
    timestamp: "2026-03-22 09:00",
    type: "started",
  },
  {
    id: "3",
    action: "Issue Logged",
    task: "Benefits Enrollment Portal Migration",
    user: "Rachel Kim",
    timestamp: "2026-03-21 16:45",
    type: "issue",
  },
  {
    id: "4",
    action: "Progress Updated",
    task: "Diversity & Inclusion Training Rollout",
    user: "Carlos Mendez",
    timestamp: "2026-03-21 14:30",
    type: "update",
  },
  {
    id: "5",
    action: "Completed",
    task: "Updated Leave Policy Documentation",
    user: "Sophie Zhang",
    timestamp: "2026-03-21 11:20",
    type: "completed",
  },
];

const activityBadgeVariant: Record<RecentActivity["type"], string> = {
  completed: "bg-green-100 text-green-800",
  started: "bg-blue-100 text-blue-800",
  issue: "bg-red-100 text-red-800",
  update: "bg-amber-100 text-amber-800",
};

export default function ImplementationDashboard({
  onNavigate,
}: ImplementationDashboardProps) {
  const [stats] = useState({
    assigned: 32,
    completed: 18,
    inProgress: 9,
    pending: 5,
  });

  const completionPercentage = Math.round(
    (stats.completed / stats.assigned) * 100
  );

  const summaryCards = [
    {
      title: "Assigned Tasks",
      value: stats.assigned,
      icon: ClipboardList,
      color: "text-slate-700",
      bg: "bg-slate-50",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: CheckCircle2,
      color: "text-green-700",
      bg: "bg-green-50",
    },
    {
      title: "In Progress",
      value: stats.inProgress,
      icon: PlayCircle,
      color: "text-blue-700",
      bg: "bg-blue-50",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: Clock,
      color: "text-amber-700",
      bg: "bg-amber-50",
    },
  ];

  const quickActions = [
    {
      label: "Implementation Activities",
      page: "implementation-activities",
      icon: ClipboardList,
    },
    {
      label: "Team Management",
      page: "team-management",
      icon: Users,
    },
    {
      label: "Policy Documents",
      page: "policy-documents",
      icon: FileText,
    },
    {
      label: "Compliance Calendar",
      page: "compliance-calendar",
      icon: CalendarCheck,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Implementation Dashboard
        </h2>
        <p className="text-muted-foreground">
          Overview of HR implementation tasks, progress, and recent activity.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                <div className={`rounded-md p-2 ${card.bg}`}>
                  <Icon className={`h-4 w-4 ${card.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{card.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Task Completion Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Task Completion Progress</CardTitle>
          <CardDescription>
            {stats.completed} of {stats.assigned} assigned tasks completed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Progress value={completionPercentage} className="h-3" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{completionPercentage}% Complete</span>
            <span>{stats.assigned - stats.completed} tasks remaining</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activities
            </CardTitle>
            <CardDescription>
              Latest updates across HR implementation tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 border-b pb-3 last:border-0 last:pb-0"
                >
                  <div className="mt-0.5">
                    {activity.type === "completed" && (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    )}
                    {activity.type === "started" && (
                      <PlayCircle className="h-4 w-4 text-blue-600" />
                    )}
                    {activity.type === "issue" && (
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                    )}
                    {activity.type === "update" && (
                      <Activity className="h-4 w-4 text-amber-600" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${activityBadgeVariant[activity.type]}`}
                      >
                        {activity.action}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {activity.timestamp}
                      </span>
                    </div>
                    <p className="text-sm font-medium">{activity.task}</p>
                    <p className="text-xs text-muted-foreground">
                      by {activity.user}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Navigate to key HR implementation areas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={action.page}
                    variant="outline"
                    className="h-auto justify-between p-4"
                    onClick={() => onNavigate(action.page)}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">{action.label}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
