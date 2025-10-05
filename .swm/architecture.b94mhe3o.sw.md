---
title: ARCHITECTURE
---
# Architecture

## Logical Components

- **Web UI (React)**: views, forms, tweet generator, scheduler trigger UI
- **Local Store (in-memory)**: plants array, timers
- **(Future) API**: REST endpoints for plants & tweeting
- **(Future) DB**: persistent storage
- **CI/CD**: build/test/deploy to Azure

```mermaid
flowchart LR
  subgraph Client [Browser]
    UI[React UI]
    Store[In-memory Store]
    Scheduler[6h Polling/Scheduler]
  end

  UI --> Store
  Scheduler --> Store
  UI -- future --> API[(REST API)]
  API --> DB[(Database)]

  classDef future fill:#eef,stroke:#99f,stroke-width:1px,stroke-dasharray:3 3
  class API,DB future
```

## Tweet Flow (Ad-hoc)

```mermaid

sequenceDiagram
  participant U as User
  participant UI as React UI
  participant S as In-memory Store
  U->>UI: Click "Generate"
  UI->>S: createTweet(plantId)
  S-->>UI: tweet text
  UI-->>U: Display toast/tweet
```

## Tweet Flow (Scheduled every 6h if unhealthy)

```mermaid
sequenceDiagram
  participant T as Scheduler ( )
  participant S as Store
  participant E as Evaluator
  T->>S: for each plant -> evaluate
  S->>E: getHealthStatus(plant)
  E-->>S: status (healthy | not)
  alt status != healthy
    S->>S: enqueueTweet(plantId,status)
  end
```

<SwmMeta version="3.0.0"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
