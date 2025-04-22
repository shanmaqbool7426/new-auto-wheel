import Script from 'next/script';

export const metadata = {
  title: "My Social Activity | AussieMotor User Dashboard",
  description: "View and manage your social interactions on AussieMotor. Connect with other automotive enthusiasts, follow dealers, and share your vehicle insights with the community.",
  keywords: "user social activity, automotive community, car enthusiast network, connect with sellers, dealer connections, vehicle social network, AussieMotor community, car social platform",
  openGraph: {
    title: "My Social Activity | AussieMotor User Dashboard",
    description: "View and manage your social interactions on AussieMotor. Connect with other automotive enthusiasts, follow dealers, and share your vehicle insights with the community.",
    url: "https://www.aussiemotor.com/user/social/",
    siteName: "AussieMotor",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
        width: 1200,
        height: 630,
        alt: "AussieMotor Social Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Social Activity | AussieMotor User Dashboard",
    description: "View and manage your social interactions on AussieMotor. Connect with other automotive enthusiasts and follow dealers.",
    images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
  },
  alternates: {
    canonical: "https://www.aussiemotor.com/user/social/",
  },
};

export default function SocialLayout({ children }) {
  return (
    <>
      {/* BreadcrumbList Schema.org structured data */}
      <Script
        id="user-social-breadcrumb-data"
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
                "name": "Social Activity",
                "item": "https://www.aussiemotor.com/user/social/"
              }
            ]
          })
        }}
      />
      
      {/* WebPage Schema.org structured data */}
      <Script
        id="user-social-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "My Social Activity",
            "description": "View and manage your social interactions on AussieMotor. Connect with other automotive enthusiasts, follow dealers, and share your vehicle insights with the community.",
            "url": "https://www.aussiemotor.com/user/social/",
            "isPartOf": {
              "@type": "WebSite",
              "name": "AussieMotor",
              "url": "https://www.aussiemotor.com"
            }
          })
        }}
      />
      
      {children}
    </>
  );
} 