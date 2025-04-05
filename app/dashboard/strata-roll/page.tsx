"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Label } from "@/components/ui/label"
import { Search, Plus, Bell, Mail, Phone, Edit, Trash } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// Mock data for strata roll
const mockOwners = [
  {
    id: 1,
    unit: "101",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+61 2 9876 5432",
    entitlement: 12.5,
  },
  {
    id: 2,
    unit: "102",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+61 2 9876 1234",
    entitlement: 10.2,
  },
  {
    id: 3,
    unit: "103",
    name: "Michael Wong",
    email: "michael.wong@example.com",
    phone: "+61 2 9876 4321",
    entitlement: 11.8,
  },
  {
    id: 4,
    unit: "104",
    name: "Emma Taylor",
    email: "emma.taylor@example.com",
    phone: "+61 2 9876 2345",
    entitlement: 9.5,
  },
  {
    id: 5,
    unit: "105",
    name: "David Chen",
    email: "david.chen@example.com",
    phone: "+61 2 9876 3456",
    entitlement: 10.8,
  },
  {
    id: 6,
    unit: "201",
    name: "Jessica Brown",
    email: "jessica.brown@example.com",
    phone: "+61 2 9876 6543",
    entitlement: 12.5,
  },
  {
    id: 7,
    unit: "202",
    name: "Robert Wilson",
    email: "robert.wilson@example.com",
    phone: "+61 2 9876 7654",
    entitlement: 10.2,
  },
  {
    id: 8,
    unit: "203",
    name: "Lisa Martin",
    email: "lisa.martin@example.com",
    phone: "+61 2 9876 8765",
    entitlement: 11.8,
  },
]

export default function StrataRoll() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [owners, setOwners] = useState(mockOwners)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newOwner, setNewOwner] = useState({
    unit: "",
    name: "",
    email: "",
    phone: "",
    entitlement: "",
  })
  const [editingOwner, setEditingOwner] = useState<null | {
    id: number
    unit: string
    name: string
    email: string
    phone: string
    entitlement: number
  }>(null)

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

  const filteredOwners = owners.filter(
    (owner) =>
      owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      owner.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      owner.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewOwner((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingOwner) {
      // Update existing owner
      const updatedOwners = owners.map((owner) =>
        owner.id === editingOwner.id
          ? {
              ...owner,
              unit: newOwner.unit,
              name: newOwner.name,
              email: newOwner.email,
              phone: newOwner.phone,
              entitlement: Number.parseFloat(newOwner.entitlement),
            }
          : owner,
      )

      setOwners(updatedOwners)
      toast({
        title: "Owner updated",
        description: `${newOwner.name} has been updated successfully.`,
      })
    } else {
      // Add new owner
      const newId = Math.max(...owners.map((o) => o.id)) + 1

      const owner = {
        id: newId,
        unit: newOwner.unit,
        name: newOwner.name,
        email: newOwner.email,
        phone: newOwner.phone,
        entitlement: Number.parseFloat(newOwner.entitlement),
      }

      setOwners([...owners, owner])
      toast({
        title: "Owner added",
        description: `${owner.name} has been added to the strata roll.`,
      })
    }

    // Reset form and close dialog
    setNewOwner({
      unit: "",
      name: "",
      email: "",
      phone: "",
      entitlement: "",
    })
    setEditingOwner(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (owner: any) => {
    setEditingOwner(owner)
    setNewOwner({
      unit: owner.unit,
      name: owner.name,
      email: owner.email,
      phone: owner.phone,
      entitlement: owner.entitlement.toString(),
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    const ownerToDelete = owners.find((owner) => owner.id === id)

    if (confirm(`Are you sure you want to remove ${ownerToDelete?.name} from the strata roll?`)) {
      setOwners(owners.filter((owner) => owner.id !== id))
      toast({
        title: "Owner removed",
        description: `${ownerToDelete?.name} has been removed from the strata roll.`,
      })
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
        <DashboardHeader heading="Strata Roll" text="View and manage owner information and unit entitlements.">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Owner
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>{editingOwner ? "Edit Owner" : "Add New Owner"}</DialogTitle>
                <DialogDescription>
                  {editingOwner
                    ? "Update the owner information in the strata roll."
                    : "Add a new owner to the strata roll."}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="unit">Unit Number</Label>
                    <Input
                      id="unit"
                      name="unit"
                      value={newOwner.unit}
                      onChange={handleInputChange}
                      placeholder="e.g. 101"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="name">Owner Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={newOwner.name}
                      onChange={handleInputChange}
                      placeholder="Full name"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={newOwner.email}
                      onChange={handleInputChange}
                      placeholder="Email address"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={newOwner.phone}
                      onChange={handleInputChange}
                      placeholder="Phone number"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="entitlement">Unit Entitlement (%)</Label>
                    <Input
                      id="entitlement"
                      name="entitlement"
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      value={newOwner.entitlement}
                      onChange={handleInputChange}
                      placeholder="e.g. 10.5"
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">{editingOwner ? "Update" : "Add"}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </DashboardHeader>

        <DashboardShell>
          <div className="flex items-center justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name, unit, or email..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Unit</TableHead>
                  <TableHead>Owner Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Unit Entitlement</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOwners.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No owners found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOwners.map((owner) => (
                    <TableRow key={owner.id}>
                      <TableCell className="font-medium">{owner.unit}</TableCell>
                      <TableCell>{owner.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{owner.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{owner.phone}</span>
                        </div>
                      </TableCell>
                      <TableCell>{owner.entitlement}%</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(owner)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(owner.id)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </DashboardShell>
      </div>
    </div>
  )
}

