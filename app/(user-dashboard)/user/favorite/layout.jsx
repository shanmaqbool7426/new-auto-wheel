import Script from 'next/script';

export const metadata = {
  title: "My Saved Vehicles | AussieMotor User Dashboard",
  description: "View and manage your saved vehicles on AussieMotor. Keep track of cars, bikes, and trucks you're interested in and compare them easily in your favorites list.",
  keywords: "saved vehicles, favorite cars, saved listings, car watchlist, vehicle shortlist, saved searches, AussieMotor favorites, bookmark vehicles, saved car listings",
  openGraph: {
    title: "My Saved Vehicles | AussieMotor User Dashboard",
    description: "View and manage your saved vehicles on AussieMotor. Keep track of cars, bikes, and trucks you're interested in and compare them easily in your favorites list.",
    url: "https://www.aussiemotor.com/user/favorite/",
    siteName: "AussieMotor",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
        width: 1200,
        height: 630,
        alt: "AussieMotor Saved Vehicles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Saved Vehicles | AussieMotor User Dashboard",
    description: "View and manage your saved vehicles on AussieMotor. Keep track of cars, bikes, and trucks you're interested in.",
    images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
  },
  alternates: {
    canonical: "https://www.aussiemotor.com/user/favorite/",
  },
};

export default function FavoriteLayout({ children }) {
  return (
    <>
      {/* BreadcrumbList Schema.org structured data */}
      <Script
        id="user-favorite-breadcrumb-data"
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
                "name": "My Account",
                "item": "https://www.aussiemotor.com/user/"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Saved Vehicles",
                "item": "https://www.aussiemotor.com/user/favorite/"
              }
            ]
          })
        }}
      />
      
      {/* ItemList Schema.org structured data */}
      <Script
        id="user-favorite-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": [],
            "name": "My Saved Vehicles",
            "description": "View and manage your saved vehicles on AussieMotor. Keep track of cars, bikes, and trucks you're interested in.",
            "url": "https://www.aussiemotor.com/user/favorite/"
          })
        }}
      />
      
      {children}
    </>
  );
} 