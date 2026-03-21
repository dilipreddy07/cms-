import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import * as procedures from "./procedures.tsx";
import * as policiesGuidelines from "./policies-guidelines.tsx";
import * as templates from "./templates.tsx";
import * as checklists from "./checklists.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Initialize storage buckets on startup
try {
  await procedures.initializeBucket();
  await templates.initializeBucket();
  await checklists.initializeBucket();
  console.log("All storage buckets initialized successfully");
} catch (error) {
  console.error("Failed to initialize storage buckets:", error);
}

// Health check endpoint
app.get("/make-server-8ab67d1d/health", (c) => {
  return c.json({ status: "ok" });
});

// ========== PROCEDURE ROUTES ==========

// Get all procedures
app.get("/make-server-8ab67d1d/procedures", async (c) => {
  try {
    const procedures_list = await procedures.getAllProcedures();
    return c.json({ success: true, data: procedures_list });
  } catch (error) {
    console.error("Error fetching procedures:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get procedures by standard
app.get("/make-server-8ab67d1d/procedures/standard/:standardId", async (c) => {
  try {
    const standardId = c.req.param("standardId");
    const procedures_list = await procedures.getProceduresByStandard(standardId);
    return c.json({ success: true, data: procedures_list });
  } catch (error) {
    console.error("Error fetching procedures by standard:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get single procedure
app.get("/make-server-8ab67d1d/procedures/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const procedure = await procedures.getProcedure(id);
    
    if (!procedure) {
      return c.json({ success: false, error: "Procedure not found" }, 404);
    }
    
    return c.json({ success: true, data: procedure });
  } catch (error) {
    console.error("Error fetching procedure:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Create procedure with file upload
app.post("/make-server-8ab67d1d/procedures", async (c) => {
  try {
    const formData = await c.req.formData();
    
    const name = formData.get("name") as string;
    const department = formData.get("department") as string;
    const standard_id = formData.get("standard_id") as string;
    const version = formData.get("version") as string;
    const status = formData.get("status") as "Draft" | "Review" | "Approved";
    const description = formData.get("description") as string;
    const created_by = formData.get("created_by") as string || "Process Head";
    const file = formData.get("file") as File | null;
    
    if (!name || !department || !standard_id) {
      return c.json({ 
        success: false, 
        error: "Missing required fields: name, department, standard_id" 
      }, 400);
    }
    
    // Generate new procedure ID
    const procedure_id = await procedures.generateProcedureId();
    
    let file_url = null;
    let file_type = null;
    
    // Upload file if provided
    if (file) {
      const fileName = file.name.toLowerCase();
      const fileType = fileName.endsWith('.pdf') ? 'pdf' : 'doc';
      file_url = await procedures.uploadFile(procedure_id, file, fileType);
      file_type = fileType;
    }
    
    const now = new Date().toISOString().split('T')[0];
    
    const newProcedure = {
      procedure_id,
      name,
      department,
      standard_id,
      file_url,
      file_type,
      version: version || "v1.0",
      status: status || "Draft",
      created_by,
      created_at: now,
      updated_at: now,
      description: description || ""
    };
    
    const created = await procedures.createProcedure(newProcedure);
    console.log("Procedure created successfully:", procedure_id);
    
    return c.json({ success: true, data: created }, 201);
  } catch (error) {
    console.error("Error creating procedure:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Update procedure
app.put("/make-server-8ab67d1d/procedures/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const formData = await c.req.formData();
    
    const updates: any = {};
    
    // Extract all possible fields from form data
    const name = formData.get("name") as string;
    const department = formData.get("department") as string;
    const version = formData.get("version") as string;
    const status = formData.get("status") as string;
    const description = formData.get("description") as string;
    const file = formData.get("file") as File | null;
    
    if (name) updates.name = name;
    if (department) updates.department = department;
    if (version) updates.version = version;
    if (status) updates.status = status;
    if (description !== null) updates.description = description;
    
    // Upload new file if provided
    if (file) {
      const fileName = file.name.toLowerCase();
      const fileType = fileName.endsWith('.pdf') ? 'pdf' : 'doc';
      updates.file_url = await procedures.uploadFile(id, file, fileType);
      updates.file_type = fileType;
    }
    
    const updated = await procedures.updateProcedure(id, updates);
    console.log("Procedure updated successfully:", id);
    
    return c.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating procedure:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Delete procedure permanently
app.delete("/make-server-8ab67d1d/procedures/:id", async (c) => {
  try {
    const id = c.req.param("id");
    
    await procedures.deleteProcedure(id);
    console.log("Procedure deleted permanently:", id);
    
    return c.json({ success: true, message: "Procedure permanently deleted" });
  } catch (error) {
    console.error("Error deleting procedure:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get signed URL for file download
app.get("/make-server-8ab67d1d/procedures/:id/download", async (c) => {
  try {
    const id = c.req.param("id");
    const format = c.req.query("format") || "doc";
    
    const procedure = await procedures.getProcedure(id);
    if (!procedure) {
      return c.json({ success: false, error: "Procedure not found" }, 404);
    }
    
    if (!procedure.file_url) {
      return c.json({ success: false, error: "No file available for download" }, 404);
    }
    
    // Check download rules: Approved procedures can only be downloaded as PDF
    if (procedure.status === "Approved" && format === "doc") {
      return c.json({ 
        success: false, 
        error: "Approved procedures can only be downloaded as PDF" 
      }, 403);
    }
    
    const signedUrl = await procedures.getSignedUrl(procedure.file_url);
    
    return c.json({ 
      success: true, 
      data: { 
        url: signedUrl,
        filename: `${procedure.name}_${procedure.version}.${format}`,
        format
      } 
    });
  } catch (error) {
    console.error("Error getting download URL:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ========== POLICIES & GUIDELINES ROUTES ==========

// Get all policies/guidelines
app.get("/make-server-8ab67d1d/policies-guidelines", async (c) => {
  try {
    const items = await policiesGuidelines.getAllPoliciesGuidelines();
    return c.json({ success: true, data: items });
  } catch (error) {
    console.error("Error fetching policies/guidelines:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get policies/guidelines by standard
app.get("/make-server-8ab67d1d/policies-guidelines/standard/:standardId", async (c) => {
  try {
    const standardId = c.req.param("standardId");
    const items = await policiesGuidelines.getPoliciesGuidelinesByStandard(standardId);
    return c.json({ success: true, data: items });
  } catch (error) {
    console.error("Error fetching policies/guidelines by standard:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Create policy/guideline
app.post("/make-server-8ab67d1d/policies-guidelines", async (c) => {
  try {
    const body = await c.req.json();
    
    if (!body.title || !body.type || !body.mapped_procedure || !body.standard_id) {
      return c.json({ 
        success: false, 
        error: "Missing required fields" 
      }, 400);
    }
    
    // Generate new ID
    const id = await policiesGuidelines.getNextId(body.type);
    
    const newItem = {
      id,
      title: body.title,
      type: body.type,
      description: body.description || "",
      mapped_procedure: body.mapped_procedure,
      standard_id: body.standard_id,
      version: body.version || "v1.0",
      status: body.status || "Draft",
      created_at: new Date().toISOString().split('T')[0],
      updated_at: new Date().toISOString().split('T')[0]
    };
    
    const created = await policiesGuidelines.createPolicyGuideline(newItem);
    return c.json({ success: true, data: created }, 201);
  } catch (error) {
    console.error("Error creating policy/guideline:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Update policy/guideline
app.put("/make-server-8ab67d1d/policies-guidelines/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    
    const updated = await policiesGuidelines.updatePolicyGuideline(id, body);
    return c.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating policy/guideline:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Delete policy/guideline
app.delete("/make-server-8ab67d1d/policies-guidelines/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await policiesGuidelines.deletePolicyGuideline(id, true); // Hard delete
    return c.json({ success: true, message: "Policy/Guideline deleted" });
  } catch (error) {
    console.error("Error deleting policy/guideline:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ========== TEMPLATES ROUTES ==========

// Get templates by standard
app.get("/make-server-8ab67d1d/templates/standard/:standardId", async (c) => {
  try {
    const standardId = c.req.param("standardId");
    const items = await templates.getTemplatesByStandard(standardId);
    return c.json({ success: true, data: items });
  } catch (error) {
    console.error("Error fetching templates by standard:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Create template
app.post("/make-server-8ab67d1d/templates", async (c) => {
  try {
    const formData = await c.req.formData();
    
    const title = formData.get("title") as string;
    const department = formData.get("department") as string;
    const standard_id = formData.get("standard_id") as string;
    const mapped_procedure = formData.get("mapped_procedure") as string;
    const version = formData.get("version") as string;
    const file = formData.get("file") as File | null;
    
    if (!title || !department || !standard_id) {
      return c.json({ 
        success: false, 
        error: "Missing required fields: title, department, standard_id" 
      }, 400);
    }
    
    // Generate new template ID
    const id = await templates.getNextTemplateId();
    
    let file_url = null;
    let file_type = null;
    let file_path = null;
    
    // Upload file if provided
    if (file) {
      const uploadResult = await templates.uploadTemplateFile(id, file, file.name);
      file_url = uploadResult.file_url;
      file_type = uploadResult.file_type;
      file_path = uploadResult.file_path;
    }
    
    const newTemplate = {
      id,
      title,
      department,
      mapped_procedure: mapped_procedure || undefined,
      standard_id,
      file_url,
      file_type,
      file_path,
      version: version || "v1.0",
      created_at: new Date().toISOString().split('T')[0],
      updated_at: new Date().toISOString().split('T')[0]
    };
    
    const created = await templates.createTemplate(newTemplate);
    return c.json({ success: true, data: created }, 201);
  } catch (error) {
    console.error("Error creating template:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Update template
app.put("/make-server-8ab67d1d/templates/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const formData = await c.req.formData();
    
    const updates: any = {};
    
    const title = formData.get("title") as string;
    const department = formData.get("department") as string;
    const mapped_procedure = formData.get("mapped_procedure") as string;
    const version = formData.get("version") as string;
    const file = formData.get("file") as File | null;
    
    if (title) updates.title = title;
    if (department) updates.department = department;
    if (mapped_procedure !== null) updates.mapped_procedure = mapped_procedure;
    if (version) updates.version = version;
    
    // Upload new file if provided
    if (file) {
      const uploadResult = await templates.uploadTemplateFile(id, file, file.name);
      updates.file_url = uploadResult.file_url;
      updates.file_type = uploadResult.file_type;
      updates.file_path = uploadResult.file_path;
    }
    
    const updated = await templates.updateTemplate(id, updates);
    return c.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating template:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Delete template
app.delete("/make-server-8ab67d1d/templates/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await templates.deleteTemplate(id, true); // Hard delete
    return c.json({ success: true, message: "Template deleted" });
  } catch (error) {
    console.error("Error deleting template:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Download template
app.get("/make-server-8ab67d1d/templates/:id/download", async (c) => {
  try {
    const id = c.req.param("id");
    const template = await templates.getTemplate(id);
    
    if (!template || !template.file_path) {
      return c.json({ success: false, error: "Template file not found" }, 404);
    }
    
    const signedUrl = await templates.getTemplateFileSignedUrl(template.file_path);
    
    return c.json({ 
      success: true, 
      data: { 
        url: signedUrl,
        filename: `${template.title}_${template.version}.${template.file_type || 'doc'}`
      } 
    });
  } catch (error) {
    console.error("Error downloading template:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ========== CHECKLISTS ROUTES ==========

// Get checklists by standard
app.get("/make-server-8ab67d1d/checklists/standard/:standardId", async (c) => {
  try {
    const standardId = c.req.param("standardId");
    const items = await checklists.getChecklistsByStandard(standardId);
    return c.json({ success: true, data: items });
  } catch (error) {
    console.error("Error fetching checklists by standard:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Create checklist
app.post("/make-server-8ab67d1d/checklists", async (c) => {
  try {
    const formData = await c.req.formData();
    
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const mapped_procedure = formData.get("mapped_procedure") as string;
    const standard_id = formData.get("standard_id") as string;
    const version = formData.get("version") as string;
    const status = formData.get("status") as "Draft" | "Review" | "Approved";
    const file = formData.get("file") as File | null;
    
    if (!name || !mapped_procedure || !standard_id) {
      return c.json({ 
        success: false, 
        error: "Missing required fields: name, mapped_procedure, standard_id" 
      }, 400);
    }
    
    // Generate new checklist ID
    const checklist_id = await checklists.getNextChecklistId();
    
    let file_url = null;
    let file_type = null;
    let file_path = null;
    
    // Upload file if provided
    if (file) {
      const uploadResult = await checklists.uploadChecklistFile(checklist_id, file, file.name);
      file_url = uploadResult.file_url;
      file_type = uploadResult.file_type;
      file_path = uploadResult.file_path;
    }
    
    const newChecklist = {
      checklist_id,
      name,
      description: description || "",
      mapped_procedure,
      standard_id,
      file_url,
      file_type,
      file_path,
      version: version || "v1.0",
      status: status || "Draft",
      created_at: new Date().toISOString().split('T')[0],
      updated_at: new Date().toISOString().split('T')[0]
    };
    
    const created = await checklists.createChecklist(newChecklist);
    return c.json({ success: true, data: created }, 201);
  } catch (error) {
    console.error("Error creating checklist:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Update checklist
app.put("/make-server-8ab67d1d/checklists/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const formData = await c.req.formData();
    
    const updates: any = {};
    
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const mapped_procedure = formData.get("mapped_procedure") as string;
    const version = formData.get("version") as string;
    const status = formData.get("status") as string;
    const file = formData.get("file") as File | null;
    
    if (name) updates.name = name;
    if (description !== null) updates.description = description;
    if (mapped_procedure) updates.mapped_procedure = mapped_procedure;
    if (version) updates.version = version;
    if (status) updates.status = status;
    
    // Upload new file if provided
    if (file) {
      const uploadResult = await checklists.uploadChecklistFile(id, file, file.name);
      updates.file_url = uploadResult.file_url;
      updates.file_type = uploadResult.file_type;
      updates.file_path = uploadResult.file_path;
    }
    
    const updated = await checklists.updateChecklist(id, updates);
    return c.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating checklist:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get checklist content
app.get("/make-server-8ab67d1d/checklists/:id/content", async (c) => {
  try {
    const id = c.req.param("id");
    const checklist = await checklists.getChecklist(id);
    
    if (!checklist) {
      return c.json({ success: false, error: "Checklist not found" }, 404);
    }
    
    return c.json({ 
      success: true, 
      data: { content: checklist.file_content || "" } 
    });
  } catch (error) {
    console.error("Error getting checklist content:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Update checklist content
app.put("/make-server-8ab67d1d/checklists/:id/content", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    
    const updated = await checklists.updateChecklistContent(id, body.content);
    return c.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating checklist content:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Delete checklist
app.delete("/make-server-8ab67d1d/checklists/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await checklists.deleteChecklist(id, true); // Hard delete
    return c.json({ success: true, message: "Checklist deleted" });
  } catch (error) {
    console.error("Error deleting checklist:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Download checklist
app.get("/make-server-8ab67d1d/checklists/:id/download", async (c) => {
  try {
    const id = c.req.param("id");
    const format = c.req.query("format") || "doc";
    const checklist = await checklists.getChecklist(id);
    
    if (!checklist || !checklist.file_path) {
      return c.json({ success: false, error: "Checklist file not found" }, 404);
    }
    
    const signedUrl = await checklists.getChecklistFileSignedUrl(checklist.file_path);
    
    return c.json({ 
      success: true, 
      data: { 
        url: signedUrl,
        filename: `${checklist.name}_${checklist.version}.${format}`
      } 
    });
  } catch (error) {
    console.error("Error downloading checklist:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

Deno.serve(app.fetch);