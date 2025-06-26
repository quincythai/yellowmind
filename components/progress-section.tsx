import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flame, Trophy, Target, Calendar, TrendingUp } from "lucide-react"

export function ProgressSection() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Daily Streak */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Daily Streak</h3>
              <Flame className="h-5 w-5 text-orange-500" />
            </div>

            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-orange-500">3</div>
              <p className="text-sm text-muted-foreground">Days in a row</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  <span>Achievements</span>
                </div>
                <Badge variant="secondary">5</Badge>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-blue-500" />
                  <span>Weekly Goal</span>
                </div>
                <Badge variant="outline">4/5 days</Badge>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-green-500" />
                  <span>This Month</span>
                </div>
                <Badge variant="outline">18 hours</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Your Journey */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Your Journey</h3>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>

            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-yellow-600">25%</div>
              <p className="text-sm text-muted-foreground">Course Completion</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-xl font-semibold">3</div>
                <div className="text-xs text-muted-foreground">Modules Done</div>
              </div>
              <div>
                <div className="text-xl font-semibold">12</div>
                <div className="text-xs text-muted-foreground">Remaining</div>
              </div>
            </div>

            <div className="pt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "25%" }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Challenge */}
      <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Weekly Challenge</h3>
              <Badge className="bg-purple-600">New</Badge>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-sm">Mindful Moments</h4>
              <p className="text-xs text-muted-foreground">Practice 5 minutes of mindfulness daily this week</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>3/7 days</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: "43%" }}></div>
              </div>
            </div>

            <div className="text-center">
              <Badge variant="outline" className="text-xs">
                🏆 50 points reward
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
