import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, Target, Calendar, Flame } from "lucide-react"

export function ProgressSection() {
  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Your Journey</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-yellow-600">58%</div>
            <p className="text-sm text-muted-foreground">Course Completion</p>
          </div>

          <Progress value={58} className="h-3" />

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="text-center">
              <div className="text-xl font-semibold">3</div>
              <div className="text-xs text-muted-foreground">Modules Done</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-semibold">5</div>
              <div className="text-xs text-muted-foreground">Remaining</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Streak & Stats */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            Daily Streak
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-500">12</div>
            <p className="text-sm text-muted-foreground">Days in a row</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">Achievements</span>
              </div>
              <Badge variant="secondary">3</Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Weekly Goal</span>
              </div>
              <Badge variant="outline">4/5 days</Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-green-500" />
                <span className="text-sm">This Month</span>
              </div>
              <Badge variant="outline">18 hours</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
