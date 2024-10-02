'use client';
import React from 'react';
import { Box } from '@mantine/core';
import useChat from './useChat';
import styles from './Chat.module.css';
import ChatSidebar from './components/ChatSidebar';
import ChatContent from './components/ChatContent';

export default function Chat() {

  const {

  } = useChat();

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.sidebar}>
        <ChatSidebar />
      </Box>

      <Box className={styles.content}>
        <ChatContent />
      </Box>
    </Box>
  )
}
