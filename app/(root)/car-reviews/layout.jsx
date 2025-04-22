import Script from 'next/script';

export const metadata = {
  title: "Car Reviews, Ratings & Expert Opinions | AussieMotor",
  description: "Read expert car reviews, ratings and owner opinions on all makes and models. Find detailed analysis, pros & cons, and performance insights at AussieMotor.",
  keywords: "car reviews, vehicle reviews, car ratings, car expert opinions, Toyota reviews, Honda reviews, Mazda reviews, car buying guide, Australia car reviews",
  openGraph: {
    title: "Car Reviews, Ratings & Expert Opinions | AussieMotor",
    description: "Read honest car reviews from experts and owners. Find detailed analysis, ratings, pros & cons, and performance insights for all vehicle makes and models.",
    url: "https://www.aussiemotor.com/car-reviews/",
    siteName: "AussieMotor",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
        width: 1200,
        height: 630,
        alt: "Car Reviews and Ratings",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Car Reviews, Ratings & Expert Opinions | AussieMotor",
    description: "Read honest car reviews from experts and owners. Find detailed analysis, ratings and performance insights at AussieMotor.",
    images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
  },
  alternates: {
    canonical: "https://www.aussiemotor.com/car-reviews/",
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      {/* BreadcrumbList Schema.org structured data */}
      <Script
        id="car-reviews-breadcrumb-data"
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
                "name": "Car Reviews",
                "item": "https://www.aussiemotor.com/car-reviews/"
              }
            ]
          })
        }}
      />
      
      {/* Review Schema.org structured data */}
      <Script
        id="car-reviews-data"
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
                  "@type": "Review",
                  "reviewBody": "The Toyota Corolla continues to deliver exceptional reliability and fuel efficiency. While it may not be the most exciting car to drive, it offers excellent value for money with its standard safety features and comfortable interior.",
                  "name": "Toyota Corolla Review",
                  "author": {
                    "@type": "Organization",
                    "name": "AussieMotor"
                  },
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "4.5",
                    "bestRating": "5"
                  },
                  "itemReviewed": {
                    "@type": "Car",
                    "name": "Toyota Corolla",
                    "manufacturer": {
                      "@type": "Organization",
                      "name": "Toyota"
                    }
                  }
                }
              },
              {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@type": "Review",
                  "reviewBody": "The Honda Civic offers a perfect blend of performance, efficiency, and practicality. With its responsive handling, spacious interior, and advanced tech features, it stands out as one of the best options in the compact car segment.",
                  "name": "Honda Civic Review",
                  "author": {
                    "@type": "Organization",
                    "name": "AussieMotor"
                  },
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "4.7",
                    "bestRating": "5"
                  },
                  "itemReviewed": {
                    "@type": "Car",
                    "name": "Honda Civic",
                    "manufacturer": {
                      "@type": "Organization",
                      "name": "Honda"
                    }
                  }
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
