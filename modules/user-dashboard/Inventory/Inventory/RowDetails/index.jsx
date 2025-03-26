import React from 'react';
import { Box, Group } from '@mantine/core';
import styles from './RowDetails.module.css';

export default function RowDetails({ record }) {
  return (
    <Box className={styles.rowWrap}>
      <Group gap={30} grow>
        <Box className={styles.media}>
          <img src={record.title.image} alt="car" height={100} width={100}/>
        </Box>

        <Box className={styles.groupColumn}>
          <Box className={styles.title}>Views</Box>
          <Box className={styles.value}>{record.viewCounts?.listingViews || 0}</Box>
        </Box>

        <Box className={styles.groupColumn}>
          <Box className={styles.title}>Clicks</Box>
          <Box className={styles.value}>{record.viewCounts?.clicks || 0}</Box>
        </Box>

        <Box className={styles.groupColumn}>
          <Box className={styles.title}>No View</Box>
          <Box className={styles.value}>{record.viewCounts?.mobileViews || 0}</Box>
        </Box>

        <Box className={styles.groupColumn}>
          <Box className={styles.title}>City</Box>
          <Box className={styles.value}>{record.city || 0}</Box>
        </Box>

        <Box className={styles.groupColumn}>
          <Box className={styles.title}>Mileage</Box>
          <Box className={styles.value}>{record.mileage?.toLocaleString() || 'N/A'}</Box>
        </Box>

        <Box className={styles.groupColumn}>
          <Box className={styles.title}>Transmission</Box>
          <Box className={styles.value}>{record.transmission || 'N/A'}</Box>
        </Box>

        <Box className={styles.groupColumn}>
          <Box className={styles.title}>Fuel Type</Box>
          <Box className={styles.value}>{record.fuelType || 'N/A'}</Box>
        </Box>

        <Box className={styles.groupColumn}>
          <Box className={styles.title}>Rego Expire</Box>
          <Box className={styles.value}>
            {record.regoExpire 
              ? new Date(record.regoExpire).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })
              : 'N/A'
            }
          </Box>
        </Box>
      </Group>
    </Box>
  )
}