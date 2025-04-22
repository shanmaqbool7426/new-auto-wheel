import Script from 'next/script';

export const metadata = {
  title: "New Cars by Category & Make in Australia | AussieMotor",
  description: "Browse new cars by category, make, and model in Australia. Find the latest car models, specifications, features, and prices. Compare and research new cars at AussieMotor.",
  keywords: "new cars by category, new cars by make, new car models, car categories, sedan, SUV, hatchback, Toyota, Honda, Mazda, Australia new cars, car research",
  openGraph: {
    title: "New Cars by Category & Make in Australia | AussieMotor",
    description: "Browse new cars by category, make, and model in Australia. Find the latest car models, specifications, features, and prices. Compare and research new cars at AussieMotor.",
    url: "https://www.aussiemotor.com/new/car/",
    siteName: "AussieMotor",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
        width: 1200,
        height: 630,
        alt: "New Cars in Australia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "New Cars by Category & Make in Australia | AussieMotor",
    description: "Browse new cars by category, make, and model in Australia. Find the latest car models, specifications, features, and prices.",
    images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
  },
  alternates: {
    canonical: "https://www.aussiemotor.com/new/car/",
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      {/* BreadcrumbList Schema.org structured data */}
      <Script
        id="new-car-breadcrumb-data"
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
                "name": "New Vehicles",
                "item": "https://www.aussiemotor.com/new/"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "New Cars",
                "item": "https://www.aussiemotor.com/new/car/"
              }
            ]
          })
        }}
      />
      
      {/* ItemList Schema.org structured data for body types */}
      <Script
        id="new-car-body-types-data"
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
                  "@type": "Car",
                  "bodyType": "SUV",
                  "name": "SUV",
                  "description": "New SUVs for sale in Australia",
                  "url": "https://www.aussiemotor.com/new/car/body/suv/"
                }
              },
              {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@type": "Car",
                  "bodyType": "Sedan",
                  "name": "Sedan",
                  "description": "New Sedans for sale in Australia",
                  "url": "https://www.aussiemotor.com/new/car/body/sedan/"
                }
              },
              {
                "@type": "ListItem",
                "position": 3,
                "item": {
                  "@type": "Car",
                  "bodyType": "Hatchback",
                  "name": "Hatchback",
                  "description": "New Hatchbacks for sale in Australia",
                  "url": "https://www.aussiemotor.com/new/car/body/hatchback/"
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