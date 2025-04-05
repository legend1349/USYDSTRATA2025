"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Overview } from "@/components/overview"
import { RecentActivity } from "@/components/recent-activity"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Building, FileText, PenToolIcon as Tool, DollarSign, Users, Bell } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function Dashboard() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

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
        <DashboardHeader
          heading="Dashboard"
          text="Welcome to your strata management portal."
          actionHref="/dashboard/documents"
          actionIcon={<FileText className="mr-2 h-4 w-4" />}
          actionText="View Documents"
        />
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="finances">Finances</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Units</CardTitle>
                  <Building className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">In your strata scheme</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Maintenance Requests</CardTitle>
                  <Tool className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">Open requests</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Levies</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$1,250</div>
                  <p className="text-xs text-muted-foreground">Due in 14 days</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Committee Members</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">Active members</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates from your strata scheme</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentActivity />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="maintenance" className="space-y-4">
            <DashboardShell>
              <DashboardHeader
                heading="Maintenance Requests"
                text="View and manage maintenance requests for your property."
                actionHref="/dashboard/maintenance"
                actionIcon={<Tool className="mr-2 h-4 w-4" />}
                actionText="New Request"
              />
              <div className="grid gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Maintenance Requests</CardTitle>
                    <CardDescription>View and track the status of all maintenance requests</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">Leaking Tap in Common Area</h3>
                            <p className="text-sm text-muted-foreground">Submitted by: John Smith</p>
                            <p className="text-sm text-muted-foreground">Date: 2023-04-15</p>
                          </div>
                          <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
                            In Progress
                          </div>
                        </div>
                        <p className="mt-2 text-sm">The tap in the common area bathroom is leaking and needs repair.</p>
                      </div>

                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">Broken Light in Stairwell</h3>
                            <p className="text-sm text-muted-foreground">Submitted by: Sarah Johnson</p>
                            <p className="text-sm text-muted-foreground">Date: 2023-04-10</p>
                          </div>
                          <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                            Scheduled
                          </div>
                        </div>
                        <p className="mt-2 text-sm">
                          The light in the stairwell between floors 2 and 3 is not working.
                        </p>
                      </div>

                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">Intercom System Issues</h3>
                            <p className="text-sm text-muted-foreground">Submitted by: Michael Wong</p>
                            <p className="text-sm text-muted-foreground">Date: 2023-04-05</p>
                          </div>
                          <div className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">Pending</div>
                        </div>
                        <p className="mt-2 text-sm">The intercom system is not working properly for units 101-105.</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/dashboard/maintenance">View All Requests</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </DashboardShell>
          </TabsContent>
          <TabsContent value="finances" className="space-y-4">
            <DashboardShell>
              <DashboardHeader
                heading="Financial Management"
                text="View and manage financial information for your strata scheme."
                actionHref="/dashboard/finances"
                actionIcon={<DollarSign className="mr-2 h-4 w-4" />}
                actionText="View Budget"
              />
              <div className="grid gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Levy Information</CardTitle>
                    <CardDescription>View your current and upcoming levy payments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold">Quarter 2, 2023</h3>
                            <p className="text-sm text-muted-foreground">Due: May 15, 2023</p>
                          </div>
                          <div className="text-xl font-bold">$1,250.00</div>
                        </div>
                        <div className="mt-4 flex justify-between">
                          <span className="text-sm text-muted-foreground">Status:</span>
                          <span className="text-sm font-medium text-yellow-600">Upcoming</span>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold">Quarter 1, 2023</h3>
                            <p className="text-sm text-muted-foreground">Due: February 15, 2023</p>
                          </div>
                          <div className="text-xl font-bold">$1,250.00</div>
                        </div>
                        <div className="mt-4 flex justify-between">
                          <span className="text-sm text-muted-foreground">Status:</span>
                          <span className="text-sm font-medium text-green-600">Paid</span>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold">Quarter 4, 2022</h3>
                            <p className="text-sm text-muted-foreground">Due: November 15, 2022</p>
                          </div>
                          <div className="text-xl font-bold">$1,250.00</div>
                        </div>
                        <div className="mt-4 flex justify-between">
                          <span className="text-sm text-muted-foreground">Status:</span>
                          <span className="text-sm font-medium text-green-600">Paid</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/dashboard/finances">View Payment History</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </DashboardShell>
          </TabsContent>
          <TabsContent value="documents" className="space-y-4">
            <DashboardShell>
              <DashboardHeader
                heading="Documents"
                text="Access and download important strata documents."
                actionHref="/dashboard/documents"
                actionIcon={<FileText className="mr-2 h-4 w-4" />}
                actionText="Upload Document"
              />
              <div className="grid gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Important Documents</CardTitle>
                    <CardDescription>Access key documents for your strata scheme</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 mr-2 text-blue-600" />
                            <div>
                              <h3 className="font-semibold">Insurance Certificate</h3>
                              <p className="text-sm text-muted-foreground">Uploaded: March 10, 2023</p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              toast({ title: "Download Started", description: "Your document download has started." })
                            }
                          >
                            Download
                          </Button>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 mr-2 text-blue-600" />
                            <div>
                              <h3 className="font-semibold">AGM Minutes</h3>
                              <p className="text-sm text-muted-foreground">Uploaded: February 25, 2023</p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              toast({ title: "Download Started", description: "Your document download has started." })
                            }
                          >
                            Download
                          </Button>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 mr-2 text-blue-600" />
                            <div>
                              <h3 className="font-semibold">Financial Report 2022</h3>
                              <p className="text-sm text-muted-foreground">Uploaded: January 15, 2023</p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              toast({ title: "Download Started", description: "Your document download has started." })
                            }
                          >
                            Download
                          </Button>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 mr-2 text-blue-600" />
                            <div>
                              <h3 className="font-semibold">By-Laws</h3>
                              <p className="text-sm text-muted-foreground">Uploaded: December 5, 2022</p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              toast({ title: "Download Started", description: "Your document download has started." })
                            }
                          >
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/dashboard/documents">View All Documents</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </DashboardShell>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

