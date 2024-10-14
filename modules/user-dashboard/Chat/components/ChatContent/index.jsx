import React, { useRef, useEffect } from 'react';
import { Box, Group, Avatar, ScrollArea, ActionIcon, Input } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';
import styles from './ChatContent.module.css';
import useChat from '../../useChat';

export default function ChatContent() {
  const {
    value,
    messages,
    handleChangeSendMessage,
    sendMessage
  } = useChat();

  const scrollAreaRef = useRef(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

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
              John Doe
            </Box>

            <Box className={styles.userMsg}>
              Personal Account
            </Box>
          </div>
        </Group>
      </Box>

      <Box className={styles.messageSecction}>
        <ScrollArea h="100%" viewportRef={scrollAreaRef}>
          <ul className={styles.messagesList}>
            {messages.map((message, index) => (
              <li key={index} className={`${styles.messageItem} ${message.sender === '123' ? styles.itemSend : styles.itemReceived}`}>
                <Box className={`${styles.message} ${message.sender === '123' ? styles.msgSend : styles.msgReceived}`}>
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
          onChange={handleChangeSendMessage}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          radius="xl"
          placeholder="Type your message..."
          rightSection={
            <ActionIcon onClick={sendMessage} variant="filled" size={35} radius="xl" color='#F3F3F3'>
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