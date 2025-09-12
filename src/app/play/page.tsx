'use client';

import { useState, useEffect } from 'react';
import GameBoard from '@/components/GameBoard';
import Modal from '@/components/Modal';
import { calcScore, getRandomGuestName, sanitizeUserName } from '@/lib/gameLogic';
import { Score } from '@/lib/datastore';

enum GameState {
  NAME_INPUT,
  PLAYING,
  LEVEL_STATS,
  VICTORY
}

export default function PlayPage() {
  const [gameState, setGameState] = useState<GameState>(GameState.NAME_INPUT);
  const [player, setPlayer] = useState<string>('');
  const [level, setLevel] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [levelScore, setLevelScore] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [speedMod, setSpeedMod] = useState<number>(0.2);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [highScore, setHighScore] = useState<Score>({ score: 100, player: "R2-D2" });
  const [highLevel, setHighLevel] = useState<{ level: number; player: string }>({ level: 1, player: "Ferb" });
  const [leaderBoard, setLeaderBoard] = useState<Score[]>([]);

  const MAX_LEVEL = 20;
  const SPEED_MOD_FACTOR = 1.1;

  useEffect(() => {
    fetchHighScore();
    fetchHighLevel();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchHighScore = async () => {
    try {
      const response = await fetch(`/api/high-score?score=${score}&player=${encodeURIComponent(player)}`);
      const data = await response.json();
      setHighScore(data);
    } catch (error) {
      console.error('Error fetching high score:', error);
    }
  };

  const fetchHighLevel = async () => {
    try {
      const response = await fetch(`/api/high-level?level=${level}&player=${encodeURIComponent(player)}`);
      const data = await response.json();
      setHighLevel(data);
    } catch (error) {
      console.error('Error fetching high level:', error);
    }
  };

  const beginGame = (name?: string) => {
    const playerName = name || getRandomGuestName();
    setPlayer(playerName);
    setGameState(GameState.PLAYING);
    setStartTime(new Date());
  };

  const spotted = async () => {
    if (!startTime) return;

    const elapsed = new Date().getTime() - startTime.getTime();
    const timeInSeconds = elapsed / 1000;
    const levelScoreValue = calcScore(timeInSeconds, level);

    setTime(timeInSeconds);
    setLevelScore(levelScoreValue);
    setScore(prev => prev + levelScoreValue);
    setGameState(GameState.LEVEL_STATS);

    // update leaderboard
    try {
      const response = await fetch(`/api/scores?level=${level}&score=${levelScoreValue}&player=${encodeURIComponent(player)}`);
      const data = await response.json();
      setLeaderBoard(data[level] || []);
    } catch (error) {
      console.error('Error updating scores:', error);
    }
  };

  const nextLevel = async () => {
    if (level < MAX_LEVEL) {
      const newLevel = level + 1;
      setLevel(newLevel);
      setSpeedMod(prev => prev * SPEED_MOD_FACTOR);
      setGameState(GameState.PLAYING);
      setStartTime(new Date());
    } else {
      endGame();
    }

    await fetchHighScore();
    await fetchHighLevel();
  };

  const endGame = async () => {
    setGameState(GameState.VICTORY);

    try {
      const response = await fetch(`/api/scores?level=champs&score=${score}&player=${encodeURIComponent(player)}`);
      const data = await response.json();
      setLeaderBoard(data);
    } catch (error) {
      console.error('Error updating champions:', error);
    }
  };

  const resetGame = () => {
    setGameState(GameState.NAME_INPUT);
    setLevel(1);
    setScore(0);
    setLevelScore(0);
    setTime(0);
    setSpeedMod(0.2);
    setPlayer('');
    setStartTime(null);
  };

  return (
    <div className="min-h-screen bg-transparent">
      {/* header */}
      <header className="bg-slate-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Spot the Puppy!</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-semibold">High Score</div>
              <div className="text-lg">{highScore.score}</div>
              <div className="text-sm">@{highScore.player}</div>
            </div>
            <div>
              <div className="text-xl font-semibold">Level: {level}</div>
              <div className="text-xl font-semibold">Score: {score}</div>
              <div className="text-xl font-semibold">Player: {player}</div>
            </div>
            <div>
              <div className="text-xl font-semibold">High Level</div>
              <div className="text-lg">{highLevel.level}</div>
              <div className="text-sm">@{highLevel.player}</div>
            </div>
          </div>
        </div>
      </header>

      {/* name input */}
      <Modal isOpen={gameState === GameState.NAME_INPUT}>
        <div className="p-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Choose your gamer name!</h2>
          <div className="text-sm mb-6">(Or let us choose one for you.)</div>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const name = formData.get('name') as string;
            const sanitizedName = name ? sanitizeUserName(name) : '';
            beginGame(sanitizedName);
          }}>
            <input
              name="name"
              className="w-full p-3 rounded text-center text-gray-800 bg-white border-2 border-gray-300 focus:border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 mb-4"
              placeholder="clifford1962"
            />
            <button
              type="submit"
              className="bg-white text-slate-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Play
            </button>
          </form>
        </div>
      </Modal>

      {/* game board */}
      <GameBoard
        level={level}
        isVisible={gameState === GameState.PLAYING}
        speedMod={speedMod}
        onPuppyClick={spotted}
      />

      {/* level stats */}
      <Modal isOpen={gameState === GameState.LEVEL_STATS}>
        <div className="p-12 text-center">
          <div className="text-3xl font-bold mb-4">Your time: {time.toFixed(2)} seconds</div>
          <div className="text-3xl font-bold mb-4">Your score: {levelScore}</div>
          <h2 className="text-xl font-semibold mb-4">Stats for Level {level}:</h2>
          <div className="mb-6">
            {leaderBoard.map((leader, index) => (
              <div key={index} className="text-lg mb-2">
                {leader.player}: {leader.score}
              </div>
            ))}
          </div>
          <button
            onClick={nextLevel}
            className="bg-white text-slate-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
          >
            {level === MAX_LEVEL ? "On to Victory" : "Next Level"}
          </button>
        </div>
      </Modal>

      {/* victory */}
      <Modal isOpen={gameState === GameState.VICTORY}>
        <div className="p-12 text-center">
          <div className="text-3xl font-bold mb-4">Good job {player}!</div>
          <div className="text-2xl font-semibold mb-4">Congratulations on completing all {level} levels!</div>
          <div className="text-xl font-semibold mb-6">Your final score: {score}</div>
          <h2 className="text-lg font-semibold mb-4">Other Victors</h2>
          <div className="mb-6">
            {leaderBoard.map((leader, index) => (
              <div key={index} className="text-lg mb-2">
                {leader.player}: {leader.score}
              </div>
            ))}
          </div>
          <button
            onClick={resetGame}
            className="bg-white text-slate-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Play Again
          </button>
        </div>
      </Modal>
    </div>
  );
}
