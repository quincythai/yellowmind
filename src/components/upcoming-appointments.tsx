"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Video, Phone } from "lucide-react"

interface UpcomingAppointmentsProps {
  appointments: any[]
  onAppointmentClick: (appointment: any) => void
}

export function UpcomingAppointments({ appointments, onAppointmentClick }: UpcomingAppointmentsProps) {
  // Sort appointments by date and filter for upcoming ones
  const upcomingAppointments = appointments
    .filter((apt) => apt.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5) // Show next 5 appointments

  const formatDate = (date: Date) => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow"
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Upcoming Appointments
        </CardTitle>
      </CardHeader>
      <CardContent>
        {upcomingAppointments.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-muted-foreground">No upcoming appointments</p>
            <Button className="mt-4" asChild>
              <a href="/book-appointment">Book Your First Session</a>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onAppointmentClick(appointment)}
              >
                <div className="space-y-3">
                  {/* Date and Time */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{formatDate(appointment.date)}</span>
                    </div>
                    <Badge variant="outline" className={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>
                      {appointment.time} ({appointment.duration} min)
                    </span>
                  </div>

                  {/* Coach Info */}
                  <div className="flex items-center gap-3">
                    <img
                      src={appointment.coach.image || "/placeholder.svg"}
                      alt={appointment.coach.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-sm">{appointment.coach.name}</p>
                      <p className="text-xs text-muted-foreground">{appointment.coach.title}</p>
                    </div>
                  </div>

                  {/* Session Type and Title */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {appointment.type === "video" ? (
                        <Video className="h-4 w-4 text-blue-500" />
                      ) : (
                        <Phone className="h-4 w-4 text-green-500" />
                      )}
                      <span className="text-sm capitalize">{appointment.type} Session</span>
                    </div>
                    <p className="font-medium text-sm">{appointment.title}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* View All Button */}
            <Button variant="outline" className="w-full mt-4">
              View All Appointments
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
