"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Droplet, Sun, Wind, Trash2, Edit2 } from "lucide-react"
import type { Plant } from "@/lib/types"
import { checkPlantCondition, getConditionEmoji, getConditionColor } from "@/lib/plant-monitor"
import { updatePlant, savePlants, getPlants } from "@/lib/plant-storage"
import { TweetFeed } from "./tweet-feed"
import { formatTimeSince, getAcceleratedTime } from "@/lib/time-accelerator"
import { useState } from "react"
import { Input } from "@/components/ui/input"

interface PlantCardProps {
  plant: Plant
  onUpdate: () => void
}

export function PlantCard({ plant, onUpdate }: PlantCardProps) {
  const [isEditingLight, setIsEditingLight] = useState(false)
  const [isEditingHumidity, setIsEditingHumidity] = useState(false)
  const [lightValue, setLightValue] = useState(plant.lightLevel.toString())
  const [humidityValue, setHumidityValue] = useState(plant.humidity.toString())

  const condition = checkPlantCondition(plant)
  const conditionEmoji = getConditionEmoji(condition)
  const conditionColor = getConditionColor(condition)

  const handleWater = () => {
    const newLastWatered = getAcceleratedTime()
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

  const handleLightSave = () => {
    const newLight = Math.max(0, Math.min(100, Number.parseInt(lightValue) || 0))
    const updatedPlant = { ...plant, lightLevel: newLight }
    const newCondition = checkPlantCondition(updatedPlant)

    updatePlant(plant.id, {
      lightLevel: newLight,
      condition: newCondition,
    })
    setIsEditingLight(false)
    onUpdate()
  }

  const handleHumiditySave = () => {
    const newHumidity = Math.max(0, Math.min(100, Number.parseInt(humidityValue) || 0))
    const updatedPlant = { ...plant, humidity: newHumidity }
    const newCondition = checkPlantCondition(updatedPlant)

    updatePlant(plant.id, {
      humidity: newHumidity,
      condition: newCondition,
    })
    setIsEditingHumidity(false)
    onUpdate()
  }

  const timeSinceWatered = formatTimeSince(plant.lastWatered)

  return (
    <Card className="overflow-hidden border-2 border-green-200 dark:border-green-800 bg-white dark:bg-green-950/50">
      <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{plant.emoji}</span>
            <div className="h-[4.5rem] flex flex-col justify-center">
              <CardTitle className="text-xl text-green-900 dark:text-green-100 line-clamp-2">{plant.name}</CardTitle>
              <p className="text-sm text-green-700 dark:text-green-300 line-clamp-1">{plant.type}</p>
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

      <CardContent className="pt-3 space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className={`${conditionColor}`}>
            {conditionEmoji} {condition.replace("-", " ").toUpperCase()}
          </Badge>
          <Button onClick={handleWater} size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Droplet className="w-4 h-4 mr-1" />
            Water
          </Button>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-950/30 rounded">
            <Droplet className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-xs text-muted-foreground">{timeSinceWatered}</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 p-2 bg-yellow-50 dark:bg-yellow-950/30 rounded relative group">
              <Sun className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
              {isEditingLight ? (
                <Input
                  type="number"
                  value={lightValue}
                  onChange={(e) => setLightValue(e.target.value)}
                  onBlur={handleLightSave}
                  onKeyDown={(e) => e.key === "Enter" && handleLightSave()}
                  className="h-6 w-16 text-xs text-center p-0"
                  autoFocus
                />
              ) : (
                <div className="flex items-center gap-1">
                  <span className="text-xs text-muted-foreground">{plant.lightLevel}%</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => setIsEditingLight(true)}
                  >
                    <Edit2 className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 p-2 bg-cyan-50 dark:bg-cyan-950/30 rounded relative group">
              <Wind className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              {isEditingHumidity ? (
                <Input
                  type="number"
                  value={humidityValue}
                  onChange={(e) => setHumidityValue(e.target.value)}
                  onBlur={handleHumiditySave}
                  onKeyDown={(e) => e.key === "Enter" && handleHumiditySave()}
                  className="h-6 w-16 text-xs text-center p-0"
                  autoFocus
                />
              ) : (
                <div className="flex items-center gap-1">
                  <span className="text-xs text-muted-foreground">{plant.humidity}%</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => setIsEditingHumidity(true)}
                  >
                    <Edit2 className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <TweetFeed plant={plant} onUpdate={onUpdate} />
      </CardContent>
    </Card>
  )
}
