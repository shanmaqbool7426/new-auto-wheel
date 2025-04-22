import { fetchVehiclDetail } from "@/services/vehicles";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import Script from 'next/script';

export async function generateMetadata({ params }) {
  // Get the slug from params (e.g., "toyota" or "toyota-corolla")
  const slug = params?.slug || '';
  
  // Check if it's a make-model combination or just make
  const slugParts = slug.split('-');
  
  // Format strings for display - capitalize first letter of each word
  const formatSlug = (text) => {
    return text
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  let make = '';
  let model = '';
  let title = '';
  let description = '';
  
  // Determine if this is a make page or a make-model page
  if (slugParts.length === 1) {
    // This is a make page (e.g., "toyota")
    make = formatSlug(slug);
    title = `Used ${make} Cars for Sale in Australia | aussiemotor`;
    description = `Browse used ${make} cars for sale in Australia. Find great deals on second-hand ${make} vehicles with prices, photos and specifications at aussiemotor.`;
  } else {
    // This is a make-model page (e.g., "toyota-corolla")
    // Assume first part is make, rest is model
    make = formatSlug(slugParts[0]);
    model = formatSlug(slugParts.slice(1).join(' '));
    title = `Used ${make} ${model} for Sale in Australia | aussiemotor`;
    description = `Browse used ${make} ${model} cars for sale in Australia. Find the best prices on second-hand ${make} ${model} with verified listings at aussiemotor.`;
  }
  
  return {
    title,
    description,
    keywords: `used ${make}, ${model}, used cars, second hand cars, used ${make} ${model}, buy used car, sell used car, australia`,
    openGraph: {
      title,
      description,
      url: `https://www.aussiemotor.com/used-cars/${slug}/`,
      siteName: "aussiemotor",
      locale: "en_AU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://www.aussiemotor.com/used-cars/${slug}/`,
    },
  };
}

export default function MakeModelLayout({ children, params }) {
  const slug = params?.slug || '';
  
  return (
    <>
      {/* Schema.org structured data for car make/model */}
      <Script
        id="car-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Vehicle",
            "category": "Used Car",
            "url": `https://www.aussiemotor.com/used-cars/${slug}`,
          })
        }}
      />
      
      {children}
    </>
  );
}
