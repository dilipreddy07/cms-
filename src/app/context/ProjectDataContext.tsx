import { createContext, useContext, useState, ReactNode } from "react";

// Types for shared project data
export interface ComplianceRequirement {
  id: string;
  standard: string;
  clause: string;
  title: string;
  department: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  owner: string;
  dueDate: string;
  status: "Not Started" | "In Progress" | "Completed" | "Blocked";
}

export interface ProjectReview {
  id: string;
  projectName: string;
  projectManager: string;
  startDate: string;
  completionDate: string;
  milestonesCompleted: number;
  totalMilestones: number;
  deliverablesSubmitted: number;
  totalDeliverables: number;
  reviewStatus: "Approved" | "Pending" | "Rework Required";
  reviewerComments: string;
}

export interface QualityVerification {
  id: string;
  projectName: string;
  standardName: string;
  checklistItemsReviewed: number;
  totalChecklistItems: number;
  verificationResult: "Passed" | "Failed" | "Pending";
  reviewer: string;
  verificationDate: string;
  observations: string;
}

export interface ProjectMetric {
  id: string;
  projectName: string;
  metricName: string;
  metricValue: string;
  measurementDate: string;
  remarks: string;
}

export interface FinalReport {
  id: string;
  projectName: string;
  reportDate: string;
  preparedBy: string;
  approvalStatus: "Approved" | "Pending Review" | "Draft";
  summaryComments: string;
}

export interface Task {
  id: string;
  title: string;
  assignedTo: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  status: "Not Started" | "In Progress" | "Completed" | "Blocked";
  dueDate: string;
  project: string;
  description: string;
}

export interface Issue {
  id: string;
  title: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  reportedBy: string;
  assignedTo: string;
  reportedDate: string;
  description: string;
  project: string;
}

export interface Risk {
  id: string;
  title: string;
  category: string;
  likelihood: "High" | "Medium" | "Low";
  impact: "High" | "Medium" | "Low";
  status: "Open" | "Mitigated" | "Accepted" | "Closed";
  owner: string;
  identifiedDate: string;
  description: string;
  mitigation: string;
}

export interface StandardDocument {
  id: string;
  standardName: string;
  documentType: string;
  version: string;
  uploadedBy: string;
  uploadDate: string;
  status: "Active" | "Draft" | "Archived";
  description: string;
}

export interface ChecklistItem {
  id: string;
  standardName: string;
  category: string;
  requirement: string;
  status: "Completed" | "In Progress" | "Not Started";
  assignedTo: string;
  dueDate: string;
  notes: string;
}

export interface DocumentTemplate {
  id: string;
  templateName: string;
  category: string;
  version: string;
  createdBy: string;
  createdDate: string;
  status: "Active" | "Draft" | "Archived";
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  department: string;
  joinDate: string;
  status: "Active" | "Inactive";
  assignedTasks: number;
}

export interface Milestone {
  id: string;
  name: string;
  project: string;
  dueDate: string;
  status: "Completed" | "In Progress" | "Not Started" | "Delayed";
  owner: string;
  description: string;
}

// Project Data Context Interface
interface ProjectDataContextType {
  // State
  complianceRequirements: ComplianceRequirement[];
  projectReviews: ProjectReview[];
  qualityVerifications: QualityVerification[];
  projectMetrics: ProjectMetric[];
  finalReports: FinalReport[];
  tasks: Task[];
  issues: Issue[];
  risks: Risk[];
  standardDocuments: StandardDocument[];
  checklistItems: ChecklistItem[];
  documentTemplates: DocumentTemplate[];
  teamMembers: TeamMember[];
  milestones: Milestone[];
  
  // Actions for Compliance Requirements
  addComplianceRequirement: (requirement: ComplianceRequirement) => void;
  updateComplianceRequirement: (id: string, requirement: Partial<ComplianceRequirement>) => void;
  deleteComplianceRequirement: (id: string) => void;
  
  // Actions for Project Reviews
  addProjectReview: (review: ProjectReview) => void;
  updateProjectReview: (id: string, review: Partial<ProjectReview>) => void;
  deleteProjectReview: (id: string) => void;
  
  // Actions for Quality Verifications
  addQualityVerification: (verification: QualityVerification) => void;
  updateQualityVerification: (id: string, verification: Partial<QualityVerification>) => void;
  deleteQualityVerification: (id: string) => void;
  
  // Actions for Project Metrics
  addProjectMetric: (metric: ProjectMetric) => void;
  updateProjectMetric: (id: string, metric: Partial<ProjectMetric>) => void;
  deleteProjectMetric: (id: string) => void;
  
  // Actions for Final Reports
  addFinalReport: (report: FinalReport) => void;
  updateFinalReport: (id: string, report: Partial<FinalReport>) => void;
  deleteFinalReport: (id: string) => void;
  
  // Actions for Tasks
  addTask: (task: Task) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  
  // Actions for Issues
  addIssue: (issue: Issue) => void;
  updateIssue: (id: string, issue: Partial<Issue>) => void;
  deleteIssue: (id: string) => void;
  
