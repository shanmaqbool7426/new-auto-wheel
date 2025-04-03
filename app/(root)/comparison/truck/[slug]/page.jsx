"use client"
import React, { Suspense } from 'react';
import ComparisonDetails from "@/modules/car-comparison/detail";
import { Center, Loader } from '@mantine/core';

const ComparisonDetailsPage = (params,searchParams) => {
  return (
    <Suspense fallback={
      <Center h="100vh">
        <Loader color="red" size="lg" />
      </Center>
    }>
      <ComparisonDetails params={params} searchParams={searchParams} type="truck"/>
    </Suspense>
  )
}

export default ComparisonDetailsPage