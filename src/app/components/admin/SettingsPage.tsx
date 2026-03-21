import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Switch } from "@/app/components/ui/switch";
import { Badge } from "@/app/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { 
  ArrowLeft, 
  Settings as SettingsIcon, 
  Shield, 
  Lock, 
  Key,
  Database,
  Mail,
  Globe,
  Clock,
  HardDrive,
  Download,
  Upload,
  Trash2,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Moon,
  Sun,
  Palette,
  Languages,
  Bell,
  Users,
  MessageSquare
} from "lucide-react";
import { Textarea } from "@/app/components/ui/textarea";

interface SettingsPageProps {
  onBack: () => void;
}

export function SettingsPage({ onBack }: SettingsPageProps) {
  const [autoSave, setAutoSave] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("30");
  const [darkMode, setDarkMode] = useState(false);
  const [emailDigest, setEmailDigest] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [apiLogging, setApiLogging] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);

  // Notification preferences
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [complianceAlerts, setComplianceAlerts] = useState(true);
  const [systemUpdates, setSystemUpdates] = useState(true);
  const [userActivity, setUserActivity] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);

  const handleSaveGeneralSettings = () => {
    alert("General settings saved successfully!");
  };

  const handleSaveSecuritySettings = () => {
    alert("Security settings saved successfully!");
  };

  const handleBackupDatabase = () => {
    alert("Database backup initiated. This may take a few minutes...");
  };

  const handleRestoreDatabase = () => {
    if (confirm("Are you sure you want to restore the database? This will overwrite current data.")) {
      alert("Database restoration initiated...");
    }
  };

  const handleClearCache = () => {
    if (confirm("Are you sure you want to clear the cache?")) {
      alert("Cache cleared successfully!");
    }
  };

  const handleExportData = () => {
    alert("Data export initiated. Download will start shortly...");
  };

  const handleResetSettings = () => {
    if (confirm("Are you sure you want to reset all settings to default?")) {
      alert("Settings reset to default values!");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl shadow-lg p-6 text-white">
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
            <h2 className="text-3xl font-bold">System Settings</h2>
            <p className="text-white/90 mt-1">Configure system preferences and advanced options</p>
          </div>
          <Badge className="px-4 py-2 bg-white text-purple-600 hover:bg-purple-50">
            <SettingsIcon className="h-4 w-4 mr-2" />
            Configuration
          </Badge>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic system configuration and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="auto-save" className="font-medium">Auto Save</Label>
                    <p className="text-sm text-muted-foreground">Automatically save changes</p>
                  </div>
                  <Switch
                    id="auto-save"
                    checked={autoSave}
                    onCheckedChange={setAutoSave}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <Languages className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="pst">
                    <SelectTrigger>
                      <Clock className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                      <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                      <SelectItem value="cst">Central Time (CST)</SelectItem>
                      <SelectItem value="est">Eastern Time (EST)</SelectItem>
                      <SelectItem value="utc">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select defaultValue="mm-dd-yyyy">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="email-digest" className="font-medium">Email Digest</Label>
                    <p className="text-sm text-muted-foreground">Receive daily email summaries</p>
                  </div>
                  <Switch
                    id="email-digest"
                    checked={emailDigest}
                    onCheckedChange={setEmailDigest}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveGeneralSettings} className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure authentication and security policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg bg-yellow-50 border-yellow-200">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-yellow-600" />
                    <div>
                      <Label htmlFor="2fa" className="font-medium">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                  </div>
                  <Switch
                    id="2fa"
                    checked={twoFactorAuth}
                    onCheckedChange={setTwoFactorAuth}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input
                    id="session-timeout"
                    type="number"
                    value={sessionTimeout}
                    onChange={(e) => setSessionTimeout(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Users will be logged out after this period of inactivity</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password-policy">Password Policy</Label>
                  <Select defaultValue="strong">
                    <SelectTrigger>
                      <Lock className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic (8 characters minimum)</SelectItem>
                      <SelectItem value="moderate">Moderate (10 characters, mixed case)</SelectItem>
                      <SelectItem value="strong">Strong (12 characters, mixed case, numbers, symbols)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                  <Select defaultValue="90">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-login-attempts">Maximum Login Attempts</Label>
                  <Select defaultValue="5">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 attempts</SelectItem>
                      <SelectItem value="5">5 attempts</SelectItem>
                      <SelectItem value="10">10 attempts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>IP Whitelist</Label>
                  <Textarea
                    placeholder="Enter IP addresses, one per line&#10;e.g., 192.168.1.1&#10;10.0.0.0/24"
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">Only listed IPs will be allowed to access the system</p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveSecuritySettings} className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
                  <Save className="h-4 w-4 mr-2" />
                  Save Security Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of the system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Moon className="h-5 w-5 text-indigo-500" />
                    <div>
                      <Label htmlFor="dark-mode" className="font-medium">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">Enable dark theme</p>
                    </div>
                  </div>
                  <Switch
                    id="dark-mode"
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Primary Color</Label>
                  <div className="grid grid-cols-6 gap-3">
                    {["bg-blue-500", "bg-purple-500", "bg-pink-500", "bg-green-500", "bg-orange-500", "bg-red-500"].map((color) => (
                      <button
                        key={color}
                        className={`${color} h-12 rounded-lg border-2 hover:border-gray-900 transition-all`}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sidebar-position">Sidebar Position</Label>
                  <Select defaultValue="left">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="font-size">Font Size</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="compact-view">Density</Label>
                  <Select defaultValue="comfortable">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact">Compact</SelectItem>
                      <SelectItem value="comfortable">Comfortable</SelectItem>
                      <SelectItem value="spacious">Spacious</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <Palette className="h-4 w-4 mr-2" />
                  Apply Theme
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Integration Settings</CardTitle>
              <CardDescription>Configure third-party integrations and API access</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-blue-500" />
                      <div>
                        <h4 className="font-medium">Email Service (SMTP)</h4>
                        <p className="text-sm text-muted-foreground">Configure email delivery settings</p>
                      </div>
                    </div>
                    <Badge className="bg-green-500">Connected</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <Input placeholder="SMTP Server" defaultValue="smtp.gmail.com" />
                    <Input placeholder="Port" defaultValue="587" />
                    <Input placeholder="Username" defaultValue="notifications@company.com" />
                    <Input type="password" placeholder="Password" />
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Database className="h-5 w-5 text-purple-500" />
                      <div>
                        <h4 className="font-medium">Database Connection</h4>
                        <p className="text-sm text-muted-foreground">External database configuration</p>
                      </div>
                    </div>
                    <Badge className="bg-green-500">Active</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <Input placeholder="Host" defaultValue="db.company.com" />
                    <Input placeholder="Port" defaultValue="5432" />
                    <Input placeholder="Database Name" defaultValue="compliance_db" />
                    <Input type="password" placeholder="Credentials" />
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Key className="h-5 w-5 text-orange-500" />
                      <div>
                        <h4 className="font-medium">API Keys</h4>
                        <p className="text-sm text-muted-foreground">Manage API access tokens</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Generate New Key</Button>
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <code className="text-sm">sk_live_•••••••••••••1234</code>
                      <Button size="sm" variant="ghost">Revoke</Button>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <code className="text-sm">sk_test_•••••••••••••5678</code>
                      <Button size="sm" variant="ghost">Revoke</Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                  <Save className="h-4 w-4 mr-2" />
                  Save Integrations
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Settings */}
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>System maintenance and advanced configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg bg-red-50 border-red-200">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <div>
                      <Label htmlFor="maintenance" className="font-medium">Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">Disable user access for maintenance</p>
                    </div>
                  </div>
                  <Switch
                    id="maintenance"
                    checked={maintenanceMode}
                    onCheckedChange={setMaintenanceMode}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="debug" className="font-medium">Debug Mode</Label>
                    <p className="text-sm text-muted-foreground">Enable detailed error logging</p>
                  </div>
                  <Switch
                    id="debug"
                    checked={debugMode}
                    onCheckedChange={setDebugMode}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="api-logging" className="font-medium">API Logging</Label>
                    <p className="text-sm text-muted-foreground">Log all API requests and responses</p>
                  </div>
                  <Switch
                    id="api-logging"
                    checked={apiLogging}
                    onCheckedChange={setApiLogging}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <HardDrive className="h-5 w-5 text-green-500" />
                    <div>
                      <Label htmlFor="auto-backup" className="font-medium">Automatic Backups</Label>
                      <p className="text-sm text-muted-foreground">Daily automated database backups</p>
                    </div>
                  </div>
                  <Switch
                    id="auto-backup"
                    checked={autoBackup}
                    onCheckedChange={setAutoBackup}
                  />
                </div>
              </div>

              {/* Database Actions */}
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">Database Management</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" onClick={handleBackupDatabase}>
                    <Download className="h-4 w-4 mr-2" />
                    Backup Database
                  </Button>
                  <Button variant="outline" onClick={handleRestoreDatabase}>
                    <Upload className="h-4 w-4 mr-2" />
                    Restore Database
                  </Button>
                  <Button variant="outline" onClick={handleClearCache}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Clear Cache
                  </Button>
                  <Button variant="outline" onClick={handleExportData}>
                    <Download className="h-4 w-4 mr-2" />
                    Export All Data
                  </Button>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="border-t border-red-200 pt-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Danger Zone
                  </h3>
                  <p className="text-sm text-red-700 mb-4">
                    These actions are irreversible. Please proceed with caution.
                  </p>
                  <div className="flex gap-3">
                    <Button variant="destructive" onClick={handleResetSettings}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Reset All Settings
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Information */}
          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
              <CardDescription>Current system status and metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Version</p>
                  <p className="text-lg font-semibold">v2.4.1</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Database Size</p>
                  <p className="text-lg font-semibold">2.3 GB</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-lg font-semibold">248</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Uptime</p>
                  <p className="text-lg font-semibold">45 days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="email-notifications" className="font-medium">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="push-notifications" className="font-medium">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="sms-notifications" className="font-medium">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                  </div>
                  <Switch
                    id="sms-notifications"
                    checked={smsNotifications}
                    onCheckedChange={setSmsNotifications}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="compliance-alerts" className="font-medium">Compliance Alerts</Label>
                    <p className="text-sm text-muted-foreground">Receive alerts for compliance issues</p>
                  </div>
                  <Switch
                    id="compliance-alerts"
                    checked={complianceAlerts}
                    onCheckedChange={setComplianceAlerts}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="system-updates" className="font-medium">System Updates</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications for system updates</p>
                  </div>
                  <Switch
                    id="system-updates"
                    checked={systemUpdates}
                    onCheckedChange={setSystemUpdates}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="user-activity" className="font-medium">User Activity</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications for user activity</p>
                  </div>
                  <Switch
                    id="user-activity"
                    checked={userActivity}
                    onCheckedChange={setUserActivity}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="weekly-digest" className="font-medium">Weekly Digest</Label>
                    <p className="text-sm text-muted-foreground">Receive a weekly summary of activity</p>
                  </div>
                  <Switch
                    id="weekly-digest"
                    checked={weeklyDigest}
                    onCheckedChange={setWeeklyDigest}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                  <Save className="h-4 w-4 mr-2" />
                  Save Notifications Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}