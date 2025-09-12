import { NextRequest, NextResponse } from 'next/server'
import { datastore } from '@/lib/datastore'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const score = searchParams.get('score')
  const player = searchParams.get('player')

  try {
    if (score && player) {
      const highScore = await datastore.updateHighScore(parseInt(score), player)
      return NextResponse.json(highScore)
    } else {
      const highScore = await datastore.getHighScore()
      return NextResponse.json(highScore)
    }
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
