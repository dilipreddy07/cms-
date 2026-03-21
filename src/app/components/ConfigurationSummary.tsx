import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { 
  CheckCircle2, 
  Building2, 
  Shield, 
  Users, 
  Target,
  Briefcase,
  ArrowRight,
  Settings
} from "lucide-react";

interface SystemConfig {
  industry: string;
  department: string;
  complianceStandards: string[];
  clientName: string;
  organizationSize: string;
  primaryGoal: string;
}

interface ConfigurationSummaryProps {
  config: SystemConfig;
  onContinue: () => void;
}

const industryLabels: Record<string, { label: string; icon: string }> = {
  software: { label: "Software & Technology", icon: "💻" },
  healthcare: { label: "Healthcare & Medical", icon: "🏥" },
  finance: { label: "Financial Services", icon: "💰" },
  food: { label: "Food & Beverage", icon: "🍔" },
  retail: { label: "Retail & E-commerce", icon: "🛍️" },
  education: { label: "Education", icon: "🎓" },
  manufacturing: { label: "Manufacturing", icon: "🏭" },
  travel: { label: "Travel & Hospitality", icon: "✈️" },
};

const complianceLabels: Record<string, string> = {
  soc2: "SOC 2",
  iso27001: "ISO 27001",
  gdpr: "GDPR",
  ccpa: "CCPA",
  hipaa: "HIPAA",
  fda: "FDA",
  iso13485: "ISO 13485",
  pcidss: "PCI DSS",
  sox: "SOX",
  basel: "Basel III",
  haccp: "HACCP",
  iso22000: "ISO 22000",
  fssc22000: "FSSC 22000",
  iso9001: "ISO 9001",
  ferpa: "FERPA",
  coppa: "COPPA",
  ada: "ADA",
  iso14001: "ISO 14001",
  iso45001: "ISO 45001",
  osha: "OSHA",
};

const sizeLabels: Record<string, string> = {
  small: "Small (1-50 employees)",
  medium: "Medium (51-500 employees)",
  large: "Large (501-5000 employees)",
  enterprise: "Enterprise (5000+ employees)",
};

const goalLabels: Record<string, { label: string; icon: string }> = {
  achieve: { label: "Achieve compliance certification", icon: "🎯" },
  maintain: { label: "Maintain existing compliance", icon: "🔄" },
  improve: { label: "Improve compliance processes", icon: "📈" },
  audit: { label: "Prepare for audit", icon: "🔍" },
};

export function ConfigurationSummary({ config, onContinue }: ConfigurationSummaryProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mb-4 shadow-lg animate-bounce">
            <CheckCircle2 className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Configuration Complete!
          </h1>
          <p className="text-gray-600 text-lg">
            Your compliance management system is ready to use
          </p>
        </div>

        {/* Configuration Summary */}
        <Card className="p-8 shadow-2xl border-0 bg-white/80 backdrop-blur mb-6">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b">
            <Settings className="h-6 w-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">System Configuration</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Organization */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-gray-700">Organization</h3>
              </div>
              <div className="pl-7">
                <p className="text-2xl font-bold text-gray-900">{config.clientName}</p>
                <p className="text-sm text-gray-500 mt-1">{sizeLabels[config.organizationSize]}</p>
              </div>
            </div>

            {/* Industry */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold text-gray-700">Industry</h3>
              </div>
              <div className="pl-7">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{industryLabels[config.industry]?.icon}</span>
                  <p className="text-xl font-bold text-gray-900">
                    {industryLabels[config.industry]?.label}
                  </p>
                </div>
              </div>
            </div>

            {/* Primary Goal */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-pink-600" />
                <h3 className="font-semibold text-gray-700">Primary Goal</h3>
              </div>
              <div className="pl-7">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{goalLabels[config.primaryGoal]?.icon}</span>
                  <p className="text-lg font-semibold text-gray-900">
                    {goalLabels[config.primaryGoal]?.label}
                  </p>
                </div>
              </div>
            </div>

            {/* Organization Size */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-orange-600" />
                <h3 className="font-semibold text-gray-700">Team Size</h3>
              </div>
              <div className="pl-7">
                <p className="text-lg font-semibold text-gray-900">
                  {sizeLabels[config.organizationSize]?.split(" (")[0]}
                </p>
              </div>
            </div>
          </div>

          {/* Compliance Standards */}
          <div className="mt-8 pt-6 border-t">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold text-gray-700">Compliance Standards</h3>
            </div>
            <div className="flex flex-wrap gap-2 pl-7">
              {config.complianceStandards.map((standard) => (
                <Badge
                  key={standard}
                  className="px-4 py-2 text-base bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-300 hover:from-green-200 hover:to-emerald-200"
                >
                  {complianceLabels[standard] || standard}
                </Badge>
              ))}
            </div>
          </div>
        </Card>

        {/* Key Features */}
        <Card className="p-6 shadow-xl border-0 bg-gradient-to-br from-blue-50 to-purple-50 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">What's Next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                1
              </div>
              <div>
                <p className="font-medium text-gray-900">Select User Type</p>
                <p className="text-sm text-gray-600">Choose between Admin or Role-based access</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                2
              </div>
              <div>
                <p className="font-medium text-gray-900">Choose Process Phase</p>
                <p className="text-sm text-gray-600">Define, implement, or validate processes</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                3
              </div>
              <div>
                <p className="font-medium text-gray-900">Start Managing</p>
                <p className="text-sm text-gray-600">Access your compliance dashboard</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Continue Button */}
        <div className="flex justify-center">
          <Button
            onClick={onContinue}
            size="lg"
            className="gap-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 px-12 py-6 text-lg shadow-xl"
          >
            Continue to System
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
