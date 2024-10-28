import ListingFilter from "@/components/listingNew/sidebar-filter";
import ListingPagination from "@/components/listingNew/pagination";
import ListCardView from "@/components/ui/NewListCardView";
import CarCard from "@/components/ui/CarCard";
import { Anchor, Box, Group, LoadingOverlay, Title } from "@mantine/core";
import {
  fetchBodiesByType,
  fetchMakesByType,
  fetchNewVehiclsData,
} from "@/services/vehicles";
import { reorderSlugNew } from "@/utils";
import Link from "next/link";
export default async function Listing({ params, searchParams, type }) {
  const view = searchParams.view;

  const sortBy = searchParams.sortBy
    ? `sb_${searchParams.sortBy}`
    : searchParams.sortBy;
  const reorderedSlug = reorderSlugNew(params.slug, view, sortBy, type);
  let loading = true;
  const dataofVehcles = await fetchNewVehiclsData(reorderedSlug);
  const vehicleMakes = await fetchMakesByType(type);
  const vehicleBodies = await fetchBodiesByType(type);

  loading = false;
  return (
    <>
      <Box pb={80} className="product-listing position-relative">
      <Box pt={60} bg="#e90808cc" mb="20">
          <div className="container-xl">
            <div className="row">
              <div className="col-md-12">
                <nav className="mt-3">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Anchor href={`/`} tt="capitalize" component={Link}>Home</Anchor>
                    </li>
                    <li className="breadcrumb-item">
                      <Anchor href={`/new/${type}`} tt="capitalize" component={Link}>New {type}</Anchor>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      <Anchor href="#" tt="capitalize">Search</Anchor>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </Box>
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
                type={type}
                makes={vehicleMakes}
                bodies={vehicleBodies}
                vehicles={dataofVehcles?.data}
              />
            </div>
            <div className="col-lg-9">

              {/* Product Listing Section */}
              <Group
                className="title-section"
                justify="space-between"
                align="center"
                mb="md"
              >
                <Title
                  order={6}
                  bg="#E90808"
                  c="white"
                  tt="uppercase"
                  p="10 50 10 12"
                  style={{
                    clipPath: "polygon(0 0, 80% 0, 100% 100%, 0% 100%)",
                  }}
                >
                 New {type}s
                </Title>
                {/* <Link href={"#"} className="text-primary text-decoration-none">
                  Show all
                </Link> */}
              </Group>

              {/* Product View List */}
              <div className="row">
                {dataofVehcles?.data?.results?.map((vehicle, index) => (
                  <div
                    key={index}
                    className={
                      // view === "list" ? "col-12" : "col-12 col-sm-6 col-lg-4"
                      view === "list" ? "col-12" : "col-12"
                    }
                  >
                    {view === "list" ? (
                      <ListCardView index={index} vehicle={vehicle} />
                    ) : (
                      // <CarCard vehicle={vehicle} index={index} />
                      <ListCardView index={index} vehicle={vehicle} />
                    )}
                  </div>
                ))}
              </div>
              <ListingPagination
                data={dataofVehcles?.data}
                type={type}
              />
            </div>
          </div>
        </div>
      </Box>
    </>
  );
}
