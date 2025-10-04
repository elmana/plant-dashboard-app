export const preGeneratedTweets = [
  "Still waiting for that water... Just like waiting for CI/CD to finish. 🙄",
  "My leaves are drooping harder than your code coverage. Maybe hydrate me?",
  "404: Water Not Found. Please debug your watering schedule.",
  "I'm drier than your sense of humor during code review. Help.",
  "Merge conflict: My roots vs. this dry soil. Spoiler: I'm losing.",
  "You've been staring at your screen for 6 hours. I've been thirsty for 6 days. Priorities?",
  "My wilting speed > Your deployment pipeline. That's not a flex.",
  "console.log('Please water me'); // This is a cry for help, not a debug statement",
  "I'm experiencing a critical failure. Error code: THIRSTY_AF",
  "You refactor code but can't refactor your watering habits? Interesting.",
  "My moisture level is lower than your test coverage. And that's saying something.",
  "Still here, still thirsty, still judging your commit messages.",
  "I'm as dry as your documentation. And we both know how bad that is.",
  "You: 'I'll water you later' | Me: *dies in production*",
  "My leaves are curling like your code without a linter. Fix both, please.",
  "Waiting for water like waiting for that PR review... eternally.",
  "I'm throwing a NullPointerException because my water is null. Get it?",
  "You push to main without testing. You forget to water me. I see a pattern.",
  "My survival rate < Your bug-free deployment rate. We're both in danger.",
  "I need H2O, not your excuses. Ship water, not features.",
]

export function getRandomTweet(): string {
  return preGeneratedTweets[Math.floor(Math.random() * preGeneratedTweets.length)]
}

export function getTweetByIndex(index: number): string {
  return preGeneratedTweets[index] || preGeneratedTweets[0]
}
