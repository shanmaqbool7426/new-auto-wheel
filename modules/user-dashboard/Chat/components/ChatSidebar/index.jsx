import React, { useMemo } from 'react';
import { ScrollArea, Box, Group, Avatar, Text } from '@mantine/core';
import styles from './ChatSidebar.module.css';
import Search from '@/components/user-dashboard/Search';
import useChatSidebar from './useChatSidebar';

export default function ChatSidebar({ conversations, onSelectUser, selectedUserId }) {
  const {
    searchBy,
    setSearchBy,
    handleUserSelect,
    filteredConversations
  } = useChatSidebar(conversations, onSelectUser);

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString();
  };

  return (
    <Box className={styles.sidebar}>
      <Box className={styles.sidebarHeader}>
        <Search 
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
          placeholder="Search conversations..."
        />
      </Box>
      <ScrollArea className={styles.scrollArea}>
        <ul className={styles.sidebarList}>
          {filteredConversations.map((conversation) => {
            const isSelected = conversation.otherUser._id === selectedUserId;
            return (
              <li
                key={conversation.otherUser._id}
                className={`${styles.sidebarListItem} ${isSelected ? styles.selected : ''}`}
                onClick={() => handleUserSelect(conversation.otherUser._id)}
              >
                <Group gap={16}>
                  <Avatar
                    src={conversation.otherUser.profileImage || 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png'}
                    radius="xl"
                    size={48}
                  />
                  <div style={{ flex: 1 }}>
                    <Box className={styles.userName}>
                      {conversation.otherUser.fullName}
                    </Box>
                    <Box className={styles.userMsg}>
                      {conversation.lastMessage?.content || 'No messages yet'}
                    </Box>
                  </div>
                </Group>
                <Box className={styles.userTime}>
                  <Text size="xs" color="dimmed">
                    {formatTime(conversation.lastMessage?.createdAt)}
                  </Text>
                </Box>
              </li>
            );
          })}
        </ul>
      </ScrollArea>
    </Box>
  );
}