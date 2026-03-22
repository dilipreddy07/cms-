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
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
  Target,
  ShieldCheck,
  AlertTriangle,
  BarChart3,
} from "lucide-react";

type TrendDirection = "up" | "down" | "stable";

interface KpiCard {
  id: string;
  title: string;
  value: number;
  unit: string;
  target: number;
  trend: TrendDirection;
  trendValue: string;
  description: string;
}

interface PhaseMetric {
  id: string;
  phase: string;
  plannedStart: string;
  actualStart: string;
  plannedEnd: string;
  actualEnd: string | null;
  completionRate: number;
  qualityScore: number;
  status: "On Track" | "At Risk" | "Delayed" | "Completed";
}

interface TrendDataPoint {
  month: string;
  onTimeDelivery: number;
  qualityScore: number;
  riskMitigation: number;
  compliance: number;
}

const mockKpis: KpiCard[] = [
  {
    id: "1",
    title: "On-Time Delivery",
    value: 87,
    unit: "%",
    target: 95,
    trend: "up",
    trendValue: "+3.2%",
    description: "Percentage of deliverables completed on schedule",
  },
  {
    id: "2",
    title: "Quality Score",
    value: 92,
    unit: "%",
    target: 90,
    trend: "up",
    trendValue: "+1.5%",
    description: "Overall quality rating across all phases",
  },
  {
    id: "3",
    title: "Risk Mitigation Rate",
    value: 78,
    unit: "%",
    target: 85,
    trend: "down",
    trendValue: "-2.1%",
    description: "Percentage of identified risks successfully mitigated",
  },
  {
    id: "4",
    title: "Compliance Score",
    value: 94,
    unit: "%",
    target: 100,
    trend: "stable",
    trendValue: "0%",
    description: "Adherence to regulatory and organizational standards",
  },
];

const mockPhaseMetrics: PhaseMetric[] = [
  {
    id: "1",
    phase: "Planning & Initiation",
    plannedStart: "2026-01-05",
    actualStart: "2026-01-05",
    plannedEnd: "2026-01-25",
    actualEnd: "2026-01-23",
    completionRate: 100,
    qualityScore: 95,
    status: "Completed",
  },
  {
    id: "2",
    phase: "Requirements Gathering",
    plannedStart: "2026-01-26",
    actualStart: "2026-01-26",
    plannedEnd: "2026-02-14",
    actualEnd: "2026-02-16",
    completionRate: 100,
    qualityScore: 88,
    status: "Completed",
  },
  {
    id: "3",
    phase: "Design & Architecture",
    plannedStart: "2026-02-15",
    actualStart: "2026-02-17",
    plannedEnd: "2026-03-07",
    actualEnd: "2026-03-10",
    completionRate: 100,
    qualityScore: 91,
    status: "Completed",
  },
  {
    id: "4",
    phase: "Implementation",
    plannedStart: "2026-03-08",
    actualStart: "2026-03-11",
    plannedEnd: "2026-04-10",
    actualEnd: null,
    completionRate: 64,
    qualityScore: 93,
    status: "At Risk",
  },
  {
    id: "5",
    phase: "Testing & QA",
    plannedStart: "2026-04-01",
    actualStart: "2026-04-03",
    plannedEnd: "2026-04-20",
    actualEnd: null,
    completionRate: 22,
    qualityScore: 90,
    status: "On Track",
  },
  {
    id: "6",
    phase: "Deployment & Validation",
    plannedStart: "2026-04-21",
    actualStart: "-",
    plannedEnd: "2026-05-10",
    actualEnd: null,
    completionRate: 0,
    qualityScore: 0,
    status: "On Track",
  },
];

const mockTrendData: TrendDataPoint[] = [
  { month: "Oct 2025", onTimeDelivery: 82, qualityScore: 85, riskMitigation: 74, compliance: 89 },
  { month: "Nov 2025", onTimeDelivery: 80, qualityScore: 87, riskMitigation: 76, compliance: 91 },
  { month: "Dec 2025", onTimeDelivery: 83, qualityScore: 88, riskMitigation: 80, compliance: 92 },
  { month: "Jan 2026", onTimeDelivery: 85, qualityScore: 90, riskMitigation: 82, compliance: 93 },
  { month: "Feb 2026", onTimeDelivery: 84, qualityScore: 91, riskMitigation: 80, compliance: 94 },
  { month: "Mar 2026", onTimeDelivery: 87, qualityScore: 92, riskMitigation: 78, compliance: 94 },
];

