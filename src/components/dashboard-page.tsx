"use client"
import { DashboardShell } from "@/components/dashboard-shell"
import { ModuleHero } from "@/components/module-hero"
import { DailyShort } from "@/components/daily-short"
import { ProgressSection } from "@/components/progress-section"
import { QuickActions } from "@/components/quick-actions"
import { MindChatbot } from "@/components/mind-chatbot"

export function DashboardPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-8">
        {/* Hero Section - Current Module */}
        <ModuleHero />

        {/* Daily Content & Progress */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <DailyShort />
          </div>
          <div>
            <ProgressSection />
          </div>
        </div>

        {/* Quick Actions */}
        <QuickActions />
      </div>

      {/* Sticky AI Chatbot */}
      <MindChatbot />
    </DashboardShell>
  )
}
