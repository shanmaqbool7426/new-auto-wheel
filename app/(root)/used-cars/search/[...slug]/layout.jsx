import Script from 'next/script';
import { fetchVehicleBySlug } from '@/services/new-vehicles';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

export async function generateMetadata({ params }) {
  // Extract parameters from the URL path
  const slugSegments = params?.slug || [];
  const path = slugSegments.join('/');
  
  // Parse search parameters from URL path (format: mk_toyota/md_corolla/vr_gli-vvti/ct_karachi/ca_dha-defence--4/)
  // Initialize variables to store extracted info
  let make = '';
  let model = '';
  let variant = '';
  let city = '';
  let area = '';
  let year = '';
  let price = '';
  let bodyType = '';
  let transmission = '';
  let fuelType = '';
  
  // Loop through path segments to extract parameters
  slugSegments.forEach(segment => {
    // Check for make
    if (segment.startsWith('mk_')) {
      make = segment.replace('mk_', '').replace(/-/g, ' ');
    }
    // Check for model
    else if (segment.startsWith('md_')) {
      model = segment.replace('md_', '').replace(/-/g, ' ');
    }
    // Check for variant
    else if (segment.startsWith('vr_')) {
      variant = segment.replace('vr_', '').replace(/-/g, ' ');
    }
    // Check for city
    else if (segment.startsWith('ct_')) {
      city = segment.replace('ct_', '').replace(/-/g, ' ');
    }
    // Check for area/location
    else if (segment.startsWith('ca_')) {
      area = segment.replace('ca_', '').replace(/--\d+$/, '').replace(/-/g, ' ');
    }
    // Check for year
    else if (segment.startsWith('yr_')) {
      year = segment.replace('yr_', '').replace(/-/g, ' ');
    }
    // Check for price range
    else if (segment.startsWith('pr_')) {
      price = segment.replace('pr_', '').replace(/-/g, ' to ');
    }
    // Check for body type
    else if (segment.startsWith('bt_')) {
      bodyType = segment.replace('bt_', '').replace(/-/g, ' ');
    }
    // Check for transmission
    else if (segment.startsWith('tr_')) {
      transmission = segment.replace('tr_', '').replace(/-/g, ' ');
    }
    // Check for fuel type
    else if (segment.startsWith('ft_')) {
      fuelType = segment.replace('ft_', '').replace(/-/g, ' ');
    }
  });
  
  // Capitalize first letter of each word
  const capitalize = (str) => {
    if (!str) return '';
    return str.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  make = capitalize(make);
  model = capitalize(model);
  variant = capitalize(variant);
  city = capitalize(city);
  area = capitalize(area);
  bodyType = capitalize(bodyType);
  transmission = capitalize(transmission);
  fuelType = capitalize(fuelType);
  
  // Construct title and description based on available parameters
  let title = 'Used Cars for Sale';
  let description = 'Find used cars for sale in Australia at aussiemotor.';
  
  // Try to fetch detailed vehicle data if we have enough information
  let vehicleData = null;
  try {
    if (make && model && variant) {
      // Try to get actual vehicle data for more specific metadata
      const queryParams = new URLSearchParams();
      if (make) queryParams.append('make', make.toLowerCase());
      if (model) queryParams.append('model', model.toLowerCase());
      if (variant) queryParams.append('variant', variant.toLowerCase());
      
      const variantsEndpoint = `${API_ENDPOINTS.NEW_VEHICLE.VARIENTS}?${queryParams.toString()}`;
      const variantsVehicles = await fetchVehicleBySlug(variantsEndpoint);
      vehicleData = variantsVehicles?.data?.referenceVehicle;
    }
  } catch (error) {
    console.error('Error fetching vehicle data for SEO:', error);
  }
  
  // Build title based on available parameters with priority for most specific first
  if (make && model && variant && city && area) {
    title = `Used ${make} ${model} ${variant} for sale in ${area}, ${city} | aussiemotor`;
    description = `Browse used ${make} ${model} ${variant} cars for sale in ${area}, ${city}. Find the best deals on second-hand ${make} ${model} with verified listings at aussiemotor.`;
    
    if (year) {
      title = `${year} ${make} ${model} ${variant} for sale in ${area}, ${city} | aussiemotor`;
      description = `Browse ${year} ${make} ${model} ${variant} cars for sale in ${area}, ${city}. Find the best deals on second-hand ${make} ${model} with verified listings at aussiemotor.`;
    }
  }
  else if (make && model && variant) {
    // Use vehicle data if available
    if (vehicleData) {
      const vehiclePrice = vehicleData.price ? `$${vehicleData.price.toLocaleString()}` : "best price";
      const engineInfo = vehicleData.engineCapacity ? `${vehicleData.engineCapacity}cc ` : '';
      const transmissionInfo = vehicleData.transmission ? `${vehicleData.transmission} ` : '';
      
      title = `Used ${make} ${model} ${variant} for sale | aussiemotor`;
      description = `Browse used ${make} ${model} ${variant} cars for sale in Australia. ${engineInfo}${transmissionInfo}engine. Find great deals from ${vehiclePrice} with verified listings at aussiemotor.`;
    } else {
      title = `Used ${make} ${model} ${variant} for sale | aussiemotor`;
      description = `Browse used ${make} ${model} ${variant} cars for sale in Australia. Find great deals on second-hand ${make} ${model} with verified listings at aussiemotor.`;
    }
    
    if (year) {
      title = `${year} ${make} ${model} ${variant} for sale | aussiemotor`;
    }
  }
  else if (make && model) {
    title = `Used ${make} ${model} for sale | aussiemotor`;
    description = `Browse used ${make} ${model} cars for sale in Australia. Compare prices, features and find the perfect used ${make} ${model} at aussiemotor.`;
    
    if (year) {
      title = `${year} ${make} ${model} for sale | aussiemotor`;
    }
  }
  else if (make) {
    title = `Used ${make} cars for sale | aussiemotor`;
    description = `Browse used ${make} cars for sale in Australia. Find great deals on second-hand ${make} vehicles at aussiemotor - Australia's trusted auto marketplace.`;
    
    if (bodyType) {
      title = `Used ${make} ${bodyType} for sale | aussiemotor`;
      description = `Browse used ${make} ${bodyType} for sale in Australia. Find the best second-hand ${make} ${bodyType} vehicles at aussiemotor.`;
    }
  }
  
  // Add location info to title if available but make/model isn't
  if (city && !make) {
    title = `Used Cars for sale in ${city} | aussiemotor`;
    description = `Find used cars for sale in ${city}, Australia. Browse thousands of second-hand vehicles with great deals at aussiemotor.`;
    
    if (area) {
      title = `Used Cars for sale in ${area}, ${city} | aussiemotor`;
      description = `Find used cars for sale in ${area}, ${city}. Browse local second-hand vehicles with verified listings at aussiemotor.`;
    }
    
    if (bodyType) {
      title = `Used ${bodyType} for sale in ${city} | aussiemotor`;
      if (area) {
        title = `Used ${bodyType} for sale in ${area}, ${city} | aussiemotor`;
      }
    }
  }
  
  // Add transmission, fuel type and other filters to title if available
  if (transmission && make && model) {
    title = `Used ${make} ${model} ${transmission} for sale | aussiemotor`;
    if (city) {
      title = `Used ${make} ${model} ${transmission} for sale in ${city} | aussiemotor`;
    }
  }
  
  if (fuelType && make) {
    if (!model) {
      title = `Used ${make} ${fuelType} cars for sale | aussiemotor`;
    }
  }
  
  // Add price range to description if available
  if (price && description) {
    description = description.replace('. Find', `. Price range: ${price}. Find`);
  }
  
  // Generate image URL if we have vehicle data
  let imageUrl = null;
  if (vehicleData?.images && vehicleData.images.length > 0) {
    imageUrl = vehicleData.images[0];
  }
  
  return {
    title,
    description,
    keywords: `used ${make || 'cars'}, ${model || ''}, ${variant || ''}, ${city || 'Australia'}, ${year || ''}, ${bodyType || ''}, ${transmission || ''}, ${fuelType || ''}, used cars for sale, second hand cars, ${area || ''}`.trim().replace(/\s+/g, ' '),
    openGraph: {
      title,
      description,
      url: `https://www.aussiemotor.com/used-cars/search/${path}`,
      siteName: "aussiemotor",
      locale: "en_AU",
      type: "website",
      images: imageUrl ? [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: title.replace(' | aussiemotor', ''),
        }
      ] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
    alternates: {
      canonical: `https://www.aussiemotor.com/used-cars/search/${path}`,
    },
  };
}

export default function SearchLayout({ children }) {
  return (
    <>
      <Script
        id="vehicle-search-structured-data"
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
                  "@type": "Product",
                  "name": "Used Cars Search Results",
                  "description": "Browse used cars that match your search criteria",
                  "url": `https://www.aussiemotor.com/used-cars/search/`,
                  "category": "Automotive > Used Vehicles",
                  "offers": {
                    "@type": "AggregateOffer",
                    "priceCurrency": "AUD",
                    "availability": "https://schema.org/InStock"
                  }
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