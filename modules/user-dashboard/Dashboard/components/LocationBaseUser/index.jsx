import React, { useState } from 'react';
import { Box } from '@mantine/core';
import styles from './LocationBaseUser.module.css';
import useLocationBaseUsers from './useLocationBaseUsers';
import dynamic from 'next/dynamic';
// const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function LocationBaseUser({ viewAnalytics }) {
  const {
    series,
    options
  } = useLocationBaseUsers({ viewAnalytics });

  return (
    <Box className={styles.card}>
      <Box className={styles.cardHeader}>
        <Box className={styles.cardTitle}>Location Base User</Box>
      </Box>

      <Box>
        {/* <Chart
          options={options}
          series={series}
          type="bar"
          height={350}
        /> */}
      </Box>
    </Box>
  )
}
