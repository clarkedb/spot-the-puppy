import Link from 'next/link'
import Footer from '@/components/Footer'

export default function About() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto flex-1 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <header className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl dark:text-white">
              About Spot the Puppy
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              A delightful hidden object game that challenges your observation skills
            </p>
          </header>

          <div className="mb-16 grid items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-white">
                How to Play
              </h2>
              <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-500">1.</span>
                  <span>Look carefully at the game board filled with cute kittens</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-500">2.</span>
                  <span>Find and click on the hidden puppy among the cats</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-500">3.</span>
                  <span>Complete levels as quickly as possible for higher scores</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-500">4.</span>
                  <span>Challenge yourself with increasingly difficult levels</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-slate-800">
              <h3 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
                Game Features
              </h3>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                <li>• Multiple difficulty levels</li>
                <li>• Score tracking and leaderboards</li>
                <li>• Responsive design for all devices</li>
                <li>• Clean, modern interface</li>
                <li>• No downloads required</li>
              </ul>
            </div>
          </div>

          <div className="mb-12 rounded-lg bg-white p-8 shadow-lg dark:bg-slate-800">
            <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-white">
              About the Game
            </h2>
            <p className="mb-4 text-slate-700 dark:text-slate-300">
              Spot the Puppy is a fun and engaging hidden object game that tests your visual
              perception and attention to detail. The game presents you with a grid of adorable
              kitten sprites, but hidden among them is a single puppy waiting to be discovered.
            </p>
            <p className="mb-4 text-slate-700 dark:text-slate-300">
              This game is perfect for players of all ages who enjoy puzzle games, pattern
              recognition challenges, or simply love cute animals. Each level increases in
              difficulty by adding more sprites to the board, making the puppy harder to spot.
            </p>
            <p className="text-slate-700 dark:text-slate-300">
              Built with modern web technologies, Spot the Puppy runs smoothly on desktop and mobile
              devices, ensuring you can play wherever you are.
            </p>
          </div>

          <div className="text-center">
            <Link
              href="/play"
              className="mr-4 inline-block rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
            >
              Start Playing
            </Link>
            <Link
              href="/"
              className="inline-block rounded-lg bg-slate-600 px-8 py-3 font-semibold text-white transition-colors duration-200 hover:bg-slate-700"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
