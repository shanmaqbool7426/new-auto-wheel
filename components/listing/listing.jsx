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

const FilterBadges = ({ params, searchParams }) => {
  const router = useRouter();
  const slug = params.slug?.slice(1) || [];

  const filterConfigs = {
    mk_: { type: "make", label: "make" },
    md_: { type: "model", label: "model" },
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
    // Get the vehicle type from the URL
    const urlParts = window.location.pathname.split('/');
    const vehicleType = urlParts[1]; // 'used-cars', 'used-bikes', etc.

    // Filter out the value to remove
    const filteredSlug = slug.filter((item) => item !== fullValue);

    // Construct the new URL
    const newPath = `/${vehicleType}/search/${['-', ...filteredSlug].join('/')}`;

    // Preserve any existing query parameters
    const existingParams = new URLSearchParams(searchParams.toString());
    const queryString = existingParams.toString();

    // Navigate to the new URL
    router.push(queryString ? `${newPath}?${queryString}` : newPath, { scroll: false });
  };

  return (
    <Group gap="xs" mb="lg">
      {slug.map((item, index) => {
        const prefix = item.substring(0, item.indexOf('_') + 1);
        const config = filterConfigs[prefix];

        if (!config || item === '-') return null;

        const value = item.substring(item.indexOf('_') + 1);
        const displayValue = config.isRange
          ? value.replace('_', ' - ')
          : decodeURIComponent(value);

        return (
          <Badge
            key={index}
            size="lg"
            variant="outline"
            // rightSection={
            //   <CloseButton
            //     size={22}
            //     variant="transparent"
            //     onClick={() => removeFilter(item)}
            //   />
            // }
          >
            {`${config.label}: ${displayValue}`}
          </Badge>
        );
      })}
    </Group>
  );
};

const Breadcrumb = ({ params, type }) => {
  const items = [
    { title: 'Home', href: '/' },
    { title: 'Used Cars', href: '/used-cars/search/-' }
  ];

  // Extract city if present
  const cityFilter = params.slug?.find(item => item.startsWith('ct_'));
  const city = cityFilter ? decodeURIComponent(cityFilter.replace('ct_', '')) : '';

  // Extract all makes
  const makeFilters = params.slug?.filter(item => item.startsWith('mk_')) || [];
  // Extract all models
  const modelFilters = params.slug?.filter(item => item.startsWith('md_')) || [];
  // Extract all variants
  const variantFilters = params.slug?.filter(item => item.startsWith('vt_')) || [];

  // Add city level if present
  if (cityFilter) {
    items.push({ 
      title: `Cars ${city}`, 
      href: `/used-cars/search/-/ct_${city}` 
    });
  }

  // Add makes
  makeFilters.forEach(makeFilter => {
    const make = decodeURIComponent(makeFilter.replace('mk_', ''));
    const makeUrl = `/used-cars/search/-${cityFilter ? '/ct_' + city : ''}/mk_${make}`;
    items.push({ 
      title: `${make} ${city ? city : ''}`, 
      href: makeUrl 
    });
  });

  // Add models
  modelFilters.forEach(modelFilter => {
    const model = decodeURIComponent(modelFilter.replace('md_', ''));
    const modelUrl = `/used-cars/search/-${cityFilter ? '/ct_' + city : ''}${makeFilters.length ? makeFilters.map(m => '/' + m).join('') : ''}/md_${model}`;
    items.push({ 
      title: `${model} ${city ? city : ''}`,
      href: modelUrl
    });
  });

  // Add variants
  variantFilters.forEach(variantFilter => {
    const variant = decodeURIComponent(variantFilter.replace('vt_', ''));
    const variantUrl = `/used-cars/search/-${cityFilter ? '/ct_' + city : ''}${makeFilters.length ? makeFilters.map(m => '/' + m).join('') : ''}${modelFilters.length ? modelFilters.map(m => '/' + m).join('') : ''}/vt_${variant}`;
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
  
  // Extract vehicle type from URL path
  const getVehicleType = (path) => {
    if (!path) return 'car';
    
    // Check if the path starts with 'used-'
    if (path.startsWith('used-')) {
      // Remove 'used-' prefix and 's' suffix
      return path.replace('used-', '').replace(/s$/, '');
    }
    return 'car'; // Default to car if no match
  };

  // Get the vehicle type from the first slug parameter
  const vehicleType = params.slug?.[0] ? getVehicleType(params.slug[0]) : 'car';
  
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
