import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // Determine the base URL dynamically
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ||
                  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` :
                  process.env.NODE_ENV === 'production' ? 'https://stp2.vercel.app' :
                  'http://localhost:3000'

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date('2025-09-11'),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]
}
