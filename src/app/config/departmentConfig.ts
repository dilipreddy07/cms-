// Department-specific configuration
export interface DepartmentProcess {
  id: string;
  number: string;
  name: string;
  title: string;
  description: string;
  items: string[];
  color: string;
}

export interface DepartmentUser {
  email: string;
  password: string;
  role: string;
  name: string;
  roleId: string;
}

export interface DepartmentConfig {
  id: string;
  name: string;
  fullName: string;
  processes: DepartmentProcess[];
  users: DepartmentUser[];
  frameworks: string[];
  specializations: string[];
}

// Helper function to generate all standard users for a department
function generateDepartmentUsers(departmentId: string): DepartmentUser[] {
  return [
    // Executive Management
    { email: `management@${departmentId}.com`, password: "mgmt123", role: "Management", name: "Executive Manager", roleId: "management" },
    { email: `topmgmt@${departmentId}.com`, password: "top123", role: "Top Management", name: "Top Manager", roleId: "top-management" },
    
    // System Administration
    { email: `admin@${departmentId}.com`, password: "admin123", role: "System Administrator", name: "System Admin", roleId: "system-admin" },
    
    // Process Team
    { email: `process.head@${departmentId}.com`, password: "proc123", role: "Process Head", name: "Process Head", roleId: "process-head" },
    { email: `process.engineer@${departmentId}.com`, password: "preng123", role: "Process Engineer", name: "Process Engineer", roleId: "process-engineer" },
    
    // Project Team
    { email: `project.head@${departmentId}.com`, password: "pjhead123", role: "Project Head", name: "Project Head", roleId: "project-head" },
    { email: `project.manager@${departmentId}.com`, password: "pjmgr123", role: "Project Manager", name: "Project Manager", roleId: "project-manager" },
    { email: `project.engineer@${departmentId}.com`, password: "pjeng123", role: "Project Engineer", name: "Project Engineer", roleId: "project-engineer" },
    
    // Design Team
    { email: `design.head@${departmentId}.com`, password: "deshead123", role: "Design Head", name: "Design Head", roleId: "design-head" },
    { email: `design.engineer@${departmentId}.com`, password: "deseng123", role: "Design Engineer", name: "Design Engineer", roleId: "design-engineer" },
    
    // Development Team
    { email: `dev.engineer@${departmentId}.com`, password: "deveng123", role: "Development Engineer", name: "Development Engineer", roleId: "development-engineer" },
    { email: `developer@${departmentId}.com`, password: "dev123", role: "Developer", name: "Software Developer", roleId: "developer" },
    { email: `software.engineer@${departmentId}.com`, password: "sweng123", role: "Software Engineer", name: "Software Engineer", roleId: "software-engineer" },
    
    // Testing Team
    { email: `testing.head@${departmentId}.com`, password: "testhead123", role: "Testing Head", name: "Testing Head", roleId: "testing-head" },
    { email: `testing.engineer@${departmentId}.com`, password: "testeng123", role: "Testing Engineer", name: "Testing Engineer", roleId: "testing-engineer" },
    
    // IT Team
    { email: `it.head@${departmentId}.com`, password: "ithead123", role: "IT Head", name: "IT Head", roleId: "it-head" },
    { email: `it.engineer@${departmentId}.com`, password: "iteng123", role: "IT Engineer", name: "IT Engineer", roleId: "it-engineer" },
    
    // HR Team
    { email: `hr.head@${departmentId}.com`, password: "hrhead123", role: "HR Head", name: "HR Head", roleId: "hr-head" },
    { email: `hr.executive@${departmentId}.com`, password: "hrexec123", role: "HR Executive", name: "HR Executive", roleId: "hr-executive" },
    
    // Training Team
    { email: `training.head@${departmentId}.com`, password: "trainhead123", role: "Training Head", name: "Training Head", roleId: "training-head" },
    { email: `training.executive@${departmentId}.com`, password: "trainexec123", role: "Training Executive", name: "Training Executive", roleId: "training-executive" },
    
    // Admin Team
    { email: `admin.head@${departmentId}.com`, password: "admhead123", role: "Admin Head", name: "Admin Head", roleId: "admin-head" },
    { email: `admin.executive@${departmentId}.com`, password: "admexec123", role: "Admin Executive", name: "Admin Executive", roleId: "admin-executive" },
    
    // Purchase Team
    { email: `purchase.head@${departmentId}.com`, password: "purhead123", role: "Purchase Head", name: "Purchase Head", roleId: "purchase-head" },
    { email: `purchase.executive@${departmentId}.com`, password: "purexec123", role: "Purchase Executive", name: "Purchase Executive", roleId: "purchase-executive" },
    
    // General
    { email: `team@${departmentId}.com`, password: "team123", role: "Team Member", name: "Team Member", roleId: "team-member" },
  ];
}

