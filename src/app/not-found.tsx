import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description:
    "The page you're looking for doesn't exist. Return to Spot the Puppy game home page.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* main content */}
      <main className="flex flex-1 items-center justify-center">
        <div className="mx-auto max-w-2xl px-6 py-8 text-center md:py-0">
          {/* 404 title */}
          <h1 className="mb-8 text-5xl font-bold text-slate-900 drop-shadow-lg dark:text-white">
            404 | Not Found
          </h1>

          {/* grumpy kitty sprite */}
          <div className="mb-8 flex justify-center">
            <div className="rounded-full bg-white/20 p-6 shadow-xl backdrop-blur-sm">
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
          <div className="mb-8 rounded-lg bg-white/30 p-8 text-slate-900 backdrop-blur-sm dark:bg-black/30 dark:text-white">
            <p className="mb-4 text-xl leading-relaxed">
              Oops! Looks like this page got away from us like the puppy! 🐶
            </p>
            <p className="text-lg leading-relaxed">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
          </div>

          {/* back to home button */}
          <div className="mb-8 md:mb-0">
            <Link href="/">
              <button className="transform cursor-pointer rounded-lg bg-emerald-600 px-12 py-4 text-xl font-bold text-white shadow-xl transition-all duration-200 hover:scale-105 hover:bg-emerald-700 hover:shadow-2xl">
                Back
              </button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
