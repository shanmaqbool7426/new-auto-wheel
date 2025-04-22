import Script from 'next/script';

export const metadata = {
  title: "About AussieMotor | Your Australian Automotive Marketplace",
  description: "Learn about AussieMotor, Australia's premier automotive marketplace. Discover our mission to connect car buyers and sellers, our values, and our team dedicated to transforming the Australian car market.",
  keywords: "about AussieMotor, Australian car marketplace, automotive platform, car buying Australia, used cars Australia, new cars Australia, car selling platform, AussieMotor team, automotive marketplace history",
  openGraph: {
    title: "About AussieMotor | Your Australian Automotive Marketplace",
    description: "Learn about AussieMotor, Australia's premier automotive marketplace. Discover our mission to connect car buyers and sellers, our values, and our team dedicated to transforming the Australian car market.",
    url: "https://www.aussiemotor.com/main/about/",
    siteName: "AussieMotor",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
        width: 1200,
        height: 630,
        alt: "About AussieMotor - Australian Automotive Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About AussieMotor | Your Australian Automotive Marketplace",
    description: "Learn about AussieMotor, Australia's premier automotive marketplace and our mission to transform the Australian car market.",
    images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
  },
  alternates: {
    canonical: "https://www.aussiemotor.com/main/about/",
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      {/* BreadcrumbList Schema.org structured data */}
      <Script
        id="about-breadcrumb-data"
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
                "name": "About Us",
                "item": "https://www.aussiemotor.com/main/about/"
              }
            ]
          })
        }}
      />
      
      {/* Organization Schema.org structured data */}
      <Script
        id="about-organization-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "AussieMotor",
            "url": "https://www.aussiemotor.com/",
            "logo": "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
            "description": "AussieMotor is Australia's premier automotive marketplace, connecting car buyers and sellers across the country with a mission to transform the Australian car market.",
            "sameAs": [
              "https://www.facebook.com/aussiemotor",
              "https://www.twitter.com/aussiemotor",
              "https://www.instagram.com/aussiemotor",
              "https://www.linkedin.com/company/aussiemotor"
            ],
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "Australia"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "email": "support@aussiemotor.com"
            },
            "foundingDate": "2023-01-01"
          })
        }}
      />
      
      {/* WebPage Schema.org structured data */}
      <Script
        id="about-webpage-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "About AussieMotor",
            "description": "Learn about AussieMotor, Australia's premier automotive marketplace. Discover our mission to connect car buyers and sellers, our values, and our team dedicated to transforming the Australian car market.",
            "url": "https://www.aussiemotor.com/main/about/",
            "publisher": {
              "@type": "Organization",
              "name": "AussieMotor",
              "logo": {
                "@type": "ImageObject",
                "url": "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"
              }
            },
            "mainContentOfPage": {
              "@type": "WebPageElement",
              "cssSelector": "main"
            },
            "speakable": {
              "@type": "SpeakableSpecification",
              "cssSelector": ["h1", "h2"]
            },
            "lastReviewed": new Date().toISOString().split('T')[0]
          })
        }}
      />
      
      {children}
    </>
  );
} 