"use client"
import ListingFilter from "@/components/listing/sidebar-filter";
import ListingPagination from "@/components/listing/pagination";
import { ListingHeader } from "@/components/listing/header";
import ListCardView from "@/components/ui/ListCardView";
import CarCard from "@/components/ui/CarCard";
import Link from "next/link";
import { MdClose } from "react-icons/md";
import {
  Box,
  Group,
  Title,
  Badge,
  rem,
  Anchor,
  Text,
  Container,
} from "@mantine/core";
import {
  fetchBodiesByType,
  fetchMakesByType,
  fetchVehiclsData,
  fetchVehicleDrives,
  fetchVehicleTransmissions,
  fetchVehicleFuelTypes,
  fetchVehicleColors,
} from "@/services/vehicles";
import { getLocalStorage, reorderSlug } from "@/utils";
import VehicleComparison from "@/components/ComparisonCard";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
// import { CloseButton } from "@/components/ui/CloseButton";

// Safely get the path - don't access window at the module level
let path = '';
// Detect the environment
const isClient = typeof window !== 'undefined';

// Function to get vehicle type from path
function getVehicleType(currentPath) {
  if (!currentPath) return 'car';
  
  if (currentPath.includes('used-bikes')) return 'bike';
  if (currentPath.includes('used-cars')) return 'car';
  if (currentPath.includes('used-trucks')) return 'truck';
  
  return 'car'; // Default to car
}

const FilterBadges = ({ params, searchParams }) => {
  const slug = params.slug;
  // Determine vehicle type
  const currentPath = isClient ? window.location.pathname : '';
  const vehicleType = getVehicleType(currentPath);

  const filterConfigs = {
    mk_: { type: "make", label: "make" },
    md_: { type: "model", label: "model" },
    vr_: { type: "variant", label: "variant" },
    vt_: { type: "variant", label: "variant" }, // Support both vr_ (bikes) and vt_ (cars)
    ct_: { type: "city", label: "city" },
    bt_: { type: "bodyType", label: "bodyType" },
    tr_: { type: "transmission", label: "transmission" },
    dr_: { type: "drive", label: "drive" },
    cl_: { type: "exteriorColor", label: "exteriorColor" },
    ft_: { type: "fuelType", label: "fuelType" },
    pr_: { type: "price", label: "price", isRange: true },
    yr_: { type: "year", label: "year", isRange: true },
    ml_: { type: "mileage", label: "mileage", isRange: true },
  };

  const removeFilter = (fullValue) => {
    // Get the current URL path
    const urlParts = window.location.pathname.split('/');
    const vehicleType = urlParts[1]; // 'used-cars', 'used-bikes', etc.

    // Filter out the value to remove
    const filteredSlug = slug.filter((item) => item !== fullValue);

    // Construct the new URL
    let newPath = `/${vehicleType}/search/${filteredSlug.join('/')}`;

    // Handle view parameter separately
    if (searchParams?.view) {
      newPath += `?view=${searchParams.view}`;
    }

    return newPath;
  };

  const renderBadges = () => {
    return slug
      .map((item, index) => {
        const prefix = Object.keys(filterConfigs).find((key) =>
          item.startsWith(key)
        );
        if (!prefix) return null;

        const config = filterConfigs[prefix];
        let value = item.replace(prefix, "");
        
        // Properly decode URL-encoded values
        try {
          value = decodeURIComponent(value).replace(/-/g, ' ');
        } catch (e) {
          console.error("Error decoding URL parameter:", e);
        }
        
        const displayValue = config.isRange
          ? value.split("_").join(" - ")
          : value;

        return (
          <Badge
            pt={rem(5)}
            pb={rem(20)}
            px={rem(12)}
            variant="light"
            fw={500}
            fz={rem(12)}
            color="#E90808"
            key={`${config.type}-${index}`}
            rightSection={
              <Link href={removeFilter(item)}>
                <MdClose
                  style={{
                    cursor: "pointer",
                    transition: "opacity 0.2s",
                    ":hover": {
                      opacity: 0.7,
                    },
                  }}
                />
              </Link>
            }
            styles={{
              rightSection: {
                "&:hover": {
                  opacity: 0.7,
                },
              },
            }}
          >
            {displayValue}
          </Badge>
        );
      })
      .filter(Boolean);
  };

  return (
    <Group
      gap="xs"
      mb="md"
      justify="flex-start"
      pb="1rem"
      style={{ borderBottom: "1px solid #CCCCCC" }}
    >
      {renderBadges()}
    </Group>
  );
};

