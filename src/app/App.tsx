import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { InitialQuestionnaire } from "@/app/components/InitialQuestionnaire";
import { ConfigurationSummary } from "@/app/components/ConfigurationSummary";
import { LandingPage } from "@/app/components/LandingPage";
import { LoginPage } from "@/app/components/LoginPage";
import { ProcessSelection } from "@/app/components/ProcessSelection";
import { SystemAdminDashboard } from "@/app/components/SystemAdminDashboard";
import { ProcessHeadDashboard } from "@/app/components/ProcessHeadDashboard";
import { ProjectManagerDashboard } from "@/app/components/ProjectManagerDashboard";
import { TopManagementDashboard } from "@/app/components/TopManagementDashboard";
import { TeamMemberDashboard } from "@/app/components/TeamMemberDashboard";
import { ComplianceDashboard } from "@/app/components/ComplianceDashboard";
import { GenericRoleDashboard } from "@/app/components/GenericRoleDashboard";
import { HRExecutiveDashboard } from "@/app/components/HRExecutiveDashboard";
import { FrameworksList } from "@/app/components/FrameworksList";
import { RequirementsList } from "@/app/components/RequirementsList";
import { TasksList } from "@/app/components/TasksList";
import { hasProcessAccess } from "@/app/config/rolesConfig";
import { Shield, User } from "lucide-react";
import logoImage from "figma:asset/4f0d1475fb5c3a62e9dcf3b6d3e56fe97bc2ad62.png";

interface SystemConfig {
  clientName: string;
  industry: string;
  frameworks: string[];
  teamSize: string;
  complianceMaturity: string;
  primaryGoals: string[];
}

