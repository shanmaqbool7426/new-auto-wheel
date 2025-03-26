'use client';
import React from 'react';
import Image from 'next/image';
import { Box, Title, Group, Button } from '@mantine/core';
import Card from '@/components/user-dashboard/Card';
import usePackageDetails from './usePackageDetails';
import styles from './PackageDetails.module.css';
import buttonStyles from '@/styles/user-dashboard/Button.module.css';
import { IconPlus, IconStarFilled, IconCalendarMonth } from '@tabler/icons-react';
import { useUser } from '@/contexts/user';



export default function PackageDetails({profileData}) {
  const { userData } = useUser();

  const {

  } = usePackageDetails();

  return (
    <Card noContentPadding>
      <Box className={styles.card}>
        <Box className={styles.header}>
          <Title
            className={styles.title}
            order={3}
            align="center"
          >
            Package Details
          </Title>
          <Box className={styles.planType}>Free Plan</Box>
        </Box>

        <ul className={styles.content}>
          <li className={styles.planFeature}>
            <Box className={styles.featureInfo}>
              <Box className={styles.featureIcon}><IconPlus /></Box>
              <Box className={styles.featureName}>Simple Ads</Box>
            </Box>
            <Box className={styles.featureValue}>{profileData.adsCount}</Box>
          </li>
          <li className={styles.planFeature}>
            <Box className={styles.featureInfo}>
              <Box className={styles.featureIcon}><IconStarFilled /></Box>
              <Box className={styles.featureName}>Feature Ads</Box>
            </Box>
            <Box className={styles.featureValue}>{profileData.featureAddsCount}</Box>
          </li>
          {/* <li className={styles.planFeature}>
            <Box className={styles.featureInfo}>
              <Box className={styles.featureIcon}><IconCalendarMonth /></Box>
              <Box className={styles.featureName}>Package expiry Date</Box>
            </Box>
            <Box className={styles.featureValue}>11-03-24</Box>
          </li> */}
        </ul>

        {/* <Box className={buttonStyles.holder} style={{ marginTop: '12px' }}>
          <Button
            radius="20px"
            color='#1B84FF'
            fullWidth
            classNames={{
              root: buttonStyles.root,
            }}
          >
            Upgare Plan
          </Button>
        </Box> */}
      </Box>
    </Card >
  )
}
