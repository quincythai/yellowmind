"use client"

import { DashboardShell } from "@/components/dashboard-shell"
import { EnhancedModuleHero } from "@/components/enhanced-module-hero"
import { EnhancedDailyShort } from "@/components/enhanced-daily-short"
import { EnhancedProgressSection } from "@/components/enhanced-progress-section"
import { EnhancedQuickActions } from "@/components/enhanced-quick-actions"
import { ActivitySidebar } from "@/components/activity-sidebar"
import { MindChatbot } from "@/components/mind-chatbot"

export function EnhancedDashboardPage() {
  return (
    <DashboardShell>
      <div className="grid gap-8 lg:grid-cols-4">
        {/* Main Content */}
        <div className="lg:col-span-3 flex flex-col gap-8">
          {/* Hero Section - Current Module */}
          <EnhancedModuleHero />

          {/* Stats & Progress Row */}
          <EnhancedProgressSection />

          {/* Quick Actions */}
          <EnhancedQuickActions />

          {/* Daily Content */}
          <EnhancedDailyShort />
        </div>

        {/* Activity Sidebar */}
        <div className="lg:col-span-1">
          <ActivitySidebar />
        </div>
      </div>

      {/* Sticky AI Chatbot */}
      <MindChatbot />
    </DashboardShell>
  )
}
