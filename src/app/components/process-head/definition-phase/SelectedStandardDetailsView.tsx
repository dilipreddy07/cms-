import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import {
  ArrowLeft,
  FileText,
  Shield,
  Layers,
  ListChecks,
} from "lucide-react";
import { ProcedureManagementView } from "./ProcedureManagementView";
import { PoliciesGuidelinesView } from "./PoliciesGuidelinesView";
import { TemplatesView } from "./TemplatesView";
import { ChecklistsView } from "./ChecklistsView";

interface SelectedStandardDetailsViewProps {
  standard: {
    code: string;
    name: string;
  };
  onBack: () => void;
}

// Standard details mapping
const standardsDetails: Record<string, {
  name: string;
  description: string;
  icon: string;
  bgColor: string;
}> = {
  "soc2": {
    name: "SOC 2",
    description: "Service Organization Control 2 - Trust Services Criteria for security, availability, processing integrity, confidentiality, and privacy",
    icon: "🔐",
    bgColor: "bg-blue-500"
  },
  "iso27001": {
    name: "ISO 27001",
    description: "International standard for information security management systems (ISMS)",
    icon: "🛡️",
    bgColor: "bg-green-500"
  },
  "gdpr": {
    name: "GDPR",
    description: "General Data Protection Regulation - EU data protection and privacy regulation",
    icon: "🔒",
    bgColor: "bg-purple-500"
  },
  "hipaa": {
    name: "HIPAA",
    description: "Health Insurance Portability and Accountability Act - US healthcare data protection",
    icon: "⚕️",
    bgColor: "bg-red-500"
  }
};

export function SelectedStandardDetailsView({ standard, onBack }: SelectedStandardDetailsViewProps) {
  const [selectedProcedure, setSelectedProcedure] = useState<{ id: string; name: string } | null>(null);

  // Get standard details
  const standardDetail = standardsDetails[standard.code] || {
    name: standard.name,
    description: "Compliance standard selected for your organization",
    icon: "📋",
    bgColor: "bg-gray-500"
  };

  const handleProcedureSelect = (procedureId: string, procedureName: string) => {
    setSelectedProcedure({ id: procedureId, name: procedureName });
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Enhanced Header */}
      <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white overflow-hidden">
        <CardHeader className="relative pb-8">
          <Button
            variant="secondary"
            onClick={onBack}
            className="absolute top-6 left-6 bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Standards
          </Button>
          
          <div className="flex items-center gap-8 mt-12">
            <div className={`p-8 ${standardDetail.bgColor} rounded-2xl shadow-2xl text-white text-6xl flex items-center justify-center border-4 border-white/30`}>
              {standardDetail.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-3">
                <CardTitle className="text-4xl font-bold text-white">{standardDetail.name}</CardTitle>
                <Badge className="px-4 py-2 bg-white/20 text-white border-white/30 text-base backdrop-blur-sm">
                  {standard.code.toUpperCase()}
                </Badge>
              </div>
              <CardDescription className="text-white/90 text-lg leading-relaxed max-w-3xl">
                {standardDetail.description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Tabs for Different Modules */}
      <Tabs defaultValue="procedures" className="w-full">
        <TabsList className="grid w-full grid-cols-4 p-1 bg-gray-100 rounded-xl">
          <TabsTrigger 
            value="procedures" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white py-3 px-4 text-sm font-semibold rounded-lg transition-all"
          >
            <FileText className="h-4 w-4 mr-2" />
            Procedures
          </TabsTrigger>
          <TabsTrigger 
            value="policies" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white py-3 px-4 text-sm font-semibold rounded-lg transition-all"
          >
            <Shield className="h-4 w-4 mr-2" />
            Policies & Guidelines
          </TabsTrigger>
          <TabsTrigger 
            value="templates" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white py-3 px-4 text-sm font-semibold rounded-lg transition-all"
          >
            <Layers className="h-4 w-4 mr-2" />
            Templates
          </TabsTrigger>
          <TabsTrigger 
            value="checklists" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white py-3 px-4 text-sm font-semibold rounded-lg transition-all"
          >
            <ListChecks className="h-4 w-4 mr-2" />
            Checklists
          </TabsTrigger>
        </TabsList>

        {/* Procedures Tab */}
        <TabsContent value="procedures" className="mt-6">
          <Card className="shadow-xl border-2 border-blue-200">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b-2 border-blue-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-gray-900">Procedures Management</CardTitle>
                  <CardDescription className="text-base">Base module - Upload and manage procedure documents</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ProcedureManagementView
                standardCode={standard.code}
                standardName={standard.name}
                onBack={() => {}}
                onProcedureSelect={handleProcedureSelect}
                isEmbedded={false}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Policies & Guidelines Tab */}
        <TabsContent value="policies" className="mt-6">
          <Card className="shadow-xl border-2 border-purple-200">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b-2 border-purple-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-gray-900">Policies & Guidelines Management</CardTitle>
                  <CardDescription className="text-base">Combined module - Must be mapped to procedures</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <PoliciesGuidelinesView
                standardCode={standard.code}
                standardName={standard.name}
                selectedProcedure={selectedProcedure}
                onBack={() => {}}
                isEmbedded={false}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="mt-6">
          <Card className="shadow-xl border-2 border-orange-200">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b-2 border-orange-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg">
                  <Layers className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-gray-900">Templates Management</CardTitle>
                  <CardDescription className="text-base">Supporting documents mapped to procedures</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <TemplatesView
                standardCode={standard.code}
                standardName={standard.name}
                selectedProcedure={selectedProcedure}
                onBack={() => {}}
                isEmbedded={false}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Checklists Tab */}
        <TabsContent value="checklists" className="mt-6">
          <Card className="shadow-xl border-2 border-green-200">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b-2 border-green-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg">
                  <ListChecks className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-gray-900">Checklists Management</CardTitle>
                  <CardDescription className="text-base">Step-by-step execution lists for procedures</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ChecklistsView
                standardCode={standard.code}
                standardName={standard.name}
                selectedProcedure={selectedProcedure}
                onBack={() => {}}
                isEmbedded={false}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}