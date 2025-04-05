"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, FileText, Download, Upload } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// Mock data for documents
const mockDocuments = [
  {
    id: 1,
    title: "Insurance Certificate",
    fileName: "insurance_2023.pdf",
    fileUrl: "#",
    uploadedBy: "Admin",
    uploadDate: "March 10, 2023",
    category: "Insurance",
  },
  {
    id: 2,
    title: "AGM Minutes",
    fileName: "agm_minutes_2023.pdf",
    fileUrl: "#",
    uploadedBy: "Admin",
    uploadDate: "February 25, 2023",
    category: "Minutes",
  },
  {
    id: 3,
    title: "Financial Report 2022",
    fileName: "financial_report_2022.pdf",
    fileUrl: "#",
    uploadedBy: "Admin",
    uploadDate: "January 15, 2023",
    category: "Financial",
  },
  {
    id: 4,
    title: "By-Laws",
    fileName: "by_laws.pdf",
    fileUrl: "#",
    uploadedBy: "Admin",
    uploadDate: "December 5, 2022",
    category: "Legal",
  },
]

export default function Documents() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [documents, setDocuments] = useState(mockDocuments)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newDocument, setNewDocument] = useState({
    title: "",
    category: "General",
    file: null as File | null,
  })
  const [activeCategory, setActiveCategory] = useState("all")

  useEffect(() => {
    // Check if user is logged in by looking for the cookie
    const cookies = document.cookie.split(";")
    const isLoggedIn = cookies.some((cookie) => cookie.trim().startsWith("isLoggedIn=true"))

    if (!isLoggedIn) {
      router.push("/login")
    } else {
      setIsAuthenticated(true)
    }

    setIsLoading(false)
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewDocument((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewDocument((prev) => ({ ...prev, file: e.target.files![0] }))
    }
  }

  const handleSelectChange = (value: string) => {
    setNewDocument((prev) => ({ ...prev, category: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newDocument.file) {
      toast({
        title: "Error",
        description: "Please select a file to upload",
        variant: "destructive",
      })
      return
    }

    // Simulate document upload
    const newId = Math.max(...documents.map((d) => d.id)) + 1
    const today = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })

    const document = {
      id: newId,
      title: newDocument.title,
      fileName: newDocument.file.name,
      fileUrl: "#",
      uploadedBy: "John Smith", // Hardcoded for demo
      uploadDate: today,
      category: newDocument.category,
    }

    setDocuments([document, ...documents])
    setNewDocument({
      title: "",
      category: "General",
      file: null,
    })
    setIsDialogOpen(false)

    toast({
      title: "Document uploaded",
      description: "Your document has been successfully uploaded.",
    })
  }

  const handleDownload = (document: any) => {
    // Simulate download
    toast({
      title: "Download started",
      description: `Downloading ${document.fileName}`,
    })
  }

  const filteredDocuments =
    activeCategory === "all"
      ? documents
      : documents.filter((doc) => doc.category.toLowerCase() === activeCategory.toLowerCase())

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect to login
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => toast({ title: "Notifications", description: "You have no new notifications." })}
            >
              <Bell className="h-4 w-4" />
            </Button>
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DashboardHeader heading="Documents" text="Access and manage important strata documents.">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Upload Document</DialogTitle>
                <DialogDescription>Upload a new document to the strata repository.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Document Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={newDocument.title}
                      onChange={handleInputChange}
                      placeholder="Enter document title"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={newDocument.category} onValueChange={handleSelectChange}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="General">General</SelectItem>
                        <SelectItem value="Insurance">Insurance</SelectItem>
                        <SelectItem value="Minutes">Meeting Minutes</SelectItem>
                        <SelectItem value="Financial">Financial</SelectItem>
                        <SelectItem value="Legal">Legal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="file">File</Label>
                    <Input id="file" name="file" type="file" onChange={handleFileChange} required />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Upload</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </DashboardHeader>

        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={activeCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory("all")}
            >
              All
            </Button>
            <Button
              variant={activeCategory === "insurance" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory("insurance")}
            >
              Insurance
            </Button>
            <Button
              variant={activeCategory === "minutes" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory("minutes")}
            >
              Minutes
            </Button>
            <Button
              variant={activeCategory === "financial" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory("financial")}
            >
              Financial
            </Button>
            <Button
              variant={activeCategory === "legal" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory("legal")}
            >
              Legal
            </Button>
          </div>
        </div>

        <DashboardShell>
          <div className="grid gap-4">
            {filteredDocuments.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center h-40">
                  <FileText className="h-10 w-10 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No documents found in this category.</p>
                </CardContent>
              </Card>
            ) : (
              filteredDocuments.map((document) => (
                <Card key={document.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{document.title}</CardTitle>
                        <CardDescription>
                          Uploaded by: {document.uploadedBy} on {document.uploadDate}
                        </CardDescription>
                      </div>
                      <div className="px-2 py-1 rounded text-xs font-medium bg-gray-100">{document.category}</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Filename: {document.fileName}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" onClick={() => handleDownload(document)}>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </DashboardShell>
      </div>
    </div>
  )
}

