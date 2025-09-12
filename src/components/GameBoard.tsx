'use client'

import { useRef } from 'react'
import GameSprite from './GameSprite'

interface GameBoardProps {
  level: number
  isVisible: boolean
  speedMod: number
  onPuppyClick: () => void
}

export default function GameBoard({ level, isVisible, speedMod, onPuppyClick }: GameBoardProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  if (!isVisible) return null

  const kittyCount = level + 1 // start with 2 kitties at level 1

  return (
    <div
      ref={containerRef}
      className="relative h-[calc(100vh-227px)] w-full overflow-hidden bg-transparent"
    >
      <GameSprite
        type="puppy"
        isVisible={isVisible}
        speedMod={speedMod}
        containerRef={containerRef}
        onPuppyClick={onPuppyClick}
      />

      {Array.from({ length: kittyCount }, (_, i) => (
        <GameSprite
          key={`kitty-${i}`}
          type="kitty"
          isVisible={isVisible}
          speedMod={speedMod}
          containerRef={containerRef}
        />
      ))}
    </div>
  )
}
