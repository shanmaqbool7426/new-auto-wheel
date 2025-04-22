import Script from 'next/script';

export const metadata = {
  title: "Automotive Videos & Car Reviews | AussieMotor",
  description: "Watch automotive videos, car reviews, comparison tests, and vehicle walkarounds. Stay updated with the latest video content about cars, bikes, and trucks at AussieMotor.",
  keywords: "automotive videos, car review videos, vehicle walkarounds, comparison tests, car video content, test drive videos, new car videos, vehicle reviews, Australia car videos",
  openGraph: {
    title: "Automotive Videos & Car Reviews | AussieMotor",
    description: "Watch automotive videos, car reviews, comparison tests, and vehicle walkarounds. Stay updated with the latest video content about cars, bikes, and trucks at AussieMotor.",
    url: "https://www.aussiemotor.com/videos/",
    siteName: "AussieMotor",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
        width: 1200,
        height: 630,
        alt: "Automotive Videos on AussieMotor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Automotive Videos & Car Reviews | AussieMotor",
    description: "Watch automotive videos, car reviews, comparison tests, and vehicle walkarounds. Stay updated with the latest video content about cars, bikes, and trucks.",
    images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
  },
  alternates: {
    canonical: "https://www.aussiemotor.com/videos/",
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      {/* BreadcrumbList Schema.org structured data */}
      <Script
        id="videos-breadcrumb-data"
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
                "name": "Videos",
                "item": "https://www.aussiemotor.com/videos/"
              }
            ]
          })
        }}
      />
      
      {/* VideoGallery Schema.org structured data */}
      <Script
        id="videos-gallery-data"
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
                  "@type": "VideoObject",
                  "name": "Car Reviews",
                  "description": "Expert reviews of the latest car models in Australia",
                  "thumbnailUrl": "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
                  "uploadDate": new Date().toISOString()
                }
              },
              {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@type": "VideoObject",
                  "name": "Vehicle Comparisons",
                  "description": "Side-by-side comparisons of popular vehicles in Australia",
                  "thumbnailUrl": "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
                  "uploadDate": new Date().toISOString()
                }
              },
              {
                "@type": "ListItem",
                "position": 3,
                "item": {
                  "@type": "VideoObject",
                  "name": "Vehicle Walkarounds",
                  "description": "Detailed walkarounds of new and popular vehicles",
                  "thumbnailUrl": "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
                  "uploadDate": new Date().toISOString()
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