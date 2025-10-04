"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { addPlant } from "@/lib/plant-storage"
import { checkPlantCondition } from "@/lib/plant-monitor"

interface AddPlantDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onPlantAdded: () => void
}

const plantEmojis = ["🌱", "🌿", "🪴", "🌵", "🌴", "🌳", "🌲", "🍀", "🌾", "🌺"]

export function AddPlantDialog({ open, onOpenChange, onPlantAdded }: AddPlantDialogProps) {
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [emoji, setEmoji] = useState("🌱")
  const [lightLevel, setLightLevel] = useState([60])
  const [humidity, setHumidity] = useState([50])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const lastWatered = new Date()
    const plantData = {
      name,
      type,
      emoji,
      lastWatered,
      lightLevel: lightLevel[0],
      humidity: humidity[0],
      condition: "healthy" as const,
    }

    const newPlant = addPlant(plantData)
    // Update condition after creation
    const condition = checkPlantCondition(newPlant)
    addPlant({ ...plantData, condition })

    // Reset form
    setName("")
    setType("")
    setEmoji("🌱")
    setLightLevel([60])
    setHumidity([50])

    onPlantAdded()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Plant</DialogTitle>
          <DialogDescription>Add a plant to your dashboard and start receiving tweets</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Emoji Selection */}
          <div className="space-y-2">
            <Label>Choose an emoji</Label>
            <div className="flex flex-wrap gap-2">
              {plantEmojis.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setEmoji(e)}
                  className={`text-3xl p-2 rounded hover:bg-accent transition-colors ${
                    emoji === e ? "bg-accent ring-2 ring-green-600" : ""
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Plant Name</Label>
            <Input
              id="name"
              placeholder="e.g., Bob the Fern"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Type */}
          <div className="space-y-2">
            <Label htmlFor="type">Plant Type</Label>
            <Input
              id="type"
              placeholder="e.g., Boston Fern"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            />
          </div>

          {/* Light Level */}
          <div className="space-y-2">
            <Label>Light Level: {lightLevel[0]}%</Label>
            <Slider value={lightLevel} onValueChange={setLightLevel} max={100} step={1} />
          </div>

          {/* Humidity */}
          <div className="space-y-2">
            <Label>Humidity: {humidity[0]}%</Label>
            <Slider value={humidity} onValueChange={setHumidity} max={100} step={1} />
          </div>

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
            Add Plant
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
