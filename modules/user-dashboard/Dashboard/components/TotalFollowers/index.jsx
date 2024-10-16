import React from 'react';
import { Box, Avatar } from '@mantine/core';
import styles from './TotalFollowers.module.css';
import { todaysFollowers } from './data';

export default function TotalFollowers() {
  return (
    <Box className={styles.card}>
      <Box>
        <Box className={styles.totalFollowersTitle}>Total Followers</Box>
        <Box className={styles.followersCount}>345.9K</Box>
      </Box>
      <Box>
        <Box className={styles.todaysFollowers}>Today’s Followers</Box>
        <Box>
          <Avatar.Group>
            {todaysFollowers.slice(0, 5).map((follower) => (
              <Avatar
                key={follower.id}
                src={follower.src}
                size={24}
                color='#919191'
                variant="transparent"
                styles={{ root: { border: 'none' } }}
              ></Avatar>
            ))}
            {todaysFollowers.length > 5 && (
              <Avatar
                size={24}
                color='#919191'
                styles={{ root: { border: 'none' } }}
              >
                +{todaysFollowers.length - 5}
              </Avatar>
            )}
          </Avatar.Group>
        </Box>
      </Box>
    </Box>
  )
}
