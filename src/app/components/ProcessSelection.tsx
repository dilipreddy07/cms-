import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import { FileText, Settings, CheckCircle, Search, ArrowRight, Shield } from "lucide-react";
import { motion } from "motion/react";
import { getDepartmentConfig, getDepartmentProcesses } from "@/app/config/departmentConfig";

interface ProcessPhase {
  id: string;
  number: string;
  name: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  items: string[];
  color: string;
}

interface ProcessSelectionProps {
  department: string;
  role: string;
  onProcessSelect: (processId: string) => void;
  onBack: () => void;
}

export function ProcessSelection({ department, role, onProcessSelect, onBack }: ProcessSelectionProps) {
  const [selectedProcess, setSelectedProcess] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredProcess, setHoveredProcess] = useState<string | null>(null);

  // Get department-specific configuration
  const deptConfig = getDepartmentConfig(department);
  const departmentProcesses = getDepartmentProcesses(department);

  // Determine accessible processes based on role
  const getAccessibleProcesses = () => {
    const roleProcessMap: Record<string, string[]> = {
      "system-admin": ["definition", "implementation", "validation"],
      "process-head": ["definition", "implementation", "validation"],
      "project-manager": ["implementation", "validation"],
      "top-management": ["validation"],
      "team-member": ["implementation"],
      "hr-head": ["definition", "validation"],
      "hr-executive": ["implementation"],
    };
    return roleProcessMap[role] || [];
  };

  const accessibleProcessIds = getAccessibleProcesses();

  // Map processes to include icons and filter by role access
  const processPhases: ProcessPhase[] = departmentProcesses
    .filter(proc => accessibleProcessIds.includes(proc.id))
    .map(proc => ({
      ...proc,
      icon: proc.id === "definition" ? <FileText className="h-12 w-12" /> :
            proc.id === "implementation" ? <Settings className="h-12 w-12" /> :
            <CheckCircle className="h-12 w-12" />
    }));

  const handleSelect = (processId: string) => {
    setSelectedProcess(processId);
  };

  const handleContinue = () => {
    if (selectedProcess) {
      onProcessSelect(selectedProcess);
    }
  };

  const filteredPhases = processPhases.filter(
    (phase) =>
      phase.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      phase.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50">
      {/* Header */}
      <header className="border-b bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 backdrop-blur rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Compliance Management System</h1>
              <p className="text-sm text-purple-100">
                {deptConfig?.fullName || department} • Process Selection
              </p>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={onBack}
            className="bg-white text-purple-600 hover:bg-purple-50 border-0"
          >
            Back to Login
          </Button>
        </div>
      </header>

      {/* Main Content - Centered */}
      <main className="p-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold mb-2 text-gray-900">Select Your Process Phase</h2>
                <p className="text-gray-600">
                  Choose which phase of the compliance process you want to focus on
                </p>
              </div>
              <Badge className="px-4 py-2 text-base bg-blue-600">
                3P Framework
              </Badge>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search process phases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </motion.div>

          {/* Process Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {filteredPhases.map((phase, index) => (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={`cursor-pointer transition-all duration-200 h-full hover:shadow-lg ${
                    selectedProcess === phase.id
                      ? "border-2 border-blue-500 shadow-lg"
                      : "border hover:border-blue-200"
                  }`}
                  onClick={() => handleSelect(phase.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`p-4 rounded-xl bg-gradient-to-br ${phase.color} text-white shadow-md`}
                      >
                        {phase.icon}
                      </div>
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold ${
                          selectedProcess === phase.id
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {phase.number}
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-2">{phase.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {phase.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">
                        Key Activities:
                      </h4>
                      <ul className="space-y-2">
                        {phase.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <div
                              className={`mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                                selectedProcess === phase.id
                                  ? "bg-blue-600"
                                  : "bg-gray-400"
                              }`}
                            />
                            <span className="text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Selected Process Info */}
          {selectedProcess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <Card className="border-2 border-blue-500 bg-blue-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-gray-900">
                        Selected: {processPhases.find((p) => p.id === selectedProcess)?.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        You're ready to proceed with {processPhases.find((p) => p.id === selectedProcess)?.title.toLowerCase()}
                      </p>
                    </div>
                    <Button 
                      size="lg" 
                      onClick={handleContinue} 
                      className="px-8 bg-blue-600 hover:bg-blue-700"
                    >
                      Continue to Dashboard
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Info Banner */}
          {!selectedProcess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="p-3 bg-blue-600 rounded-lg">
                        <Shield className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-gray-900">
                        About the 3P Framework
                      </h4>
                      <p className="text-sm text-gray-600">
                        The 3P framework (Process Definition, Process Implementation, Process Validation) 
                        provides a structured approach to managing compliance. Start with defining your 
                        processes, implement them across your organization, and continuously validate 
                        their effectiveness.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}