// Generate breadcrumb items based on params and type
const generateBreadcrumbItems = (params, type) => {
  const items = [
    { title: 'Home', href: '/' },
    { title: type === 'bike' ? 'Used Bikes' : 'Used Cars', href: `/used-${type}s/search/-` }
  ];

  if (!params?.slug) return items;

  // Extract city if present
  const cityFilter = params.slug.find(item => item.startsWith('ct_'));
  const city = cityFilter ? decodeURIComponent(cityFilter.replace('ct_', '')).replace(/%20/g, ' ') : '';

  // Extract make filter
  const makeFilter = params.slug.find(item => item.startsWith('mk_'));
  const make = makeFilter ? decodeURIComponent(makeFilter.replace('mk_', '')).replace(/%20/g, ' ') : '';

  // Extract model filter
  const modelFilter = params.slug.find(item => item.startsWith('md_'));
  const model = modelFilter ? decodeURIComponent(modelFilter.replace('md_', '')).replace(/%20/g, ' ') : '';

  // Add city level if present
  if (city) {
    items.push({ 
      title: `${type === 'bike' ? 'Bikes' : 'Cars'} in ${city}`, 
      href: `/used-${type}s/search/-/ct_${encodeURIComponent(city)}` 
    });
  }

  // Add make level if present
  if (make) {
    items.push({
      title: `${make} ${type === 'bike' ? 'Bikes' : 'Cars'}${city ? ` in ${city}` : ''}`,
      href: `/used-${type}s/search/-${cityFilter ? '/ct_' + encodeURIComponent(city) : ''}/mk_${encodeURIComponent(make)}`
    });
  }

  // Add model level if present
  if (model && make) {
    items.push({
      title: `${make} ${model}${city ? ` in ${city}` : ''}`,
      href: `/used-${type}s/search/-${cityFilter ? '/ct_' + encodeURIComponent(city) : ''}/mk_${encodeURIComponent(make)}/md_${encodeURIComponent(model)}`
    });
  }

  return items;
};

export default async function Listing({ params, searchParams }) {
  const userData = getLocalStorage("user");
  const view = searchParams.view;
  
  // Get path safely based on environment
  let currentPath = '';
  
  // In client-side, we can access window
  if (isClient) {
    currentPath = window.location.pathname;
    // Update the module level path for other components
    path = currentPath;
  } 
  // In server-side, try to determine from params
  else if (params?.slug?.[0]) {
    currentPath = `/used-${params.slug[0]}`;
  }
  
  // Get the vehicle type from the path
  const vehicleType = getVehicleType(currentPath);
  
  
  const sortBy = searchParams.sortBy
    ? `sb_${searchParams.sortBy}`
    : null;

  // Get the filter parameters (everything after the first slug)
  const filterParams = params.slug?.slice(1) || [];

  // Add sortBy to filterParams if it exists
  const paramsWithSort = sortBy ? [...filterParams, sortBy] : filterParams;

  // Add view to filterParams if it exists
  const finalParams = view ? [...paramsWithSort, `view_${view}`] : paramsWithSort;

  const [
    dataofVehcles,
    vehicleMakes,
    vehicleBodies,
    vehicleDrives,
    vehicleTransmissions,
    vehicleFuelTypes,
    vehicleColors
  ] = await Promise.all([
    fetchVehiclsData([`used-${vehicleType}s`, ...finalParams]),
    fetchMakesByType(vehicleType),
    fetchBodiesByType(vehicleType),
    fetchVehicleDrives(vehicleType),
    fetchVehicleTransmissions(vehicleType),
    fetchVehicleFuelTypes(vehicleType),
    fetchVehicleColors(vehicleType)
  ]);

  return (
    <>
      <Box pt={100} pb={80} className="product-listing position-relative">
        <div className="container-xl">
          <Container size="xl" px={0} mb={20}>
            <Breadcrumb items={generateBreadcrumbItems(params, vehicleType)} />
          </Container>

          <div className="row">
            <div className="col-lg-3">
              <ListingFilter
                type={vehicleType}
                makes={vehicleMakes}
                bodies={vehicleBodies}
                vehicles={dataofVehcles?.data}
                drives={vehicleDrives}
                transmissions={vehicleTransmissions}
                fuelTypes={vehicleFuelTypes}
                colors={vehicleColors}
              />
            </div>
            <div className="col-lg-9">
              {/* Toolbox */}
              <ListingHeader type={vehicleType} />

              {/* Product Badges */}
              <FilterBadges params={params} searchParams={searchParams} />

              {/* Product View List */}
              <div className="row">
                {dataofVehcles?.data?.results?.map((vehicle, index) => (
                  <div
                    key={index}
                    className={
                      searchParams.view === "grid" ? "col-12 col-sm-6 col-lg-4":"col-12"
                    }
                  >
                    {searchParams.view === "grid" ? (
                      <CarCard
                      vehicle={vehicle}
                      index={index}
                      userData={userData}
                    />
                    ) : (
                      <ListCardView
                      index={index}
                      vehicle={vehicle}
                      userData={userData}
                    />
                    )}
                  </div>
                ))}
              </div>
              <ListingPagination
                data={dataofVehcles?.data}
                type={params.slug}
              />
            </div>
          </div>
        </div>
        <VehicleComparison />
      </Box>
    </>
  );
}
