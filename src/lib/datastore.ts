export interface Score {
  score: number;
  player: string;
}

export interface LeaderboardEntry {
  score: number;
  player: string;
}

class InMemoryDatastore {
  private highScore: Score = { score: 100, player: "R2-D2" };
  private highLevel: { level: number; player: string } = { level: 1, player: "Ferb" };
  private levelScores: Map<number, Score[]> = new Map();
  private champions: Score[] = [{ score: 5000, player: "Clark Brown" }];

  constructor() {
    // initialize level scores (1-20)
    for (let i = 1; i <= 20; i++) {
      this.levelScores.set(i, Array(5).fill({ score: 100, player: "Anonymous" }));
    }
  }

  async getHighScore(): Promise<Score> {
    return { ...this.highScore };
  }

  async updateHighScore(score: number, player: string): Promise<Score> {
    if (score > this.highScore.score) {
      this.highScore = { score, player };
    }
    return { ...this.highScore };
  }

  async getHighLevel(): Promise<{ level: number; player: string }> {
    return { ...this.highLevel };
  }

  async updateHighLevel(level: number, player: string): Promise<{ level: number; player: string }> {
    if (level > this.highLevel.level) {
      this.highLevel = { level, player };
    }
    return { ...this.highLevel };
  }

  async getLevelScores(level: number): Promise<Score[]> {
    return [...(this.levelScores.get(level) || [])];
  }

  async updateLevelScore(level: number, score: number, player: string): Promise<Score[]> {
    const scores = this.levelScores.get(level) || [];
    const newScores = [...scores];

    // find insertion point and insert score
    let inserted = false;
    for (let i = 0; i < 5; i++) {
      if (score > newScores[i].score && !inserted) {
        // shift scores down
        for (let k = 4; k > i; k--) {
          newScores[k] = newScores[k - 1];
        }
        newScores[i] = { score, player };
        inserted = true;
        break;
      }
    }

    this.levelScores.set(level, newScores);
    return [...newScores];
  }

  async getChampions(): Promise<Score[]> {
    return [...this.champions];
  }

  async addChampion(score: number, player: string): Promise<Score[]> {
    this.champions.push({ score, player });
    return [...this.champions];
  }

  async getAllScores(): Promise<Map<number, Score[]>> {
    return new Map(this.levelScores);
  }
}

// singleton instance
export const datastore = new InMemoryDatastore();
