# Migration Guide: Process Head Module Refactoring

## Overview

This guide explains how the Compliance Management System was migrated from separate phase-based dashboards to a unified Process Head module with centralized data management.

## Migration Steps Completed

### Step 1: Create Centralized Data Context ✅

**File Created:** `/src/app/context/ProjectDataContext.tsx`

**What it does:**
- Manages all project data across all phases
- Provides CRUD operations for 13 data types
- Ensures type safety with TypeScript interfaces
- Enables real-time data synchronization

**Key Features:**
```typescript
// All data types in one place
export interface ComplianceRequirement { ... }
export interface Task { ... }
export interface ProjectReview { ... }
// ... 10 more types

// Single provider wraps entire app
export function ProjectDataProvider({ children }) {
  // Centralized state
  const [complianceRequirements, setComplianceRequirements] = useState([]);
  const [tasks, setTasks] = useState([]);
  // ... all other states
  
  // CRUD operations
  const addComplianceRequirement = ...
  const updateTask = ...
  // ... all operations
}

// Easy to use in any component
export function useProjectData() {
  return useContext(ProjectDataContext);
}
```

### Step 2: Create Unified Dashboard ✅

**File Created:** `/src/app/components/ProcessHeadDashboard.tsx`

**What it replaced:**
- Old: `ProcessManagerDashboard.tsx` with `process` prop
- New: `ProcessHeadDashboard.tsx` with internal phase management

**Key Improvements:**
1. **Phase Switcher:** Visual cards to change phases
2. **Dynamic Menu:** Changes based on selected phase
3. **Unified Dashboard:** Shows stats from all phases
4. **Data Context:** Uses centralized data provider

**Code Example:**
```typescript
function ProcessHeadDashboardContent({ department, systemConfig }) {
  const [currentPhase, setCurrentPhase] = useState<PhaseType>("definition");
  const projectData = useProjectData(); // Access shared data
  
  // Phase switcher cards
  const handlePhaseChange = (phase: PhaseType) => {
    setCurrentPhase(phase);
    setCurrentPage("dashboard");
  };
  
  // Dynamic menu based on phase
  const getCurrentMenuItems = () => {
    switch (currentPhase) {
      case "definition": return definitionMenuItems;
      case "implementation": return implementationMenuItems;
      case "validation": return validationMenuItems;
    }
  };
}
```

### Step 3: Wrap with Provider ✅

**File Modified:** `/src/app/components/ProcessHeadDashboard.tsx`

**Implementation:**
```typescript
// Main export wraps content with provider
export function ProcessHeadDashboard(props: ProcessHeadDashboardProps) {
  return (
    <ProjectDataProvider>
      <ProcessHeadDashboardContent {...props} />
    </ProjectDataProvider>
  );
}

// Content component uses the context
function ProcessHeadDashboardContent({ department, systemConfig }) {
  const projectData = useProjectData();
  // Now has access to all shared data
}
```

### Step 4: Update App Integration ✅

**File Modified:** `/src/app/App.tsx`

**Changes Made:**

**Before:**
```typescript
import { ProcessManagerDashboard } from "@/app/components/ProcessManagerDashboard";

// In render function
case "process-head":
  return <ProcessManagerDashboard 
    department={department} 
    process={selectedProcess!} 
    systemConfig={systemConfig} 
  />;
```

**After:**
```typescript
import { ProcessHeadDashboard } from "@/app/components/ProcessHeadDashboard";

// In render function
case "process-head":
  return <ProcessHeadDashboard 
    department={department} 
    systemConfig={systemConfig} 
  />;
  // Note: No more 'process' prop - managed internally
```

### Step 5: Test All Functionality ✅

**Testing Checklist:**
- [x] Phase switching works smoothly
- [x] All menu items navigate correctly
- [x] Data persists when switching phases
- [x] CRUD operations work in all views
- [x] Charts and visualizations render
- [x] Profile/logout dropdown functions
- [x] All existing features intact
- [x] No console errors
- [x] UI remains responsive

## Architecture Comparison

### Old Architecture

```
App.tsx
  └─> ProcessManagerDashboard (process="definition")
        ├─> Definition Phase Components (local state)
        └─> Phase-specific menu

App.tsx
  └─> ProcessManagerDashboard (process="implementation")
        ├─> Implementation Phase Components (local state)
        └─> Phase-specific menu

App.tsx
  └─> ProcessManagerDashboard (process="validation")
        ├─> Validation Phase Components (local state)
        └─> Phase-specific menu

❌ Problems:
- Separate states per phase
- No data sharing
- Requires logout/login to switch phases
- Code duplication
```

