import Script from 'next/script';

export const metadata = {
  title: "Automotive Blog & Car News | AussieMotor",
  description: "Read the latest automotive news, expert car blogs, maintenance tips, buying guides, and industry insights. Stay updated with AussieMotor's comprehensive automotive content.",
  keywords: "car blog, automotive news, car buying guide, vehicle maintenance tips, car reviews, automotive industry news, car tips and tricks, Australia car news",
  openGraph: {
    title: "Automotive Blog & Car News | AussieMotor",
    description: "Read the latest automotive news, expert car blogs, maintenance tips, buying guides, and industry insights from Australia's #1 automotive marketplace.",
    url: "https://www.aussiemotor.com/blogs/",
    siteName: "AussieMotor",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
        width: 1200,
        height: 630,
        alt: "AussieMotor Automotive Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Automotive Blog & Car News | AussieMotor",
    description: "Read the latest automotive news, expert car blogs, maintenance tips, and industry insights from Australia's leading automotive experts.",
    images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
  },
  alternates: {
    canonical: "https://www.aussiemotor.com/blogs/",
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      {/* BreadcrumbList Schema.org structured data */}
      <Script
        id="blog-breadcrumb-data"
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
                "name": "Blog",
                "item": "https://www.aussiemotor.com/blogs/"
              }
            ]
          })
        }}
      />
      
      {/* Blog Schema.org structured data */}
      <Script
        id="blog-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "headline": "AussieMotor Automotive Blog",
            "description": "Latest automotive news, car reviews, buying guides, and maintenance tips from Australia's leading automotive experts.",
            "publisher": {
              "@type": "Organization",
              "name": "AussieMotor",
              "logo": {
                "@type": "ImageObject",
                "url": "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"
              }
            },
            "url": "https://www.aussiemotor.com/blogs/"
          })
        }}
      />
      
      {children}
    </>
  );
}