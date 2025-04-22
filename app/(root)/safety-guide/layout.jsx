import Script from 'next/script';

export const metadata = {
  title: "Automotive Safety Guides & Vehicle Safety Tips | AussieMotor",
  description: "Learn about vehicle safety features, safe driving practices, and car safety ratings. Find expert safety guides and tips for all drivers at AussieMotor.",
  keywords: "car safety, vehicle safety guide, safe driving tips, ANCAP ratings, child car safety, road safety, car safety features, driver safety, Australia road safety, defensive driving",
  openGraph: {
    title: "Automotive Safety Guides & Vehicle Safety Tips | AussieMotor",
    description: "Learn about vehicle safety features, safe driving practices, and car safety ratings. Find comprehensive safety guides for all drivers.",
    url: "https://www.aussiemotor.com/safety-guide/",
    siteName: "AussieMotor",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
        width: 1200,
        height: 630,
        alt: "Vehicle Safety Guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Automotive Safety Guides & Vehicle Safety Tips | AussieMotor",
    description: "Learn about vehicle safety features, safe driving practices, and car safety ratings at AussieMotor.",
    images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
  },
  alternates: {
    canonical: "https://www.aussiemotor.com/safety-guide/",
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      {/* BreadcrumbList Schema.org structured data */}
      <Script
        id="safety-guide-breadcrumb-data"
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
                "name": "Safety Guides",
                "item": "https://www.aussiemotor.com/safety-guide/"
              }
            ]
          })
        }}
      />
      
      {/* HowTo Schema.org structured data */}
      <Script
        id="safety-guide-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "Vehicle Safety Guide",
            "description": "A comprehensive guide to vehicle safety features and safe driving practices.",
            "step": [
              {
                "@type": "HowToStep",
                "name": "Understand Vehicle Safety Ratings",
                "text": "Learn how to interpret ANCAP safety ratings and what they mean for vehicle occupant protection.",
                "url": "https://www.aussiemotor.com/safety-guide/safety-ratings/"
              },
              {
                "@type": "HowToStep",
                "name": "Check Safety Features",
                "text": "Important safety features to look for when buying a new or used vehicle.",
                "url": "https://www.aussiemotor.com/safety-guide/safety-features/"
              },
              {
                "@type": "HowToStep",
                "name": "Practice Safe Driving",
                "text": "Tips and techniques for defensive driving and avoiding road accidents.",
                "url": "https://www.aussiemotor.com/safety-guide/safe-driving/"
              }
            ]
          })
        }}
      />
      
      {children}
    </>
  );
} 