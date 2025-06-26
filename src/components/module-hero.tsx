import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Play, Clock, BookOpen, ChevronRight } from "lucide-react"

export function ModuleHero() {
  return (
    <Card className="overflow-hidden bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-400 border-0 text-white">
      <CardContent className="p-8">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-6">
            <div className="space-y-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Module 3 of 8
              </Badge>
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight">Emotional Intelligence & Self-Awareness</h1>
              <p className="text-yellow-100 text-lg">
                Master the art of understanding your emotions and developing deeper self-awareness for personal growth.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>4 weeks</span>
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
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10g-slate-500 bg-slate-600 bg-slate-600 bg-slate-600 bg-slate-600 bg-slate-600 bg-slate-500 bg-slate-500 bg-slate-600 bg-slate-500 bg-slate-400 bg-slate-400 bg-slate-300 bg-slate-200 bg-slate-100 bg-transparent bg-transparent bg-white bg-slate-200 bg-slate-100 bg-slate-50 bg-white bg-black10050-500-300-200-100parent-100-200-300-400-500-600-200">
                View All Lessons
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-video rounded-lg overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20">
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
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
