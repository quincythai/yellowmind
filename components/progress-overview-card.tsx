import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function ProgressOverviewCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Your Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>Weekly Learning Goal</span>
              <span className="font-medium">3/5 hours</span>
            </div>
            <Progress value={60} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Courses Completed</p>
              <p className="text-2xl font-bold">2</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">In Progress</p>
              <p className="text-2xl font-bold">3</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Lessons Completed</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Hours Learned</p>
              <p className="text-2xl font-bold">18</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
