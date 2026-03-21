import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Shield, ArrowRight, CheckCircle, FileText, Settings, BarChart3, Lock, Users, Globe } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoImage from "@/assets/4f0d1475fb5c3a62e9dcf3b6d3e56fe97bc2ad62.png";

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Multi-Framework Support",
      description: "Manage GDPR, SOC 2, HIPAA, and more from a single platform",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Multi-Tenant Architecture",
      description: "Department-specific data isolation and access control",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "3P Framework",
      description: "Process Definition, Implementation, and Validation workflow",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Role-Based Access",
      description: "Granular permissions for different organizational roles",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Real-Time Analytics",
      description: "Track compliance metrics and generate detailed reports",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Industry-Specific",
      description: "Tailored workflows for 8+ industries",
      color: "from-pink-500 to-rose-500"
    }
  ];

  const processes = [
    {
      number: "1",
      title: "Process Definition",
      icon: <FileText className="h-10 w-10" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      number: "2",
      title: "Process Implementation",
      icon: <Settings className="h-10 w-10" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      number: "3",
      title: "Process Validation",
      icon: <CheckCircle className="h-10 w-10" />,
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
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
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-6 pt-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-8">
              <motion.img
                src={logoImage}
                alt="QMICS Solutions"
                className="h-24"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
              />
            </div>
            <motion.h1
              className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Compliance Management
            </motion.h1>
            <motion.p
              className="text-2xl md:text-3xl text-gray-700 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Simplified, Streamlined, Secure
            </motion.p>
            <motion.p
              className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Navigate complex regulatory requirements with confidence. Our comprehensive platform helps organizations track, manage, and validate compliance across multiple frameworks and industries.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center justify-center gap-4"
            >
              <Button
                size="lg"
                onClick={onGetStarted}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Badge
                variant="outline"
                className="px-4 py-2 text-base border-2 border-purple-300 bg-white/80 backdrop-blur"
              >
                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                8+ Industries Supported
              </Badge>
            </motion.div>
          </motion.div>

          {/* 3P Process Flow */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <Badge className="px-4 py-2 text-base bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
                3P Framework
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Structured Compliance Workflow
              </h2>
              <p className="text-gray-600">
                A proven three-phase approach to managing compliance
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {processes.map((process, index) => (
                <motion.div
                  key={process.number}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="h-full bg-white/80 backdrop-blur border-2 hover:shadow-xl transition-all">
                    <CardContent className="p-6 text-center">
                      <div
                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${process.color} mx-auto mb-4 flex items-center justify-center text-white shadow-lg`}
                      >
                        {process.icon}
                      </div>
                      <div
                        className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br ${process.color} text-white font-bold text-lg mb-3 shadow-md`}
                      >
                        {process.number}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {process.title}
                      </h3>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Showcase Section with Images */}
        <section className="container mx-auto px-6 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Main Showcase Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Large Image Card - Team Collaboration */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <Card className="overflow-hidden border-2 shadow-xl hover:shadow-2xl transition-all group">
                  <div className="relative h-96 overflow-hidden">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1590650589327-3f67c43ad8a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlYW0lMjBjb2xsYWJvcmF0aW9uJTIwb2ZmaWNlfGVufDF8fHx8MTc3MTgxMDEzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Team Collaboration"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">Collaborative Compliance</h3>
                      <p className="text-sm text-white/90">Empower your teams to work together seamlessly across departments</p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Right Column - Two Stacked Images */}
              <div className="space-y-8">
                {/* Analytics Dashboard */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Card className="overflow-hidden border-2 shadow-xl hover:shadow-2xl transition-all group">
                    <div className="relative h-44 overflow-hidden">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1759752394755-1241472b589d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkJTIwc2NyZWVufGVufDF8fHx8MTc3MTgyNTM3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt="Analytics Dashboard"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="text-lg font-bold mb-1">Real-Time Insights</h3>
                        <p className="text-xs text-white/90">Monitor compliance metrics at a glance</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* Security & Workflow */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <Card className="overflow-hidden border-2 shadow-xl hover:shadow-2xl transition-all group">
                    <div className="relative h-44 overflow-hidden">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1762340916350-ad5a3d620c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc2VjdXJpdHklMjBuZXR3b3JrfGVufDF8fHx8MTc3MTc4ODYxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt="Security Network"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-900/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="text-lg font-bold mb-1">Enterprise Security</h3>
                        <p className="text-xs text-white/90">Bank-level encryption and protection</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </div>

            {/* Bottom Row - Three Equal Images */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="overflow-hidden border-2 shadow-lg hover:shadow-xl transition-all group">
                  <div className="relative h-56 overflow-hidden">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1641430034785-47f6f91ab6cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBsYXB0b3B8ZW58MXx8fHwxNzcxNzY1ODk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Modern Workspace"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-bold mb-1">Modern Tools</h3>
                      <p className="text-xs text-white/90">Intuitive interface</p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="overflow-hidden border-2 shadow-lg hover:shadow-xl transition-all group">
                  <div className="relative h-56 overflow-hidden">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1758691736764-2a88e313b1f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBwcmVzZW50YXRpb258ZW58MXx8fHwxNzcxODIyMDI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Business Meeting"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-bold mb-1">Strategic Planning</h3>
                      <p className="text-xs text-white/90">Align compliance goals</p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="overflow-hidden border-2 shadow-lg hover:shadow-xl transition-all group">
                  <div className="relative h-56 overflow-hidden">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1613759612065-d5971d32ca49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzcxODM1OTMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Professional Workspace"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-bold mb-1">Professional Excellence</h3>
                      <p className="text-xs text-white/90">Industry-leading standards</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white/60 backdrop-blur py-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Powerful Features
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Everything you need to manage compliance across your organization
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <Card className="h-full bg-white border-2 hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div
                        className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} mb-4 flex items-center justify-center text-white shadow-lg`}
                      >
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 border-0 shadow-2xl">
              <CardContent className="p-12 text-center">
                <h2 className="text-4xl font-bold text-white mb-4">
                  Ready to Transform Your Compliance Management?
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Join organizations worldwide who trust our platform to manage their compliance requirements
                </p>
                <Button
                  size="lg"
                  onClick={onGetStarted}
                  className="bg-white text-purple-600 hover:bg-gray-100 px-10 py-6 text-lg shadow-xl transform hover:scale-105 transition-all"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-6 py-8 text-center text-gray-600">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="h-5 w-5 text-purple-600" />
            <span className="font-semibold">QMICS Solutions</span>
          </div>
          <p className="text-sm">
            Enterprise Compliance & Risk Management Platform
          </p>
        </footer>
      </div>
    </div>
  );
}