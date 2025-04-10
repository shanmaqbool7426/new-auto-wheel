import React from 'react'
import PostAnAdModule from '@/modules/post-ad'

// Client component wrapper to handle search params
'use client'
const PostAdWrapper = ({ searchParams }) => {
  return <PostAnAdModule type="car" vehicleId={searchParams?.vehicleId} />
}

// Server component page
export default function Page({ searchParams }) {
  return <PostAdWrapper searchParams={searchParams} />
}