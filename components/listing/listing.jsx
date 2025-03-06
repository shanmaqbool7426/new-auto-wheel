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

const FilterBadges = ({ params, searchParams }) => {
  const slug = params.slug;

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
    const baseSlug = slug.slice(0, 3);

    const filteredSlug = slug.slice(3).filter((item) => item !== fullValue);

    const newSlug = [...baseSlug, ...filteredSlug];

    const existingParams = new URLSearchParams(searchParams.toString());
    const view = existingParams.get("view");

    let newPath = `/listing/${newSlug.join("/")}`;
    if (view) {
      newPath += `?view=${view}`;
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
        const value = item.replace(prefix, "");
        const displayValue = config.isRange
          ? value.split("_").join(" - ")
          : value;

        return (
          <Badge
            py={rem(12)}
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

export default async function Listing({ params, searchParams }) {
  const userData = getLocalStorage("user");
  const view = searchParams.view;
  const typeMapping = {
    cars: "car",
    bikes: "bike",
    trucks: "truck",
  };

  const sortBy = searchParams.sortBy
    ? `sb_${searchParams.sortBy}`
    : searchParams.sortBy;
  const reorderedSlug = reorderSlug(params.slug, view, sortBy);
  const [
    dataofVehcles,
    vehicleMakes,
    vehicleBodies,
    vehicleDrives,
    vehicleTransmissions,
    vehicleFuelTypes,
    vehicleColors
  ] = await Promise.all([
    fetchVehiclsData(reorderedSlug),
    fetchMakesByType(typeMapping[params.slug[0]]),
    fetchBodiesByType(typeMapping[params.slug[0]]),
    fetchVehicleDrives(typeMapping[params.slug[0]]),
    fetchVehicleTransmissions(typeMapping[params.slug[0]]),
    fetchVehicleFuelTypes(typeMapping[params.slug[0]]),
    fetchVehicleColors(typeMapping[params.slug[0]])
  ]);
  return (
    <>
      <Box pt={100} pb={80} className="product-listing position-relative">
        <LoadingWrapper>
        <div className="container-xl">
          <div className="row">
            <div className="col-lg-3">
              <ListingFilter
                type={params.slug[0]}
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
              <ListingHeader type={params.slug[0]} />

              {/* Product Badges */}
              <FilterBadges params={params} searchParams={searchParams} />

              {/* Product Listing Section */}
              <Group
                className="title-section"
                justify="space-between"
                align="center"
                mb="md"
              >
                <Title
                  order={5}
                  bg="#E90808"
                  c="white"
                  tt="uppercase"
                  h={rem(34)}
                  display="flex"
                  fw={600}
                  ps={rem(10)}
                  pe={rem(40)}
                  // w={rem(220)}
                  style={{
                    clipPath: "polygon(0 0, 80% 0, 100% 100%, 0% 100%)",
                    alignItems: "center",
                  }}
                >
                  Featured Classified
                </Title>
              </Group>

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
      </Box>
    </>
  );
}
