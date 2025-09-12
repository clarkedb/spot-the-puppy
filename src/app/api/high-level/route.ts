import { NextRequest, NextResponse } from 'next/server'
import { datastore } from '@/lib/datastore'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const level = searchParams.get('level')
  const player = searchParams.get('player')

  try {
    if (level && player) {
      const highLevel = await datastore.updateHighLevel(parseInt(level), player)
      return NextResponse.json(highLevel)
    } else {
      const highLevel = await datastore.getHighLevel()
      return NextResponse.json(highLevel)
    }
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
