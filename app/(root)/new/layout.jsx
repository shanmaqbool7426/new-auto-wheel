import Script from 'next/script';

export const metadata = {
  title: "New Vehicles For Sale in Australia | AussieMotor",
  description: "Browse the latest new cars, bikes, and trucks for sale in Australia. Compare prices, features, and specifications of all new vehicles. Find your perfect new vehicle at AussieMotor.",
  keywords: "new vehicles, new cars, new bikes, new trucks, buy new car, new vehicle prices, latest car models, new vehicle specifications, Australia new vehicles",
  openGraph: {
    title: "New Vehicles For Sale in Australia | AussieMotor",
    description: "Browse the latest new cars, bikes, and trucks for sale in Australia. Compare prices, features, and specifications of all new vehicles.",
    url: "https://www.aussiemotor.com/new/",
    siteName: "AussieMotor",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
        width: 1200,
        height: 630,
        alt: "New Vehicles in Australia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "New Vehicles For Sale in Australia | AussieMotor",
    description: "Browse the latest new cars, bikes, and trucks for sale in Australia. Compare prices, features, and specifications of all new vehicles.",
    images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
  },
  alternates: {
    canonical: "https://www.aussiemotor.com/new/",
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      {/* BreadcrumbList Schema.org structured data */}
      <Script
        id="new-vehicles-breadcrumb-data"
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
              }
            ]
          })
        }}
      />
      
      {/* ItemList Schema.org structured data for vehicle categories */}
      <Script
        id="new-vehicle-categories-data"
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
                  "name": "New Cars",
                  "description": "Browse new cars for sale in Australia",
                  "url": "https://www.aussiemotor.com/new/car/"
                }
              },
              {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@type": "Thing",
                  "name": "New Bikes",
                  "description": "Browse new motorcycles for sale in Australia",
                  "url": "https://www.aussiemotor.com/new/bike/"
                }
              },
              {
                "@type": "ListItem",
                "position": 3,
                "item": {
                  "@type": "Thing",
                  "name": "New Trucks",
                  "description": "Browse new trucks and commercial vehicles for sale in Australia",
                  "url": "https://www.aussiemotor.com/new/truck/"
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
  