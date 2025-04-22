import Script from 'next/script';

export const metadata = {
  title: "Compare Bikes & Motorcycles Side by Side | AussieMotor",
  description: "Compare motorcycles and bikes side by side on specifications, features, performance, fuel economy, and prices. Find the perfect bike for your needs with AussieMotor's comparison tool.",
  keywords: "bike comparison, motorcycle comparison, compare bikes, compare motorcycle specs, compare motorcycle prices, Yamaha vs Honda, Kawasaki vs Suzuki, side by side bike comparison, Australia motorcycle comparison",
  openGraph: {
    title: "Compare Bikes & Motorcycles Side by Side | AussieMotor",
    description: "Compare motorcycles and bikes side by side on specifications, features, performance, fuel economy, and prices. Find the perfect bike for your needs and budget.",
    url: "https://www.aussiemotor.com/comparison/bike/",
    siteName: "AussieMotor",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
        width: 1200,
        height: 630,
        alt: "Motorcycle Comparison Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare Bikes & Motorcycles Side by Side | AussieMotor",
    description: "Compare motorcycles and bikes side by side on specifications, features, performance, fuel economy, and prices at AussieMotor.",
    images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
  },
  alternates: {
    canonical: "https://www.aussiemotor.com/comparison/bike/",
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      {/* BreadcrumbList Schema.org structured data */}
      <Script
        id="bike-comparison-breadcrumb"
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
                "name": "Bike Comparison",
                "item": "https://www.aussiemotor.com/comparison/"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Compare Bikes",
                "item": "https://www.aussiemotor.com/comparison/bike/"
              }
            ]
          })
        }}
      />
      
      {children}
    </>
  );
}
