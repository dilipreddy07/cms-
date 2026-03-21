// Department-specific data configurations
// Each department has completely unique data that is not shared

export interface DepartmentDashboardData {
  // Statistics
  totalUsers: number;
  activeSessions: number;
  securityAlerts: number;
  systemHealth: number;
  
  // Growth data
  userGrowth: { month: string; users: number }[];
  
  // Department distribution
  departmentBreakdown: { name: string; value: number; color: string }[];
  
  // Compliance rates
  complianceRates: {
    framework1: { name: string; rate: number };
    framework2: { name: string; rate: number };
    framework3: { name: string; rate: number };
  };
  
  // Tasks
  tasksCompleted: number;
  tasksInProgress: number;
  tasksOverdue: number;
  
  // Documents
  documentsApproved: number;
  documentsPending: number;
  documentsDraft: number;
  
  // Activity log
  recentActivities: {
    action: string;
    user: string;
    time: string;
    type: string;
  }[];
  
  // Department-specific metrics
  industryTypes: number;
  activeStandards: number;
  activeDepartments: number;
  usersAssigned: number;
  accessLevels: number;
  checklistTemplates: number;
}

// SOFTWARE DEPARTMENT DATA
const softwareData: DepartmentDashboardData = {
  totalUsers: 186,
  activeSessions: 34,
  securityAlerts: 2,
  systemHealth: 99,
  
  userGrowth: [
    { month: 'Jan', users: 120 },
    { month: 'Feb', users: 138 },
    { month: 'Mar', users: 155 },
    { month: 'Apr', users: 168 },
    { month: 'May', users: 177 },
    { month: 'Jun', users: 186 }
  ],
  
  departmentBreakdown: [
    { name: 'Engineering', value: 78, color: '#3b82f6' },
    { name: 'DevOps', value: 42, color: '#8b5cf6' },
    { name: 'Security', value: 28, color: '#10b981' },
    { name: 'QA', value: 24, color: '#f59e0b' },
    { name: 'Product', value: 14, color: '#ef4444' }
  ],
  
  complianceRates: {
    framework1: { name: 'SOC 2', rate: 96 },
    framework2: { name: 'ISO 27001', rate: 92 },
    framework3: { name: 'GDPR', rate: 94 }
  },
  
  tasksCompleted: 234,
  tasksInProgress: 45,
  tasksOverdue: 8,
  
  documentsApproved: 312,
  documentsPending: 18,
  documentsDraft: 9,
  
  recentActivities: [
    { action: "Security architecture updated for microservices", user: "security.lead@company.com", time: "3 minutes ago", type: "security" },
    { action: "New API security protocol added to DevOps pipeline", user: "devops.manager@company.com", time: "18 minutes ago", type: "deployment" },
    { action: "Code review standards updated for ISO 27001", user: "developer@company.com", time: "42 minutes ago", type: "standards" },
    { action: "Penetration testing completed for payment gateway", user: "security.lead@company.com", time: "1 hour ago", type: "testing" },
    { action: "SOC 2 compliance report generated", user: "admin.software@company.com", time: "2 hours ago", type: "compliance" }
  ],
  
  industryTypes: 4,
  activeStandards: 8,
  activeDepartments: 5,
  usersAssigned: 186,
  accessLevels: 7,
  checklistTemplates: 22
};

// HEALTHCARE DEPARTMENT DATA
const healthcareData: DepartmentDashboardData = {
  totalUsers: 342,
  activeSessions: 67,
  securityAlerts: 1,
  systemHealth: 98,
  
  userGrowth: [
    { month: 'Jan', users: 280 },
    { month: 'Feb', users: 295 },
    { month: 'Mar', users: 308 },
    { month: 'Apr', users: 318 },
    { month: 'May', users: 330 },
    { month: 'Jun', users: 342 }
  ],
  
  departmentBreakdown: [
    { name: 'Clinical Staff', value: 145, color: '#ec4899' },
    { name: 'Administration', value: 82, color: '#f43f5e' },
    { name: 'IT Health Systems', value: 56, color: '#a855f7' },
    { name: 'Compliance', value: 38, color: '#3b82f6' },
    { name: 'Quality Assurance', value: 21, color: '#10b981' }
  ],
  
  complianceRates: {
    framework1: { name: 'HIPAA', rate: 98 },
    framework2: { name: 'FDA', rate: 95 },
    framework3: { name: 'ISO 13485', rate: 91 }
  },
  
  tasksCompleted: 456,
  tasksInProgress: 72,
  tasksOverdue: 5,
  
  documentsApproved: 567,
  documentsPending: 34,
  documentsDraft: 12,
  
  recentActivities: [
    { action: "Patient privacy policy updated for HIPAA compliance", user: "compliance.officer@hospital.com", time: "5 minutes ago", type: "privacy" },
    { action: "EMR system security audit completed", user: "Dr. Admin", time: "22 minutes ago", type: "audit" },
    { action: "Clinical care protocol revised for ICU", user: "nurse@hospital.com", time: "35 minutes ago", type: "clinical" },
    { action: "Medical records encryption verified", user: "compliance.officer@hospital.com", time: "58 minutes ago", type: "security" },
    { action: "FDA compliance documentation submitted", user: "Dr. David CMO", time: "1.5 hours ago", type: "compliance" }
  ],
  
  industryTypes: 6,
  activeStandards: 12,
  activeDepartments: 8,
  usersAssigned: 342,
  accessLevels: 6,
  checklistTemplates: 28
};

