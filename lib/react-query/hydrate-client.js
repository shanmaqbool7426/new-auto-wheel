'use client';

import { HydrationBoundary } from '@tanstack/react-query';

export default function Hydrate(props) {
  return <HydrationBoundary {...props} />;
}