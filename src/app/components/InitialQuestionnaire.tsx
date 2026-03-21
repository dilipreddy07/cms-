import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Progress } from "@/app/components/ui/progress";
import { 
  Building2, 
  Shield, 
  Briefcase, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  FileCheck,
  Plus,
  X,
  MapPin,
  Home
} from "lucide-react";
import { TeamAllocationStep } from "@/app/components/TeamAllocationStep";

interface QuestionnaireData {
  industry: string;
  department: string;
  complianceStandards: string[];
  clientName: string;
  location: string;
  address: string;
  organizationSize: string;
  exactEmployeeCount: string;
  teamAllocation: { [key: string]: number };
}

interface InitialQuestionnaireProps {
  onComplete: (data: QuestionnaireData) => void;
}

const industryOptions = [
  { value: "software", label: "Software & Technology", icon: "💻" },
  { value: "healthcare", label: "Healthcare & Medical", icon: "🏥" },
  { value: "finance", label: "Financial Services", icon: "💰" },
  { value: "food", label: "Food & Beverage", icon: "🍔" },
  { value: "retail", label: "Retail & E-commerce", icon: "🛍️" },
  { value: "education", label: "Education", icon: "🎓" },
  { value: "manufacturing", label: "Manufacturing", icon: "🏭" },
  { value: "travel", label: "Travel & Hospitality", icon: "✈️" },
];

const complianceOptions = {
  software: [
    { value: "qms", label: "QMS (Quality Management System)" },
    { value: "isms", label: "ISMS (Information Security Management System)" },
  ],
  healthcare: [
    { value: "qms", label: "QMS (Quality Management System)" },
    { value: "isms", label: "ISMS (Information Security Management System)" },
  ],
  finance: [
    { value: "qms", label: "QMS (Quality Management System)" },
    { value: "isms", label: "ISMS (Information Security Management System)" },
  ],
  food: [
    { value: "qms", label: "QMS (Quality Management System)" },
    { value: "isms", label: "ISMS (Information Security Management System)" },
  ],
  retail: [
    { value: "qms", label: "QMS (Quality Management System)" },
    { value: "isms", label: "ISMS (Information Security Management System)" },
  ],
  education: [
    { value: "qms", label: "QMS (Quality Management System)" },
    { value: "isms", label: "ISMS (Information Security Management System)" },
  ],
  manufacturing: [
    { value: "qms", label: "QMS (Quality Management System)" },
    { value: "isms", label: "ISMS (Information Security Management System)" },
  ],
  travel: [
    { value: "qms", label: "QMS (Quality Management System)" },
    { value: "isms", label: "ISMS (Information Security Management System)" },
  ],
};

const organizationSizes = [
  { value: "small", label: "Small (1-50 employees)" },
  { value: "medium", label: "Medium (51-500 employees)" },
  { value: "large", label: "Large (501-5000 employees)" },
  { value: "enterprise", label: "Enterprise (5000+ employees)" },
];

const primaryGoals = [
  { value: "achieve", label: "Achieve compliance certification", icon: "🎯" },
  { value: "maintain", label: "Maintain existing compliance", icon: "🔄" },
  { value: "improve", label: "Improve compliance processes", icon: "📈" },
  { value: "audit", label: "Prepare for audit", icon: "🔍" },
];

