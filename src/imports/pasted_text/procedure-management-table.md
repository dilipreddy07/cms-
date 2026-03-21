Process Head → Definition → Standard → Procedures with a complete table structure, dropdowns, and actions.

1. Table Structure (UI Design)

Display all procedures in the following table format:

ID | Title | Description | Procedure | Department | Version | Status | Actions
2. Column Details
1. ID

Auto-generated unique ID

Example: P001, P002

2. Title

Procedure Name

Must match predefined procedure list

3. Description

Short description of procedure

4. Procedure (Document Column)

This column handles document-related actions:

Include:

👁 View → Open document (DOC/PDF preview)

⬆️ Upload → Upload/replace document

🗑 Delete → Remove uploaded document

5. Department (Dropdown)

Provide dropdown with ONLY these values:

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

Mandatory field

Only one department per procedure

No custom entries allowed

6. Version

Default: 1.0

Editable

7. Status

Use badges:

Draft

Review

Approved

3. Actions Column (Important)

Each row must include:

✏️ Edit

Edit:

Title

Description

Department

Version

🗑 Delete

Delete entire procedure record

⬇️ Download PDF

Download procedure as PDF

⬇️ Download DOC

Download procedure as DOC (editable)

⚠️ Note:

Remove duplicate delete buttons (keep only one delete per row if needed)

4. Add Procedure Button

Top button:

+ Add Procedure

Opens modal form

Must NOT show ++ issue

5. Data Rules

Ensure consistency:

Form = Table = Database

Each procedure must have:

Title

Department

Document optional initially (can upload later)

6. Workflow
Add Procedure
   ↓
Store Data
   ↓
Upload Document (DOC/PDF)
   ↓
View / Edit
   ↓
Download
   ↓
Track Status
7. UI Requirements

Clean table UI

Proper spacing

Icons for actions

Dropdown aligned correctly

No duplicate buttons

Smooth interaction

8. Expected Result

Fully functional procedure management table

Clear separation:

Document actions (inside Procedure column)

Record actions (inside Actions column)

Clean UX and structured CMS flow

✅ Final Output

Table with:

Proper columns

Department dropdown

Document handling

Action buttons