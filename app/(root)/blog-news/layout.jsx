import Script from 'next/script';

export const metadata = {
  title: "Automotive News & Industry Updates | AussieMotor",
  description: "Stay updated with the latest automotive news, industry updates, car launches, and market trends in Australia. Get expert insights on the automotive sector from AussieMotor.",
  keywords: "automotive news, car industry news, new car launches, vehicle market trends, automotive sector updates, car technology news, Australia auto industry, car manufacturer news",
  openGraph: {
    title: "Automotive News & Industry Updates | AussieMotor",
    description: "Stay updated with the latest automotive news, industry updates, car launches, and market trends in Australia. Get expert insights on the automotive sector.",
    url: "https://www.aussiemotor.com/blog-news/",
    siteName: "AussieMotor",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
        width: 1200,
        height: 630,
        alt: "AussieMotor Automotive News",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Automotive News & Industry Updates | AussieMotor",
    description: "Stay updated with the latest automotive news, industry updates, car launches, and market trends in Australia. Get expert insights on the automotive sector.",
    images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
  },
  alternates: {
    canonical: "https://www.aussiemotor.com/blog-news/",
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      {/* BreadcrumbList Schema.org structured data */}
      <Script
        id="news-breadcrumb-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.aussiemotor.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Automotive News",
                "item": "https://www.aussiemotor.com/blog-news/"
              }
            ]
          })
        }}
      />
      
      {/* NewsArticle Schema.org structured data */}
      <Script
        id="news-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": "Automotive News & Industry Updates",
            "description": "Latest automotive news, industry updates, car launches, and market trends in Australia.",
            "image": "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
            "publisher": {
              "@type": "Organization",
              "name": "AussieMotor",
              "logo": {
                "@type": "ImageObject",
                "url": "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"
              }
            },
            "mainEntityOfPage": "https://www.aussiemotor.com/blog-news/",
            "datePublished": new Date().toISOString(),
            "dateModified": new Date().toISOString()
          })
        }}
      />
      
      {children}
    </>
  );
}