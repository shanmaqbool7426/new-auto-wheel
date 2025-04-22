import Script from 'next/script';
import { fetchVehicleBySlug } from '@/services/new-vehicles';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

export async function generateMetadata({ params, searchParams }) {
  const slugMake = params?.slugMake || [""];
  
  try {
    // Different metadata based on the slug depth (make, model, or variant)
    if (slugMake.length === 1) {
      // Make level (e.g., Ford)
      const make = slugMake[0].replace(/-/g, ' ');
      return {
        title: `${make} Trucks for Sale in Australia - aussiemotor`,
        description: `Browse new ${make} trucks for sale in Australia. View latest models, prices, specifications and features of ${make} commercial vehicles at aussiemotor.`,
        keywords: `${make} trucks, new ${make}, ${make} models, ${make} prices, ${make} specifications, commercial vehicles`,
        icons: {
          icon: 'https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png',
          apple: 'https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png',
        },
        openGraph: {
          title: `${make} Trucks for Sale in Australia - aussiemotor`,
          description: `Browse new ${make} trucks for sale in Australia. View latest models, prices, specifications and features of ${make} commercial vehicles at aussiemotor.`,
          url: `https://www.aussiemotor.com/new-trucks/${slugMake[0]}/`,
          siteName: "aussiemotor",
          locale: "en_AU",
          type: "website",
        }
      };
    } else if (slugMake.length === 2 || slugMake.length === 3) {
      const make = slugMake[0].replace(/-/g, ' ');
      const model = slugMake[1].replace(/-/g, ' ');
      let variant = slugMake.length === 3 ? slugMake[2].replace(/-/g, ' ') : '';
      if (!variant && searchParams?.variant) {
        const variantParam = searchParams.variant;
        variant = typeof variantParam === 'string' ? variantParam.replace(/-/g, ' ') : '';
      }

      // For model or variant level pages, try to fetch actual vehicle data
      if (variant) {
        // Try to get actual vehicle data for more specific metadata
        const queryParams = new URLSearchParams();
        queryParams.append('make', make);
        queryParams.append('model', model);
        queryParams.append('variant', variant);
        const variantsEndpoint = `${API_ENDPOINTS.NEW_VEHICLE.VARIENTS}?${queryParams.toString()}`;
        const variantsVehicles = await fetchVehicleBySlug(variantsEndpoint);
        const vehicleDetails = variantsVehicles?.data?.referenceVehicle;

        if (vehicleDetails) {
          const price = vehicleDetails.price ? `$${vehicleDetails.price.toLocaleString()}` : "Contact for price";
          return {
            title: `${make} ${model} ${variant} - New Truck Specifications & Pricing - aussiemotor`,
            description: `${make} ${model} ${variant} specifications, features, and pricing. ${vehicleDetails.engineCapacity ? `${vehicleDetails.engineCapacity}cc engine, ` : ''}${vehicleDetails.transmission || ''} transmission. Find this new commercial vehicle at aussiemotor.`,
            keywords: `${make} ${model}, ${variant}, new truck, ${make} specifications, ${model} price, ${make} ${model} features, commercial vehicle`,
            icons: {
              icon: 'https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png',
              apple: 'https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png',
            },
            openGraph: {
              title: `${make} ${model} ${variant} - New Truck Specifications & Pricing - aussiemotor`,
              description: `${make} ${model} ${variant} specifications, features, and pricing. ${price}. Find this new commercial vehicle at aussiemotor.`,
              url: variant ? `https://www.aussiemotor.com/new-trucks/${slugMake[0]}/${slugMake[1]}/${slugMake[2] || ''}` : `https://www.aussiemotor.com/new-trucks/${slugMake[0]}/${slugMake[1]}/`,
              siteName: "aussiemotor",
              locale: "en_AU",
              type: "website",
              images: vehicleDetails.images && vehicleDetails.images.length > 0 ? [
                {
                  url: vehicleDetails.images[0],
                  width: 800,
                  height: 600,
                  alt: `${make} ${model} ${variant}`,
                }
              ] : [],
            }
          };
        }
      }

      // Fallback for model level (e.g., Ford Ranger)
      return {
        title: `${make} ${model}${variant ? ` ${variant}` : ''} - New Truck Details - aussiemotor`,
        description: `Explore the new ${make} ${model}${variant ? ` ${variant}` : ''} in Australia. View specifications, features, and pricing for this ${make} commercial vehicle at aussiemotor.`,
        keywords: `${make} ${model}, ${variant ? variant + ', ' : ''}new truck, ${make} specifications, ${model} price, ${make} ${model} features, commercial vehicle`,
        icons: {
          icon: 'https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png',
          apple: 'https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png',
        },
        openGraph: {
          title: `${make} ${model}${variant ? ` ${variant}` : ''} - New Truck Details - aussiemotor`,
          description: `Explore the new ${make} ${model}${variant ? ` ${variant}` : ''} in Australia. View specifications, features, and pricing for this ${make} commercial vehicle at aussiemotor.`,
          url: variant ? `https://www.aussiemotor.com/new-trucks/${slugMake[0]}/${slugMake[1]}/${slugMake[2] || ''}` : `https://www.aussiemotor.com/new-trucks/${slugMake[0]}/${slugMake[1]}/`,
          siteName: "aussiemotor",
          locale: "en_AU",
          type: "website",
        }
      };
    }

    // Default fallback
    return {
      title: "New Trucks - aussiemotor",
      description: "Explore new trucks and commercial vehicles for sale in Australia. Browse latest models, specs, features and prices at aussiemotor.",
      icons: {
        icon: 'https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png',
        apple: 'https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png',
      },
    };
  } catch (error) {
    return {
      title: "New Trucks - aussiemotor",
      description: "Explore new trucks and commercial vehicles for sale in Australia. Browse latest models, specs, features and prices at aussiemotor.",
      icons: {
        icon: 'https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png',
        apple: 'https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png',
      },
    };
  }
}

export default function SlugMakeLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
} 