import React, { useState } from 'react';
import { Box } from '@mantine/core';
import styles from './OverallAnalytics.module.css';
import useOverallAnalytics from './useOverallAnalytics';
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function OverallAnalytics({data}) {
  console.log(data);
  const {
    series,
    options,
  } = useOverallAnalytics({data});

  return (
    <Box className={styles.card}>
      <Box className={styles.cardHeader}>
        <Box className={styles.cardTitle}>Overall Analytics</Box>
      </Box>

      <Box>
        <Chart
          options={options}
          series={series}
          type="bar"
          height={350}
        />
      </Box>
    </Box>
  )
}
