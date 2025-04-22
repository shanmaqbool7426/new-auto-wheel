import Script from 'next/script';
import { fetchVehicleBySlug } from '@/services/new-vehicles';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

export async function generateMetadata({ params }) {
  const slugMake = params?.slugMake || [""];
  
  try {
    // Create basic metadata based on slugs
    const make = slugMake[0]?.replace(/-/g, ' ') || '';
    const model = slugMake[1]?.replace(/-/g, ' ') || '';
    const variant = slugMake[2]?.replace(/-/g, ' ') || '';
    
    let title = "New Cars - aussiemotor";
    let description = "Explore new cars for sale in Australia. Browse latest models, specs, features and prices at aussiemotor.";
    let url = "https://www.aussiemotor.com/new-cars/";

    if (make) {
      title = `${make} Cars - aussiemotor`;
      description = `Browse new ${make} cars for sale in Australia at aussiemotor.`;
      url = `https://www.aussiemotor.com/new-cars/${slugMake[0]}/`;
      
      if (model) {
        title = `${make} ${model} - aussiemotor`;
        description = `Explore the new ${make} ${model} in Australia at aussiemotor.`;
        url = `https://www.aussiemotor.com/new-cars/${slugMake[0]}/${slugMake[1]}/`;
        
        if (variant) {
          title = `${make} ${model} ${variant} - aussiemotor`;
          description = `Detailed information about the ${make} ${model} ${variant} in Australia at aussiemotor.`;
          url = `https://www.aussiemotor.com/new-cars/${slugMake[0]}/${slugMake[1]}/${slugMake[2]}/`;
        }
      }
    }

    return {
      title,
      description,
      keywords: `${make} ${model} ${variant}`.trim() + ", car, cars, australia",
      icons: {
        icon: 'https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png',
        apple: 'https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png',
      },
      openGraph: {
        title,
        description,
        url,
        siteName: "aussiemotor",
        locale: "en_AU",
        type: "website",
      }
    };
  } catch (error) {
    // Fallback metadata
    return {
      title: "New Cars - aussiemotor",
      description: "Explore new cars for sale in Australia. Browse latest models, specs, features and prices at aussiemotor.",
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