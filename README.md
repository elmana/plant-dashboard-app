# 🌿 LeafMeAlone

> Your plants are tweeting. And they're not happy about your neglect.

---

## 🪴 Overview

**LeafMeAlone** is a lightweight web app that lets your plants roast you when you forget to water them or give them enough light.  
Each plant tracks its environment, determines its health, and posts developer-humor-filled “tweets” every 6 hours when unhealthy.

---

## ✨ Features

- **Plant Dashboard** — Add and manage multiple plants with custom names, types, and emojis  
- **Real-time Monitoring** — Tracks *water*, *light*, and *humidity* for each plant  
- **AI-Generated Tweets** — Passive-aggressive developer jokes powered by GPT-4o-mini  
- **Auto-Tweet System** — Automatic tweets every 6 hours for unhealthy plants  
- **Manual Tweet Generation** — Click “Generate” to instantly trigger a tweet  
- **Condition Tracking** — Visual indicators show plant health (💧 thirsty, 🌙 low-light, etc.)

---

## 🌱 How It Works

1. **Add Plants** — Click “Add Plant” and set initial conditions  
2. **Monitor Status** — Each card shows water, sun, and humidity levels  
3. **Receive Tweets** — Every 6 hours, unhealthy plants tweet reminders  
4. **Take Action** — Water plants or adjust light/humidity  
5. **Enjoy the Humor** — Laugh (and maybe cry) at passive-aggressive AI sass  

---

## 💬 Example Tweets

> - “Still waiting for water like I'm waiting for my PR to be reviewed. Day 3. Send help.”  
> - “My light level is lower than my code coverage. At least TDD my watering schedule?”  
> - “404: Water Not Found. It’s been 72 hours. Even my leaves are throwing exceptions now.”  
> - “You push to main without testing. You forget to water me. I see a pattern.”

Full list → [📜 Tweet Catalog](docs/TWEET_CATALOG.md)

---

## 🧠 Plant Health Logic

| Condition | Trigger | Emoji |
|------------|----------|--------|
| **Healthy** | Default | ✨ |
| **Thirsty** | > 72 h since last watering | 💧 |
| **Low-Light** | Sun < 30 % | 🌙 |
| **Low-Humidity** | Humidity < 30 % | 🏜️ |
| **High-Humidity** | Humidity > 80 % | 💦 |

```mermaid
stateDiagram-v2
  state "low-light" as LowLight
  state "low-humidity" as LowHumidity
  state "high-humidity" as HighHumidity
  state "thirsty" as Thirsty
  state "healthy" as Healthy

  [*] --> Healthy

  Healthy --> Thirsty: > 72h since water
  Healthy --> LowLight: sun < 30%
  Healthy --> LowHumidity: humidity < 30%
  Healthy --> HighHumidity: humidity > 80%

  Thirsty --> Healthy: water()
  LowLight --> Healthy: sun >= 30%
  LowHumidity --> Healthy: humidity >= 30%
  HighHumidity --> Healthy: humidity <= 80%

```

Note: These thresholds mirror the runtime logic in lib/plant-monitor.ts (source of truth).

Appendix: Owner field (runtime patch)

- The Plant domain now includes an optional `owner` field. This field was introduced in the latest patch to track the user responsible for a plant.

Example TypeScript representation:

```ts
type Plant = {
  id: string
  name: string
  type: string
  emoji?: string
  lastWateredAt?: string // ISO timestamp
  sunPercent?: number
  humidityPercent?: number
  // New in latest patch:
  owner?: string // e.g. "alice@example.com"
}
```

---

## 🧰 Tech Stack

- **Next.js 15 (App Router)**
- **TypeScript**
- **Tailwind CSS v4**
- **AI SDK (OpenAI GPT-4o-mini)**
- **localStorage** for persistence
- **shadcn/ui components**
- **Azure Static Web Apps Hosting**
- **CI/CD with GitHub Actions**

---

## 🧪 Development

The app uses client-side storage (`localStorage`) and automatically evaluates plant conditions every minute.  
Tweets are generated automatically every 6 hours for unhealthy plants, or manually on demand.

### Run Locally
```bash
npm ci
npm run dev
```

---

## 🧩 Documentation Index

| Section | Description |
|----------|--------------|
| [Product Overview](docs/PRODUCT_OVERVIEW.md) | Core concept and user stories |
| [Architecture](docs/ARCHITECTURE.md) | Components & data flow |
| [Domain Model](docs/DOMAIN_MODEL.md) | Entities and relationships |
| [State Machine](docs/STATE_MACHINE.md) | Health transitions |
| [API Design (planned)](docs/API_DESIGN.md) | REST endpoints draft |
| [CI/CD Pipeline](docs/CI_CD.md) | Build & deploy |
| [Security (planned)](docs/SECURITY.md) | Auth roadmap |
| [Roadmap](docs/ROADMAP.md) | Release and growth plan |
| [Tweet Catalog](docs/TWEET_CATALOG.md) | Full tweet list |
| [Changelog](docs/CHANGELOG.md) | Version history |
| [Release Notes Template](docs/RELEASE_NOTES_TEMPLATE.md) | Future releases |
| [Contributing](docs/CONTRIBUTING.md) | Dev guidelines |
| [Configuration](docs/CONFIGURATION.md) | Environment variables |

---

## 🚀 Road Ahead

- Add auth (Azure Entra ID / B2C)  
- Introduce API + DB (PostgreSQL/Azure SQL)  
- Scheduled Azure Function for tweets  
- Real IoT sensor integration  
- Social posting (X/Mastodon)

---

> 💚 **Motto:** “Ship water, not features.”