// FINANCE DEPARTMENT DATA
const financeData: DepartmentDashboardData = {
  totalUsers: 278,
  activeSessions: 52,
  securityAlerts: 4,
  systemHealth: 97,
  
  userGrowth: [
    { month: 'Jan', users: 215 },
    { month: 'Feb', users: 232 },
    { month: 'Mar', users: 248 },
    { month: 'Apr', users: 258 },
    { month: 'May', users: 268 },
    { month: 'Jun', users: 278 }
  ],
  
  departmentBreakdown: [
    { name: 'Risk Management', value: 92, color: '#10b981' },
    { name: 'Audit & Compliance', value: 76, color: '#14b8a6' },
    { name: 'Treasury', value: 54, color: '#06b6d4' },
    { name: 'Operations', value: 38, color: '#0ea5e9' },
    { name: 'Investment', value: 18, color: '#3b82f6' }
  ],
  
  complianceRates: {
    framework1: { name: 'PCI DSS', rate: 97 },
    framework2: { name: 'SOX', rate: 95 },
    framework3: { name: 'GDPR', rate: 93 }
  },
  
  tasksCompleted: 389,
  tasksInProgress: 58,
  tasksOverdue: 11,
  
  documentsApproved: 892,
  documentsPending: 45,
  documentsDraft: 23,
  
  recentActivities: [
    { action: "SOX compliance audit framework updated", user: "compliance.finance@bank.com", time: "7 minutes ago", type: "audit" },
    { action: "Payment security controls enhanced for PCI DSS", user: "Alex Finance", time: "28 minutes ago", type: "security" },
    { action: "Risk assessment completed for crypto assets", user: "analyst@bank.com", time: "45 minutes ago", type: "risk" },
    { action: "Financial reporting system upgraded", user: "operations.manager@bank.com", time: "1 hour ago", type: "systems" },
    { action: "Anti-money laundering procedures reviewed", user: "David CFO", time: "2 hours ago", type: "compliance" }
  ],
  
  industryTypes: 5,
  activeStandards: 14,
  activeDepartments: 6,
  usersAssigned: 278,
  accessLevels: 8,
  checklistTemplates: 31
};

// FOOD DEPARTMENT DATA
const foodData: DepartmentDashboardData = {
  totalUsers: 156,
  activeSessions: 28,
  securityAlerts: 3,
  systemHealth: 96,
  
  userGrowth: [
    { month: 'Jan', users: 118 },
    { month: 'Feb', users: 128 },
    { month: 'Mar', users: 136 },
    { month: 'Apr', users: 142 },
    { month: 'May', users: 149 },
    { month: 'Jun', users: 156 }
  ],
  
  departmentBreakdown: [
    { name: 'Production', value: 68, color: '#f97316' },
    { name: 'Quality Control', value: 42, color: '#fb923c' },
    { name: 'Sanitation', value: 24, color: '#fdba74' },
    { name: 'R&D', value: 14, color: '#fbbf24' },
    { name: 'Logistics', value: 8, color: '#fcd34d' }
  ],
  
  complianceRates: {
    framework1: { name: 'HACCP', rate: 99 },
    framework2: { name: 'FDA', rate: 96 },
    framework3: { name: 'ISO 22000', rate: 94 }
  },
  
  tasksCompleted: 512,
  tasksInProgress: 34,
  tasksOverdue: 6,
  
  documentsApproved: 423,
  documentsPending: 28,
  documentsDraft: 15,
  
  recentActivities: [
    { action: "HACCP plan updated for new production line", user: "quality.manager@food.com", time: "4 minutes ago", type: "safety" },
    { action: "Allergen control procedures revised", user: "inspector@food.com", time: "19 minutes ago", type: "quality" },
    { action: "Sanitation audit completed for facility A", user: "quality.manager@food.com", time: "38 minutes ago", type: "audit" },
    { action: "Critical control points monitoring enhanced", user: "production.manager@food.com", time: "52 minutes ago", type: "monitoring" },
    { action: "FDA inspection documentation prepared", user: "David GM", time: "1.5 hours ago", type: "compliance" }
  ],
  
  industryTypes: 3,
  activeStandards: 9,
  activeDepartments: 5,
  usersAssigned: 156,
  accessLevels: 5,
  checklistTemplates: 18
};

