import React from 'react';
import { Box, Group, Avatar, ScrollArea, ActionIcon, Input } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';
import styles from './ChatContent.module.css';
import FormField from '@/components/user-dashboard/FormField';
import useChat from '../../useChat';

export default function ChatConten() {
  const {
    value,
    handleChangeSendMessage
  } = useChat();
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
        <ScrollArea h="100%">
          <ul className={styles.messagesList}>
            <li className={`${styles.messageItem} ${styles.itemReceived}`}>
              <Box className={`${styles.message} ${styles.msgReceived}`}>
                Send messages from the messenger tab at the bottom for
                further information and arrangements
              </Box>
            </li>

            <li className={`${styles.messageItem} ${styles.itemReceived}`}>
              <Box className={`${styles.message} ${styles.msgReceived}`}>
                Send messge from the messenger tab at the bottom
              </Box>
            </li>

            <li className={`${styles.messageItem} ${styles.itemSend}`}>
              <Box className={`${styles.message} ${styles.msgSend}`}>
                Send messages from the messenger tab at the bottom for
                further information and arrangements
              </Box>
            </li>

          </ul>
        </ScrollArea>
      </Box>

      <Box className={styles.chatFooter}>
        <Input
          value={value}
          onChange={handleChangeSendMessage}
          radius="xl"
          placeholder="Type your message..."
          rightSection={
            <ActionIcon variant="filled" size={35} radius="xl" color='#F3F3F3'>
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
