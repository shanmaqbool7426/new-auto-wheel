'use client';
import React from 'react';
import { Box } from '@mantine/core';
import useChat from './useChat';
import styles from './Chat.module.css';
import ChatSidebar from './components/ChatSidebar';
import ChatContent from './components/ChatContent';

export default function Chat() {
  const {
    value,
    messages,
    conversations,
    handleChangeSendMessage,
    sendMessage,
  } = useChat();

  const [selectedUserId, setSelectedUserId] = React.useState(null);

  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
  };

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.sidebar}>
        <ChatSidebar 
          conversations={conversations}
          onSelectUser={handleUserSelect}
          selectedUserId={selectedUserId}
        />
      </Box>

      <Box className={styles.content}>
        <ChatContent 
          value={value}
          messages={messages}
          onChangeMessage={handleChangeSendMessage}
          onSendMessage={() => sendMessage(selectedUserId)}
          selectedUserId={selectedUserId}
        />
      </Box>
    </Box>
  )
}