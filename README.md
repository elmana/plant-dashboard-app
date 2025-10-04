# LeafMeAlone

Your plants are tweeting. And they're not happy about your neglect.

## Features

- **Plant Dashboard**: Add and manage multiple plants with custom names, types, and emojis
- **Real-time Monitoring**: Tracks water levels, light, and humidity for each plant
- **AI-Generated Tweets**: Plants send passive-aggressive, developer-humor-filled tweets when neglected
- **Auto-Tweet System**: Tweets are automatically generated every 6 hours for unhealthy plants
- **Manual Tweet Generation**: Click the generate button to get instant feedback from your plants
- **Condition Tracking**: Visual indicators show plant health status (thirsty, low-light, etc.)

## How It Works

1. **Add Plants**: Click "Add Plant" to add your plants with their current conditions
2. **Monitor Status**: Each plant card shows water, light, and humidity levels
3. **Receive Tweets**: Plants automatically tweet every 6 hours if they're unhealthy
4. **Take Action**: Water your plants or adjust conditions to keep them happy
5. **Enjoy the Humor**: Read passive-aggressive tweets filled with developer jokes

## Tweet Examples

- "Still waiting for water like I'm waiting for my PR to be reviewed. Day 3. Send help."
- "My light level is lower than my code coverage. At least TDD my watering schedule?"
- "404: Water Not Found. It's been 72 hours. Even my leaves are throwing exceptions now."

## Tech Stack

- Next.js 15 with App Router
- TypeScript
- Tailwind CSS v4
- AI SDK (OpenAI GPT-4o-mini)
- localStorage for data persistence
- shadcn/ui components

## Development

The app uses client-side storage (localStorage) and automatically monitors plant conditions every minute. Tweets are generated every 6 hours for plants that aren't healthy, or you can manually trigger tweet generation at any time.
