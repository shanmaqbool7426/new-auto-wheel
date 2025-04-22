export const metadata = {
  title: "AussieMotor - Buy & Sell Cars, Bikes & Auto Parts in Australia",
  description: "Australia's #1 automotive marketplace for buying & selling cars, bikes & auto parts. Browse 50,000+ listings, read expert reviews, compare vehicles, and get the best deals on new & used cars across Australia.",
  keywords: "cars, used cars, new cars, cars for sale, buy cars, sell cars, car prices, auto parts, bikes, motorcycles, auto loans, car insurance, Australia cars, Toyota, Honda, Mazda, BMW, Ford, Hyundai, Kia, Volkswagen, car dealer, car marketplace, private car sale",
  openGraph: {
    title: "AussieMotor - Australia's #1 Automotive Marketplace",
    description: "Find, buy & sell cars, bikes & auto parts at Australia's leading automotive marketplace. Browse 50,000+ listings, compare vehicles, read expert reviews, and discover the best automotive deals nationwide.",
    url: "https://www.aussiemotor.com/",
    siteName: "AussieMotor",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
        width: 1200,
        height: 630,
        alt: "AussieMotor - Australia's #1 Automotive Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AussieMotor - Buy & Sell Cars, Bikes & Auto Parts in Australia",
    description: "Australia's #1 automotive marketplace. Buy & sell cars, bikes & auto parts. Find the best automotive deals.",
    images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
    creator: "@aussiemotor",
    site: "@aussiemotor",
  },
  alternates: {
    canonical: "https://www.aussiemotor.com/",
    languages: {
      'en-AU': 'https://www.aussiemotor.com/',
    },
  },
  applicationName: "AussieMotor",
  authors: [{ name: "AussieMotor Team" }],
  creator: "AussieMotor",
  publisher: "AussieMotor Australia Pty Ltd",
  metadataBase: new URL("https://www.aussiemotor.com"),
  verification: {
    google: "google-site-verification-code", // Replace with your actual Google verification code
    yandex: "yandex-verification-code", // Replace with your Yandex verification code if needed
    bing: "bing-verification-code", // Replace with your Bing verification code if needed
  },
  category: "Automotive",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "AussieMotor",
    "format-detection": "telephone=no",
    "msapplication-TileColor": "#e90808",
    "msapplication-config": "/favicon/browserconfig.xml",
    "theme-color": "#e90808",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  // Structured data (JSON-LD) for better SEO
  // Must be implemented in the layout.jsx file separately
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AussieMotor",
    url: "https://www.aussiemotor.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.aussiemotor.com/used-cars/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    sameAs: [
      "https://www.facebook.com/aussiemotor",
      "https://twitter.com/aussiemotor",
      "https://www.instagram.com/aussiemotor"
    ],
    description: "Australia's #1 automotive marketplace for buying & selling cars, bikes & auto parts."
  }
}; 