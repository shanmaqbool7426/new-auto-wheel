import Script from 'next/script';

export const metadata = {
  title: "Vehicle Specifications & Technical Details | AussieMotor",
  description: "Find detailed vehicle specifications, engine performance data, dimensions, features, and technical information for cars, bikes, and trucks at AussieMotor.",
  keywords: "car specifications, vehicle specs, engine specs, car technical details, vehicle dimensions, car features, transmission specs, fuel consumption data, Australia vehicle specifications",
  openGraph: {
    title: "Vehicle Specifications & Technical Details | AussieMotor",
    description: "Find detailed vehicle specifications, engine performance data, dimensions, features, and technical information for all makes and models.",
    url: "https://www.aussiemotor.com/specification-detail/",
    siteName: "AussieMotor",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
        width: 1200,
        height: 630,
        alt: "Vehicle Specifications",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vehicle Specifications & Technical Details | AussieMotor",
    description: "Find detailed vehicle specifications, engine performance data, dimensions, features, and technical information at AussieMotor.",
    images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
  },
  alternates: {
    canonical: "https://www.aussiemotor.com/specification-detail/",
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      {/* BreadcrumbList Schema.org structured data */}
      <Script
        id="specification-detail-breadcrumb-data"
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
                "name": "Vehicle Specifications",
                "item": "https://www.aussiemotor.com/specification-detail/"
              }
            ]
          })
        }}
      />
      
      {/* Dataset Schema.org structured data */}
      <Script
        id="specification-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dataset",
            "name": "Vehicle Specifications Database",
            "description": "Comprehensive database of vehicle specifications including engine details, dimensions, performance metrics, and features.",
            "keywords": ["vehicle specifications", "engine specs", "car dimensions", "vehicle performance data"],
            "url": "https://www.aussiemotor.com/specification-detail/",
            "isAccessibleForFree": true,
            "creator": {
              "@type": "Organization",
              "name": "AussieMotor",
              "url": "https://www.aussiemotor.com"
            },
            "license": "https://creativecommons.org/licenses/by-nc/4.0/"
          })
        }}
      />
      
      {children}
    </>
  );
} 