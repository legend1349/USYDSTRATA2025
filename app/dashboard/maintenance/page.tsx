"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, PenToolIcon as Tool, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// Mock data for maintenance requests
const mockRequests = [
  {
    id: 1,
    title: "Leaking Tap in Common Area",
    description: "The tap in the common area bathroom is leaking and needs repair.",
    submittedBy: "John Smith",
    unit: "101",
    date: "2023-04-15",
    status: "in-progress",
    priority: "medium",
  },
  {
    id: 2,
    title: "Broken Light in Stairwell",
    description: "The light in the stairwell between floors 2 and 3 is not working.",
    submittedBy: "Sarah Johnson",
    unit: "102",
    date: "2023-04-10",
    status: "scheduled",
    priority: "low",
  },
  {
    id: 3,
    title: "Intercom System Issues",
    description: "The intercom system is not working properly for units 101-105.",
    submittedBy: "Michael Wong",
    unit: "103",
    date: "2023-04-05",
    status: "pending",
    priority: "high",
  },
  {
    id: 4,
    title: "Garage Door Malfunction",
    description: "The garage door is not opening properly and makes a loud noise.",
    submittedBy: "Emma Taylor",
    unit: "104",
    date: "2023-04-02",
    status: "completed",
    priority: "high",
  },
  {
    id: 5,
    title: "Water Damage on Ceiling",
    description: "There appears to be water damage on the ceiling of the hallway near unit 201.",
    submittedBy: "David Chen",
    unit: "105",
    date: "2023-03-28",
    status: "in-progress",
    priority: "high",
  },
]

