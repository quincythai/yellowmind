import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, BookOpen, Calendar, BarChart, Settings, MessageSquare, Trophy, Users } from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Dashboard</h2>
          <div className="space-y-1">
            <Button variant="secondary" size="sm" className="w-full justify-start" asChild>
              <Link href="#">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Overview
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
              <Link href="#">
                <BookOpen className="mr-2 h-4 w-4" />
                Courses
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
              <Link href="#">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
              <Link href="#">
                <BarChart className="mr-2 h-4 w-4" />
                Progress
              </Link>
            </Button>
          </div>
        </div>
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Community</h2>
          <div className="space-y-1">
            <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
              <Link href="#">
                <MessageSquare className="mr-2 h-4 w-4" />
                Discussion
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
              <Link href="#">
                <Users className="mr-2 h-4 w-4" />
                Study Groups
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
              <Link href="#">
                <Trophy className="mr-2 h-4 w-4" />
                Achievements
              </Link>
            </Button>
          </div>
        </div>
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Account</h2>
          <div className="space-y-1">
            <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
              <Link href="#">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
