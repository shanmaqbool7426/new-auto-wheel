import Script from 'next/script';

export const metadata = {
  title: "Search Used Cars in Australia | aussiemotor",
  description: "Search for used cars in Australia by make, model, variant, city and area. Find your perfect second-hand vehicle at aussiemotor.",
  keywords: "search used cars, used car search, find cars by make, find cars by model, used car filters, used car marketplace, Australia",
  openGraph: {
    title: "Search Used Cars in Australia | aussiemotor",
    description: "Advanced search for used cars in Australia. Filter by make, model, price range, location and more at aussiemotor.",
    url: "https://www.aussiemotor.com/used-cars/search/",
    siteName: "aussiemotor",
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Search Used Cars in Australia | aussiemotor",
    description: "Advanced search for used cars in Australia. Filter by make, model, price range, location and more at aussiemotor.",
  },
  alternates: {
    canonical: "https://www.aussiemotor.com/used-cars/search/",
  },
};

export default function SearchLayout({ children }) {
  return (
    <>
      {/* Add structured data for search */}
      <Script
        id="search-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://www.aussiemotor.com/",
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://www.aussiemotor.com/used-cars/search?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
      
      {children}
    </>
  );
} 