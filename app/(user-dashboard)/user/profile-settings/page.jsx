"use client"
import React, { Suspense } from 'react';
import ProfileSettings from '@/modules/user-dashboard/ProfileSettings';

export default function ProfileSettingsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileSettings />
    </Suspense>
  )
}
