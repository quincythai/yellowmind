import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Clock, BookOpen } from "lucide-react"

interface CourseGridProps {
  limit?: number
}

export function CourseGrid({ limit }: CourseGridProps) {
  // Mock course data
  const courses = [
    {
      id: 1,
      title: "Emotional Intelligence Mastery",
      description: "Learn to understand and manage your emotions effectively",
      progress: 65,
      totalLessons: 12,
      completedLessons: 8,
      duration: "4 weeks",
      category: "Self-Awareness",
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 2,
      title: "Effective Communication Skills",
      description: "Master the art of clear and impactful communication",
      progress: 30,
      totalLessons: 10,
      completedLessons: 3,
      duration: "3 weeks",
      category: "Communication",
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 3,
      title: "Mindfulness & Stress Management",
      description: "Techniques to reduce stress and increase mindfulness",
      progress: 10,
      totalLessons: 8,
      completedLessons: 1,
      duration: "2 weeks",
      category: "Wellness",
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 4,
      title: "Goal Setting & Achievement",
      description: "Framework for setting and achieving meaningful goals",
      progress: 0,
      totalLessons: 6,
      completedLessons: 0,
      duration: "2 weeks",
      category: "Productivity",
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 5,
      title: "Building Healthy Relationships",
      description: "Develop skills for creating meaningful connections",
      progress: 0,
      totalLessons: 9,
      completedLessons: 0,
      duration: "3 weeks",
      category: "Relationships",
      image: "/placeholder.svg?height=100&width=200",
    },
  ]

  const displayCourses = limit ? courses.slice(0, limit) : courses

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {displayCourses.map((course) => (
        <Card key={course.id} className="overflow-hidden">
          <div className="aspect-video w-full overflow-hidden">
            <img src={course.image || "/placeholder.svg"} alt={course.title} className="object-cover w-full h-full" />
          </div>
          <CardHeader className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <Badge variant="outline" className="mb-2">
                  {course.category}
                </Badge>
                <h3 className="text-lg font-semibold">{course.title}</h3>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2 mb-4" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <div className="flex items-center">
                <BookOpen className="h-3 w-3 mr-1" />
                <span>
                  {course.completedLessons}/{course.totalLessons} lessons
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>{course.duration}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button className="w-full">{course.progress > 0 ? "Continue Learning" : "Start Course"}</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
