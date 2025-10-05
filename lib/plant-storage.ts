import type { Plant, Tweet } from "./types"

const STORAGE_KEY = "leafmealone_plants"
const TWEET_INTERVAL = 6 * 60 * 60 * 1000 // 6 hours in milliseconds
const INITIALIZED_KEY = "leafmealone_initialized"

function getDefaultPlants(): Plant[] {
  const now = new Date()
  const threeWeeksAgo = new Date(now.getTime() - 21 * 24 * 60 * 60 * 1000)

  return [
    {
      id: crypto.randomUUID(),
      name: "Cvijetak Zanovijetak",
      type: "Flowering Plant",
      emoji: "🌺",
      lastWatered: now,
      lightLevel: 20, // low light
      humidity: 30, // low humidity
      condition: "low-light",
      tweets: [],
    },
    {
      id: crypto.randomUUID(),
      name: "kaTKus",
      type: "Cactus",
      emoji: "🌵",
      lastWatered: threeWeeksAgo, // 3 weeks ago
      lightLevel: 25, // low light
      humidity: 50, // ok humidity
      condition: "thirsty",
      tweets: [],
    },
    {
      id: crypto.randomUUID(),
      name: "Selfikus Pokus",
      type: "Potted Plant",
      emoji: "🪴",
      lastWatered: now,
      lightLevel: 70, // good light
      humidity: 60, // good humidity
      condition: "healthy",
      tweets: [],
    },
  ]
}

export function getPlants(): Plant[] {
  if (typeof window === "undefined") return []

  const isInitialized = localStorage.getItem(INITIALIZED_KEY)
  if (!isInitialized) {
    const defaultPlants = getDefaultPlants()
    savePlants(defaultPlants)
    localStorage.setItem(INITIALIZED_KEY, "true")
    return defaultPlants
  }

  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    const defaultPlants = getDefaultPlants()
    savePlants(defaultPlants)
    return defaultPlants
  }

  const plants = JSON.parse(stored)
  return plants.map((plant: any) => ({
    ...plant,
    lastWatered: new Date(plant.lastWatered),
    tweets: plant.tweets.map((tweet: any) => ({
      ...tweet,
      timestamp: new Date(tweet.timestamp),
    })),
  }))
}

export function savePlants(plants: Plant[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plants))
}

export function addPlant(plant: Omit<Plant, "id" | "tweets">): Plant {
  const plants = getPlants()
  const newPlant: Plant = {
    ...plant,
    id: crypto.randomUUID(),
    tweets: [],
  }
  plants.push(newPlant)
  savePlants(plants)
  return newPlant
}

export function updatePlant(id: string, updates: Partial<Plant>): void {
  const plants = getPlants()
  const index = plants.findIndex((p) => p.id === id)
  if (index !== -1) {
    plants[index] = { ...plants[index], ...updates }
    savePlants(plants)
  }
}

export function addTweet(plantId: string, tweet: Omit<Tweet, "id" | "plantId" | "timestamp">): Tweet {
  const plants = getPlants()
  const plant = plants.find((p) => p.id === plantId)
  if (plant) {
    const newTweet: Tweet = {
      ...tweet,
      id: crypto.randomUUID(),
      plantId,
      timestamp: new Date(),
    }
    plant.tweets.unshift(newTweet)
    plant.tweets = plant.tweets.slice(0, 20)
    savePlants(plants)
    return newTweet
  }
  // Return a dummy tweet if plant not found (shouldn't happen)
  return {
    id: crypto.randomUUID(),
    plantId,
    timestamp: new Date(),
    message: "",
    condition: "healthy",
  }
}

export function shouldGenerateTweet(plant: Plant): boolean {
  if (plant.tweets.length === 0) return true
  const lastTweet = plant.tweets[0]
  const timeSinceLastTweet = Date.now() - lastTweet.timestamp.getTime()
  return timeSinceLastTweet >= TWEET_INTERVAL
}
