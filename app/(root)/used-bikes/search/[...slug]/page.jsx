import Listing from "@/components/listing/listing";
import LoadingWrapper from "@/components/loading-wrapper";

export default function ProductListing({ params, searchParams }) {
  return (
    <LoadingWrapper>
      <Listing params={params} searchParams={searchParams} type={"bike"} isUsed={true} />
    </LoadingWrapper>
  );
} 