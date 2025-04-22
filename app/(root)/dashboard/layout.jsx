import Script from 'next/script';

export const metadata = {
  title: "User Dashboard - Manage Your Vehicles | AussieMotor",
  description: "Access your AussieMotor user dashboard to manage your vehicle listings, saved searches, favorite cars, and account settings. Easily track your activity on Australia's leading automotive marketplace.",
  keywords: "user dashboard, vehicle management, saved searches, favorite cars, account settings, car listings management, seller dashboard, buyer dashboard, AussieMotor account",
  openGraph: {
    title: "User Dashboard - Manage Your Vehicles | AussieMotor",
    description: "Access your AussieMotor user dashboard to manage your vehicle listings, saved searches, favorite cars, and account settings.",
    url: "https://www.aussiemotor.com/dashboard/",
    siteName: "AussieMotor",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
        width: 1200,
        height: 630,
        alt: "AussieMotor User Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "User Dashboard - Manage Your Vehicles | AussieMotor",
    description: "Access your AussieMotor user dashboard to manage your vehicle listings, saved searches, favorite cars, and account settings.",
    images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
  },
  alternates: {
    canonical: "https://www.aussiemotor.com/dashboard/",
  },
};

export default function DashboardLayout({ children }) {
  return (
    <>
      {/* BreadcrumbList Schema.org structured data */}
      <Script
        id="dashboard-breadcrumb-data"
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
                "name": "User Dashboard",
                "item": "https://www.aussiemotor.com/dashboard/"
              }
            ]
          })
        }}
      />
      
      {children}
    </>
  );
} 