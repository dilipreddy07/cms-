import { createClient } from "jsr:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

const BUCKET_NAME = "make-8ab67d1d-checklists";

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
        console.error("Error creating checklists bucket:", error);
        throw error;
      }
      console.log("Checklists bucket created successfully:", BUCKET_NAME);
    } else {
      console.log("Checklists bucket already exists:", BUCKET_NAME);
    }
  } catch (error) {
    console.error("Error initializing checklists bucket:", error);
    throw error;
  }
}

interface Checklist {
  checklist_id: string;
  name: string;
  description: string;
  mapped_procedure: string;
  mapped_procedure_name?: string;
  standard_id: string;
  file_url: string | null;
  file_type: "doc" | "pdf" | null;
  file_path: string | null;
  file_content?: string | null;
  version: string;
  status: "Draft" | "Review" | "Approved";
  created_at: string;
  updated_at: string;
  deleted?: boolean;
}

// Get all checklists
export async function getAllChecklists(): Promise<Checklist[]> {
  try {
    const checklists = await kv.getByPrefix("checklist:");
    return (checklists as Checklist[]).filter(checklist => !checklist.deleted);
  } catch (error) {
    console.error("Error fetching checklists:", error);
    throw error;
  }
}

// Get checklists by standard
export async function getChecklistsByStandard(standardId: string): Promise<Checklist[]> {
  try {
    const allChecklists = await getAllChecklists();
    return allChecklists.filter(c => c.standard_id === standardId);
  } catch (error) {
    console.error("Error fetching checklists by standard:", error);
    throw error;
  }
}

// Get single checklist
export async function getChecklist(id: string): Promise<Checklist | null> {
  try {
    const checklist = await kv.get(`checklist:${id}`);
    if (checklist && !(checklist as Checklist).deleted) {
      return checklist as Checklist;
    }
    return null;
  } catch (error) {
    console.error("Error fetching checklist:", error);
    throw error;
  }
}

// Create checklist
export async function createChecklist(checklist: Checklist): Promise<Checklist> {
  try {
    const now = new Date().toISOString();
    const newChecklist = {
      ...checklist,
      created_at: now,
      updated_at: now,
      deleted: false
    };
    
    await kv.set(`checklist:${checklist.checklist_id}`, newChecklist);
    console.log("Checklist created:", checklist.checklist_id);
    return newChecklist;
  } catch (error) {
    console.error("Error creating checklist:", error);
    throw error;
  }
}

// Update checklist
export async function updateChecklist(id: string, updates: Partial<Checklist>): Promise<Checklist | null> {
  try {
    const existing = await getChecklist(id);
    if (!existing) {
      throw new Error("Checklist not found");
    }
    
    const updated = {
      ...existing,
      ...updates,
      updated_at: new Date().toISOString()
    };
    
    await kv.set(`checklist:${id}`, updated);
    console.log("Checklist updated:", id);
    return updated;
  } catch (error) {
    console.error("Error updating checklist:", error);
    throw error;
  }
}

// Update checklist content
export async function updateChecklistContent(id: string, content: string): Promise<Checklist | null> {
  try {
    const existing = await getChecklist(id);
    if (!existing) {
      throw new Error("Checklist not found");
    }
    
    const updated = {
      ...existing,
      file_content: content,
      updated_at: new Date().toISOString()
    };
    
    await kv.set(`checklist:${id}`, updated);
    console.log("Checklist content updated:", id);
    return updated;
  } catch (error) {
    console.error("Error updating checklist content:", error);
    throw error;
  }
}

// Delete checklist (soft delete)
export async function deleteChecklist(id: string, hardDelete: boolean = false): Promise<boolean> {
  try {
    const checklist = await getChecklist(id);
    
    if (hardDelete) {
      // Delete file from storage if exists
      if (checklist?.file_path) {
        try {
          await supabase.storage.from(BUCKET_NAME).remove([checklist.file_path]);
          console.log("Checklist file deleted from storage:", checklist.file_path);
        } catch (err) {
          console.error("Error deleting checklist file from storage:", err);
        }
      }
      
      // Permanent deletion from KV store
      await kv.del(`checklist:${id}`);
      console.log("Checklist permanently deleted:", id);
    } else {
      // Soft delete
      const existing = await kv.get(`checklist:${id}`);
      if (existing) {
        await kv.set(`checklist:${id}`, {
          ...(existing as Checklist),
          deleted: true,
          updated_at: new Date().toISOString()
        });
        console.log("Checklist soft deleted:", id);
      }
    }
    return true;
  } catch (error) {
    console.error("Error deleting checklist:", error);
    throw error;
  }
}

// Upload file
export async function uploadChecklistFile(
  checklistId: string,
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
    
    const file_path = `${checklistId}/${timestamp}_${sanitizedFileName}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(file_path, file, {
        contentType: file.type,
        upsert: false
      });

    if (error) {
      console.error("Error uploading checklist file:", error);
      throw error;
    }

    console.log("Checklist file uploaded successfully:", file_path);

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
    console.error("Error in uploadChecklistFile:", error);
    throw error;
  }
}

// Get signed URL for file download
export async function getChecklistFileSignedUrl(filePath: string): Promise<string> {
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
    console.error("Error in getChecklistFileSignedUrl:", error);
    throw error;
  }
}

// Generate unique ID
export function generateChecklistId(count: number): string {
  return `CHK${String(count + 1).padStart(3, "0")}`;
}

// Get next ID
export async function getNextChecklistId(): Promise<string> {
  try {
    const allChecklists = await getAllChecklists();
    return generateChecklistId(allChecklists.length);
  } catch (error) {
    console.error("Error generating next checklist ID:", error);
    throw error;
  }
}