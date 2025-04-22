import Script from 'next/script';

export const metadata = {
  title: "Vehicle Reviews & Expert Ratings | AussieMotor",
  description: "Read comprehensive reviews on cars, bikes, and trucks from industry experts and owners. Get detailed ratings, pros & cons, and performance insights at AussieMotor.",
  keywords: "vehicle reviews, car reviews, bike reviews, truck reviews, expert vehicle ratings, owner reviews, vehicle performance reviews, automotive reviews, Australia vehicle reviews",
  openGraph: {
    title: "Vehicle Reviews & Expert Ratings | AussieMotor",
    description: "Read comprehensive reviews on cars, bikes, and trucks from industry experts and owners. Get detailed ratings, pros & cons, and performance insights.",
    url: "https://www.aussiemotor.com/reviews/",
    siteName: "AussieMotor",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
        width: 1200,
        height: 630,
        alt: "Vehicle Reviews and Ratings",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vehicle Reviews & Expert Ratings | AussieMotor",
    description: "Read comprehensive reviews on cars, bikes, and trucks from industry experts and owners at AussieMotor.",
    images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
  },
  alternates: {
    canonical: "https://www.aussiemotor.com/reviews/",
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      {/* BreadcrumbList Schema.org structured data */}
      <Script
        id="reviews-breadcrumb-data"
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
                "name": "Reviews",
                "item": "https://www.aussiemotor.com/reviews/"
              }
            ]
          })
        }}
      />
      
      {/* ItemList Schema.org structured data for review categories */}
      <Script
        id="reviews-categories-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "item": {
                  "@type": "Thing",
                  "name": "Car Reviews",
                  "description": "Expert and owner reviews of cars across all makes and models",
                  "url": "https://www.aussiemotor.com/reviews/car/"
                }
              },
              {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@type": "Thing",
                  "name": "Bike Reviews",
                  "description": "Expert and owner reviews of motorcycles across all makes and models",
                  "url": "https://www.aussiemotor.com/reviews/bike/"
                }
              },
              {
                "@type": "ListItem",
                "position": 3,
                "item": {
                  "@type": "Thing",
                  "name": "Truck Reviews",
                  "description": "Expert and owner reviews of trucks and commercial vehicles across all makes and models",
                  "url": "https://www.aussiemotor.com/reviews/truck/"
                }
              }
            ]
          })
        }}
      />
      
      {children}
    </>
  );
}
  