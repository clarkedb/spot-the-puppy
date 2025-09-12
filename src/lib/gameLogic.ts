export function calcScore(time: number, level: number): number {
  const score = 100 + (1000 / time) * ((10 + level) / 10)
  return Math.floor(score)
}

export function makeNewPosition(containerWidth: number, containerHeight: number): [number, number] {
  // sprite dimensions are 75x75 pixels
  const spriteSize = 75

  // ensure positions stay within container bounds, accounting for sprite size
  const maxHeight = Math.max(0, containerHeight - spriteSize)
  const maxWidth = Math.max(0, containerWidth - spriteSize)

  const nh = Math.floor(Math.random() * maxHeight)
  const nw = Math.floor(Math.random() * maxWidth)

  return [nh, nw]
}

export function calcSpeed(
  prev: [number, number],
  next: [number, number],
  speedMod: number,
): number {
  const x = Math.abs(prev[1] - next[1])
  const y = Math.abs(prev[0] - next[0])

  const greatest = x > y ? x : y
  const speed = Math.ceil(greatest / speedMod)

  return speed
}

export function sanitizeUserName(name: string): string {
  return name.trim().replace(/\s+/g, '_')
}

export function getRandomGuestName(): string {
  const guestNames = ['scooby', 'snoopy', 'snoop_dog', 'pluto', 'old_yeller', 'fido', 'clifford']

  const index = Math.floor(Math.random() * guestNames.length)
  const randomNumber = Math.floor(Math.random() * 9000) + 1000 // generates 1000-9999
  return `${guestNames[index]}#${randomNumber}`
}
