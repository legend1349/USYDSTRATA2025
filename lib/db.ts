import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabase = createClient(supabaseUrl, supabaseKey)
export const supabasePublic = createClient(supabaseUrl, supabaseAnonKey)

// Database schema types
export type Owner = {
  id: number
  unit: string
  name: string
  email: string
  phone: string
  entitlement: number
  created_at?: string
  updated_at?: string
}

export type MaintenanceRequest = {
  id: number
  title: string
  description: string
  submitted_by: string
  unit: string
  date: string
  status: "pending" | "in-progress" | "scheduled" | "completed"
  priority: "low" | "medium" | "high"
  created_at?: string
  updated_at?: string
}

export type Document = {
  id: number
  title: string
  file_name: string
  file_url: string
  uploaded_by: string
  upload_date: string
  category: string
  created_at?: string
  updated_at?: string
}

export type Levy = {
  id: number
  unit: string
  amount: number
  due_date: string
  status: "pending" | "paid" | "overdue"
  period: string
  created_at?: string
  updated_at?: string
}

export type BudgetItem = {
  id: number
  category: string
  amount: number
  type: "income" | "expense"
  fiscal_year: string
  created_at?: string
  updated_at?: string
}

// Owner functions
export async function getOwners() {
  const { data, error } = await supabase
    .from("owners")
    .select("*")
    .order("unit", { ascending: true })

  if (error) {
    console.error("Error fetching owners:", error)
    return []
  }

  return data as Owner[]
}

export async function getOwnerById(id: number) {
  const { data, error } = await supabase
    .from("owners")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching owner:", error)
    return null
  }

  return data as Owner
}

export async function createOwner(owner: Omit<Owner, "id" | "created_at" | "updated_at">) {
  const { data, error } = await supabase
    .from("owners")
    .insert([owner])
    .select()

  if (error) {
    console.error("Error creating owner:", error)
    return null
  }

  return data[0] as Owner
}

export async function updateOwner(id: number, owner: Partial<Owner>) {
  const { data, error } = await supabase
    .from("owners")
    .update(owner)
    .eq("id", id)
    .select()

  if (error) {
    console.error("Error updating owner:", error)
    return null
  }

  return data[0] as Owner
}

export async function deleteOwner(id: number) {
  const { error } = await supabase
    .from("owners")
    .delete()
    .eq("id", id)

  if (error) {
    console.error("Error deleting owner:", error)
    return false
  }

  return true
}

// Maintenance request functions
export async function getMaintenanceRequests() {
  const { data, error } = await supabase
    .from("maintenance_requests")
    .select("*")
    .order("date", { ascending: false })

  if (error) {
    console.error("Error fetching maintenance requests:", error)
    return []
  }

  return data as MaintenanceRequest[]
}

export async function getMaintenanceRequestById(id: number) {
  const { data, error } = await supabase
    .from("maintenance_requests")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching maintenance request:", error)
    return null
  }

  return data as MaintenanceRequest
}

export async function createMaintenanceRequest(request: Omit<MaintenanceRequest, "id" | "created_at" | "updated_at">) {
  const { data, error } = await supabase
    .from("maintenance_requests")
    .insert([request])
    .select()

  if (error) {
    console.error("Error creating maintenance request:", error)
    return null
  }

  return data[0] as MaintenanceRequest
}

export async function updateMaintenanceRequest(id: number, request: Partial<MaintenanceRequest>) {
  const { data, error } = await supabase
    .from("maintenance_requests")
    .update(request)
    .eq("id", id)
    .select()

  if (error) {
    console.error("Error updating maintenance request:", error)
    return null
  }

  return data[0] as MaintenanceRequest
}

export async function deleteMaintenanceRequest(id: number) {
  const { error } = await supabase
    .from("maintenance_requests")
    .delete()
    .eq("id", id)

  if (error) {
    console.error("Error deleting maintenance request:", error)
    return false
  }

  return true
}

// Document functions
export async function getDocuments() {
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .order("upload_date", { ascending: false })

  if (error) {
    console.error("Error fetching documents:", error)
    return []
  }

  return data as Document[]
}

export async function getDocumentsByCategory(category: string) {
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .eq("category", category)
    .order("upload_date", { ascending: false })

  if (error) {
    console.error("Error fetching documents by category:", error)
    return []
  }

  return data as Document[]
}

