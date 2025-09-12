import { describe, it, expect, vi } from 'vitest'
import {
  calcScore,
  makeNewPosition,
  calcSpeed,
  sanitizeUserName,
  getRandomGuestName
} from '../gameLogic'

describe('gameLogic', () => {
  describe('calcScore', () => {
    it('should calculate score correctly with basic values', () => {
      const score = calcScore(10, 1)
      const expected = Math.floor(100 + (1000 / 10) * ((10 + 1) / 10))
      expect(score).toBe(expected)
    })

    it('should calculate higher score for faster completion', () => {
      const fastScore = calcScore(5, 1)
      const slowScore = calcScore(20, 1)
      expect(fastScore).toBeGreaterThan(slowScore)
    })

    it('should calculate higher score for higher levels', () => {
      const lowLevelScore = calcScore(10, 1)
      const highLevelScore = calcScore(10, 5)
      expect(highLevelScore).toBeGreaterThan(lowLevelScore)
    })

    it('should return integer scores', () => {
      const score = calcScore(7.5, 2.3)
      expect(Number.isInteger(score)).toBe(true)
    })

    it('should handle edge cases', () => {
      expect(calcScore(1, 0)).toBeGreaterThan(0)
      expect(calcScore(1000, 20)).toBeGreaterThan(0)
    })
  })

  describe('makeNewPosition', () => {
    it('should return position within container bounds', () => {
      const [top, left] = makeNewPosition(800, 600)
      expect(top).toBeGreaterThanOrEqual(0)
      expect(top).toBeLessThanOrEqual(525) // 600 - 75 (sprite size)
      expect(left).toBeGreaterThanOrEqual(0)
      expect(left).toBeLessThanOrEqual(725) // 800 - 75 (sprite size)
    })

    it('should handle small containers', () => {
      const [top, left] = makeNewPosition(50, 50)
      expect(top).toBe(0) // max(0, 50 - 75) = 0
      expect(left).toBe(0) // max(0, 50 - 75) = 0
    })

    it('should handle exact sprite size containers', () => {
      const [top, left] = makeNewPosition(75, 75)
      expect(top).toBe(0)
      expect(left).toBe(0)
    })

    it('should return different positions on multiple calls', () => {
      // Mock Math.random to ensure different values
      const originalRandom = Math.random
      let callCount = 0
      vi.spyOn(Math, 'random').mockImplementation(() => {
        callCount++
        return callCount === 1 ? 0.2 : 0.8
      })

      const pos1 = makeNewPosition(800, 600)
      const pos2 = makeNewPosition(800, 600)

      // Should be different due to different random values
      expect(pos1).not.toEqual(pos2)

      Math.random = originalRandom
    })
  })

  describe('calcSpeed', () => {
    it('should calculate speed based on distance', () => {
      const prev: [number, number] = [0, 0]
      const next: [number, number] = [100, 100]
      const speed = calcSpeed(prev, next, 10)
      expect(speed).toBe(10) // Math.ceil(100 / 10)
    })

    it('should use the greater of x or y distance', () => {
      const prev: [number, number] = [0, 0]
      const nextX: [number, number] = [50, 200] // y distance is greater
      const nextY: [number, number] = [200, 50] // x distance is greater

      const speedX = calcSpeed(prev, nextX, 10)
      const speedY = calcSpeed(prev, nextY, 10)

      expect(speedX).toBe(20) // Math.ceil(200 / 10)
      expect(speedY).toBe(20) // Math.ceil(200 / 10)
    })

    it('should handle negative distances', () => {
      const prev: [number, number] = [100, 100]
      const next: [number, number] = [0, 0]
      const speed = calcSpeed(prev, next, 5)
      expect(speed).toBe(20) // Math.ceil(100 / 5)
    })

    it('should always return at least 1', () => {
      const prev: [number, number] = [0, 0]
      const next: [number, number] = [1, 1]
      const speed = calcSpeed(prev, next, 100)
      expect(speed).toBe(1) // Math.ceil(1 / 100) = 1
    })

    it('should handle zero distance', () => {
      const prev: [number, number] = [100, 100]
      const next: [number, number] = [100, 100]
      const speed = calcSpeed(prev, next, 10)
      expect(speed).toBe(0) // Math.ceil(0 / 10)
    })
  })

  describe('sanitizeUserName', () => {
    it('should trim whitespace', () => {
      expect(sanitizeUserName('  player  ')).toBe('player')
    })

    it('should replace spaces with underscores', () => {
      expect(sanitizeUserName('player name')).toBe('player_name')
    })

    it('should replace multiple spaces with single underscore', () => {
      expect(sanitizeUserName('player   name')).toBe('player_name')
    })

    it('should handle tabs and newlines', () => {
      expect(sanitizeUserName('player\t\nname')).toBe('player_name')
    })

    it('should handle empty string', () => {
      expect(sanitizeUserName('')).toBe('')
    })

    it('should handle string with only whitespace', () => {
      expect(sanitizeUserName('   ')).toBe('')
    })

    it('should handle complex combinations', () => {
      expect(sanitizeUserName('  My  Player\t Name  ')).toBe('My_Player_Name')
    })
  })

  describe('getRandomGuestName', () => {
    it('should return a string with expected format', () => {
      const name = getRandomGuestName()
      expect(name).toMatch(/^(scooby|snoopy|snoop_dog|pluto|old_yeller|fido|clifford)#\d{4}$/)
    })

    it('should contain a valid guest name', () => {
      const validNames = ['scooby', 'snoopy', 'snoop_dog', 'pluto', 'old_yeller', 'fido', 'clifford']
      const name = getRandomGuestName()
      const baseName = name.split('#')[0]
      expect(validNames).toContain(baseName)
    })

    it('should have a 4-digit number between 1000-9999', () => {
      const name = getRandomGuestName()
      const number = parseInt(name.split('#')[1])
      expect(number).toBeGreaterThanOrEqual(1000)
      expect(number).toBeLessThanOrEqual(9999)
    })

    it('should generate different names on multiple calls', () => {
      // Mock Math.random to ensure different values
      const originalRandom = Math.random
      let callCount = 0
      vi.spyOn(Math, 'random').mockImplementation(() => {
        callCount++
        return callCount === 1 || callCount === 2 ? 0.1 : 0.9
      })

      const name1 = getRandomGuestName()
      const name2 = getRandomGuestName()

      // Should be different due to different random values
      expect(name1).not.toBe(name2)

      Math.random = originalRandom
    })

    it('should always include # separator', () => {
      const name = getRandomGuestName()
      expect(name).toContain('#')
      expect(name.split('#')).toHaveLength(2)
    })
  })
})
