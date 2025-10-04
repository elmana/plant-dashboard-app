"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { PlantCard } from "@/components/plant-card"
import { AddPlantDialog } from "@/components/add-plant-dialog"
import { getPlants } from "@/lib/plant-storage"
import type { Plant } from "@/lib/types"
import { Sprout } from "lucide-react"

export default function Home() {
  const [plants, setPlants] = useState<Plant[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setPlants(getPlants())
  }, [])

  const handleUpdate = () => {
    setPlants(getPlants())
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950 dark:via-emerald-950 dark:to-teal-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sprout className="w-12 h-12 text-green-600 dark:text-green-400" />
            <h1 className="text-5xl font-bold text-green-900 dark:text-green-100 font-mono">LeafMeAlone</h1>
          </div>
          <p className="text-lg text-green-700 dark:text-green-300 max-w-2xl mx-auto text-balance">
            Your plants are tweeting. And they're not happy about your neglect.
          </p>
        </header>

        {/* Add Plant Button */}
        <div className="flex justify-center mb-8">
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Sprout className="w-5 h-5 mr-2" />
            Add Plant
          </Button>
        </div>

        {/* Plants Grid */}
        {plants.length === 0 ? (
          <div className="text-center py-20">
            <Sprout className="w-20 h-20 mx-auto mb-4 text-green-300 dark:text-green-700" />
            <h2 className="text-2xl font-semibold text-green-900 dark:text-green-100 mb-2">No plants yet</h2>
            <p className="text-green-700 dark:text-green-300 mb-6">
              Add your first plant to start receiving passive-aggressive tweets
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} onUpdate={handleUpdate} />
            ))}
          </div>
        )}

        {/* Add Plant Dialog */}
        <AddPlantDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onPlantAdded={handleUpdate} />
      </div>
    </div>
  )
}
