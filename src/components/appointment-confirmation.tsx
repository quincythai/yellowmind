"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle2, ChevronLeft, Calendar, Clock, Video, Phone, CreditCard } from "lucide-react"

interface AppointmentConfirmationProps {
  coach: any
  slot: any
  onBack: () => void
}

export function AppointmentConfirmation({ coach, slot, onBack }: AppointmentConfirmationProps) {
  const [isBooked, setIsBooked] = useState(false)
  const [formData, setFormData] = useState({
    goals: "",
    experience: "",
    concerns: "",
    phone: "",
    timezone: "EST",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate booking process
    setTimeout(() => {
      setIsBooked(true)
    }, 1000)
  }

  if (isBooked) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-green-600">Appointment Confirmed!</h2>
            <p className="text-muted-foreground">Your session with {coach.name} has been successfully booked.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="font-medium">{slot.formattedDate}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{slot.time}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              {slot.type === "video" ? <Video className="h-4 w-4" /> : <Phone className="h-4 w-4" />}
              <span className="capitalize">{slot.type} Session</span>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              You'll receive a confirmation email with session details and preparation materials.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline">Add to Calendar</Button>
              <Button asChild>
                <a href="/">Return to Dashboard</a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Scheduling
        </Button>
        <div>
          <h2 className="text-2xl font-semibold">Confirm Your Appointment</h2>
          <p className="text-muted-foreground">Review details and complete your booking</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Appointment Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Appointment Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={coach.image || "/placeholder.svg"}
                alt={coach.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium">{coach.name}</h3>
                <p className="text-sm text-muted-foreground">{coach.title}</p>
              </div>
            </div>

            <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{slot.formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{slot.time} (60 minutes)</span>
              </div>
              <div className="flex items-center gap-2">
                {slot.type === "video" ? (
                  <Video className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Phone className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="capitalize">{slot.type} Session</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <span className="font-medium">Total</span>
              <span className="text-xl font-bold">{coach.price}</span>
            </div>
          </CardContent>
        </Card>

        {/* Booking Form */}
        <Card>
          <CardHeader>
            <CardTitle>Session Preparation</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="goals">What are your main goals for this session?</Label>
                <Textarea
                  id="goals"
                  placeholder="e.g., Improve emotional regulation, better communication skills..."
                  value={formData.goals}
                  onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Previous experience with emotional intelligence coaching?</Label>
                <Textarea
                  id="experience"
                  placeholder="Brief description of any previous coaching or therapy experience..."
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="concerns">Any specific concerns or challenges?</Label>
                <Textarea
                  id="concerns"
                  placeholder="What specific situations or emotions would you like to work on?"
                  value={formData.concerns}
                  onChange={(e) => setFormData({ ...formData, concerns: e.target.value })}
                />
              </div>

              {slot.type === "phone" && (
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              )}

              <div className="pt-4 border-t">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="h-4 w-4" />
                  <span className="font-medium">Payment</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Payment will be processed securely. You can cancel up to 24 hours before your session.
                </p>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                >
                  Confirm & Pay {coach.price}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
