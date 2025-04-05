import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database schema types
export type Owner = {
  id: number
  unit: string
  name: string
  email: string
  phone: string
  entitlement: number
}

export type MaintenanceRequest = {
  id: number
  title: string
  description: string
  submittedBy: string
  unit: string
  date: string
  status: "pending" | "in-progress" | "scheduled" | "completed"
  priority: "low" | "medium" | "high"
}

export type Document = {
  id: number
  title: string
  fileName: string
  fileUrl: string
  uploadedBy: string
  uploadDate: string
  category: string
}

export type Levy = {
  id: number
  unit: string
  amount: number
  dueDate: string
  status: "pending" | "paid" | "overdue"
  period: string
}

// Database functions
export async function getOwners() {
  const { data, error } = await supabase.from("owners").select("*").order("unit", { ascending: true })

  if (error) {
    console.error("Error fetching owners:", error)
    return []
  }

  return data as Owner[]
}

export async function getOwnerById(id: number) {
  const { data, error } = await supabase.from("owners").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching owner:", error)
    return null
  }

  return data as Owner
}

export async function createOwner(owner: Omit<Owner, "id">) {
  const { data, error } = await supabase.from("owners").insert([owner]).select()

  if (error) {
    console.error("Error creating owner:", error)
    return null
  }

  return data[0] as Owner
}

export async function updateOwner(id: number, owner: Partial<Owner>) {
  const { data, error } = await supabase.from("owners").update(owner).eq("id", id).select()

  if (error) {
    console.error("Error updating owner:", error)
    return null
  }

  return data[0] as Owner
}

export async function deleteOwner(id: number) {
  const { error } = await supabase.from("owners").delete().eq("id", id)

  if (error) {
    console.error("Error deleting owner:", error)
    return false
  }

  return true
}

export async function getMaintenanceRequests() {
  const { data, error } = await supabase.from("maintenance_requests").select("*").order("date", { ascending: false })

  if (error) {
    console.error("Error fetching maintenance requests:", error)
    return []
  }

  return data as MaintenanceRequest[]
}

export async function createMaintenanceRequest(request: Omit<MaintenanceRequest, "id">) {
  const { data, error } = await supabase.from("maintenance_requests").insert([request]).select()

  if (error) {
    console.error("Error creating maintenance request:", error)
    return null
  }

  return data[0] as MaintenanceRequest
}

export async function updateMaintenanceRequest(id: number, request: Partial<MaintenanceRequest>) {
  const { data, error } = await supabase.from("maintenance_requests").update(request).eq("id", id).select()

  if (error) {
    console.error("Error updating maintenance request:", error)
    return null
  }

  return data[0] as MaintenanceRequest
}

export async function getDocuments() {
  const { data, error } = await supabase.from("documents").select("*").order("uploadDate", { ascending: false })

  if (error) {
    console.error("Error fetching documents:", error)
    return []
  }

  return data as Document[]
}

export async function getLevies() {
  const { data, error } = await supabase.from("levies").select("*").order("dueDate", { ascending: true })

  if (error) {
    console.error("Error fetching levies:", error)
    return []
  }

  return data as Levy[]
}