### New Architecture

```
App.tsx
  └─> ProcessHeadDashboard
        └─> ProjectDataProvider (shared state)
              ├─> ProcessHeadDashboardContent
              │     ├─> Phase Switcher (UI)
              │     ├─> Dynamic Menu (changes with phase)
              │     └─> Unified Dashboard
              │
              ├─> Definition Phase Components ─┐
              ├─> Implementation Components ───┼─> All use useProjectData()
              └─> Validation Components ───────┘

✅ Benefits:
- Single shared state
- Real-time data sync
- Instant phase switching
- No code duplication
```

## Data Flow Example

### Example: Creating a Compliance Requirement

#### Step 1: User Action
```typescript
// In ComplianceRequirementsView.tsx
function ComplianceRequirementsView() {
  const { addComplianceRequirement } = useProjectData();
  
  const handleCreate = (formData) => {
    const newRequirement = {
      id: generateId(),
      standard: formData.standard,
      clause: formData.clause,
      title: formData.title,
      // ... other fields
    };
    
    addComplianceRequirement(newRequirement);
    // ✅ Data immediately available in context
  };
}
```

#### Step 2: Context Updates
```typescript
// In ProjectDataContext.tsx
const addComplianceRequirement = (requirement: ComplianceRequirement) => {
  setComplianceRequirements(prev => [...prev, requirement]);
  // ✅ All components re-render with new data
};
```

#### Step 3: Data Available Everywhere
```typescript
// In any component
function AnyComponent() {
  const { complianceRequirements } = useProjectData();
  
  // ✅ Can see the new requirement immediately
  return (
    <div>
      {complianceRequirements.map(req => (
        <RequirementCard key={req.id} requirement={req} />
      ))}
    </div>
  );
}
```

## Migration Benefits

### 1. Data Consistency

**Before:**
```typescript
// Definition Phase
const [requirements, setRequirements] = useState([...]);

// Implementation Phase
// ❌ Can't access requirements from Definition Phase
// ❌ Need to pass via props or create duplicates
```

**After:**
```typescript
// Any Phase
const { complianceRequirements } = useProjectData();
// ✅ Same data everywhere
// ✅ Always synchronized
```

### 2. User Experience

**Before:**
- User in Definition Phase wants to check Implementation
- Must: Logout → ProcessSelection → Select Implementation → Login
- Time: ~30 seconds, multiple clicks

**After:**
- User clicks Implementation phase card
- Time: Instant, 1 click
- No data loss, no state reset

### 3. Development

**Before:**
```typescript
// Need to update in 3 places
// 1. Definition phase component
// 2. Implementation phase component  
// 3. Validation phase component
```

**After:**
```typescript
// Update once in context
// All phases automatically updated
```

## Code Snippets for Common Tasks

### Adding a New Data Type

```typescript
// 1. Define interface in ProjectDataContext.tsx
export interface NewDataType {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive";
}

// 2. Add state
const [newDataItems, setNewDataItems] = useState<NewDataType[]>([]);

// 3. Create operations
const newDataOps = createUpdateFunction(setNewDataItems);

// 4. Add to context interface
interface ProjectDataContextType {
  // ... existing
  newDataItems: NewDataType[];
  addNewDataItem: (item: NewDataType) => void;
  updateNewDataItem: (id: string, updates: Partial<NewDataType>) => void;
  deleteNewDataItem: (id: string) => void;
}

// 5. Add to context value
const value: ProjectDataContextType = {
  // ... existing
  newDataItems,
  addNewDataItem: newDataOps.add,
  updateNewDataItem: newDataOps.update,
  deleteNewDataItem: newDataOps.delete,
};
```

### Using Context in a Component

