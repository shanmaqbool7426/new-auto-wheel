import React from 'react';
import { Box } from '@mantine/core';
import styles from './UserReviews.module.css';
import ViewallButton from '../ViewallButton';

export default function UserReviews() {
  return (
    <Box className={styles.card}>
      <Box className={styles.cardHeader}>
        <Box className={styles.cardTitle}>User Reviews</Box>
        <ViewallButton onClick={() => alert('I am clicked')} />
      </Box>
    </Box>
  )
}
