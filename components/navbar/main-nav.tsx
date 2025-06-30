import Link from "next/link"
import { Brain, Home, BookOpen, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MainNav() {
  return (
    <div className="flex items-center gap-6">
      <Link href="/" className="flex items-center space-x-2">
        <div className="flex items-center justify-center w-8 h-8 bg-yellow-400 rounded-lg">
          <Brain className="h-5 w-5 text-yellow-900" />
        </div>
        <span className="font-bold text-xl">
          <span className="text-yellow-600">YELLOW</span> Mind
        </span>
      </Link>

      <nav className="hidden md:flex items-center space-x-1">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/modules" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Modules
          </Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/schedule" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Schedule
          </Link>
        </Button>
      </nav>
    </div>
  )
}
