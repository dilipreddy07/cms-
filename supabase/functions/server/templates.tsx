import { createClient } from "jsr:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

const BUCKET_NAME = "make-8ab67d1d-templates";

// Initialize storage bucket
export async function initializeBucket() {
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === BUCKET_NAME);
    
    if (!bucketExists) {
      const { data, error } = await supabase.storage.createBucket(BUCKET_NAME, {
        public: false,
        fileSizeLimit: 52428800, // 50MB limit
        allowedMimeTypes: [
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/pdf'
        ]
      });
      
      if (error) {
        console.error("Error creating templates bucket:", error);
        throw error;
      }
      console.log("Templates bucket created successfully:", BUCKET_NAME);
    } else {
      console.log("Templates bucket already exists:", BUCKET_NAME);
    }
  } catch (error) {
    console.error("Error initializing templates bucket:", error);
    throw error;
  }
}

interface Template {
  id: string;
  title: string;
  department: string;
  mapped_procedure?: string;
  mapped_procedure_name?: string;
  standard_id: string;
  file_url: string | null;
  file_type: "doc" | "pdf" | null;
  file_path: string | null;
  version: string;
  created_at: string;
  updated_at: string;
  deleted?: boolean;
}

// Get all templates
export async function getAllTemplates(): Promise<Template[]> {
  try {
    const templates = await kv.getByPrefix("template:");
    return (templates as Template[]).filter(template => !template.deleted);
  } catch (error) {
    console.error("Error fetching templates:", error);
    throw error;
  }
}

// Get templates by standard
export async function getTemplatesByStandard(standardId: string): Promise<Template[]> {
  try {
    const allTemplates = await getAllTemplates();
    return allTemplates.filter(t => t.standard_id === standardId);
  } catch (error) {
    console.error("Error fetching templates by standard:", error);
    throw error;
  }
}

// Get single template
export async function getTemplate(id: string): Promise<Template | null> {
  try {
    const template = await kv.get(`template:${id}`);
    if (template && !(template as Template).deleted) {
      return template as Template;
    }
    return null;
  } catch (error) {
    console.error("Error fetching template:", error);
    throw error;
  }
}

// Create template
export async function createTemplate(template: Template): Promise<Template> {
  try {
    const now = new Date().toISOString();
    const newTemplate = {
      ...template,
      created_at: now,
      updated_at: now,
      deleted: false
    };
    
    await kv.set(`template:${template.id}`, newTemplate);
    console.log("Template created:", template.id);
    return newTemplate;
  } catch (error) {
    console.error("Error creating template:", error);
    throw error;
  }
}

// Update template
export async function updateTemplate(id: string, updates: Partial<Template>): Promise<Template | null> {
  try {
    const existing = await getTemplate(id);
    if (!existing) {
      throw new Error("Template not found");
    }
    
    const updated = {
      ...existing,
      ...updates,
      updated_at: new Date().toISOString()
    };
    
    await kv.set(`template:${id}`, updated);
    console.log("Template updated:", id);
    return updated;
  } catch (error) {
    console.error("Error updating template:", error);
    throw error;
  }
}

// Delete template (soft delete)
export async function deleteTemplate(id: string, hardDelete: boolean = false): Promise<boolean> {
  try {
    const template = await getTemplate(id);
    
    if (hardDelete) {
      // Delete file from storage if exists
      if (template?.file_path) {
        try {
          await supabase.storage.from(BUCKET_NAME).remove([template.file_path]);
          console.log("Template file deleted from storage:", template.file_path);
        } catch (err) {
          console.error("Error deleting template file from storage:", err);
        }
      }
      
      // Permanent deletion from KV store
      await kv.del(`template:${id}`);
      console.log("Template permanently deleted:", id);
    } else {
      // Soft delete
      const existing = await kv.get(`template:${id}`);
      if (existing) {
        await kv.set(`template:${id}`, {
          ...(existing as Template),
          deleted: true,
          updated_at: new Date().toISOString()
        });
        console.log("Template soft deleted:", id);
      }
    }
    return true;
  } catch (error) {
    console.error("Error deleting template:", error);
    throw error;
  }
}

// Upload file
export async function uploadTemplateFile(
  templateId: string,
  file: File,
  fileName: string
): Promise<{ file_url: string; file_path: string; file_type: "doc" | "pdf" }> {
  try {
    const fileExt = fileName.split('.').pop()?.toLowerCase();
    const file_type = fileExt === 'pdf' ? 'pdf' : 'doc';
    const timestamp = Date.now();
    
    // Sanitize filename: remove special characters, replace spaces with underscores
    const sanitizedFileName = fileName
      .replace(/[^\w\s.-]/g, '') // Remove special chars except word chars, spaces, dots, hyphens
      .replace(/\s+/g, '_')       // Replace spaces with underscores
      .replace(/_{2,}/g, '_');    // Replace multiple underscores with single
    
    const file_path = `${templateId}/${timestamp}_${sanitizedFileName}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(file_path, file, {
        contentType: file.type,
        upsert: false
      });

    if (error) {
      console.error("Error uploading template file:", error);
      throw error;
    }

    console.log("Template file uploaded successfully:", file_path);

    // Get public URL (will be signed when retrieved)
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(file_path);

    return {
      file_url: urlData.publicUrl,
      file_path: file_path,
      file_type: file_type
    };
  } catch (error) {
    console.error("Error in uploadTemplateFile:", error);
    throw error;
  }
}

// Get signed URL for file download
export async function getTemplateFileSignedUrl(filePath: string): Promise<string> {
  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .createSignedUrl(filePath, 3600); // 1 hour expiry

    if (error) {
      console.error("Error creating signed URL:", error);
      throw error;
    }

    return data.signedUrl;
  } catch (error) {
    console.error("Error in getTemplateFileSignedUrl:", error);
    throw error;
  }
}

// Generate unique ID
export function generateTemplateId(count: number): string {
  return `TMP${String(count + 1).padStart(3, "0")}`;
}

// Get next ID
export async function getNextTemplateId(): Promise<string> {
  try {
    const allTemplates = await getAllTemplates();
    return generateTemplateId(allTemplates.length);
  } catch (error) {
    console.error("Error generating next template ID:", error);
    throw error;
  }
}