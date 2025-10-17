# 🧩 Domain Model – LeafMeAlone

This document defines the data model for **LeafMeAlone**, describing how plants, their environmental states, and their tweets are structured and related.

---

## 🌱 Overview

Each plant in **LeafMeAlone** has:
- A unique ID, name, type, and emoji  
- owner: string — identifier for the plant owner
- Environmental data (light and humidity levels)  
- A `lastWatered` timestamp  
- A `condition` reflecting its health status  
- A list of `Tweet` messages generated based on its condition  

Tweets are stored locally (in `localStorage`) for now, and generated every 6 hours when a plant is unhealthy, or manually on demand.

---

## 🧠 Type Definitions (TypeScript)

```ts
export type PlantCondition =
  | "healthy"
  | "thirsty"
  | "low-light"
  | "high-humidity"
  | "low-humidity"

export interface Plant {
  id: string
  name: string
  type: string
  emoji: string
  owner: string
  lastWatered: Date
  lightLevel: number // 0–100
  humidity: number // 0–100
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
```

Implementation note: the application classifies a plant as low-humidity when humidity < 35 (percent).

Note (implementation source): the authoritative mapping from Plant.humidity to PlantCondition is implemented
in the checkPlantCondition function (lib/plant-monitor.ts). Refer to that function for the exact
classification logic and any future threshold adjustments.

```mermaid
erDiagram
    PLANT {
        string id
        string name
        string type
        string emoji
        string owner
        date lastWatered
        number lightLevel
        number humidity
        string condition
    }

    TWEET {
        string id
        string plantId
        string message
        date timestamp
        string condition
    }

    PLANT ||--o{ TWEET : "generates"
 ```
