'use client';
import React from 'react';
import Image from 'next/image';
import { Box, Title, Switch } from '@mantine/core';
import Card from '@/components/user-dashboard/Card';
import useConnectedAccount from './useConnectedAccount';
import styles from './ConnectedAccount.module.css';
import { IconPlus, IconStarFilled, IconCalendarMonth } from '@tabler/icons-react';



export default function ConnectedAccount() {

  const {

  } = useConnectedAccount();

  return (
    <Card noContentPadding>
      <Box className={styles.card}>
        <Box className={styles.header}>
          <Title
            className={styles.title}
            order={3}
            align="center"
          >
            Connected Account
          </Title>
        </Box>
        <Box className={styles.privacyPolicy}>
          By connecting an account, you hereby agree to our <span className={styles.redText}>privacy policy</span>
        </Box>

        <ul className={styles.socialPlatform}>
          <li className={styles.planFeature}>
            <Box className={styles.accountDetail}>
              <Box className={styles.socialIcon}>
                <Image
                  src="/icons/icon-google.png"
                  alt="Profile"
                  width={24}
                  height={24}
                />
              </Box>
              <Box>
                <Box className={styles.socialAccountName}>Google</Box>
                <Box className={styles.signinToweb}>Sign into Website</Box>
              </Box>
            </Box>
            <Box className={styles.socialAccountActive}>
              <Switch
                size='xs'
                defaultChecked
              />
            </Box>
          </li>

          <li className={styles.planFeature}>
            <Box className={styles.accountDetail}>
              <Box className={styles.socialIcon}>
                <Image
                  src="/icons/icon-facebook.png"
                  alt="Profile"
                  width={24}
                  height={24}
                />
              </Box>
              <Box>
                <Box className={styles.socialAccountName}>Facebook</Box>
                <Box className={styles.signinToweb}>Sign into Website</Box>
              </Box>
            </Box>
            <Box className={styles.socialAccountActive}>
              <Switch
                size='xs'
                defaultChecked
              />
            </Box>
          </li>

          <li className={styles.planFeature}>
            <Box className={styles.accountDetail}>
              <Box className={styles.socialIcon}>
                <Image
                  src="/icons/icon-apple.png"
                  alt="Profile"
                  width={24}
                  height={24}
                />
              </Box>
              <Box>
                <Box className={styles.socialAccountName}>Apple</Box>
                <Box className={styles.signinToweb}>Sign into Website</Box>
              </Box>
            </Box>
            <Box className={styles.socialAccountActive}>
              <Switch
                size='xs'
                defaultChecked
              />
            </Box>
          </li>

          <li className={styles.planFeature}>
            <Box className={styles.accountDetail}>
              <Box className={styles.socialIcon}>
                <Image
                  src="/icons/icon-mail.png"
                  alt="Profile"
                  width={24}
                  height={24}
                />
              </Box>
              <Box>
                <Box className={styles.socialAccountName}>Mail</Box>
                <Box className={styles.signinToweb}>Sign into Website</Box>
              </Box>
            </Box>
            <Box className={styles.socialAccountActive}>
              <Switch
                size='xs'
                defaultChecked={false}
              />
            </Box>
          </li>
        </ul>

      </Box>
    </Card >
  )
}
