import Script from 'next/script';

export const metadata = {
  title: "Find New Trucks & Commercial Vehicles in Australia | Compare Specs & Prices | AussieMotor",
  description: "Explore new trucks, utes and commercial vehicles in Australia. Browse latest models, specifications, features, and prices. Find the perfect new truck for your business or personal use from Toyota, Ford, Isuzu and more at AussieMotor - Australia's leading commercial vehicle marketplace.",
  keywords: "new trucks, new commercial vehicles, new utes, buy new truck, truck dealerships, Toyota HiLux, Ford Ranger, Isuzu D-Max, Mitsubishi Triton, Nissan Navara, heavy-duty trucks, light trucks, 4x4 trucks, work trucks, truck pricing, Australia new trucks, business vehicles, truck comparison, truck finance",
  openGraph: {
    title: "Find New Trucks & Commercial Vehicles in Australia | Compare Specs & Prices | AussieMotor",
    description: "Explore the latest trucks and commercial vehicles in Australia with detailed specifications, features and prices. Find and compare new trucks from Toyota, Ford, Isuzu and more at AussieMotor - Australia's premier commercial vehicle marketplace.",
    url: "https://www.aussiemotor.com/new-trucks/",
    siteName: "AussieMotor",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
        width: 1200,
        height: 630,
        alt: "New Trucks in Australia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Find New Trucks & Commercial Vehicles in Australia | Compare Specs & Prices | AussieMotor",
    description: "Explore the latest trucks and commercial vehicles in Australia with detailed specifications, features and prices. Find your perfect business vehicle at AussieMotor - Australia's premier commercial vehicle marketplace.",
    images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
  },
  alternates: {
    canonical: "https://www.aussiemotor.com/new-trucks/",
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      {/* BreadcrumbList Schema.org structured data */}
      <Script
        id="new-trucks-breadcrumb-data"
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
                "name": "New Trucks",
                "item": "https://www.aussiemotor.com/new-trucks/"
              }
            ]
          })
        }}
      />
      
      {/* ItemList Schema.org structured data for popular truck listings */}
      <Script
        id="new-trucks-list-data"
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
                  "@type": "Vehicle",
                  "name": "Toyota HiLux",
                  "description": "New Toyota HiLux utes in Australia - legendary reliability and powerful performance for work and play",
                  "url": "https://www.aussiemotor.com/new-trucks/toyota/hilux/",
                  "brand": {
                    "@type": "Brand",
                    "name": "Toyota"
                  },
                  "manufacturer": {
                    "@type": "Organization",
                    "name": "Toyota Motor Corporation"
                  },
                  "vehicleConfiguration": "Dual Cab Ute",
                  "driveWheelConfiguration": "4WD",
                  "fuelType": "Diesel"
                }
              },
              {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@type": "Vehicle",
                  "name": "Ford Ranger",
                  "description": "New Ford Ranger utes in Australia - advanced technology and premium comfort in a rugged package",
                  "url": "https://www.aussiemotor.com/new-trucks/ford/ranger/",
                  "brand": {
                    "@type": "Brand",
                    "name": "Ford"
                  },
                  "manufacturer": {
                    "@type": "Organization",
                    "name": "Ford Motor Company"
                  },
                  "vehicleConfiguration": "Dual Cab Ute",
                  "driveWheelConfiguration": "4WD",
                  "fuelType": "Diesel"
                }
              },
              {
                "@type": "ListItem",
                "position": 3,
                "item": {
                  "@type": "Vehicle",
                  "name": "Isuzu D-Max",
                  "description": "New Isuzu D-Max utes in Australia - dependable workhorse with modern safety features",
                  "url": "https://www.aussiemotor.com/new-trucks/isuzu/d-max/",
                  "brand": {
                    "@type": "Brand",
                    "name": "Isuzu"
                  },
                  "manufacturer": {
                    "@type": "Organization",
                    "name": "Isuzu Motors Ltd."
                  },
                  "vehicleConfiguration": "Dual Cab Ute",
                  "driveWheelConfiguration": "4WD",
                  "fuelType": "Diesel"
                }
              },
              {
                "@type": "ListItem",
                "position": 4,
                "item": {
                  "@type": "Vehicle",
                  "name": "Mitsubishi Triton",
                  "description": "New Mitsubishi Triton utes in Australia - value-packed with excellent capability",
                  "url": "https://www.aussiemotor.com/new-trucks/mitsubishi/triton/",
                  "brand": {
                    "@type": "Brand",
                    "name": "Mitsubishi"
                  },
                  "manufacturer": {
                    "@type": "Organization",
                    "name": "Mitsubishi Motors Corporation"
                  },
                  "vehicleConfiguration": "Dual Cab Ute",
                  "driveWheelConfiguration": "4WD",
                  "fuelType": "Diesel"
                }
              },
              {
                "@type": "ListItem",
                "position": 5,
                "item": {
                  "@type": "Vehicle",
                  "name": "Hino 300 Series",
                  "description": "New Hino 300 Series trucks in Australia - compact light-duty trucks for urban delivery and logistics",
                  "url": "https://www.aussiemotor.com/new-trucks/hino/300-series/",
                  "brand": {
                    "@type": "Brand",
                    "name": "Hino"
                  },
                  "manufacturer": {
                    "@type": "Organization",
                    "name": "Hino Motors, Ltd."
                  },
                  "vehicleConfiguration": "Light Duty Truck",
                  "driveWheelConfiguration": "RWD",
                  "fuelType": "Diesel"
                }
              }
            ]
          })
        }}
      />
      
      {/* FAQs Schema for New Trucks */}
      <Script
        id="new-trucks-faqs-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Which are the most popular new trucks and utes in Australia in 2024?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Popular new trucks and utes in Australia include Toyota HiLux, Ford Ranger, Isuzu D-Max, Mitsubishi Triton, and Mazda BT-50. These models are known for their reliability, capability, and features suited to both work and recreational use."
                }
              },
              {
                "@type": "Question",
                "name": "What are the most popular commercial vehicle brands in Australia?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Popular commercial vehicle brands in Australia include Toyota, Ford, Isuzu, Mitsubishi, Mazda, Nissan, Hino, Mercedes-Benz, and Volkswagen. These manufacturers offer a range of utes, vans, and trucks to suit different business needs."
                }
              },
              {
                "@type": "Question",
                "name": "What's the difference between 4x2 and 4x4 trucks?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "4x2 trucks have two-wheel drive (typically rear-wheel drive), making them suitable for regular road use and light off-road duties. 4x4 trucks have four-wheel drive capability, providing better traction on difficult terrain. 4x4 trucks are more versatile for off-road work but generally cost more and consume more fuel than 4x2 models."
                }
              },
              {
                "@type": "Question",
                "name": "Are there any electric or hybrid trucks available in Australia?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Australia's electric and hybrid truck market is developing, with options like the SEA Electric range, Fuso eCanter, and Volvo FL Electric now available. Several manufacturers including Ford, Rivian, and Tesla have announced plans to introduce electric utes and trucks to the Australian market in the coming years."
                }
              }
            ]
          })
        }}
      />
      
      {/* Truck Category Schema */}
      <Script
        id="truck-categories-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Truck Categories",
            "description": "Different types of trucks and commercial vehicles available at AussieMotor",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "item": {
                  "@type": "Product",
                  "name": "Dual Cab Utes",
                  "description": "Versatile vehicles with seating for 5 and an open cargo bed",
                  "url": "https://www.aussiemotor.com/new-trucks/category/dual-cab-utes/"
                }
              },
              {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@type": "Product",
                  "name": "Single Cab Utes",
                  "description": "Work-focused vehicles with maximum tray space",
                  "url": "https://www.aussiemotor.com/new-trucks/category/single-cab-utes/"
                }
              },
              {
                "@type": "ListItem",
                "position": 3,
                "item": {
                  "@type": "Product",
                  "name": "Light Commercial Vans",
                  "description": "Enclosed cargo vehicles ideal for deliveries and trades",
                  "url": "https://www.aussiemotor.com/new-trucks/category/vans/"
                }
              },
              {
                "@type": "ListItem",
                "position": 4,
                "item": {
                  "@type": "Product",
                  "name": "Light Duty Trucks",
                  "description": "Trucks with GVM of 3.5-7.5 tonnes for urban logistics",
                  "url": "https://www.aussiemotor.com/new-trucks/category/light-duty/"
                }
              },
              {
                "@type": "ListItem",
                "position": 5,
                "item": {
                  "@type": "Product",
                  "name": "Heavy Duty Trucks",
                  "description": "Trucks with GVM over 7.5 tonnes for heavy haulage",
                  "url": "https://www.aussiemotor.com/new-trucks/category/heavy-duty/"
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
  