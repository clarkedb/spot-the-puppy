'use client'

import { useEffect, useRef, useState } from 'react'
import { makeNewPosition, calcSpeed } from '@/lib/gameLogic'

interface GameSpriteProps {
  type: 'puppy' | 'kitty'
  isVisible: boolean
  speedMod: number
  containerRef: React.RefObject<HTMLDivElement | null>
  onPuppyClick?: () => void
  className?: string
}

export default function GameSprite({
  type,
  isVisible,
  speedMod,
  containerRef,
  onPuppyClick,
  className = '',
}: GameSpriteProps) {
  const spriteRef = useRef<HTMLDivElement>(null)

  // generate random starting position
  const getInitialPosition = (): [number, number] => {
    if (!containerRef.current) {
      // default fallback position if container is not available yet
      return [Math.random() * 300, Math.random() * 300]
    }
    const container = containerRef.current
    return makeNewPosition(container.clientWidth, container.clientHeight)
  }

  const [position, setPosition] = useState<[number, number]>(getInitialPosition)
  const animationRef = useRef<number | null>(null)

  const animate = () => {
    if (!spriteRef.current || !containerRef.current || !isVisible) return

    const container = containerRef.current
    const newPos = makeNewPosition(container.clientWidth, container.clientHeight)
    const oldPos = position
    const speed = calcSpeed(oldPos, newPos, speedMod)

    setPosition(newPos)

    // set up next animation
    animationRef.current = window.setTimeout(() => {
      animate()
    }, speed)
  }

  useEffect(() => {
    if (isVisible) {
      // reset to a new random position when the game becomes visible
      if (containerRef.current) {
        setPosition(
          makeNewPosition(containerRef.current.clientWidth, containerRef.current.clientHeight),
        )
      }
      animate()
    } else {
      if (animationRef.current) {
        clearTimeout(animationRef.current)
      }
    }

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, speedMod])

  if (!isVisible) return null

  return (
    <div
      ref={spriteRef}
      className={`fixed h-[75px] w-[75px] cursor-pointer transition-all duration-1000 ${className}`}
      style={{
        top: `${position[0]}px`,
        left: `${position[1]}px`,
        backgroundImage: `url(/sprites/${type}.png)`,
        backgroundSize: 'cover',
        zIndex: 10,
      }}
      onClick={type === 'puppy' ? onPuppyClick : undefined}
    />
  )
}
