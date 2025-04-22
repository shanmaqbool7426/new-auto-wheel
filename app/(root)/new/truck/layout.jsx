import Script from 'next/script';

export const metadata = {
  title: "New Trucks by Category & Make in Australia | AussieMotor",
  description: "Browse new trucks and commercial vehicles by category, make, and model in Australia. Find the latest truck models, specifications, features, and prices. Compare and research new commercial vehicles at AussieMotor.",
  keywords: "new trucks by category, new commercial vehicles by make, new truck models, ute, van, pickup truck, Toyota HiLux, Ford Ranger, Isuzu D-Max, Australia new trucks, commercial vehicle research",
  openGraph: {
    title: "New Trucks by Category & Make in Australia | AussieMotor",
    description: "Browse new trucks and commercial vehicles by category, make, and model in Australia. Find the latest truck models, specifications, features, and prices. Compare and research new commercial vehicles at AussieMotor.",
    url: "https://www.aussiemotor.com/new/truck/",
    siteName: "AussieMotor",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
        width: 1200,
        height: 630,
        alt: "New Trucks and Commercial Vehicles in Australia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "New Trucks by Category & Make in Australia | AussieMotor",
    description: "Browse new trucks and commercial vehicles by category, make, and model in Australia. Find the latest truck models, specifications, features, and prices.",
    images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
  },
  alternates: {
    canonical: "https://www.aussiemotor.com/new/truck/",
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      {/* BreadcrumbList Schema.org structured data */}
      <Script
        id="new-truck-breadcrumb-data"
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
                "name": "New Trucks",
                "item": "https://www.aussiemotor.com/new/truck/"
              }
            ]
          })
        }}
      />
      
      {/* ItemList Schema.org structured data for truck types */}
      <Script
        id="new-truck-types-data"
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
                  "name": "Ute",
                  "description": "New utility vehicles for sale in Australia",
                  "url": "https://www.aussiemotor.com/new/truck/body/ute/"
                }
              },
              {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@type": "Vehicle",
                  "name": "Van",
                  "description": "New commercial vans for sale in Australia",
                  "url": "https://www.aussiemotor.com/new/truck/body/van/"
                }
              },
              {
                "@type": "ListItem",
                "position": 3,
                "item": {
                  "@type": "Vehicle",
                  "name": "Pickup Truck",
                  "description": "New pickup trucks for sale in Australia",
                  "url": "https://www.aussiemotor.com/new/truck/body/pickup/"
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