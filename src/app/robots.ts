import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/play',
    },
    sitemap: 'https://stp2.vercel.app/sitemap.xml',
  }
}
