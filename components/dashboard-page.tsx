"use client"

import { DashboardShell } from "@/components/dashboard-shell"
import { SimpleModuleHero } from "@/components/simple-module-hero"
import { TodaysMindShort } from "@/components/todays-mind-short"
import { RightSidebarCards } from "@/components/right-sidebar-cards"
import { MindChatbot } from "@/components/mind-chatbot"

export function DashboardPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-8">
        {/* Hero Section */}
        <SimpleModuleHero />

        {/* Main grid: Daily Short (⅔) | Stacked Cards (⅓) */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TodaysMindShort />
          </div>
          <div className="lg:col-span-1">
            <RightSidebarCards />
          </div>
        </div>
      </div>

      {/* Sticky AI Chatbot */}
      <MindChatbot />
    </DashboardShell>
  )
}
