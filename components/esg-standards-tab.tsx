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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Eye, Clock, CheckCircle } from "lucide-react"

interface ESGStandardsTabProps {
  userRole: "maker" | "checker"
}

export default function ESGStandardsTab({ userRole }: ESGStandardsTabProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const standards = [
    {
      id: 1,
      name: "GRI Standards 2023",
      version: "2023.1",
      industry: "All Industries",
      status: "Active",
      lastUpdated: "2024-01-10",
      pendingChanges: false,
    },
    {
      id: 2,
      name: "SASB Manufacturing",
      version: "2022.3",
      industry: "Manufacturing",
      status: "Active",
      lastUpdated: "2024-01-08",
      pendingChanges: true,
    },
    {
      id: 3,
      name: "TCFD Climate Risk",
      version: "2024.1",
      industry: "Financial Services",
      status: "Pending Approval",
      lastUpdated: "2024-01-15",
      pendingChanges: false,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">ESG Standards Management</h2>
          <p className="text-gray-600">Manage ESG reporting frameworks and standards</p>
        </div>
        {userRole === "maker" && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Standard
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New ESG Standard</DialogTitle>
                <DialogDescription>Create a new ESG reporting framework or standard</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Standard Name</Label>
                    <Input id="name" placeholder="e.g., GRI Standards 2024" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="version">Version</Label>
                    <Input id="version" placeholder="e.g., 2024.1" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Target Industry</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Industries</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="financial">Financial Services</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe the purpose and scope of this standard" rows={3} />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddDialogOpen(false)}>Submit for Approval</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Standards</CardTitle>
          <CardDescription>Manage existing ESG reporting standards and frameworks</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Standard Name</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {standards.map((standard) => (
                <TableRow key={standard.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {standard.name}
                      {standard.pendingChanges && (
                        <Badge variant="outline" className="text-orange-600">
                          <Clock className="h-3 w-3 mr-1" />
                          Pending
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{standard.version}</TableCell>
                  <TableCell>{standard.industry}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        standard.status === "Active"
                          ? "default"
                          : standard.status === "Pending Approval"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {standard.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{standard.lastUpdated}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {userRole === "maker" && standard.status === "Active" && (
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      {userRole === "checker" && standard.status === "Pending Approval" && (
                        <Button variant="ghost" size="sm">
                          <CheckCircle className="h-4 w-4" />
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
