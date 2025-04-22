import Script from 'next/script';

export const metadata = {
  title: "New Car Details & Specifications | AussieMotor",
  description: "View detailed specifications, features, performance data, and pricing information for new cars in Australia. Compare models and find the perfect new vehicle at AussieMotor.",
  keywords: "new car details, car specifications, vehicle features, new car pricing, engine specs, fuel economy, safety features, new car models, Australia new cars, car comparison",
  openGraph: {
    title: "New Car Details & Specifications | AussieMotor",
    description: "View detailed specifications, features, performance data, and pricing information for new cars in Australia. Compare models and find the perfect new vehicle at AussieMotor.",
    url: "https://www.aussiemotor.com/new-cars-detail/",
    siteName: "AussieMotor",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
        width: 1200,
        height: 630,
        alt: "New Car Specifications and Details",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "New Car Details & Specifications | AussieMotor",
    description: "View detailed specifications, features, performance data, and pricing information for new cars in Australia. Compare models and find the perfect new vehicle.",
    images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
  },
  alternates: {
    canonical: "https://www.aussiemotor.com/new-cars-detail/",
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      {/* BreadcrumbList Schema.org structured data */}
      <Script
        id="new-car-detail-breadcrumb-data"
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
                "name": "New Cars",
                "item": "https://www.aussiemotor.com/new-cars/"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Car Details",
                "item": "https://www.aussiemotor.com/new-cars-detail/"
              }
            ]
          })
        }}
      />
      
      {/* Product Schema.org structured data */}
      <Script
        id="new-car-detail-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Car",
            "name": "New Car Models",
            "description": "Detailed specifications and features of new car models available in Australia.",
            "vehicleSpecialUsage": "New Vehicle",
            "brand": {
              "@type": "Organization",
              "name": "Various Manufacturers"
            },
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "AUD",
              "availability": "https://schema.org/InStock"
            }
          })
        }}
      />
      
      {children}
    </>
  );
}