function ProjectMetricsPage() {
  const [kpis] = useState<KpiCard[]>(mockKpis);
  const [phaseMetrics] = useState<PhaseMetric[]>(mockPhaseMetrics);
  const [trendData] = useState<TrendDataPoint[]>(mockTrendData);

  const getTrendIcon = (trend: TrendDirection) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      case "stable":
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: TrendDirection) => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      case "stable":
        return "text-gray-600";
    }
  };

  const getKpiIcon = (title: string) => {
    switch (title) {
      case "On-Time Delivery":
        return <Clock className="h-4 w-4 text-muted-foreground" />;
      case "Quality Score":
        return <Target className="h-4 w-4 text-muted-foreground" />;
      case "Risk Mitigation Rate":
        return <AlertTriangle className="h-4 w-4 text-muted-foreground" />;
      case "Compliance Score":
        return <ShieldCheck className="h-4 w-4 text-muted-foreground" />;
      default:
        return <BarChart3 className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: PhaseMetric["status"]) => {
    switch (status) {
      case "Completed":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="mr-1 h-3 w-3" /> Completed
          </Badge>
        );
      case "On Track":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <TrendingUp className="mr-1 h-3 w-3" /> On Track
          </Badge>
        );
      case "At Risk":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <AlertTriangle className="mr-1 h-3 w-3" /> At Risk
          </Badge>
        );
      case "Delayed":
        return (
          <Badge className="bg-red-100 text-red-800">
            <Clock className="mr-1 h-3 w-3" /> Delayed
          </Badge>
        );
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-yellow-600";
    if (score > 0) return "text-red-600";
    return "text-muted-foreground";
  };

  const getProgressColor = (value: number, target: number) => {
    const ratio = value / target;
    if (ratio >= 1) return "text-green-600";
    if (ratio >= 0.85) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Project Metrics</h2>
        <p className="text-muted-foreground">
          Key performance indicators and project performance data
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              {getKpiIcon(kpi.title)}
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className={`text-2xl font-bold ${getProgressColor(kpi.value, kpi.target)}`}>
                  {kpi.value}{kpi.unit}
                </span>
                <div className={`flex items-center gap-1 text-xs ${getTrendColor(kpi.trend)}`}>
                  {getTrendIcon(kpi.trend)}
                  <span>{kpi.trendValue}</span>
                </div>
              </div>
              <div className="mt-2 space-y-1">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Target: {kpi.target}{kpi.unit}</span>
                  <span>{Math.round((kpi.value / kpi.target) * 100)}% of target</span>
                </div>
                <Progress value={(kpi.value / kpi.target) * 100} className="h-1.5" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">{kpi.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Performance Summary by Phase
          </CardTitle>
          <CardDescription>
            Detailed metrics breakdown across all project phases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Phase</TableHead>
                  <TableHead>Planned Start</TableHead>
                  <TableHead>Actual Start</TableHead>
                  <TableHead>Planned End</TableHead>
                  <TableHead>Actual End</TableHead>
                  <TableHead>Completion</TableHead>
                  <TableHead>Quality</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {phaseMetrics.map((metric) => (
                  <TableRow key={metric.id}>
                    <TableCell className="font-medium">{metric.phase}</TableCell>
                    <TableCell className="text-sm">{metric.plannedStart}</TableCell>
                    <TableCell className="text-sm">{metric.actualStart}</TableCell>
                    <TableCell className="text-sm">{metric.plannedEnd}</TableCell>
                    <TableCell className="text-sm">{metric.actualEnd || "-"}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={metric.completionRate} className="h-2 w-16" />
                        <span className="text-sm font-medium">{metric.completionRate}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`text-sm font-medium ${getScoreColor(metric.qualityScore)}`}>
                        {metric.qualityScore > 0 ? `${metric.qualityScore}%` : "-"}
                      </span>
                    </TableCell>
                    <TableCell>{getStatusBadge(metric.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Monthly Trend Data
          </CardTitle>
          <CardDescription>
            Historical performance metrics over the last 6 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead>On-Time Delivery</TableHead>
                  <TableHead>Quality Score</TableHead>
                  <TableHead>Risk Mitigation</TableHead>
                  <TableHead>Compliance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trendData.map((point, index) => {
                  const prev = index > 0 ? trendData[index - 1] : null;
                  return (
                    <TableRow key={point.month}>
                      <TableCell className="font-medium">{point.month}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={getScoreColor(point.onTimeDelivery)}>
                            {point.onTimeDelivery}%
                          </span>
                          {prev && (
                            <span className="text-xs">
                              {point.onTimeDelivery > prev.onTimeDelivery ? (
                                <TrendingUp className="h-3 w-3 text-green-500 inline" />
                              ) : point.onTimeDelivery < prev.onTimeDelivery ? (
                                <TrendingDown className="h-3 w-3 text-red-500 inline" />
                              ) : (
                                <Minus className="h-3 w-3 text-gray-500 inline" />
                              )}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={getScoreColor(point.qualityScore)}>
                            {point.qualityScore}%
                          </span>
                          {prev && (
                            <span className="text-xs">
                              {point.qualityScore > prev.qualityScore ? (
                                <TrendingUp className="h-3 w-3 text-green-500 inline" />
                              ) : point.qualityScore < prev.qualityScore ? (
                                <TrendingDown className="h-3 w-3 text-red-500 inline" />
                              ) : (
                                <Minus className="h-3 w-3 text-gray-500 inline" />
                              )}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={getScoreColor(point.riskMitigation)}>
                            {point.riskMitigation}%
                          </span>
                          {prev && (
                            <span className="text-xs">
                              {point.riskMitigation > prev.riskMitigation ? (
                                <TrendingUp className="h-3 w-3 text-green-500 inline" />
                              ) : point.riskMitigation < prev.riskMitigation ? (
                                <TrendingDown className="h-3 w-3 text-red-500 inline" />
                              ) : (
                                <Minus className="h-3 w-3 text-gray-500 inline" />
                              )}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={getScoreColor(point.compliance)}>
                            {point.compliance}%
                          </span>
                          {prev && (
                            <span className="text-xs">
                              {point.compliance > prev.compliance ? (
                                <TrendingUp className="h-3 w-3 text-green-500 inline" />
                              ) : point.compliance < prev.compliance ? (
                                <TrendingDown className="h-3 w-3 text-red-500 inline" />
                              ) : (
                                <Minus className="h-3 w-3 text-gray-500 inline" />
                              )}
                            </span>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProjectMetricsPage;
