import Script from 'next/script';

export const metadata = {
  title: "Car Comparison Details & Side-by-Side Analysis | AussieMotor",
  description: "Compare cars with detailed side-by-side analysis of specifications, features, performance, fuel economy, safety, and prices. Make smarter car buying decisions with AussieMotor's comparison tool.",
  keywords: "car comparison, vehicle comparison, side by side comparison, compare car specs, compare car prices, car buying guide, compare car features, compare car models, Australia car comparison",
  openGraph: {
    title: "Car Comparison Details & Side-by-Side Analysis | AussieMotor",
    description: "Compare cars with detailed side-by-side analysis of specifications, features, performance, fuel economy, safety, and prices. Make smarter car buying decisions.",
    url: "https://www.aussiemotor.com/comparison-detail/",
    siteName: "AussieMotor",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
        width: 1200,
        height: 630,
        alt: "Car Comparison Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Car Comparison Details & Side-by-Side Analysis | AussieMotor",
    description: "Compare cars with detailed side-by-side analysis of specifications, features, performance, fuel economy, safety, and prices.",
    images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
  },
  alternates: {
    canonical: "https://www.aussiemotor.com/comparison-detail/",
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      {/* BreadcrumbList Schema.org structured data */}
      <Script
        id="comparison-detail-breadcrumb"
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
                "name": "Car Comparison",
                "item": "https://www.aussiemotor.com/comparison/"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Comparison Details",
                "item": "https://www.aussiemotor.com/comparison-detail/"
              }
            ]
          })
        }}
      />
      
      {children}
    </>
  );
}
