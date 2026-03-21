Process Head → Standard (QMS) → Procedures, where procedures are mapped to departments and used as documents + forms + workflow entities.

1. Procedure List with Department Mapping

Preload / allow upload of procedures with the following mapped departments:

Procedure for Document Control                → Quality
Procedure for Corrective Action               → Quality
Procedure for Internal Audit                  → Quality
Procedure for MR (Management Review)          → Quality
Procedure for Control of Non-Conformity       → Quality

Procedure for HR                              → HR
Procedure for Purchase                        → Purchase
Procedure for Admin                           → Admin

Procedure for Risk Management                 → Quality

Software Development - Project Management     → Product Development
Software Development - Requirements           → Product Development
Software Development - Designing              → Product Development
Software Development - Coding                 → Product Development
Software Development - Testing                → Product Development
Software Development - Configuration Mgmt     → Product Development
2. Core Objective

Procedures should:

Be uploaded as documents

Be mapped to departments

Act as fillable forms

Support view, edit, download, and workflow tracking

3. Procedure Upload (Process Head)

Provide “+ Add Procedure”:

Fields:

Procedure Name

Department (Dropdown – from above list)

Upload Document (DOC / PDF)

Version

Status (Draft / Review / Approved)

4. Database Schema
{
  "procedure_id": "P001",
  "name": "Procedure for Document Control",
  "department": "Quality",
  "standard_id": "QMS",
  "file_url": "path/to/document",
  "file_type": "doc",
  "version": "v1.0",
  "status": "Draft",
  "created_by": "Process Head",
  "created_at": "",
  "updated_at": ""
}
5. Procedure Table UI

Display:

ID | Procedure Name | Department | Version | Status | Assigned To | Last Updated | Actions
6. Actions
👁 View

Open document / form view

✏️ Edit

Edit:

Name

Department

Replace file

⬇️ Download

Draft → DOC allowed

Approved → Only PDF

7. Form-Based Usage (Important)

Each procedure acts as a form template

Users (HR Executive / IT Engineer) can:

Open procedure

Fill data

Save / Submit

8. Data Capture
{
  "procedure_id": "P001",
  "user_id": "U101",
  "department": "Quality",
  "form_data": {},
  "status": "In Progress",
  "last_updated": ""
}
9. Workflow
Process Head (Upload & Define)
        ↓
User (Fill Procedure Form)
        ↓
Data Saved
        ↓
Progress Tracking
        ↓
Validation (Process Head)
        ↓
Approved / Rejected
10. Department-Based Filtering

Allow filtering:

By Department

By Procedure

Example:

Filter: Quality → Show only Quality procedures
11. Validation Rules

Mandatory:

Procedure Name

Department

Document

Do not allow:

Empty mapping

Missing files

12. UI Requirements

Clean table layout

Proper button:

✅ + Add Procedure (no duplicate "+")

Status badges:

Draft (Gray)

Review (Yellow)

Approved (Green)

13. Integration with Standard (QMS)

Based on selected Standard (QMS):

Show only related procedures

Auto-populate all mapped data

14. Expected Outcome

Procedures are:

Structured

Department-mapped

Editable

Form-enabled

Trackable