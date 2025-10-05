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

export function formatTimeSince(date: Date): string {
  const hours = getHoursSince(date)

  if (hours < 24) {
    return `${hours}h ago`
  }

  const days = Math.floor(hours / 24)
  const remainingHours = hours % 24

  if (days < 30) {
    return remainingHours > 0 ? `${days}d ${remainingHours}h ago` : `${days}d ago`
  }

  const months = Math.floor(days / 30)
  const remainingDays = days % 30

  if (remainingDays > 0 && remainingHours > 0) {
    return `${months}mo ${remainingDays}d ${remainingHours}h ago`
  } else if (remainingDays > 0) {
    return `${months}mo ${remainingDays}d ago`
  } else {
    return `${months}mo ago`
  }
}

export function formatTweetTime(timestamp: Date): string {
  const realSecondsSince = Math.floor((Date.now() - timestamp.getTime()) / 1000)

  // Each real second = 1 hour in plant time
  const plantHours = realSecondsSince

  if (plantHours < 24) {
    return `${plantHours}h ago`
  }

  const days = Math.floor(plantHours / 24)
  const remainingHours = plantHours % 24

  if (remainingHours > 0) {
    return `${days}d ${remainingHours}h ago`
  }
  return `${days}d ago`
}
