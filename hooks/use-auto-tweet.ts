"use client"

import { useEffect, useRef } from "react"
import { getPlants, addTweet, shouldGenerateTweet } from "@/lib/plant-storage"
import { checkPlantCondition } from "@/lib/plant-monitor"

const TWEET_CHECK_INTERVAL = 5 * 60 * 1000 // Check every 5 minutes

export function useAutoTweet(onUpdate: () => void) {
  const isGeneratingRef = useRef(false)
  const onUpdateRef = useRef(onUpdate)

  useEffect(() => {
    onUpdateRef.current = onUpdate
  })

  useEffect(() => {
    const checkAndGenerateTweets = async () => {
      if (isGeneratingRef.current) return
      isGeneratingRef.current = true

      try {
        const plants = getPlants()

        for (const plant of plants) {
          if (shouldGenerateTweet(plant)) {
            const condition = checkPlantCondition(plant)

            if (condition !== "healthy") {
              const hoursSinceWatered = Math.floor((Date.now() - plant.lastWatered.getTime()) / (1000 * 60 * 60))

              try {
                const response = await fetch("/api/generate-tweet", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    plantName: plant.name,
                    plantType: plant.type,
                    condition,
                    lightLevel: plant.lightLevel,
                    humidity: plant.humidity,
                    hoursSinceWatered,
                  }),
                })

                if (response.ok) {
                  const { tweet } = await response.json()
                  addTweet(plant.id, {
                    message: tweet,
                    condition,
                  })
                }
              } catch (error) {
                console.error(`Failed to auto-generate tweet for ${plant.name}:`, error)
              }
            }
          }
        }

        onUpdateRef.current()
      } finally {
        isGeneratingRef.current = false
      }
    }

    const interval = setInterval(checkAndGenerateTweets, TWEET_CHECK_INTERVAL)

    return () => clearInterval(interval)
  }, [])
}
