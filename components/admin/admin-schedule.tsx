"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarDays, Clock, Plus, Users, Video, Phone } from "lucide-react";

// Mock coach data
const coaches = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "LMFT, CEDS",
    specialties: ["Anxiety", "Depression", "Relationships"],
    availability: "Mon-Fri 9AM-5PM",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Dr. Emily Rodriguez",
    title: "PhD, Emotional Intelligence Specialist",
    specialties: ["EI Training", "Leadership", "Communication"],
    availability: "Tue-Sat 10AM-6PM",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Michael Chen",
    title: "Licensed Psychologist",
    specialties: ["Stress Management", "Mindfulness", "CBT"],
    availability: "Mon-Wed-Fri 8AM-4PM",
    image: "/placeholder.svg?height=40&width=40",
  },
];

// Mock schedule data
const mockSchedule = [
  {
    id: 1,
    coachId: 1,
    coachName: "Dr. Sarah Johnson",
    date: "2025-01-07",
    timeSlots: [
      { time: "9:00 AM", status: "available", duration: 60 },
      {
        time: "10:00 AM",
        status: "booked",
        client: "Sarah Johnson",
        type: "video",
      },
      { time: "11:00 AM", status: "available", duration: 60 },
      { time: "2:00 PM", status: "blocked", reason: "Lunch break" },
      {
        time: "3:00 PM",
        status: "booked",
        client: "Michael Chen",
        type: "phone",
      },
      { time: "4:00 PM", status: "available", duration: 60 },
    ],
  },
  {
    id: 2,
    coachId: 2,
    coachName: "Dr. Emily Rodriguez",
    date: "2025-01-07",
    timeSlots: [
      { time: "10:00 AM", status: "available", duration: 60 },
      {
        time: "11:00 AM",
        status: "booked",
        client: "Emma Wilson",
        type: "video",
      },
      { time: "1:00 PM", status: "available", duration: 60 },
      {
        time: "2:00 PM",
        status: "booked",
        client: "David Brown",
        type: "video",
      },
      { time: "3:00 PM", status: "available", duration: 60 },
      { time: "4:00 PM", status: "blocked", reason: "Admin time" },
    ],
  },
];

export function AdminSchedule() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedCoach, setSelectedCoach] = useState("all");
  const [showAddSlotDialog, setShowAddSlotDialog] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-700 border-green-200";
      case "booked":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "blocked":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const filteredSchedule = mockSchedule.filter(
    (schedule) =>
      selectedCoach === "all" || schedule.coachId.toString() === selectedCoach
  );

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Schedule Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Calendar */}
            <div className="lg:w-1/3">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </div>

            {/* Controls and Stats */}
            <div className="lg:w-2/3 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={selectedCoach} onValueChange={setSelectedCoach}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Select coach" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Coaches</SelectItem>
                    {coaches.map((coach) => (
                      <SelectItem key={coach.id} value={coach.id.toString()}>
                        {coach.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Dialog
                  open={showAddSlotDialog}
                  onOpenChange={setShowAddSlotDialog}
                >
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Time Slot
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Time Slot</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="coach">Coach</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select coach" />
                          </SelectTrigger>
                          <SelectContent>
                            {coaches.map((coach) => (
                              <SelectItem
                                key={coach.id}
                                value={coach.id.toString()}
                              >
                                {coach.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="date">Date</Label>
                          <Input id="date" type="date" />
                        </div>
                        <div>
                          <Label htmlFor="time">Time</Label>
                          <Input id="time" type="time" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="duration">Duration (minutes)</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="45">45 minutes</SelectItem>
                            <SelectItem value="60">60 minutes</SelectItem>
                            <SelectItem value="90">90 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => setShowAddSlotDialog(false)}>
                          Add Slot
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setShowAddSlotDialog(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Quick Stats */}
              <div className="grid gap-4 sm:grid-cols-3">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium">Total Slots</p>
                        <p className="text-2xl font-bold">24</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-green-500" />
                      <div>
                        <p className="text-sm font-medium">Booked</p>
                        <p className="text-2xl font-bold">18</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-yellow-500" />
                      <div>
                        <p className="text-sm font-medium">Available</p>
                        <p className="text-2xl font-bold">6</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Coach Schedules */}
      <div className="space-y-4">
        {filteredSchedule.map((schedule) => (
          <Card key={schedule.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <img
                  src={
                    coaches.find((c) => c.id === schedule.coachId)?.image ||
                    "/placeholder.svg"
                  }
                  alt={schedule.coachName}
                  className="w-8 h-8 rounded-full"
                />
                {schedule.coachName}
                <Badge variant="outline">{schedule.date}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Client/Details</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {schedule.timeSlots.map((slot, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {slot.time}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getStatusColor(slot.status)}
                          >
                            {slot.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {slot.status === "booked" && slot.client ? (
                            <span>{slot.client}</span>
                          ) : slot.status === "blocked" && slot.reason ? (
                            <span className="text-gray-500">{slot.reason}</span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {slot.status === "booked" && slot.type ? (
                            <div className="flex items-center gap-1">
                              {slot.type === "video" ? (
                                <Video className="h-4 w-4 text-blue-500" />
                              ) : (
                                <Phone className="h-4 w-4 text-green-500" />
                              )}
                              <span className="capitalize">{slot.type}</span>
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {slot.status === "available" && (
                              <Button variant="outline" size="sm">
                                Block
                              </Button>
                            )}
                            {slot.status === "blocked" && (
                              <Button variant="outline" size="sm">
                                Unblock
                              </Button>
                            )}
                            {slot.status === "booked" && (
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