// Software Department Configuration
const softwareDepartment: DepartmentConfig = {
  id: "software",
  name: "Software & Technology",
  fullName: "Software Development & Technology Services",
  frameworks: ["SOC 2", "ISO 27001", "GDPR", "CCPA"],
  specializations: ["Cloud Security", "Data Privacy", "API Security", "DevSecOps"],
  processes: [
    {
      id: "definition",
      number: "1",
      name: "Security Architecture Definition",
      title: "Define Security Architecture",
      description: "Establish security frameworks, coding standards, and data protection policies",
      items: [
        "Define Security Architecture",
        "Establish Secure Coding Standards",
        "Document API Security Protocols",
        "Create Data Encryption Policies",
        "Map Cloud Security Requirements"
      ],
      color: "from-blue-500 to-blue-600"
    },
    {
      id: "implementation",
      number: "2",
      name: "Development & Deployment",
      title: "Implement Security Controls",
      description: "Deploy security tools, integrate compliance into CI/CD pipelines",
      items: [
        "Deploy Security Scanning Tools",
        "Integrate Compliance Checks in CI/CD",
        "Implement Access Controls",
        "Configure Monitoring Systems",
        "Train Development Teams"
      ],
      color: "from-purple-500 to-purple-600"
    },
    {
      id: "validation",
      number: "3",
      name: "Security Testing & Audit",
      title: "Validate Security Measures",
      description: "Conduct penetration testing, code reviews, and security audits",
      items: [
        "Perform Penetration Testing",
        "Conduct Code Security Reviews",
        "Verify Compliance Controls",
        "Validate Encryption Implementation",
        "Generate Audit Reports"
      ],
      color: "from-green-500 to-green-600"
    }
  ],
  users: generateDepartmentUsers("software")
};

// Healthcare Department Configuration
const healthcareDepartment: DepartmentConfig = {
  id: "healthcare",
  name: "Healthcare & Medical",
  fullName: "Healthcare Services & Medical Devices",
  frameworks: ["HIPAA", "FDA", "ISO 13485", "GDPR"],
  specializations: ["Patient Privacy", "Medical Records", "Clinical Compliance", "Drug Safety"],
  processes: [
    {
      id: "definition",
      number: "1",
      name: "Clinical Protocol Definition",
      title: "Define Clinical Protocols",
      description: "Establish patient care standards, privacy policies, and medical procedures",
      items: [
        "Define Patient Privacy Policies",
        "Establish Clinical Care Standards",
        "Document Medical Record Procedures",
        "Create HIPAA Compliance Policies",
        "Map Regulatory Requirements"
      ],
      color: "from-rose-500 to-rose-600"
    },
    {
      id: "implementation",
      number: "2",
      name: "Healthcare Operations",
      title: "Implement Healthcare Protocols",
      description: "Deploy medical systems, train staff, and implement patient care workflows",
      items: [
        "Deploy EMR Systems",
        "Train Medical Staff",
        "Implement Privacy Controls",
        "Execute Care Protocols",
        "Monitor Patient Safety"
      ],
      color: "from-pink-500 to-pink-600"
    },
    {
      id: "validation",
      number: "3",
      name: "Clinical Audit & Review",
      title: "Validate Medical Compliance",
      description: "Conduct clinical audits, review patient outcomes, and verify HIPAA compliance",
      items: [
        "Conduct Clinical Audits",
        "Review Patient Outcomes",
        "Verify HIPAA Compliance",
        "Validate Medical Records",
        "Continuous Quality Improvement"
      ],
      color: "from-red-500 to-red-600"
    }
  ],
  users: generateDepartmentUsers("healthcare")
};

