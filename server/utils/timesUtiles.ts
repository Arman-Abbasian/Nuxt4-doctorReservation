// تبدیل "08:30" به 510 دقیقه
export function timeToMinutes(timeStr: string) {
  const [hrs, mins] = timeStr.split(':').map(Number)
  if (hrs && mins) return hrs * 60 + mins
  return false
}

// تبدیل 525 دقیقه به "08:45"
export function minutesToTime(totalMins: number) {
  const hrs = Math.floor(totalMins / 60)
    .toString()
    .padStart(2, '0')
  const mins = (totalMins % 60).toString().padStart(2, '0')
  return `${hrs}:${mins}`
}
