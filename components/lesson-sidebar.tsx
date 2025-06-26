"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ChevronLeft,
  Brain,
  Users,
  Search,
  ChevronDown,
  ChevronRight,
  Play,
  CheckCircle2,
  Clock,
  FileText,
} from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function LessonSidebar() {
  const [expandedModules, setExpandedModules] = useState<string[]>(["module-3"])

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => (prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]))
  }

  const modules = [
    {
      id: "welcome",
      title: "Welcome to the Course",
      completed: 2,
      total: 2,
      lessons: [
        { id: "intro", title: "Course Introduction", type: "video", duration: "5 min", completed: true },
        { id: "overview", title: "What You'll Learn", type: "video", duration: "8 min", completed: true },
      ],
    },
    {
      id: "module-1",
      title: "Foundation of Self-Awareness",
      completed: 0,
      total: 4,
      lessons: [
        {
          id: "self-awareness-intro",
          title: "Understanding Self-Awareness",
          type: "video",
          duration: "12 min",
          completed: false,
        },
        {
          id: "emotional-patterns",
          title: "Recognizing Emotional Patterns",
          type: "video",
          duration: "15 min",
          completed: false,
        },
        {
          id: "reflection-exercise",
          title: "Daily Reflection Practice",
          type: "exercise",
          duration: "10 min",
          completed: false,
        },
        { id: "awareness-quiz", title: "Self-Awareness Assessment", type: "quiz", duration: "5 min", completed: false },
      ],
    },
    {
      id: "module-2",
      title: "Emotional Intelligence Basics",
      completed: 1,
      total: 5,
      lessons: [
        {
          id: "eq-intro",
          title: "What is Emotional Intelligence?",
          type: "video",
          duration: "10 min",
          completed: true,
        },
        { id: "four-domains", title: "The Four Domains of EQ", type: "video", duration: "18 min", completed: false },
        {
          id: "self-regulation",
          title: "Self-Regulation Techniques",
          type: "video",
          duration: "14 min",
          completed: false,
        },
        { id: "empathy-skills", title: "Developing Empathy", type: "video", duration: "16 min", completed: false },
        { id: "eq-practice", title: "EQ in Daily Life", type: "exercise", duration: "15 min", completed: false },
      ],
    },
    {
      id: "module-3",
      title: "Advanced Emotional Mastery",
      completed: 2,
      total: 6,
      lessons: [
        {
          id: "emotional-triggers",
          title: "Understanding Emotional Triggers",
          type: "video",
          duration: "12 min",
          completed: true,
        },
        {
          id: "trigger-management",
          title: "Managing Your Triggers",
          type: "video",
          duration: "15 min",
          completed: true,
        },
        {
          id: "current-lesson",
          title: "Emotional Resilience Building",
          type: "video",
          duration: "20 min",
          completed: false,
          current: true,
        },
        {
          id: "stress-response",
          title: "Healthy Stress Response",
          type: "video",
          duration: "14 min",
          completed: false,
        },
        {
          id: "emotional-recovery",
          title: "Recovery Techniques",
          type: "exercise",
          duration: "12 min",
          completed: false,
        },
        {
          id: "mastery-assessment",
          title: "Emotional Mastery Check",
          type: "quiz",
          duration: "8 min",
          completed: false,
        },
      ],
    },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case "video":
        return Play
      case "exercise":
        return FileText
      case "quiz":
        return CheckCircle2
      default:
        return Play
    }
  }

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
        <Link href="/" className="flex items-center gap-2 text-white hover:text-yellow-100 mb-4">
          <ChevronLeft className="h-4 w-4" />
          <span className="text-sm">Go to Dashboard</span>
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <Brain className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg">YELLOW Mind</h1>
            <p className="text-yellow-100 text-sm">Emotional Intelligence Course</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Course Progress</span>
            <span>38% complete</span>
          </div>
          <Progress value={38} className="h-2 bg-white/20" />
        </div>
      </div>

      {/* Community Section */}
      <div className="p-4 border-b">
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Join the conversation in the Community</p>
                <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                  <Users className="h-4 w-4 mr-2" />
                  GO TO COMMUNITY
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm bg-white">
            <option>Search by lesson title</option>
          </select>
        </div>
      </div>

      {/* Course Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-2">
          {modules.map((module) => (
            <Collapsible
              key={module.id}
              open={expandedModules.includes(module.id)}
              onOpenChange={() => toggleModule(module.id)}
            >
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-3 h-auto text-left hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        module.completed === module.total
                          ? "bg-green-500 border-green-500"
                          : module.completed > 0
                            ? "bg-yellow-500 border-yellow-500"
                            : "border-gray-300"
                      }`}
                    >
                      {module.completed === module.total ? (
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      ) : (
                        <span className="text-xs font-medium text-white">
                          {module.completed > 0 ? module.completed : ""}
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{module.title}</div>
                      <div className="text-xs text-gray-500">
                        {module.completed}/{module.total}
                      </div>
                    </div>
                  </div>
                  {expandedModules.includes(module.id) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>

              <CollapsibleContent className="ml-9 space-y-1">
                {module.lessons.map((lesson) => {
                  const Icon = getIcon(lesson.type)
                  return (
                    <Button
                      key={lesson.id}
                      variant={lesson.current ? "secondary" : "ghost"}
                      className={`w-full justify-start p-2 h-auto text-left text-sm ${
                        lesson.current ? "bg-yellow-100 border border-yellow-200" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            lesson.completed ? "bg-green-500" : lesson.current ? "bg-yellow-500" : "bg-gray-200"
                          }`}
                        >
                          {lesson.completed ? (
                            <CheckCircle2 className="h-3 w-3 text-white" />
                          ) : (
                            <Icon className="h-3 w-3 text-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{lesson.title}</div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Badge variant="outline" className="text-xs px-1 py-0">
                              {lesson.type.toUpperCase()}
                            </Badge>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{lesson.duration}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Button>
                  )
                })}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  )
}
