CMS – QMS | Process Head → Definition → Standard → Procedures)

Design and implement a complete Procedure Management System with standardized departments, predefined procedure mapping, and document upload workflow.

1. Objective

Create a clean, structured Procedures module

Ensure:

Proper Department mapping

Standardized Procedure naming

Support for manual DOC upload

Future support for editable document forms

2. Update “Add New Procedure” Form
Fields Required:

Title (Procedure Name)

Description

Department (Dropdown – standardized list)

Version (default: 1.0)

Upload Document (DOC / PDF – optional for now, will upload later)

3. Standardize Department Dropdown

Replace existing dropdown values with ONLY the following:

Quality
Human Resources (HR)
Purchase
Administration
Product Development
Information Technology (IT)
Finance / Accounts
Operations
Sales & Marketing
Customer Support / Service
Rules:

Each procedure must be mapped to one department only

Do not allow custom or duplicate department names

4. Predefined Procedure List (MANDATORY SETUP)

Before uploading documents, create procedure entries using these exact names:

🏢 Quality

Procedure for Document Control

Procedure for Corrective Action

Procedure for Internal Audit

Procedure for Management Review (MR)

Procedure for Control of Non-Conformity

Procedure for Risk Management

🧑‍💼 Human Resources (HR)

Procedure for HR

🛒 Purchase

Procedure for Purchase

🏢 Administration

Procedure for Admin

💻 Product Development

Software Development - Project Management Procedure

Software Development - Software Requirements Procedure

Software Development - Software Designing Procedure

Software Development - Software Coding Procedure

Software Development - Software Testing Procedure

Software Development - Configuration Management Procedure

Remaining Departments (No Procedures Yet – Keep for Future)

Information Technology (IT)

Finance / Accounts

Operations

Sales & Marketing

Customer Support / Service

5. Table Structure (Procedures Page)

Display procedures in a structured table:

ID | Title | Department | Version | Status | Last Updated | Actions
6. Actions Column (Must Include)

Each procedure must support:

👁 View

View procedure details or document

⬆️ Upload

Upload/replace procedure document (DOC/PDF)

✏️ Edit

Edit:

Title

Department

Version

➕ Add Procedure Button
+ Add Procedure

Opens the form modal

Must NOT show duplicate “++”

7. Data Consistency Rules

Ensure:

Form fields = Table columns = Database fields

Maintain:

Unique Procedure ID

Proper department mapping

Clean naming consistency

8. Workflow (Important)
Step 1: Add Procedure Names (with departments)
Step 2: Save in database
Step 3: Later upload DOC manually
Step 4: Use documents as forms (future)
Step 5: Track status and updates
9. Validation Rules

Mandatory:

Title

Department

Do NOT allow:

Empty fields

Invalid department

Duplicate procedure names

10. UI Requirements

Clean modal UI (as shown)

Proper dropdown alignment

Smooth form interaction

Clean table layout

Status badges:

Draft

Review

Approved

11. Expected Outcome

Fully structured Procedure master setup

Clean Department-wise mapping

Ready for:

Document upload

Form conversion

Workflow tracking

✅ Final Result
Departments → Procedures (Mapped)
        ↓
Add Procedure
        ↓
Store Data
        ↓
Upload Documents (Later)
        ↓
Use as Forms
        ↓
Track & Validate