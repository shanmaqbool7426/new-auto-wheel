import Script from 'next/script';

export const metadata = {
  title: "Contact AussieMotor | Customer Support & Assistance",
  description: "Get in touch with AussieMotor's customer support team. We're here to help with all your automotive marketplace needs, inquiries about buying or selling vehicles, and technical support.",
  keywords: "contact AussieMotor, AussieMotor support, automotive marketplace help, car buying assistance, vehicle selling support, customer service Australia, automotive customer support, AussieMotor contact details",
  openGraph: {
    title: "Contact AussieMotor | Customer Support & Assistance",
    description: "Get in touch with AussieMotor's customer support team. We're here to help with all your automotive marketplace needs, inquiries about buying or selling vehicles, and technical support.",
    url: "https://www.aussiemotor.com/main/contact/",
    siteName: "AussieMotor",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
        width: 1200,
        height: 630,
        alt: "Contact AussieMotor - Customer Support",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact AussieMotor | Customer Support & Assistance",
    description: "Get in touch with AussieMotor's customer support team for all your automotive marketplace needs.",
    images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
  },
  alternates: {
    canonical: "https://www.aussiemotor.com/main/contact/",
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      {/* BreadcrumbList Schema.org structured data */}
      <Script
        id="contact-breadcrumb-data"
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
                "name": "Contact Us",
                "item": "https://www.aussiemotor.com/main/contact/"
              }
            ]
          })
        }}
      />
      
      {/* ContactPage Schema.org structured data */}
      <Script
        id="contact-page-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact AussieMotor",
            "description": "Get in touch with AussieMotor's customer support team. We're here to help with all your automotive marketplace needs.",
            "url": "https://www.aussiemotor.com/main/contact/",
            "mainEntity": {
              "@type": "Organization",
              "name": "AussieMotor",
              "url": "https://www.aussiemotor.com",
              "logo": "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+61-XXX-XXX-XXX",
                "contactType": "customer service",
                "email": "support@aussiemotor.com",
                "availableLanguage": "English",
                "areaServed": "Australia"
              }
            },
            "publisher": {
              "@type": "Organization",
              "name": "AussieMotor",
              "logo": {
                "@type": "ImageObject",
                "url": "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"
              }
            }
          })
        }}
      />
      
      {/* WebPage Schema.org structured data */}
      <Script
        id="contact-webpage-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Contact AussieMotor",
            "description": "Get in touch with AussieMotor's customer support team. We're here to help with all your automotive marketplace needs, inquiries about buying or selling vehicles, and technical support.",
            "url": "https://www.aussiemotor.com/main/contact/",
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