"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Clock, Calendar, Video, Phone } from "lucide-react"

interface AppointmentSchedulerProps {
  coach: any
  onSelectSlot: (slot: any) => void
  onBack: () => void
}

export function AppointmentScheduler({ coach, onSelectSlot, onBack }: AppointmentSchedulerProps) {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [sessionType, setSessionType] = useState<"video" | "phone">("video")

  // Mock available time slots
  const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"]

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleBooking = () => {
    if (selectedTime) {
      onSelectSlot({
        date: selectedDate,
        time: selectedTime,
        type: sessionType,
        formattedDate: formatDate(selectedDate),
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Coaches
        </Button>
        <div>
          <h2 className="text-2xl font-semibold">Schedule with {coach.name}</h2>
          <p className="text-muted-foreground">{coach.title}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Calendar & Time Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Select Date & Time
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Date Navigation */}
            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h3 className="font-medium">{formatDate(selectedDate)}</h3>
              <Button variant="outline" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Time Slots */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Available Times</h4>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTime(time)}
                    className={selectedTime === time ? "bg-yellow-500 hover:bg-yellow-600" : ""}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Session Details */}
        <Card>
          <CardHeader>
            <CardTitle>Session Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Session Type */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Session Type</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={sessionType === "video" ? "default" : "outline"}
                  onClick={() => setSessionType("video")}
                  className={`flex items-center gap-2 ${sessionType === "video" ? "bg-yellow-500 hover:bg-yellow-600" : ""}`}
                >
                  <Video className="h-4 w-4" />
                  Video Call
                </Button>
                <Button
                  variant={sessionType === "phone" ? "default" : "outline"}
                  onClick={() => setSessionType("phone")}
                  className={`flex items-center gap-2 ${sessionType === "phone" ? "bg-yellow-500 hover:bg-yellow-600" : ""}`}
                >
                  <Phone className="h-4 w-4" />
                  Phone Call
                </Button>
              </div>
            </div>

            {/* Session Info */}
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">60 minutes session</span>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>• Personalized emotional intelligence coaching</p>
                <p>• Goal setting and action planning</p>
                <p>• Practical exercises and techniques</p>
                <p>• Follow-up resources and materials</p>
              </div>
            </div>

            {/* Pricing */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <span className="font-medium">Session Fee</span>
              <span className="text-xl font-bold">{coach.price}</span>
            </div>

            {/* Book Button */}
            <Button
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
              onClick={handleBooking}
              disabled={!selectedTime}
            >
              Continue to Confirmation
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
