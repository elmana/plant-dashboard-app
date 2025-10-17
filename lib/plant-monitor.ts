import type { Plant, PlantCondition } from "./types"
import { getHoursSince } from "./time-accelerator"

export function checkPlantCondition(plant: Plant): PlantCondition {
  const hoursSinceWatered = getHoursSince(plant.lastWatered)

  // Check water first (most critical)
  if (hoursSinceWatered > 72) {
    // 3 days
    return "thirsty"
  }

  // Check light
  if (plant.lightLevel < 30) {
    return "low-light"
  }

  // Check humidity
  if (plant.humidity > 80) {
    return "high-humidity"
  }

  if (plant.humidity < 40) {
    return "low-humidity"
  }

  return "healthy"
}

export function getConditionEmoji(condition: PlantCondition): string {
  const emojis = {
    healthy: "✨",
    thirsty: "💧",
    "low-light": "🌙",
    "high-humidity": "💦",
    "low-humidity": "🏜️",
  }
  return emojis[condition]
}

export function getConditionColor(condition: PlantCondition): string {
  const colors = {
    healthy: "text-green-600 dark:text-green-400",
    thirsty: "text-blue-600 dark:text-blue-400",
    "low-light": "text-yellow-600 dark:text-yellow-400",
    "high-humidity": "text-cyan-600 dark:text-cyan-400",
    "low-humidity": "text-orange-600 dark:text-orange-400",
  }
  return colors[condition]
}
