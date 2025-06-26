import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Calendar, Users, MessageSquare, TrendingUp, Clock, CheckCircle2, Star, Quote } from "lucide-react"

export function ActivitySidebar() {
  const recentActivity = [
    {
      type: "completion",
      title: "Completed: Breathing Techniques",
      time: "2 hours ago",
      icon: CheckCircle2,
      color: "text-green-500",
    },
    {
      type: "achievement",
      title: "Earned: Mindfulness Master",
      time: "1 day ago",
      icon: Star,
      color: "text-yellow-500",
    },
    {
      type: "community",
      title: "New comment on your post",
      time: "2 days ago",
      icon: MessageSquare,
      color: "text-blue-500",
    },
  ]

  const upcomingEvents = [
    {
      title: "Group Coaching Session",
      time: "Today, 3:00 PM",
      type: "Live Session",
    },
    {
      title: "Weekly Check-in",
      time: "Tomorrow, 10:00 AM",
      type: "Personal",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Notifications */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
              <activity.icon className={`h-4 w-4 mt-0.5 ${activity.color}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
          <Button variant="outline" size="sm" className="w-full">
            View All
          </Button>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcomingEvents.map((event, index) => (
            <div key={index} className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-sm">{event.title}</h4>
                <Badge variant="outline" className="text-xs">
                  {event.type}
                </Badge>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{event.time}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Daily Inspiration */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Quote className="h-5 w-5" />
            Daily Inspiration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <blockquote className="text-sm italic text-gray-700 mb-2">
            "The curious paradox is that when I accept myself just as I am, then I can change."
          </blockquote>
          <p className="text-xs text-muted-foreground">— Carl Rogers</p>
        </CardContent>
      </Card>

      {/* Community Highlights */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5" />
            Community
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Trending Discussion</span>
            </div>
            <p className="text-sm text-muted-foreground">"How to handle emotional triggers at work"</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>42 replies</span>
              <span>•</span>
              <span>2 hours ago</span>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full">
            Join Discussion
          </Button>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">This Week</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">5</div>
              <div className="text-xs text-muted-foreground">Lessons</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">3.2h</div>
              <div className="text-xs text-muted-foreground">Study Time</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
