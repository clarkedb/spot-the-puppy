import Link from "next/link";
import Footer from "@/components/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="flex-1 container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Your privacy matters to us
            </p>
          </header>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">
              What We Collect
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-3">
                  Game Data Only
                </h3>
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  Spot the Puppy collects only the minimal data necessary to
                  provide you with a great gaming experience:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 ml-4">
                  <li>
                    <strong>Game scores:</strong> Your high scores to display on
                    leaderboards
                  </li>
                  <li>
                    <strong>Player names:</strong> Optional display names you
                    choose for the leaderboard
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                  What We Don&apos;t Track
                </h4>
                <ul className="text-green-700 dark:text-green-300 space-y-1">
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

          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">
              How We Use Your Data
            </h2>

            <div className="space-y-4 text-slate-700 dark:text-slate-300">
              <p>
                The limited data we collect is used solely to enhance your
                gaming experience:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Display your personal best scores</li>
                <li>Show leaderboards with top performers</li>
                <li>Allow you to track your progress over time</li>
              </ul>

              <p className="font-medium text-slate-900 dark:text-white">
                Your data is never sold, shared with third parties, or used for
                marketing purposes.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">
              Data Storage & Security
            </h2>

            <div className="space-y-4 text-slate-700 dark:text-slate-300">
              <p>
                Game scores and player names are stored securely and
                temporarily. We implement reasonable security measures to
                protect this minimal data from unauthorized access.
              </p>

              <p>
                Since we only collect game-related data and no personal
                information, your privacy risk is minimal.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">
              Your Rights
            </h2>

            <div className="space-y-4 text-slate-700 dark:text-slate-300">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Play the game without providing any personal information
                </li>
                <li>
                  Use any display name or remain anonymous on leaderboards
                </li>
                <li>Contact us if you have questions about your data</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-3">
              Questions or Concerns?
            </h3>
            <p className="text-blue-800 dark:text-blue-300">
              If you have any questions about this privacy policy or how we
              handle data, please feel free to reach out through our GitHub
              repository.
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

          <footer className="text-center mt-12 text-sm text-slate-500 dark:text-slate-400">
            <p>
              This privacy policy was last updated on{" "}
              {new Date().toLocaleDateString()}.
            </p>
          </footer>
        </div>
      </div>
      <Footer />
    </div>
  );
}
