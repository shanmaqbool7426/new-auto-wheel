import Script from 'next/script';

export const metadata = {
  title: "Compare Trucks & Commercial Vehicles | AussieMotor",
  description: "Compare trucks and commercial vehicles side by side on specifications, towing capacity, payload, fuel efficiency, and prices. Find the perfect truck for your business with AussieMotor.",
  keywords: "truck comparison, commercial vehicle comparison, compare trucks, compare utes, compare vans, Toyota HiLux vs Ford Ranger, Isuzu D-Max vs Mazda BT-50, Australia truck comparison",
  openGraph: {
    title: "Compare Trucks & Commercial Vehicles | AussieMotor",
    description: "Compare trucks and commercial vehicles side by side on specifications, towing capacity, payload, fuel efficiency, and prices. Find the perfect truck for your business.",
    url: "https://www.aussiemotor.com/comparison/truck/",
    siteName: "AussieMotor",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
        width: 1200,
        height: 630,
        alt: "Truck Comparison Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare Trucks & Commercial Vehicles | AussieMotor",
    description: "Compare trucks and commercial vehicles side by side on specifications, towing capacity, payload, fuel efficiency, and prices at AussieMotor.",
    images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
  },
  alternates: {
    canonical: "https://www.aussiemotor.com/comparison/truck/",
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      {/* BreadcrumbList Schema.org structured data */}
      <Script
        id="truck-comparison-breadcrumb"
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
                "name": "Truck Comparison",
                "item": "https://www.aussiemotor.com/comparison/"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Compare Trucks",
                "item": "https://www.aussiemotor.com/comparison/truck/"
              }
            ]
          })
        }}
      />
      
      {children}
    </>
  );
}
