import { MetadataRoute } from 'next';
import { products, stoneLabels, meaningLabels } from '@/data/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.priestessofthesoul.com';

  const productPages = products.map((product) => ({
    url: `${baseUrl}/dyqan/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Only list stone slugs that at least one product actually uses,
  // otherwise the page renders empty ("no products found").
  const usedStoneSlugs = new Set(products.map((p) => p.stone).filter(Boolean));
  const stonePages = Object.keys(stoneLabels)
    .filter((slug) => usedStoneSlugs.has(slug as keyof typeof stoneLabels))
    .map((slug) => ({
      url: `${baseUrl}/dyqan/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

  const meaningPages = Object.keys(meaningLabels).map((slug) => ({
    url: `${baseUrl}/dyqan/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/dyqan`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/dyqan?kategori=unaza`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/dyqan?kategori=vathe`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/dyqan?kategori=gerdane`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/dyqan/bestsellers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog/bizhuteri-shpirterore-guri-natyral`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/rreth-meje`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...productPages,
    ...stonePages,
    ...meaningPages,
  ];
}
