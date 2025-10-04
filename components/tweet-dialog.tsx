"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles } from "lucide-react"
import { preGeneratedTweets, getTweetByIndex } from "@/lib/pre-generated-tweets"
import { addTweet } from "@/lib/plant-storage"
import { checkPlantCondition } from "@/lib/plant-monitor"
import type { Plant } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

interface TweetDialogProps {
  plant: Plant
  onUpdate: () => void
}

export function TweetDialog({ plant, onUpdate }: TweetDialogProps) {
  const [open, setOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<string>("0")
  const { toast } = useToast()

  const handleAddTweet = () => {
    const condition = checkPlantCondition(plant)
    const tweet = getTweetByIndex(Number.parseInt(selectedIndex))

    addTweet(plant.id, {
      message: tweet,
      condition,
    })

    onUpdate()

    toast({
      title: "Tweet posted!",
      description: `${plant.name} has spoken.`,
    })

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-xs">
          <Sparkles className="w-3 h-3 mr-1" />
          Generate
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Choose a Tweet for {plant.name}</DialogTitle>
          <DialogDescription>Select a passive-aggressive message from the dropdown below.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Select value={selectedIndex} onValueChange={setSelectedIndex}>
            <SelectTrigger>
              <SelectValue placeholder="Select a tweet..." />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {preGeneratedTweets.map((tweet, index) => (
                <SelectItem key={index} value={index.toString()}>
                  {tweet}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="p-4 bg-muted rounded-lg border">
            <p className="text-sm text-foreground leading-relaxed">{getTweetByIndex(Number.parseInt(selectedIndex))}</p>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddTweet}>Post Tweet</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
