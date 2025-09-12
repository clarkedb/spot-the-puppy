import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Spot the Puppy',
  description:
    'Welcome to Spot the Puppy! Test your reflexes in this fun reaction game. Find and click the puppy while avoiding the kitties through 20 challenging levels.',
  keywords: [
    'spot the puppy',
    'reaction game',
    'reflexes',
    'browser game',
    'free online game',
    'puppy game',
    'fun game',
  ],
  openGraph: {
    title: 'Spot the Puppy! - Fun Reaction Game',
    description:
      'Welcome to Spot the Puppy! Test your reflexes in this fun reaction game. Find and click the puppy while avoiding the kitties through 20 challenging levels.',
    images: [
      {
        url: '/sprites/puppy.png',
        width: 120,
        height: 120,
        alt: 'Puppy sprite from Spot the Puppy game',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Spot the Puppy! - Fun Reaction Game',
    description:
      'Welcome to Spot the Puppy! Test your reflexes in this fun reaction game. Find and click the puppy while avoiding the kitties through 20 challenging levels.',
    images: ['/sprites/puppy.png'],
  },
}

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* main content */}
      <main className="flex flex-1 items-center justify-center">
        <div className="mx-auto max-w-2xl px-6 py-8 text-center md:py-0">
          {/* game title */}
          <h1 className="mb-8 text-6xl font-bold text-slate-900 drop-shadow-lg dark:text-white">
            Spot the Puppy!
          </h1>

          {/* puppy sprite */}
          <div className="mb-8 flex justify-center">
            <div className="rounded-full bg-white/20 p-6 shadow-xl backdrop-blur-sm">
              <Image
                src="/sprites/puppy.png"
                alt="Puppy"
                width={120}
                height={120}
                className="mx-auto"
              />
            </div>
          </div>

          {/* game description */}
          <div className="mb-8 rounded-lg bg-white/30 p-8 text-slate-900 backdrop-blur-sm dark:bg-black/30 dark:text-white">
            <h2 className="mb-4 text-2xl font-semibold">How to Play</h2>
            <p className="mb-4 text-lg leading-relaxed">
              Test your reflexes and observation skills! Find and click the adorable puppy as it
              moves around the screen, but be careful not to click the kitties that try to distract
              you.
            </p>
            <ul className="mx-auto max-w-md space-y-2 text-left">
              <li>
                🐶 <strong>Find the puppy</strong> - Look for the moving puppy sprite
              </li>
              <li>
                ⚡ <strong>Be quick</strong> - Faster clicks earn higher scores
              </li>
              <li>
                🐱 <strong>Avoid kitties</strong> - Don&apos;t click the decoy cats!
              </li>
              <li>
                🏆 <strong>Beat the levels</strong> - Progress through 20 challenging levels
              </li>
            </ul>
          </div>

          {/* play button */}
          <div className="mb-8 md:mb-0">
            <Link href="/play">
              <button className="transform cursor-pointer rounded-lg bg-emerald-600 px-12 py-4 text-xl font-bold text-white shadow-xl transition-all duration-200 hover:scale-105 hover:bg-emerald-700 hover:shadow-2xl">
                Start Playing!
              </button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
