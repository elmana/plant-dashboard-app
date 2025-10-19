export type PlantCondition = "healthy" | "thirsty" | "low-light" | "high-humidity" | "low-humidity"

export interface Plant {
  id: string
  name: string
  owner: string
  type: string
  emoji: string
  lastWatered: Date
  lightLevel: number // 0-100
  humidity: number // 0-100
  condition: PlantCondition
  tweets: Tweet[]
}

export interface Tweet {
  id: string
  plantId: string
  message: string
  timestamp: Date
  condition: PlantCondition
}
