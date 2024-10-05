'use client';
import React from 'react';
import { Grid, Button, Box } from '@mantine/core';
import styles from './ChatSidebar.module.css';
import useChatSidebar from './useChatSidebar';
import Search from '@/components/user-dashboard/Search';

export default function ChangePassword() {

  const {
    setSearchBy,
  } = useChatSidebar();

  return (
    <Box className={styles.sidebar}>
      <Box className={styles.searchbar}>
        <Search setSearchBy={setSearchBy} />
      </Box>

    </Box>
  )
}