// Finance Department Configuration
const financeDepartment: DepartmentConfig = {
  id: "finance",
  name: "Financial Services",
  fullName: "Banking, Insurance & Financial Technology",
  frameworks: ["PCI DSS", "SOC 2", "GDPR", "SOX"],
  specializations: ["Payment Security", "Financial Reporting", "Risk Management", "Anti-Money Laundering"],
  processes: [
    {
      id: "definition",
      number: "1",
      name: "Financial Control Definition",
      title: "Define Financial Controls",
      description: "Establish financial policies, audit procedures, and compliance frameworks",
      items: [
        "Define Financial Policies",
        "Establish Audit Procedures",
        "Document Payment Security Controls",
        "Create Risk Management Framework",
        "Map SOX Requirements"
      ],
      color: "from-emerald-500 to-emerald-600"
    },
    {
      id: "implementation",
      number: "2",
      name: "Financial Operations",
      title: "Implement Financial Systems",
      description: "Deploy financial systems, implement controls, and ensure compliance",
      items: [
        "Deploy Financial Systems",
        "Implement Payment Controls",
        "Execute Risk Assessments",
        "Train Finance Staff",
        "Monitor Transactions"
      ],
      color: "from-teal-500 to-teal-600"
    },
    {
      id: "validation",
      number: "3",
      name: "Financial Audit & Compliance",
      title: "Validate Financial Controls",
      description: "Conduct financial audits, verify SOX compliance, and review risk controls",
      items: [
        "Conduct Financial Audits",
        "Verify SOX Compliance",
        "Review Risk Controls",
        "Validate Payment Security",
        "Generate Compliance Reports"
      ],
      color: "from-cyan-500 to-cyan-600"
    }
  ],
  users: generateDepartmentUsers("finance")
};

// Food Department Configuration
const foodDepartment: DepartmentConfig = {
  id: "food",
  name: "Food & Beverage",
  fullName: "Food Manufacturing & Beverage Services",
  frameworks: ["HACCP", "FDA", "ISO 22000", "FSSC 22000"],
  specializations: ["Food Safety", "Quality Control", "Sanitation", "Supplier Management"],
  processes: [
    {
      id: "definition",
      number: "1",
      name: "Food Safety Protocol Definition",
      title: "Define Food Safety Protocols",
      description: "Establish HACCP plans, sanitation procedures, and quality standards",
      items: [
        "Define HACCP Plans",
        "Establish Sanitation Procedures",
        "Document Quality Standards",
        "Create Allergen Control Policies",
        "Map FDA Requirements"
      ],
      color: "from-orange-500 to-orange-600"
    },
    {
      id: "implementation",
      number: "2",
      name: "Food Production Operations",
      title: "Implement Food Safety",
      description: "Deploy food safety systems, train staff, and monitor production",
      items: [
        "Deploy Food Safety Systems",
        "Train Production Staff",
        "Implement Quality Controls",
        "Execute Sanitation Protocols",
        "Monitor Critical Control Points"
      ],
      color: "from-amber-500 to-amber-600"
    },
    {
      id: "validation",
      number: "3",
      name: "Food Safety Audit",
      title: "Validate Food Safety",
      description: "Conduct food safety audits, verify HACCP compliance, and test products",
      items: [
        "Conduct Food Safety Audits",
        "Verify HACCP Compliance",
        "Test Product Quality",
        "Review Sanitation Records",
        "Continuous Safety Monitoring"
      ],
      color: "from-yellow-500 to-yellow-600"
    }
  ],
  users: generateDepartmentUsers("food")
};

