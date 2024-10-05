'use client';
import React from 'react';
import { Tabs } from '@mantine/core';
import Followers from './Followers';
import Following from './Following';
import useSocial from './useSocial';
import classes from './Social.module.css';

export default function Social() {
  const {
    activeTab,
    handleChangeTab,
  } = useSocial();

  return (
    <>
      <Tabs value={activeTab} onChange={handleChangeTab} color="#E90808" classNames={classes}>
        <Tabs.List>
          <Tabs.Tab value="followers">Followers</Tabs.Tab>
          <Tabs.Tab value="following">Following</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="followers">
          <Followers />
        </Tabs.Panel>
        <Tabs.Panel value="following">
          <Following />
        </Tabs.Panel>
      </Tabs>
    </>
  )
}
