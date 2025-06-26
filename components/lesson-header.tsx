import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Settings, Maximize2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function LessonHeader() {
  return (
    <header className="bg-white border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">Emotional Resilience Building</h1>
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Module 3 • Lesson 3
          </Badge>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon">
            <Maximize2 className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-yellow-500"></span>
          </Button>

          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>

          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback className="bg-yellow-100 text-yellow-800">JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
