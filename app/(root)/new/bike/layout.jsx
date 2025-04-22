import Script from 'next/script';

export const metadata = {
  title: "New Motorcycles by Category & Make in Australia | AussieMotor",
  description: "Browse new motorcycles by category, make, and model in Australia. Find the latest motorcycle models, specifications, features, and prices. Compare and research new bikes at AussieMotor.",
  keywords: "new motorcycles by category, new bikes by make, new motorcycle models, bike categories, sport bike, cruiser, adventure, Honda, Yamaha, Kawasaki, Australia new motorcycles, bike research",
  openGraph: {
    title: "New Motorcycles by Category & Make in Australia | AussieMotor",
    description: "Browse new motorcycles by category, make, and model in Australia. Find the latest motorcycle models, specifications, features, and prices. Compare and research new bikes at AussieMotor.",
    url: "https://www.aussiemotor.com/new/bike/",
    siteName: "AussieMotor",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
        width: 1200,
        height: 630,
        alt: "New Motorcycles in Australia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "New Motorcycles by Category & Make in Australia | AussieMotor",
    description: "Browse new motorcycles by category, make, and model in Australia. Find the latest motorcycle models, specifications, features, and prices.",
    images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
  },
  alternates: {
    canonical: "https://www.aussiemotor.com/new/bike/",
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      {/* BreadcrumbList Schema.org structured data */}
      <Script
        id="new-bike-breadcrumb-data"
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
                "name": "New Motorcycles",
                "item": "https://www.aussiemotor.com/new/bike/"
              }
            ]
          })
        }}
      />
      
      {/* ItemList Schema.org structured data for motorcycle types */}
      <Script
        id="new-bike-types-data"
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
                  "@type": "MotorizedBicycle",
                  "name": "Sport Bike",
                  "description": "New sport motorcycles for sale in Australia",
                  "url": "https://www.aussiemotor.com/new/bike/body/sport/"
                }
              },
              {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@type": "MotorizedBicycle",
                  "name": "Cruiser",
                  "description": "New cruiser motorcycles for sale in Australia",
                  "url": "https://www.aussiemotor.com/new/bike/body/cruiser/"
                }
              },
              {
                "@type": "ListItem",
                "position": 3,
                "item": {
                  "@type": "MotorizedBicycle",
                  "name": "Adventure",
                  "description": "New adventure motorcycles for sale in Australia",
                  "url": "https://www.aussiemotor.com/new/bike/body/adventure/"
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