"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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
} from "lucide-react";

interface VideoPlayerProps {
  isCompleted: boolean;
  onComplete: () => void;
}

export function VideoPlayer({ isCompleted, onComplete }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(245); // 4:05
  const [duration] = useState(1200); // 20:00
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLDivElement>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercentage = (currentTime / duration) * 100;

  return (
    <div className="space-y-6">
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
            src="/images/instructor.png"
            alt="Instructor teaching emotional resilience"
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
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded text-center max-w-4xl">
            <p className="text-lg">
              "Building emotional resilience is like strengthening a muscle. The
              more you practice these techniques, the stronger your ability to
              bounce back from challenges becomes."
            </p>
          </div>

          {/* Video Controls */}
          {showControls && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              {/* Progress Bar */}
              <div className="mb-4">
                <Progress
                  value={progressPercentage}
                  className="h-1 bg-white/20 cursor-pointer"
                />
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
                    {isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                  >
                    <SkipBack className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                  >
                    <SkipForward className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? (
                      <VolumeX className="h-5 w-5" />
                    ) : (
                      <Volume2 className="h-5 w-5" />
                    )}
                  </Button>

                  <span className="text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                  >
                    <Settings className="h-5 w-5" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                  >
                    <Maximize className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Lesson Actions */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Emotional Resilience Building</h2>
          <p className="text-muted-foreground">
            Learn practical techniques to build emotional resilience and bounce
            back from life's challenges with greater strength and clarity.
          </p>
        </div>

        <Button
          size="lg"
          className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8"
          onClick={onComplete}
        >
          {isCompleted ? "COMPLETED" : "COMPLETE & CONTINUE"}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>

      {/* Lesson Notes/Resources */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Key Takeaways</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>
                Resilience is a skill that can be developed through practice
              </span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>
                The 4-7-8 breathing technique helps regulate emotional responses
              </span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>Reframing negative thoughts builds mental strength</span>
            </li>
          </ul>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Practice Exercise</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Try the resilience-building exercise demonstrated in this lesson for
            the next 7 days.
          </p>
          <Button variant="outline" className="w-full">
            Download Exercise Guide
          </Button>
        </Card>
      </div>
    </div>
  );
}
