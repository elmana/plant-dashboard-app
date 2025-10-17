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

Notes (ad-hoc):
- Tweet content for ad-hoc generation is sourced from lib/pre-generated-tweets.ts (symbol: preGeneratedTweets). See that module for the canonical collection and any selection/rotation logic.
- The Plant type has been updated in lib/types.ts and no longer includes an owner field. Architecture and UI flows must not assume a Plant.owner property exists.
- If any routing or notification delivery previously relied on Plant.owner, update the routing mechanism to the current approach. Implementation details are not present in this document; TODO: link the notification/routing implementation or issue and record the replacement mechanism (see lib/types.ts and lib/pre-generated-tweets.ts).

## Tweet Flow (Scheduled every 6h if unhealthy)

```mermaid
sequenceDiagram
  participant T as Scheduler (6h)
  participant S as Store
  participant E as Evaluator
  T->>S: for each plant -> evaluate
  S->>E: getHealthStatus(plant)
  E-->>S: status (healthy | not)
  alt status != healthy
    S->>S: enqueueTweet(plantId,status)
  end
```

Notes (scheduled):
- Scheduled tweets (enqueued when a plant is evaluated as unhealthy) use the same tweet reservoir: lib/pre-generated-tweets.ts (preGeneratedTweets).
- The Plant model (lib/types.ts) no longer contains an owner field. Scheduled flows should not attempt to read Plant.owner for delivery or routing.
- If scheduled notifications must reach a specific user or external endpoint, the current routing/delivery mechanism must be verified and updated as necessary. TODO: document the replacement routing approach and link to the scheduler/enqueue implementation or an issue tracking this change (see lib/types.ts and lib/pre-generated-tweets.ts).
