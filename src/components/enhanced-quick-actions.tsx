import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  Users,
  Calendar,
  MessageSquare,
  BarChart,
  Settings,
  FileText,
  Award,
  Phone,
  Download,
} from "lucide-react"

export function EnhancedQuickActions() {
  const actions = [
    {
      icon: BookOpen,
      title: "Browse Modules",
      description: "Explore all available learning modules",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Users,
      title: "Study Groups",
      description: "Join or create study groups",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Calendar,
      title: "Schedule Session",
      description: "Book a 1-on-1 coaching call",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: MessageSquare,
      title: "Community",
      description: "Connect with other learners",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      icon: BarChart,
      title: "Analytics",
      description: "View detailed progress reports",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      icon: Settings,
      title: "Preferences",
      description: "Customize your learning experience",
      color: "text-gray-600",
      bgColor: "bg-gray-50",
    },
    {
      icon: FileText,
      title: "Journal",
      description: "Access your reflection journal",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      icon: Award,
      title: "Certificates",
      description: "View your earned certificates",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      icon: Phone,
      title: "Contact Us",
      description: "Get help with any questions",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
    },
    {
      icon: Download,
      title: "Resources",
      description: "Download course materials",
      color: "text-teal-600",
      bgColor: "bg-teal-50",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {actions.map((action, index) => (
            <Button key={index} variant="ghost" className="h-auto p-4 justify-start text-left" asChild>
              <div className="space-y-2">
                <div className={`w-10 h-10 rounded-lg ${action.bgColor} flex items-center justify-center`}>
                  <action.icon className={`h-5 w-5 ${action.color}`} />
                </div>
                <div>
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs text-muted-foreground">{action.description}</div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
