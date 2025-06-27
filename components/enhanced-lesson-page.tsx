"use client";

import { useState } from "react";
import { LessonSidebar } from "@/components/lesson-sidebar";
import { VideoPlayer } from "@/components/video-player";
import { LessonHeader } from "@/components/lesson-header";
import { MindChatbot } from "@/components/mind-chatbot";

export function LessonPage() {
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      {/* Sidebar */}
      <LessonSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <LessonHeader />

        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <VideoPlayer
              isCompleted={isCompleted}
              onComplete={() => setIsCompleted(true)}
            />
          </div>
        </main>
      </div>

      {/* AI Chatbot */}
      <MindChatbot />
    </div>
  );
}
