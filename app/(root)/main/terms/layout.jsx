import Script from 'next/script';

export const metadata = {
  title: "Terms & Conditions | AussieMotor",
  description: "Read the Terms & Conditions of AussieMotor. Learn about the rules, guidelines, and legal information for using the AussieMotor platform for buying, selling, and researching vehicles in Australia.",
  keywords: "AussieMotor terms and conditions, automotive website terms, car marketplace terms, vehicle listing terms, Australian auto terms, legal terms, user agreement, car buying terms",
  openGraph: {
    title: "Terms & Conditions | AussieMotor",
    description: "Read the Terms & Conditions of AussieMotor. Learn about the rules, guidelines, and legal information for using the AussieMotor platform for buying, selling, and researching vehicles in Australia.",
    url: "https://www.aussiemotor.com/main/terms/",
    siteName: "AussieMotor",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
        width: 1200,
        height: 630,
        alt: "AussieMotor Terms and Conditions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | AussieMotor",
    description: "Read the Terms & Conditions of AussieMotor. Learn about the rules, guidelines, and legal information for using our platform.",
    images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
  },
  alternates: {
    canonical: "https://www.aussiemotor.com/main/terms/",
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      {/* BreadcrumbList Schema.org structured data */}
      <Script
        id="terms-breadcrumb-data"
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
                "name": "Terms & Conditions",
                "item": "https://www.aussiemotor.com/main/terms/"
              }
            ]
          })
        }}
      />
      
      {/* WebPage Schema.org structured data */}
      <Script
        id="terms-webpage-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Terms & Conditions",
            "description": "Read the Terms & Conditions of AussieMotor. Learn about the rules, guidelines, and legal information for using the AussieMotor platform for buying, selling, and researching vehicles in Australia.",
            "url": "https://www.aussiemotor.com/main/terms/",
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
  