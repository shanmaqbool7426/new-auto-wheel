import Script from 'next/script';
import { ComparisonProvider } from '@/contexts/comparison';

export const metadata = {
  title: "Vehicle Listings & Search Results | AussieMotor",
  description: "Browse vehicle listings and search results on AussieMotor. Find cars, bikes, and trucks for sale with detailed specifications, photos, and prices across Australia.",
  keywords: "vehicle listings, car search results, find vehicles, buy car, buy bike, buy truck, vehicle search, auto listings, Australia vehicles for sale, search cars",
  openGraph: {
    title: "Vehicle Listings & Search Results | AussieMotor",
    description: "Browse vehicle listings and search results on AussieMotor. Find cars, bikes, and trucks for sale with detailed specifications, photos, and prices across Australia.",
    url: "https://www.aussiemotor.com/listing/",
    siteName: "AussieMotor",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
        width: 1200,
        height: 630,
        alt: "Vehicle Listings on AussieMotor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vehicle Listings & Search Results | AussieMotor",
    description: "Browse vehicle listings and search results on AussieMotor. Find cars, bikes, and trucks for sale with detailed specifications, photos, and prices.",
    images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
  },
  alternates: {
    canonical: "https://www.aussiemotor.com/listing/",
  },
};

export default function RootLayout({ children }) {
  return(
    <ComparisonProvider>
      {/* BreadcrumbList Schema.org structured data */}
      <Script
        id="listing-breadcrumb-data"
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
                "name": "Vehicle Listings",
                "item": "https://www.aussiemotor.com/listing/"
              }
            ]
          })
        }}
      />
      
      {/* Search Results Schema.org structured data */}
      <Script
        id="listing-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Vehicle Listings & Search Results",
            "description": "Browse vehicles for sale on AussieMotor with detailed specifications, photos, and prices.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://www.aussiemotor.com/listing/search?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
      
      {children}
    </ComparisonProvider>
  )
}
