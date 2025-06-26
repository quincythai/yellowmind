import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, ThumbsUp, MessageCircle, Share, Clock } from "lucide-react"

export function TodaysMindShort() {
  return (
    <Card className="bg-gradient-to-br from-yellow-100 to-yellow-200 border-yellow-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            Today's Mind Short
          </CardTitle>
          <Badge variant="outline" className="text-xs bg-white/50">
            <Clock className="w-3 h-3 mr-1" />
            2:34
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-400">
          <div className="absolute top-4 left-4">
            <Badge className="bg-red-600 text-white">Daily Short</Badge>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Button size="lg" className="rounded-full w-16 h-16 bg-white/90 text-gray-900 hover:bg-white">
              <Play className="h-6 w-6 ml-1" />
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-lg">5 Signs You're More Self-Aware Than You Think</h3>
          <p className="text-muted-foreground text-sm">
            Discover the subtle indicators of emotional intelligence that you might be overlooking in your daily life.
          </p>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="gap-2">
                <ThumbsUp className="h-4 w-4" />
                <span className="text-sm">127</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm">23</span>
              </Button>
              <Button variant="ghost" size="sm">
                <Share className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
