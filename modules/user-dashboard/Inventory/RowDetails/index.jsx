import React from 'react';
import { Box, Group } from '@mantine/core';
import styles from './RowDetails.module.css';

export default function RowDetails({ record }) {
  return (
    <Box className={styles.rowWrap}>
      <Group gap={30} grow>
        <Box className={styles.media}>
          <img src={record.title.image} alt="car" />
        </Box>

        <Box className={styles.groupColumn}>
          <Box className={styles.title}>Views</Box>
          <Box className={styles.value}>300</Box>
        </Box>

        <Box className={styles.groupColumn}>
          <Box className={styles.title}>Clicks</Box>
          <Box className={styles.value}>350</Box>
        </Box>

        <Box className={styles.groupColumn}>
          <Box className={styles.title}>No View</Box>
          <Box className={styles.value}>30</Box>
        </Box>

        <Box className={styles.groupColumn}>
          <Box className={styles.title}>City</Box>
          <Box className={styles.value}>Lahore</Box>
        </Box>

        <Box className={styles.groupColumn}>
          <Box className={styles.title}>Mileage</Box>
          <Box className={styles.value}>300,000</Box>
        </Box>

        <Box className={styles.groupColumn}>
          <Box className={styles.title}>Transmission</Box>
          <Box className={styles.value}>Manual</Box>
        </Box>

        <Box className={styles.groupColumn}>
          <Box className={styles.title}>Fuel Type</Box>
          <Box className={styles.value}>Electric</Box>
        </Box>

        <Box className={styles.groupColumn}>
          <Box className={styles.title}>Rego Expire</Box>
          <Box className={styles.value}>10-23-2024</Box>
        </Box>

      </Group>
    </Box>
  )
}
