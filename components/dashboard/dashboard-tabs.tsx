"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DashboardTabsProps {
  activeTab: string
  setActiveTab: (value: string) => void
}

export function DashboardTabs({ activeTab, setActiveTab }: DashboardTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3 md:w-auto">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="courses">Courses</TabsTrigger>
        <TabsTrigger value="schedule">Schedule</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
