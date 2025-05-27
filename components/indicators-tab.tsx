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
import { Plus, Edit, Eye, Filter } from "lucide-react"

interface IndicatorsTabProps {
  userRole: "maker" | "checker"
}

export default function IndicatorsTab({ userRole }: IndicatorsTabProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [filterCategory, setFilterCategory] = useState("all")

  const indicators = [
    {
      id: 1,
      name: "Carbon Emissions (Scope 1)",
      category: "Environmental",
      subcategory: "Climate Change",
      dataType: "Numeric",
      unit: "tCO2e",
      mandatory: true,
      status: "Active",
    },
    {
      id: 2,
      name: "Water Consumption",
      category: "Environmental",
      subcategory: "Water Management",
      dataType: "Numeric",
      unit: "m³",
      mandatory: false,
      status: "Active",
    },
    {
      id: 3,
      name: "Employee Diversity Ratio",
      category: "Social",
      subcategory: "Diversity & Inclusion",
      dataType: "Percentage",
      unit: "%",
      mandatory: true,
      status: "Active",
    },
    {
      id: 4,
      name: "Board Independence",
      category: "Governance",
      subcategory: "Board Composition",
      dataType: "Percentage",
      unit: "%",
      mandatory: true,
      status: "Pending Approval",
    },
  ]

  const filteredIndicators =
    filterCategory === "all"
      ? indicators
      : indicators.filter((indicator) => indicator.category.toLowerCase() === filterCategory)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">ESG Indicators Management</h2>
          <p className="text-gray-600">Manage environmental, social, and governance metrics</p>
        </div>
        {userRole === "maker" && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Indicator
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New ESG Indicator</DialogTitle>
                <DialogDescription>Create a new environmental, social, or governance metric</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="indicator-name">Indicator Name</Label>
                    <Input id="indicator-name" placeholder="e.g., Carbon Emissions" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">ESG Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="environmental">Environmental</SelectItem>
                        <SelectItem value="social">Social</SelectItem>
                        <SelectItem value="governance">Governance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subcategory">Subcategory</Label>
                    <Input id="subcategory" placeholder="e.g., Climate Change" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="data-type">Data Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select data type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="numeric">Numeric</SelectItem>
                        <SelectItem value="percentage">Percentage</SelectItem>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="dropdown">Dropdown</SelectItem>
                        <SelectItem value="file">File Upload</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit of Measurement</Label>
                    <Input id="unit" placeholder="e.g., tCO2e, %, m³" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mandatory">Mandatory Field</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select requirement" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Mandatory</SelectItem>
                        <SelectItem value="false">Optional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe how this indicator should be calculated or measured"
                    rows={3}
                  />
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

      {/* Filter Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Filter className="h-4 w-4" />
            <Label>Filter by Category:</Label>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="environmental">Environmental</SelectItem>
                <SelectItem value="social">Social</SelectItem>
                <SelectItem value="governance">Governance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ESG Indicators</CardTitle>
          <CardDescription>
            Manage environmental, social, and governance metrics and their configurations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Indicator Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Subcategory</TableHead>
                <TableHead>Data Type</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Required</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIndicators.map((indicator) => (
                <TableRow key={indicator.id}>
                  <TableCell className="font-medium">{indicator.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        indicator.category === "Environmental"
                          ? "default"
                          : indicator.category === "Social"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {indicator.category}
                    </Badge>
                  </TableCell>
                  <TableCell>{indicator.subcategory}</TableCell>
                  <TableCell>{indicator.dataType}</TableCell>
                  <TableCell>{indicator.unit}</TableCell>
                  <TableCell>
                    <Badge variant={indicator.mandatory ? "destructive" : "secondary"}>
                      {indicator.mandatory ? "Mandatory" : "Optional"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={indicator.status === "Active" ? "default" : "secondary"}>{indicator.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {userRole === "maker" && indicator.status === "Active" && (
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