export default function Maintenance() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [requests, setRequests] = useState(mockRequests)
  const [newRequest, setNewRequest] = useState({
    title: "",
    description: "",
    unit: "",
    priority: "medium",
  })
  const [isNewRequestDialogOpen, setIsNewRequestDialogOpen] = useState(false)
  const [isUpdateStatusDialogOpen, setIsUpdateStatusDialogOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [newStatus, setNewStatus] = useState("")

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewRequest((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setNewRequest((prev) => ({ ...prev, priority: value }))
  }

  const handleStatusChange = (value: string) => {
    setNewStatus(value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newId = Math.max(...requests.map((r) => r.id)) + 1
    const today = new Date().toISOString().split("T")[0]

    const request = {
      id: newId,
      title: newRequest.title,
      description: newRequest.description,
      submittedBy: "John Smith", // Hardcoded for demo
      unit: newRequest.unit,
      date: today,
      status: "pending",
      priority: newRequest.priority,
    }

    setRequests([request, ...requests])
    setNewRequest({
      title: "",
      description: "",
      unit: "",
      priority: "medium",
    })
    setIsNewRequestDialogOpen(false)

    toast({
      title: "Request submitted",
      description: "Your maintenance request has been submitted successfully.",
    })
  }

  const handleUpdateStatus = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedRequest || !newStatus) return

    const updatedRequests = requests.map((request) =>
      request.id === selectedRequest.id ? { ...request, status: newStatus } : request,
    )

    setRequests(updatedRequests)
    setIsUpdateStatusDialogOpen(false)
    setSelectedRequest(null)
    setNewStatus("")

    toast({
      title: "Status updated",
      description: `The status of "${selectedRequest.title}" has been updated to ${newStatus}.`,
    })
  }

  const openUpdateStatusDialog = (request: any) => {
    setSelectedRequest(request)
    setNewStatus(request.status)
    setIsUpdateStatusDialogOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <div className="flex items-center">
            <AlertCircle className="mr-1 h-4 w-4 text-yellow-500" />
            <span className="text-yellow-500 font-medium">Pending</span>
          </div>
        )
      case "in-progress":
        return (
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4 text-blue-500" />
            <span className="text-blue-500 font-medium">In Progress</span>
          </div>
        )
      case "scheduled":
        return (
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4 text-green-500" />
            <span className="text-green-500 font-medium">Scheduled</span>
          </div>
        )
      case "completed":
        return (
          <div className="flex items-center">
            <CheckCircle className="mr-1 h-4 w-4 text-green-600" />
            <span className="text-green-600 font-medium">Completed</span>
          </div>
        )
      default:
        return null
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "low":
        return <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">Low</span>
      case "medium":
        return <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">Medium</span>
      case "high":
        return <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">High</span>
      default:
        return null
    }
  }

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
        <DashboardHeader heading="Maintenance Requests" text="Submit and track maintenance requests for your property.">
          <Dialog open={isNewRequestDialogOpen} onOpenChange={setIsNewRequestDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Tool className="mr-2 h-4 w-4" />
                New Request
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Submit Maintenance Request</DialogTitle>
                <DialogDescription>Fill out the form below to submit a new maintenance request.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={newRequest.title}
                      onChange={handleInputChange}
                      placeholder="Brief description of the issue"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={newRequest.description}
                      onChange={handleInputChange}
                      placeholder="Provide details about the maintenance issue"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="unit">Unit Number</Label>
                    <Input
                      id="unit"
                      name="unit"
                      value={newRequest.unit}
                      onChange={handleInputChange}
                      placeholder="Your unit number"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={newRequest.priority} onValueChange={handleSelectChange}>
                      <SelectTrigger id="priority">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Submit Request</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={isUpdateStatusDialogOpen} onOpenChange={setIsUpdateStatusDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Update Request Status</DialogTitle>
                <DialogDescription>Update the status of the maintenance request.</DialogDescription>
              </DialogHeader>
              {selectedRequest && (
                <form onSubmit={handleUpdateStatus}>
                  <div className="grid gap-4 py-4">
                    <div>
                      <h3 className="font-medium">{selectedRequest.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Submitted by: {selectedRequest.submittedBy} (Unit {selectedRequest.unit})
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="status">Status</Label>
                      <Select value={newStatus} onValueChange={handleStatusChange}>
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Update Status</Button>
                  </DialogFooter>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </DashboardHeader>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Requests</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <DashboardShell>
              <div className="grid gap-4">
                {requests.map((request) => (
                  <Card key={request.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{request.title}</CardTitle>
                          <CardDescription>
                            Submitted by: {request.submittedBy} (Unit {request.unit}) on {request.date}
                          </CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getPriorityBadge(request.priority)}
                          {getStatusBadge(request.status)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p>{request.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          toast({
                            title: "View Details",
                            description: "Detailed view is not implemented in this demo.",
                          })
                        }
                      >
                        View Details
                      </Button>
                      {request.status !== "completed" && (
                        <Button size="sm" onClick={() => openUpdateStatusDialog(request)}>
                          Update Status
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </DashboardShell>
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            <DashboardShell>
              <div className="grid gap-4">
                {requests
                  .filter((request) => request.status === "pending")
                  .map((request) => (
                    <Card key={request.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{request.title}</CardTitle>
                            <CardDescription>
                              Submitted by: {request.submittedBy} (Unit {request.unit}) on {request.date}
                            </CardDescription>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getPriorityBadge(request.priority)}
                            {getStatusBadge(request.status)}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p>{request.description}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            toast({
                              title: "View Details",
                              description: "Detailed view is not implemented in this demo.",
                            })
                          }
                        >
                          View Details
                        </Button>
                        <Button size="sm" onClick={() => openUpdateStatusDialog(request)}>
                          Update Status
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </DashboardShell>
          </TabsContent>

          <TabsContent value="in-progress" className="space-y-4">
            <DashboardShell>
              <div className="grid gap-4">
                {requests
                  .filter((request) => request.status === "in-progress" || request.status === "scheduled")
                  .map((request) => (
                    <Card key={request.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{request.title}</CardTitle>
                            <CardDescription>
                              Submitted by: {request.submittedBy} (Unit {request.unit}) on {request.date}
                            </CardDescription>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getPriorityBadge(request.priority)}
                            {getStatusBadge(request.status)}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p>{request.description}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            toast({
                              title: "View Details",
                              description: "Detailed view is not implemented in this demo.",
                            })
                          }
                        >
                          View Details
                        </Button>
                        <Button size="sm" onClick={() => openUpdateStatusDialog(request)}>
                          Update Status
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </DashboardShell>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <DashboardShell>
              <div className="grid gap-4">
                {requests
                  .filter((request) => request.status === "completed")
                  .map((request) => (
                    <Card key={request.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{request.title}</CardTitle>
                            <CardDescription>
                              Submitted by: {request.submittedBy} (Unit {request.unit}) on {request.date}
                            </CardDescription>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getPriorityBadge(request.priority)}
                            {getStatusBadge(request.status)}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p>{request.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            toast({
                              title: "View Details",
                              description: "Detailed view is not implemented in this demo.",
                            })
                          }
                        >
                          View Details
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </DashboardShell>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

