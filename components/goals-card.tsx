import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Circle } from "lucide-react"

export function GoalsCard() {
  // Mock goals data
  const goals = [
    {
      id: 1,
      text: "Complete Emotional Intelligence course",
      completed: false,
    },
    {
      id: 2,
      text: "Attend 3 live workshops this month",
      completed: true,
    },
    {
      id: 3,
      text: "Practice mindfulness for 10 minutes daily",
      completed: false,
    },
    {
      id: 4,
      text: "Complete weekly reflection journal",
      completed: true,
    },
  ]

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Your Goals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goals.map((goal) => (
            <div key={goal.id} className="flex items-start space-x-3">
              {goal.completed ? (
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground mt-0.5" />
              )}
              <span className={goal.completed ? "text-muted-foreground line-through" : ""}>{goal.text}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
