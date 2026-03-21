import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Badge } from "@/app/components/ui/badge";
import { Shield, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import logoImage from "figma:asset/4f0d1475fb5c3a62e9dcf3b6d3e56fe97bc2ad62.png";
import { getDepartmentUsers, getDepartmentConfig } from "@/app/config/departmentConfig";

interface DemoCredential {
  email: string;
  password: string;
  role: string;
  name: string;
  roleId: string;
}

interface LoginPageProps {
  department: string;
  onLogin: (roleId: string, userName: string, userEmail: string) => void;
  onBack: () => void;
}

export function LoginPage({ department, onLogin, onBack }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showCredentials, setShowCredentials] = useState(true);

  // Get department-specific configuration and users
  const deptConfig = getDepartmentConfig(department);
  const demoCredentials: DemoCredential[] = getDepartmentUsers(department);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const credential = demoCredentials.find(
      (cred) => cred.email === email && cred.password === password
    );

    if (credential) {
      onLogin(credential.roleId, credential.name, credential.email);
    } else {
      setError("Invalid email or password. Please use demo credentials below.");
    }
  };

  const handleDemoLogin = (credential: DemoCredential) => {
    setEmail(credential.email);
    setPassword(credential.password);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-xl">
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-center">
                  <img src={logoImage} alt="QMICS Solutions" className="h-16" />
                </div>
                <div className="text-center">
                  <CardTitle className="text-2xl">Welcome Back</CardTitle>
                  <CardDescription className="mt-2">
                    Sign in to your compliance management account
                  </CardDescription>
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <Badge variant="outline">{department}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg"
                    >
                      <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-destructive">{error}</p>
                    </motion.div>
                  )}

                  <Button type="submit" className="w-full" size="lg">
                    <Lock className="mr-2 h-4 w-4" />
                    Sign In
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={onBack}
                  >
                    Back to Department Selection
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Side - Demo Credentials */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="shadow-xl bg-gradient-to-br from-blue-50 to-purple-50 border-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Demo Credentials</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowCredentials(!showCredentials)}
                  >
                    {showCredentials ? "Hide" : "Show"}
                  </Button>
                </div>
                <CardDescription>
                  Click any credential below to auto-fill the login form
                </CardDescription>
              </CardHeader>
              {showCredentials && (
                <CardContent className="space-y-3">
                  {/* Available Credentials */}
                  {demoCredentials.map((cred, index) => (
                    <motion.div
                      key={cred.email}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                    >
                      <Card
                        className="cursor-pointer hover:shadow-md transition-all hover:border-primary/50"
                        onClick={() => handleDemoLogin(cred)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-sm">{cred.name}</h4>
                              <p className="text-xs text-muted-foreground">{cred.role}</p>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              Demo
                            </Badge>
                          </div>
                          <div className="space-y-1 text-xs">
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">Email:</span>
                              <code className="bg-white px-2 py-0.5 rounded">
                                {cred.email}
                              </code>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">Password:</span>
                              <code className="bg-white px-2 py-0.5 rounded">
                                {cred.password}
                              </code>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}

                  {/* Info Banner */}
                  <div className="mt-6 p-4 bg-blue-100 rounded-lg border border-blue-200">
                    <div className="flex gap-3">
                      <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm text-blue-900 mb-1">
                          Demo Environment
                        </h4>
                        <p className="text-xs text-blue-700">
                          This is a demonstration system. Each role has different permissions
                          and access to specific features. Try logging in with different roles
                          to see the customized experience.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}