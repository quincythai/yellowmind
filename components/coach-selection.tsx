"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Users, Award, Calendar, Clock, CheckCircle } from "lucide-react"

interface CoachSelectionProps {
  onSelectCoach: (coach: any) => void
}

export function CoachSelection({ onSelectCoach }: CoachSelectionProps) {
  const coaches = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      title: "LMFT, CEDS",
      specialties: ["Emotional Intelligence", "Stress Management", "Leadership", "Anxiety"],
      rating: 4.9,
      reviewCount: 127,
      sessions: 1200,
      experience: "8 years",
      price: "$120/session",
      image: "/placeholder.svg?height=120&width=120",
      bio: "Dr. Sarah specializes in emotional intelligence and stress management with over 8 years of experience helping professionals develop their emotional skills. She combines evidence-based techniques with a compassionate approach to help clients achieve lasting change.",
      availability: "Available this week",
      nextAvailable: "Today at 2:00 PM",
      languages: ["English", "Spanish"],
      credentials: ["Licensed Marriage & Family Therapist", "Certified Eating Disorder Specialist"],
      approach: "Cognitive Behavioral Therapy, Mindfulness-Based Interventions",
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Licensed Psychologist",
      specialties: ["Mindfulness", "Anxiety", "Personal Growth", "Work-Life Balance"],
      rating: 4.8,
      reviewCount: 89,
      sessions: 950,
      experience: "6 years",
      price: "$110/session",
      image: "/placeholder.svg?height=120&width=120",
      bio: "Michael is an expert in mindfulness-based approaches to emotional regulation and personal development. He helps clients develop practical skills for managing stress, anxiety, and achieving personal growth through evidence-based therapeutic techniques.",
      availability: "Available tomorrow",
      nextAvailable: "Tomorrow at 10:00 AM",
      languages: ["English", "Mandarin"],
      credentials: ["Licensed Clinical Psychologist", "Mindfulness-Based Stress Reduction Certified"],
      approach: "Mindfulness-Based Therapy, Acceptance and Commitment Therapy",
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      title: "PhD, Emotional Intelligence Specialist",
      specialties: ["Relationships", "Communication", "Self-Awareness", "Conflict Resolution"],
      rating: 4.9,
      reviewCount: 156,
      sessions: 800,
      experience: "5 years",
      price: "$115/session",
      image: "/placeholder.svg?height=120&width=120",
      bio: "Dr. Emily focuses on helping individuals improve their relationships and communication through enhanced emotional intelligence. She specializes in interpersonal dynamics and has extensive experience working with couples and individuals on relationship challenges.",
      availability: "Available next week",
      nextAvailable: "Monday at 3:30 PM",
      languages: ["English", "Portuguese"],
      credentials: ["PhD in Psychology", "Certified Emotional Intelligence Coach"],
      approach: "Emotionally Focused Therapy, Gottman Method",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Choose Your Coach</h2>
        <p className="text-muted-foreground">Select the coach that best matches your needs and goals</p>
      </div>

      <div className="space-y-6">
        {coaches.map((coach) => (
          <Card
            key={coach.id}
            className="overflow-hidden hover:shadow-lg transition-all duration-200 border-2 hover:border-yellow-200"
          >
            <CardContent className="p-6">
              <div className="grid gap-6 lg:grid-cols-4">
                {/* Coach Photo & Basic Info */}
                <div className="lg:col-span-1 text-center lg:text-left">
                  <div className="space-y-4">
                    <img
                      src={coach.image || "/placeholder.svg"}
                      alt={coach.name}
                      className="w-24 h-24 rounded-full mx-auto lg:mx-0 object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-xl">{coach.name}</h3>
                      <p className="text-muted-foreground font-medium">{coach.title}</p>
                      <div className="flex items-center justify-center lg:justify-start gap-1 mt-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-semibold">{coach.rating}</span>
                        <span className="text-sm text-muted-foreground">({coach.reviewCount} reviews)</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {coach.availability}
                    </Badge>
                  </div>
                </div>

                {/* Coach Details */}
                <div className="lg:col-span-2 space-y-4">
                  {/* Bio */}
                  <div>
                    <h4 className="font-semibold mb-2">About</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{coach.bio}</p>
                  </div>

                  {/* Specialties */}
                  <div>
                    <h4 className="font-semibold mb-2">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {coach.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Approach */}
                  <div>
                    <h4 className="font-semibold mb-2">Therapeutic Approach</h4>
                    <p className="text-sm text-muted-foreground">{coach.approach}</p>
                  </div>

                  {/* Languages */}
                  <div>
                    <h4 className="font-semibold mb-2">Languages</h4>
                    <div className="flex gap-2">
                      {coach.languages.map((language) => (
                        <Badge key={language} variant="outline" className="text-xs">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Stats & Booking */}
                <div className="lg:col-span-1 space-y-4">
                  {/* Stats */}
                  <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Users className="h-4 w-4 text-blue-500" />
                        <span className="font-bold text-lg">{coach.sessions}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Sessions</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Award className="h-4 w-4 text-purple-500" />
                        <span className="font-bold text-lg">{coach.experience}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Experience</p>
                    </div>
                  </div>

                  {/* Next Available */}
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm font-medium">Next Available</span>
                    </div>
                    <p className="text-sm text-yellow-700">{coach.nextAvailable}</p>
                  </div>

                  {/* Pricing & Book Button */}
                  <div className="space-y-3">
                    <div className="text-center">
                      <span className="text-2xl font-bold text-yellow-600">{coach.price}</span>
                      <p className="text-xs text-muted-foreground">60-minute session</p>
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3"
                      onClick={() => onSelectCoach(coach)}
                    >
                      Select {coach.name.split(" ")[1]}
                    </Button>
                  </div>

                  {/* Credentials */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Credentials</h4>
                    {coach.credentials.map((credential) => (
                      <div key={credential} className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-muted-foreground">{credential}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Info */}
      <div className="text-center p-6 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">All Sessions Include:</h3>
        <div className="grid gap-2 md:grid-cols-3 text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-2">
            <Clock className="h-4 w-4" />
            <span>60-minute focused session</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>Personalized action plan</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Award className="h-4 w-4" />
            <span>Follow-up resources</span>
          </div>
        </div>
      </div>
    </div>
  )
}
