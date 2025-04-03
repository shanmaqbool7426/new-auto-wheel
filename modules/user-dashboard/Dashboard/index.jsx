'use client';
import React, { useEffect, useState } from 'react'
import { Grid } from '@mantine/core';
import OverView from './components/Overview';
// import OverallAnalytics from './components/OverallAnalytics';
import TopPerformingPost from './components/TopPerformingPost';
// import LocationBaseUser from './components/LocationBaseUser';
// import UserReviews from './components/UserReviews';
import LatestNotificationPost from './components/LatestNotificationPost';
import TotalFollowers from './components/TotalFollowers';
import { fetchUserDasboardOverview } from "@/actions/index";
import { useSession } from 'next-auth/react';
import { BASE_URL } from '@/constants/api-endpoints';
import viewTrackingService from '@/services/viewTrackingService';

export default function Dashboard() {
  const [overview, setOverview] = useState({});
  const [userProfile, setUserProfile] = useState(null);
  const [viewAnalytics, setViewAnalytics] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.token?.token) {
        try {

          
          // Fetch user profile data
          if (session?.user?._id) {
            try {
              const response = await fetch(`${BASE_URL}/api/user/profile/${session.user._id}`, {
                headers: {
                  'Authorization': `Bearer ${session.user.token.token}`
                }
              });
              console.log("response>",response)
              if (response.ok) {
                const profileData = await response.json();
                console.log('User profile data:', profileData);
                setUserProfile(profileData?.data);
              } else {
                console.error('Error fetching user profile:', response.statusText);
              }
            } catch (profileError) {
              console.error("Error fetching user profile:", profileError);
            }
            
            // Fetch view analytics data using the service
            try {
              const analyticsData = await viewTrackingService.getViewAnalytics();
              console.log('View analytics data:', analyticsData);
              setOverview(analyticsData);
              setViewAnalytics(analyticsData);
            } catch (analyticsError) {
              console.error("Error fetching view analytics:", analyticsError);
            }
          }
        } catch (err) {
          console.error("Error fetching comparisons:", err);
        }
      }
    };

    fetchData();
  }, [session]);


  console.log("userProfile", userProfile);
  console.log("viewAnalytics", viewAnalytics);
  
  return (
    <>
      <Grid gutter={24}>
        <Grid.Col span={12}>
          <OverView data={overview} userProfile={userProfile} viewAnalytics={viewAnalytics}/>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
          {/* <OverallAnalytics data={overview} viewAnalytics={viewAnalytics}/> */}
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
          <TopPerformingPost topVehicles={viewAnalytics?.topVehicles || []}/>
        </Grid.Col>
        <Grid.Col span={12}>
          {/* <LocationBaseUser viewAnalytics={viewAnalytics} /> */}
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
          {/* <UserReviews /> */}
        </Grid.Col>
        {/* <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
          <LatestNotificationPost />
        </Grid.Col> */}
        <Grid.Col span={12}>
          <TotalFollowers userProfile={userProfile}/>
        </Grid.Col>
      </Grid>
    </>
  )
}
