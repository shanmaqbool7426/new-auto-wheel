import React from 'react';
import { Box } from '@mantine/core';
import styles from './LatestNotificationPost.module.css';
import ViewallButton from '../ViewallButton';

export default function LatestNotificationPost() {
  return (
    <Box className={styles.card}>
      <Box className={styles.cardHeader}>
        <Box className={styles.cardTitle}>Latest Notification Post</Box>
        <ViewallButton onClick={() => alert('I am clicked')} />
      </Box>
    </Box>
  )
}
