import React, {Suspense}from "react";
import { LoadingOverlay } from "@mantine/core";
// import BlogModule from "@/modules/blogs"; 
export default function Blog({ params, searchParams }) {
    return (
      <Suspense fallback={<LoadingOverlay
        visible={true}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "red", type: "bars" }}
        className="h-[100%]"
      />}>
        {/* <BlogModule params={params} searchParams={searchParams} /> */}
      </Suspense>
    );
  }
  