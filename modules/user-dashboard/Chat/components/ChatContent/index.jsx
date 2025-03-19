import React, { useRef, useEffect } from 'react';
import { Box, Group, Avatar, ScrollArea, ActionIcon, Input, Text, Loader, Center } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';
import styles from './ChatContent.module.css';

export default function ChatContent({ 
  value,
  currentUserId, 
  messages, 
  onChangeMessage, 
  onSendMessage, 
  selectedUserId,
  selectedUser,
  isLoadingMessages 
}) {
  const scrollAreaRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If no user is selected or messages are loading
  if (!selectedUserId) {
    return (
      <Box className={styles.chatContainer}>
        <Center className={styles.emptyState}>
          <Text c="dimmed" size="lg">Select a conversation to start chatting</Text>
        </Center>
      </Box>
    );
  }

  if (isLoadingMessages) {
    return (
      <Box className={styles.chatContainer}>
        <Center className={styles.loadingState}>
          <Loader size="md" />
        </Center>
      </Box>
    );
  }

  return (
    <Box className={styles.chatContainer}>
      {/* Chat Header */}
      <Box className={styles.chatHeader}>
        <Group>
          <Avatar
            src={selectedUser?.otherUser?.profileImage}
            radius="xl"
            size={40}
          />
          <Box>
            <Text fw={600}>{selectedUser?.otherUser?.fullName || 'User'}</Text>
            <Text size="xs" c="dimmed">
              {`${selectedUser?.otherUser?.accountType || ''} Account`}
            </Text>
          </Box>
        </Group>
      </Box>

      {/* Messages Area */}
      <Box className={styles.messagesArea}>
        {messages.length === 0 ? (
          <Center className={styles.emptyMessages}>
            <Text c="dimmed">No messages yet. Start the conversation!</Text>
          </Center>
        ) : (
          messages.map((message, index) => {
            const isSentByMe = message.sender?._id === currentUserId;
            return (
              <Box 
                key={message._id || index}
                className={styles.messageRow}
                data-sent={isSentByMe}
              >
                {!isSentByMe && (
                  <Avatar
                    src={selectedUser?.otherUser?.profileImage}
                    size="sm"
                    radius="xl"
                    className={styles.messageAvatar}
                  />
                )}
                <Box className={styles.messageContent}>
                  <Box 
                    className={`${styles.messageBubble} ${
                      isSentByMe ? styles.sentBubble : styles.receivedBubble
                    }`}
                  >
                    {message.content}
                  </Box>
                  <Text size="xs" c="dimmed" className={styles.messageTime}>
                    {new Date(message.createdAt).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </Text>
                </Box>
              </Box>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input Area */}
      <Box className={styles.inputContainer}>
        <Input
          value={value}
          onChange={(e) => onChangeMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && value.trim()) {
              e.preventDefault();
              onSendMessage();
            }
          }}
          placeholder="Type a message..."
          radius="xl"
          size="md"
          rightSection={
            <ActionIcon
              disabled={!value.trim()}
              onClick={() => value.trim() && onSendMessage()}
              radius="xl"
              variant="subtle"
              color="blue"
              size="lg"
            >
              <IconSend size={18} />
            </ActionIcon>
          }
        />
      </Box>
    </Box>
  );
}