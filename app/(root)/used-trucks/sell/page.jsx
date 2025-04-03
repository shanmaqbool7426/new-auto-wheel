"use client"
import React, { Suspense } from 'react';
import PostAnAdModule from '@/modules/post-ad'
import { Center, Loader } from '@mantine/core';

const Page = () => {
  return (
    <Suspense fallback={
      <Center h="100vh">
        <Loader color="red" size="lg" />
      </Center>
    }>
      <PostAnAdModule type="truck" />
    </Suspense>
  )
}

export default Page