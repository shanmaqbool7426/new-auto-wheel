import { Suspense } from "react";
import Listing from "@/components/listing/listing";

export default function ProductListing({ params, searchParams }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Listing params={params} searchParams={searchParams} />
    </Suspense>
  );
}
