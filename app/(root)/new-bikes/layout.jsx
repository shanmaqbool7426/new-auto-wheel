import Script from 'next/script';

export const metadata = {
  title: "Find New Motorcycles in Australia | Compare Specs & Prices | AussieMotor",
  description: "Explore the latest new motorcycles and bikes for sale in Australia. Browse by make, model, and type. Compare prices, specifications, and features of new bikes from Honda, Yamaha, Kawasaki, Suzuki and more at AussieMotor - Australia's leading motorcycle marketplace.",
  keywords: "new motorcycles, new bikes, buy motorcycle, latest bike models, Honda motorcycle, Yamaha bike, Kawasaki, Suzuki, Harley-Davidson, Ducati, sport bikes, cruisers, adventure bikes, touring bikes, off-road bikes, motorcycle prices, Australia new bikes, motorcycle comparison, motorcycle finance",
  openGraph: {
    title: "Find New Motorcycles in Australia | Compare Specs & Prices | AussieMotor",
    description: "Explore the latest new motorcycles and bikes for sale in Australia. Browse by make, model, and type. Compare prices, specifications, and features of new bikes from Honda, Yamaha, Kawasaki, Suzuki and more at AussieMotor - Australia's premier motorcycle marketplace.",
    url: "https://www.aussiemotor.com/new-bikes/",
    siteName: "AussieMotor",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
        width: 1200,
        height: 630,
        alt: "New Motorcycles in Australia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Find New Motorcycles in Australia | Compare Specs & Prices | AussieMotor",
    description: "Explore the latest new motorcycles and bikes for sale in Australia. Browse by make, model, and type. Compare prices, specifications, and features from leading brands at AussieMotor - Australia's premier motorcycle marketplace.",
    images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
  },
  alternates: {
    canonical: "https://www.aussiemotor.com/new-bikes/",
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      {/* BreadcrumbList Schema.org structured data */}
      <Script
        id="new-bikes-breadcrumb-data"
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
                "name": "New Bikes",
                "item": "https://www.aussiemotor.com/new-bikes/"
              }
            ]
          })
        }}
      />
      
      {/* ItemList Schema.org structured data for popular bike listings */}
      <Script
        id="new-bikes-list-data"
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
                  "@type": "MotorizedBicycle",
                  "name": "Honda CBR650R",
                  "description": "New Honda CBR650R motorcycles in Australia - performance and reliability in a sport bike package",
                  "url": "https://www.aussiemotor.com/new-bikes/honda/cbr650r/",
                  "brand": {
                    "@type": "Brand",
                    "name": "Honda"
                  },
                  "manufacturer": {
                    "@type": "Organization",
                    "name": "Honda Motor Co., Ltd."
                  },
                  "vehicleConfiguration": "Sport Bike",
                  "vehicleEngine": {
                    "@type": "EngineSpecification",
                    "engineType": "649cc inline-four"
                  }
                }
              },
              {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@type": "MotorizedBicycle",
                  "name": "Yamaha MT-07",
                  "description": "New Yamaha MT-07 motorcycles in Australia - dynamic naked bike with thrilling performance",
                  "url": "https://www.aussiemotor.com/new-bikes/yamaha/mt-07/",
                  "brand": {
                    "@type": "Brand",
                    "name": "Yamaha"
                  },
                  "manufacturer": {
                    "@type": "Organization",
                    "name": "Yamaha Motor Co., Ltd."
                  },
                  "vehicleConfiguration": "Naked Bike",
                  "vehicleEngine": {
                    "@type": "EngineSpecification",
                    "engineType": "689cc parallel-twin"
                  }
                }
              },
              {
                "@type": "ListItem",
                "position": 3,
                "item": {
                  "@type": "MotorizedBicycle",
                  "name": "Kawasaki Ninja 400",
                  "description": "New Kawasaki Ninja 400 motorcycles in Australia - the perfect entry-level sport bike",
                  "url": "https://www.aussiemotor.com/new-bikes/kawasaki/ninja-400/",
                  "brand": {
                    "@type": "Brand",
                    "name": "Kawasaki"
                  },
                  "manufacturer": {
                    "@type": "Organization",
                    "name": "Kawasaki Heavy Industries"
                  },
                  "vehicleConfiguration": "Sport Bike",
                  "vehicleEngine": {
                    "@type": "EngineSpecification",
                    "engineType": "399cc parallel-twin"
                  }
                }
              },
              {
                "@type": "ListItem",
                "position": 4,
                "item": {
                  "@type": "MotorizedBicycle",
                  "name": "Suzuki V-Strom 650",
                  "description": "New Suzuki V-Strom 650 motorcycles in Australia - versatile adventure bike for all terrain",
                  "url": "https://www.aussiemotor.com/new-bikes/suzuki/v-strom-650/",
                  "brand": {
                    "@type": "Brand",
                    "name": "Suzuki"
                  },
                  "manufacturer": {
                    "@type": "Organization",
                    "name": "Suzuki Motor Corporation"
                  },
                  "vehicleConfiguration": "Adventure Bike",
                  "vehicleEngine": {
                    "@type": "EngineSpecification",
                    "engineType": "645cc V-twin"
                  }
                }
              },
              {
                "@type": "ListItem",
                "position": 5,
                "item": {
                  "@type": "MotorizedBicycle",
                  "name": "Harley-Davidson Street Glide",
                  "description": "New Harley-Davidson Street Glide motorcycles in Australia - the iconic American touring bike",
                  "url": "https://www.aussiemotor.com/new-bikes/harley-davidson/street-glide/",
                  "brand": {
                    "@type": "Brand",
                    "name": "Harley-Davidson"
                  },
                  "manufacturer": {
                    "@type": "Organization",
                    "name": "Harley-Davidson, Inc."
                  },
                  "vehicleConfiguration": "Touring Bike",
                  "vehicleEngine": {
                    "@type": "EngineSpecification",
                    "engineType": "Milwaukee-Eight 107 V-twin"
                  }
                }
              }
            ]
          })
        }}
      />
      
      {/* FAQs Schema for New Bikes */}
      <Script
        id="new-bikes-faqs-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Which are the most popular new motorcycles available in Australia in 2024?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Popular new motorcycles in Australia include Honda CBR650R, Yamaha MT-07, Kawasaki Ninja 400, BMW R 1250 GS, and Royal Enfield Meteor 350. These models are known for their performance, reliability, and value for money."
                }
              },
              {
                "@type": "Question",
                "name": "What are the most popular motorcycle brands in Australia?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Popular motorcycle brands in Australia include Honda, Yamaha, Kawasaki, Suzuki, Harley-Davidson, BMW, Ducati, KTM, and Royal Enfield. These brands offer a wide range of bikes suitable for different riding styles and preferences."
                }
              },
              {
                "@type": "Question",
                "name": "What types of motorcycles are available for beginners?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "For beginners, models like the Honda CB300R, Yamaha MT-03, Kawasaki Ninja 400, KTM 390 Duke, and Royal Enfield Classic 350 are excellent choices. These bikes offer manageable power, lighter weight, and user-friendly features ideal for those starting their motorcycling journey."
                }
              },
              {
                "@type": "Question",
                "name": "Are there any upcoming electric motorcycles in Australia?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Australia's electric motorcycle market is growing, with new models available or coming soon from manufacturers like Harley-Davidson (LiveWire), Zero Motorcycles, Energica, Super Soco, and NIU. These electric motorcycles offer zero emissions, lower running costs, and innovative technology."
                }
              }
            ]
          })
        }}
      />
      
      {/* Motorcycle Category Schema */}
      <Script
        id="motorcycle-categories-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Motorcycle Categories",
            "description": "Different types of motorcycles available at AussieMotor",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "item": {
                  "@type": "Product",
                  "name": "Sport Bikes",
                  "description": "Performance-oriented motorcycles designed for speed and agility",
                  "url": "https://www.aussiemotor.com/new-bikes/category/sport/"
                }
              },
              {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@type": "Product",
                  "name": "Cruisers",
                  "description": "Comfortable motorcycles designed for relaxed riding on highways",
                  "url": "https://www.aussiemotor.com/new-bikes/category/cruiser/"
                }
              },
              {
                "@type": "ListItem",
                "position": 3,
                "item": {
                  "@type": "Product",
                  "name": "Adventure Bikes",
                  "description": "Versatile motorcycles designed for both on-road and off-road use",
                  "url": "https://www.aussiemotor.com/new-bikes/category/adventure/"
                }
              },
              {
                "@type": "ListItem",
                "position": 4,
                "item": {
                  "@type": "Product",
                  "name": "Touring Bikes",
                  "description": "Motorcycles designed for long-distance comfort with storage options",
                  "url": "https://www.aussiemotor.com/new-bikes/category/touring/"
                }
              },
              {
                "@type": "ListItem",
                "position": 5,
                "item": {
                  "@type": "Product",
                  "name": "Naked Bikes",
                  "description": "Stripped-down motorcycles with minimal fairings for urban riding",
                  "url": "https://www.aussiemotor.com/new-bikes/category/naked/"
                }
              }
            ]
          })
        }}
      />
      
      {children}
    </>
  );
}
  