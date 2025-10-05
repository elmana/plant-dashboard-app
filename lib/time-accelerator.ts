const TIME_OFFSET_KEY = "leafmealone_time_offset"

// Get the current accelerated time offset in milliseconds
export function getTimeOffset(): number {
  if (typeof window === "undefined") return 0
  const stored = localStorage.getItem(TIME_OFFSET_KEY)
  return stored ? Number.parseInt(stored, 10) : 0
}

// Set the time offset
export function setTimeOffset(offset: number): void {
  if (typeof window === "undefined") return
  localStorage.setItem(TIME_OFFSET_KEY, offset.toString())
}

// Get the accelerated current time
export function getAcceleratedTime(): Date {
  return new Date(Date.now() + getTimeOffset())
}

// Calculate hours since a date, accounting for time acceleration
export function getHoursSince(date: Date): number {
  const acceleratedNow = getAcceleratedTime()
  return Math.floor((acceleratedNow.getTime() - date.getTime()) / (1000 * 60 * 60))
}
