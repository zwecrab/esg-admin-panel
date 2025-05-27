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
import { Plus, Edit, Eye, Shield } from "lucide-react"

interface ComplianceTabProps {
  userRole: "maker" | "checker"
}

export default function ComplianceTab({ userRole }: ComplianceTabProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const complianceRules = [
    {
      id: 1,
      name: "Manufacturing ESG Requirements",
      industry: "Manufacturing",
      ratingMethod: "SET ESG Ratings",
      mandatoryFields: 15,
      validationRules: 8,
      status: "Active",
    },
    {
      id: 2,
      name: "Financial Services Compliance",
      industry: "Financial Services",
      ratingMethod: "FTSE Russell",
      mandatoryFields: 22,
      validationRules: 12,
      status: "Active",
    },
    {
      id: 3,
      name: "Technology Sector Rules",
      industry: "Technology",
      ratingMethod: "SET ESG Ratings",
      mandatoryFields: 18,
      validationRules: 10,
      status: "Pending Approval",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Compliance Rules Management</h2>
          <p className="text-gray-600">Configure validation rules and ESG rating methodologies</p>
        </div>
        {userRole === "maker" && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Compliance Rule
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Compliance Rule</DialogTitle>
                <DialogDescription>
                  Create industry-specific compliance requirements and validation rules
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rule-name">Rule Name</Label>
                    <Input id="rule-name" placeholder="e.g., Healthcare ESG Requirements" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Target Industry</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="financial">Financial Services</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="energy">Energy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating-method">ESG Rating Method</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select rating methodology" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="set-esg">SET ESG Ratings</SelectItem>
                      <SelectItem value="ftse-russell">FTSE Russell</SelectItem>
                      <SelectItem value="msci">MSCI ESG Ratings</SelectItem>
                      <SelectItem value="sustainalytics">Sustainalytics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Rule Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the compliance requirements and validation criteria"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="threshold-min">Minimum Threshold</Label>
                    <Input id="threshold-min" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="threshold-max">Maximum Threshold</Label>
                    <Input id="threshold-max" type="number" placeholder="100" />
                  </div>
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

      {/* ESG Rating Methods Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              SET ESG Ratings
            </CardTitle>
            <CardDescription>Stock Exchange of Thailand ESG rating methodology</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Active Rules:</span>
                <Badge>8</Badge>
              </div>
              <div className="flex justify-between">
                <span>Industries Covered:</span>
                <Badge variant="secondary">12</Badge>
              </div>
              <div className="flex justify-between">
                <span>Rating Scale:</span>
                <span className="text-sm">AAA to CCC</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              FTSE Russell
            </CardTitle>
            <CardDescription>FTSE Russell ESG rating methodology</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Active Rules:</span>
                <Badge>5</Badge>
              </div>
              <div className="flex justify-between">
                <span>Industries Covered:</span>
                <Badge variant="secondary">8</Badge>
              </div>
              <div className="flex justify-between">
                <span>Rating Scale:</span>
                <span className="text-sm">0-5 Scale</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Compliance Rules</CardTitle>
          <CardDescription>Industry-specific compliance requirements and validation rules</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rule Name</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Rating Method</TableHead>
                <TableHead>Mandatory Fields</TableHead>
                <TableHead>Validation Rules</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complianceRules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell className="font-medium">{rule.name}</TableCell>
                  <TableCell>{rule.industry}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{rule.ratingMethod}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge>{rule.mandatoryFields}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{rule.validationRules}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={rule.status === "Active" ? "default" : "secondary"}>{rule.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {userRole === "maker" && rule.status === "Active" && (
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
