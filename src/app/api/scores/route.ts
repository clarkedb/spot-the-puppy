import { NextRequest, NextResponse } from 'next/server'
import { datastore } from '@/lib/datastore'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const level = searchParams.get('level')
  const score = searchParams.get('score')
  const player = searchParams.get('player')

  try {
    if (level === 'all') {
      const allScores = await datastore.getAllScores()
      return NextResponse.json(Object.fromEntries(allScores))
    }

    if (level === 'champs') {
      if (score && player) {
        const champions = await datastore.addChampion(parseInt(score), player)
        return NextResponse.json(champions)
      } else {
        const champions = await datastore.getChampions()
        return NextResponse.json(champions)
      }
    }

    const levelNum = parseInt(level || '1')

    if (score && player) {
      const levelScores = await datastore.updateLevelScore(levelNum, parseInt(score), player)
      return NextResponse.json({ [levelNum]: levelScores })
    } else {
      const levelScores = await datastore.getLevelScores(levelNum)
      return NextResponse.json({ [levelNum]: levelScores })
    }
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
