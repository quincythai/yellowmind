"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChevronDown, ChevronUp, Play, CheckCircle2, Clock, FileText, Users, Lock, Star } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function ModulesList() {
  const [expandedModules, setExpandedModules] = useState<string[]>(["welcome"])

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => (prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]))
  }

  const modules = [
    {
      id: "welcome",
      title: "Welcome & Course Orientation",
      description: "Get started with your emotional intelligence journey",
      completed: 3,
      total: 3,
      duration: "45 min",
      isUnlocked: true,
      isCompleted: true,
      lessons: [
        {
          id: "course-intro",
          title: "Welcome & Course Orientation",
          type: "video",
          duration: "15 min",
          completed: true,
        },
        {
          id: "meet-guide",
          title: "Meet Your Guide, Sarah Johnson, LMFT, CEDS",
          type: "video",
          duration: "12 min",
          completed: true,
        },
        {
          id: "ai-support",
          title: "Meet the AI Support Bot",
          type: "video",
          duration: "8 min",
          completed: true,
        },
      ],
    },
    {
      id: "module-1",
      title: "Module 1: The Path to YELLOW Mind",
      description: "Discover the foundation of emotional intelligence and self-awareness",
      completed: 2,
      total: 8,
      duration: "2.5 hours",
      isUnlocked: true,
      isCompleted: false,
      lessons: [
        {
          id: "yellow-intro",
          title: "Introduction to YELLOW Mind Philosophy",
          type: "video",
          duration: "18 min",
          completed: true,
        },
        {
          id: "emotional-spectrum",
          title: "Understanding the Emotional Spectrum",
          type: "video",
          duration: "22 min",
          completed: true,
        },
        {
          id: "self-awareness-foundation",
          title: "Building Self-Awareness Foundation",
          type: "video",
          duration: "20 min",
          completed: false,
        },
        {
          id: "mindfulness-basics",
          title: "Mindfulness in Daily Life",
          type: "video",
          duration: "25 min",
          completed: false,
        },
        {
          id: "reflection-practice",
          title: "Daily Reflection Practice",
          type: "exercise",
          duration: "15 min",
          completed: false,
        },
        {
          id: "emotional-journal",
          title: "Emotional Journaling Techniques",
          type: "exercise",
          duration: "20 min",
          completed: false,
        },
        {
          id: "community-intro",
          title: "Community Connection Exercise",
          type: "community",
          duration: "10 min",
          completed: false,
        },
        {
          id: "module1-assessment",
          title: "Module 1 Knowledge Check",
          type: "quiz",
          duration: "10 min",
          completed: false,
        },
      ],
    },
    {
      id: "module-2",
      title: "Module 2: Emotional Triggers & Stress Response",
      description: "Learn to identify and manage emotional triggers effectively",
      completed: 0,
      total: 9,
      duration: "3 hours",
      isUnlocked: true,
      isCompleted: false,
      lessons: [
        {
          id: "trigger-identification",
          title: "Identifying Your Emotional Triggers",
          type: "video",
          duration: "20 min",
          completed: false,
        },
        {
          id: "stress-physiology",
          title: "The Physiology of Stress Response",
          type: "video",
          duration: "18 min",
          completed: false,
        },
        {
          id: "breathing-techniques",
          title: "Breathing Techniques for Regulation",
          type: "video",
          duration: "15 min",
          completed: false,
        },
        {
          id: "cognitive-reframing",
          title: "Cognitive Reframing Strategies",
          type: "video",
          duration: "25 min",
          completed: false,
        },
        {
          id: "grounding-exercises",
          title: "Grounding and Centering Exercises",
          type: "exercise",
          duration: "20 min",
          completed: false,
        },
        {
          id: "trigger-mapping",
          title: "Personal Trigger Mapping",
          type: "exercise",
          duration: "25 min",
          completed: false,
        },
        {
          id: "stress-toolkit",
          title: "Building Your Stress Management Toolkit",
          type: "exercise",
          duration: "30 min",
          completed: false,
        },
        {
          id: "peer-support",
          title: "Peer Support Discussion",
          type: "community",
          duration: "15 min",
          completed: false,
        },
        {
          id: "module2-assessment",
          title: "Module 2 Mastery Assessment",
          type: "quiz",
          duration: "12 min",
          completed: false,
        },
      ],
    },
    {
      id: "module-3",
      title: "Module 3: Self-Regulation Toolkit",
      description: "Master advanced techniques for emotional self-regulation",
      completed: 0,
      total: 11,
      duration: "4 hours",
      isUnlocked: false,
      isCompleted: false,
      lessons: [],
    },
    {
      id: "module-4",
      title: "Module 4: Building Emotional Resilience",
      description: "Develop unshakeable emotional resilience and recovery skills",
      completed: 0,
      total: 6,
      duration: "2.5 hours",
      isUnlocked: false,
      isCompleted: false,
      lessons: [],
    },
    {
      id: "module-5",
      title: "Module 5: Interpersonal Intelligence",
      description: "Navigate relationships with emotional intelligence",
      completed: 0,
      total: 8,
      duration: "3.5 hours",
      isUnlocked: false,
      isCompleted: false,
      lessons: [],
    },
    {
      id: "module-6",
      title: "Module 6: Leadership & Influence",
      description: "Lead with emotional intelligence and authentic influence",
      completed: 0,
      total: 7,
      duration: "3 hours",
      isUnlocked: false,
      isCompleted: false,
      lessons: [],
    },
    {
      id: "bonus",
      title: "Bonus: Advanced Mastery Techniques",
      description: "Exclusive advanced techniques for emotional mastery",
      completed: 0,
      total: 4,
      duration: "2 hours",
      isUnlocked: false,
      isCompleted: false,
      isBonusContent: true,
      lessons: [],
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
      case "community":
        return Users
      default:
        return Play
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "video":
        return "bg-blue-100 text-blue-700"
      case "exercise":
        return "bg-green-100 text-green-700"
      case "quiz":
        return "bg-purple-100 text-purple-700"
      case "community":
        return "bg-orange-100 text-orange-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="space-y-4">
      {modules.map((module) => (
        <Card key={module.id} className={`overflow-hidden ${module.isCompleted ? "bg-green-50 border-green-200" : ""}`}>
          <Collapsible open={expandedModules.includes(module.id)} onOpenChange={() => toggleModule(module.id)}>
            <CollapsibleTrigger asChild>
              <div className="w-full p-6 hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Module Status Icon */}
                    <div className="relative">
                      {module.isCompleted ? (
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="h-6 w-6 text-white" />
                        </div>
                      ) : module.isUnlocked ? (
                        <div className="w-12 h-12 bg-yellow-100 border-2 border-yellow-300 rounded-full flex items-center justify-center">
                          <span className="text-yellow-700 font-semibold">
                            {module.completed}/{module.total}
                          </span>
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <Lock className="h-6 w-6 text-gray-500" />
                        </div>
                      )}
                      {module.isBonusContent && (
                        <div className="absolute -top-1 -right-1">
                          <Star className="h-5 w-5 text-yellow-500 fill-current" />
                        </div>
                      )}
                    </div>

                    {/* Module Info */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-semibold">{module.title}</h3>
                        {module.isBonusContent && <Badge className="bg-yellow-500 text-white">Bonus</Badge>}
                        {!module.isUnlocked && <Badge variant="outline">Locked</Badge>}
                      </div>
                      <p className="text-muted-foreground">{module.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>
                          {module.completed} / {module.total} complete
                        </span>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{module.duration}</span>
                        </div>
                      </div>
                      {module.isUnlocked && module.total > 0 && (
                        <Progress value={(module.completed / module.total) * 100} className="w-64 h-2" />
                      )}
                    </div>
                  </div>

                  {/* Expand/Collapse Icon */}
                  <div className="flex items-center gap-3">
                    {module.isUnlocked && module.lessons.length > 0 && (
                      <Button variant="outline" size="sm">
                        {module.completed === 0 ? "Start Module" : "Continue"}
                      </Button>
                    )}
                    {expandedModules.includes(module.id) ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent>
              {module.lessons.length > 0 && (
                <CardContent className="pt-0 pb-6">
                  <div className="ml-16 space-y-2">
                    {module.lessons.map((lesson, index) => {
                      const Icon = getIcon(lesson.type)
                      return (
                        <div
                          key={lesson.id}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                lesson.completed ? "bg-green-500" : "bg-gray-200"
                              }`}
                            >
                              {lesson.completed ? (
                                <CheckCircle2 className="h-4 w-4 text-white" />
                              ) : (
                                <Icon className="h-4 w-4 text-gray-600" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium">{lesson.title}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className={`text-xs ${getTypeColor(lesson.type)}`}>
                                  {lesson.type.toUpperCase()}
                                </Badge>
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {lesson.duration}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Button size="sm" variant={lesson.completed ? "outline" : "default"}>
                            {lesson.completed ? "Review" : "Start"}
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              )}
            </CollapsibleContent>
          </Collapsible>
        </Card>
      ))}
    </div>
  )
}
