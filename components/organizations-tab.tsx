"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Eye, Building2, Search } from "lucide-react"

interface OrganizationsTabProps {
  userRole: "maker" | "checker"
}

export default function OrganizationsTab({ userRole }: OrganizationsTabProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const organizations = [
    {
      id: 1,
      name: "Bangkok Bank PCL",
      industry: "Financial Services",
      esgRating: "AA",
      reportsSubmitted: 12,
      lastReport: "2024-01-10",
      status: "Active",
      verified: true,
    },
    {
      id: 2,
      name: "PTT PCL",
      industry: "Energy",
      esgRating: "A",
      reportsSubmitted: 8,
      lastReport: "2024-01-08",
      status: "Active",
      verified: true,
    },
    {
      id: 3,
      name: "CP Foods",
      industry: "Food & Agriculture",
      esgRating: "BBB",
      reportsSubmitted: 15,
      lastReport: "2024-01-12",
      status: "Active",
      verified: false,
    },
    {
      id: 4,
      name: "Advanced Info Service",
      industry: "Technology",
      esgRating: "AA",
      reportsSubmitted: 6,
      lastReport: "2024-01-05",
      status: "Pending Verification",
      verified: false,
    },
  ]

  const filteredOrganizations = organizations.filter(
    (org) =>
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.industry.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Organization Management</h2>
          <p className="text-gray-600">Manage listed companies and their ESG data</p>
        </div>
        {userRole === "maker" && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Organization
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Organization</DialogTitle>
                <DialogDescription>Register a new listed company in the ESG reporting system</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" placeholder="e.g., ABC Corporation PCL" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock-symbol">Stock Symbol</Label>
                    <Input id="stock-symbol" placeholder="e.g., ABC" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry Sector</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="financial">Financial Services</SelectItem>
                        <SelectItem value="energy">Energy</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="food">Food & Agriculture</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="market-cap">Market Capitalization</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select market cap" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="large">Large Cap {">"}100B THB</SelectItem>
                        <SelectItem value="mid">Mid Cap (10-100B THB)</SelectItem>
                        <SelectItem value="small">Small Cap {"<"}10B THB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="listing-date">Listing Date</Label>
                    <Input id="listing-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employees">Number of Employees</Label>
                    <Input id="employees" type="number" placeholder="e.g., 5000" />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddDialogOpen(false)}>Add Organization</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search organizations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                <SelectItem value="financial">Financial Services</SelectItem>
                <SelectItem value="energy">Energy</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="food">Food & Agriculture</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Organizations Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Organizations</p>
                <p className="text-2xl font-bold">1,247</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div>
              <p className="text-sm text-gray-600">Verified Organizations</p>
              <p className="text-2xl font-bold text-green-600">1,089</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div>
              <p className="text-sm text-gray-600">Pending Verification</p>
              <p className="text-2xl font-bold text-orange-600">158</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div>
              <p className="text-sm text-gray-600">Average ESG Rating</p>
              <p className="text-2xl font-bold">A-</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Listed Companies</CardTitle>
          <CardDescription>Manage company profiles and ESG data verification status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company Name</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>ESG Rating</TableHead>
                <TableHead>Reports</TableHead>
                <TableHead>Last Report</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Verified</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrganizations.map((org) => (
                <TableRow key={org.id}>
                  <TableCell className="font-medium">{org.name}</TableCell>
                  <TableCell>{org.industry}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        org.esgRating.startsWith("A")
                          ? "default"
                          : org.esgRating.startsWith("B")
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {org.esgRating}
                    </Badge>
                  </TableCell>
                  <TableCell>{org.reportsSubmitted}</TableCell>
                  <TableCell>{org.lastReport}</TableCell>
                  <TableCell>
                    <Badge variant={org.status === "Active" ? "default" : "secondary"}>{org.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={org.verified ? "default" : "destructive"}>
                      {org.verified ? "Verified" : "Pending"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {userRole === "maker" && (
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
