import React, { useRef, useEffect } from 'react';
import { Box, Group, Avatar, ScrollArea, ActionIcon, Input } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';
import styles from './ChatContent.module.css';

export default function ChatContent({ value, messages, onChangeMessage, onSendMessage, selectedUserId }) {
  const scrollAreaRef = useRef(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);
console.log('>> messages',messages)
  return (
    <>
      <Box className={styles.chatHeader}>
        <Group gap={16}>
          <Avatar
            src={'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png'}
            radius="xl"
            size={48}
          />
          <div style={{ flex: 1 }}>
            <Box className={styles.userName}>
              Selected User
            </Box>
            <Box className={styles.userMsg}>
              Online
            </Box>
          </div>
        </Group>
      </Box>

      <Box className={styles.messageSection}>
        <ScrollArea h="100%" viewportRef={scrollAreaRef}>
          <ul className={styles.messagesList}>
            {messages.map((message, index) => (
              <li key={index} className={`${styles.messageItem} ${message.sender === selectedUserId ? styles.itemReceived : styles.itemSend}`}>
                <Box className={`${styles.message} ${message.sender === selectedUserId ? styles.msgReceived : styles.msgSend}`}>
                  {message.content}
                </Box>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </Box>

      <Box className={styles.chatFooter}>
        <Input
          value={value}
          onChange={onChangeMessage}
          onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
          radius="xl"
          placeholder="Type your message..."
          rightSection={
            <ActionIcon onClick={onSendMessage} variant="filled" size={35} radius="xl" color='#F3F3F3'>
              <IconSend style={{ color: '#1B84FF', width: '16px', height: '16px' }} stroke={1.5} />
            </ActionIcon>
          }
          classNames={{
            input: styles.input,
            section: styles.section
          }}
        />
      </Box>
    </>
  )
}