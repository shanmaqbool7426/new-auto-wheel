'use client'
import React from 'react';
import Favorite from '@/modules/user-dashboard/Favorite';
import { signIn, useSession, SessionProvider } from 'next-auth/react';

export default function FavoritePage() {
  const { data: session, status } = useSession();

  return (
    <>
    {session?.user?._id  && <Favorite userId={session?.user?._id}/>}
    </>
  )
}
