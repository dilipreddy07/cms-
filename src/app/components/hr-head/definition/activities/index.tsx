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
import { Input } from "@/app/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import {
  Plus,
  Search,
  FileText,
  Users,
  ShieldCheck,
  ClipboardList,
  Filter,
} from "lucide-react";

type ActivityType = "Policy" | "Procedure" | "Template" | "Compliance";
type ActivityStatus = "Completed" | "In Progress" | "Not Started";

interface HRActivity {
  id: string;
  name: string;
  type: ActivityType;
  status: ActivityStatus;
  date: string;
  owner: string;
}

const mockActivities: HRActivity[] = [
  {
    id: "1",
    name: "Draft Remote Work Policy",
    type: "Policy",
    status: "Completed",
    date: "2026-03-20",
    owner: "Sarah Mitchell",
  },
  {
    id: "2",
    name: "Define Onboarding Procedure",
    type: "Procedure",
    status: "In Progress",
    date: "2026-03-19",
    owner: "James Carter",
  },
  {
    id: "3",
    name: "Create Offer Letter Template",
    type: "Template",
    status: "Completed",
    date: "2026-03-18",
    owner: "Linda Park",
  },
  {
    id: "4",
    name: "GDPR Employee Data Compliance Review",
    type: "Compliance",
    status: "In Progress",
    date: "2026-03-17",
    owner: "Robert Nguyen",
  },
  {
    id: "5",
    name: "Update Anti-Harassment Policy",
    type: "Policy",
    status: "Not Started",
    date: "2026-03-22",
    owner: "Emily Foster",
  },
  {
    id: "6",
    name: "Exit Interview Procedure",
    type: "Procedure",
    status: "Completed",
    date: "2026-03-15",
    owner: "Michael Brown",
  },
  {
    id: "7",
    name: "Performance Review Form Template",
    type: "Template",
    status: "In Progress",
    date: "2026-03-21",
    owner: "Sarah Mitchell",
  },
  {
    id: "8",
    name: "Labor Law Compliance Audit Checklist",
    type: "Compliance",
    status: "Not Started",
    date: "2026-03-22",
    owner: "James Carter",
  },
  {
    id: "9",
    name: "Define Disciplinary Action Procedure",
    type: "Procedure",
    status: "In Progress",
    date: "2026-03-16",
    owner: "Linda Park",
  },
  {
    id: "10",
    name: "Benefits Enrollment Template",
    type: "Template",
    status: "Completed",
    date: "2026-03-14",
    owner: "Robert Nguyen",
  },
];

const activityTypes: ActivityType[] = [
  "Policy",
  "Procedure",
  "Template",
  "Compliance",
];

function ActivitiesPage() {
  const [activities, setActivities] = useState<HRActivity[]>(mockActivities);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newActivity, setNewActivity] = useState({
    name: "",
    type: "Policy" as ActivityType,
    owner: "",
  });

  const filteredActivities = activities.filter((activity) => {
    const matchesType =
      filterType === "all" || activity.type === filterType;
    const matchesSearch =
      activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.owner.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleAddActivity = () => {
    if (!newActivity.name.trim() || !newActivity.owner.trim()) return;

    const activity: HRActivity = {
      id: String(activities.length + 1),
      name: newActivity.name,
      type: newActivity.type,
      status: "Not Started",
      date: new Date().toISOString().split("T")[0],
      owner: newActivity.owner,
    };

    setActivities((prev) => [activity, ...prev]);
    setNewActivity({ name: "", type: "Policy", owner: "" });
    setShowAddForm(false);
  };

  const getTypeBadge = (type: ActivityType) => {
    const config: Record<ActivityType, { className: string; icon: typeof FileText }> = {
      Policy: { className: "bg-blue-100 text-blue-800", icon: FileText },
      Procedure: { className: "bg-purple-100 text-purple-800", icon: ClipboardList },
      Template: { className: "bg-teal-100 text-teal-800", icon: Users },
      Compliance: { className: "bg-orange-100 text-orange-800", icon: ShieldCheck },
    };
    const { className, icon: Icon } = config[type];
    return (
      <Badge className={className}>
        <Icon className="mr-1 h-3 w-3" />
        {type}
      </Badge>
    );
  };

  const getStatusBadge = (status: ActivityStatus) => {
    const config: Record<ActivityStatus, string> = {
      Completed: "bg-green-100 text-green-800",
      "In Progress": "bg-yellow-100 text-yellow-800",
      "Not Started": "bg-gray-100 text-gray-800",
    };
    return <Badge className={config[status]}>{status}</Badge>;
  };

  const statusCounts = {
    total: activities.length,
    completed: activities.filter((a) => a.status === "Completed").length,
    inProgress: activities.filter((a) => a.status === "In Progress").length,
    notStarted: activities.filter((a) => a.status === "Not Started").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            HR Definition Activities
          </h1>
          <p className="text-muted-foreground mt-1">
            Track and manage all HR definition activities
          </p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Activity
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{statusCounts.total}</div>
            <p className="text-xs text-muted-foreground">Total Activities</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">
              {statusCounts.completed}
            </div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">
              {statusCounts.inProgress}
            </div>
            <p className="text-xs text-muted-foreground">In Progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-gray-600">
              {statusCounts.notStarted}
            </div>
            <p className="text-xs text-muted-foreground">Not Started</p>
          </CardContent>
        </Card>
      </div>

      {/* Add Activity Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">New Activity</CardTitle>
            <CardDescription>Add a new HR definition activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="flex-1 space-y-1">
                <label className="text-sm font-medium">Activity Name</label>
                <Input
                  placeholder="Enter activity name..."
                  value={newActivity.name}
                  onChange={(e) =>
                    setNewActivity((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>
              <div className="w-full sm:w-40 space-y-1">
                <label className="text-sm font-medium">Type</label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={newActivity.type}
                  onChange={(e) =>
                    setNewActivity((prev) => ({
                      ...prev,
                      type: e.target.value as ActivityType,
                    }))
                  }
                >
                  {activityTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1 space-y-1">
                <label className="text-sm font-medium">Owner</label>
                <Input
                  placeholder="Enter owner name..."
                  value={newActivity.owner}
                  onChange={(e) =>
                    setNewActivity((prev) => ({
                      ...prev,
                      owner: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddActivity}>Add</Button>
                <Button
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Activity Log Table */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
          <CardDescription>
            All HR definition activities with their current status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search activities or owners..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant={filterType === "all" ? "default" : "outline"}
                  onClick={() => setFilterType("all")}
                >
                  All
                </Button>
                {activityTypes.map((type) => (
                  <Button
                    key={type}
                    size="sm"
                    variant={filterType === type ? "default" : "outline"}
                    onClick={() => setFilterType(type)}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Activity Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Owner</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredActivities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell className="font-medium">
                      {activity.name}
                    </TableCell>
                    <TableCell>{getTypeBadge(activity.type)}</TableCell>
                    <TableCell>{getStatusBadge(activity.status)}</TableCell>
                    <TableCell>{activity.date}</TableCell>
                    <TableCell>{activity.owner}</TableCell>
                  </TableRow>
                ))}
                {filteredActivities.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No activities found matching your criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ActivitiesPage;
