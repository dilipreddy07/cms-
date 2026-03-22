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
  CheckCircle,
  XCircle,
  Clock,
  ClipboardList,
  ArrowRight,
  Activity,
  FileSearch,
  BarChart3,
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
    description: "Leave Policy v2.1 approved",
    timestamp: "2026-03-22 10:30",
    type: "approved",
    user: "Sarah Mitchell",
  },
  {
    id: "2",
    description: "Onboarding Checklist rejected - incomplete sections",
    timestamp: "2026-03-22 09:15",
    type: "rejected",
    user: "James Carter",
  },
  {
    id: "3",
    description: "Grievance Handling Procedure submitted for review",
    timestamp: "2026-03-21 16:45",
    type: "pending",
    user: "Linda Park",
  },
  {
    id: "4",
    description: "Employee Handbook Chapter 3 approved",
    timestamp: "2026-03-21 14:20",
    type: "approved",
    user: "Robert Nguyen",
  },
  {
    id: "5",
    description: "Benefits Policy update submitted for review",
    timestamp: "2026-03-21 11:00",
    type: "pending",
    user: "Emily Foster",
  },
  {
    id: "6",
    description: "Performance Appraisal Template rejected",
    timestamp: "2026-03-20 17:30",
    type: "rejected",
    user: "Michael Brown",
  },
  {
    id: "7",
    description: "Workplace Safety Compliance Report approved",
    timestamp: "2026-03-20 15:10",
    type: "approved",
    user: "Sarah Mitchell",
  },
];

const summaryData = {
  total: 42,
  approved: 24,
  rejected: 6,
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
        <h2 className="text-2xl font-bold tracking-tight">
          HR Validation Dashboard
        </h2>
        <p className="text-muted-foreground">
          Overview of HR validation progress and recent activities
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Items Validated
            </CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.total}</div>
            <p className="text-xs text-muted-foreground">
              Total items requiring validation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {summaryData.pending}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((summaryData.pending / summaryData.total) * 100)}% of
              total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {summaryData.approved}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((summaryData.approved / summaryData.total) * 100)}% of
              total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {summaryData.rejected}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((summaryData.rejected / summaryData.total) * 100)}% of
              total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Validation Completion */}
      <Card>
        <CardHeader>
          <CardTitle>Validation Completion</CardTitle>
          <CardDescription>
            Overall progress across all HR validation items
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
              {summaryData.approved + summaryData.rejected} of{" "}
              {summaryData.total} items reviewed
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onNavigate("review")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Review HR Items</CardTitle>
              <CardDescription>
                Review and approve submitted HR documents
              </CardDescription>
            </div>
            <FileSearch className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm" className="w-full">
              Go to Review <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onNavigate("review-details")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Review Details</CardTitle>
              <CardDescription>
                View detailed review history and notes
              </CardDescription>
            </div>
            <ClipboardList className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm" className="w-full">
              View Details <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onNavigate("metrics")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Validation Metrics</CardTitle>
              <CardDescription>
                View KPIs and validation performance
              </CardDescription>
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

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Validation Activities
          </CardTitle>
          <CardDescription>
            Latest HR validation actions across all items
          </CardDescription>
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
                    <p className="text-sm font-medium">
                      {activity.description}
                    </p>
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
