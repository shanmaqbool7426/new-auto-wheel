import React, { useRef, useEffect } from 'react';
import { Box, Group, Avatar, ScrollArea, ActionIcon, Input, Text, Loader } from '@mantine/core';
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
console.log('selectedUser',selectedUser)
  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollAreaRef.current?.viewport) {
        const viewport = scrollAreaRef.current.viewport;
        viewport.scrollTo({
          top: viewport.scrollHeight,
          behavior: 'smooth'
        });
      }
    };
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [messages]);

  return (
    <Box className={styles.chatContainer}>
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
              {`${selectedUser?.otherUser?.accountType} Account` }
            </Text>
          </Box>
        </Group>
      </Box>

      <ScrollArea 
        className={styles.messagesArea}
        viewportRef={scrollAreaRef}
        offsetScrollbars
        scrollbarSize={6}
      >
        {messages.map((message, index) => {
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
        })}
      </ScrollArea>

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