'use client';
import React from 'react';
import Image from 'next/image';
import { Box, Title, Group, Button } from '@mantine/core';
import Card from '@/components/user-dashboard/Card';
import useProfileInformation from './useProfileInformation';
import styles from './ProfileInformation.module.css';
import buttonStyles from '@/styles/user-dashboard/Button.module.css';

export default function ProfileInformation() {

  const {
    form,
    handleSubmit
  } = useProfileInformation();

  return (
    <Card noContentPadding>
      <Box className={styles.profileBanner}>
        <Image
          src="/user-profile/profile-banner.png"
          alt="Profile"
          width={354}
          height={140}
        />

        <Box className={styles.profilePicture}>
          <Image
            src="/user-profile/follower.png"
            alt="Profile"
            width={144}
            height={144}
          />
        </Box>
      </Box>
      <Box className={styles.profileInfoContent}>
        <Box className={styles.userPersonalDetails}>
          <Title
            className={styles.profileInfoTitle}
            order={3}
            align="center"
          >
            Albert Kart
          </Title>
          <Box className={styles.userEmail}>abc@gmail.com</Box>
          <Group justify="center" className={styles.followerGroup}>
            <Group gap='0'>
              <Box className={styles.userFollowers}>
                <Box>Followers</Box>
                <Box className={styles.followerCount}>1.8k</Box>
              </Box>
              <Box className={styles.userFollowers}>
                <Box>Following</Box>
                <Box className={styles.followerCount}>1.8k</Box>
              </Box>
            </Group>
          </Group>
          <Box className={styles.userStatus}>Active</Box>
        </Box>
        <Box className={styles.userContactDetials}>
          <Box className={styles.contactGroup}>
            <Box className={styles.contactLabel}>
              Phone No
            </Box>
            <Box className={styles.contactTitle}>
              +92 345 765 7645
            </Box>
          </Box>
          <Box className={styles.contactGroup}>
            <Box className={styles.contactLabel}>
              Address
            </Box>
            <Box className={styles.contactTitle}>
              +92 345 765 7645
            </Box>
          </Box>
          <Box className={styles.contactGroup}>
            <Box className={styles.contactLabel}>
              Timing
            </Box>
            <Box className={styles.contactTitle}>
              8:30Am - 5: 30 Pm (Mon - Fri)
            </Box>
          </Box>
          <Box className={styles.contactGroup}>
            <Box className={styles.contactLabel}>
              Last Login
            </Box>
            <Box className={styles.contactTitle}>
              26 March 2024, 8:57 Pm
            </Box>
          </Box>

          <Box className={buttonStyles.holder} style={{ marginTop: '24px' }}>
            <Button
              radius="20px"
              color='#E90808'
              fullWidth
              classNames={{
                root: buttonStyles.root,
              }}
            >
              Delete Account
            </Button>
          </Box>
        </Box>
      </Box>
    </Card>
  )
}
