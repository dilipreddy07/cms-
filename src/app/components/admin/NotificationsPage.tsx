import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { 
  ArrowLeft, 
  Bell, 
  Mail, 
  CheckCircle2,
  AlertTriangle,
  Info,
  Clock,
  Trash2,
  Archive,
  MoreVertical,
  Filter,
  Search,
  FileText,
  Shield,
  UserCheck,
  AlertCircle
} from "lucide-react";
import { Input } from "@/app/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

interface NotificationsPageProps {
  onBack: () => void;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  time: string;
  read: boolean;
  category: string;
}

export function NotificationsPage({ onBack }: NotificationsPageProps) {
  const [filterType, setFilterType] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Document Approval Pending",
      message: "Quality Management System Policy v3.2 requires your approval. Please review and approve.",
      type: "warning",
      time: "15 minutes ago",
      read: false,
      category: "Approval Request"
    },
    {
      id: "2",
      title: "New Permission Request",
      message: "Sarah Johnson requested access to Finance Department. Review the request and grant appropriate permissions.",
      type: "info",
      time: "1 hour ago",
      read: false,
      category: "Permission Request"
    },
    {
      id: "3",
      title: "Document Upload Required",
      message: "ISO 27001 Risk Assessment document is missing. Please upload the required documentation.",
      type: "error",
      time: "2 hours ago",
      read: false,
      category: "Document"
    },
    {
      id: "4",
      title: "Access Permission Granted",
      message: "Your request for access to the IT Compliance module has been approved.",
      type: "success",
      time: "3 hours ago",
      read: false,
      category: "Permission Request"
    },
    {
      id: "5",
      title: "Document Review Due Soon",
      message: "Data Privacy Policy document review is due in 2 days. Schedule a review session.",
      type: "warning",
      time: "4 hours ago",
      read: false,
      category: "Document"
    },
    {
      id: "6",
      title: "Approval Request Approved",
      message: "Your request to update the Security Framework has been approved by the administrator.",
      type: "success",
      time: "5 hours ago",
      read: true,
      category: "Approval Request"
    },
    {
      id: "7",
      title: "New Document Uploaded",
      message: "Michael Chen uploaded 'Incident Response Plan v2.0' to the Documents Repository.",
      type: "info",
      time: "6 hours ago",
      read: true,
      category: "Document"
    },
    {
      id: "8",
      title: "Permission Revoked",
      message: "Access to archived compliance records has been revoked due to department transfer.",
      type: "warning",
      time: "8 hours ago",
      read: true,
      category: "Permission Request"
    },
    {
      id: "9",
      title: "Document Approval Rejected",
      message: "Business Continuity Plan v1.5 was rejected. Please review comments and resubmit.",
      type: "error",
      time: "1 day ago",
      read: false,
      category: "Approval Request"
    },
    {
      id: "10",
      title: "Bulk Permission Update",
      message: "15 users have been granted access to the new Compliance Dashboard module.",
      type: "success",
      time: "1 day ago",
      read: true,
      category: "Permission Request"
    },
    {
      id: "11",
      title: "Document Expiring Soon",
      message: "Security Certificate will expire in 7 days. Please renew or upload updated documentation.",
      type: "warning",
      time: "2 days ago",
      read: false,
      category: "Document"
    },
    {
      id: "12",
      title: "Approval Workflow Created",
      message: "New approval workflow for SOC 2 compliance has been created and requires configuration.",
      type: "info",
      time: "2 days ago",
      read: true,
      category: "Approval Request"
    },
    {
      id: "13",
      title: "Document Access Logs",
      message: "Unusual access pattern detected for confidential documents. Review access logs immediately.",
      type: "error",
      time: "3 days ago",
      read: false,
      category: "Document"
    },
    {
      id: "14",
      title: "Permission Audit Completed",
      message: "Quarterly permission audit completed. 5 inactive permissions have been identified for review.",
      type: "info",
      time: "3 days ago",
      read: true,
      category: "Permission Request"
    },
    {
      id: "15",
      title: "Document Version Updated",
      message: "Employee Handbook v4.0 has been published and replaces the previous version.",
      type: "success",
      time: "4 days ago",
      read: true,
      category: "Document"
    }
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "success": return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "warning": return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "error": return <AlertCircle className="h-5 w-5 text-red-500" />;
      default: return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    if (category.includes("Document")) return <FileText className="h-4 w-4" />;
    if (category.includes("Permission")) return <Shield className="h-4 w-4" />;
    if (category.includes("Approval")) return <UserCheck className="h-4 w-4" />;
    return <Info className="h-4 w-4" />;
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    alert("All notifications marked as read");
  };

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    alert("Notification deleted");
  };

  const handleArchive = (id: string) => {
    alert(`Notification ${id} archived`);
  };

  const filteredNotifications = notifications.filter(notif => {
    const matchesSearch = notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notif.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || 
                         (filterType === "unread" && !notif.read) ||
                         (filterType === "read" && notif.read) ||
                         notif.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-xl shadow-lg p-6 text-white">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 text-white hover:bg-white/20"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Notifications</h2>
            <p className="text-white/90 mt-1">View and manage all your system notifications</p>
          </div>
          <Badge className="px-4 py-2 bg-white text-purple-600 hover:bg-purple-50">
            <Bell className="h-4 w-4 mr-2" />
            {unreadCount} Unread
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/80">Total</p>
                <div className="text-3xl font-bold mt-1">{notifications.length}</div>
              </div>
              <Bell className="h-8 w-8 text-white/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-red-500 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/80">Unread</p>
                <div className="text-3xl font-bold mt-1">{unreadCount}</div>
              </div>
              <Mail className="h-8 w-8 text-white/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/80">Read</p>
                <div className="text-3xl font-bold mt-1">{notifications.length - unreadCount}</div>
              </div>
              <CheckCircle2 className="h-8 w-8 text-white/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/80">This Week</p>
                <div className="text-3xl font-bold mt-1">{notifications.filter(n => n.time.includes("day") || n.time.includes("hour")).length}</div>
              </div>
              <Clock className="h-8 w-8 text-white/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>View and manage your notifications</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
              Mark All as Read
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Notifications</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-all ${
                    !notification.read ? "bg-blue-50 border-blue-200" : ""
                  }`}
                >
                  <div className="mt-1">{getTypeIcon(notification.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h4 className={`font-semibold text-sm ${!notification.read ? "text-gray-900" : "text-gray-700"}`}>
                          {notification.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">{notification.category}</Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {notification.time}
                          </span>
                          {!notification.read && (
                            <Badge className="text-xs bg-blue-500">New</Badge>
                          )}
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {!notification.read && (
                            <DropdownMenuItem onClick={() => handleMarkAsRead(notification.id)}>
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Mark as Read
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => handleArchive(notification.id)}>
                            <Archive className="mr-2 h-4 w-4" />
                            Archive
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(notification.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Bell className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No notifications found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}