export default function App() {
  const [systemConfig, setSystemConfig] =
    useState<SystemConfig | null>(null);
  const [showConfigSummary, setShowConfigSummary] =
    useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedRole, setSelectedRole] = useState<
    string | null
  >(null);
  const [selectedProcess, setSelectedProcess] = useState<
    string | null
  >(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const handleQuestionnaireComplete = (data: SystemConfig) => {
    setSystemConfig(data);
    setShowConfigSummary(true);
  };

  const handleConfigSummaryContinue = () => {
    setShowConfigSummary(false);
  };

  const handleGetStarted = () => {
    setShowLanding(false);
  };

  const handleProcessSelect = (processId: string) => {
    setSelectedProcess(processId);
  };

  const handleLogin = (
    roleId: string,
    name: string,
    email: string,
  ) => {
    setSelectedRole(roleId);
    setUserName(name);
    setUserEmail(email);
  };

  const handleLogout = () => {
    setSelectedProcess(null);
    setSelectedRole(null);
    setUserName("");
    setUserEmail("");
    setActiveTab("dashboard");
  };

  const handleBackToLogin = () => {
    setSelectedRole(null);
    setSelectedProcess(null);
    setUserName("");
    setUserEmail("");
  };

  // Handler for exiting a role and returning to role selection
  const handleExitRole = () => {
    setSelectedProcess(null);
    setSelectedRole(null);
    setActiveTab("dashboard");
    // Keep userName and userEmail intact to maintain authentication session
  };

  // Show initial questionnaire if no system config exists
  if (!systemConfig) {
    return (
      <InitialQuestionnaire
        onComplete={handleQuestionnaireComplete}
      />
    );
  }

  // Show configuration summary if showConfigSummary is true
  if (showConfigSummary) {
    return (
      <ConfigurationSummary
        config={systemConfig}
        onContinue={handleConfigSummaryContinue}
      />
    );
  }

  // Show landing page if showLanding is true
  if (showLanding) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  // Use the industry from systemConfig as the department
  const department = systemConfig.industry;

  // Show login page if no role is selected
  if (!selectedRole) {
    return (
      <LoginPage
        department={department}
        onLogin={handleLogin}
        onBack={() => setShowLanding(true)}
      />
    );
  }

  // Show process selection page if logged in but no process is selected
  if (selectedRole && !selectedProcess) {
    return (
      <ProcessSelection
        department={department}
        role={selectedRole}
        onProcessSelect={handleProcessSelect}
        onBack={handleBackToLogin}
      />
    );
  }

  // Check if user has access to the selected process
  const hasAccess = hasProcessAccess(
    selectedRole!,
    selectedProcess!,
  );

  // If user doesn't have access to the selected process, show access denied
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-white sticky top-0 z-50">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <img
                src={logoImage}
                alt="QMICS Solutions"
                className="h-12"
              />
              <div className="border-l pl-3 ml-1">
                <h1 className="text-xl font-bold">
                  Compliance Management System
                </h1>
                <p className="text-sm text-muted-foreground">
                  {department
                    ? `${department.charAt(0).toUpperCase() + department.slice(1)} Department`
                    : "Enterprise Compliance & Risk Management"}{" "}
                  •{" "}
                  {selectedProcess &&
                    `${selectedProcess.charAt(0).toUpperCase() + selectedProcess.slice(1)} Phase`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2"
                  >
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {userName || "Admin User"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {userEmail || "admin@company.com"}
                      </p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {userName
                          ? userName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()
                              .slice(0, 2)
                          : "AU"}
                      </span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56"
                >
                  <DropdownMenuLabel>
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Access Denied Content */}
        <main className="container mx-auto px-6 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-destructive/10 rounded-full mb-4">
                <Shield className="h-10 w-10 text-destructive" />
              </div>
              <h2 className="text-3xl font-bold mb-2">
                Access Denied
              </h2>
              <p className="text-muted-foreground text-lg">
                You don't have permission to access the{" "}
                {selectedProcess &&
                  `${selectedProcess.charAt(0).toUpperCase() + selectedProcess.slice(1)} Phase`}
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-amber-900 mb-2">
                Required Access Level
              </h3>
              <p className="text-sm text-amber-800 mb-4">
                The{" "}
                <strong>
                  {selectedProcess &&
                    `${selectedProcess.charAt(0).toUpperCase() + selectedProcess.slice(1)} Phase`}
                </strong>{" "}
                requires one of the following roles:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-amber-800">
                  <div className="w-2 h-2 bg-amber-600 rounded-full" />
                  <span className="font-medium">
                    System Administrator
                  </span>{" "}
                  - Full system access and configuration
                </li>
                <li className="flex items-center gap-2 text-sm text-amber-800">
                  <div className="w-2 h-2 bg-amber-600 rounded-full" />
                  <span className="font-medium">
                    Process Head
                  </span>{" "}
                  - Process definition and management
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">
                Your Current Role
              </h3>
              <p className="text-sm text-blue-800">
                You are currently logged in as:{" "}
                <strong>
                  {selectedRole === "project-manager"
                    ? "Project Manager"
                    : selectedRole === "top-management"
                      ? "Top Management"
                      : selectedRole === "team-member"
                        ? "Team Member"
                        : "User"}
                </strong>
              </p>
              <p className="text-sm text-blue-800 mt-2">
                This role has access to Process Implementation
                and Process Validation phases.
              </p>
            </div>

            <div className="flex gap-3 justify-center">
              <Button
                onClick={handleBackToLogin}
                variant="outline"
                size="lg"
              >
                Select Different Process Phase
              </Button>
              <Button onClick={handleLogout} size="lg">
                Login with Different Role
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Render role-specific dashboard
  const renderRoleDashboard = () => {
    // Special case: HR Executive in Implementation phase gets dedicated dashboard
    if (
      selectedRole === "hr-executive" &&
      selectedProcess === "implementation"
    ) {
      return <HRExecutiveDashboard />;
    }

    switch (selectedRole) {
      case "system-admin":
        return (
          <SystemAdminDashboard
            department={department}
            process={selectedProcess!}
            onLogout={handleExitRole}
          />
        );
      case "process-head":
      case "hr-head":
        return (
          <ProcessHeadDashboard
            department={department}
            phase={
              selectedProcess! as
                | "definition"
                | "implementation"
                | "validation"
            }
            systemConfig={systemConfig}
            onLogout={handleExitRole}
          />
        );
      case "project-manager":
        return (
          <ProjectManagerDashboard
            department={department}
            process={selectedProcess!}
            onLogout={handleExitRole}
          />
        );
      case "top-management":
      case "management":
        return (
          <TopManagementDashboard
            department={department}
            process={selectedProcess!}
            onLogout={handleExitRole}
          />
        );
      case "team-member":
        return (
          <TeamMemberDashboard
            department={department}
            process={selectedProcess!}
            onLogout={handleExitRole}
          />
        );
      // All other roles use the generic dashboard
      case "process-engineer":
      case "project-head":
      case "project-engineer":
      case "design-head":
      case "design-engineer":
      case "development-engineer":
      case "developer":
      case "software-engineer":
      case "testing-head":
      case "testing-engineer":
      case "it-head":
      case "it-engineer":
      case "training-head":
      case "training-executive":
      case "admin-head":
      case "admin-executive":
      case "purchase-head":
      case "purchase-executive":
        return (
          <GenericRoleDashboard
            department={department}
            process={selectedProcess!}
            roleId={selectedRole}
            onLogout={handleExitRole}
          />
        );
      default:
        return (
          <GenericRoleDashboard
            department={department}
            process={selectedProcess!}
            roleId={selectedRole!}
            onLogout={handleExitRole}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <img
              src={logoImage}
              alt="QMICS Solutions"
              className="h-12"
            />
            <div className="border-l pl-3 ml-1">
              <h1 className="text-xl font-bold">
                Compliance Management System
              </h1>
              <p className="text-sm text-muted-foreground">
                {`${systemConfig?.clientName || "Enterprise"} • ${department ? `${department.charAt(0).toUpperCase() + department.slice(1)} Department` : "Compliance & Risk Management"} • ${selectedProcess && `${selectedProcess.charAt(0).toUpperCase() + selectedProcess.slice(1)} Phase`}`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 px-4 py-2">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">
                  {userName || "Process Head"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {selectedRole ? selectedRole.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : "Process Head"}
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">
                  {userName
                    ? userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)
                    : "PH"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {renderRoleDashboard()}
      </main>
    </div>
  );
}