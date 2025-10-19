# 🧩 Domain Model – LeafMeAlone

This document defines the data model for **LeafMeAlone**, describing how plants, their environmental states, and their tweets are structured and related.

---

## 🌱 Overview

Each plant in **LeafMeAlone** has:
- A unique ID, name, type, and emoji  
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

Note: the Plant interface no longer includes an `owner` field. If you have persisted Plant objects (for example in `localStorage`), update/migrate stored data structures to match the revised interface.

Implementation note: the application classifies a plant as low-humidity when humidity < 35 (percent).

Additional details:
- The low-humidity classification uses a strict less-than comparison against 35%. For example, a plant
  with humidity = 34 is classified as "low-humidity", while humidity = 35 is not.

```mermaid
erDiagram
    PLANT {
        string id
        string name
        string type
        string emoji
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
