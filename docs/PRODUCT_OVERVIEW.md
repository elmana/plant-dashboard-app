## 2025-10-17
### Added
- Link to source of truth for health rule thresholds: lib/plant-monitor.ts → checkPlantCondition

### Changed
- Health Rules: clarified `low-humidity` threshold to `humidity < 35%` to match implementation in
  lib/plant-monitor.ts → checkPlantCondition

### Fixed
- Documentation now matches code for the low-humidity threshold

# Product Overview

## Goal
Keep plants alive by shaming… politely. The app alerts users via “tweets” when a plant is unhealthy.

## Core Use Cases
- As a user, I can **add** a plant with name, species, and optional avatar.
- As a user, I can **update** a plant’s **sun** and **humidity** readings.
- As a user, I can **water** a plant (resets `lastWateredAt`).
- As a user, I can **delete** a plant.
- As a user, I can **generate** an ad-hoc tweet.
- The system **auto-tweets every 6h** if the plant is not in `healthy`.

## Health Rules
- `thirsty` if `now - lastWateredAt > 72h`
- `low-light` if `sun < 30%`
- `low-humidity` if `humidity < 35%` (see lib/plant-monitor.ts → checkPlantCondition)
- `high-humidity` if `humidity > 80%`
- `healthy` otherwise

## Non-Goals (v1)
- Authentication/authorization
- Mobile app
- External social network posting

## Future
- Real API + DB (PostgreSQL/Azure SQL)
- Auth (Azure Entra ID/B2C)
- Sensors integration
- Real social network connectors
