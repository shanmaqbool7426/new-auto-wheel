'use client';
import React from 'react';
import { Box, Stack, Loader } from '@mantine/core';
import useProfileSettings from './useProfileSettings';
import styles from './ProfileSettings.module.css';
import PersonalInformation from './components/PersonalInformation';
import DealerInformation from './components/DealerInformation';
import ProfileInformation from './components/ProfileInformation';
import PackageDetails from './components/PackageDetails';
import ConnectedAccount from './components/ConnectedAccount';
import ServicesOffer from './components/ServicesOffer';
import ChangePassword from './components/ChangePassword';

export default function ProfileSettings() {
  const { profileData, loading, error } = useProfileSettings();

  if (loading) {
    return <Loader />;
  }

  console.log('profileData',profileData)

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.sidebar}>
        <Stack gap="24px">
          <ProfileInformation profileData={profileData} />
          <PackageDetails />
          <ConnectedAccount />
        </Stack>
      </Box>

      <Box className={styles.content}>
        <Stack gap="24px">
          <PersonalInformation profileData={profileData} />
          <DealerInformation profileData={profileData} />
          <ServicesOffer profileData={profileData} />
          <ChangePassword />
        </Stack>
      </Box>
    </Box>
  );
}