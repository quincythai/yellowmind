"use client";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ModulesList } from "@/components/modules-list";
import { CourseProgress } from "@/components/course-progress";
import { MindChatbot } from "@/components/mind-chatbot";

export function ModulesPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-8">
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Course Modules</h1>
          <p className="text-muted-foreground text-lg">
            Master emotional intelligence through our comprehensive learning
            modules
          </p>
        </div>

        {/* Course Progress Overview */}
        <CourseProgress />

        {/* Modules List */}
        <ModulesList />
      </div>

      {/* AI Chatbot */}
      <MindChatbot />
    </DashboardShell>
  );
}
