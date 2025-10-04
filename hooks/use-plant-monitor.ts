"use client"

import { useEffect, useRef } from "react"
import { getPlants, updatePlant } from "@/lib/plant-storage"
import { checkPlantCondition } from "@/lib/plant-monitor"

export function usePlantMonitor(onUpdate: () => void) {
  const onUpdateRef = useRef(onUpdate)

  useEffect(() => {
    onUpdateRef.current = onUpdate
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const plants = getPlants()
      let hasChanges = false

      plants.forEach((plant) => {
        const newCondition = checkPlantCondition(plant)
        if (newCondition !== plant.condition) {
          updatePlant(plant.id, { condition: newCondition })
          hasChanges = true
        }
      })

      if (hasChanges) {
        onUpdateRef.current()
      }
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [])
}
