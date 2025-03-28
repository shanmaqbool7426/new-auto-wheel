
import React from 'react';
import { Box, Group, Progress, ActionIcon, UnstyledButton, Avatar, Text, Menu } from '@mantine/core';
import styles from './Header.module.css';
import Search from '@/components/user-dashboard/Search';
import { IconCog, IconNotification } from './icons';
import useHeader from './useHeader';
import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/reducers/authSlice';

export default function Header() {
  const currentUser = useSelector(selectCurrentUser);

  const {
    isNotification,
    title,
  } = useHeader();

  console.log("currentUser>>>>>>>",currentUser)
  const { data: session, status } = useSession();
  return (
    <Box className={styles.header}>
      <Box className={styles.headerLeft}>
        <Box className={styles.pageTitle}>{title}</Box>
      </Box>

      <Box className={styles.headerRight}>
        <Group justify='end' gap={20}>
          {/* Search */}
          {/* <Box className={styles.searchbar}>
            <Search />
          </Box> */}

          {/* Progress bar */}
          {/* <Box className={styles.progressbar}>
            <Box className={styles.progressField}>
              <Box className={styles.progressLabel}>Complete Profile</Box>
              <Box className={styles.progressValue}>70%</Box>
            </Box>
            <Progress color="#E90808" size="sm" value={70} />
          </Box> */}

          {/* <ActionIcon variant="transparent">
            <IconCog />
          </ActionIcon> */}

          <ActionIcon variant="transparent">
            <IconNotification alert={isNotification ? '#E90808' : 'transparent'} />
          </ActionIcon>

          <Menu shadow="md" width={160} position="bottom-end">
            <Menu.Target>
              <UnstyledButton>
                <Group gap={8}>
                  <Avatar
                    src={currentUser?.profileImage??"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                    radius="xl"
                    size={45}
                    variant='outline'
                    color='#E90808'
                  />

                  <div style={{ flex: 1 }}>
                    <Box className={styles.userName}>
                    {currentUser?.fullName}
                    </Box>

                    <Box className={styles.userEmail}>
                    {currentUser?.email}
                    </Box>
                  </div>
                </Group>
              </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item>Change Password</Menu.Item>
              <Menu.Item>Profile Settings</Menu.Item>
              <Menu.Item>Logout</Menu.Item>
            </Menu.Dropdown>
          </Menu>



        </Group>
      </Box>
    </Box>
  )
}
