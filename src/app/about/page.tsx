import Link from 'next/link'
import Footer from '@/components/Footer'

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="flex-1 container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              About Spot the Puppy
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              A delightful hidden object game that challenges your observation skills
            </p>
          </header>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                How to Play
              </h2>
              <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 font-bold">1.</span>
                  <span>Look carefully at the game board filled with cute kittens</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 font-bold">2.</span>
                  <span>Find and click on the hidden puppy among the cats</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 font-bold">3.</span>
                  <span>Complete levels as quickly as possible for higher scores</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 font-bold">4.</span>
                  <span>Challenge yourself with increasingly difficult levels</span>
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
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

          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
              About the Game
            </h2>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Spot the Puppy is a fun and engaging hidden object game that tests your visual perception
              and attention to detail. The game presents you with a grid of adorable kitten sprites,
              but hidden among them is a single puppy waiting to be discovered.
            </p>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              This game is perfect for players of all ages who enjoy puzzle games, pattern recognition
              challenges, or simply love cute animals. Each level increases in difficulty by adding
              more sprites to the board, making the puppy harder to spot.
            </p>
            <p className="text-slate-700 dark:text-slate-300">
              Built with modern web technologies, Spot the Puppy runs smoothly on desktop and mobile
              devices, ensuring you can play wherever you are.
            </p>
          </div>

          <div className="text-center">
            <Link
              href="/play"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 mr-4"
            >
              Start Playing
            </Link>
            <Link
              href="/"
              className="inline-block bg-slate-600 hover:bg-slate-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
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
