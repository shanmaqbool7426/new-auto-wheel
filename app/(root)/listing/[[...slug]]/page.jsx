import { Suspense } from "react";
import Listing from "@/components/listing/listing";
import { LoadingOverlay } from "@mantine/core";

export default function ProductListing({ params, searchParams }) {
  return (
    // <Suspense fallback={<LoadingOverlay
    //   visible={true}
    //   zIndex={1000}
    //   overlayProps={{ radius: "sm", blur: 2 }}
    //   loaderProps={{ color: "red", type: "bars" }}
    //   className="h-[100%]"
    // />}>
    // </Suspense>
      <Listing params={params} searchParams={searchParams} />
  );
}
