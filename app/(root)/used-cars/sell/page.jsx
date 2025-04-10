'use client'
import React from 'react'
import PostAnAdModule from '@/modules/post-ad'

// Client component wrapper
const PostAdWrapper = ({ searchParams }) => {
  return <PostAnAdModule type="car" vehicleId={searchParams?.vehicleId} />
}

// Server component page
const Page = ({ searchParams }) => {
  return <PostAdWrapper searchParams={searchParams} />
}

export default Page