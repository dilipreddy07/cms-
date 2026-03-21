import { createClient } from "jsr:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

interface PolicyGuideline {
  id: string;
  title: string;
  type: "Policy" | "Guideline";
  description: string;
  mapped_procedure: string;
  mapped_procedure_name?: string;
  standard_id: string;
  version: string;
  status: "Draft" | "Review" | "Approved";
  created_at: string;
  updated_at: string;
  deleted?: boolean;
}

// Get all policies and guidelines
export async function getAllPoliciesGuidelines(): Promise<PolicyGuideline[]> {
  try {
    const items = await kv.getByPrefix("policy-guideline:");
    return (items as PolicyGuideline[]).filter(item => !item.deleted);
  } catch (error) {
    console.error("Error fetching policies/guidelines:", error);
    throw error;
  }
}

// Get policies/guidelines by standard
export async function getPoliciesGuidelinesByStandard(standardId: string): Promise<PolicyGuideline[]> {
  try {
    const allItems = await getAllPoliciesGuidelines();
    return allItems.filter(item => item.standard_id === standardId);
  } catch (error) {
    console.error("Error fetching policies/guidelines by standard:", error);
    throw error;
  }
}

// Get single policy/guideline
export async function getPolicyGuideline(id: string): Promise<PolicyGuideline | null> {
  try {
    const item = await kv.get(`policy-guideline:${id}`);
    if (item && !(item as PolicyGuideline).deleted) {
      return item as PolicyGuideline;
    }
    return null;
  } catch (error) {
    console.error("Error fetching policy/guideline:", error);
    throw error;
  }
}

// Create policy/guideline
export async function createPolicyGuideline(item: PolicyGuideline): Promise<PolicyGuideline> {
  try {
    const now = new Date().toISOString();
    const newItem = {
      ...item,
      created_at: now,
      updated_at: now,
      deleted: false
    };
    
    await kv.set(`policy-guideline:${item.id}`, newItem);
    console.log("Policy/Guideline created:", item.id);
    return newItem;
  } catch (error) {
    console.error("Error creating policy/guideline:", error);
    throw error;
  }
}

// Update policy/guideline
export async function updatePolicyGuideline(id: string, updates: Partial<PolicyGuideline>): Promise<PolicyGuideline | null> {
  try {
    const existing = await getPolicyGuideline(id);
    if (!existing) {
      throw new Error("Policy/Guideline not found");
    }
    
    const updated = {
      ...existing,
      ...updates,
      updated_at: new Date().toISOString()
    };
    
    await kv.set(`policy-guideline:${id}`, updated);
    console.log("Policy/Guideline updated:", id);
    return updated;
  } catch (error) {
    console.error("Error updating policy/guideline:", error);
    throw error;
  }
}

// Delete policy/guideline (soft delete)
export async function deletePolicyGuideline(id: string, hardDelete: boolean = false): Promise<boolean> {
  try {
    if (hardDelete) {
      // Permanent deletion
      await kv.del(`policy-guideline:${id}`);
      console.log("Policy/Guideline permanently deleted:", id);
    } else {
      // Soft delete
      const existing = await kv.get(`policy-guideline:${id}`);
      if (existing) {
        await kv.set(`policy-guideline:${id}`, {
          ...(existing as PolicyGuideline),
          deleted: true,
          updated_at: new Date().toISOString()
        });
        console.log("Policy/Guideline soft deleted:", id);
      }
    }
    return true;
  } catch (error) {
    console.error("Error deleting policy/guideline:", error);
    throw error;
  }
}

// Generate unique ID
export function generateId(type: "Policy" | "Guideline", count: number): string {
  const prefix = type === "Policy" ? "POL" : "GUI";
  return `${prefix}${String(count + 1).padStart(3, "0")}`;
}

// Get next ID
export async function getNextId(type: "Policy" | "Guideline"): Promise<string> {
  try {
    const allItems = await getAllPoliciesGuidelines();
    const filtered = allItems.filter(item => item.type === type);
    return generateId(type, filtered.length);
  } catch (error) {
    console.error("Error generating next ID:", error);
    throw error;
  }
}
