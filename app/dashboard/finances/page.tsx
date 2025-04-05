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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bell, DollarSign, Download, FileText, Send } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// Mock data for levies
const mockLevies = [
  {
    id: 1,
    unit: "101",
    amount: 1250.0,
    dueDate: "2023-05-15",
    status: "pending",
    period: "Quarter 2, 2023",
  },
  {
    id: 2,
    unit: "102",
    amount: 1020.0,
    dueDate: "2023-05-15",
    status: "pending",
    period: "Quarter 2, 2023",
  },
  {
    id: 3,
    unit: "103",
    amount: 1180.0,
    dueDate: "2023-05-15",
    status: "pending",
    period: "Quarter 2, 2023",
  },
  {
    id: 4,
    unit: "101",
    amount: 1250.0,
    dueDate: "2023-02-15",
    status: "paid",
    period: "Quarter 1, 2023",
  },
  {
    id: 5,
    unit: "102",
    amount: 1020.0,
    dueDate: "2023-02-15",
    status: "paid",
    period: "Quarter 1, 2023",
  },
  {
    id: 6,
    unit: "103",
    amount: 1180.0,
    dueDate: "2023-02-15",
    status: "paid",
    period: "Quarter 1, 2023",
  },
]

// Mock data for budget
const mockBudget = {
  income: [
    { category: "Quarterly Levies", amount: 30000.0 },
    { category: "Special Levies", amount: 5000.0 },
    { category: "Interest", amount: 250.0 },
  ],
  expenses: [
    { category: "Building Insurance", amount: 12000.0 },
    { category: "Maintenance", amount: 8000.0 },
    { category: "Utilities", amount: 6000.0 },
    { category: "Administration", amount: 4000.0 },
    { category: "Sinking Fund", amount: 5000.0 },
  ],
}

export default function Finances() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [levies, setLevies] = useState(mockLevies)
  const [budget, setBudget] = useState(mockBudget)
  const [isLevyDialogOpen, setIsLevyDialogOpen] = useState(false)
  const [newLevy, setNewLevy] = useState({
    unit: "",
    amount: "",
    dueDate: "",
    period: "",
  })

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
    setNewLevy((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitLevy = (e: React.FormEvent) => {
    e.preventDefault()

    const newId = Math.max(...levies.map((l) => l.id)) + 1

    const levy = {
      id: newId,
      unit: newLevy.unit,
      amount: Number.parseFloat(newLevy.amount),
      dueDate: newLevy.dueDate,
      status: "pending",
      period: newLevy.period,
    }

    setLevies([levy, ...levies])
    setNewLevy({
      unit: "",
      amount: "",
      dueDate: "",
      period: "",
    })
    setIsLevyDialogOpen(false)

    toast({
      title: "Levy created",
      description: `Levy for Unit ${levy.unit} has been created.`,
    })
  }

  const handleGenerateNotice = (levy: any) => {
    toast({
      title: "Levy notice generated",
      description: `Levy notice for Unit ${levy.unit} has been generated and is ready for download.`,
    })
  }

  const handleSendNotice = (levy: any) => {
    toast({
      title: "Levy notice sent",
      description: `Levy notice for Unit ${levy.unit} has been sent to the owner.`,
    })
  }

  const calculateTotalIncome = () => {
    return budget.income.reduce((total, item) => total + item.amount, 0)
  }

  const calculateTotalExpenses = () => {
    return budget.expenses.reduce((total, item) => total + item.amount, 0)
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
        <DashboardHeader heading="Financial Management" text="Manage levies and budget for your strata scheme.">
          <Dialog open={isLevyDialogOpen} onOpenChange={setIsLevyDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <DollarSign className="mr-2 h-4 w-4" />
                Create Levy
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Levy</DialogTitle>
                <DialogDescription>Create a new levy for a unit in your strata scheme.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmitLevy}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="unit">Unit Number</Label>
                    <Input
                      id="unit"
                      name="unit"
                      value={newLevy.unit}
                      onChange={handleInputChange}
                      placeholder="e.g. 101"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="amount">Amount ($)</Label>
                    <Input
                      id="amount"
                      name="amount"
                      type="number"
                      step="0.01"
                      min="0"
                      value={newLevy.amount}
                      onChange={handleInputChange}
                      placeholder="e.g. 1250.00"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input
                      id="dueDate"
                      name="dueDate"
                      type="date"
                      value={newLevy.dueDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="period">Period</Label>
                    <Input
                      id="period"
                      name="period"
                      value={newLevy.period}
                      onChange={handleInputChange}
                      placeholder="e.g. Quarter 2, 2023"
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create Levy</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </DashboardHeader>

        <Tabs defaultValue="levies" className="space-y-4">
          <TabsList>
            <TabsTrigger value="levies">Levies</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
          </TabsList>

          <TabsContent value="levies" className="space-y-4">
            <DashboardShell>
              <Card>
                <CardHeader>
                  <CardTitle>Levy Management</CardTitle>
                  <CardDescription>View and manage levy notices for all units</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Unit</TableHead>
                        <TableHead>Period</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {levies.map((levy) => (
                        <TableRow key={levy.id}>
                          <TableCell className="font-medium">{levy.unit}</TableCell>
                          <TableCell>{levy.period}</TableCell>
                          <TableCell>${levy.amount.toFixed(2)}</TableCell>
                          <TableCell>{new Date(levy.dueDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                levy.status === "paid"
                                  ? "bg-green-100 text-green-800"
                                  : levy.status === "overdue"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {levy.status.charAt(0).toUpperCase() + levy.status.slice(1)}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => handleGenerateNotice(levy)}>
                              <Download className="h-4 w-4 mr-1" />
                              Generate
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleSendNotice(levy)}>
                              <Send className="h-4 w-4 mr-1" />
                              Send
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </DashboardShell>
          </TabsContent>

          <TabsContent value="budget" className="space-y-4">
            <DashboardShell>
              <Card>
                <CardHeader>
                  <CardTitle>Annual Budget</CardTitle>
                  <CardDescription>Financial year 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Income</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Category</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {budget.income.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>{item.category}</TableCell>
                              <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                            </TableRow>
                          ))}
                          <TableRow>
                            <TableCell className="font-bold">Total Income</TableCell>
                            <TableCell className="text-right font-bold">${calculateTotalIncome().toFixed(2)}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Expenses</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Category</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {budget.expenses.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>{item.category}</TableCell>
                              <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                            </TableRow>
                          ))}
                          <TableRow>
                            <TableCell className="font-bold">Total Expenses</TableCell>
                            <TableCell className="text-right font-bold">
                              ${calculateTotalExpenses().toFixed(2)}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>

                  <div className="mt-8 p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Balance</h3>
                      <span
                        className={`text-xl font-bold ${
                          calculateTotalIncome() - calculateTotalExpenses() >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        ${(calculateTotalIncome() - calculateTotalExpenses()).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    onClick={() =>
                      toast({
                        title: "Budget Report",
                        description: "Budget report has been generated and is ready for download.",
                      })
                    }
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Budget Report
                  </Button>
                </CardFooter>
              </Card>
            </DashboardShell>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

