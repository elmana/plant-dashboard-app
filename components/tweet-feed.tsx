"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare } from "lucide-react"
import type { Plant } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"
import { TweetDialog } from "./tweet-dialog"

interface TweetFeedProps {
  plant: Plant
  onUpdate: () => void
}

export function TweetFeed({ plant, onUpdate }: TweetFeedProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          Recent Tweets
        </h3>
        <TweetDialog plant={plant} onUpdate={onUpdate} />
      </div>

      {plant.tweets.length === 0 ? (
        <div className="text-center py-6 text-sm text-muted-foreground">
          No tweets yet. Click generate to hear from {plant.name}!
        </div>
      ) : (
        <ScrollArea className="h-48 rounded border border-border p-3">
          <div className="space-y-3">
            {plant.tweets.map((tweet) => (
              <div key={tweet.id} className="p-3 bg-muted/50 rounded-lg border border-border/50 space-y-1">
                <p className="text-sm text-foreground leading-relaxed">{tweet.message}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(tweet.timestamp, { addSuffix: true })}
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  )
}
