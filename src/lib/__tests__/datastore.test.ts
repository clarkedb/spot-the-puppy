import { describe, it, expect, beforeEach } from 'vitest'
import { datastore } from '../datastore'

describe('InMemoryDatastore', () => {
  // Note: Since datastore is a singleton, we need to be careful about test isolation
  // We'll reset state between tests that affect it

  beforeEach(async () => {
    // Reset high score to initial state
    await datastore.updateHighScore(100, "R2-D2")
    // Reset high level to initial state
    await datastore.updateHighLevel(1, "Ferb")
  })

  describe('High Score Management', () => {
    it('should return initial high score', async () => {
      const highScore = await datastore.getHighScore()
      expect(highScore).toEqual({ score: 100, player: "R2-D2" })
    })

    it('should update high score when new score is higher', async () => {
      const newScore = await datastore.updateHighScore(500, "TestPlayer")
      expect(newScore).toEqual({ score: 500, player: "TestPlayer" })

      const retrievedScore = await datastore.getHighScore()
      expect(retrievedScore).toEqual({ score: 500, player: "TestPlayer" })
    })

    it('should not update high score when new score is lower', async () => {
      // First set a high score
      await datastore.updateHighScore(1000, "HighScorer")

      // Try to update with lower score
      const result = await datastore.updateHighScore(500, "LowScorer")
      expect(result).toEqual({ score: 1000, player: "HighScorer" })
    })

    it('should return a copy, not the original object', async () => {
      const score1 = await datastore.getHighScore()
      const score2 = await datastore.getHighScore()

      expect(score1).toEqual(score2)
      expect(score1).not.toBe(score2) // Different object instances
    })
  })

  describe('High Level Management', () => {
    it('should return initial high level', async () => {
      const highLevel = await datastore.getHighLevel()
      expect(highLevel).toEqual({ level: 1, player: "Ferb" })
    })

    it('should update high level when new level is higher', async () => {
      const newLevel = await datastore.updateHighLevel(5, "TestPlayer")
      expect(newLevel).toEqual({ level: 5, player: "TestPlayer" })

      const retrievedLevel = await datastore.getHighLevel()
      expect(retrievedLevel).toEqual({ level: 5, player: "TestPlayer" })
    })

    it('should not update high level when new level is lower', async () => {
      // First set a high level
      await datastore.updateHighLevel(10, "HighLeveler")

      // Try to update with lower level
      const result = await datastore.updateHighLevel(3, "LowLeveler")
      expect(result).toEqual({ level: 10, player: "HighLeveler" })
    })

    it('should return a copy, not the original object', async () => {
      const level1 = await datastore.getHighLevel()
      const level2 = await datastore.getHighLevel()

      expect(level1).toEqual(level2)
      expect(level1).not.toBe(level2) // Different object instances
    })
  })

  describe('Level Scores Management', () => {
    it('should return initial level scores', async () => {
      const scores = await datastore.getLevelScores(1)
      expect(scores).toHaveLength(5)
      expect(scores.every(score => score.score === 100 && score.player === "Anonymous")).toBe(true)
    })

    it('should return empty array for invalid level', async () => {
      const scores = await datastore.getLevelScores(999)
      expect(scores).toEqual([])
    })

    it('should update level scores correctly for new high score', async () => {
      const updatedScores = await datastore.updateLevelScore(1, 500, "NewPlayer")
      expect(updatedScores[0]).toEqual({ score: 500, player: "NewPlayer" })
      expect(updatedScores[1]).toEqual({ score: 100, player: "Anonymous" })
    })

    it('should insert score at correct position', async () => {
      // Use a different level to avoid interference from other tests
      const level = 15
      await datastore.updateLevelScore(level, 300, "Player1")
      await datastore.updateLevelScore(level, 600, "Player2")
      const scores = await datastore.updateLevelScore(level, 400, "Player3")

      expect(scores[0].score).toBe(600)
      expect(scores[1].score).toBe(400)
      expect(scores[2].score).toBe(300)
    })

    it('should maintain maximum of 5 scores per level', async () => {
      // Fill up with 5 high scores
      for (let i = 0; i < 6; i++) {
        await datastore.updateLevelScore(2, 1000 + i, `Player${i}`)
      }

      const scores = await datastore.getLevelScores(2)
      expect(scores).toHaveLength(5)
      expect(scores[0].score).toBe(1005) // Highest score
      expect(scores[4].score).toBe(1001) // 5th highest score
    })

    it('should not update if score is too low for top 5', async () => {
      // Set up 5 high scores
      for (let i = 0; i < 5; i++) {
        await datastore.updateLevelScore(3, 1000 + i, `HighPlayer${i}`)
      }

      // Try to add a low score
      const scores = await datastore.updateLevelScore(3, 50, "LowPlayer")

      // Should still have the original 5 high scores
      expect(scores.every(score => score.score >= 1000)).toBe(true)
      expect(scores.find(score => score.player === "LowPlayer")).toBeUndefined()
    })

    it('should return a copy of scores array', async () => {
      const scores1 = await datastore.getLevelScores(1)
      const scores2 = await datastore.getLevelScores(1)

      expect(scores1).toEqual(scores2)
      expect(scores1).not.toBe(scores2) // Different array instances
    })
  })

  describe('Champions Management', () => {
    it('should return initial champions', async () => {
      const champions = await datastore.getChampions()
      expect(champions).toEqual([{ score: 5000, player: "Clark Brown" }])
    })

    it('should add new champion', async () => {
      const champions = await datastore.addChampion(7500, "NewChampion")
      expect(champions).toHaveLength(2)
      expect(champions[1]).toEqual({ score: 7500, player: "NewChampion" })
    })

    it('should add multiple champions', async () => {
      await datastore.addChampion(6000, "Champion1")
      const champions = await datastore.addChampion(8000, "Champion2")

      // Should contain initial champion plus the two new ones
      expect(champions.length).toBeGreaterThanOrEqual(3)
      expect(champions[champions.length - 1]).toEqual({ score: 8000, player: "Champion2" })
    })

    it('should return a copy of champions array', async () => {
      const champions1 = await datastore.getChampions()
      const champions2 = await datastore.getChampions()

      expect(champions1).toEqual(champions2)
      expect(champions1).not.toBe(champions2) // Different array instances
    })
  })

  describe('All Scores Management', () => {
    it('should return all level scores as a Map', async () => {
      const allScores = await datastore.getAllScores()
      expect(allScores).toBeInstanceOf(Map)
      expect(allScores.size).toBe(20) // Levels 1-20

      // Check a specific level
      const level1Scores = allScores.get(1)
      expect(level1Scores).toHaveLength(5)
    })

    it('should return a copy of the scores Map', async () => {
      const allScores1 = await datastore.getAllScores()
      const allScores2 = await datastore.getAllScores()

      expect(allScores1).toEqual(allScores2)
      expect(allScores1).not.toBe(allScores2) // Different Map instances
    })

    it('should include all levels from 1 to 20', async () => {
      const allScores = await datastore.getAllScores()

      for (let level = 1; level <= 20; level++) {
        expect(allScores.has(level)).toBe(true)
        const levelScores = allScores.get(level)
        expect(levelScores).toHaveLength(5)
      }
    })
  })

  describe('Data Integrity', () => {
    it('should maintain separate score lists for different levels', async () => {
      await datastore.updateLevelScore(1, 1000, "Level1Player")
      await datastore.updateLevelScore(2, 2000, "Level2Player")

      const level1Scores = await datastore.getLevelScores(1)
      const level2Scores = await datastore.getLevelScores(2)

      expect(level1Scores[0].player).toBe("Level1Player")
      expect(level2Scores[0].player).toBe("Level2Player")
    })

    it('should handle concurrent operations safely', async () => {
      // Use a different level to avoid interference from other tests
      const level = 19
      // Simulate concurrent score updates
      const promises = [
        datastore.updateLevelScore(level, 500, "Player1"),
        datastore.updateLevelScore(level, 600, "Player2"),
        datastore.updateLevelScore(level, 400, "Player3")
      ]

      const results = await Promise.all(promises)

      // All operations should complete successfully
      expect(results).toHaveLength(3)

      // Final state should be consistent (check the final result has our scores)
      const finalScores = await datastore.getLevelScores(level)
      const ourScores = finalScores.filter(score =>
        ['Player1', 'Player2', 'Player3'].includes(score.player)
      )
      expect(ourScores.length).toBe(3)
    })
  })
})
