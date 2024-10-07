import React from 'react';
import { Box } from '@mantine/core';
import styles from './TopPerformingPost.module.css';
import ViewallButton from '../ViewallButton';

export default function TopPerformingPost() {
  return (
    <Box className={styles.card}>
      <Box className={styles.cardHeader}>
        <Box className={styles.cardTitle}>Top Performing Post</Box>
        <ViewallButton onClick={() => alert('I am clicked')} />
      </Box>
    </Box>
  )
}
