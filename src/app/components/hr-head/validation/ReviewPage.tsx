import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/app/components/ui/table";
import { CheckCircle, XCircle, Clock, Search, MessageSquare } from "lucide-react";

interface ReviewItem {
  id: string;
  name: string;
  submittedBy: string;
  date: string;
  type: string;
  status: "Pending" | "Approved" | "Rejected";
  notes: string;
}

const initialItems: ReviewItem[] = [
  { id: "HR-R001", name: "Employee Onboarding Policy", submittedBy: "Sarah Johnson", date: "2026-03-18", type: "Policy", status: "Pending", notes: "" },
  { id: "HR-R002", name: "Leave Management Procedure", submittedBy: "Mike Chen", date: "2026-03-17", type: "Procedure", status: "Pending", notes: "" },
  { id: "HR-R003", name: "Performance Review Template", submittedBy: "Lisa Park", date: "2026-03-15", type: "Template", status: "Approved", notes: "Meets all compliance requirements" },
  { id: "HR-R004", name: "Grievance Handling Process", submittedBy: "Tom Wilson", date: "2026-03-14", type: "Process", status: "Rejected", notes: "Missing escalation matrix" },
  { id: "HR-R005", name: "Training Needs Assessment", submittedBy: "Anna Davis", date: "2026-03-12", type: "Template", status: "Approved", notes: "Well structured" },
  { id: "HR-R006", name: "Exit Interview Checklist", submittedBy: "James Brown", date: "2026-03-10", type: "Checklist", status: "Pending", notes: "" },
];

const statusConfig = {
  Pending: { color: "bg-amber-100 text-amber-700", icon: Clock },
  Approved: { color: "bg-green-100 text-green-700", icon: CheckCircle },
  Rejected: { color: "bg-red-100 text-red-700", icon: XCircle },
};

export default function ReviewPage() {
  const [items, setItems] = useState<ReviewItem[]>(initialItems);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | "Pending" | "Approved" | "Rejected">("All");
  const [reviewNotes, setReviewNotes] = useState<Record<string, string>>({});

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.submittedBy.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || item.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleAction = (id: string, action: "Approved" | "Rejected") => {
    setItems((prev) => prev.map((item) => item.id === id ? { ...item, status: action, notes: reviewNotes[id] || item.notes } : item));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">HR Review</h2>
        <p className="text-sm text-gray-500 mt-1">Review and approve HR items</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Card className="shadow-sm border-l-4 border-l-amber-500"><CardContent className="pt-4"><p className="text-xs text-gray-500 uppercase">Pending</p><p className="text-2xl font-bold">{items.filter((i) => i.status === "Pending").length}</p></CardContent></Card>
        <Card className="shadow-sm border-l-4 border-l-green-500"><CardContent className="pt-4"><p className="text-xs text-gray-500 uppercase">Approved</p><p className="text-2xl font-bold">{items.filter((i) => i.status === "Approved").length}</p></CardContent></Card>
        <Card className="shadow-sm border-l-4 border-l-red-500"><CardContent className="pt-4"><p className="text-xs text-gray-500 uppercase">Rejected</p><p className="text-2xl font-bold">{items.filter((i) => i.status === "Rejected").length}</p></CardContent></Card>
      </div>
      <Card className="shadow-sm">
        <CardHeader className="border-b bg-gray-50"><CardTitle className="text-base">Review Items</CardTitle></CardHeader>
        <CardContent className="pt-4">
          <div className="flex gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search items..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
            <div className="flex gap-1">
              {(["All", "Pending", "Approved", "Rejected"] as const).map((f) => (
                <Button key={f} variant={filter === f ? "default" : "outline"} size="sm" onClick={() => setFilter(f)}>{f}</Button>
              ))}
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead><TableHead>Item Name</TableHead><TableHead>Submitted By</TableHead><TableHead>Date</TableHead><TableHead>Type</TableHead><TableHead>Status</TableHead><TableHead>Notes</TableHead><TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => {
                const StatusIcon = statusConfig[item.status].icon;
                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono text-xs">{item.id}</TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.submittedBy}</TableCell>
                    <TableCell className="text-sm">{item.date}</TableCell>
                    <TableCell><Badge variant="outline">{item.type}</Badge></TableCell>
                    <TableCell><Badge className={statusConfig[item.status].color}><StatusIcon className="h-3 w-3 mr-1" />{item.status}</Badge></TableCell>
                    <TableCell>
                      {item.status === "Pending" ? (
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3 text-gray-400" />
                          <Input placeholder="Add notes..." className="h-7 text-xs w-40" value={reviewNotes[item.id] || ""} onChange={(e) => setReviewNotes((prev) => ({ ...prev, [item.id]: e.target.value }))} />
                        </div>
                      ) : (<span className="text-xs text-gray-500">{item.notes || "—"}</span>)}
                    </TableCell>
                    <TableCell>
                      {item.status === "Pending" && (
                        <div className="flex gap-1">
                          <Button size="sm" className="h-7 bg-green-600 hover:bg-green-700 text-xs" onClick={() => handleAction(item.id, "Approved")}><CheckCircle className="h-3 w-3 mr-1" />Approve</Button>
                          <Button size="sm" variant="destructive" className="h-7 text-xs" onClick={() => handleAction(item.id, "Rejected")}><XCircle className="h-3 w-3 mr-1" />Reject</Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