  // Actions for Risks
  addRisk: (risk: Risk) => void;
  updateRisk: (id: string, risk: Partial<Risk>) => void;
  deleteRisk: (id: string) => void;
  
  // Actions for Standard Documents
  addStandardDocument: (document: StandardDocument) => void;
  updateStandardDocument: (id: string, document: Partial<StandardDocument>) => void;
  deleteStandardDocument: (id: string) => void;
  
  // Actions for Checklist Items
  addChecklistItem: (item: ChecklistItem) => void;
  updateChecklistItem: (id: string, item: Partial<ChecklistItem>) => void;
  deleteChecklistItem: (id: string) => void;
  
  // Actions for Document Templates
  addDocumentTemplate: (template: DocumentTemplate) => void;
  updateDocumentTemplate: (id: string, template: Partial<DocumentTemplate>) => void;
  deleteDocumentTemplate: (id: string) => void;
  
  // Actions for Team Members
  addTeamMember: (member: TeamMember) => void;
  updateTeamMember: (id: string, member: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;
  
  // Actions for Milestones
  addMilestone: (milestone: Milestone) => void;
  updateMilestone: (id: string, milestone: Partial<Milestone>) => void;
  deleteMilestone: (id: string) => void;
}

const ProjectDataContext = createContext<ProjectDataContextType | undefined>(undefined);

export function ProjectDataProvider({ children }: { children: ReactNode }) {
  // Initialize state with sample data
  const [complianceRequirements, setComplianceRequirements] = useState<ComplianceRequirement[]>([
    {
      id: "CR001",
      standard: "ISO 27001",
      clause: "A.8.1.1",
      title: "Inventory of Assets",
      department: "Healthcare",
      priority: "Critical",
      owner: "John Smith",
      dueDate: "2026-04-15",
      status: "In Progress"
    },
    {
      id: "CR002",
      standard: "GDPR",
      clause: "Article 30",
      title: "Records of Processing Activities",
      department: "Healthcare",
      priority: "High",
      owner: "Sarah Johnson",
      dueDate: "2026-05-20",
      status: "Not Started"
    }
  ]);

  const [projectReviews, setProjectReviews] = useState<ProjectReview[]>([
    {
      id: "PR001",
      projectName: "ISO 27001 Implementation",
      projectManager: "John Smith",
      startDate: "2026-01-10",
      completionDate: "2026-03-15",
      milestonesCompleted: 8,
      totalMilestones: 8,
      deliverablesSubmitted: 12,
      totalDeliverables: 12,
      reviewStatus: "Approved",
      reviewerComments: "All deliverables meet requirements. Excellent documentation quality."
    }
  ]);

  const [qualityVerifications, setQualityVerifications] = useState<QualityVerification[]>([
    {
      id: "QV001",
      projectName: "ISO 27001 Implementation",
      standardName: "ISO 27001:2013",
      checklistItemsReviewed: 114,
      totalChecklistItems: 114,
      verificationResult: "Passed",
      reviewer: "Jane Wilson",
      verificationDate: "2026-03-20",
      observations: "All security controls implemented correctly."
    }
  ]);

  const [projectMetrics, setProjectMetrics] = useState<ProjectMetric[]>([
    {
      id: "PM001",
      projectName: "ISO 27001 Implementation",
      metricName: "Task Completion Rate",
      metricValue: "95%",
      measurementDate: "2026-03-15",
      remarks: "Excellent completion rate."
    }
  ]);

  const [finalReports, setFinalReports] = useState<FinalReport[]>([
    {
      id: "FR001",
      projectName: "ISO 27001 Implementation",
      reportDate: "2026-03-20",
      preparedBy: "Process Head",
      approvalStatus: "Approved",
      summaryComments: "All project objectives achieved."
    }
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "TSK001",
      title: "Complete Asset Inventory",
      assignedTo: "John Smith",
      priority: "Critical",
      status: "In Progress",
      dueDate: "2026-04-15",
      project: "ISO 27001 Implementation",
      description: "Create comprehensive inventory of all organizational assets"
    }
  ]);

  const [issues, setIssues] = useState<Issue[]>([
    {
      id: "ISS001",
      title: "Missing Security Documentation",
      severity: "High",
      status: "Open",
      reportedBy: "Sarah Johnson",
      assignedTo: "John Smith",
      reportedDate: "2026-03-10",
      description: "Security policies documentation incomplete",
      project: "ISO 27001 Implementation"
    }
  ]);

  const [risks, setRisks] = useState<Risk[]>([
    {
      id: "RSK001",
      title: "Data Breach Risk",
      category: "Security",
      likelihood: "Medium",
      impact: "High",
      status: "Open",
      owner: "John Smith",
      identifiedDate: "2026-03-01",
      description: "Potential data breach due to inadequate access controls",
      mitigation: "Implement multi-factor authentication"
    }
  ]);

