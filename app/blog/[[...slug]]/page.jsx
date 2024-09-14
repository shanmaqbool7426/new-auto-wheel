import { Suspense } from "react";

import BlogModule from "@/modules/blogs";

export default function Blog({ params, searchParams }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogModule params={params} searchParams={searchParams} />
    </Suspense>
  );
}
