"use client"
import React, { Suspense } from 'react';
import Chat from '@/modules/user-dashboard/Chat';
import { Center, Loader } from '@mantine/core';

export default function ChatPage() {
  return (
    <Suspense fallback={
      <Center h="100vh">
        <Loader color="red" size="lg" />
      </Center>
    }>
      <Chat />
    </Suspense>
  )
}