  const [standardDocuments, setStandardDocuments] = useState<StandardDocument[]>([
    {
      id: "DOC001",
      standardName: "ISO 27001",
      documentType: "Policy",
      version: "1.0",
      uploadedBy: "Process Head",
      uploadDate: "2026-03-01",
      status: "Active",
      description: "Information Security Policy"
    }
  ]);

  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    {
      id: "CHK001",
      standardName: "ISO 27001",
      category: "Access Control",
      requirement: "Implement user access management",
      status: "In Progress",
      assignedTo: "John Smith",
      dueDate: "2026-04-15",
      notes: "Working on user access policies"
    }
  ]);

  const [documentTemplates, setDocumentTemplates] = useState<DocumentTemplate[]>([
    {
      id: "TPL001",
      templateName: "Security Policy Template",
      category: "Policy",
      version: "1.0",
      createdBy: "Process Head",
      createdDate: "2026-03-01",
      status: "Active",
      description: "Standard template for security policies"
    }
  ]);

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "TM001",
      name: "John Smith",
      role: "Security Manager",
      email: "john.smith@company.com",
      department: "Healthcare",
      joinDate: "2026-01-15",
      status: "Active",
      assignedTasks: 8
    }
  ]);

  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: "MS001",
      name: "Risk Assessment Complete",
      project: "ISO 27001 Implementation",
      dueDate: "2026-04-30",
      status: "In Progress",
      owner: "John Smith",
      description: "Complete comprehensive risk assessment"
    }
  ]);

  // Helper functions for CRUD operations
  const createUpdateFunction = <T extends { id: string }>(
    setState: React.Dispatch<React.SetStateAction<T[]>>
  ) => ({
    add: (item: T) => setState(prev => [...prev, item]),
    update: (id: string, updates: Partial<T>) => 
      setState(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item)),
    delete: (id: string) => setState(prev => prev.filter(item => item.id !== id))
  });

  const complianceReqOps = createUpdateFunction(setComplianceRequirements);
  const projectReviewOps = createUpdateFunction(setProjectReviews);
  const qualityVerificationOps = createUpdateFunction(setQualityVerifications);
  const projectMetricOps = createUpdateFunction(setProjectMetrics);
  const finalReportOps = createUpdateFunction(setFinalReports);
  const taskOps = createUpdateFunction(setTasks);
  const issueOps = createUpdateFunction(setIssues);
  const riskOps = createUpdateFunction(setRisks);
  const standardDocOps = createUpdateFunction(setStandardDocuments);
  const checklistOps = createUpdateFunction(setChecklistItems);
  const templateOps = createUpdateFunction(setDocumentTemplates);
  const teamOps = createUpdateFunction(setTeamMembers);
  const milestoneOps = createUpdateFunction(setMilestones);

  const value: ProjectDataContextType = {
    // State
    complianceRequirements,
    projectReviews,
    qualityVerifications,
    projectMetrics,
    finalReports,
    tasks,
    issues,
    risks,
    standardDocuments,
    checklistItems,
    documentTemplates,
    teamMembers,
    milestones,
    
    // Actions
    addComplianceRequirement: complianceReqOps.add,
    updateComplianceRequirement: complianceReqOps.update,
    deleteComplianceRequirement: complianceReqOps.delete,
    
    addProjectReview: projectReviewOps.add,
    updateProjectReview: projectReviewOps.update,
    deleteProjectReview: projectReviewOps.delete,
    
    addQualityVerification: qualityVerificationOps.add,
    updateQualityVerification: qualityVerificationOps.update,
    deleteQualityVerification: qualityVerificationOps.delete,
    
    addProjectMetric: projectMetricOps.add,
    updateProjectMetric: projectMetricOps.update,
    deleteProjectMetric: projectMetricOps.delete,
    
    addFinalReport: finalReportOps.add,
    updateFinalReport: finalReportOps.update,
    deleteFinalReport: finalReportOps.delete,
    
    addTask: taskOps.add,
    updateTask: taskOps.update,
    deleteTask: taskOps.delete,
    
    addIssue: issueOps.add,
    updateIssue: issueOps.update,
    deleteIssue: issueOps.delete,
    
    addRisk: riskOps.add,
    updateRisk: riskOps.update,
    deleteRisk: riskOps.delete,
    
    addStandardDocument: standardDocOps.add,
    updateStandardDocument: standardDocOps.update,
    deleteStandardDocument: standardDocOps.delete,
    
    addChecklistItem: checklistOps.add,
    updateChecklistItem: checklistOps.update,
    deleteChecklistItem: checklistOps.delete,
    
    addDocumentTemplate: templateOps.add,
    updateDocumentTemplate: templateOps.update,
    deleteDocumentTemplate: templateOps.delete,
    
    addTeamMember: teamOps.add,
    updateTeamMember: teamOps.update,
    deleteTeamMember: teamOps.delete,
    
    addMilestone: milestoneOps.add,
    updateMilestone: milestoneOps.update,
    deleteMilestone: milestoneOps.delete,
  };

  return (
    <ProjectDataContext.Provider value={value}>
      {children}
    </ProjectDataContext.Provider>
  );
}

export function useProjectData() {
  const context = useContext(ProjectDataContext);
  if (context === undefined) {
    throw new Error("useProjectData must be used within a ProjectDataProvider");
  }
  return context;
}
