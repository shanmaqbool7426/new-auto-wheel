import React, { lazy, Suspense } from 'react'
import { Box, Loader } from '@mantine/core'

// Lazy load the PostAnAdModule component
const PostAnAdModule = lazy(() => import('@/modules/post-ad'))

// Loading fallback component
const LoadingFallback = () => (
  <Box 
    style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh' 
    }}
  >
    <Loader size="xl" variant="dots" />
  </Box>
)

export default function Page() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PostAnAdModule type="car" />
    </Suspense>
  )
}