import type { Plant, Tweet } from "./types"

const STORAGE_KEY = "leafmealone_plants"
const TWEET_INTERVAL = 6 * 60 * 60 * 1000 // 6 hours in milliseconds

export function getPlants(): Plant[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return []

  const plants = JSON.parse(stored)
  // Convert date strings back to Date objects
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

export function addTweet(plantId: string, tweet: Omit<Tweet, "id" | "plantId" | "timestamp">): void {
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
    // Keep only last 20 tweets per plant
    plant.tweets = plant.tweets.slice(0, 20)
    savePlants(plants)
  }
}

export function shouldGenerateTweet(plant: Plant): boolean {
  if (plant.tweets.length === 0) return true
  const lastTweet = plant.tweets[0]
  const timeSinceLastTweet = Date.now() - lastTweet.timestamp.getTime()
  return timeSinceLastTweet >= TWEET_INTERVAL
}
