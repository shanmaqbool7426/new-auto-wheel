"use client"
import ListingFilter from "@/components/listing/sidebar-filter";
import ListingPagination from "@/components/listing/pagination";
import { ListingHeader } from "@/components/listing/header";
import ListCardView from "@/components/ui/ListCardView";
import CarCard from "@/components/ui/CarCard";
import Link from "next/link";
import { MdClose } from "react-icons/md";
import LoadingWrapper from "@/components/loading-wrapper";
import {
  Box,
  Group,
  Title,
  Badge,
  rem,
  Breadcrumbs,
  Anchor,
  Text,
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

const Breadcrumb = ({ params, type }) => {
  // Determine vehicle type from path or type parameter
  const vehicleType = type || (isClient ? getVehicleType(window.location.pathname) : 'car');
  
  const items = [
    { title: 'Home', href: '/' },
    { title: vehicleType === 'bike' ? 'Used Bikes' : 'Used Cars', href: `/used-${vehicleType}s/search/-` }
  ];

  // Extract city if present
  const cityFilter = params.slug?.find(item => item.startsWith('ct_'));
  const city = cityFilter ? decodeURIComponent(cityFilter.replace('ct_', '')).replace(/%20/g, ' ') : '';

  // Extract all makes
  const makeFilters = params.slug?.filter(item => item.startsWith('mk_')) || [];
  // Extract all models
  const modelFilters = params.slug?.filter(item => item.startsWith('md_')) || [];
  // Extract all variants - support both vt_ (cars) and vr_ (bikes)
  const variantPrefix = vehicleType === 'bike' ? 'vr_' : 'vt_';
  const variantFilters = params.slug?.filter(item => item.startsWith(variantPrefix)) || [];

  // Add city level if present
  if (cityFilter) {
    items.push({ 
      title: `${vehicleType === 'bike' ? 'Bikes' : 'Cars'} ${city}`, 
      href: `/used-${vehicleType}s/search/-/ct_${encodeURIComponent(city)}` 
    });
  }

  // Add makes
  makeFilters.forEach(makeFilter => {
    const make = decodeURIComponent(makeFilter.replace('mk_', '')).replace(/%20/g, ' ');
    const makeUrl = `/used-${vehicleType}s/search/-${cityFilter ? '/ct_' + encodeURIComponent(city) : ''}/mk_${encodeURIComponent(make)}`;
    items.push({ 
      title: `${make} ${city ? city : ''}`, 
      href: makeUrl 
    });
  });

  // Add models
  modelFilters.forEach(modelFilter => {
    const model = decodeURIComponent(modelFilter.replace('md_', '')).replace(/%20/g, ' ');
    const modelUrl = `/used-${vehicleType}s/search/-${cityFilter ? '/ct_' + encodeURIComponent(city) : ''}${makeFilters.length ? makeFilters.map(m => '/' + m).join('') : ''}/md_${encodeURIComponent(model)}`;
    items.push({ 
      title: `${model} ${city ? city : ''}`,
      href: modelUrl
    });
  });

  // Add variants
  variantFilters.forEach(variantFilter => {
    const variant = decodeURIComponent(variantFilter.replace(variantPrefix, '')).replace(/%20/g, ' ');
    const variantUrl = `/used-${vehicleType}s/search/-${cityFilter ? '/ct_' + encodeURIComponent(city) : ''}${makeFilters.length ? makeFilters.map(m => '/' + m).join('') : ''}${modelFilters.length ? modelFilters.map(m => '/' + m).join('') : ''}/${variantPrefix}${encodeURIComponent(variant)}`;
    items.push({ 
      title: `${variant} ${city ? city : ''}`,
      href: variantUrl
    });
  });

  return (
    <Breadcrumbs mb="lg">
      {items.map((item, index) => (
        <Anchor
          key={index}
          href={item.href}
          c={'dimmed'}
          style={{ textDecoration: 'none' }}
        >
          {item.title}
        </Anchor>
      ))}
    </Breadcrumbs>
  );
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
        <LoadingWrapper>
        <div className="container-xl">
        <Breadcrumb params={params} type={vehicleType} />

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
                      view === "grid" ? "col-12 col-sm-6 col-lg-4":"col-12"
                    }
                  >
                    {view === "grid" ? (
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
        </LoadingWrapper>
        <VehicleComparison />
      </Box>
    </>
  );
}
