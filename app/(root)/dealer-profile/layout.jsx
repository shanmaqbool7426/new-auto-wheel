import Script from 'next/script';

export const metadata = {
  title: "Car Dealer Profiles & Automotive Dealerships | AussieMotor",
  description: "Browse car dealer profiles and automotive dealerships across Australia. Find contact information, available vehicles, reviews, and ratings for trusted car dealers near you.",
  keywords: "car dealers, automotive dealerships, vehicle dealers, car dealership reviews, used car dealers, new car dealers, auto dealership ratings, Australia car dealers, trusted car dealerships",
  openGraph: {
    title: "Car Dealer Profiles & Automotive Dealerships | AussieMotor",
    description: "Browse car dealer profiles and automotive dealerships across Australia. Find contact information, available vehicles, reviews, and ratings for trusted car dealers near you.",
    url: "https://www.aussiemotor.com/dealer-profile/",
    siteName: "AussieMotor",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
        width: 1200,
        height: 630,
        alt: "Car Dealerships in Australia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Car Dealer Profiles & Automotive Dealerships | AussieMotor",
    description: "Browse car dealer profiles and automotive dealerships across Australia. Find contact information, available vehicles, reviews, and ratings.",
    images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
  },
  alternates: {
    canonical: "https://www.aussiemotor.com/dealer-profile/",
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      {/* BreadcrumbList Schema.org structured data */}
      <Script
        id="dealer-profile-breadcrumb-data"
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
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Dealer Profiles",
                "item": "https://www.aussiemotor.com/dealer-profile/"
              }
            ]
          })
        }}
      />
      
      {/* LocalBusiness Schema.org structured data */}
      <Script
        id="dealer-business-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoDealer",
            "name": "Australian Car Dealerships",
            "description": "Find trusted car dealerships across Australia with AussieMotor's comprehensive dealer directory.",
            "url": "https://www.aussiemotor.com/dealer-profile/",
            "openingHours": "Mo-Fr 09:00-18:00, Sa 09:00-17:00",
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
