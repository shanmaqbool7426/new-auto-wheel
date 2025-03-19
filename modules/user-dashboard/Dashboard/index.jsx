'use client';
import React, { useEffect, useState } from 'react'
import { Grid } from '@mantine/core';
import OverView from './components/Overview';
// import OverallAnalytics from './components/OverallAnalytics';
import TopPerformingPost from './components/TopPerformingPost';
// import LocationBaseUser from './components/LocationBaseUser';
import UserReviews from './components/UserReviews';
import LatestNotificationPost from './components/LatestNotificationPost';
import TotalFollowers from './components/TotalFollowers';
import { fetchUserDasboardOverview } from "@/actions/index";
import { useSession } from 'next-auth/react';
export default function Dashboard() {
  const [overview, setOverview] = useState({});
  const { data: session } = useSession();
  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.token?.token) {
        try {
          const data = await fetchUserDasboardOverview(session?.user?.token?.token);
          setOverview(data);
        } catch (err) {
          console.error("Error fetching comparisons:", err);
        }
      }
    };

    fetchData();
  }, [session]);
  return (
    <>
      <Grid gutter={24}>
        <Grid.Col span={12}>
          <OverView data={overview}/>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
          {/* <OverallAnalytics data={overview}/> */}
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
          <TopPerformingPost />
        </Grid.Col>
        <Grid.Col span={12}>
          {/* <LocationBaseUser /> */}
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
