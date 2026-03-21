Update the Process Head → Definition → Standard (QMS) module with the following UI simplifications and functionality fixes.

✅ 1. Remove Unnecessary Dashboards

❌ Remove these top cards completely:

Total Procedures

Draft

Review

Approved

👉 After removal, the page should directly start with:

Procedures List
🧩 2. Procedures Section (Direct View)
✅ Table Structure
ID | Title | Description | Department | Version | Status | Last Updated | Actions
❌ Remove This Column:

Remove separate “Procedure (doc icons column)”

✅ Move All Document Actions to “Actions Column”
Actions Column (Final Structure)

Each row must include:

👁 View Document

⬆️ Upload Document

🔄 Re-upload Document

✏️ Edit Record

📝 Edit Document

⬇️ Download Document (PDF/DOC)

🗑 Delete Record

💡 Behavior Rules:

If no document:

Show → Upload Document

If document exists:

Show:

View

Download

Re-upload

Edit Document

🔧 3. Upload / Re-upload Behavior

Upload = first time file

Re-upload = replace existing file

Support:

DOC / DOCX

PDF

🧱 4. Clean UI Behavior

No duplicate icons

No confusion between columns

All actions centralized in one place

Clean row-based interaction

📄 5. Policies & Guidelines (FIX BUTTON ISSUE)
❗ Problem:

Buttons are not working

✅ Fix Required:
Buttons must work:

➕ Add Policy/Guideline

✏️ Edit

🗑 Delete

✅ Add Functionality:
➕ Add Button:

Opens modal form

Fields:

Title

Type (Policy / Guideline)

Description

Mapped Procedure

Version

Status

✅ Table Structure:
ID | Title | Type | Description | Mapped Procedure | Version | Status | Actions
✅ Actions Column:

✏️ Edit

🗑 Delete

⚠️ Validation:

Must select Mapped Procedure

Cannot create without mapping

🔁 6. Data Flow Fix
Procedure Created
   ↓
Upload Document
   ↓
Select Procedure
   ↓
Create Policies & Guidelines
   ↓
Save Data (Permanent)
💾 7. Persistence Fix

All data must:

Save in DB

Stay after refresh

Delete only on:

User action

🎯 8. Expected Final UI
Clean Layout:
Standard
   ↓
Procedures List (Direct View)
   ↓
Policies & Guidelines (Working Buttons)
✅ FINAL RESULT

❌ No top dashboards

✅ Clean procedure table

✅ All actions inside one column

✅ Upload / Re-upload working

✅ Policies & Guidelines buttons fixed

✅ Proper workflow