export async function createDocument(document: Omit<Document, "id" | "created_at" | "updated_at">) {
  const { data, error } = await supabase
    .from("documents")
    .insert([document])
    .select()

  if (error) {
    console.error("Error creating document:", error)
    return null
  }

  return data[0] as Document
}

export async function deleteDocument(id: number) {
  // First get the document to get the file path
  const { data: document, error: fetchError } = await supabase
    .from("documents")
    .select("file_url")
    .eq("id", id)
    .single()

  if (fetchError) {
    console.error("Error fetching document for deletion:", fetchError)
    return false
  }

  // Extract the file path from the URL
  const filePath = document.file_url.split('/').pop()
  
  // Delete the file from storage
  const { error: storageError } = await supabase
    .storage
    .from('documents')
    .remove([filePath])

  if (storageError) {
    console.error("Error deleting document file:", storageError)
    return false
  }

  // Delete the document record
  const { error } = await supabase
    .from("documents")
    .delete()
    .eq("id", id)

  if (error) {
    console.error("Error deleting document record:", error)
    return false
  }

  return true
}

// File upload function
export async function uploadFile(file: File, folder: string = 'documents') {
  const fileName = `${Date.now()}_${file.name}`
  
  const { data, error } = await supabase
    .storage
    .from(folder)
    .upload(fileName, file)

  if (error) {
    console.error("Error uploading file:", error)
    return null
  }

  // Get the public URL
  const { data: { publicUrl } } = supabase
    .storage
    .from(folder)
    .getPublicUrl(fileName)

  return {
    fileName,
    filePath: data.path,
    fileUrl: publicUrl
  }
}

// Levy functions
export async function getLevies() {
  const { data, error } = await supabase
    .from("levies")
    .select("*")
    .order("due_date", { ascending: true })

  if (error) {
    console.error("Error fetching levies:", error)
    return []
  }

  return data as Levy[]
}

export async function getLevyById(id: number) {
  const { data, error } = await supabase
    .from("levies")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching levy:", error)
    return null
  }

  return data as Levy
}

export async function createLevy(levy: Omit<Levy, "id" | "created_at" | "updated_at">) {
  const { data, error } = await supabase
    .from("levies")
    .insert([levy])
    .select()

  if (error) {
    console.error("Error creating levy:", error)
    return null
  }

  return data[0] as Levy
}

export async function updateLevy(id: number, levy: Partial<Levy>) {
  const { data, error } = await supabase
    .from("levies")
    .update(levy)
    .eq("id", id)
    .select()

  if (error) {
    console.error("Error updating levy:", error)
    return null
  }

  return data[0] as Levy
}

export async function deleteLevy(id: number) {
  const { error } = await supabase
    .from("levies")
    .delete()
    .eq("id", id)

  if (error) {
    console.error("Error deleting levy:", error)
    return false
  }

  return true
}

// Budget functions
export async function getBudgetItems(fiscalYear: string) {
  const { data, error } = await supabase
    .from("budget_items")
    .select("*")
    .eq("fiscal_year", fiscalYear)
    .order("type", { ascending: false }) // Income first, then expenses

  if (error) {
    console.error("Error fetching budget items:", error)
    return []
  }

  return data as BudgetItem[]
}

export async function createBudgetItem(item: Omit<BudgetItem, "id" | "created_at" | "updated_at">) {
  const { data, error } = await supabase
    .from("budget_items")
    .insert([item])
    .select()

  if (error) {
    console.error("Error creating budget item:", error)
    return null
  }

  return data[0] as BudgetItem
}

export async function updateBudgetItem(id: number, item: Partial<BudgetItem>) {
  const { data, error } = await supabase
    .from("budget_items")
    .update(item)
    .eq("id", id)
    .select()

  if (error) {
    console.error("Error updating budget item:", error)
    return null
  }

  return data[0] as BudgetItem
}

export async function deleteBudgetItem(id: number) {
  const { error } = await supabase
    .from("budget_items")
    .delete()
    .eq("id", id)

  if (error) {
    console.error("Error deleting budget item:", error)
    return false
  }

  return true
}

// Authentication functions
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    console.error("Error signing in:", error)
    return { success: false, error: error.message }
  }

  return { success: true, user: data.user }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    console.error("Error signing out:", error)
    return false
  }
  
  return true
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser()
  
  if (error || !data?.user) {
    console.error("Error getting current user:", error)
    return null
  }
  
  return data.user
}
