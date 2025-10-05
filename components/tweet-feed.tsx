"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { MessageSquare, Sparkles } from "lucide-react"
import type { Plant } from "@/lib/types"
import { formatTweetTime } from "@/lib/time-accelerator"
import { addTweet } from "@/lib/plant-storage"
import { getRandomTweet } from "@/lib/pre-generated-tweets"
import { checkPlantCondition } from "@/lib/plant-monitor"
import { useState } from "react"

interface TweetFeedProps {
  plant: Plant
  onUpdate: () => void
}

export function TweetFeed({ plant, onUpdate }: TweetFeedProps) {
  const [newestTweetId, setNewestTweetId] = useState<string | null>(null)

  const handleGenerateTweet = () => {
    const message = getRandomTweet()
    const condition = checkPlantCondition(plant)
    const newTweet = addTweet(plant.id, { message, condition })
    setNewestTweetId(newTweet.id)
    onUpdate()

    setTimeout(() => setNewestTweetId(null), 1000)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          Recent Tweets
        </h3>
        <Button onClick={handleGenerateTweet} size="sm" variant="outline">
          <Sparkles className="w-4 h-4 mr-1" />
          Generate
        </Button>
      </div>

      {plant.tweets.length === 0 ? (
        <div className="text-center py-6 text-sm text-muted-foreground">
          No tweets yet. Click generate to hear from {plant.name}!
        </div>
      ) : (
        <ScrollArea className="h-48 rounded border border-border p-3">
          <div className="space-y-3">
            {plant.tweets.map((tweet) => (
              <div
                key={tweet.id}
                className={`p-3 bg-muted/50 rounded-lg border border-border/50 space-y-1 transition-all duration-1000 ${
                  tweet.id === newestTweetId
                    ? "animate-pulse bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-100 dark:from-yellow-900/50 dark:via-yellow-800/50 dark:to-yellow-900/50 shadow-lg scale-105"
                    : ""
                }`}
              >
                <p className="text-sm text-foreground leading-relaxed">{tweet.message}</p>
                <p className="text-xs text-muted-foreground">{formatTweetTime(tweet.timestamp)}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  )
}
