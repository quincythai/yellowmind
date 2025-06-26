import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Play, Clock, BookOpen, ChevronRight, CheckCircle2, Circle } from "lucide-react"

export function EnhancedModuleHero() {
  const upcomingLessons = [
    { id: 1, title: "Breathing Techniques for Stress", completed: true },
    { id: 2, title: "Progressive Muscle Relaxation", completed: true },
    { id: 3, title: "Cognitive Reframing Methods", completed: false, current: true },
    { id: 4, title: "Mindful Response vs Reaction", completed: false },
  ]

  return (
    <Card className="overflow-hidden bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-400 border-0 text-white">
      <CardContent className="p-8">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-6">
            <div className="space-y-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Module 3 of 8
              </Badge>
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight">Self-Regulation Tool Kit</h1>
              <p className="text-yellow-100 text-lg">
                Identify and manage your overall stress, helping you find YELLOW. Introducing a toolkit of simple,
                self-regulation tools that you can use to manage stress.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>8 hours</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>12 lessons</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Module Progress</span>
                  <span className="font-medium">7/12 lessons</span>
                </div>
                <Progress value={58} className="h-2 bg-white/20" />
              </div>
            </div>

            <div className="flex gap-3">
              <Button size="lg" className="bg-white text-yellow-600 hover:bg-yellow-50">
                <Play className="mr-2 h-5 w-5" />
                Continue Learning
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                View All Lessons
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {/* Video Preview */}
            <div className="aspect-video rounded-lg overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 relative">
              <img
                src="/placeholder.svg?height=300&width=500"
                alt="Module preview"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button size="lg" className="rounded-full w-16 h-16 bg-white/90 text-yellow-600 hover:bg-white">
                  <Play className="h-6 w-6 ml-1" />
                </Button>
              </div>
            </div>

            {/* Upcoming Lessons Preview */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
              <h3 className="font-semibold mb-3 text-sm">Upcoming Lessons</h3>
              <div className="space-y-2">
                {upcomingLessons.slice(0, 3).map((lesson) => (
                  <div key={lesson.id} className="flex items-center gap-3 text-sm">
                    {lesson.completed ? (
                      <CheckCircle2 className="h-4 w-4 text-green-300" />
                    ) : (
                      <Circle className={`h-4 w-4 ${lesson.current ? "text-yellow-200" : "text-white/50"}`} />
                    )}
                    <span className={lesson.current ? "font-medium" : "text-white/80"}>{lesson.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
