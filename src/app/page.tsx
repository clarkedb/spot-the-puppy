import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Spot the Puppy! Test your reflexes in this fun reaction game. Find and click the puppy while avoiding the kitties through 20 challenging levels.",
  keywords: ["spot the puppy", "reaction game", "reflexes", "browser game", "free online game", "puppy game", "fun game"],
  openGraph: {
    title: "Spot the Puppy! - Fun Reaction Game",
    description: "Welcome to Spot the Puppy! Test your reflexes in this fun reaction game. Find and click the puppy while avoiding the kitties through 20 challenging levels.",
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
    title: "Spot the Puppy! - Fun Reaction Game",
    description: "Welcome to Spot the Puppy! Test your reflexes in this fun reaction game. Find and click the puppy while avoiding the kitties through 20 challenging levels.",
    images: ['/sprites/puppy.png'],
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* main content */}
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-6 py-8 md:py-0">
          {/* game title */}
          <h1 className="text-6xl font-bold text-slate-900 dark:text-white mb-8 drop-shadow-lg">
            Spot the Puppy!
          </h1>

          {/* puppy sprite */}
          <div className="mb-8 flex justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 shadow-xl">
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
          <div className="bg-white/30 dark:bg-black/30 backdrop-blur-sm rounded-lg p-8 mb-8 text-slate-900 dark:text-white">
            <h2 className="text-2xl font-semibold mb-4">How to Play</h2>
            <p className="text-lg leading-relaxed mb-4">
              Test your reflexes and observation skills! Find and click the adorable puppy
              as it moves around the screen, but be careful not to click the kitties that
              try to distract you.
            </p>
            <ul className="text-left space-y-2 max-w-md mx-auto">
              <li>🐶 <strong>Find the puppy</strong> - Look for the moving puppy sprite</li>
              <li>⚡ <strong>Be quick</strong> - Faster clicks earn higher scores</li>
              <li>🐱 <strong>Avoid kitties</strong> - Don&apos;t click the decoy cats!</li>
              <li>🏆 <strong>Beat the levels</strong> - Progress through 20 challenging levels</li>
            </ul>
          </div>

          {/* play button */}
          <div className="mb-8 md:mb-0">
            <Link href="/play">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-xl font-bold py-4 px-12 rounded-lg shadow-xl transition-all duration-200 transform hover:scale-105 hover:shadow-2xl cursor-pointer">
                Start Playing!
              </button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
