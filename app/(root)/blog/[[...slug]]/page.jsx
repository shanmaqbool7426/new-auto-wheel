import { Suspense } from "react";
import { LoadingOverlay, Center, Loader } from "@mantine/core";
import BlogModule from "@/modules/blogs";
import LoadingWrapper from "@/components/loading-wrapper";

export default function Blog({ params, searchParams }) {
  return (
    <LoadingWrapper>
      <Suspense 
        fallback={
          <Center h="100vh">
            <Loader color="red" size="lg" />
          </Center>
        }
      >
        <BlogModule params={params} searchParams={searchParams} />
      </Suspense>
    </LoadingWrapper>
  );
}
