'use client';
import React from 'react';
import { ScrollArea, Box, Group, Avatar } from '@mantine/core';
import styles from './ChatSidebar.module.css';
import useChatSidebar from './useChatSidebar';
import Search from '@/components/user-dashboard/Search';
import { chatSidebarData } from './data';

export default function ChatSidebar() {

  const {
    setSearchBy,
  } = useChatSidebar();

  return (
    <Box className={styles.sidebar}>
      <Box className={styles.searchbar}>
        <Search setSearchBy={setSearchBy} />
      </Box>
      <Box className={styles.sidebarContent}>
        <ScrollArea h="100%">
          <ul className={styles.sidebarList}>
            {chatSidebarData.map((item) => {
              return (
                <li className={styles.sidebarListItem}>
                  <Group gap={16}>
                    <Avatar
                      src={item?.avatar}
                      radius="xl"
                      size={48}
                    />

                    <div style={{ flex: 1 }}>
                      <Box className={styles.userName}>
                        {item?.name}
                      </Box>

                      <Box className={styles.userMsg}>
                        {item?.message}
                      </Box>
                    </div>
                  </Group>
                  <Box className={styles.userTime}>{item?.time}</Box>
                </li>
              )
            })}

          </ul>
        </ScrollArea>
      </Box>

    </Box>
  )
}
