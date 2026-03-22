"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
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
  Target,
  TrendingUp,
  CheckCircle2,
  Clock,
  BarChart3,
  Calendar,
  ListChecks,
  AlertCircle,
} from "lucide-react";

interface PhaseProgress {
  name: string;
  completed: number;
  total: number;
}

interface Milestone {
  id: string;
  name: string;
  targetDate: string;
  status: "Completed" | "On Track" | "At Risk" | "Overdue";
  completionPercentage: number;
}

interface TrendEntry {
  week: string;
  completed: number;
  cumulative: number;
}

const mockPhases: PhaseProgress[] = [
  { name: "Access Control Implementation", completed: 5, total: 6 },
  { name: "Data Protection & Encryption", completed: 3, total: 5 },
  { name: "Network Security Configuration", completed: 4, total: 7 },
  { name: "Security Awareness Training", completed: 2, total: 3 },
  { name: "Incident Response Setup", completed: 1, total: 4 },
  { name: "Vendor Risk Assessment", completed: 0, total: 3 },
];

const mockMilestones: Milestone[] = [
  {
    id: "MS-001",
    name: "Core Access Controls Deployed",
    targetDate: "2026-03-15",
    status: "Completed",
    completionPercentage: 100,
  },
  {
    id: "MS-002",
    name: "Encryption Standards Enforced",
    targetDate: "2026-03-28",
    status: "On Track",
    completionPercentage: 68,
  },
  {
    id: "MS-003",
    name: "Network Segmentation Complete",
    targetDate: "2026-04-05",
    status: "On Track",
    completionPercentage: 52,
  },
  {
    id: "MS-004",
    name: "Training Module Rollout",
    targetDate: "2026-03-25",
    status: "At Risk",
    completionPercentage: 40,
  },
  {
    id: "MS-005",
    name: "Incident Response Drill Executed",
    targetDate: "2026-04-15",
    status: "On Track",
    completionPercentage: 25,
  },
  {
    id: "MS-006",
    name: "Vendor Assessments Finalized",
    targetDate: "2026-04-20",
    status: "Overdue",
    completionPercentage: 10,
  },
];

const mockTrend: TrendEntry[] = [
  { week: "Week 1", completed: 3, cumulative: 3 },
  { week: "Week 2", completed: 4, cumulative: 7 },
  { week: "Week 3", completed: 2, cumulative: 9 },
  { week: "Week 4", completed: 5, cumulative: 14 },
  { week: "Week 5", completed: 3, cumulative: 17 },
  { week: "Week 6", completed: 4, cumulative: 21 },
];

const milestoneStatusConfig: Record<Milestone["status"], { className: string }> = {
  Completed: { className: "border-green-300 bg-green-50 text-green-800 hover:bg-green-50" },
  "On Track": { className: "border-blue-300 bg-blue-50 text-blue-800 hover:bg-blue-50" },
  "At Risk": { className: "border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-50" },
  Overdue: { className: "border-red-300 bg-red-50 text-red-800 hover:bg-red-50" },
};