// RETAIL DEPARTMENT DATA
const retailData: DepartmentDashboardData = {
  totalUsers: 412,
  activeSessions: 89,
  securityAlerts: 6,
  systemHealth: 95,
  
  userGrowth: [
    { month: 'Jan', users: 325 },
    { month: 'Feb', users: 348 },
    { month: 'Mar', users: 368 },
    { month: 'Apr', users: 385 },
    { month: 'May', users: 398 },
    { month: 'Jun', users: 412 }
  ],
  
  departmentBreakdown: [
    { name: 'Store Operations', value: 186, color: '#8b5cf6' },
    { name: 'E-commerce', value: 124, color: '#a855f7' },
    { name: 'Customer Service', value: 58, color: '#c084fc' },
    { name: 'Inventory', value: 32, color: '#d8b4fe' },
    { name: 'Marketing', value: 12, color: '#e9d5ff' }
  ],
  
  complianceRates: {
    framework1: { name: 'PCI DSS', rate: 98 },
    framework2: { name: 'GDPR', rate: 93 },
    framework3: { name: 'CCPA', rate: 91 }
  },
  
  tasksCompleted: 678,
  tasksInProgress: 92,
  tasksOverdue: 15,
  
  documentsApproved: 534,
  documentsPending: 67,
  documentsDraft: 28,
  
  recentActivities: [
    { action: "POS system security patch deployed across 42 stores", user: "compliance.retail@store.com", time: "6 minutes ago", type: "security" },
    { action: "Customer data privacy policy updated for GDPR", user: "Alex Retail", time: "24 minutes ago", type: "privacy" },
    { action: "Payment gateway audit completed", user: "store.manager@store.com", time: "41 minutes ago", type: "audit" },
    { action: "Inventory compliance check for seasonal items", user: "associate@store.com", time: "1 hour ago", type: "inventory" },
    { action: "E-commerce platform security review", user: "David CEO", time: "2 hours ago", type: "security" }
  ],
  
  industryTypes: 7,
  activeStandards: 11,
  activeDepartments: 9,
  usersAssigned: 412,
  accessLevels: 6,
  checklistTemplates: 25
};

// EDUCATION DEPARTMENT DATA
const educationData: DepartmentDashboardData = {
  totalUsers: 524,
  activeSessions: 112,
  securityAlerts: 2,
  systemHealth: 97,
  
  userGrowth: [
    { month: 'Jan', users: 445 },
    { month: 'Feb', users: 468 },
    { month: 'Mar', users: 482 },
    { month: 'Apr', users: 495 },
    { month: 'May', users: 509 },
    { month: 'Jun', users: 524 }
  ],
  
  departmentBreakdown: [
    { name: 'Faculty', value: 198, color: '#a855f7' },
    { name: 'Administration', value: 156, color: '#c084fc' },
    { name: 'IT Services', value: 82, color: '#d8b4fe' },
    { name: 'Student Services', value: 62, color: '#e9d5ff' },
    { name: 'Research', value: 26, color: '#f3e8ff' }
  ],
  
  complianceRates: {
    framework1: { name: 'FERPA', rate: 99 },
    framework2: { name: 'COPPA', rate: 96 },
    framework3: { name: 'GDPR', rate: 92 }
  },
  
  tasksCompleted: 892,
  tasksInProgress: 134,
  tasksOverdue: 18,
  
  documentsApproved: 1245,
  documentsPending: 89,
  documentsDraft: 42,
  
  recentActivities: [
    { action: "Student privacy records audit completed", user: "compliance.edu@university.com", time: "8 minutes ago", type: "privacy" },
    { action: "FERPA training module deployed to all staff", user: "Dr. Admin", time: "32 minutes ago", type: "training" },
    { action: "LMS security update applied", user: "registrar@university.com", time: "47 minutes ago", type: "security" },
    { action: "Online exam proctoring system certified", user: "professor@university.com", time: "1.2 hours ago", type: "academic" },
    { action: "Data protection policy updated for research", user: "Dr. David President", time: "2.5 hours ago", type: "compliance" }
  ],
  
  industryTypes: 4,
  activeStandards: 10,
  activeDepartments: 12,
  usersAssigned: 524,
  accessLevels: 7,
  checklistTemplates: 34
};

