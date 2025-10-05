---
title: PRODUCT_OVERVIEW
---
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
- `low-humidity` if `humidity < `<SwmToken path="/lib/plant-monitor.ts" pos="23:10:10" line-data="  if (plant.humidity &lt; 30) {" repo-id="Z2l0aHViJTNBJTNBcGxhbnQtZGFzaGJvYXJkLWFwcCUzQSUzQWVsbWFuYQ==" repo-name="plant-dashboard-app">`30`</SwmToken>`%`
- `high-humidity` if `humidity > `<SwmToken path="/lib/plant-monitor.ts" pos="19:10:10" line-data="  if (plant.humidity &gt; 80) {" repo-id="Z2l0aHViJTNBJTNBcGxhbnQtZGFzaGJvYXJkLWFwcCUzQSUzQWVsbWFuYQ==" repo-name="plant-dashboard-app">`80`</SwmToken>`%`
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

<SwmMeta version="3.0.0"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
