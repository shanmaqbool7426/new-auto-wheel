import { Suspense } from "react";
import { generateBreadcrumbItems } from "@/utils/breadcrumb";
import ListingClient from "./listing-client";
import { fetchVehiclsData } from "@/services/vehicles";

export default async function Listing({ params, searchParams }) {
  const vehicleType = params.slug[0] === "used-cars" ? "car" : "car";
  const breadcrumbItems = generateBreadcrumbItems(params, vehicleType);
  // function getVehicleType(currentPath) {
  //   if (!currentPath) return 'car';
    
  //   if (currentPath.includes('used-bikes')) return 'bike';
  //   if (currentPath.includes('used-cars')) return 'car';
  //   if (currentPath.includes('used-trucks')) return 'truck';
    
  //   return 'car'; // Default to car
  // }

    // Get the vehicle type from the path
    // const vehicleType = getVehicleType(currentPath);
  
  
    const sortBy = searchParams.sortBy
      ? `sb_${searchParams.sortBy}`
      : null;
  
    // Get the filter parameters (everything after the first slug)
    const filterParams = params.slug?.slice(1) || [];
  
    // Remove duplicates and format parameters
    const uniqueParams = filterParams.reduce((acc, param) => {
      // Skip the '-' parameter and any image file paths
      if (param === '-' || param.includes('.svg')) {
        return acc;
      }

      // Get the parameter prefix (ct_, cn_, etc.)
      const prefix = param.split('_')[0] + '_';
      const value = param.slice(prefix.length);

      // Only add if not already present with same prefix
      if (!acc.some(p => p.startsWith(prefix))) {
        acc.push(param);
      }
      return acc;
    }, []);
  
    // Add sort and view parameters
    const view = searchParams.view ? `view_${searchParams.view}` : null;
  
    // Combine all parameters
    const finalParams = [
      `used-${vehicleType}s`,
      ...uniqueParams,
      ...(sortBy ? [sortBy] : []),
      ...(view ? [view] : [])
    ];
  
    console.log("SHAN",`used-${vehicleType}s`,finalParams)
  // Fetch initial data
  const initialData = await fetchVehiclsData(finalParams);

  return (  
      <ListingClient
        params={params}
        searchParams={searchParams}
        vehicleType={vehicleType}
        initialData={initialData}
        breadcrumbItems={breadcrumbItems}
      />
  );
}
