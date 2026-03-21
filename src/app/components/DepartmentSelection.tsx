import { useState } from "react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Shield, Code, UtensilsCrossed, Heart, Building2, ShoppingCart, GraduationCap, Plane, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface Department {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  frameworks: string[];
  gradient: string;
}

const departments: Department[] = [
  {
    id: "software",
    name: "Software & Technology",
    icon: <Code className="h-8 w-8" />,
    description: "Software development, SaaS, IT services",
    frameworks: ["SOC 2", "ISO 27001", "GDPR", "CCPA"],
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: "food",
    name: "Food & Beverage",
    icon: <UtensilsCrossed className="h-8 w-8" />,
    description: "Food manufacturing, restaurants, catering",
    frameworks: ["HACCP", "FDA", "ISO 22000", "FSSC 22000"],
    gradient: "from-orange-500 to-amber-500"
  },
  {
    id: "healthcare",
    name: "Healthcare & Medical",
    icon: <Heart className="h-8 w-8" />,
    description: "Hospitals, clinics, medical devices",
    frameworks: ["HIPAA", "FDA", "ISO 13485", "GDPR"],
    gradient: "from-rose-500 to-pink-500"
  },
  {
    id: "finance",
    name: "Financial Services",
    icon: <Building2 className="h-8 w-8" />,
    description: "Banking, insurance, fintech",
    frameworks: ["PCI DSS", "SOC 2", "GDPR", "SOX"],
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    id: "retail",
    name: "Retail & E-commerce",
    icon: <ShoppingCart className="h-8 w-8" />,
    description: "Online stores, retail chains, marketplaces",
    frameworks: ["PCI DSS", "GDPR", "ISO 27001", "CCPA"],
    gradient: "from-purple-500 to-indigo-500"
  },
  {
    id: "education",
    name: "Education",
    icon: <GraduationCap className="h-8 w-8" />,
    description: "Schools, universities, e-learning platforms",
    frameworks: ["FERPA", "COPPA", "GDPR", "ISO 27001"],
    gradient: "from-violet-500 to-purple-500"
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    icon: <Building2 className="h-8 w-8" />,
    description: "Industrial manufacturing, production",
    frameworks: ["ISO 9001", "ISO 14001", "OSHA", "ISO 45001"],
    gradient: "from-slate-600 to-gray-600"
  },
  {
    id: "travel",
    name: "Travel & Hospitality",
    icon: <Plane className="h-8 w-8" />,
    description: "Hotels, airlines, travel agencies",
    frameworks: ["PCI DSS", "GDPR", "ISO 27001", "CCPA"],
    gradient: "from-sky-500 to-blue-500"
  }
];

interface DepartmentSelectionProps {
  onDepartmentSelect: (departmentId: string) => void;
}

export function DepartmentSelection({ onDepartmentSelect }: DepartmentSelectionProps) {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [hoveredDepartment, setHoveredDepartment] = useState<string | null>(null);

  const handleSelect = (departmentId: string) => {
    setSelectedDepartment(departmentId);
  };

  const handleContinue = () => {
    if (selectedDepartment) {
      onDepartmentSelect(selectedDepartment);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-lg">
              <Shield className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
            Compliance Management System
          </h1>
          <p className="text-xl text-gray-700">
            Select your industry to get started
          </p>
          <p className="text-sm text-gray-600 mt-2">
            We'll customize compliance frameworks based on your industry requirements
          </p>
        </motion.div>

        {/* Department Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {departments.map((dept, index) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`cursor-pointer transition-all duration-200 h-full ${
                  selectedDepartment === dept.id
                    ? "border-2 border-primary shadow-lg bg-primary/5"
                    : hoveredDepartment === dept.id
                    ? "border-primary/50 shadow-md"
                    : "hover:border-primary/30 hover:shadow-md"
                }`}
                onClick={() => handleSelect(dept.id)}
                onMouseEnter={() => setHoveredDepartment(dept.id)}
                onMouseLeave={() => setHoveredDepartment(null)}
              >
                <CardContent className="p-6">
                  <div
                    className={`mb-4 p-4 rounded-xl inline-flex shadow-md ${
                      selectedDepartment === dept.id
                        ? `bg-gradient-to-br ${dept.gradient} text-white`
                        : `bg-gradient-to-br ${dept.gradient} text-white opacity-80`
                    }`}
                  >
                    {dept.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">{dept.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {dept.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {dept.frameworks.slice(0, 2).map((framework) => (
                      <span
                        key={framework}
                        className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 font-medium border border-gray-200"
                      >
                        {framework}
                      </span>
                    ))}
                    {dept.frameworks.length > 2 && (
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 font-medium border border-gray-200">
                        +{dept.frameworks.length - 2}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Selected Department Info */}
        {selectedDepartment && (() => {
          const selectedDept = departments.find((d) => d.id === selectedDepartment);
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <Card className={`border-0 shadow-lg bg-gradient-to-br ${selectedDept?.gradient} text-white`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">
                        Selected: {selectedDept?.name}
                      </h3>
                      <p className="text-sm text-white/90 mb-3">
                        Applicable compliance frameworks:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedDept?.frameworks.map((framework) => (
                          <span
                            key={framework}
                            className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur text-white text-sm font-medium border border-white/30"
                          >
                            {framework}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })()}

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Button
            size="lg"
            onClick={handleContinue}
            disabled={!selectedDepartment}
            className="px-8 py-6 text-lg"
          >
            Continue to Dashboard
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          {!selectedDepartment && (
            <p className="text-sm text-muted-foreground mt-3">
              Please select an industry to continue
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}