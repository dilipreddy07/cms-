import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  TrendingUp,
  BarChart3,
  Eye,
  ArrowUpRight
} from "lucide-react";
import { useProjectData } from "@/app/context/ProjectDataContext";

export function ValidationDashboardView() {
  const handleViewAllReviews = () => {
    console.log("Navigate to Project Reviews");
    alert("Navigating to Project Reviews page");
  };

  const handleReviewVerifications = () => {
    console.log("Navigate to Quality Verifications");
    alert("Navigating to Quality Verifications page");
  };

  const handleAnalyzeMetrics = () => {
    console.log("Navigate to Project Metrics");
    alert("Navigating to Project Metrics page");
  };

  const handleGenerateNewReport = () => {
    console.log("Navigate to Final Reports");
    alert("Navigating to Final Reports page");
  };

  const { projectReviews, qualityVerifications, projectMetrics, finalReports } = useProjectData();

  // Calculate aggregated statistics
  const totalProjectsReviewed = projectReviews.length;
  const projectsPendingValidation = projectReviews.filter(r => r.reviewStatus === "Pending").length;
  const qualityChecksCompleted = qualityVerifications.filter(q => q.verificationResult === "Passed").length;
  const qualityIssuesIdentified = qualityVerifications.filter(q => q.verificationResult === "Failed").length;
  const reportsGenerated = finalReports.length;
  
  // Calculate validation completion percentage
  const totalReviews = projectReviews.length;
  const completedReviews = projectReviews.filter(r => r.reviewStatus === "Approved").length;
  const validationCompletionPercentage = totalReviews > 0 ? Math.round((completedReviews / totalReviews) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Validation Dashboard</h2>
            <p className="text-emerald-50 mt-1">Review completed work, verify compliance, and generate final reports</p>
          </div>
          <Badge className="px-4 py-2 bg-white text-emerald-600 hover:bg-emerald-50">Validation Phase</Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-blue-50">Total Projects Reviewed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{totalProjectsReviewed}</div>
              <div className="p-3 bg-white/20 backdrop-blur rounded-lg">
                <CheckCircle className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <ArrowUpRight className="h-3 w-3" />
              <p className="text-xs font-medium">+3 this month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-500 to-orange-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-amber-50">Projects Pending Validation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{projectsPendingValidation}</div>
              <div className="p-3 bg-white/20 backdrop-blur rounded-lg">
                <Clock className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <Clock className="h-3 w-3" />
              <p className="text-xs font-medium">Requires attention</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-green-50">Quality Checks Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{qualityChecksCompleted}</div>
              <div className="p-3 bg-white/20 backdrop-blur rounded-lg">
                <CheckCircle className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-3 w-3" />
              <p className="text-xs font-medium">+12 this week</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-red-500 to-pink-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-red-50">Quality Issues Identified</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{qualityIssuesIdentified}</div>
              <div className="p-3 bg-white/20 backdrop-blur rounded-lg">
                <AlertCircle className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <AlertCircle className="h-3 w-3" />
              <p className="text-xs font-medium">Needs resolution</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-indigo-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-purple-50">Validation Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{validationCompletionPercentage}%</div>
              <div className="p-3 bg-white/20 backdrop-blur rounded-lg">
                <BarChart3 className="h-6 w-6" />
              </div>
            </div>
            <Progress value={validationCompletionPercentage} className="h-2 mt-2 bg-white/30" />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-teal-500 to-cyan-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-teal-50">Reports Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{reportsGenerated}</div>
              <div className="p-3 bg-white/20 backdrop-blur rounded-lg">
                <FileText className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <FileText className="h-3 w-3" />
              <p className="text-xs font-medium">Available for review</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-all">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500 rounded-lg">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-gray-900">Project Review Details</CardTitle>
                <CardDescription>View and manage project reviews</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Reviews</span>
                <span className="text-sm font-bold text-gray-900">18</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Approved</span>
                <span className="text-sm font-bold text-green-600">13</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Pending</span>
                <span className="text-sm font-bold text-amber-600">5</span>
              </div>
              <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-cyan-500" onClick={handleViewAllReviews}>
                <Eye className="h-4 w-4 mr-2" />
                View All Reviews
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-500 rounded-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-gray-900">Quality Verification Status</CardTitle>
                <CardDescription>Review compliance verification results</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Verifications</span>
                <span className="text-sm font-bold text-gray-900">42</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Passed</span>
                <span className="text-sm font-bold text-green-600">34</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Issues Found</span>
                <span className="text-sm font-bold text-red-600">8</span>
              </div>
              <Button className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-500" onClick={handleReviewVerifications}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Review Verifications
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-500 rounded-lg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-gray-900">Project Metrics</CardTitle>
                <CardDescription>Analyze project performance data</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Task Completion</span>
                <span className="text-sm font-bold text-gray-900">87%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Issue Resolution</span>
                <span className="text-sm font-bold text-gray-900">92%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Schedule Performance</span>
                <span className="text-sm font-bold text-green-600">On Track</span>
              </div>
              <Button className="w-full mt-4 bg-gradient-to-r from-purple-500 to-indigo-500" onClick={handleAnalyzeMetrics}>
                <BarChart3 className="h-4 w-4 mr-2" />
                Analyze Metrics
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-500 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-gray-900">Final Reports</CardTitle>
                <CardDescription>Generate and download final reports</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Reports Generated</span>
                <span className="text-sm font-bold text-gray-900">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Approved</span>
                <span className="text-sm font-bold text-green-600">10</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Pending Review</span>
                <span className="text-sm font-bold text-amber-600">2</span>
              </div>
              <Button className="w-full mt-4 bg-gradient-to-r from-orange-500 to-amber-500" onClick={handleGenerateNewReport}>
                <FileText className="h-4 w-4 mr-2" />
                Generate New Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Validation Workflow Progress */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 border-b">
          <CardTitle className="text-gray-900">Validation Workflow Progress</CardTitle>
          <CardDescription>Track the validation process from review to final report</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">Project Review</h4>
                  <Badge className="bg-green-500 text-white">Completed</Badge>
                </div>
                <Progress value={100} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">13/18 projects approved</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">Quality Verification</h4>
                  <Badge className="bg-blue-500 text-white">In Progress</Badge>
                </div>
                <Progress value={81} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">34/42 verifications passed</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">Project Metrics Evaluation</h4>
                  <Badge className="bg-purple-500 text-white">In Progress</Badge>
                </div>
                <Progress value={65} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">Metrics analysis ongoing</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">
                4
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">Final Report Generation</h4>
                  <Badge variant="outline" className="text-gray-600">Pending</Badge>
                </div>
                <Progress value={30} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">12 reports generated</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}