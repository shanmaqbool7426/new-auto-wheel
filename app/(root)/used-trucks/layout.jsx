import Script from 'next/script';

export const metadata = {
  title: "Used Trucks & Commercial Vehicles For Sale | AussieMotor",
  description: "Find used trucks, utes and commercial vehicles for sale in Australia. Browse thousands of listings with photos, specs, and prices. Buy & sell second-hand trucks easily at AussieMotor.",
  keywords: "used trucks, second hand trucks, commercial vehicles, used utes, used vans, Toyota HiLux for sale, Ford Ranger for sale, Isuzu D-Max for sale, Australia used trucks, sell my truck",
  openGraph: {
    title: "Used Trucks & Commercial Vehicles For Sale | AussieMotor",
    description: "Browse used trucks for sale in Australia with great deals on Toyota, Ford, Isuzu and more. Find your next commercial vehicle at AussieMotor - Australia's #1 auto marketplace.",
    url: "https://www.aussiemotor.com/used-trucks/",
    siteName: "AussieMotor",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
        width: 1200,
        height: 630,
        alt: "Used Trucks for Sale in Australia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Used Trucks & Commercial Vehicles For Sale | AussieMotor",
    description: "Browse thousands of used trucks, utes, and commercial vehicles for sale in Australia with great deals on Toyota, Ford, Isuzu and more at AussieMotor.",
    images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
  },
  alternates: {
    canonical: "https://www.aussiemotor.com/used-trucks/",
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      {/* BreadcrumbList Schema.org structured data */}
      <Script
        id="used-trucks-breadcrumb-data"
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
                "name": "Used Trucks",
                "item": "https://www.aussiemotor.com/used-trucks/"
              }
            ]
          })
        }}
      />
      
      {/* ItemList Schema.org structured data for the truck listings */}
      <Script
        id="used-trucks-list-data"
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
                  "@type": "Vehicle",
                  "name": "Toyota HiLux",
                  "description": "Used Toyota HiLux trucks for sale in Australia",
                  "url": "https://www.aussiemotor.com/used-trucks/toyota/hilux/"
                }
              },
              {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@type": "Vehicle",
                  "name": "Ford Ranger",
                  "description": "Used Ford Ranger trucks for sale in Australia",
                  "url": "https://www.aussiemotor.com/used-trucks/ford/ranger/"
                }
              },
              {
                "@type": "ListItem",
                "position": 3,
                "item": {
                  "@type": "Vehicle",
                  "name": "Isuzu D-Max",
                  "description": "Used Isuzu D-Max trucks for sale in Australia",
                  "url": "https://www.aussiemotor.com/used-trucks/isuzu/d-max/"
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