export default function ProgressTrackingPage() {
  const totalTasks = mockPhases.reduce((acc, p) => acc + p.total, 0);
  const completedTasks = mockPhases.reduce((acc, p) => acc + p.completed, 0);
  const overallPercentage = Math.round((completedTasks / totalTasks) * 100);
  const onTrackMilestones = mockMilestones.filter((m) => m.status === "On Track" || m.status === "Completed").length;
  const atRiskMilestones = mockMilestones.filter((m) => m.status === "At Risk" || m.status === "Overdue").length;

  const [milestones] = useState<Milestone[]>(mockMilestones);

  const statsCards = [
    {
      title: "Overall Completion",
      value: `${overallPercentage}%`,
      subtitle: `${completedTasks} of ${totalTasks} tasks`,
      icon: Target,
      color: "text-blue-700",
      bg: "bg-blue-50",
    },
    {
      title: "Tasks Completed",
      value: completedTasks,
      subtitle: `${totalTasks - completedTasks} remaining`,
      icon: CheckCircle2,
      color: "text-green-700",
      bg: "bg-green-50",
    },
    {
      title: "Milestones On Track",
      value: onTrackMilestones,
      subtitle: `of ${mockMilestones.length} total`,
      icon: TrendingUp,
      color: "text-emerald-700",
      bg: "bg-emerald-50",
    },
    {
      title: "At Risk / Overdue",
      value: atRiskMilestones,
      subtitle: "milestones need attention",
      icon: AlertCircle,
      color: "text-red-700",
      bg: "bg-red-50",
    },
  ];

  const maxCompleted = Math.max(...mockTrend.map((t) => t.completed));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Progress Tracking</h2>
        <p className="text-muted-foreground">
          Monitor implementation progress, milestones, and completion trends.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                <div className={`rounded-md p-2 ${card.bg}`}>
                  <Icon className={`h-4 w-4 ${card.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{card.subtitle}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Overall Completion Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Overall Completion
          </CardTitle>
          <CardDescription>
            {completedTasks} of {totalTasks} total tasks completed across all phases
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Progress value={overallPercentage} className="h-4" />
            </div>
            <span className="text-2xl font-bold text-blue-700 min-w-[60px] text-right">
              {overallPercentage}%
            </span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{completedTasks} completed</span>
            <span>{totalTasks - completedTasks} remaining</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Phase-wise Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListChecks className="h-5 w-5" />
              Phase-wise Progress
            </CardTitle>
            <CardDescription>Breakdown by implementation phase</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {mockPhases.map((phase) => {
              const pct = phase.total > 0 ? Math.round((phase.completed / phase.total) * 100) : 0;
              return (
                <div key={phase.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium truncate mr-2">{phase.name}</span>
                    <span className="text-muted-foreground whitespace-nowrap">
                      {phase.completed}/{phase.total} ({pct}%)
                    </span>
                  </div>
                  <Progress value={pct} className="h-2" />
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Task Completion Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Task Completion Trend
            </CardTitle>
            <CardDescription>Weekly task completions over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockTrend.map((entry) => (
                <div key={entry.week} className="flex items-center gap-3">
                  <span className="text-sm font-medium w-16 shrink-0">{entry.week}</span>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="flex-1 bg-muted rounded-full h-5 overflow-hidden">
                      <div
                        className="bg-blue-500 h-full rounded-full transition-all flex items-center justify-end pr-2"
                        style={{ width: `${(entry.completed / maxCompleted) * 100}%` }}
                      >
                        {entry.completed >= 3 && (
                          <span className="text-xs text-white font-medium">{entry.completed}</span>
                        )}
                      </div>
                    </div>
                    {entry.completed < 3 && (
                      <span className="text-xs text-muted-foreground font-medium">{entry.completed}</span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground w-20 text-right">
                    Total: {entry.cumulative}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Milestone Tracking Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Milestone Tracking
          </CardTitle>
          <CardDescription>
            {milestones.length} milestones &middot; {onTrackMilestones} on track &middot; {atRiskMilestones} need attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Milestone</TableHead>
                <TableHead>Target Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Completion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {milestones.map((milestone) => (
                <TableRow key={milestone.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{milestone.name}</p>
                      <p className="text-xs text-muted-foreground">{milestone.id}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={
                        milestone.status === "Overdue"
                          ? "text-red-600 font-medium"
                          : ""
                      }
                    >
                      {milestone.targetDate}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={milestoneStatusConfig[milestone.status].className}
                    >
                      {milestone.status === "Completed" && <CheckCircle2 className="mr-1 h-3 w-3" />}
                      {milestone.status === "On Track" && <TrendingUp className="mr-1 h-3 w-3" />}
                      {milestone.status === "At Risk" && <Clock className="mr-1 h-3 w-3" />}
                      {milestone.status === "Overdue" && <AlertCircle className="mr-1 h-3 w-3" />}
                      {milestone.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 min-w-[140px]">
                      <Progress value={milestone.completionPercentage} className="h-2 flex-1" />
                      <span className="text-sm font-medium w-10 text-right">
                        {milestone.completionPercentage}%
                      </span>
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
