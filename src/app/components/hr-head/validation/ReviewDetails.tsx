import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { ArrowLeft, CheckCircle, Clock, FileText, User, Calendar, MessageSquare } from "lucide-react";

interface ReviewDetailsProps {
  reviewId?: string;
}

const mockReview = {
  id: "HR-R001",
  name: "Employee Onboarding Policy",
  submittedBy: "Sarah Johnson",
  submittedDate: "2026-03-18",
  type: "Policy",
  status: "Pending" as const,
  description: "Comprehensive onboarding policy covering the first 90 days of employment, including orientation schedule, documentation requirements, and training milestones.",
  documents: [
    { name: "Onboarding_Policy_v2.pdf", size: "2.4 MB", date: "2026-03-18" },
    { name: "Checklist_Template.xlsx", size: "156 KB", date: "2026-03-17" },
  ],
  history: [
    { action: "Submitted for review", by: "Sarah Johnson", date: "2026-03-18 10:30 AM" },
    { action: "Draft updated", by: "Sarah Johnson", date: "2026-03-16 02:15 PM" },
    { action: "Initial draft created", by: "Sarah Johnson", date: "2026-03-14 09:00 AM" },
    { action: "Task assigned", by: "HR Head", date: "2026-03-12 11:00 AM" },
  ],
};

export default function ReviewDetails({ reviewId }: ReviewDetailsProps) {
  const review = mockReview;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" />Back to Reviews</Button>
      </div>
      <div>
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-900">{review.name}</h2>
          <Badge className="bg-amber-100 text-amber-700"><Clock className="h-3 w-3 mr-1" />{review.status}</Badge>
        </div>
        <p className="text-sm text-gray-500 mt-1">Review ID: {reviewId || review.id}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <Card className="shadow-sm">
            <CardHeader className="border-b bg-gray-50"><CardTitle className="text-base">Details</CardTitle></CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Description</p>
                <p className="text-sm mt-1">{review.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <div><p className="text-xs text-gray-500">Submitted By</p><p className="text-sm font-medium">{review.submittedBy}</p></div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div><p className="text-xs text-gray-500">Submitted Date</p><p className="text-sm font-medium">{review.submittedDate}</p></div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardHeader className="border-b bg-gray-50">
              <CardTitle className="text-base flex items-center gap-2"><FileText className="h-4 w-4" />Attached Documents</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-2">
                {review.documents.map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg"><FileText className="h-4 w-4 text-blue-600" /></div>
                      <div><p className="text-sm font-medium">{doc.name}</p><p className="text-xs text-gray-500">{doc.size} - {doc.date}</p></div>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="shadow-sm">
            <CardHeader className="border-b bg-gray-50">
              <CardTitle className="text-base flex items-center gap-2"><MessageSquare className="h-4 w-4" />Review History</CardTitle>
              <CardDescription className="text-xs">Activity timeline</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {review.history.map((entry, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-2.5 h-2.5 rounded-full ${idx === 0 ? "bg-blue-500" : "bg-gray-300"}`} />
                      {idx < review.history.length - 1 && <div className="w-0.5 h-full bg-gray-200 mt-1" />}
                    </div>
                    <div className="pb-4">
                      <p className="text-sm font-medium">{entry.action}</p>
                      <p className="text-xs text-gray-500">{entry.by} - {entry.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          {review.status === "Pending" && (
            <div className="mt-4 space-y-2">
              <Button className="w-full bg-green-600 hover:bg-green-700"><CheckCircle className="h-4 w-4 mr-2" />Approve</Button>
              <Button variant="destructive" className="w-full">Reject</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
