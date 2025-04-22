import Script from 'next/script';

export const metadata = {
  title: "Find Car Dealers Near You | AussieMotor",
  description: "Locate car dealers and automotive dealerships across Australia. Search by location, vehicle type, and brand to find trusted dealers near you with AussieMotor's comprehensive dealer directory.",
  keywords: "find car dealers, car dealerships near me, automotive dealers Australia, new car dealers, used car dealers, motorcycle dealers, truck dealers, find local dealerships, AussieMotor dealer network",
  openGraph: {
    title: "Find Car Dealers Near You | AussieMotor",
    description: "Locate car dealers and automotive dealerships across Australia. Search by location, vehicle type, and brand to find trusted dealers near you.",
    url: "https://www.aussiemotor.com/dealers/",
    siteName: "AussieMotor",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
        width: 1200,
        height: 630,
        alt: "Car Dealers in Australia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Car Dealers Near You | AussieMotor",
    description: "Locate car dealers and automotive dealerships across Australia. Search by location, vehicle type, and brand to find trusted dealers near you.",
    images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
  },
  alternates: {
    canonical: "https://www.aussiemotor.com/dealers/",
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      {/* BreadcrumbList Schema.org structured data */}
      <Script
        id="dealers-breadcrumb-data"
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
                "name": "Dealers",
                "item": "https://www.aussiemotor.com/dealers/"
              }
            ]
          })
        }}
      />
      
      {/* LocalBusiness Schema.org structured data */}
      <Script
        id="dealers-business-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Dealer Directory",
            "name": "AussieMotor Dealer Directory",
            "description": "Find authorized car, motorcycle, and truck dealers across Australia with AussieMotor's dealer directory.",
            "provider": {
              "@type": "Organization",
              "name": "AussieMotor",
              "url": "https://www.aussiemotor.com"
            },
            "areaServed": {
              "@type": "Country",
              "name": "Australia"
            }
          })
        }}
      />
      
      {children}
    </>
  );
}
