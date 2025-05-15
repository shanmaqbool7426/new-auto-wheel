export function generateMetadata({ title, description, path, searchParams }) {
  // Generate canonical URL
  const canonicalUrl = `https://www.aussiemotor.com${path}`;

  // Generate structured data for search results
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": title,
    "description": description,
    "url": canonicalUrl,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": []
    }
  };

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "AussieMotor",
      locale: "en_AU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    other: {
      'structured-data': JSON.stringify(structuredData),
    },
  };
} 