// Retail Department Configuration
const retailDepartment: DepartmentConfig = {
  id: "retail",
  name: "Retail & E-commerce",
  fullName: "Retail Operations & E-commerce Platform",
  frameworks: ["PCI DSS", "GDPR", "ISO 27001", "CCPA"],
  specializations: ["Payment Security", "Customer Data Protection", "Inventory Compliance", "Supply Chain"],
  processes: [
    {
      id: "definition",
      number: "1",
      name: "Retail Compliance Definition",
      title: "Define Retail Standards",
      description: "Establish payment security, customer privacy, and operational policies",
      items: [
        "Define Payment Security Standards",
        "Establish Customer Privacy Policies",
        "Document Inventory Procedures",
        "Create Supply Chain Controls",
        "Map PCI DSS Requirements"
      ],
      color: "from-purple-500 to-purple-600"
    },
    {
      id: "implementation",
      number: "2",
      name: "Retail Operations",
      title: "Implement Retail Systems",
      description: "Deploy POS systems, implement security controls, and train staff",
      items: [
        "Deploy POS Systems",
        "Implement Payment Security",
        "Train Retail Staff",
        "Execute Inventory Controls",
        "Monitor Customer Data"
      ],
      color: "from-indigo-500 to-indigo-600"
    },
    {
      id: "validation",
      number: "3",
      name: "Retail Compliance Audit",
      title: "Validate Retail Compliance",
      description: "Conduct PCI audits, verify privacy compliance, and review operations",
      items: [
        "Conduct PCI DSS Audits",
        "Verify Customer Privacy",
        "Review Security Controls",
        "Validate Payment Systems",
        "Continuous Compliance Monitoring"
      ],
      color: "from-violet-500 to-violet-600"
    }
  ],
  users: generateDepartmentUsers("retail")
};

// Education, Manufacturing, Travel departments (simplified for now)
const educationDepartment: DepartmentConfig = {
  id: "education",
  name: "Education",
  fullName: "Educational Institutions & E-Learning",
  frameworks: ["FERPA", "COPPA", "GDPR", "ISO 27001"],
  specializations: ["Student Privacy", "Data Security", "Academic Compliance", "Online Safety"],
  processes: [
    {
      id: "definition",
      number: "1",
      name: "Academic Policy Definition",
      title: "Define Academic Policies",
      description: "Establish student privacy policies, data protection, and academic standards",
      items: [
        "Define Student Privacy Policies",
        "Establish Data Protection Standards",
        "Document Academic Procedures",
        "Create Online Safety Protocols",
        "Map FERPA Requirements"
      ],
      color: "from-violet-500 to-violet-600"
    },
    {
      id: "implementation",
      number: "2",
      name: "Educational Operations",
      title: "Implement Academic Systems",
      description: "Deploy learning systems, train faculty, and protect student data",
      items: [
        "Deploy LMS Systems",
        "Train Faculty & Staff",
        "Implement Privacy Controls",
        "Execute Academic Policies",
        "Monitor Student Safety"
      ],
      color: "from-purple-500 to-purple-600"
    },
    {
      id: "validation",
      number: "3",
      name: "Academic Compliance Audit",
      title: "Validate Academic Compliance",
      description: "Conduct educational audits, verify FERPA compliance, and review privacy",
      items: [
        "Conduct Academic Audits",
        "Verify FERPA Compliance",
        "Review Privacy Controls",
        "Validate Data Protection",
        "Continuous Policy Review"
      ],
      color: "from-fuchsia-500 to-fuchsia-600"
    }
  ],
  users: generateDepartmentUsers("education")
};