export function InitialQuestionnaire({ onComplete }: InitialQuestionnaireProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<QuestionnaireData>({
    industry: "",
    department: "",
    complianceStandards: [],
    clientName: "",
    location: "",
    address: "",
    organizationSize: "",
    exactEmployeeCount: "",
    teamAllocation: {},
  });
  const [customStandards, setCustomStandards] = useState<{ value: string; label: string }[]>([]);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customStandardName, setCustomStandardName] = useState("");

  const totalSteps = 7;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    onComplete(formData);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.clientName.trim() !== "";
      case 2:
        return formData.location.trim() !== "";
      case 3:
        return formData.address.trim() !== "";
      case 4:
        return formData.industry !== "";
      case 5:
        return formData.complianceStandards.length > 0;
      case 6:
        return formData.organizationSize !== "";
      case 7:
        return true; // Step 7 is always valid (team allocation is optional)
      default:
        return false;
    }
  };

  const toggleStandard = (standard: string) => {
    setFormData(prev => ({
      ...prev,
      complianceStandards: prev.complianceStandards.includes(standard)
        ? prev.complianceStandards.filter(s => s !== standard)
        : [...prev.complianceStandards, standard]
    }));
  };

  const addCustomStandard = () => {
    if (customStandardName.trim() !== "") {
      const newStandard = { value: customStandardName, label: customStandardName };
      setCustomStandards([...customStandards, newStandard]);
      toggleStandard(customStandardName);
      setCustomStandardName("");
      setShowCustomInput(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg">
            <FileCheck className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Compliance System Setup
          </h1>
          <p className="text-gray-600 text-lg">
            Let's configure your compliance management system
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Step {step} of {totalSteps}</span>
            <span className="text-sm font-medium text-gray-600">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Question Cards */}
        <Card className="p-8 shadow-2xl border-0 bg-white/80 backdrop-blur">
          {/* Step 1: Client/Organization Name */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mb-4">
                  <Building2 className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  What's your organization name?
                </h2>
                <p className="text-gray-600">
                  This will be used to personalize your compliance system
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientName" className="text-base">Organization/Client Name</Label>
                <Input
                  id="clientName"
                  placeholder="e.g., Acme Corporation"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="text-lg h-12"
                />
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mb-4">
                  <MapPin className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Where is your organization located?
                </h2>
                <p className="text-gray-600">
                  This will help us tailor the system to your needs
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="text-base">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., New York, USA"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="text-lg h-12"
                />
              </div>
            </div>
          )}

          {/* Step 3: Address */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mb-4">
                  <Home className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  What's your organization's address?
                </h2>
                <p className="text-gray-600">
                  This will help us tailor the system to your needs
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className="text-base">Address</Label>
                <Input
                  id="address"
                  placeholder="e.g., 123 Main St, New York, USA"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="text-lg h-12"
                />
              </div>
            </div>
          )}

          {/* Step 4: Industry Selection */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full mb-4">
                  <Briefcase className="h-8 w-8 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Select your industry
                </h2>
                <p className="text-gray-600">
                  Choose the industry that best matches your organization
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {industryOptions.map((industry) => (
                  <button
                    key={industry.value}
                    onClick={() => setFormData({ ...formData, industry: industry.value, department: industry.value })}
                    className={`p-4 rounded-xl border-2 transition-all text-left hover:scale-105 ${
                      formData.industry === industry.value
                        ? "border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg"
                        : "border-gray-200 hover:border-purple-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{industry.icon}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{industry.label}</p>
                      </div>
                      {formData.industry === industry.value && (
                        <CheckCircle2 className="h-5 w-5 text-purple-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Compliance Standards */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Which compliance standards do you need?
                </h2>
                <p className="text-gray-600">
                  Select all that apply to your organization
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {(complianceOptions[formData.industry as keyof typeof complianceOptions] || complianceOptions.software).map((standard) => (
                  <button
                    key={standard.value}
                    onClick={() => toggleStandard(standard.value)}
                    className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                      formData.complianceStandards.includes(standard.value)
                        ? "border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg"
                        : "border-gray-200 hover:border-green-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900 text-lg">{standard.label}</span>
                      {formData.complianceStandards.includes(standard.value) && (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                  </button>
                ))}
                
                {/* Custom Standards */}
                {customStandards.map((standard) => (
                  <button
                    key={standard.value}
                    onClick={() => toggleStandard(standard.value)}
                    className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                      formData.complianceStandards.includes(standard.value)
                        ? "border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg"
                        : "border-gray-200 hover:border-green-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900 text-base">{standard.label}</span>
                      {formData.complianceStandards.includes(standard.value) && (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                  </button>
                ))}
                
                {/* Add Custom Standard Button or Input */}
                {showCustomInput ? (
                  <div className="col-span-2 p-4 rounded-xl border-2 border-blue-300 bg-blue-50">
                    <div className="flex items-center gap-2">
                      <Input
                        value={customStandardName}
                        onChange={(e) => setCustomStandardName(e.target.value)}
                        placeholder="Enter custom standard name"
                        className="h-10 flex-1"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            addCustomStandard();
                          }
                        }}
                      />
                      <Button
                        onClick={addCustomStandard}
                        size="sm"
                        className="bg-green-500 hover:bg-green-600 text-white"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => {
                          setShowCustomInput(false);
                          setCustomStandardName("");
                        }}
                        size="sm"
                        variant="outline"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowCustomInput(true)}
                    className="col-span-2 p-4 rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-400 transition-all hover:scale-105 bg-gradient-to-br from-gray-50 to-blue-50 hover:from-blue-50 hover:to-blue-100"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Plus className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold text-gray-900 text-lg">Add Custom Standard</span>
                    </div>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Step 6: Organization Size */}
          {step === 6 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full mb-4">
                  <Users className="h-8 w-8 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  What's your organization size?
                </h2>
                <p className="text-gray-600">
                  This helps us tailor the system to your needs
                </p>
              </div>
              <RadioGroup
                value={formData.organizationSize}
                onValueChange={(value) => setFormData({ ...formData, organizationSize: value })}
                className="space-y-3"
              >
                {organizationSizes.map((size) => (
                  <div
                    key={size.value}
                    className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all cursor-pointer hover:scale-105 ${
                      formData.organizationSize === size.value
                        ? "border-orange-500 bg-gradient-to-br from-orange-50 to-amber-50 shadow-lg"
                        : "border-gray-200 hover:border-orange-300 bg-white"
                    }`}
                    onClick={() => setFormData({ ...formData, organizationSize: size.value })}
                  >
                    <RadioGroupItem value={size.value} id={size.value} />
                    <Label htmlFor={size.value} className="flex-1 cursor-pointer text-base">
                      {size.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              
              {/* Exact Employee Count */}
              <div className="mt-6 space-y-2">
                <Label htmlFor="exactEmployeeCount" className="text-base">Exact Employee Count (Optional)</Label>
                <Input
                  id="exactEmployeeCount"
                  type="number"
                  placeholder="e.g., 250"
                  value={formData.exactEmployeeCount}
                  onChange={(e) => setFormData({ ...formData, exactEmployeeCount: e.target.value })}
                  className="text-lg h-12"
                />
                <p className="text-xs text-gray-500">Enter the exact number of employees in your organization</p>
              </div>
            </div>
          )}

          {/* Step 7: Team Allocation */}
          {step === 7 && (
            <TeamAllocationStep formData={formData} setFormData={setFormData} />
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t">
            <Button
              onClick={handleBack}
              variant="outline"
              disabled={step === 1}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            {step < totalSteps ? (
              <Button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                disabled={!isStepValid()}
                className="gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                Complete Setup
                <CheckCircle2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </Card>

        {/* Summary Preview (only show after step 2) */}
        {step > 2 && (
          <div className="mt-6 p-4 bg-white/60 backdrop-blur rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Configuration Summary</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {formData.clientName && (
                <div>
                  <span className="text-gray-500">Organization:</span>
                  <span className="ml-2 font-medium text-gray-900">{formData.clientName}</span>
                </div>
              )}
              {formData.location && (
                <div>
                  <span className="text-gray-500">Location:</span>
                  <span className="ml-2 font-medium text-gray-900">{formData.location}</span>
                </div>
              )}
              {formData.address && (
                <div className="col-span-2">
                  <span className="text-gray-500">Address:</span>
                  <span className="ml-2 font-medium text-gray-900">{formData.address}</span>
                </div>
              )}
              {formData.industry && (
                <div>
                  <span className="text-gray-500">Industry:</span>
                  <span className="ml-2 font-medium text-gray-900">
                    {industryOptions.find(i => i.value === formData.industry)?.label}
                  </span>
                </div>
              )}
              {formData.complianceStandards.length > 0 && (
                <div className="col-span-2">
                  <span className="text-gray-500">Standards:</span>
                  <span className="ml-2 font-medium text-gray-900">
                    {formData.complianceStandards.map(s => 
                      (complianceOptions[formData.industry as keyof typeof complianceOptions] || complianceOptions.software)
                        .find(opt => opt.value === s)?.label
                    ).join(", ")}
                  </span>
                </div>
              )}
              {formData.organizationSize && (
                <div>
                  <span className="text-gray-500">Size:</span>
                  <span className="ml-2 font-medium text-gray-900">
                    {organizationSizes.find(s => s.value === formData.organizationSize)?.label}
                  </span>
                </div>
              )}
              {formData.exactEmployeeCount && (
                <div>
                  <span className="text-gray-500">Exact Employee Count:</span>
                  <span className="ml-2 font-medium text-gray-900">{formData.exactEmployeeCount}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}