```typescript
import { useProjectData } from "@/app/context/ProjectDataContext";

export function MyComponent() {
  // Get data and operations from context
  const {
    complianceRequirements,
    addComplianceRequirement,
    updateComplianceRequirement,
    deleteComplianceRequirement,
  } = useProjectData();
  
  // Use in component
  const handleAdd = (newReq) => {
    addComplianceRequirement(newReq);
  };
  
  const handleUpdate = (id, updates) => {
    updateComplianceRequirement(id, updates);
  };
  
  const handleDelete = (id) => {
    deleteComplianceRequirement(id);
  };
  
  return (
    <div>
      {complianceRequirements.map(req => (
        <RequirementCard
          key={req.id}
          requirement={req}
          onUpdate={(updates) => handleUpdate(req.id, updates)}
          onDelete={() => handleDelete(req.id)}
        />
      ))}
    </div>
  );
}
```

### Adding a New Phase View

```typescript
// 1. Create component file
// /src/app/components/new-phase/NewFeatureView.tsx
export function NewFeatureView() {
  const { /* data from context */ } = useProjectData();
  
  return (
    <div>
      {/* Your component UI */}
    </div>
  );
}

// 2. Import in ProcessHeadDashboard.tsx
import { NewFeatureView } from "@/app/components/new-phase/NewFeatureView";

// 3. Add to menu items array
const definitionMenuItems = [
  // ... existing items
  { id: "new-feature" as ProcessPage, label: "New Feature", icon: YourIcon },
];

// 4. Add to renderContent() function
const renderContent = () => {
  // ... existing cases
  if (currentPage === "new-feature") return <NewFeatureView />;
};

// 5. Update ProcessPage type
type ProcessPage = 
  | "dashboard" 
  | "new-feature"  // Add this
  | /* ... other pages */;
```

## Rollback Plan (If Needed)

If you need to rollback to the old architecture:

### Option 1: Keep Both (Recommended)

The old `ProcessManagerDashboard.tsx` still exists and can be re-enabled:

```typescript
// In App.tsx, change back to:
import { ProcessManagerDashboard } from "@/app/components/ProcessManagerDashboard";

case "process-head":
  return <ProcessManagerDashboard 
    department={department} 
    process={selectedProcess!} 
    systemConfig={systemConfig} 
  />;
```

### Option 2: Version Control

```bash
# Revert to commit before refactoring
git log --oneline  # Find commit hash
git revert <commit-hash>
```

## Future Enhancements

### 1. Backend Integration

```typescript
// In ProjectDataContext.tsx
const addComplianceRequirement = async (requirement: ComplianceRequirement) => {
  // Save to backend
  const response = await fetch('/api/requirements', {
    method: 'POST',
    body: JSON.stringify(requirement),
  });
  
  if (response.ok) {
    // Update local state
    setComplianceRequirements(prev => [...prev, requirement]);
  }
};
```

### 2. Real-time Sync

```typescript
// Subscribe to real-time updates
useEffect(() => {
  const socket = new WebSocket('ws://api.example.com/sync');
  
  socket.onmessage = (event) => {
    const update = JSON.parse(event.data);
    // Update context based on server changes
  };
  
  return () => socket.close();
}, []);
```

### 3. Audit Trail

```typescript
// Track all changes
const addComplianceRequirement = (requirement: ComplianceRequirement) => {
  setComplianceRequirements(prev => [...prev, requirement]);
  
  // Log the change
  logAuditTrail({
    action: 'CREATE',
    entity: 'ComplianceRequirement',
    entityId: requirement.id,
    timestamp: new Date(),
    user: currentUser,
  });
};
```

## FAQs

### Q: Can I still use the old ProcessManagerDashboard?
**A:** Yes, the file still exists. You can switch back in App.tsx if needed.

### Q: How do I add sample data for testing?
**A:** Add initial state in ProjectDataContext.tsx:
```typescript
const [tasks, setTasks] = useState<Task[]>([
  { id: "1", title: "Test Task", ... },
  // Add more sample data
]);
```

### Q: Will data persist on page refresh?
**A:** Currently no. Add localStorage or backend integration for persistence.

### Q: Can I access data from one phase in another?
**A:** Yes! That's the main benefit. All phases share the same data via context.

### Q: How do I debug context issues?
**A:** Add console.log in the provider or use React DevTools to inspect context values.

## Support

For questions or issues:
1. Check this migration guide
2. Review `/PROCESS_HEAD_MODULE_README.md`
3. Review `/REFACTORING_SUMMARY.md`
4. Inspect code in `/src/app/context/ProjectDataContext.tsx`
5. Examine `/src/app/components/ProcessHeadDashboard.tsx`

---

**Migration Completed:** March 13, 2026  
**Architecture Version:** 2.0  
**Status:** Production Ready ✅
