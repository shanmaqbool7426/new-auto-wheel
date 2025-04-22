import Script from 'next/script';

export const metadata = {
  title: "Used Motorcycles & Bikes For Sale in Australia | AussieMotor",
  description: "Find used motorcycles and bikes for sale in Australia. Browse thousands of second-hand bikes with photos, specs, and prices. Buy & sell used bikes easily at AussieMotor.",
  keywords: "used motorcycles, second hand bikes, used bikes for sale, buy used bike, sell used bike, used Honda motorcycle, used Yamaha bike, used Kawasaki, Australia used bikes, motorbikes",
  openGraph: {
    title: "Used Motorcycles & Bikes For Sale in Australia | AussieMotor",
    description: "Browse thousands of used motorcycles for sale in Australia with great deals on Honda, Yamaha, Kawasaki and more. Find your next bike at AussieMotor.",
    url: "https://www.aussiemotor.com/used-bikes/",
    siteName: "AussieMotor",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
        width: 1200,
        height: 630,
        alt: "Used Motorcycles for Sale in Australia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Used Motorcycles & Bikes For Sale in Australia | AussieMotor",
    description: "Browse thousands of used bikes for sale in Australia with great deals on Honda, Yamaha, Kawasaki and more at AussieMotor.",
    images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
  },
  alternates: {
    canonical: "https://www.aussiemotor.com/used-bikes/",
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      {/* BreadcrumbList Schema.org structured data */}
      <Script
        id="used-bikes-breadcrumb-data"
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
                "name": "Used Bikes",
                "item": "https://www.aussiemotor.com/used-bikes/"
              }
            ]
          })
        }}
      />
      
      {/* ItemList Schema.org structured data for the bike listings */}
      <Script
        id="used-bikes-list-data"
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
                  "@type": "MotorizedBicycle",
                  "name": "Honda CBR",
                  "description": "Used Honda CBR motorcycles for sale in Australia",
                  "url": "https://www.aussiemotor.com/used-bikes/honda/cbr/"
                }
              },
              {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@type": "MotorizedBicycle",
                  "name": "Yamaha YZF",
                  "description": "Used Yamaha YZF motorcycles for sale in Australia",
                  "url": "https://www.aussiemotor.com/used-bikes/yamaha/yzf/"
                }
              },
              {
                "@type": "ListItem",
                "position": 3,
                "item": {
                  "@type": "MotorizedBicycle",
                  "name": "Kawasaki Ninja",
                  "description": "Used Kawasaki Ninja motorcycles for sale in Australia",
                  "url": "https://www.aussiemotor.com/used-bikes/kawasaki/ninja/"
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
  