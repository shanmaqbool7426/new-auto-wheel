import Script from 'next/script';

export const metadata = {
  title: "Used Cars For Sale in Australia | AussieMotor",
  description: "Find used cars for sale in Australia. Browse over 50,000+ used cars with photos, features, specs, and prices. Buy & sell second-hand cars easily at AussieMotor.",
  keywords: "used cars, second hand cars, cars for sale, buy used car, sell used car, used car dealer, used car prices, used Toyota, used Honda, used cars Australia, pre-owned vehicles, affordable cars",
  openGraph: {
    title: "Used Cars For Sale in Australia | AussieMotor",
    description: "Browse 50,000+ used cars for sale in Australia with great deals on Toyota, Honda, Mazda and more. Find your next car at AussieMotor - Australia's #1 auto marketplace.",
    url: "https://www.aussiemotor.com/used-cars/",
    siteName: "AussieMotor",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
        width: 1200,
        height: 630,
        alt: "Used Cars for Sale in Australia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Used Cars For Sale in Australia | AussieMotor",
    description: "Browse 50,000+ used cars for sale in Australia with great deals on Toyota, Honda, Mazda and more. Find your next car at AussieMotor.",
    images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
  },
  alternates: {
    canonical: "https://www.aussiemotor.com/used-cars/",
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      {/* BreadcrumbList Schema.org structured data */}
      <Script
        id="breadcrumb-data"
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
                "name": "Used Cars",
                "item": "https://www.aussiemotor.com/used-cars/"
              }
            ]
          })
        }}
      />
      
      {/* ItemList Schema.org structured data for the car listings */}
      <Script
        id="item-list-data"
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
                  "@type": "Car",
                  "name": "Toyota Corolla",
                  "description": "Used Toyota Corolla cars for sale in Australia",
                  "url": "https://www.aussiemotor.com/used-cars/toyota/corolla/"
                }
              },
              {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@type": "Car",
                  "name": "Honda Civic",
                  "description": "Used Honda Civic cars for sale in Australia",
                  "url": "https://www.aussiemotor.com/used-cars/honda/civic/"
                }
              },
              {
                "@type": "ListItem",
                "position": 3,
                "item": {
                  "@type": "Car",
                  "name": "Mazda 3",
                  "description": "Used Mazda 3 cars for sale in Australia",
                  "url": "https://www.aussiemotor.com/used-cars/mazda/3/"
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
  