// MANUFACTURING DEPARTMENT DATA
const manufacturingData: DepartmentDashboardData = {
  totalUsers: 296,
  activeSessions: 58,
  securityAlerts: 5,
  systemHealth: 94,
  
  userGrowth: [
    { month: 'Jan', users: 245 },
    { month: 'Feb', users: 258 },
    { month: 'Mar', users: 268 },
    { month: 'Apr', users: 278 },
    { month: 'May', users: 287 },
    { month: 'Jun', users: 296 }
  ],
  
  departmentBreakdown: [
    { name: 'Production', value: 142, color: '#64748b' },
    { name: 'Quality', value: 68, color: '#94a3b8' },
    { name: 'Safety', value: 48, color: '#cbd5e1' },
    { name: 'Maintenance', value: 28, color: '#e2e8f0' },
    { name: 'Logistics', value: 10, color: '#f1f5f9' }
  ],
  
  complianceRates: {
    framework1: { name: 'ISO 9001', rate: 96 },
    framework2: { name: 'ISO 14001', rate: 93 },
    framework3: { name: 'ISO 45001', rate: 95 }
  },
  
  tasksCompleted: 724,
  tasksInProgress: 86,
  tasksOverdue: 22,
  
  documentsApproved: 968,
  documentsPending: 54,
  documentsDraft: 31,
  
  recentActivities: [
    { action: "ISO 9001 quality management system updated", user: "quality.manager@factory.com", time: "9 minutes ago", type: "quality" },
    { action: "Environmental compliance audit completed", user: "Alex Manufacturing", time: "36 minutes ago", type: "environmental" },
    { action: "Workplace safety inspection for Plant B", user: "plant.manager@factory.com", time: "52 minutes ago", type: "safety" },
    { action: "Production line certification renewed", user: "operator@factory.com", time: "1.3 hours ago", type: "operations" },
    { action: "OSHA compliance documentation submitted", user: "David VP", time: "2.8 hours ago", type: "compliance" }
  ],
  
  industryTypes: 5,
  activeStandards: 13,
  activeDepartments: 7,
  usersAssigned: 296,
  accessLevels: 6,
  checklistTemplates: 27
};

// TRAVEL DEPARTMENT DATA
const travelData: DepartmentDashboardData = {
  totalUsers: 368,
  activeSessions: 74,
  securityAlerts: 3,
  systemHealth: 96,
  
  userGrowth: [
    { month: 'Jan', users: 298 },
    { month: 'Feb', users: 315 },
    { month: 'Mar', users: 332 },
    { month: 'Apr', users: 345 },
    { month: 'May', users: 356 },
    { month: 'Jun', users: 368 }
  ],
  
  departmentBreakdown: [
    { name: 'Guest Services', value: 156, color: '#0ea5e9' },
    { name: 'Reservations', value: 98, color: '#38bdf8' },
    { name: 'Operations', value: 68, color: '#7dd3fc' },
    { name: 'Hospitality', value: 32, color: '#bae6fd' },
    { name: 'Management', value: 14, color: '#e0f2fe' }
  ],
  
  complianceRates: {
    framework1: { name: 'PCI DSS', rate: 97 },
    framework2: { name: 'GDPR', rate: 94 },
    framework3: { name: 'ISO 27001', rate: 91 }
  },
  
  tasksCompleted: 834,
  tasksInProgress: 102,
  tasksOverdue: 14,
  
  documentsApproved: 678,
  documentsPending: 72,
  documentsDraft: 36,
  
  recentActivities: [
    { action: "Guest data privacy policy updated for EU guests", user: "compliance.travel@hotel.com", time: "5 minutes ago", type: "privacy" },
    { action: "Booking system security audit completed", user: "Alex Travel", time: "27 minutes ago", type: "security" },
    { action: "Payment gateway PCI DSS certification renewed", user: "hotel.manager@hotel.com", time: "44 minutes ago", type: "payment" },
    { action: "Service quality standards reviewed", user: "concierge@hotel.com", time: "1.1 hours ago", type: "service" },
    { action: "Guest feedback compliance analysis", user: "David GM", time: "2.3 hours ago", type: "compliance" }
  ],
  
  industryTypes: 6,
  activeStandards: 10,
  activeDepartments: 8,
  usersAssigned: 368,
  accessLevels: 6,
  checklistTemplates: 23
};

// Export all department data
export const departmentDataConfigs: Record<string, DepartmentDashboardData> = {
  software: softwareData,
  healthcare: healthcareData,
  finance: financeData,
  food: foodData,
  retail: retailData,
  education: educationData,
  manufacturing: manufacturingData,
  travel: travelData
};

// Helper function to get department data
export function getDepartmentData(departmentId: string): DepartmentDashboardData {
  return departmentDataConfigs[departmentId] || softwareData; // Fallback to software
}
