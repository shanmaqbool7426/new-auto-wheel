'use client';
import React from 'react';
import { AppShell, Burger, Group, Skeleton, Text, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

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
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          Logo
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p={0}>
        <AppShell.Section>
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Text>Navbar</Text>
          </Group>
        </AppShell.Section>
        <AppShell.Section grow component={ScrollArea}>
          {Array(15)
            .fill(null)
            .map((_, index) => (
              <Skeleton key={index} h={28} mt="sm" animate={false} />
            ))}
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  )
}