const manufacturingDepartment: DepartmentConfig = {
  id: "manufacturing",
  name: "Manufacturing",
  fullName: "Industrial Manufacturing & Production",
  frameworks: ["ISO 9001", "ISO 14001", "OSHA", "ISO 45001"],
  specializations: ["Quality Management", "Environmental Compliance", "Safety Standards", "Production Control"],
  processes: [
    {
      id: "definition",
      number: "1",
      name: "Quality System Definition",
      title: "Define Quality Systems",
      description: "Establish quality standards, safety procedures, and environmental policies",
      items: [
        "Define Quality Standards",
        "Establish Safety Procedures",
        "Document Environmental Policies",
        "Create Production Controls",
        "Map ISO Requirements"
      ],
      color: "from-slate-600 to-slate-700"
    },
    {
      id: "implementation",
      number: "2",
      name: "Manufacturing Operations",
      title: "Implement Quality Controls",
      description: "Deploy quality systems, train workers, and ensure safe operations",
      items: [
        "Deploy Quality Systems",
        "Train Production Workers",
        "Implement Safety Controls",
        "Execute Production Plans",
        "Monitor Environmental Impact"
      ],
      color: "from-gray-600 to-gray-700"
    },
    {
      id: "validation",
      number: "3",
      name: "Quality & Safety Audit",
      title: "Validate Manufacturing Compliance",
      description: "Conduct quality audits, verify ISO compliance, and review safety",
      items: [
        "Conduct Quality Audits",
        "Verify ISO Compliance",
        "Review Safety Records",
        "Validate Production Quality",
        "Continuous Improvement"
      ],
      color: "from-zinc-600 to-zinc-700"
    }
  ],
  users: generateDepartmentUsers("manufacturing")
};

const travelDepartment: DepartmentConfig = {
  id: "travel",
  name: "Travel & Hospitality",
  fullName: "Travel Services & Hospitality Management",
  frameworks: ["PCI DSS", "GDPR", "ISO 27001", "CCPA"],
  specializations: ["Guest Privacy", "Payment Security", "Service Quality", "Booking Systems"],
  processes: [
    {
      id: "definition",
      number: "1",
      name: "Hospitality Standards Definition",
      title: "Define Service Standards",
      description: "Establish guest privacy, payment security, and service quality standards",
      items: [
        "Define Guest Privacy Policies",
        "Establish Payment Security",
        "Document Service Standards",
        "Create Booking Procedures",
        "Map Compliance Requirements"
      ],
      color: "from-sky-500 to-sky-600"
    },
    {
      id: "implementation",
      number: "2",
      name: "Hospitality Operations",
      title: "Implement Guest Services",
      description: "Deploy booking systems, train staff, and ensure guest satisfaction",
      items: [
        "Deploy Booking Systems",
        "Train Hospitality Staff",
        "Implement Privacy Controls",
        "Execute Service Standards",
        "Monitor Guest Experience"
      ],
      color: "from-blue-500 to-blue-600"
    },
    {
      id: "validation",
      number: "3",
      name: "Service Quality Audit",
      title: "Validate Service Compliance",
      description: "Conduct service audits, verify compliance, and review guest feedback",
      items: [
        "Conduct Service Audits",
        "Verify Privacy Compliance",
        "Review Guest Feedback",
        "Validate Payment Security",
        "Continuous Service Improvement"
      ],
      color: "from-indigo-500 to-indigo-600"
    }
  ],
  users: generateDepartmentUsers("travel")
};

// Export department configurations
export const departmentConfigs: Record<string, DepartmentConfig> = {
  software: softwareDepartment,
  healthcare: healthcareDepartment,
  finance: financeDepartment,
  food: foodDepartment,
  retail: retailDepartment,
  education: educationDepartment,
  manufacturing: manufacturingDepartment,
  travel: travelDepartment
};

// Helper function to get department config
export function getDepartmentConfig(departmentId: string): DepartmentConfig | undefined {
  return departmentConfigs[departmentId];
}

// Helper function to get department processes
export function getDepartmentProcesses(departmentId: string): DepartmentProcess[] {
  const config = getDepartmentConfig(departmentId);
  return config?.processes || [];
}

// Helper function to get department users
export function getDepartmentUsers(departmentId: string): DepartmentUser[] {
  const config = getDepartmentConfig(departmentId);
  return config?.users || [];
}