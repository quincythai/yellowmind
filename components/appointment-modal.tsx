"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Calendar, Clock, Video, Phone, User, Mail, FileText, ExternalLink, Edit, Trash2 } from "lucide-react"

interface AppointmentModalProps {
  appointment: any
  onClose: () => void
}

export function AppointmentModal({ appointment, onClose }: AppointmentModalProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Appointment Details</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Status and Title */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold">{appointment.title}</h2>
              <Badge variant="outline" className={getStatusColor(appointment.status)}>
                {appointment.status}
              </Badge>
            </div>
            <p className="text-muted-foreground">{appointment.description}</p>
          </div>

          {/* Date and Time */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-500" />
              <div>
                <p className="font-medium">{formatDate(appointment.date)}</p>
                <p className="text-sm text-muted-foreground">Date</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Clock className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium">
                  {appointment.time} ({appointment.duration} min)
                </p>
                <p className="text-sm text-muted-foreground">Duration</p>
              </div>
            </div>
          </div>

          {/* Coach Information */}
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <User className="h-5 w-5" />
              Your Coach
            </h3>
            <div className="flex items-center gap-4">
              <img
                src={appointment.coach.image || "/placeholder.svg"}
                alt={appointment.coach.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="space-y-1">
                <p className="font-medium text-lg">{appointment.coach.name}</p>
                <p className="text-muted-foreground">{appointment.coach.title}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{appointment.coach.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Session Details */}
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-3">Session Details</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                {appointment.type === "video" ? (
                  <Video className="h-5 w-5 text-blue-500" />
                ) : (
                  <Phone className="h-5 w-5 text-green-500" />
                )}
                <span className="capitalize">{appointment.type} Session</span>
              </div>

              {appointment.type === "video" && appointment.meetingLink && (
                <div className="flex items-center gap-3">
                  <ExternalLink className="h-5 w-5 text-purple-500" />
                  <a
                    href={appointment.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Join Video Call
                  </a>
                </div>
              )}

              {appointment.type === "phone" && appointment.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-green-500" />
                  <span>Call: {appointment.phone}</span>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          {appointment.notes && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <FileText className="h-5 w-5 text-yellow-600" />
                Notes
              </h3>
              <p className="text-sm">{appointment.notes}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
              <Edit className="h-4 w-4 mr-2" />
              Reschedule
            </Button>
            <Button variant="outline" className="flex-1">
              <Trash2 className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="grid gap-2 md:grid-cols-2">
            <Button variant="outline" size="sm">
              Add to Calendar
            </Button>
            <Button variant="outline" size="sm">
              Send Reminder
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
