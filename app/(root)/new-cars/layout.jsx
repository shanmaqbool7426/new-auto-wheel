import Script from 'next/script';

export const metadata = {
  title: "Find New Cars in Australia | Compare Prices & Specs | AussieMotor",
  description: "Explore new cars for sale in Australia. Browse latest models, specs, features and prices. Compare new vehicles from Toyota, Honda, Mazda, BMW and more at AussieMotor - Australia's leading automotive marketplace.",
  keywords: "new cars, new vehicles, cars for sale, buy new car, new car dealer, new car prices, Toyota, Honda, Mazda, BMW, SUV, sedan, hatchback, electric cars, hybrid cars, new cars Australia, car comparison, car reviews, car finance, car insurance",
  openGraph: {
    title: "Find New Cars in Australia | Compare Prices & Specs | AussieMotor",
    description: "Explore the latest car models in Australia with detailed specs, features and prices. Find and compare new cars from Toyota, Honda, Mazda, BMW and more at AussieMotor - Australia's premier automotive platform.",
    url: "https://www.aussiemotor.com/new-cars/",
    siteName: "AussieMotor",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
        width: 1200,
        height: 630,
        alt: "New Cars for Sale in Australia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Find New Cars in Australia | Compare Prices & Specs | AussieMotor",
    description: "Explore the latest car models in Australia with detailed specs, features and prices. Find and compare new cars at AussieMotor - Australia's premier automotive platform.",
    images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
  },
  alternates: {
    canonical: "https://www.aussiemotor.com/new-cars/",
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      {/* BreadcrumbList Schema.org structured data */}
      <Script
        id="new-cars-breadcrumb-data"
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
                "name": "New Cars",
                "item": "https://www.aussiemotor.com/new-cars/"
              }
            ]
          })
        }}
      />
      
      {/* ItemList Schema.org structured data for popular car listings */}
      <Script
        id="new-cars-list-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "item": {
                  "@type": "Car",
                  "name": "Toyota Corolla",
                  "description": "New Toyota Corolla cars in Australia - explore features, specifications, and prices",
                  "url": "https://www.aussiemotor.com/new-cars/toyota/corolla/",
                  "brand": {
                    "@type": "Brand",
                    "name": "Toyota"
                  },
                  "manufacturer": {
                    "@type": "Organization",
                    "name": "Toyota Motor Corporation"
                  },
                  "vehicleConfiguration": "Sedan, Hatchback",
                  "fuelType": "Petrol, Hybrid"
                }
              },
              {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@type": "Car",
                  "name": "Mazda 3",
                  "description": "New Mazda 3 cars in Australia - discover premium features and competitive pricing",
                  "url": "https://www.aussiemotor.com/new-cars/mazda/3/",
                  "brand": {
                    "@type": "Brand",
                    "name": "Mazda"
                  },
                  "manufacturer": {
                    "@type": "Organization",
                    "name": "Mazda Motor Corporation"
                  },
                  "vehicleConfiguration": "Sedan, Hatchback",
                  "fuelType": "Petrol"
                }
              },
              {
                "@type": "ListItem",
                "position": 3,
                "item": {
                  "@type": "Car",
                  "name": "Honda Civic",
                  "description": "New Honda Civic cars in Australia - engineered for performance and comfort",
                  "url": "https://www.aussiemotor.com/new-cars/honda/civic/",
                  "brand": {
                    "@type": "Brand",
                    "name": "Honda"
                  },
                  "manufacturer": {
                    "@type": "Organization",
                    "name": "Honda Motor Co."
                  },
                  "vehicleConfiguration": "Sedan, Hatchback",
                  "fuelType": "Petrol"
                }
              },
              {
                "@type": "ListItem",
                "position": 4,
                "item": {
                  "@type": "Car",
                  "name": "BMW 3 Series",
                  "description": "New BMW 3 Series in Australia - luxury performance sedans with advanced technology",
                  "url": "https://www.aussiemotor.com/new-cars/bmw/3-series/",
                  "brand": {
                    "@type": "Brand",
                    "name": "BMW"
                  },
                  "manufacturer": {
                    "@type": "Organization",
                    "name": "BMW Group"
                  },
                  "vehicleConfiguration": "Sedan",
                  "fuelType": "Petrol, Diesel, Hybrid"
                }
              },
              {
                "@type": "ListItem",
                "position": 5,
                "item": {
                  "@type": "Car",
                  "name": "Tesla Model 3",
                  "description": "New Tesla Model 3 in Australia - innovative electric vehicles with cutting-edge technology",
                  "url": "https://www.aussiemotor.com/new-cars/tesla/model-3/",
                  "brand": {
                    "@type": "Brand",
                    "name": "Tesla"
                  },
                  "manufacturer": {
                    "@type": "Organization",
                    "name": "Tesla, Inc."
                  },
                  "vehicleConfiguration": "Sedan",
                  "fuelType": "Electric"
                }
              }
            ]
          })
        }}
      />
      
      {/* FAQs Schema for New Cars */}
      <Script
        id="new-cars-faqs-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Which are the most popular new cars available in Australia in 2024?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Popular new cars in Australia include Toyota Corolla, Toyota RAV4, Mazda 3, Mazda CX-5, and Tesla Model 3. These models are known for their reliability, efficiency, and advanced features."
                }
              },
              {
                "@type": "Question",
                "name": "Which are the most popular new car brands in Australia?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Popular new car brands in Australia include Toyota, Mazda, Hyundai, Kia, Ford, and Tesla. These brands offer a wide range of vehicles to suit different needs and budgets."
                }
              },
              {
                "@type": "Question",
                "name": "Are there any upcoming electric cars in Australia?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Australia's electric vehicle market is growing, with new models expected from manufacturers like Tesla, BYD, Kia, Hyundai, and Volkswagen. These upcoming EVs offer increased range, enhanced technology, and more competitive pricing."
                }
              },
              {
                "@type": "Question",
                "name": "How can I calculate the total cost of a new car in Australia?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "To calculate the total cost of a new car in Australia, add the base price, options, luxury car tax (if applicable), dealer delivery fees, registration, compulsory third party insurance, and stamp duty. AussieMotor offers an on-road price calculator to help estimate these costs."
                }
              }
            ]
          })
        }}
      />
      
      {/* Organization Schema for AussieMotor */}
      <Script
        id="organization-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "AussieMotor",
            "url": "https://www.aussiemotor.com",
            "logo": "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
            "sameAs": [
              "https://www.facebook.com/aussiemotor",
              "https://www.instagram.com/aussiemotor",
              "https://twitter.com/aussiemotor"
            ],
            "description": "Australia's premier automotive marketplace for buying and selling new and used vehicles."
          })
        }}
      />
      
      {children}
    </>
  );
}
  