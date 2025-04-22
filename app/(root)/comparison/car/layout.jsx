import Script from 'next/script';

export const metadata = {
  title: "Compare Cars Side by Side | AussieMotor",
  description: "Compare cars side by side on specifications, features, performance, fuel economy, and prices. Find the perfect car for your needs with AussieMotor's detailed comparison tool.",
  keywords: "car comparison, compare vehicles, compare car specs, compare car prices, Toyota vs Honda, Mazda vs Hyundai, side by side car comparison, Australia car comparison",
  openGraph: {
    title: "Compare Cars Side by Side | AussieMotor",
    description: "Compare cars side by side on specifications, features, performance, fuel economy, and prices. Find the perfect car for your needs and budget.",
    url: "https://www.aussiemotor.com/comparison/car/",
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
    title: "Compare Cars Side by Side | AussieMotor",
    description: "Compare cars side by side on specifications, features, performance, fuel economy, and prices at AussieMotor.",
    images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
  },
  alternates: {
    canonical: "https://www.aussiemotor.com/comparison/car/",
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      {/* BreadcrumbList Schema.org structured data */}
      <Script
        id="car-comparison-breadcrumb"
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
                "name": "Compare Cars",
                "item": "https://www.aussiemotor.com/comparison/car/"
              }
            ]
          })
        }}
      />
      
      {children}
    </>
  );
}
