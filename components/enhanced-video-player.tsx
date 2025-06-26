"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  SkipBack,
  SkipForward,
  ArrowRight,
  BookOpen,
  MessageSquare,
} from "lucide-react"

interface EnhancedVideoPlayerProps {
  isCompleted: boolean
  onComplete: () => void
}

export function EnhancedVideoPlayer({ isCompleted, onComplete }: EnhancedVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(245) // 4:05
  const [duration] = useState(1200) // 20:00
  const [showControls, setShowControls] = useState(true)
  const videoRef = useRef<HTMLDivElement>(null)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const progressPercentage = (currentTime / duration) * 100

  return (
    <div className="space-y-6">
      {/* Lesson Title & Info */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">Principles of The Subconscious Mind 1-6</h1>
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
              Module 1 • Lesson 6
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Understanding how your subconscious mind influences your emotional responses and daily decisions.
          </p>
        </div>
        <Button variant="outline" size="sm">
          <BookOpen className="h-4 w-4 mr-2" />
          Lesson Notes
        </Button>
      </div>

      {/* Video Player */}
      <Card className="overflow-hidden bg-black">
        <div
          ref={videoRef}
          className="relative aspect-video bg-black cursor-pointer"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          {/* Video Content */}
          <img
            src="/images/lesson-instructor.png"
            alt="Instructor teaching about subconscious mind principles"
            className="w-full h-full object-cover"
          />

          {/* Play/Pause Overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <Button
                size="lg"
                className="w-20 h-20 rounded-full bg-white/90 text-black hover:bg-white"
                onClick={() => setIsPlaying(true)}
              >
                <Play className="h-8 w-8 ml-1" />
              </Button>
            </div>
          )}

          {/* Subtitles */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-6 py-3 rounded-lg text-center max-w-4xl">
            <p className="text-lg">
              "It's so interesting because we live so much of our lives, and so many of our decisions are influenced by
              our subconscious patterns and beliefs."
            </p>
          </div>

          {/* Video Controls */}
          {showControls && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              {/* Progress Bar */}
              <div className="mb-4">
                <Progress value={progressPercentage} className="h-1 bg-white/20 cursor-pointer" />
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </Button>

                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                    <SkipBack className="h-4 w-4" />
                  </Button>

                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                    <SkipForward className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </Button>

                  <span className="text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                    <Settings className="h-5 w-5" />
                  </Button>

                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                    <Maximize className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Lesson Actions & Discussion */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Key Concepts */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Key Concepts
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>The subconscious mind processes 11 million bits of information per second</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>95% of our daily decisions are made subconsciously</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Emotional patterns are stored in the subconscious and influence behavior</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Awareness is the first step to changing subconscious patterns</span>
              </li>
            </ul>
          </Card>

          {/* Discussion */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Lesson Discussion
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                    JD
                  </div>
                  <span className="font-medium text-sm">John Doe</span>
                  <span className="text-xs text-muted-foreground">2 hours ago</span>
                </div>
                <p className="text-sm">
                  This really opened my eyes to how much my subconscious affects my daily reactions. The awareness
                  exercise was particularly helpful!
                </p>
              </div>
              <Button variant="outline" className="w-full">
                Join Discussion
              </Button>
            </div>
          </Card>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          {/* Complete Lesson */}
          <Card className="p-6">
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
              onClick={onComplete}
            >
              {isCompleted ? "COMPLETED" : "COMPLETE & CONTINUE"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Card>

          {/* Practice Exercise */}
          <Card className="p-6">
            <h3 className="font-semibold mb-3">Practice Exercise</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Complete the subconscious pattern awareness journal for the next 3 days.
            </p>
            <Button variant="outline" className="w-full">
              Download Exercise
            </Button>
          </Card>

          {/* Next Lesson Preview */}
          <Card className="p-6">
            <h3 className="font-semibold mb-3">Up Next</h3>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Reprogramming Limiting Beliefs</h4>
              <p className="text-xs text-muted-foreground">
                Learn techniques to identify and transform limiting subconscious beliefs.
              </p>
              <Badge variant="outline" className="text-xs">
                15 min video
              </Badge>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
