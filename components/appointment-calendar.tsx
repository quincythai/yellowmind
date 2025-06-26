"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar, Video, Phone } from "lucide-react"

interface AppointmentCalendarProps {
  appointments: any[]
  onDateClick: (date: Date) => void
  selectedDate: Date | null
}

export function AppointmentCalendar({ appointments, onDateClick, selectedDate }: AppointmentCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getAppointmentForDate = (date: Date) => {
    return appointments.find((apt) => apt.date.toDateString() === date.toDateString())
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    })
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isSelected = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString()
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDayOfMonth = getFirstDayOfMonth(currentDate)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {formatMonthYear(currentDate)}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
              Today
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Day Headers */}
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}

            {/* Empty cells for days before month starts */}
            {emptyDays.map((_, index) => (
              <div key={`empty-${index}`} className="p-2 h-20" />
            ))}

            {/* Calendar Days */}
            {days.map((day) => {
              const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
              const appointment = getAppointmentForDate(date)
              const hasAppointment = !!appointment
              const todayClass = isToday(date)
              const selectedClass = isSelected(date)

              return (
                <div
                  key={day}
                  className={`
                    p-2 h-20 border rounded-lg cursor-pointer transition-colors
                    ${todayClass ? "bg-yellow-50 border-yellow-200" : "hover:bg-gray-50"}
                    ${selectedClass ? "ring-2 ring-yellow-500" : ""}
                    ${hasAppointment ? "border-yellow-300" : "border-gray-200"}
                  `}
                  onClick={() => onDateClick(date)}
                >
                  <div className="flex flex-col h-full">
                    <span className={`text-sm font-medium ${todayClass ? "text-yellow-700" : ""}`}>{day}</span>
                    {hasAppointment && (
                      <div className="flex-1 mt-1">
                        <div className="bg-yellow-500 text-white text-xs px-2 py-1 rounded truncate">
                          <div className="flex items-center gap-1">
                            {appointment.type === "video" ? (
                              <Video className="h-3 w-3" />
                            ) : (
                              <Phone className="h-3 w-3" />
                            )}
                            <span>{appointment.time}</span>
                          </div>
                          <div className="truncate mt-1">{appointment.coach.name}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 pt-4 border-t">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-50 border border-yellow-200 rounded"></div>
              <span className="text-sm text-muted-foreground">Today</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-sm text-muted-foreground">Appointment</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
