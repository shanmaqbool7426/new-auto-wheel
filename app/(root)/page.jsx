// import HomeModule from "@/modules/home";
"use client"
import LoadingWrapper from "@/components/loading-wrapper";
import { Suspense } from 'react';

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoadingWrapper>
        <h1>Hello World</h1>
        {/* <Suspense fallback={<div>Loading...</div>}>
        <HomeModule />
        </Suspense> */}
      </LoadingWrapper>
    </Suspense>
  );
}


