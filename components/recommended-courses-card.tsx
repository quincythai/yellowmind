import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

export function RecommendedCoursesCard() {
  // Mock recommended courses
  const recommendedCourses = [
    {
      id: 1,
      title: "Resilience Building",
      category: "Mental Strength",
      duration: "3 weeks",
      reason: "Based on your interests",
    },
    {
      id: 2,
      title: "Leadership Essentials",
      category: "Career Growth",
      duration: "4 weeks",
      reason: "Popular in your network",
    },
    {
      id: 3,
      title: "Financial Wellness",
      category: "Life Skills",
      duration: "2 weeks",
      reason: "Trending now",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended For You</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendedCourses.map((course) => (
            <div key={course.id} className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0">
              <div className="space-y-1">
                <div className="font-medium">{course.title}</div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {course.category}
                  </Badge>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    <span>{course.duration}</span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">{course.reason}</div>
              </div>
              <Button size="sm" variant="outline">
                Add
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
