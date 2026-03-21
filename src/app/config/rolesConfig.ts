// Comprehensive role configuration for the compliance management system

export interface RoleDefinition {
  roleId: string;
  roleName: string;
  category: string;
  processAccess: string[]; // which process phases they can access
  level: number; // hierarchy level (1 = highest)
}

export const ROLES: RoleDefinition[] = [
  // Executive Management
  { roleId: "management", roleName: "Management", category: "Executive", processAccess: ["definition", "implementation", "validation"], level: 1 },
  { roleId: "top-management", roleName: "Top Management", category: "Executive", processAccess: ["definition", "implementation", "validation"], level: 1 },
  
  // System Administration
  { roleId: "system-admin", roleName: "System Administrator", category: "Administration", processAccess: ["definition", "implementation", "validation"], level: 2 },
  
  // Process Management
  { roleId: "process-head", roleName: "Process Head", category: "Process", processAccess: ["definition", "implementation", "validation"], level: 3 },
  { roleId: "process-engineer", roleName: "Process Engineer", category: "Process", processAccess: ["definition", "implementation", "validation"], level: 4 },
  
  // Project Management
  { roleId: "project-head", roleName: "Project Head", category: "Project", processAccess: ["definition", "implementation", "validation"], level: 3 },
  { roleId: "project-manager", roleName: "Project Manager", category: "Project", processAccess: ["definition", "implementation", "validation"], level: 4 },
  { roleId: "project-engineer", roleName: "Project Engineer", category: "Project", processAccess: ["definition", "implementation", "validation"], level: 5 },
  
  // Design Team
  { roleId: "design-head", roleName: "Design Head", category: "Design", processAccess: ["definition", "implementation", "validation"], level: 3 },
  { roleId: "design-engineer", roleName: "Design Engineer", category: "Design", processAccess: ["definition", "implementation", "validation"], level: 5 },
  
  // Development Team
  { roleId: "development-engineer", roleName: "Development Engineer", category: "Development", processAccess: ["definition", "implementation", "validation"], level: 5 },
  { roleId: "developer", roleName: "Developer", category: "Development", processAccess: ["definition", "implementation", "validation"], level: 5 },
  { roleId: "software-engineer", roleName: "Software Engineer", category: "Development", processAccess: ["definition", "implementation", "validation"], level: 5 },
  
  // Testing Team
  { roleId: "testing-head", roleName: "Testing Head", category: "Testing", processAccess: ["definition", "implementation", "validation"], level: 3 },
  { roleId: "testing-engineer", roleName: "Testing Engineer", category: "Testing", processAccess: ["definition", "implementation", "validation"], level: 5 },
  
  // IT Team
  { roleId: "it-head", roleName: "IT Head", category: "IT", processAccess: ["definition", "implementation", "validation"], level: 3 },
  { roleId: "it-engineer", roleName: "IT Engineer", category: "IT", processAccess: ["definition", "implementation", "validation"], level: 5 },
  
  // HR Team
  { roleId: "hr-head", roleName: "HR Head", category: "HR", processAccess: ["definition", "validation"], level: 3 },
  { roleId: "hr-executive", roleName: "HR Executive", category: "HR", processAccess: ["implementation"], level: 5 },
  
  // Training Team
  { roleId: "training-head", roleName: "Training Head", category: "Training", processAccess: ["definition", "implementation", "validation"], level: 3 },
  { roleId: "training-executive", roleName: "Training Executive", category: "Training", processAccess: ["definition", "implementation", "validation"], level: 5 },
  
  // Admin Team
  { roleId: "admin-head", roleName: "Admin Head", category: "Admin", processAccess: ["definition", "implementation", "validation"], level: 3 },
  { roleId: "admin-executive", roleName: "Admin Executive", category: "Admin", processAccess: ["definition", "implementation", "validation"], level: 5 },
  
  // Purchase Team
  { roleId: "purchase-head", roleName: "Purchase Head", category: "Purchase", processAccess: ["definition", "implementation", "validation"], level: 3 },
  { roleId: "purchase-executive", roleName: "Purchase Executive", category: "Purchase", processAccess: ["definition", "implementation", "validation"], level: 5 },
  
  // General Team Members
  { roleId: "team-member", roleName: "Team Member", category: "General", processAccess: ["definition", "implementation", "validation"], level: 6 },
];

// Helper function to get role by ID
export function getRoleById(roleId: string): RoleDefinition | undefined {
  return ROLES.find(role => role.roleId === roleId);
}

// Helper function to check if role has access to a process
export function hasProcessAccess(roleId: string, processId: string): boolean {
  const role = getRoleById(roleId);
  return role ? role.processAccess.includes(processId) : false;
}

// Helper function to get all roles by category
export function getRolesByCategory(category: string): RoleDefinition[] {
  return ROLES.filter(role => role.category === category);
}

// Get role display name
export function getRoleDisplayName(roleId: string): string {
  const role = getRoleById(roleId);
  return role ? role.roleName : roleId;
}