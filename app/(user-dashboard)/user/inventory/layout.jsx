import Script from 'next/script';

export const metadata = {
  title: "My Vehicle Listings | AussieMotor User Dashboard",
  description: "Manage your vehicle listings on AussieMotor. Post new ads, edit existing listings, track performance, and respond to inquiries for your cars, bikes, and trucks for sale.",
  keywords: "my listings, seller dashboard, vehicle inventory, car ads, manage listings, edit car listing, post new ad, vehicle seller, car selling tools, AussieMotor seller",
  openGraph: {
    title: "My Vehicle Listings | AussieMotor User Dashboard",
    description: "Manage your vehicle listings on AussieMotor. Post new ads, edit existing listings, track performance, and respond to inquiries for your cars, bikes, and trucks for sale.",
    url: "https://www.aussiemotor.com/user/inventory/",
    siteName: "AussieMotor",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
        width: 1200,
        height: 630,
        alt: "AussieMotor Vehicle Listings Management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Vehicle Listings | AussieMotor User Dashboard",
    description: "Manage your vehicle listings on AussieMotor. Post new ads, edit existing listings, and track performance.",
    images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
  },
  alternates: {
    canonical: "https://www.aussiemotor.com/user/inventory/",
  },
};

export default function InventoryLayout({ children }) {
  return (
    <>
      {/* BreadcrumbList Schema.org structured data */}
      <Script
        id="user-inventory-breadcrumb-data"
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
                "name": "My Listings",
                "item": "https://www.aussiemotor.com/user/inventory/"
              }
            ]
          })
        }}
      />
      
      {/* ItemList Schema.org structured data */}
      <Script
        id="user-inventory-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": [],
            "name": "My Vehicle Listings",
            "description": "Manage your vehicle listings on AussieMotor. Post new ads, edit existing listings, track performance, and respond to inquiries.",
            "url": "https://www.aussiemotor.com/user/inventory/"
          })
        }}
      />
      
      {children}
    </>
  );
} 