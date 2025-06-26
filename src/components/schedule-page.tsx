"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { AppointmentCalendar } from "@/components/appointment-calendar"
import { UpcomingAppointments } from "@/components/upcoming-appointments"
import { AppointmentModal } from "@/components/appointment-modal"
import { MindChatbot } from "@/components/mind-chatbot"

// Mock appointment data
const mockAppointments = [
  {
    id: 1,
    date: new Date(2025, 5, 25), // June 25, 2025
    time: "2:00 PM",
    duration: 60,
    coach: {
      name: "Dr. Sarah Johnson",
      title: "LMFT, CEDS",
      image: "/placeholder.svg?height=60&width=60",
      email: "sarah.johnson@yellowmind.com",
    },
    type: "video",
    status: "confirmed",
    title: "Emotional Intelligence Assessment",
    description: "Initial assessment and goal setting session",
    meetingLink: "https://zoom.us/j/123456789",
    notes: "Bring your completed self-assessment form",
  },
  {
    id: 2,
    date: new Date(2025, 5, 27), // June 27, 2025
    time: "10:00 AM",
    duration: 60,
    coach: {
      name: "Michael Chen",
      title: "Licensed Psychologist",
      image: "/placeholder.svg?height=60&width=60",
      email: "michael.chen@yellowmind.com",
    },
    type: "phone",
    status: "confirmed",
    title: "Stress Management Techniques",
    description: "Follow-up session on stress management strategies",
    phone: "+1 (555) 123-4567",
    notes: "Review homework from previous session",
  },
  {
    id: 3,
    date: new Date(2025, 6, 2), // July 2, 2025
    time: "3:30 PM",
    duration: 60,
    coach: {
      name: "Dr. Emily Rodriguez",
      title: "PhD, Emotional Intelligence Specialist",
      image: "/placeholder.svg?height=60&width=60",
      email: "emily.rodriguez@yellowmind.com",
    },
    type: "video",
    status: "pending",
    title: "Relationship Communication Skills",
    description: "Working on interpersonal communication techniques",
    meetingLink: "https://zoom.us/j/987654321",
    notes: "Prepare specific relationship scenarios to discuss",
  },
]

export function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)

  const handleDateClick = (date: Date) => {
    const appointment = mockAppointments.find((apt) => apt.date.toDateString() === date.toDateString())

    if (appointment) {
      setSelectedAppointment(appointment)
      setShowModal(true)
    }
    setSelectedDate(date)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedAppointment(null)
  }

  return (
    <DashboardShell>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">My Schedule</h1>
            <p className="text-muted-foreground text-lg">Manage your coaching appointments and sessions</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Calendar - Takes up 2 columns */}
          <div className="lg:col-span-2">
            <AppointmentCalendar
              appointments={mockAppointments}
              onDateClick={handleDateClick}
              selectedDate={selectedDate}
            />
          </div>

          {/* Upcoming Appointments Sidebar */}
          <div>
            <UpcomingAppointments
              appointments={mockAppointments}
              onAppointmentClick={(appointment) => {
                setSelectedAppointment(appointment)
                setShowModal(true)
              }}
            />
          </div>
        </div>

        {/* Appointment Detail Modal */}
        {showModal && selectedAppointment && (
          <AppointmentModal appointment={selectedAppointment} onClose={handleCloseModal} />
        )}
      </div>

      <MindChatbot />
    </DashboardShell>
  )
}
