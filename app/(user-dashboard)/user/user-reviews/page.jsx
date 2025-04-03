"use client"
import React, { Suspense } from 'react';
import UserReviews from '@/modules/user-dashboard/UserReviews';
import { Center, Loader } from '@mantine/core';

export default function UserReviewsPage() {
  return (
    <Suspense fallback={
      <Center h="100vh">
        <Loader color="red" size="lg" />
      </Center>
    }>
      <UserReviews />
    </Suspense>
  )
}
