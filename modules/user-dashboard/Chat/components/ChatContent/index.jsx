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

  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.viewport;
      // viewport.scrollTo({
      //   top: viewport.scrollHeight,
      //   behavior: messages.length > 0 ? 'smooth' : 'auto'
      // });
    }
  }, [messages]);

  // Show placeholder when no user is selected
  if (!selectedUserId) {
    return (
      <Box className={styles.emptyState}>
        <Text size="lg" c="dimmed">Select a conversation to start chatting</Text>
      </Box>
    );
  }

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.chatHeader}>
        <Group gap={16}>
          <Avatar
            src={selectedUser?.otherUser?.profileImage || 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png'}
            radius="xl"
            size={48}
          />
          <div style={{ flex: 1 }}>
            <Box className={styles.userName}>
              {selectedUser?.otherUser?.fullName || 'User'}
            </Box>
            <Box className={styles.userStatus}>
              {selectedUser?.otherUser?.isOnline ? 'Online' : 'Offline'}
            </Box>
          </div>
        </Group>
      </Box>

      <Box className={styles.messageSection}>
        <ScrollArea 
          h="100%" 
          viewportRef={scrollAreaRef}
          offsetScrollbars
          scrollbarSize={6}
        >
          {isLoadingMessages ? (
            <Box className={styles.loadingState}>
              <Loader size="sm" />
            </Box>
          ) : messages.length === 0 ? (
            <Box className={styles.emptyMessages}>
              <Text c="dimmed">No messages yet. Start the conversation!</Text>
            </Box>
          ) : (
            <ul className={styles.messagesList}>
              {messages.map((message, index) => (
                <li 
                  key={message._id || index}
                  className={`${styles.messageItem} ${
                    message.sender === currentUserId ? styles.itemSend : styles.itemReceived
                  }`}
                >
                  <Box 
                    className={`${styles.message} ${
                      message.sender === currentUserId ? styles.msgSend : styles.msgReceived
                    }`}
                  >
                    {message.content}
                    <Text size="xs" c="dimmed" className={styles.messageTime}>
                      {new Date(message.createdAt).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </Text>
                  </Box>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </Box>

      <Box className={styles.chatFooter}>
        <Input
          value={value}
          onChange={(e) => onChangeMessage(e.target.value)} // Fixed: properly handle onChange event
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && value.trim()) {
              e.preventDefault();
              onSendMessage(selectedUserId);
            }
          }}
          radius="xl"
          placeholder="Type your message..."
          disabled={!selectedUserId}
          rightSection={
            <ActionIcon 
              onClick={() => value.trim() && onSendMessage(selectedUserId)}
              variant="filled" 
              size={35} 
              radius="xl" 
              color='#F3F3F3'
              disabled={!value.trim()}
            >
              <IconSend style={{ color: '#1B84FF', width: '16px', height: '16px' }} stroke={1.5} />
            </ActionIcon>
          }
          classNames={{
            input: styles.input,
            section: styles.section
          }}
        />
      </Box>
    </Box>
  );
}