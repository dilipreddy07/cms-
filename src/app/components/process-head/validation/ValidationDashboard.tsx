"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";
import {
  CheckCircle,
  XCircle,
  Clock,
  ClipboardList,
  ArrowRight,
  Activity,
  BarChart3,
  ShieldCheck,
  FileSearch,
} from "lucide-react";

interface ValidationActivity {
  id: string;
  description: string;
  timestamp: string;
  type: "approved" | "rejected" | "pending";
  user: string;
}

interface ValidationDashboardProps {
  onNavigate: (page: string) => void;
}

const mockActivities: ValidationActivity[] = [
  {
    id: "1",
    description: "Safety Inspection Checklist approved",
    timestamp: "2026-03-22 09:15",
    type: "approved",
    user: "Sarah Chen",
  },
  {
    id: "2",
    description: "Environmental Compliance Report rejected",
    timestamp: "2026-03-22 08:42",
    type: "rejected",
    user: "Mark Johnson",
  },
  {
    id: "3",
    description: "Quality Assurance Procedure submitted for review",
    timestamp: "2026-03-21 16:30",
    type: "pending",
    user: "Emily Davis",
  },
  {
    id: "4",
    description: "Risk Assessment Template approved",
    timestamp: "2026-03-21 14:10",
    type: "approved",
    user: "Sarah Chen",
  },
  {
    id: "5",
    description: "Training Compliance Record submitted for review",
    timestamp: "2026-03-21 11:55",
    type: "pending",
    user: "James Wilson",
  },
  {
    id: "6",
    description: "Data Privacy Audit rejected - missing sections",
    timestamp: "2026-03-20 17:20",
    type: "rejected",
    user: "Mark Johnson",
  },
  {
    id: "7",
    description: "Operational Readiness Review approved",
    timestamp: "2026-03-20 15:00",
    type: "approved",
    user: "Emily Davis",
  },
];

const summaryData = {
  total: 48,
  approved: 29,
  rejected: 7,
  pending: 12,
};

function ValidationDashboard({ onNavigate }: ValidationDashboardProps) {
  const [activities] = useState<ValidationActivity[]>(mockActivities);

  const completionPercentage = Math.round(
    ((summaryData.approved + summaryData.rejected) / summaryData.total) * 100
  );

  const getActivityIcon = (type: ValidationActivity["type"]) => {
    switch (type) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getActivityBadge = (type: ValidationActivity["type"]) => {
    switch (type) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Validation Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of validation progress and recent activities
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.total}</div>
            <p className="text-xs text-muted-foreground">Items requiring validation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{summaryData.approved}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((summaryData.approved / summaryData.total) * 100)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{summaryData.rejected}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((summaryData.rejected / summaryData.total) * 100)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{summaryData.pending}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((summaryData.pending / summaryData.total) * 100)}% of total
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Validation Completion</CardTitle>
          <CardDescription>
            Overall progress across all validation items
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progress</span>
              <span className="font-medium">{completionPercentage}%</span>
            </div>
            <Progress value={completionPercentage} className="h-3" />
            <p className="text-xs text-muted-foreground">
              {summaryData.approved + summaryData.rejected} of {summaryData.total} items reviewed
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate("review")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Review Tasks</CardTitle>
              <CardDescription>Review and approve completed tasks</CardDescription>
            </div>
            <FileSearch className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm" className="w-full">
              Go to Review <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate("quality")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Quality Verification</CardTitle>
              <CardDescription>Verify compliance with standards</CardDescription>
            </div>
            <ShieldCheck className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm" className="w-full">
              Go to Quality <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate("metrics")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Project Metrics</CardTitle>
              <CardDescription>View KPIs and performance data</CardDescription>
            </div>
            <BarChart3 className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm" className="w-full">
              Go to Metrics <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Validation Activities
          </CardTitle>
          <CardDescription>Latest validation actions across all items</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  {getActivityIcon(activity.type)}
                  <div>
                    <p className="text-sm font-medium">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">
                      by {activity.user} - {activity.timestamp}
                    </p>
                  </div>
                </div>
                {getActivityBadge(activity.type)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ValidationDashboard;
