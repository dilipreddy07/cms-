Design and implement a Procedure Management System where uploaded DOC files act as editable procedure forms for users.

1. Procedure Master List (with Departments)

Use the following predefined procedures and map them to departments:

[QUALITY]
- Procedure for Document Control
- Procedure for Corrective Action
- Procedure for Internal Audit
- Procedure for Management Review (MR)
- Procedure for Control of Non-Conformity
- Procedure for Risk Management

[HR]
- Procedure for HR

[PURCHASE]
- Procedure for Purchase

[ADMIN]
- Procedure for Admin

[PRODUCT DEVELOPMENT]
- Software Development - Project Management Procedure
- Software Development - Software Requirements Procedure
- Software Development - Software Designing Procedure
- Software Development - Software Coding Procedure
- Software Development - Software Testing Procedure
- Software Development - Configuration Management Procedure
2. Core Concept

Procedures are:

Uploaded manually as DOC files

Editable by users

Used as working forms

Saved and tracked in the system

3. Upload Procedure (Process Head)

Provide “+ Add Procedure”:

Fields:

Procedure Name

Department (Dropdown)

Upload DOC File (mandatory)

Version

Status (Draft / Review / Approved)

4. Key Feature: Editable Document Flow
When user opens a procedure:

Load the DOC file in editable mode

Allow user to:

Edit content

Fill required details

Modify text/fields

5. Save & Update

After editing:

Save updated document

Store as:

New version OR

User-specific record

6. Download Options

Allow:

Download as DOC (editable)

Download as PDF (final)

Rule:

If Approved → Only PDF allowed

Else → DOC editable allowed

7. Database Structure
{
  "procedure_id": "P001",
  "name": "Procedure for Document Control",
  "department": "Quality",
  "file_url": "doc_path",
  "file_type": "doc",
  "version": "v1.0",
  "status": "Draft",
  "created_by": "Process Head",
  "created_at": "",
  "updated_at": ""
}
8. User Edited Data Storage
{
  "procedure_id": "P001",
  "user_id": "U101",
  "edited_file_url": "updated_doc_path",
  "status": "In Progress / Completed",
  "last_updated": ""
}
9. Workflow
Process Head uploads DOC Procedure
        ↓
User opens procedure
        ↓
User edits document (form-like)
        ↓
Save / Update
        ↓
Download / Submit
        ↓
Validation (Process Head)
10. UI Requirements
Table View:
ID | Procedure Name | Department | Version | Status | Actions
Actions:

👁 View (open editable doc)

✏️ Edit

⬇️ Download

11. Important Rules

Only DOC files are editable

PDF is read-only final format

Every procedure must be:

Linked to a department

Stored in database

12. Expected Outcome

Procedures become:

Editable documents

Usable forms

Trackable records