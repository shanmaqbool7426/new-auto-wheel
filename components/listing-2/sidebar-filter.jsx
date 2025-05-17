"use client";
import React, { Fragment, useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import { IconAdjustments } from "@tabler/icons-react";
import { useGetMakesQuery, useGetAllModelsQuery, useGetAllVarientsQuery } from "@/api-services/make";
import { useGetCitiesQuery } from "@/api-services/location";
import { GetColor } from "@/constants/colors";
import { getVehiclePartsIconByVehicleType } from "@/constants/vehicle-constants";
import { ResetFiltersIcon, SearchWithCar } from "@/components/Icons";
import {
  Card,
  Center,
  Title,
  ActionIcon,
  Drawer,
  Group,
  Button,
  Grid,
  Badge,
  ScrollArea,
} from "@mantine/core";

// Import reusable components
import CityFilter from './filters/CityFilter';
import MakeFilter from './filters/MakeFilter';
import ModelFilter from './filters/ModelFilter';
import VariantFilter from './filters/VariantFilter';
import RangeFilter from './filters/RangeFilter';
import CheckboxFilter from './filters/CheckboxFilter';
import { ClientPageRoot } from "next/dist/client/components/client-page";
import Image from "next/image";

const VEHICLE_CONDITIONS = [
  { value: 'cn_used', label: 'Used' },
  { value: 'cn_pre_owned', label: 'Pre Owned' },
  { value: 'cn_certified', label: 'Certified Pre-owned' }
];

const valueToLabel = {
  cn_used: "Used",
  cn_pre_owned: "Pre Owned",
  cn_certified: "Certified Pre-owned"
};

const ListingFilter = ({ type,cities, makes,models,varients, bodies, vehicles,drives, transmissions, fuelTypes, colors }) => {
  const searchParams = useSearchParams();

  const [opened, { open, close }] = useDisclosure(false);
  const [search, setSearch] = useState({
    city: "",
    make: "",
    model: "",
    variant: "",
  });
  

  // Add cache for filter results
  const filterCache = useRef(new Map());
  const lastFilterUpdate = useRef(Date.now());
  const DEBOUNCE_DELAY = 1000; // Increased to 1 second

  const [filters, setFilters] = useState({
    query: "",
    city: [],
    search: "",
    condition: "",
    make: [],
    model: [],
    variant: [],
    mileage: [0, 2000000],
    price: [0, 90000000],
    year: [2000, 2024],
    transmission: "",
    drive: "",
    exteriorColor: "",
    fuelType: "",
    bodyType: [],
  });
  const router = useRouter();
  const { slug } = useParams();
  const debounceTimeoutRef = useRef(null);
  const [value, setValue] = useState("");

  const getCountByTypeAndKey = (type, key) => {
    if (!vehicles?.counts) return null;
    const counts = vehicles?.counts[type];
    if (!counts) return null;

    // For variantCounts, handle _id: null as 'all'
    if (type === 'variantCounts') {
      if (key == null) {
        const found = counts.find(item => item._id == null);
        return found ? found.count : "";
      }
      const found = counts.find(item =>
        item._id && key && String(item._id).toLowerCase() === String(key).toLowerCase()
      );
      return found ? found.count : "";
    }

    // For drive, transmission, and fuel type counts
    if (type === 'driveCounts' || type === 'transmissionCounts' || type === 'fuelTypeCounts') {
      const found = counts.find(item =>
        item._id && key && String(item._id).toLowerCase() === String(key).toLowerCase()
      );
      return found ? found.count : "";
    }

    // Default for other types
    const found = counts.find(item =>
      (item._id && key && String(item._id).toLowerCase() === String(key).toLowerCase())
    );
    return found ? found.count : "";
  };

  useEffect(() => {
    if (slug && slug.length > 0) {
      const updatedFilters = { ...filters };

      slug.forEach((item) => {
        if (item.startsWith("mk_")) {
          const decoded = decodeURIComponent(item.replace("mk_", "")).replace(/%20/g, ' ');
          updatedFilters.make.push(decoded);
        }
        if (item.startsWith("md_")) {
          const decoded = decodeURIComponent(item.replace("md_", "")).replace(/%20/g, ' ');
          updatedFilters.model.push(decoded);
        }
        if (item.startsWith("vt_") || item.startsWith("vr_")) {
          // Support both vt_ (car) and vr_ (bike) prefixes
          const prefix = item.startsWith("vt_") ? "vt_" : "vr_";
          const decoded = decodeURIComponent(item.replace(prefix, "")).replace(/%20/g, ' ');
          updatedFilters.variant.push(decoded);
        }
        if (item.startsWith("ct_")) {
          const decoded = decodeURIComponent(item.replace("ct_", "")).replace(/%20/g, ' ');
          updatedFilters.city.push(decoded);
        }
        if (item.startsWith("bt_")) {
          const decoded = decodeURIComponent(item.replace("bt_", "")).replace(/%20/g, ' ');
          updatedFilters.bodyType.push(decoded);
        }
        if (item.startsWith("pr_")) {
          const [min, max] = item.replace("pr_", "").split("_");
          updatedFilters.price = [parseInt(min, 10), parseInt(max, 10)];
        }
        if (item.startsWith("yr_")) {
          const [min, max] = item.replace("yr_", "").split("_");
          updatedFilters.year = [parseInt(min, 10), parseInt(max, 10)];
        }
        if (item.startsWith("ml_")) {
          const [min, max] = item.replace("ml_", "").split("_");
          updatedFilters.mileage = [parseInt(min, 10), parseInt(max, 10)];
        }
        if (item.startsWith("cn_")) {
          updatedFilters.condition = item;
        }
        if (item.startsWith("tr_")) {
          updatedFilters.transmission = item;
        }
        if (item.startsWith("dr_")) {
          updatedFilters.drive = item;
        }
        if (item.startsWith("cl_")) {
          updatedFilters.exteriorColor = item;
        }
        if (item.startsWith("ft_")) {
          updatedFilters.fuelType = item;
        }
        if (item.startsWith("q_")) {
          updatedFilters.query = decodeURIComponent(item.replace("q_", "")).replace(/%20/g, ' ');
        }
        if (item.startsWith("od_")) {
          updatedFilters.order = item.replace("od_", "");
        }
        if (item.startsWith("page_")) {
          updatedFilters.page = parseInt(item.replace("page_", ""), 10);
        }
        if (item.startsWith("limit_")) {
          updatedFilters.limit = parseInt(item.replace("limit_", ""), 10);
        }
        if (item.startsWith("view_")) {
          updatedFilters.view = item.replace("view_", "");
        }
      });

      setFilters(updatedFilters);
    }
  }, []);

  // Process makes data
  const processedMakes = makes?.map(make => ({
    name: make.name,
    image: make.companyImage || null,
    _id: make._id,
    isPopular: make.isPopular,
    order: make.order
  })) || [];

  // Process models data
  const processedModels = models?.reduce((acc, model) => {
    if (!acc[model.makeId]) {
      acc[model.makeId] = [];
    }
    acc[model.makeId].push({
      name: model.name,
      _id: model._id,
      isPopular: model.isPopular,
      order: model.order
    });
    return acc;
  }, {}) || {};

  // Process variants data
  const processedVariants = varients?.reduce((acc, variant) => {
    if (!acc[variant.modelId]) {
      acc[variant.modelId] = [];
    }
    acc[variant.modelId].push({
      name: variant.name,
      _id: variant._id
    });
    return acc;
  }, {}) || {};

  // Filter makes based on search
  const filteredMakes = processedMakes.filter((make) =>
    make.name.toLowerCase().includes(search.make.toLowerCase())
  );

  // Separate popular and other makes
  const popularMakes = filteredMakes.filter(make => make.isPopular);
  const otherMakes = filteredMakes.filter(make => !make.isPopular);

  // Get models for selected make
  const getModelsByMakes = () => {
    const modelMap = new Map();
    filters.make.forEach(selectedMake => {
      const makeId = processedMakes.find(m => m.name.toLowerCase() === selectedMake.toLowerCase())?._id;
      if (makeId && processedModels[makeId]) {
        processedModels[makeId]
          .filter(model => model.name.toLowerCase().includes(search.model.toLowerCase()))
          .forEach(model => {
            modelMap.set(model._id, model);
          });
      }
    });
    return Array.from(modelMap.values());
  };

  // Get variants for selected model
  const getVariantsByModels = () => {
    const variantMap = new Map();
    getModelsByMakes().forEach(model => {
      if (filters.model.includes(model.name.toLowerCase()) && processedVariants[model._id]) {
        processedVariants[model._id]
          .filter(variant => variant.name.toLowerCase().includes(search.variant.toLowerCase()))
          .forEach(variant => {
            variantMap.set(variant._id, variant);
          });
      }
    });
    return Array.from(variantMap.values());
  };

  // const Breadcrumb = ({ type }) => {
  //   const params = useParams();
  //   const vehicleType = getVehicleType(params?.slug?.[0] || window.location.pathname.split('/')[1]);
    
  //   const items = [
  //     { title: 'Home', href: '/' },
  //     { title: vehicleType === 'bike' ? 'Used Bikes' : 'Used Cars', href: `/used-${vehicleType}s/search/-` }
  //   ];

  //   // Extract city if present
  //   const cityFilter = params?.slug?.find(item => item.startsWith('ct_'));
  //   const city = cityFilter ? decodeURIComponent(cityFilter.replace('ct_', '')).replace(/%20/g, ' ') : '';

  //   // Extract all makes
  //   const makeFilters = params?.slug?.filter(item => item.startsWith('mk_')) || [];
  //   // Extract all models
  //   const modelFilters = params?.slug?.filter(item => item.startsWith('md_')) || [];
  //   // Extract all variants - support both vt_ (cars) and vr_ (bikes)
  //   const variantPrefix = vehicleType === 'bike' ? 'vr_' : 'vt_';
  //   const variantFilters = params?.slug?.filter(item => item.startsWith(variantPrefix)) || [];

  //   // Add city level if present
  //   if (cityFilter) {
  //     items.push({ 
  //       title: `${vehicleType === 'bike' ? 'Bikes' : 'Cars'} ${city}`, 
  //       href: `/used-${vehicleType}s/search/-/ct_${encodeURIComponent(city)}` 
  //     });
  //   }

  //   // Add makes
  //   makeFilters.forEach(makeFilter => {
  //     const make = decodeURIComponent(makeFilter.replace('mk_', '')).replace(/%20/g, ' ');
  //     const makeUrl = `/used-${vehicleType}s/search/-${cityFilter ? '/ct_' + encodeURIComponent(city) : ''}/mk_${encodeURIComponent(make)}`;
  //     items.push({ 
  //       title: `${make} ${city ? city : ''}`, 
  //       href: makeUrl 
  //     });
  //   });

  //   // Add models
  //   modelFilters.forEach(modelFilter => {
  //     const model = decodeURIComponent(modelFilter.replace('md_', '')).replace(/%20/g, ' ');
  //     const modelUrl = `/used-${vehicleType}s/search/-${cityFilter ? '/ct_' + encodeURIComponent(city) : ''}${makeFilters.length ? makeFilters.map(m => '/' + m).join('') : ''}/md_${encodeURIComponent(model)}`;
  //     items.push({ 
  //       title: `${model} ${city ? city : ''}`,
  //       href: modelUrl
  //     });
  //   });

  //   // Add variants
  //   variantFilters.forEach(variantFilter => {
  //     const variant = decodeURIComponent(variantFilter.replace(variantPrefix, '')).replace(/%20/g, ' ');
  //     const variantUrl = `/used-${vehicleType}s/search/-${cityFilter ? '/ct_' + encodeURIComponent(city) : ''}${makeFilters.length ? makeFilters.map(m => '/' + m).join('') : ''}${modelFilters.length ? modelFilters.map(m => '/' + m).join('') : ''}/${variantPrefix}${encodeURIComponent(variant)}`;
  //     items.push({ 
  //       title: `${variant} ${city ? city : ''}`,
  //       href: variantUrl
  //     });
  //   });

  //   return (
  //     <Breadcrumbs mb="lg">
  //       {items.map((item, index) => (
  //         <Anchor
  //           key={index}
  //           href={item.href}
  //           c={'dimmed'}
  //           style={{ textDecoration: 'none' }}
  //         >
  //           {item.title}
  //         </Anchor>
  //       ))}
  //     </Breadcrumbs>
  //   );
  // };

  // Cache key generator
  const generateCacheKey = (filters) => {
    return JSON.stringify(filters);
  };

  // Check if we should update URL
  const shouldUpdateUrl = (newFilters) => {
    const now = Date.now();
    const timeSinceLastUpdate = now - lastFilterUpdate.current;
    return timeSinceLastUpdate >= DEBOUNCE_DELAY;
  };

  const updateFiltersInUrl = (updatedFilters) => {
    const cacheKey = generateCacheKey(updatedFilters);
    
    // Check if we have a cached result
    if (filterCache.current.has(cacheKey)) {
      return;
    }

    // Get the vehicle type from the URL
    const urlParts = window.location.pathname.split('/');
    const currentVehicleType = urlParts[1]?.startsWith('used-') ? urlParts[1] : `used-${type}s`;

    // Start building the URL
    let customUrl = `/${currentVehicleType}/search/-/`;

    // Handle array filters
    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        if (key === "make") {
          [...new Set(value)].forEach(make => {
            if (make) customUrl += `mk_${encodeURIComponent(make.toLowerCase())}/`;
          });
        }
        if (key === "model") {
          [...new Set(value)].forEach(model => {
            if (model) customUrl += `md_${encodeURIComponent(model.toLowerCase())}/`;
          });
        }
        if (key === "variant") {
          const prefix = currentVehicleType === 'used-bikes' ? 'vr_' : 'vt_';
          [...new Set(value)].forEach(variant => {
            if (variant) customUrl += `${prefix}${encodeURIComponent(variant.toLowerCase())}/`;
          });
        }
        if (key === "city") {
          const city = value[0];
          if (city) customUrl += `ct_${encodeURIComponent(city.toLowerCase())}/`;
        }
        if (key === "bodyType") {
          [...new Set(value)].forEach(bodyType => {
            if (bodyType) customUrl += `bt_${encodeURIComponent(bodyType.toLowerCase())}/`;
          });
        }
        if (key === "price" && (value[0] !== 0 || value[1] !== 90000000)) {
          customUrl += `pr_${value[0]}_${value[1]}/`;
        }
        if (key === "year" && (value[0] !== 2000 || value[1] !== 2024)) {
          customUrl += `yr_${value[0]}_${value[1]}/`;
        }
        if (key === "mileage" && (value[0] !== 0 || value[1] !== 2000000)) {
          customUrl += `ml_${value[0]}_${value[1]}/`;
        }
      } else if (typeof value === "string" && value) {
        if (key === "query") {
          customUrl += `q_${encodeURIComponent(value)}/`;
        }
        if (key === "condition" && value) {
          customUrl += `${value}/`;
        }
        if (key === "transmission" && value) {
          customUrl += `${value}/`;
        }
        if (key === "drive" && value) {
          customUrl += `${value}/`;
        }
        if (key === "exteriorColor" && value) {
          customUrl += `${value}/`;
        }
        if (key === "fuelType" && value) {
          customUrl += `${value}/`;
        }
      }
    });

    // Remove trailing slash if present
    if (customUrl.endsWith('/')) {
      customUrl = customUrl.slice(0, -1);
    }

    // Get current query parameters
    const queryString = searchParams.toString();
    
    // Update the URL with the new path and preserve query parameters
    router.push(queryString ? `${customUrl}?${queryString}` : customUrl, {
      scroll: false,
    });

    // Cache the result
    filterCache.current.set(cacheKey, true);
    lastFilterUpdate.current = Date.now();
  };

  const handleFilterChange = (filterName, value, isChecked) => {
    setFilters((prevFilters) => {
      let updatedFilterValue;

      if (["make", "city", "model", "variant", "bodyType"].includes(filterName)) {
        if (isChecked) {
          // For city filter, replace the entire array with the new value
          if (filterName === "city") {
            updatedFilterValue = [value];
          } else {
            // For other filters, add to existing array
            updatedFilterValue = Array.from(
              new Set([...prevFilters[filterName], value])
            );
          }
        } else {
          updatedFilterValue = prevFilters[filterName].filter(
            (item) => item !== value
          );
        }
      } else {
        updatedFilterValue = value;
      }

      const updatedFilters = {
        ...prevFilters,
        [filterName]: updatedFilterValue,
      };

      // Clear any existing timeout
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      // Only update URL if enough time has passed since last update
      if (shouldUpdateUrl(updatedFilters)) {
        updateFiltersInUrl(updatedFilters);
      } else {
        // Set a new timeout to update the URL
        debounceTimeoutRef.current = setTimeout(() => {
          updateFiltersInUrl(updatedFilters);
        }, DEBOUNCE_DELAY);
      }

      return updatedFilters;
    });
  };

  const getVehicleType = (path) => {
    if (!path) return 'cars';
    
    // Check if the path starts with 'used-'
    if (path.startsWith('used-')) {
      // Remove 'used-' prefix and 's' suffix
      return path.replace('used-', '').replace(/s$/, '');
    }
    return 'cars'; // Default to cars if no match
  };
  const resetFilters = () => {
    setFilters({
      query: "",
      city: [],
      search: "",
      condition: "",
      make: [],
      model: [],
      variant: [],
      mileage: [1000, 2000000],
      price: [10000, 2000000000],
      year: [2000, 2024],
      transmission: "",
      drive: "",
      exteriorColor: "",
      fuelType: "",
      bodyType: [],
    });
    router.push(`/listing/${type}/search/-/`, { scroll: false });
  };


  console.log(">>>>>>>>>>>>>>>>>>>.......", vehicles)

  const decodedFilterMake = filters.make.map((make) =>
    decodeURIComponent(make).toLowerCase()
  );
  const decodedFilterModel = filters.model.map((model) =>
    decodeURIComponent(model).toLowerCase()
  );
  const decodedFilterVariant = filters.variant.map((variant) =>
    decodeURIComponent(variant).toLowerCase()
  );
  const decodedFilterBodies = filters.bodyType.map((body) =>
    decodeURIComponent(body).toLowerCase()
  );

  
  const filteredcities = cities?.filter((city) =>
    city.name.toLowerCase().includes(search.city.toLowerCase())
  );
  const filteredmakes = makes?.filter((make) =>
    make.name.toLowerCase().includes(search.make.toLowerCase())
  );
  const DataTransform = (data, prefix) => {
    if (prefix === "cl") {
      return data?.map((item) => ({
        value: `cl_${encodeURIComponent(item?.title).toLowerCase()}`,
        label: item?.title,
        color: item?.code,
      }));
    } else {
      return data?.map((item) => ({
        value: `${prefix}_${encodeURIComponent(item?.title).toLowerCase()}`,
        label: item?.title,
      }));
    }
  };
  const vehicleExteriorColorOptions = DataTransform(colors, "cl");
  const vehicleDriveOptions = DataTransform(drives, "dr");
  const vehicleTransmissionOptions = DataTransform(transmissions, "tr");
  const vehicleFuelTypeOptions = DataTransform(fuelTypes, "ft");



  console.log(">>>>>>>>>>>>>>>>>>>.......", vehicleExteriorColorOptions,vehicleDriveOptions,vehicleTransmissionOptions,vehicleFuelTypeOptions)
  return (
    <Fragment>
      <ActionIcon
        variant="filled"
        onClick={open}
        pos="fixed"
        left={0}
        size="md"
        top="30%"
        style={{
          zIndex: 10,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        }}
        display={{ base: "block", md: "none" }}
        aria-label="Settings"
        color="red"
      >
        <IconAdjustments style={{ width: "70%", height: "70%" }} stroke={1.5} />
      </ActionIcon>

      <Card
        shadow="4px 4px 20px 0px rgba(0, 0, 0, 0.0784313725)"
        mb="xl"
        visibleFrom="md"
      >
        <Card.Section c="white" bg="dark" p="lg" mb="lg">
          <Center>
            <SearchWithCar />
            <Title tt="uppercase" order={5} fw={600} c="white" ml="sm">
              Search Options
            </Title>
          </Center>
        </Card.Section>

        <CityFilter
          search={search}
          setSearch={setSearch}
          filters={filters}
          handleFilterChange={handleFilterChange}
          filteredCities={filteredcities}            
          getCountByTypeAndKey={getCountByTypeAndKey}
        />                                            

        <CheckboxFilter
          title="Condition"
          options={VEHICLE_CONDITIONS}
          value={filters.condition}
          onChange={(value) => handleFilterChange("condition", value)}
          getCountByTypeAndKey={(type, key) => getCountByTypeAndKey(type, key)}
          countType="conditionCounts"
        />                          

        <MakeFilter
          search={search}
          setSearch={setSearch}
          filters={filters}
          handleFilterChange={handleFilterChange}
          popularMakes={popularMakes}
          otherMakes={otherMakes}
          decodedFilterMake={decodedFilterMake}
          getCountByTypeAndKey={(type, key) => getCountByTypeAndKey(type, key)}
        />

        {filters.make?.length > 0 && (
          <ModelFilter
            search={search}
            setSearch={setSearch}
            filters={filters}
            handleFilterChange={handleFilterChange}
            getModelsByMakes={getModelsByMakes}
            decodedFilterModel={decodedFilterModel}
            getCountByTypeAndKey={(type, key) => getCountByTypeAndKey(type, key)}
          />
        )}

        {filters.model?.length > 0 && filters.make?.length > 0 && (
          <VariantFilter
            search={search}
            setSearch={setSearch}
            filters={filters}
            handleFilterChange={handleFilterChange}
            getVariantsByModels={getVariantsByModels}
            decodedFilterVariant={decodedFilterVariant}
            getCountByTypeAndKey={(type, key) => getCountByTypeAndKey(type, key)}
          />
        )}


        {console.log(bodies, "bodies,,,,,,,")}

        {/* Body Type Filter Card */}   
        <Card
          shadow="4px 4px 20px 0px rgba(0, 0, 0, 0.0784313725)"
          visibleFrom="md"
        >
          <Card.Section c="white" bg="dark" p="lg" mb="lg">
            <Center>
              {getVehiclePartsIconByVehicleType(type)}
              <Title tt="uppercase" ml="sm" order={5} fw={600} c="white">
                Body
              </Title>
            </Center>
          </Card.Section>
          <div className="filter-card">
            <ScrollArea
              h={bodies?.length > 4 ? 250 : 'auto'}
              scrollbarSize={6}
              scrollHideDelay={1000}
              scrollbars="y"
            >
              <Grid mb="lg">
                {bodies?.map((bodyType, index) => (
                  <Grid.Col span={6} ta="center" key={index}>
                    <div className="single-brand-item selected-brand-item text-center">
                      <label
                        className={`text-decoration-none ${
                          decodedFilterBodies.includes(bodyType?.title?.toLowerCase())
                            ? "checked"
                            : ""
                        }`}
                      >
                        <input
                          type="checkbox"
                          name="bodyType"
                          value={bodyType.title?.toLowerCase()}
                          checked={decodedFilterBodies.includes(
                            bodyType?.title?.toLowerCase()
                          )}
                          onChange={(e) =>
                            handleFilterChange(
                              "bodyType",
                              bodyType.title?.toLowerCase(),
                              e.target.checked
                            )
                          }
                        />
                        <div style={{ 
                          height: '45px',
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center' 
                        }}>
                          <Image
                            width={50}
                            height={25}
                            src={bodyType.bodyImage}
                            className="mx-auto"
                            alt={`${bodyType.title} body type`}
                            style={{ 
                              objectFit: 'contain',
                              width: 'auto',
                              height: 'auto',
                              maxWidth: '50px',
                              maxHeight: '35px'
                            }}
                          />
                        </div>
                        <h6 className="mb-0 text-dark">
                          {bodyType.title}
                          {getCountByTypeAndKey("bodyTypeCounts", bodyType.title) && (
                            <Badge
                              ml="xs"
                              color="#706f6f"
                              size="sm"
                              fw={600}
                              variant="outline"
                            >
                              {getCountByTypeAndKey("bodyTypeCounts", bodyType.title)}
                            </Badge>
                          )}
                        </h6>
                      </label>
                    </div>
                  </Grid.Col>
                ))}
              </Grid>
            </ScrollArea>
          </div>
        </Card>

        <RangeFilter
          label="Mileage"
          value={filters.mileage}
          onChange={(value) => handleFilterChange("mileage", value)}
          min={0}
          max={2000000}
          step={1000}
          minValue={filters.mileage[0]}
          maxValue={filters.mileage[1]}
          onMinChange={(value) => handleFilterChange("mileage", [value, filters.mileage[1]])}
          onMaxChange={(value) => handleFilterChange("mileage", [filters.mileage[0], value])}
        />

        <RangeFilter
          label="Price"
          value={filters.price}
          onChange={(value) => handleFilterChange("price", value)}
          min={0}
          max={90000000}
          step={10000}
          minValue={filters.price[0]}
          maxValue={filters.price[1]}
          onMinChange={(value) => handleFilterChange("price", [value, filters.price[1]])}
          onMaxChange={(value) => handleFilterChange("price", [filters.price[0], value])}
        />

        <RangeFilter
          label="Year"
          value={filters.year}
          onChange={(value) => handleFilterChange("year", value)}
          min={2000}
          max={2024}
          minValue={filters.year[0]}
          maxValue={filters.year[1]}
          onMinChange={(value) => handleFilterChange("year", [value, filters.year[1]])}
          onMaxChange={(value) => handleFilterChange("year", [filters.year[0], value])}
        />

        {vehicleTransmissionOptions?.length > 0 && (
          <CheckboxFilter
            title="Transmission"
            options={vehicleTransmissionOptions}
            value={filters.transmission}
            onChange={(value) => handleFilterChange("transmission", value)}
            getCountByTypeAndKey={getCountByTypeAndKey}
            countType="transmissionCounts"
          />
        )}

        {vehicleDriveOptions?.length > 0 && (
          <CheckboxFilter
            title="Drive"
            options={vehicleDriveOptions}
            value={filters.drive}
            onChange={(value) => handleFilterChange("drive", value)}
            getCountByTypeAndKey={getCountByTypeAndKey}
            countType="driveCounts"
          />
        )}

        {/* {vehicleExteriorColorOptions?.length > 0 && (
          <CheckboxFilter
            title="Exterior Color"
            options={vehicleExteriorColorOptions}
            value={filters.exteriorColor}
            onChange={(value) => handleFilterChange("exteriorColor", value)}
            getCountByTypeAndKey={getCountByTypeAndKey}
            countType="exteriorColorCounts"
            isColorFilter
          />
        )} */}

        {vehicleFuelTypeOptions?.length > 0 && (
          <CheckboxFilter
            title="Fuel Type"
            options={vehicleFuelTypeOptions}
            value={filters.fuelType}
            onChange={(value) => handleFilterChange("fuelType", value)}
            getCountByTypeAndKey={getCountByTypeAndKey}
            countType="fuelTypeCounts"
          />
        )}

        <Button
          color="#E90808"
          mt="md"
          autoContrast
          onClick={resetFilters}
          leftSection={<ResetFiltersIcon />}
          fullWidth
          fw={500}
          ff="heading"
          size="md"
        >
          Reset Filters
        </Button>
      </Card>

      {/* Mobile Drawer */}
      <Drawer.Root size="xs" opened={opened} onClose={close}>
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header c="white" bg="dark" mb="md">
            <Drawer.Title>
              <Group>
                <SearchWithCar />
                <Title tt="uppercase" order={5} fw={600}>
                  Search Options
                </Title>
              </Group>
            </Drawer.Title>
            <Drawer.CloseButton color="white" c="white" />
          </Drawer.Header>
          <Drawer.Body p={0}>
            {/* Repeat the same filter components here for mobile view */}
            {/* ... */}
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
    </Fragment>
  );
};

export default ListingFilter;
