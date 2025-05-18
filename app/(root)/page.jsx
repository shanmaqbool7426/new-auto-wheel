"use client"
import HomeModule from "@/modules/home";
import LoadingWrapper from "@/components/loading-wrapper";
import { Suspense } from 'react';

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoadingWrapper>
        <HomeModule />
      </LoadingWrapper>
    </Suspense>
  );
}


