import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Plus, Calendar, User, AlertCircle } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  framework: string;
  requirement?: string;
  assignee: string;
  dueDate: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'To Do' | 'In Progress' | 'Under Review' | 'Completed';
  completed: boolean;
  tags: string[];
}

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Implement Multi-Factor Authentication',
    description: 'Deploy MFA for all administrative accounts as required by SOC 2',
    framework: 'SOC 2',
    requirement: 'CC6.1',
    assignee: 'Michael Chen',
    dueDate: '2026-01-20',
    priority: 'Critical',
    status: 'In Progress',
    completed: false,
    tags: ['Security', 'Access Control']
  },
  {
    id: '2',
    title: 'Update Data Processing Records',
    description: 'Review and update all data processing activity records for GDPR compliance',
    framework: 'GDPR',
    requirement: 'Art. 30',
    assignee: 'Sarah Johnson',
    dueDate: '2026-01-25',
    priority: 'High',
    status: 'To Do',
    completed: false,
    tags: ['Data Privacy', 'Documentation']
  },
  {
    id: '3',
    title: 'Conduct Vendor Security Assessment',
    description: 'Complete security questionnaire for new cloud storage vendor',
    framework: 'ISO 27001',
    requirement: 'A.15.1',
    assignee: 'David Wilson',
    dueDate: '2026-01-30',
    priority: 'High',
    status: 'In Progress',
    completed: false,
    tags: ['Vendor Management', 'Risk Assessment']
  },
  {
    id: '4',
    title: 'Enable Database Encryption',
    description: 'Enable encryption at rest for all production databases',
    framework: 'PCI DSS',
    requirement: '3.4',
    assignee: 'Lisa Anderson',
    dueDate: '2026-01-18',
    priority: 'Critical',
    status: 'Under Review',
    completed: false,
    tags: ['Data Security', 'Encryption']
  },
  {
    id: '5',
    title: 'Security Awareness Training',
    description: 'Deploy updated security awareness training to all employees',
    framework: 'ISO 27001',
    requirement: 'A.7.2.2',
    assignee: 'Sarah Johnson',
    dueDate: '2026-02-15',
    priority: 'Medium',
    status: 'In Progress',
    completed: false,
    tags: ['Training', 'Awareness']
  },
  {
    id: '6',
    title: 'Review Access Rights',
    description: 'Quarterly review of user access rights and permissions',
    framework: 'HIPAA',
    requirement: '164.308(a)(4)',
    assignee: 'Emma Davis',
    dueDate: '2026-01-22',
    priority: 'High',
    status: 'To Do',
    completed: false,
    tags: ['Access Control', 'Compliance Review']
  },
  {
    id: '7',
    title: 'Update Incident Response Plan',
    description: 'Review and update incident response procedures',
    framework: 'SOC 2',
    requirement: 'CC7.4',
    assignee: 'Michael Chen',
    dueDate: '2026-02-10',
    priority: 'Medium',
    status: 'To Do',
    completed: false,
    tags: ['Incident Management', 'Documentation']
  },
  {
    id: '8',
    title: 'Penetration Testing Report Review',
    description: 'Review findings from annual penetration test and create remediation plan',
    framework: 'PCI DSS',
    requirement: '11.3',
    assignee: 'David Wilson',
    dueDate: '2026-01-28',
    priority: 'Critical',
    status: 'In Progress',
    completed: false,
    tags: ['Security Testing', 'Remediation']
  },
  {
    id: '9',
    title: 'Backup Verification Test',
    description: 'Test restore procedures for critical systems',
    framework: 'ISO 27001',
    assignee: 'Lisa Anderson',
    dueDate: '2026-02-05',
    priority: 'Medium',
    status: 'To Do',
    completed: false,
    tags: ['Business Continuity', 'Testing']
  },
  {
    id: '10',
    title: 'Privacy Impact Assessment',
    description: 'Conduct PIA for new customer portal feature',
    framework: 'GDPR',
    requirement: 'Art. 35',
    assignee: 'Sarah Johnson',
    dueDate: '2026-02-20',
    priority: 'High',
    status: 'To Do',
    completed: false,
    tags: ['Privacy', 'Risk Assessment']
  }
];

export function TasksList() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [open, setOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'High':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Medium':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Low':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return '';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'In Progress':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Under Review':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'To Do':
        return 'bg-gray-50 text-gray-700 border-gray-200';
      default:
        return '';
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && !tasks.find(t => t.dueDate === dueDate)?.completed;
  };

  const toggleTaskComplete = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed, status: !task.completed ? 'Completed' : 'To Do' }
        : task
    ));
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    return matchesStatus && matchesPriority;
  });

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    overdue: tasks.filter(t => isOverdue(t.dueDate)).length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Compliance Tasks</h2>
          <p className="text-muted-foreground">
            Track and manage compliance-related tasks and action items
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription>
                Create a new compliance task
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Task Title</Label>
                <Input id="title" placeholder="Brief task description" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Detailed task description" rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="framework">Framework</Label>
                  <Select>
                    <SelectTrigger id="framework">
                      <SelectValue placeholder="Select framework" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gdpr">GDPR</SelectItem>
                      <SelectItem value="soc2">SOC 2</SelectItem>
                      <SelectItem value="hipaa">HIPAA</SelectItem>
                      <SelectItem value="iso27001">ISO 27001</SelectItem>
                      <SelectItem value="pcidss">PCI DSS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="requirement">Requirement ID (Optional)</Label>
                  <Input id="requirement" placeholder="e.g., Art. 32" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="assignee">Assignee</Label>
                  <Input id="assignee" placeholder="Person responsible" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input id="dueDate" type="date" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select>
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Add Task</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Task Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taskStats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{taskStats.completed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{taskStats.inProgress}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{taskStats.overdue}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="To Do">To Do</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Under Review">Under Review</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterPriority} onValueChange={setFilterPriority}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Priorities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="Critical">Critical</SelectItem>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <Card key={task.id} className={`hover:shadow-md transition-shadow ${task.completed ? 'opacity-60' : ''}`}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTaskComplete(task.id)}
                  className="mt-1"
                />
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-semibold ${task.completed ? 'line-through' : ''}`}>
                          {task.title}
                        </h3>
                        <Badge variant="outline" className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                        <Badge variant="outline" className={getStatusColor(task.status)}>
                          {task.status}
                        </Badge>
                        {isOverdue(task.dueDate) && (
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Overdue
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{task.framework}</Badge>
                      {task.requirement && (
                        <span className="text-muted-foreground font-mono">{task.requirement}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>{task.assignee}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {task.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
