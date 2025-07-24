"use client"

import { useAuth } from "@/hooks/use-auth"
import { AdminLogin } from "@/components/admin-login"
import { AdminDashboard } from "@/components/admin-dashboard"
import { Loader2 } from "lucide-react"

export default function AdminPage() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return <AdminLogin />
  }

  return <AdminDashboard />
}
