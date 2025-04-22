import Script from 'next/script';

export const metadata = {
  title: "Post a Vehicle Listing | Sell Your Vehicle on AussieMotor",
  description: "Post a listing to sell your car, motorcycle, or truck on AussieMotor. Create an attractive vehicle ad with photos, details, and price to connect with potential buyers across Australia.",
  keywords: "post vehicle ad, sell my car, sell my bike, sell my truck, vehicle listing, car selling platform, create vehicle ad, australia vehicle marketplace, online car selling, post car for sale",
  openGraph: {
    title: "Post a Vehicle Listing | Sell Your Vehicle on AussieMotor",
    description: "Post a listing to sell your car, motorcycle, or truck on AussieMotor. Create an attractive vehicle ad with photos, details, and price to connect with potential buyers across Australia.",
    url: "https://www.aussiemotor.com/sale/vehicle/post-ad/",
    siteName: "AussieMotor",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
        width: 1200,
        height: 630,
        alt: "Post a Vehicle Listing on AussieMotor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Post a Vehicle Listing | Sell Your Vehicle on AussieMotor",
    description: "Post a listing to sell your car, motorcycle, or truck on AussieMotor. Create an attractive vehicle ad with photos, details, and price.",
    images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
  },
  alternates: {
    canonical: "https://www.aussiemotor.com/sale/vehicle/post-ad/",
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      {/* BreadcrumbList Schema.org structured data */}
      <Script
        id="post-ad-breadcrumb-data"
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
                "name": "Sell Your Vehicle",
                "item": "https://www.aussiemotor.com/sale/"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Post Ad",
                "item": "https://www.aussiemotor.com/sale/vehicle/post-ad/"
              }
            ]
          })
        }}
      />
      
      {/* WebPage Schema.org structured data */}
      <Script
        id="post-ad-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Post a Vehicle Listing",
            "description": "Create a listing to sell your vehicle on AussieMotor, Australia's trusted automotive marketplace.",
            "potentialAction": {
              "@type": "Action",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://www.aussiemotor.com/sale/vehicle/post-ad/"
              },
              "name": "Post Your Ad"
            }
          })
        }}
      />
      
      {children}
    </>
  );
}
  