// Helper component to simplify department data usage across all dashboards
import { getDepartmentData, DepartmentDashboardData } from "@/app/config/departmentData";
import { getDepartmentConfig, DepartmentConfig } from "@/app/config/departmentConfig";

export interface DepartmentDataHelperProps {
  department: string;
}

export function useDepartmentData(department: string): {
  data: DepartmentDashboardData;
  config: DepartmentConfig | undefined;
} {
  const data = getDepartmentData(department);
  const config = getDepartmentConfig(department);
  
  return { data, config };
}

// Activity type mapping for icons
export const getActivityIcon = (type: string) => {
  const iconMap: Record<string, string> = {
    'security': 'bg-blue-500',
    'deployment': 'bg-green-500',
    'standards': 'bg-purple-500',
    'testing': 'bg-amber-500',
    'compliance': 'bg-cyan-500',
    'privacy': 'bg-pink-500',
    'audit': 'bg-indigo-500',
    'clinical': 'bg-rose-500',
    'risk': 'bg-orange-500',
    'systems': 'bg-teal-500',
    'safety': 'bg-lime-500',
    'quality': 'bg-emerald-500',
    'monitoring': 'bg-sky-500',
    'payment': 'bg-violet-500',
    'inventory': 'bg-fuchsia-500',
    'training': 'bg-purple-600',
    'academic': 'bg-indigo-600',
    'environmental': 'bg-green-600',
    'operations': 'bg-blue-600',
    'service': 'bg-cyan-600'
  };
  
  return iconMap[type] || 'bg-gray-500';
};
