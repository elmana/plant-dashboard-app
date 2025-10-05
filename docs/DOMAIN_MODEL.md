# Domain Model

```mermaid
classDiagram
  class Plant {
    +string id
    +string name
    +string species
    +int sunPercent (0..100)
    +int humidityPercent (0..100)
    +Date lastWateredAt
    +PlantStatus status
  }

  class PlantStatus {
    <<enum>>
    healthy
    thirsty
    low-light
    low-humidity
    high-humidity
  }

  class Tweet {
    +string id
    +string plantId
    +string text
    +Date createdAt
    +TweetOrigin origin  // scheduled | manual
  }

  class TweetOrigin {
    <<enum>>
    scheduled
    manual
  }

  Plant "1" -- "0..*" Tweet : generates
