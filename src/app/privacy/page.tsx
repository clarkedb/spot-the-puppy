import Link from 'next/link'
import Footer from '@/components/Footer'

export default function Privacy() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto flex-1 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <header className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl dark:text-white">
              Privacy Policy
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300">Your privacy matters to us</p>
          </header>

          <div className="mb-8 rounded-lg bg-white p-8 shadow-lg dark:bg-slate-800">
            <h2 className="mb-6 text-2xl font-semibold text-slate-900 dark:text-white">
              What We Collect
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-lg font-medium text-slate-900 dark:text-white">
                  Game Data Only
                </h3>
                <p className="mb-4 text-slate-700 dark:text-slate-300">
                  Spot the Puppy collects only the minimal data necessary to provide you with a
                  great gaming experience:
                </p>
                <ul className="ml-4 list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
                  <li>
                    <strong>Game scores:</strong> Your high scores to display on leaderboards
                  </li>
                  <li>
                    <strong>Player names:</strong> Optional display names you choose for the
                    leaderboard
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
                <h4 className="mb-2 font-semibold text-green-800 dark:text-green-300">
                  What We Don&apos;t Track
                </h4>
                <ul className="space-y-1 text-green-700 dark:text-green-300">
                  <li>• No personal information</li>
                  <li>• No email addresses</li>
                  <li>• No location data</li>
                  <li>• No browsing behavior</li>
                  <li>• No cookies for tracking</li>
                  <li>• No analytics or advertising trackers</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-lg bg-white p-8 shadow-lg dark:bg-slate-800">
            <h2 className="mb-6 text-2xl font-semibold text-slate-900 dark:text-white">
              How We Use Your Data
            </h2>

            <div className="space-y-4 text-slate-700 dark:text-slate-300">
              <p>The limited data we collect is used solely to enhance your gaming experience:</p>
              <ul className="ml-4 list-inside list-disc space-y-2">
                <li>Display your personal best scores</li>
                <li>Show leaderboards with top performers</li>
                <li>Allow you to track your progress over time</li>
              </ul>

              <p className="font-medium text-slate-900 dark:text-white">
                Your data is never sold, shared with third parties, or used for marketing purposes.
              </p>
            </div>
          </div>

          <div className="mb-8 rounded-lg bg-white p-8 shadow-lg dark:bg-slate-800">
            <h2 className="mb-6 text-2xl font-semibold text-slate-900 dark:text-white">
              Data Storage & Security
            </h2>

            <div className="space-y-4 text-slate-700 dark:text-slate-300">
              <p>
                Game scores and player names are stored securely and temporarily. We implement
                reasonable security measures to protect this minimal data from unauthorized access.
              </p>

              <p>
                Since we only collect game-related data and no personal information, your privacy
                risk is minimal.
              </p>
            </div>
          </div>

          <div className="mb-8 rounded-lg bg-white p-8 shadow-lg dark:bg-slate-800">
            <h2 className="mb-6 text-2xl font-semibold text-slate-900 dark:text-white">
              Your Rights
            </h2>

            <div className="space-y-4 text-slate-700 dark:text-slate-300">
              <p>You have the right to:</p>
              <ul className="ml-4 list-inside list-disc space-y-2">
                <li>Play the game without providing any personal information</li>
                <li>Use any display name or remain anonymous on leaderboards</li>
                <li>Contact us if you have questions about your data</li>
              </ul>
            </div>
          </div>

          <div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/20">
            <h3 className="mb-3 text-lg font-semibold text-blue-900 dark:text-blue-300">
              Questions or Concerns?
            </h3>
            <p className="text-blue-800 dark:text-blue-300">
              If you have any questions about this privacy policy or how we handle data, please feel
              free to reach out through our GitHub repository.
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

          <footer className="mt-12 text-center text-sm text-slate-500 dark:text-slate-400">
            <p>This privacy policy was last updated on {new Date().toLocaleDateString()}.</p>
          </footer>
        </div>
      </div>
      <Footer />
    </div>
  )
}
