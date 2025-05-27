"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Building2, Users, FileText, AlertCircle, CheckCircle, Clock, DollarSign } from "lucide-react"
import Sidebar from "@/components/sidebar"
import ESGStandardsTab from "@/components/esg-standards-tab"
import IndicatorsTab from "@/components/indicators-tab"
import ComplianceTab from "@/components/compliance-tab"
import OrganizationsTab from "@/components/organizations-tab"
import UsersTab from "@/components/users-tab"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [userRole, setUserRole] = useState<"maker" | "checker">("maker")

  const overviewStats = [
    {
      title: "Registered Organizations",
      value: "1,247",
      change: "+12%",
      icon: Building2,
      color: "text-blue-600",
    },
    {
      title: "ESG Reports Generated",
      value: "3,892",
      change: "+8%",
      icon: FileText,
      color: "text-green-600",
    },
    {
      title: "Active Users",
      value: "5,634",
      change: "+15%",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Total Revenue",
      value: "$284,590",
      change: "+23%",
      icon: DollarSign,
      color: "text-orange-600",
    },
  ]

  const pendingApprovals = [
    {
      id: 1,
      type: "ESG Standard",
      name: "TCFD Climate Risk Framework v2.1",
      submitter: "John Doe",
      date: "2024-01-15",
    },
    { id: 2, type: "Indicator", name: "Water Consumption Efficiency", submitter: "Jane Smith", date: "2024-01-14" },
    {
      id: 3,
      type: "Compliance Rule",
      name: "Manufacturing Industry Requirements",
      submitter: "Mike Johnson",
      date: "2024-01-13",
    },
  ]

  const esgRatingsDistribution = [
    { rating: "AAA", count: 45, percentage: 15 },
    { rating: "AA", count: 89, percentage: 30 },
    { rating: "A", count: 67, percentage: 22 },
    { rating: "BBB", count: 56, percentage: 19 },
    { rating: "BB", count: 28, percentage: 9 },
    { rating: "B", count: 12, percentage: 4 },
    { rating: "CCC", count: 3, percentage: 1 },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} userRole={userRole} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ESG Admin Panel</h1>
              <p className="text-gray-600">Manage ESG reporting standards and compliance</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant={userRole === "maker" ? "default" : "secondary"}>
                {userRole === "maker" ? "Maker" : "Checker"}
              </Badge>
              <Button variant="outline" onClick={() => setUserRole(userRole === "maker" ? "checker" : "maker")}>
                Switch to {userRole === "maker" ? "Checker" : "Maker"}
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="overview" className="space-y-6">
              {/* Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {overviewStats.map((stat, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                          <p className="text-2xl font-bold">{stat.value}</p>
                          <p className="text-sm text-green-600">{stat.change} from last month</p>
                        </div>
                        <stat.icon className={`h-8 w-8 ${stat.color}`} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* ESG Ratings Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle>ESG Ratings Distribution</CardTitle>
                    <CardDescription>Current distribution of ESG ratings across organizations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {esgRatingsDistribution.map((item) => (
                        <div key={item.rating} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Badge
                              variant={
                                item.rating.startsWith("A")
                                  ? "default"
                                  : item.rating.startsWith("B")
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {item.rating}
                            </Badge>
                            <span className="text-sm text-gray-600">{item.count} organizations</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${item.percentage}%` }} />
                            </div>
                            <span className="text-sm font-medium">{item.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Pending Approvals */}
                {userRole === "checker" && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Pending Approvals
                      </CardTitle>
                      <CardDescription>Items waiting for your approval</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {pendingApprovals.map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-600">
                                {item.type} • by {item.submitter} • {item.date}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <AlertCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="standards">
              <ESGStandardsTab userRole={userRole} />
            </TabsContent>

            <TabsContent value="indicators">
              <IndicatorsTab userRole={userRole} />
            </TabsContent>

            <TabsContent value="compliance">
              <ComplianceTab userRole={userRole} />
            </TabsContent>

            <TabsContent value="organizations">
              <OrganizationsTab userRole={userRole} />
            </TabsContent>

            <TabsContent value="users">
              <UsersTab userRole={userRole} />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
