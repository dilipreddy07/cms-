import { useState, useEffect } from "react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import { Label } from "@/app/components/ui/label";
import { Users, Building2, Minus, Plus, AlertCircle, Edit, Save, X } from "lucide-react";

interface TeamAllocationDisplayProps {
  questionnaireData: {
    exactEmployeeCount?: string;
    teamAllocation?: { [key: string]: number };
  };
}

interface Role {
  id: string;
  label: string;
}

interface RoleCategory {
  title: string;
  icon: typeof Building2;
  roles: Role[];
  color: string;
}

const roleCategories: RoleCategory[] = [
  {
    title: "Management & Admin",
    icon: Building2,
    color: "from-blue-500 to-cyan-500",
    roles: [
      { id: "management", label: "Management" },
      { id: "admin-head", label: "Admin Head" },
      { id: "admin-executive", label: "Admin Executive" },
    ]
  },
  {
    title: "Project & Process",
    icon: Users,
    color: "from-purple-500 to-indigo-500",
    roles: [
      { id: "process-head", label: "Process Head" },
      { id: "process-engineer", label: "Process Engineer" },
      { id: "project-head", label: "Project Head" },
      { id: "project-manager", label: "Project Manager" },
      { id: "project-engineer", label: "Project Engineer" },
    ]
  },
  {
    title: "Design",
    icon: Users,
    color: "from-pink-500 to-rose-500",
    roles: [
      { id: "design-head", label: "Design Head" },
      { id: "design-engineer", label: "Design Engineer" },
    ]
  },
  {
    title: "Development",
    icon: Users,
    color: "from-green-500 to-emerald-500",
    roles: [
      { id: "development-engineer", label: "Development Engineer" },
      { id: "developer", label: "Developer" },
      { id: "software-engineer", label: "Software Engineer" },
    ]
  },
  {
    title: "Testing & QA",
    icon: Users,
    color: "from-amber-500 to-orange-500",
    roles: [
      { id: "testing-head", label: "Testing Head" },
      { id: "testing-engineer", label: "Testing Engineer" },
    ]
  },
  {
    title: "IT",
    icon: Users,
    color: "from-teal-500 to-cyan-500",
    roles: [
      { id: "it-head", label: "IT Head" },
      { id: "it-engineer", label: "IT Engineer" },
    ]
  },
  {
    title: "HR",
    icon: Users,
    color: "from-violet-500 to-purple-500",
    roles: [
      { id: "hr-head", label: "HR Head" },
      { id: "hr-executive", label: "HR Executive" },
    ]
  },
  {
    title: "Training",
    icon: Users,
    color: "from-indigo-500 to-blue-500",
    roles: [
      { id: "training-head", label: "Training Head" },
      { id: "training-executive", label: "Training Executive" },
    ]
  },
  {
    title: "Purchase",
    icon: Users,
    color: "from-orange-500 to-red-500",
    roles: [
      { id: "purchase-head", label: "Purchase Head" },
      { id: "purchase-executive", label: "Purchase Executive" },
    ]
  },
];

export function TeamAllocationDisplay({ questionnaireData }: TeamAllocationDisplayProps) {
  const totalEmployees = parseInt(questionnaireData.exactEmployeeCount || "0") || 29;
  const [teamAllocation, setTeamAllocation] = useState<{ [key: string]: number }>(
    questionnaireData.teamAllocation || {}
  );
  const [isEditing, setIsEditing] = useState(false);
  const [allocatedSeats, setAllocatedSeats] = useState(0);

  // Calculate total allocated seats
  useEffect(() => {
    const total = Object.values(teamAllocation).reduce((sum, count) => sum + (count || 0), 0);
    setAllocatedSeats(total);
  }, [teamAllocation]);

  const unassignedSeats = totalEmployees - allocatedSeats;
  const allSeatsAssigned = totalEmployees > 0 && unassignedSeats === 0;

  const handleRoleChange = (roleId: string, value: number) => {
    setTeamAllocation(prev => ({
      ...prev,
      [roleId]: Math.max(0, value)
    }));
  };

  const incrementRole = (roleId: string) => {
    const current = teamAllocation[roleId] || 0;
    handleRoleChange(roleId, current + 1);
  };

  const decrementRole = (roleId: string) => {
    const current = teamAllocation[roleId] || 0;
    if (current > 0) {
      handleRoleChange(roleId, current - 1);
    }
  };

  const handleSave = () => {
    // Here you would save the changes to the backend/parent component
    setIsEditing(false);
    console.log("Saved team allocation:", teamAllocation);
  };

  const handleCancel = () => {
    // Reset to original data
    setTeamAllocation(questionnaireData.teamAllocation || {});
    setIsEditing(false);
  };

  return (
    <div className="space-y-5">
      {/* Header with Edit Button */}
      <div className="flex items-center justify-between">
        <div className="text-center flex-1">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full mb-2">
            <Users className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Allocate Your Team
          </h2>
          <p className="text-gray-600 text-sm">
            You selected an organization size of {totalEmployees}. Tell us how your team is structured to customize your compliance workflows.
          </p>
        </div>
        <div>
          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                className="bg-green-500 text-white hover:bg-green-600"
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-50"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Total and Unassigned Seats Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Employees: <span className="font-bold text-gray-900">{totalEmployees}</span></p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Unassigned Seats: <span className={`font-bold ${unassignedSeats > 0 ? 'text-orange-600' : 'text-green-600'}`}>{unassignedSeats}</span></p>
          </div>
        </div>
        
        {totalEmployees > 0 && unassignedSeats > 0 && (
          <div className="mt-2 flex items-start gap-2 bg-orange-50 border border-orange-200 rounded-lg p-3">
            <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-orange-700">
              Please allocate all {unassignedSeats} remaining seats to continue
            </p>
          </div>
        )}
        
        {allSeatsAssigned && (
          <div className="mt-2 flex items-start gap-2 bg-green-50 border border-green-200 rounded-lg p-3">
            <AlertCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-green-700">
              All seats have been allocated successfully!
            </p>
          </div>
        )}
      </div>

      {/* Role Categories */}
      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
        {roleCategories.map((category) => {
          const CategoryIcon = category.icon;
          return (
            <Card key={category.title} className="border border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`p-2 bg-gradient-to-r ${category.color} rounded-lg`}>
                    <CategoryIcon className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{category.title}</h3>
                </div>
                
                <div className="space-y-2">
                  {category.roles.map((role) => {
                    const roleCount = teamAllocation[role.id] || 0;
                    return (
                      <div key={role.id} className="flex items-center justify-between gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <Label htmlFor={role.id} className="flex-1 cursor-pointer text-sm font-medium text-gray-700">
                          {role.label}
                        </Label>
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => decrementRole(role.id)}
                            disabled={roleCount === 0 || !isEditing}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Input
                            id={role.id}
                            type="number"
                            min="0"
                            value={roleCount}
                            onChange={(e) => handleRoleChange(role.id, parseInt(e.target.value) || 0)}
                            disabled={!isEditing}
                            className="h-8 w-16 text-center"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => incrementRole(role.id)}
                            disabled={!isEditing}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Seats assigned summary */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">{allocatedSeats}</span> seats assigned • <span className="font-semibold">{unassignedSeats}</span> seats remaining
        </p>
      </div>
    </div>
  );
}
