import VideosModule from "@/modules/videos";
import { LoadingOverlay } from "@mantine/core";
import { Suspense } from "react";

export default function Videos({ params, searchParams }) {
  return (
    <>
      <Suspense fallback={<LoadingOverlay
        visible={true}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "red", type: "bars" }}
        className="h-[100%]"
      />}>
        <VideosModule params={params} searchParams={searchParams} />
      </Suspense>
    </>
  );
}