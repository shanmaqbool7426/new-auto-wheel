import { fetchVehiclDetail } from "@/services/vehicles";
import { API_ENDPOINTS } from "@/constants/api-endpoints";

export async function generateMetadata({ params }) {
  const slug = params?.slug ?? "#";
  
  try {
    // Fetch vehicle details for dynamic metadata
    const vehicleData = await fetchVehiclDetail(
      API_ENDPOINTS.VEHICLE.DETAIL(slug)
    );
    
    const vehicle = vehicleData?.data;
    
    if (!vehicle) {
      return {
        title: "aussiemotor | Truck Not Found",
        description: "The requested truck listing could not be found.",
        icons: {
          icon: 'https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png',
          apple: 'https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png',
        }
      };
    }
    
    // Create SEO-friendly title and description
    const year = vehicle.year || "";
    const make = vehicle.make || "";
    const model = vehicle.model || "";
    const variant = vehicle.variant || "";
    const city = vehicle.city || "";
    const price = vehicle.price ? `PKR ${vehicle.price.toLocaleString()}` : "";
    
    return {
      title: `${year} ${make} ${model} ${variant} Truck for Sale in ${city} - aussiemotor`,
      description: `Buy ${year} ${make} ${model} ${variant} truck ${vehicle.mileage ? `with ${vehicle.mileage.toLocaleString()} km mileage` : ""} for ${price}. ${vehicle.engineCapacity ? `${vehicle.engineCapacity} cc, ` : ""}${vehicle.transmission || ""}, ${vehicle.fuelType || ""}. Find more used trucks on aussiemotor.`,
      icons: {
        icon: 'https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png',
        apple: 'https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png',
      },
      openGraph: {
        title: `${year} ${make} ${model} ${variant} Truck for Sale in ${city} - aussiemotor`,
        description: `Buy ${year} ${make} ${model} ${variant} truck for ${price}. Find more used trucks on aussiemotor.`,
        type: 'website',
        url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/used-trucks/${slug}`,
        images: vehicle.images && vehicle.images.length > 0 ? [
          {
            url: vehicle.images[0],
            width: 800,
            height: 600,
            alt: `${year} ${make} ${model} ${variant} Truck`,
          }
        ] : [],
      }
    };
  } catch (error) {
    return {
      title: "aussiemotor | Used Trucks",
      description: "Find the best used trucks for sale at aussiemotor.",
      icons: {
        icon: 'https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png',
        apple: 'https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png',
      }
    };
  }
}

export default function RootLayout({ children }) {
  return <>{children}</>;
}
