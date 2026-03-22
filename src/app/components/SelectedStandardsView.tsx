import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Shield, Download, ExternalLink, FileText } from "lucide-react";

interface SelectedStandardsViewProps {
  complianceStandards: string[];
  industry: string;
  onSelectStandard?: (standard: { code: string; name: string }) => void;
}

// Map of standard codes to full details
const standardsDetails: Record<string, {
  name: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  requirements: number;
  documents: number;
  category: string;
}> = {
  "soc2": {
    name: "SOC 2",
    description: "Service Organization Control 2 - focuses on controls relevant to security, availability, processing integrity, confidentiality, and privacy",
    icon: "🔐",
    color: "text-blue-700",
    bgColor: "bg-blue-500",
    requirements: 64,
    documents: 12,
    category: "Security & Privacy"
  },
  "iso27001": {
    name: "ISO 27001",
    description: "Information Security Management System standard that provides requirements for establishing, implementing, maintaining and continually improving an information security management system",
    icon: "🛡️",
    color: "text-purple-700",
    bgColor: "bg-purple-500",
    requirements: 114,
    documents: 18,
    category: "Information Security"
  },
  "gdpr": {
    name: "GDPR",
    description: "General Data Protection Regulation - EU regulation on data protection and privacy for individuals within the European Union and the European Economic Area",
    icon: "🔒",
    color: "text-green-700",
    bgColor: "bg-green-500",
    requirements: 99,
    documents: 15,
    category: "Data Privacy"
  },
  "hipaa": {
    name: "HIPAA",
    description: "Health Insurance Portability and Accountability Act - US legislation that provides data privacy and security provisions for safeguarding medical information",
    icon: "🏥",
    color: "text-red-700",
    bgColor: "bg-red-500",
    requirements: 78,
    documents: 14,
    category: "Healthcare Compliance"
  },
  "ccpa": {
    name: "CCPA",
    description: "California Consumer Privacy Act - state statute intended to enhance privacy rights and consumer protection for residents of California",
    icon: "🌐",
    color: "text-amber-700",
    bgColor: "bg-amber-500",
    requirements: 45,
    documents: 10,
    category: "Data Privacy"
  },
  "pci-dss": {
    name: "PCI DSS",
    description: "Payment Card Industry Data Security Standard - information security standard for organizations that handle branded credit cards",
    icon: "💳",
    color: "text-cyan-700",
    bgColor: "bg-cyan-500",
    requirements: 86,
    documents: 16,
    category: "Payment Security"
  },
  "iso27017": {
    name: "ISO 27017",
    description: "Cloud security standard that provides guidelines for information security controls applicable to the provision and use of cloud services",
    icon: "☁️",
    color: "text-indigo-700",
    bgColor: "bg-indigo-500",
    requirements: 52,
    documents: 11,
    category: "Cloud Security"
  },
  "iso27018": {
    name: "ISO 27018",
    description: "Code of practice for protection of personally identifiable information (PII) in public clouds acting as PII processors",
    icon: "🔐",
    color: "text-violet-700",
    bgColor: "bg-violet-500",
    requirements: 48,
    documents: 9,
    category: "Cloud Privacy"
  },
  "nist": {
    name: "NIST Cybersecurity Framework",
    description: "Framework created by NIST to provide guidance on how organizations can better manage and reduce cybersecurity risk",
    icon: "🛡️",
    color: "text-teal-700",
    bgColor: "bg-teal-500",
    requirements: 108,
    documents: 20,
    category: "Cybersecurity"
  },
  "fisma": {
    name: "FISMA",
    description: "Federal Information Security Management Act - US federal law that requires federal agencies to develop, document, and implement information security programs",
    icon: "🏛️",
    color: "text-rose-700",
    bgColor: "bg-rose-500",
    requirements: 92,
    documents: 17,
    category: "Federal Compliance"
  },
  "fedramp": {
    name: "FedRAMP",
    description: "Federal Risk and Authorization Management Program - standardized approach to security assessment, authorization, and continuous monitoring for cloud products",
    icon: "🏢",
    color: "text-orange-700",
    bgColor: "bg-orange-500",
    requirements: 125,
    documents: 22,
    category: "Federal Cloud"
  },
  "cmmc": {
    name: "CMMC",
    description: "Cybersecurity Maturity Model Certification - unified standard for implementing cybersecurity across the defense industrial base",
    icon: "⚔️",
    color: "text-lime-700",
    bgColor: "bg-lime-500",
    requirements: 110,
    documents: 19,
    category: "Defense"
  },
  "hitrust": {
    name: "HITRUST CSF",
    description: "Health Information Trust Alliance Common Security Framework - certifiable framework that provides organizations with a comprehensive, flexible, and efficient approach to regulatory compliance and risk management",
    icon: "🩺",
    color: "text-pink-700",
    bgColor: "bg-pink-500",
    requirements: 156,
    documents: 25,
    category: "Healthcare Security"
  },
  "fsqs": {
    name: "FSQS 22000",
    description: "Food Safety and Quality System standard that provides a framework for managing food safety",
    icon: "🍽️",
    color: "text-emerald-700",
    bgColor: "bg-emerald-500",
    requirements: 72,
    documents: 13,
    category: "Food Safety"
  },
  "haccp": {
    name: "HACCP",
    description: "Hazard Analysis and Critical Control Points - management system in which food safety is addressed through the analysis and control of biological, chemical, and physical hazards",
    icon: "🔬",
    color: "text-yellow-700",
    bgColor: "bg-yellow-500",
    requirements: 65,
    documents: 12,
    category: "Food Safety"
  },
  "gmp": {
    name: "GMP",
    description: "Good Manufacturing Practice - systems required to be adhered to by industries regulated by the FDA",
    icon: "🏭",
    color: "text-sky-700",
    bgColor: "bg-sky-500",
    requirements: 58,
    documents: 11,
    category: "Manufacturing"
  }
};

