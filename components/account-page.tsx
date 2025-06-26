"use client"
import { DashboardShell } from "@/components/dashboard-shell"
import { AccountTabs } from "@/components/account-tabs"
import { MindChatbot } from "@/components/mind-chatbot"

export function AccountPage() {
  return (
    <DashboardShell>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <p className="text-muted-foreground text-lg">Manage your account preferences and billing information</p>
        </div>

        {/* Account Tabs */}
        <AccountTabs />
      </div>

      <MindChatbot />
    </DashboardShell>
  )
}
