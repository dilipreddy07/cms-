import { Card, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Shield, Users, ArrowRight, ChevronLeft } from "lucide-react";
import { motion } from "motion/react";
import logoImage from "@/assets/4f0d1475fb5c3a62e9dcf3b6d3e56fe97bc2ad62.png";

interface UserTypeSelectionProps {
  onUserTypeSelect: (userType: "admin" | "roles") => void;
  onBack: () => void;
}

export function UserTypeSelection({ onUserTypeSelect, onBack }: UserTypeSelectionProps) {
  const userTypes = [
    {
      id: "admin" as const,
      title: "Admin",
      description: "System administrators with full access to configure and manage the entire compliance system",
      icon: <Shield className="h-16 w-16" />,
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      bgGradient: "from-blue-50 to-cyan-50",
      features: [
        "Full system configuration",
        "User management",
        "Department setup",
        "Global settings control"
      ]
    },
    {
      id: "roles" as const,
      title: "Roles",
      description: "Role-based access for team members working within specific departments and processes",
      icon: <Users className="h-16 w-16" />,
      gradient: "from-purple-500 via-pink-500 to-rose-500",
      bgGradient: "from-purple-50 to-pink-50",
      features: [
        "Department-specific access",
        "Role-based permissions",
        "Process workflows",
        "Team collaboration"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-50 shadow-sm">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={logoImage} alt="QMICS Solutions" className="h-12" />
                <div className="border-l pl-3 ml-1">
                  <h1 className="text-xl font-bold">Compliance Management System</h1>
                  <p className="text-sm text-muted-foreground">Select Your Access Type</p>
                </div>
              </div>
              <Button variant="outline" onClick={onBack} className="gap-2">
                <ChevronLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <Badge className="px-4 py-2 text-base bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
              Step 1 of 4
            </Badge>
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Choose Your Access Path
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select how you want to access the compliance management system
            </p>
          </motion.div>

          {/* User Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {userTypes.map((userType, index) => (
              <motion.div
                key={userType.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card 
                  className="h-full bg-white border-2 shadow-xl hover:shadow-2xl transition-all cursor-pointer group overflow-hidden"
                  onClick={() => onUserTypeSelect(userType.id)}
                >
                  {/* Gradient Header */}
                  <div className={`bg-gradient-to-r ${userType.gradient} p-8 text-white relative overflow-hidden`}>
                    <motion.div
                      className="absolute inset-0 bg-white/10"
                      animate={{
                        opacity: [0.1, 0.2, 0.1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <div className="relative z-10">
                      <div className="flex items-center justify-center mb-4">
                        <motion.div
                          className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center shadow-lg"
                          whileHover={{ rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {userType.icon}
                        </motion.div>
                      </div>
                      <h3 className="text-3xl font-bold text-center">
                        {userType.title}
                      </h3>
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="p-8">
                    <p className="text-gray-600 mb-6 text-center">
                      {userType.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-3 mb-6">
                      {userType.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${userType.gradient}`} />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Button */}
                    <Button
                      className={`w-full bg-gradient-to-r ${userType.gradient} hover:opacity-90 text-white shadow-lg group-hover:shadow-xl transition-all`}
                      size="lg"
                      onClick={() => onUserTypeSelect(userType.id)}
                    >
                      Select {userType.title}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Help Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Card className="max-w-2xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-purple-200">
              <CardContent className="p-6">
                <p className="text-sm text-gray-700">
                  <strong>Not sure which to choose?</strong> If you're setting up the system or managing users, 
                  select <strong>Admin</strong>. If you're a team member working on compliance tasks, select <strong>Roles</strong>.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