export function SelectedStandardsView({ complianceStandards, industry, onSelectStandard }: SelectedStandardsViewProps) {
  // Get the full details for each selected standard
  const selectedStandardsDetails = complianceStandards.map(code => ({
    code,
    ...standardsDetails[code] || {
      name: code.toUpperCase(),
      description: "Compliance standard selected for your organization",
      icon: "📋",
      color: "text-gray-700",
      bgColor: "bg-gray-500",
      requirements: 0,
      documents: 0,
      category: "General"
    }
  }));

  const totalRequirements = selectedStandardsDetails.reduce((sum, std) => sum + std.requirements, 0);
  const totalDocuments = selectedStandardsDetails.reduce((sum, std) => sum + std.documents, 0);

  return (
    <div className="space-y-6">
      {/* Overview Header */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <Shield className="h-7 w-7" />
                Selected Compliance Standards
              </CardTitle>
              <CardDescription className="text-purple-100 mt-2">
                {selectedStandardsDetails.length} standard{selectedStandardsDetails.length !== 1 ? 's' : ''} selected for {industry} industry
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{selectedStandardsDetails.length}</div>
              <div className="text-sm text-purple-100">Standards</div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Standards List */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Standards Details</h3>
        <div className="grid grid-cols-1 gap-4">
          {selectedStandardsDetails.map((standard) => (
            <Card key={standard.code} className="border-2 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`p-4 ${standard.bgColor} rounded-lg text-white text-3xl flex items-center justify-center shadow-md`}>
                      {standard.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-xl">{standard.name}</CardTitle>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {standard.category}
                        </Badge>
                      </div>
                      <CardDescription className="text-gray-700">
                        {standard.description}
                      </CardDescription>
                      
                      <div className="mt-4 flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            <span className="font-medium text-gray-900">{standard.requirements}</span> requirements
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            <span className="font-medium text-gray-900">{standard.documents}</span> documents
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {onSelectStandard && (
                      <Button 
                        onClick={() => onSelectStandard({ code: standard.code, name: standard.name })}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                        size="sm"
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Learn More
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

    </div>
  );
}