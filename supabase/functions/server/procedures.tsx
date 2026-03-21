import { createClient } from "jsr:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

const BUCKET_NAME = "make-8ab67d1d-procedures";

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
        console.error("Error creating bucket:", error);
        throw error;
      }
      console.log("Bucket created successfully:", BUCKET_NAME);
    } else {
      console.log("Bucket already exists:", BUCKET_NAME);
    }
  } catch (error) {
    console.error("Error initializing bucket:", error);
    throw error;
  }
}

interface Procedure {
  procedure_id: string;
  name: string;
  department: string;
  standard_id: string;
  file_url: string | null;
  file_type: "doc" | "pdf" | null;
  version: string;
  status: "Draft" | "Review" | "Approved";
  created_by: string;
  created_at: string;
  updated_at: string;
  description?: string;
}

// Get all procedures
export async function getAllProcedures(): Promise<Procedure[]> {
  try {
    const procedures = await kv.getByPrefix("procedure:");
    return procedures as Procedure[];
  } catch (error) {
    console.error("Error fetching procedures:", error);
    throw error;
  }
}

// Get procedures by standard
export async function getProceduresByStandard(standardId: string): Promise<Procedure[]> {
  try {
    const allProcedures = await getAllProcedures();
    return allProcedures.filter(p => p.standard_id === standardId);
  } catch (error) {
    console.error("Error fetching procedures by standard:", error);
    throw error;
  }
}

// Get single procedure
export async function getProcedure(procedureId: string): Promise<Procedure | null> {
  try {
    const procedure = await kv.get(`procedure:${procedureId}`);
    return procedure as Procedure | null;
  } catch (error) {
    console.error("Error fetching procedure:", error);
    throw error;
  }
}

// Create procedure
export async function createProcedure(procedure: Procedure): Promise<Procedure> {
  try {
    await kv.set(`procedure:${procedure.procedure_id}`, procedure);
    console.log("Procedure created:", procedure.procedure_id);
    return procedure;
  } catch (error) {
    console.error("Error creating procedure:", error);
    throw error;
  }
}

// Update procedure
export async function updateProcedure(procedureId: string, updates: Partial<Procedure>): Promise<Procedure> {
  try {
    const existing = await getProcedure(procedureId);
    if (!existing) {
      throw new Error(`Procedure ${procedureId} not found`);
    }
    
    const updated = {
      ...existing,
      ...updates,
      updated_at: new Date().toISOString().split('T')[0]
    };
    
    await kv.set(`procedure:${procedureId}`, updated);
    console.log("Procedure updated:", procedureId);
    return updated;
  } catch (error) {
    console.error("Error updating procedure:", error);
    throw error;
  }
}

// Delete procedure (including file from storage)
export async function deleteProcedure(procedureId: string): Promise<void> {
  try {
    const procedure = await getProcedure(procedureId);
    if (!procedure) {
      throw new Error(`Procedure ${procedureId} not found`);
    }
    
    // Delete file from storage if exists
    if (procedure.file_url) {
      const filePath = procedure.file_url.replace(`${BUCKET_NAME}/`, '');
      const { error: deleteError } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([filePath]);
      
      if (deleteError) {
        console.error("Error deleting file from storage:", deleteError);
        // Continue with deletion even if file delete fails
      } else {
        console.log("File deleted from storage:", filePath);
      }
    }
    
    // Delete from database
    await kv.del(`procedure:${procedureId}`);
    console.log("Procedure permanently deleted:", procedureId);
  } catch (error) {
    console.error("Error deleting procedure:", error);
    throw error;
  }
}

// Upload file to storage
export async function uploadFile(
  procedureId: string,
  file: File,
  fileType: "doc" | "pdf"
): Promise<string> {
  try {
    const timestamp = Date.now();
    const fileName = `${procedureId}_${timestamp}.${fileType === 'doc' ? 'doc' : 'pdf'}`;
    const filePath = `procedures/${fileName}`;
    
    // Convert file to ArrayBuffer for upload
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, uint8Array, {
        contentType: fileType === 'doc' 
          ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          : 'application/pdf',
        upsert: true
      });
    
    if (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
    
    console.log("File uploaded successfully:", filePath);
    return `${BUCKET_NAME}/${filePath}`;
  } catch (error) {
    console.error("Error in uploadFile:", error);
    throw error;
  }
}

// Get signed URL for file download
export async function getSignedUrl(filePath: string, expiresIn: number = 3600): Promise<string> {
  try {
    const path = filePath.replace(`${BUCKET_NAME}/`, '');
    
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .createSignedUrl(path, expiresIn);
    
    if (error) {
      console.error("Error creating signed URL:", error);
      throw error;
    }
    
    if (!data?.signedUrl) {
      throw new Error("No signed URL returned");
    }
    
    console.log("Signed URL created for:", path);
    return data.signedUrl;
  } catch (error) {
    console.error("Error getting signed URL:", error);
    throw error;
  }
}

// Generate next procedure ID
export async function generateProcedureId(): Promise<string> {
  try {
    const allProcedures = await getAllProcedures();
    const maxId = allProcedures.reduce((max, p) => {
      const num = parseInt(p.procedure_id.replace('P', ''));
      return num > max ? num : max;
    }, 0);
    
    return `P${String(maxId + 1).padStart(3, '0')}`;
  } catch (error) {
    console.error("Error generating procedure ID:", error);
    return "P001"; // Fallback to first ID
  }
}
