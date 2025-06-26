"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { AppointmentScheduler } from "@/components/appointment-scheduler"
import { CoachSelection } from "@/components/coach-selection"
import { AppointmentConfirmation } from "@/components/appointment-confirmation"
import { MindChatbot } from "@/components/mind-chatbot"

export function BookAppointmentPage() {
  const [step, setStep] = useState(1)
  const [selectedCoach, setSelectedCoach] = useState<any>(null)
  const [selectedSlot, setSelectedSlot] = useState<any>(null)

  return (
    <DashboardShell>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Book Your One-on-One Session</h1>
          <p className="text-muted-foreground text-lg">
            Get personalized guidance from our certified emotional intelligence coaches
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center space-x-4">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={`w-16 h-1 mx-2 ${step > stepNumber ? "bg-yellow-500" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        {step === 1 && (
          <CoachSelection
            onSelectCoach={(coach) => {
              setSelectedCoach(coach)
              setStep(2)
            }}
          />
        )}

        {step === 2 && selectedCoach && (
          <AppointmentScheduler
            coach={selectedCoach}
            onSelectSlot={(slot) => {
              setSelectedSlot(slot)
              setStep(3)
            }}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && selectedCoach && selectedSlot && (
          <AppointmentConfirmation coach={selectedCoach} slot={selectedSlot} onBack={() => setStep(2)} />
        )}
      </div>

      <MindChatbot />
    </DashboardShell>
  )
}
