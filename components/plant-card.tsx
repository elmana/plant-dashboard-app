"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Droplet, Sun, Wind, Trash2 } from "lucide-react"
import type { Plant } from "@/lib/types"
import { checkPlantCondition, getConditionEmoji, getConditionColor } from "@/lib/plant-monitor"
import { updatePlant, savePlants, getPlants } from "@/lib/plant-storage"
import { TweetFeed } from "./tweet-feed"
import { getHoursSince } from "@/lib/time-accelerator"

interface PlantCardProps {
  plant: Plant
  onUpdate: () => void
}

export function PlantCard({ plant, onUpdate }: PlantCardProps) {
  const condition = checkPlantCondition(plant)
  const conditionEmoji = getConditionEmoji(condition)
  const conditionColor = getConditionColor(condition)

  const handleWater = () => {
    const newLastWatered = new Date()
    const updatedPlant = { ...plant, lastWatered: newLastWatered }
    const newCondition = checkPlantCondition(updatedPlant)

    updatePlant(plant.id, {
      lastWatered: newLastWatered,
      condition: newCondition,
    })
    onUpdate()
  }

  const handleDelete = () => {
    const plants = getPlants()
    const filtered = plants.filter((p) => p.id !== plant.id)
    savePlants(filtered)
    onUpdate()
  }

  const hoursSinceWatered = getHoursSince(plant.lastWatered)

  return (
    <Card className="overflow-hidden border-2 border-green-200 dark:border-green-800 bg-white dark:bg-green-950/50">
      <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{plant.emoji}</span>
            <div>
              <CardTitle className="text-xl text-green-900 dark:text-green-100">{plant.name}</CardTitle>
              <p className="text-sm text-green-700 dark:text-green-300">{plant.type}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            className="text-red-600 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-6 space-y-4">
        {/* Status Badge */}
        <div className="flex items-center justify-between">
          <Badge variant="outline" className={`${conditionColor} border-current`}>
            {conditionEmoji} {condition.replace("-", " ").toUpperCase()}
          </Badge>
          <Button onClick={handleWater} size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Droplet className="w-4 h-4 mr-1" />
            Water
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="flex flex-col items-center p-2 bg-blue-50 dark:bg-blue-950/30 rounded">
            <Droplet className="w-4 h-4 mb-1 text-blue-600 dark:text-blue-400" />
            <span className="text-xs text-muted-foreground">{hoursSinceWatered}h ago</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-yellow-50 dark:bg-yellow-950/30 rounded">
            <Sun className="w-4 h-4 mb-1 text-yellow-600 dark:text-yellow-400" />
            <span className="text-xs text-muted-foreground">{plant.lightLevel}%</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-cyan-50 dark:bg-cyan-950/30 rounded">
            <Wind className="w-4 h-4 mb-1 text-cyan-600 dark:text-cyan-400" />
            <span className="text-xs text-muted-foreground">{plant.humidity}%</span>
          </div>
        </div>

        {/* Tweet Feed */}
        <TweetFeed plant={plant} onUpdate={onUpdate} />
      </CardContent>
    </Card>
  )
}
