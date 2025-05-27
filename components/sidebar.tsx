"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Building2, Users, Shield, TrendingUp, Leaf } from "lucide-react"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  userRole: "maker" | "checker"
}

export default function Sidebar({ activeTab, setActiveTab, userRole }: SidebarProps) {
  const menuItems = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "standards", label: "ESG Standards", icon: Leaf },
    { id: "indicators", label: "ESG Indicators", icon: TrendingUp },
    { id: "compliance", label: "Compliance Rules", icon: Shield },
    { id: "organizations", label: "Organizations", icon: Building2 },
    { id: "users", label: "User Management", icon: Users },
  ]

  return (
    <div className="w-64 bg-white shadow-lg border-r">
      <div className="p-6 border-b">
        <div className="flex items-center gap-2">
          <Leaf className="h-8 w-8 text-green-600" />
          <div>
            <h2 className="text-xl font-bold">ESG Studio</h2>
            <p className="text-sm text-gray-600">Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon className="h-4 w-4 mr-2" />
            {item.label}
          </Button>
        ))}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium">Current Role</p>
          <Badge variant={userRole === "maker" ? "default" : "secondary"} className="mt-1">
            {userRole === "maker" ? "Maker" : "Checker"}
          </Badge>
        </div>
      </div>
    </div>
  )
}
