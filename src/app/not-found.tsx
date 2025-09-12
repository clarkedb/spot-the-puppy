import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist. Return to Spot the Puppy game home page.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* main content */}
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-6 py-8 md:py-0">
          {/* 404 title */}
          <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-8 drop-shadow-lg">
            404 | Not Found
          </h1>

          {/* grumpy kitty sprite */}
          <div className="mb-8 flex justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 shadow-xl">
              <Image
                src="/sprites/kitty.png"
                alt="Grumpy Cat"
                width={120}
                height={120}
                className="mx-auto"
              />
            </div>
          </div>

          {/* 404 message */}
          <div className="bg-white/30 dark:bg-black/30 backdrop-blur-sm rounded-lg p-8 mb-8 text-slate-900 dark:text-white">
            <p className="text-xl leading-relaxed mb-4">
              Oops! Looks like this page got away from us like the puppy! 🐶
            </p>
            <p className="text-lg leading-relaxed">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
          </div>

          {/* back to home button */}
          <div className="mb-8 md:mb-0">
            <Link href="/">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-xl font-bold py-4 px-12 rounded-lg shadow-xl transition-all duration-200 transform hover:scale-105 hover:shadow-2xl cursor-pointer">
                Back
              </button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
