'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  AppShell,
  Burger,
  Group,
  Skeleton,
  Text,
  ScrollArea,
  Box,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import styles from '../../components/user-dashboard/Layout/Layout.module.css';
import NavMenu from '../../components/user-dashboard/Layout/components/NavMenu';
import Header from '../../components/user-dashboard/Layout/components/Header';

export default function Layout({ children }) {
  const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell
      layout="alt"
      header={{ height: 80 }}
      navbar={{
        width: 248,
        p: 0,
        breakpoint: 'sm', collapsed: { mobile: !opened },
        padding: 0,
      }}
      padding={32}
      bg='#FDF8F8'
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Navbar p={0}>
        <AppShell.Section>
          <Box className={styles.navbarHeader}>
            <Link href="/user" className={styles.logo}>
              <Image
                src="/logo.png"
                alt="Logo"
                width={163}
                height={27}
              />
            </Link>
            <Burger
              opened={opened}
              onClick={toggle}
              size={16}
              lineSize={2}
            // hiddenFrom="sm" size="sm"
            />
          </Box>
        </AppShell.Section>

        <AppShell.Section grow component={ScrollArea}>
          <NavMenu />
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  )
}
