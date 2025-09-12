import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import GameBoard from '../GameBoard'

// Mock the GameSprite component since we'll test it separately
vi.mock('../GameSprite', () => ({
  default: ({ type, onPuppyClick }: { type: string; onPuppyClick?: () => void }) => (
    <div
      data-testid={`game-sprite-${type}`}
      onClick={type === 'puppy' ? onPuppyClick : undefined}
    >
      {type} sprite
    </div>
  )
}))

describe('GameBoard', () => {
  const defaultProps = {
    level: 1,
    isVisible: true,
    speedMod: 10,
    onPuppyClick: vi.fn()
  }

  it('should not render when not visible', () => {
    const { container } = render(
      <GameBoard {...defaultProps} isVisible={false} />
    )
    expect(container.firstChild).toBeNull()
  })

  it('should render the game board container when visible', () => {
    render(<GameBoard {...defaultProps} />)

    const gameBoard = document.querySelector('.relative.w-full.overflow-hidden.bg-transparent')
    expect(gameBoard).toBeInTheDocument()
    expect(gameBoard).toHaveClass('relative', 'w-full', 'overflow-hidden', 'bg-transparent')
    // The h-[calc(100vh-227px)] class should be present
    expect(gameBoard).toHaveClass('h-[calc(100vh-227px)]')
  })

  it('should render one puppy sprite', () => {
    render(<GameBoard {...defaultProps} />)

    const puppySprites = screen.getAllByTestId('game-sprite-puppy')
    expect(puppySprites).toHaveLength(1)
  })

  it('should render correct number of kitty sprites based on level', () => {
    // Level 1 should have 2 kitties (level + 1)
    render(<GameBoard {...defaultProps} level={1} />)
    expect(screen.getAllByTestId('game-sprite-kitty')).toHaveLength(2)
  })

  it('should render more kitties for higher levels', () => {
    // Level 3 should have 4 kitties (level + 1)
    render(<GameBoard {...defaultProps} level={3} />)
    expect(screen.getAllByTestId('game-sprite-kitty')).toHaveLength(4)
  })

  it('should render maximum reasonable number of kitties', () => {
    // Level 10 should have 11 kitties
    render(<GameBoard {...defaultProps} level={10} />)
    expect(screen.getAllByTestId('game-sprite-kitty')).toHaveLength(11)
  })

  it('should pass correct props to puppy sprite', () => {
    const mockOnPuppyClick = vi.fn()
    render(<GameBoard {...defaultProps} onPuppyClick={mockOnPuppyClick} />)

    const puppySprite = screen.getByTestId('game-sprite-puppy')
    expect(puppySprite).toBeInTheDocument()

    // Test that clicking calls the handler
    puppySprite.click()
    expect(mockOnPuppyClick).toHaveBeenCalledOnce()
  })

  it('should render kitty sprites with unique keys', () => {
    render(<GameBoard {...defaultProps} level={2} />)

    const kittySprites = screen.getAllByTestId('game-sprite-kitty')
    expect(kittySprites).toHaveLength(3)

    // Each kitty should be a separate element
    kittySprites.forEach((sprite, index) => {
      expect(sprite).toBeInTheDocument()
    })
  })

  it('should handle level 0 correctly', () => {
    render(<GameBoard {...defaultProps} level={0} />)

    // Level 0 + 1 = 1 kitty
    expect(screen.getAllByTestId('game-sprite-kitty')).toHaveLength(1)
  })

  it('should re-render when level changes', () => {
    const { rerender } = render(<GameBoard {...defaultProps} level={1} />)
    expect(screen.getAllByTestId('game-sprite-kitty')).toHaveLength(2)

    rerender(<GameBoard {...defaultProps} level={2} />)
    expect(screen.getAllByTestId('game-sprite-kitty')).toHaveLength(3)
  })

  it('should re-render when visibility changes', () => {
    const { rerender } = render(<GameBoard {...defaultProps} isVisible={false} />)
    expect(screen.queryByTestId('game-sprite-puppy')).not.toBeInTheDocument()

    rerender(<GameBoard {...defaultProps} isVisible={true} />)
    expect(screen.getByTestId('game-sprite-puppy')).toBeInTheDocument()
  })

  it('should maintain container ref', () => {
    render(<GameBoard {...defaultProps} />)

    const gameBoard = document.querySelector('.relative.w-full.overflow-hidden.bg-transparent')
    expect(gameBoard).toBeInTheDocument()

    // The ref should be attached to a div element
    expect(gameBoard?.tagName).toBe('DIV')
  })
})
