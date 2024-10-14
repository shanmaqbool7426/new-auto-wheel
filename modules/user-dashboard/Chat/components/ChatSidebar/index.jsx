'use client';
import React from 'react';
import { ScrollArea, Box, Group, Avatar, Text } from '@mantine/core';
import styles from './ChatSidebar.module.css';
import useChatSidebar from './useChatSidebar';
import Search from '@/components/user-dashboard/Search';

export default function ChatSidebar({ onSelectUser }) {
  const {
    setSearchBy,
    conversations,
    selectedUserId,
    handleUserSelect,
  } = useChatSidebar(onSelectUser);

  return (
    <Box className={styles.sidebar}>
      <Box className={styles.searchbar}>
        <Search setSearchBy={setSearchBy} />
      </Box>
      <Box className={styles.sidebarContent}>
        <ScrollArea h="100%">
          <ul className={styles.sidebarList}>
            {conversations.map((conversation) => {
              const isSelected = conversation.userId === selectedUserId;
              return (
                <li
                  key={conversation.userId}
                  className={`${styles.sidebarListItem} ${isSelected ? styles.selected : ''}`}
                  onClick={() => handleUserSelect(conversation.userId)}
                >
                  <Group gap={16}>
                    <Avatar
                      src={conversation.avatar}
                      radius="xl"
                      size={48}
                    />
                    <div style={{ flex: 1 }}>
                      <Box className={styles.userName}>
                        {conversation.name}
                      </Box>
                      <Box className={styles.userMsg}>
                        {conversation.lastMessage}
                      </Box>
                    </div>
                  </Group>
                  <Box className={styles.userTime}>
                    <Text size="xs" color="dimmed">
                      {conversation.lastMessageTime}
                    </Text>
                  </Box>
                </li>
              );
            })}
          </ul>
        </ScrollArea>
      </Box>
    </Box>
  );
}