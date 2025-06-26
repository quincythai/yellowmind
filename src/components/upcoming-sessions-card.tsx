import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Video } from "lucide-react"

export function UpcomingSessionsCard() {
  // Mock upcoming sessions data
  const upcomingSessions = [
    {
      id: 1,
      title: "Group Coaching: Emotional Intelligence",
      date: "Today",
      time: "3:00 PM - 4:00 PM",
      type: "Live Workshop",
    },
    {
      id: 2,
      title: "Q&A: Communication Challenges",
      date: "Tomorrow",
      time: "11:00 AM - 12:00 PM",
      type: "Q&A Session",
    },
    {
      id: 3,
      title: "Mindfulness Practice Group",
      date: "Jun 25",
      time: "9:00 AM - 9:30 AM",
      type: "Practice Session",
    },
  ]

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Upcoming Sessions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingSessions.map((session) => (
            <div key={session.id} className="flex flex-col space-y-2 border-b pb-4 last:border-0 last:pb-0">
              <div className="font-medium">{session.title}</div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-4 w-4" />
                <span className="mr-3">{session.date}</span>
                <Clock className="mr-1 h-4 w-4" />
                <span>{session.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm">
                  <Video className="mr-1 h-4 w-4 text-primary" />
                  <span>{session.type}</span>
                </div>
                <Button size="sm" variant="outline">
                  Join
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
