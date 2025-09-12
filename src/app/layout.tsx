import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Spot the Puppy! - Fun Reaction Game",
    template: "%s | Spot the Puppy!"
  },
  description: "Test your reflexes in this fun game! Find and click the puppy while avoiding the kitties. Progress through 20 challenging levels.",
  keywords: ["game", "reaction time", "puppy", "fun", "reflexes", "browser game", "free game", "spot the difference"],
  authors: [{ name: "Spot the Puppy Team" }],
  creator: "Spot the Puppy Team",
  publisher: "Spot the Puppy Team",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://stp2.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Spot the Puppy! - Fun Reaction Game",
    description: "Test your reflexes in this fun game! Find and click the puppy while avoiding the kitties. Progress through 20 challenging levels.",
    url: 'https://stp2.vercel.app',
    siteName: 'Spot the Puppy!',
    images: [
      {
        url: '/sprites/puppy.png',
        width: 120,
        height: 120,
        alt: 'Spot the Puppy Game',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: "Spot the Puppy! - Fun Reaction Game",
    description: "Test your reflexes in this fun game! Find and click the puppy while avoiding the kitties. Progress through 20 challenging levels.",
    images: ['/sprites/puppy.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
