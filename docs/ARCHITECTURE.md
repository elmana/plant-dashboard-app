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
