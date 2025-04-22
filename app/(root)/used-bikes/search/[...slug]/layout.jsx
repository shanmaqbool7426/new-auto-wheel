import Script from 'next/script';
import { fetchVehicleBySlug } from '@/services/new-vehicles';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

export async function generateMetadata({ params, searchParams }) {
  // Extract parameters from the URL path
  const slugSegments = params?.slug || [];
  const path = slugSegments.join('/');
  
  // Parse search parameters from URL path (format: mk_yamaha/md_r15/vr_v3/ct_sydney/ca_parramatta/)
  // Initialize variables to store extracted info
  let make = '';
  let model = '';
  let variant = '';
  let city = '';
  let area = '';
  let year = '';
  let price = '';
  let engineSize = '';
  let transmission = '';
  let bikeType = '';
  
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
    // Check for engine size
    else if (segment.startsWith('es_')) {
      engineSize = segment.replace('es_', '').replace(/-/g, ' ');
    }
    // Check for transmission
    else if (segment.startsWith('tr_')) {
      transmission = segment.replace('tr_', '').replace(/-/g, ' ');
    }
    // Check for bike type
    else if (segment.startsWith('bt_')) {
      bikeType = segment.replace('bt_', '').replace(/-/g, ' ');
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
  bikeType = capitalize(bikeType);
  transmission = capitalize(transmission);
  
  // Format engine size with cc if it's a number
  if (engineSize && !isNaN(engineSize)) {
    engineSize = `${engineSize}cc`;
  } else {
    engineSize = capitalize(engineSize);
  }
  
  // Construct title and description based on available parameters
  let title = 'Used Bikes for Sale';
  let description = 'Find used motorcycles for sale in Australia at aussiemotor.';
  
  // Try to fetch detailed vehicle data if we have enough information
  let bikeData = null;
  try {
    if (make && model && variant) {
      // Try to get actual bike data for more specific metadata
      const queryParams = new URLSearchParams();
      if (make) queryParams.append('make', make.toLowerCase());
      if (model) queryParams.append('model', model.toLowerCase());
      if (variant) queryParams.append('variant', variant.toLowerCase());
      
      const variantsEndpoint = `${API_ENDPOINTS.NEW_VEHICLE.VARIENTS}?${queryParams.toString()}`;
      const variantsVehicles = await fetchVehicleBySlug(variantsEndpoint);
      bikeData = variantsVehicles?.data?.referenceVehicle;
    }
  } catch (error) {
    console.error('Error fetching bike data for SEO:', error);
  }
  
  // Build title based on available parameters with priority for most specific first
  if (make && model && variant && city && area) {
    title = `Used ${make} ${model} ${variant} for sale in ${area}, ${city} | aussiemotor`;
    description = `Browse used ${make} ${model} ${variant} motorcycles for sale in ${area}, ${city}. Find the best deals on second-hand ${make} ${model} bikes with verified listings at aussiemotor.`;
    
    if (year) {
      title = `${year} ${make} ${model} ${variant} for sale in ${area}, ${city} | aussiemotor`;
      description = `Browse ${year} ${make} ${model} ${variant} motorcycles for sale in ${area}, ${city}. Find the best deals on second-hand ${make} ${model} bikes with verified listings at aussiemotor.`;
    }
  }
  else if (make && model && variant) {
    // Use bike data if available
    if (bikeData) {
      const bikePrice = bikeData.price ? `$${bikeData.price.toLocaleString()}` : "best price";
      const engineInfo = bikeData.engineCapacity ? `${bikeData.engineCapacity}cc ` : '';
      
      title = `Used ${make} ${model} ${variant} for sale | aussiemotor`;
      description = `Browse used ${make} ${model} ${variant} motorcycles for sale in Australia. ${engineInfo}engine. Find great deals from ${bikePrice} with verified listings at aussiemotor.`;
    } else {
      title = `Used ${make} ${model} ${variant} for sale | aussiemotor`;
      description = `Browse used ${make} ${model} ${variant} motorcycles for sale in Australia. Find great deals on second-hand ${make} ${model} bikes with verified listings at aussiemotor.`;
    }
    
    if (year) {
      title = `${year} ${make} ${model} ${variant} for sale | aussiemotor`;
    }
  }
  else if (make && model) {
    title = `Used ${make} ${model} for sale | aussiemotor`;
    description = `Browse used ${make} ${model} motorcycles for sale in Australia. Compare prices, features and find the perfect used ${make} ${model} at aussiemotor.`;
    
    if (year) {
      title = `${year} ${make} ${model} for sale | aussiemotor`;
    }
    
    if (engineSize) {
      title = `Used ${make} ${model} ${engineSize} for sale | aussiemotor`;
    }
  }
  else if (make) {
    title = `Used ${make} motorcycles for sale | aussiemotor`;
    description = `Browse used ${make} motorcycles for sale in Australia. Find great deals on second-hand ${make} bikes at aussiemotor - Australia's trusted motorcycle marketplace.`;
    
    if (bikeType) {
      title = `Used ${make} ${bikeType} for sale | aussiemotor`;
      description = `Browse used ${make} ${bikeType} motorcycles for sale in Australia. Find the best second-hand ${make} ${bikeType} bikes at aussiemotor.`;
    }
    
    if (engineSize) {
      title = `Used ${make} ${engineSize} motorcycles for sale | aussiemotor`;
      description = `Browse used ${make} ${engineSize} motorcycles for sale in Australia. Find great deals on second-hand ${make} bikes at aussiemotor.`;
    }
  }
  
  // Add location info to title if available but make/model isn't
  if (city && !make) {
    title = `Used Motorcycles for sale in ${city} | aussiemotor`;
    description = `Find used motorcycles for sale in ${city}, Australia. Browse thousands of second-hand bikes with great deals at aussiemotor.`;
    
    if (area) {
      title = `Used Motorcycles for sale in ${area}, ${city} | aussiemotor`;
      description = `Find used motorcycles for sale in ${area}, ${city}. Browse local second-hand bikes with verified listings at aussiemotor.`;
    }
    
    if (bikeType) {
      title = `Used ${bikeType} motorcycles for sale in ${city} | aussiemotor`;
      if (area) {
        title = `Used ${bikeType} motorcycles for sale in ${area}, ${city} | aussiemotor`;
      }
    }
  }
  
  // Add engine size to title if available
  if (engineSize && !title.includes(engineSize)) {
    if (make && model) {
      title = `Used ${make} ${model} ${engineSize} for sale | aussiemotor`;
    } else if (make) {
      title = `Used ${make} ${engineSize} motorcycles for sale | aussiemotor`;
    } else {
      title = `Used ${engineSize} motorcycles for sale | aussiemotor`;
    }
    
    if (city) {
      title = title.replace(' | aussiemotor', ` in ${city} | aussiemotor`);
    }
  }
  
  // Add price range to description if available
  if (price && description) {
    description = description.replace('. Find', `. Price range: ${price}. Find`);
  }
  
  // Generate image URL if we have bike data
  let imageUrl = null;
  if (bikeData?.images && bikeData.images.length > 0) {
    imageUrl = bikeData.images[0];
  }
  
  return {
    title,
    description,
    keywords: `used ${make || 'motorcycles'}, ${model || ''}, ${variant || ''}, ${city || 'Australia'}, ${year || ''}, ${bikeType || ''}, ${engineSize || ''}, ${transmission || ''}, used bikes for sale, second hand motorcycles, ${area || ''}`.trim().replace(/\s+/g, ' '),
    openGraph: {
      title,
      description,
      url: `https://www.aussiemotor.com/used-bikes/search/${path}`,
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
      canonical: `https://www.aussiemotor.com/used-bikes/search/${path}`,
    },
  };
}

export default function SearchLayout({ children }) {
  return (
    <>
      <Script
        id="motorcycle-search-structured-data"
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
                  "name": "Used Motorcycles Search Results",
                  "description": "Browse used motorcycles that match your search criteria",
                  "url": `https://www.aussiemotor.com/used-bikes/search/`,
                  "category": "Automotive > Used Vehicles > Motorcycles",
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
