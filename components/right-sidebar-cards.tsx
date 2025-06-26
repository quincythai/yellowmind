import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Flame, Trophy, Target, Calendar, TrendingUp, BookOpen, Phone, CalendarCheck } from "lucide-react"

export function RightSidebarCards() {
  return (
    <div className="space-y-6">
      {/* Daily Streak */}
      <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            Daily Streak
            <Flame className="h-5 w-5 text-orange-500" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
        </CardContent>
      </Card>

      {/* Your Journey */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            Your Journey
            <TrendingUp className="h-5 w-5 text-green-500" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-green-600">25%</div>
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
              <div className="bg-green-500 h-2 rounded-full" style={{ width: "25%" }}></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions - Only 3 items */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button variant="ghost" className="w-full h-auto p-3 justify-start text-left" asChild>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-sm">Browse Modules</div>
                  <div className="text-xs text-muted-foreground">Explore all modules</div>
                </div>
              </div>
            </Button>

            <Button variant="ghost" className="w-full h-auto p-3 justify-start text-left" asChild>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center">
                  <Phone className="h-4 w-4 text-pink-600" />
                </div>
                <div>
                  <div className="font-medium text-sm">Contact Us</div>
                  <div className="text-xs text-muted-foreground">Got any questions?</div>
                </div>
              </div>
            </Button>

            <Button variant="ghost" className="w-full h-auto p-3 justify-start text-left" asChild>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                  <CalendarCheck className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium text-sm">Schedule Session</div>
                  <div className="text-xs text-muted-foreground">Book a 1-on-1 coaching call</div>
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
