'use client';

import React, { useState, useEffect } from 'react';
import { Box, Loader, Text } from '@mantine/core';
import { useSession } from "next-auth/react";
import useChat from './useChat';
import styles from './Chat.module.css';
import ChatSidebar from './components/ChatSidebar';
import ChatContent from './components/ChatContent';

export default function Chat() {
  const { data: session, status } = useSession();
  const [selectedUser, setSelectedUser] = useState(null);
  
  const {
    messageInput,
    messages,
    conversations,
    isLoading,
    handleMessageChange,
    sendMessage,
    handleUserSelect,
    selectedUserId
  } = useChat();

  useEffect(() => {
    if (conversations.length && selectedUserId) {
      const user = conversations.find(
        (item) => item.otherUser._id === selectedUserId
      );
      setSelectedUser(user || null);
    }
  }, [selectedUserId, conversations]);

  // Show loading state
  if (status === "loading" || isLoading) {
    return (
      <Box className={styles.loadingWrapper}>
        <Loader size="lg" />
      </Box>
    );
  }

  // Show authentication required message
  if (!session?.user) {
    return (
      <Box className={styles.authWrapper}>
        <Text size="lg">Please sign in to access chat</Text>
      </Box>
    );
  }

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.sidebar}>
        <ChatSidebar 
          conversations={conversations}
          onSelectUser={handleUserSelect}
          selectedUserId={selectedUserId}
          currentUserId={session.user._id}
        />
      </Box>

      <Box className={styles.content}>
        <ChatContent 
          value={messageInput}
          messages={messages}
          onChangeMessage={handleMessageChange}
          onSendMessage={() => {
            if (selectedUserId) {
              sendMessage(selectedUserId);
            }
          }}
          selectedUserId={selectedUserId}
          currentUserId={session.user._id}
          selectedUser={selectedUser}
          isLoadingMessages={isLoading}
        />
      </Box>
    </Box>
  );
}