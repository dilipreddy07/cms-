import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

// ─── Process Head: Definition ─────────────────────────────────────────────────
import DefinitionDashboard from "@/app/components/process-head/definition/DefinitionDashboard";
import Standards from "@/app/components/process-head/definition/Standards";
import TaskManagement from "@/app/components/process-head/definition/TaskManagement";
import AssociatedRiskPage from "@/app/components/process-head/definition/AssociatedRiskPage";
import DefinitionStatus from "@/app/components/process-head/definition/DefinitionStatus";

// ─── Process Head: Implementation ─────────────────────────────────────────────
import ImplementationDashboard from "@/app/components/process-head/implementation/ImplementationDashboard";
import ImplementationPage from "@/app/components/process-head/implementation/ImplementationPage";
import IssueManagementPage from "@/app/components/process-head/implementation/IssueManagementPage";
import RiskManagementPage from "@/app/components/process-head/implementation/RiskManagementPage";
import ProgressTrackingPage from "@/app/components/process-head/implementation/ProgressTrackingPage";

// ─── Process Head: Validation ─────────────────────────────────────────────────
import ValidationDashboard from "@/app/components/process-head/validation/ValidationDashboard";
import ReviewPage from "@/app/components/process-head/validation/ReviewPage";
import QualityVerificationPage from "@/app/components/process-head/validation/QualityVerificationPage";
import ProjectMetricsPage from "@/app/components/process-head/validation/ProjectMetricsPage";

// ─── HR Head: Definition ──────────────────────────────────────────────────────
import HRDefinitionDashboard from "@/app/components/hr-head/definition/DefinitionDashboard";
import HRDefinitionActivities from "@/app/components/hr-head/definition/activities";

// ─── HR Head: Validation ──────────────────────────────────────────────────────
import HRValidationDashboard from "@/app/components/hr-head/validation/ValidationDashboard";
import HRReviewPage from "@/app/components/hr-head/validation/ReviewPage";
import HRReviewDetails from "@/app/components/hr-head/validation/ReviewDetails";

// ─── HR Executive: Implementation ─────────────────────────────────────────────
import HRExecImplementationDashboard from "@/app/components/hr-executive/implementation/ImplementationDashboard";
import HRExecActivities from "@/app/components/hr-executive/implementation/activities";

// ─── Phase Layout ─────────────────────────────────────────────────────────────
import PhaseLayout from "@/app/layouts/PhaseLayout";

// Helper: wraps a dashboard to provide router-based onNavigate
function RoutedDashboard({
  Dashboard,
  basePath,
}: {
  Dashboard: React.ComponentType<{ onNavigate: (page: string) => void }>;
  basePath: string;
}) {
  const nav = useNavigate();
  return <Dashboard onNavigate={(page: string) => nav(`${basePath}/${page}`)} />;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* ══════════════════════════════════════════════════════════════════════
          PROCESS HEAD
         ══════════════════════════════════════════════════════════════════════ */}

      {/* Definition Phase */}
      <Route
        path="/process-head/definition"
        element={<PhaseLayout role="process-head" phase="definition" />}
      >
        <Route index element={<RoutedDashboard Dashboard={DefinitionDashboard} basePath="/process-head/definition" />} />
        <Route path="standards" element={<Standards />} />
        <Route path="tasks" element={<TaskManagement />} />
        <Route path="risks" element={<AssociatedRiskPage />} />
        <Route path="status" element={<DefinitionStatus />} />
      </Route>

      {/* Implementation Phase */}
      <Route
        path="/process-head/implementation"
        element={<PhaseLayout role="process-head" phase="implementation" />}
      >
        <Route index element={<RoutedDashboard Dashboard={ImplementationDashboard} basePath="/process-head/implementation" />} />
        <Route path="execute" element={<ImplementationPage />} />
        <Route path="issues" element={<IssueManagementPage />} />
        <Route path="risks" element={<RiskManagementPage />} />
        <Route path="progress" element={<ProgressTrackingPage />} />
      </Route>

      {/* Validation Phase */}
      <Route
        path="/process-head/validation"
        element={<PhaseLayout role="process-head" phase="validation" />}
      >
        <Route index element={<RoutedDashboard Dashboard={ValidationDashboard} basePath="/process-head/validation" />} />
        <Route path="review" element={<ReviewPage />} />
        <Route path="quality" element={<QualityVerificationPage />} />
        <Route path="metrics" element={<ProjectMetricsPage />} />
      </Route>

      {/* ══════════════════════════════════════════════════════════════════════
          HR HEAD
         ══════════════════════════════════════════════════════════════════════ */}

      {/* Definition Phase */}
      <Route
        path="/hr-head/definition"
        element={<PhaseLayout role="hr-head" phase="definition" />}
      >
        <Route index element={<RoutedDashboard Dashboard={HRDefinitionDashboard} basePath="/hr-head/definition" />} />
        <Route path="activities" element={<HRDefinitionActivities />} />
      </Route>

      {/* Validation Phase */}
      <Route
        path="/hr-head/validation"
        element={<PhaseLayout role="hr-head" phase="validation" />}
      >
        <Route index element={<RoutedDashboard Dashboard={HRValidationDashboard} basePath="/hr-head/validation" />} />
        <Route path="review" element={<HRReviewPage />} />
        <Route path="review/:reviewId" element={<HRReviewDetails />} />
      </Route>

      {/* ══════════════════════════════════════════════════════════════════════
          HR EXECUTIVE
         ══════════════════════════════════════════════════════════════════════ */}

      {/* Implementation Phase */}
      <Route
        path="/hr-executive/implementation"
        element={<PhaseLayout role="hr-executive" phase="implementation" />}
      >
        <Route index element={<RoutedDashboard Dashboard={HRExecImplementationDashboard} basePath="/hr-executive/implementation" />} />
        <Route path="activities" element={<HRExecActivities />} />
      </Route>

      {/* ══════════════════════════════════════════════════════════════════════
          FALLBACK
         ══════════════════════════════════════════════════════════════════════ */}
      <Route path="*" element={<Navigate to="/process-head/definition" replace />} />
    </Routes>
  );
}
