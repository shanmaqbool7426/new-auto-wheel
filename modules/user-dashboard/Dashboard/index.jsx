'use client';
import React from 'react'
import { Grid } from '@mantine/core';
import OverView from './components/Overview';
import OverallAnalytics from './components/OverallAnalytics';
import TopPerformingPost from './components/TopPerformingPost';
import LocationBaseUser from './components/LocationBaseUser';
import UserReviews from './components/UserReviews';
import LatestNotificationPost from './components/LatestNotificationPost';
import TotalFollowers from './components/TotalFollowers';

export default function Dashboard() {
  return (
    <>
      <Grid gutter={24}>
        <Grid.Col span={12}>
          <OverView />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
          <OverallAnalytics />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
          <TopPerformingPost />
        </Grid.Col>
        <Grid.Col span={12}>
          <LocationBaseUser />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
          <UserReviews />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
          <LatestNotificationPost />
        </Grid.Col>
        <Grid.Col span={12}>
          <TotalFollowers />
        </Grid.Col>
      </Grid>
    </>
  )
}
