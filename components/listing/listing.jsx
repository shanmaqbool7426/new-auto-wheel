"use client";
import ListingFilter from "@/components/listing/sidebar-filter";
import ListingPagination from "@/components/listing/pagination";
import { ListingHeader } from "@/components/listing/header";
import ListCardView from "@/components/ui/ListCardView";
import CarCard from "@/components/ui/CarCard";
import Link from "next/link";
import { MdClose } from "react-icons/md";
import {
  Box,
  Container,
  Group,
  LoadingOverlay,
  Title,
  Badge,
  CloseButton,
  rem,
} from "@mantine/core";
import {
  fetchBodiesByType,
  fetchMakesByType,
  fetchVehiclsData,
} from "@/services/vehicles";
import { getLocalStorage, reorderSlug } from "@/utils";
import { useRouter } from "next/navigation";

const FilterBadges = ({ params, searchParams }) => {
  const router = useRouter();
  const slug = params.slug;
  const userData = getLocalStorage("user");
  console.log("userData>>", userData);
  const removeFilter = (filterType, value) => {
    const slugArray = [...slug];
    // Keep only the first item (cars/bikes/trucks) and 'search' and '-'
    const baseSlug = slugArray.slice(0, 3);

    // Filter out the item we want to remove and add to baseSlug
    const filteredSlug = slugArray.slice(3).filter((item) => {
      switch (filterType) {
        case "make":
          return !item.startsWith("mk_" + value);
        case "model":
          return !item.startsWith("md_" + value);
        case "city":
          return !item.startsWith("ct_" + value);
        case "bodyType":
          return !item.startsWith("bt_" + value);
        case "transmission":
          return item !== value;
        case "drive":
          return item !== value;
        case "exteriorColor":
          return item !== value;
        case "fuelType":
          return item !== value;
        default:
          return true;
      }
    });

    const newSlug = [...baseSlug, ...filteredSlug];

    // Preserve existing query parameters except view
    const existingParams = new URLSearchParams(searchParams.toString());
    const view = existingParams.get("view");

    // Construct the new path
    let newPath = `/listing/${newSlug.join("/")}`;
    if (view) {
      newPath += `?view=${view}`;
    }

    // Use router.push with the properly formatted URL
    router.push(newPath);
  };

  const renderBadges = () => {
    const badges = [];

    slug.forEach((item, index) => {
      // Existing filter badges
      if (item.startsWith("mk_")) {
        badges.push(
          <Badge
            py={rem(12)}
            px={rem(12)}
            variant="light"
            fw={500}
            fz={rem(12)}
            color="#E90808"
            key={`make-${index}`}
            rightSection={
              <MdClose
                onClick={() => removeFilter("make", item.replace("mk_", ""))}
              />
            }
          >
            {item.replace("mk_", "")}
          </Badge>
        );
      }
      if (item.startsWith("md_")) {
        badges.push(
          <Badge
            py={rem(12)}
            px={rem(12)}
            variant="light"
            fw={500}
            fz={rem(12)}
            color="#E90808"
            key={`model-${index}`}
            rightSection={
              <MdClose
                onClick={() => removeFilter("model", item.replace("md_", ""))}
              />
            }
          >
            {item.replace("md_", "")}
          </Badge>
        );
      }
      if (item.startsWith("ct_")) {
        badges.push(
          <Badge
            py={rem(12)}
            px={rem(12)}
            variant="light"
            fw={500}
            fz={rem(12)}
            color="#E90808"
            key={`city-${index}`}
            rightSection={
              <MdClose
                onClick={() => removeFilter("city", item.replace("ct_", ""))}
              />
            }
          >
            {item.replace("ct_", "")}
          </Badge>
        );
      }
      if (item.startsWith("bt_")) {
        badges.push(
          <Badge
            py={rem(12)}
            px={rem(12)}
            variant="light"
            fw={500}
            fz={rem(12)}
            color="#E90808"
            key={`body-${index}`}
            rightSection={
              <MdClose
                onClick={() =>
                  removeFilter("bodyType", item.replace("bt_", ""))
                }
              />
            }
          >
            {item.replace("bt_", "")}
          </Badge>
        );
      }

      // New filter badges
      if (item.startsWith("tr_")) {
        badges.push(
          <Badge
            py={rem(12)}
            px={rem(12)}
            variant="light"
            fw={500}
            fz={rem(12)}
            color="#E90808"
            key={`transmission-${index}`}
            rightSection={
              <MdClose onClick={() => removeFilter("transmission", item)} />
            }
          >
            {item.replace("tr_", "")}
          </Badge>
        );
      }
      if (item.startsWith("dr_")) {
        badges.push(
          <Badge
            py={rem(12)}
            px={rem(12)}
            variant="light"
            fw={500}
            fz={rem(12)}
            color="#E90808"
            key={`drive-${index}`}
            rightSection={
              <MdClose onClick={() => removeFilter("drive", item)} />
            }
          >
            {item.replace("dr_", "")}
          </Badge>
        );
      }
      if (item.startsWith("cl_")) {
        badges.push(
          <Badge
            py={rem(12)}
            px={rem(12)}
            variant="light"
            fw={500}
            fz={rem(12)}
            color="#E90808"
            key={`color-${index}`}
            rightSection={
              <MdClose onClick={() => removeFilter("exteriorColor", item)} />
            }
          >
            {item.replace("cl_", "")}
          </Badge>
        );
      }
      if (item.startsWith("ft_")) {
        badges.push(
          <Badge
            py={rem(12)}
            px={rem(12)}
            variant="light"
            fw={500}
            fz={rem(12)}
            color="#E90808"
            key={`fuel-${index}`}
            rightSection={
              <MdClose onClick={() => removeFilter("fuelType", item)} />
            }
          >
            {item.replace("ft_", "")}
          </Badge>
        );
      }
      if (item.startsWith("pr_")) {
        const [min, max] = item.replace("pr_", "").split("_");
        badges.push(
          <Badge
            py={rem(12)}
            px={rem(12)}
            variant="light"
            fw={500}
            fz={rem(12)}
            color="#E90808"
            key={`price-${index}`}
            rightSection={
              <MdClose onClick={() => removeFilter("price", item)} />
            }
          >
            {min} - {max}
          </Badge>
        );
      }
      if (item.startsWith("yr_")) {
        const [min, max] = item.replace("yr_", "").split("_");
        badges.push(
          <Badge
            py={rem(12)}
            px={rem(12)}
            variant="light"
            fw={500}
            fz={rem(12)}
            color="#E90808"
            key={`year-${index}`}
            rightSection={
              <MdClose onClick={() => removeFilter("year", item)} />
            }
          >
            {min} - {max}
          </Badge>
        );
      }
      if (item.startsWith("ml_")) {
        const [min, max] = item.replace("ml_", "").split("_");
        badges.push(
          <Badge
            py={rem(12)}
            px={rem(12)}
            variant="light"
            fw={500}
            fz={rem(12)}
            color="#E90808"
            key={`mileage-${index}`}
            rightSection={
              <MdClose onClick={() => removeFilter("mileage", item)} />
            }
          >
            {min} - {max}
          </Badge>
        );
      }
    });

    return badges;
  };

  return (
    <Group gap="xs" mb="md" justify="flex-start">
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
  let loading = true;
  const dataofVehcles = await fetchVehiclsData(reorderedSlug);
  const vehicleMakes = await fetchMakesByType(typeMapping[params.slug[0]]);
  const vehicleBodies = await fetchBodiesByType(typeMapping[params.slug[0]]);

  loading = false;
  return (
    <>
      <Box pt={100} pb={80} className="product-listing position-relative">
        {!dataofVehcles && (
          <LoadingOverlay
            visible={true}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
            loaderProps={{ color: "red", type: "bars" }}
          />
        )}
        <div className="container-xl">
          <div className="row">
            <div className="col-lg-3">
              <ListingFilter
                type={params.slug[0]}
                makes={vehicleMakes}
                bodies={vehicleBodies}
                vehicles={dataofVehcles?.data}
              />
            </div>
            <div className="col-lg-9">
              {/* Toolbox */}
              <ListingHeader type={params.slug[0]} />

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
              <FilterBadges params={params} searchParams={searchParams} />
              {/* Product View List */}
              <div className="row">
                {dataofVehcles?.data?.results?.map((vehicle, index) => (
                  <div
                    key={index}
                    className={
                      view === "list" ? "col-12" : "col-12 col-sm-6 col-lg-4"
                    }
                  >
                    {view === "list" ? (
                      <ListCardView
                        index={index}
                        vehicle={vehicle}
                        userData={userData}
                      />
                    ) : (
                      <CarCard
                        vehicle={vehicle}
                        index={index}
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
      </Box>
    </>
  );
}
