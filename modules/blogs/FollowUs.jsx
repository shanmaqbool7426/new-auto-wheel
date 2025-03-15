"use client"
import React, { useEffect, useState } from 'react';
import { Card, Grid, Stack, Text, Title } from '@mantine/core';
import { FacebookCircle, YoutubeCircle, InstagramCircle } from "@/components/Icons";
import { fetchAPI } from '@/services/fetchAPI';


const YOUTUBE_API_KEY = "AIzaSyA6wG9RIgXNTN9Xs5_GxtFJUFW12pXmPYE";
const CHANNEL_ID = "UCgtwk5-YCUZfhQEdbfwdLYA";




const FollowUs = () => {
  const [subscribers,setSubscribers] =useState()

   const getYouTubeStats = async () => {
    try {
      const response = await fetchAPI(
        `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
      );
      setSubscribers(response.items[0]?.statistics?.subscriberCount)
    } catch (error) {
      console.error('Error fetching YouTube stats:', error);
      return 0;
    }
  };
  
  useEffect(() => {
    getYouTubeStats()
  }, [])


  
const socialMediaStats = [
  {
    icon: FacebookCircle,
    count: 563,
    label: "Fans",
  },
  {
    icon: YoutubeCircle,
    count: subscribers,
    label: "Subscribers",
  },
  {
    icon: InstagramCircle,
    count: 563,
    label: "Followers",
  },
];
  
  return (
    <Card
      shadow="0px 4px 20px 0px #00000014"
      padding="md"
      mb="lg"
      withBorder
      className="border-light"
    >
      <Title
        order={5}
        className="title-with-border"
        pb="xs"
        mb="xs"
        fz="14px"
      >
        Follow Us
      </Title>
      <Grid mt="md">
        {socialMediaStats.map(({ icon: Icon, count, label }, index) => (
          <Grid.Col key={index} span={4}>
            <Stack align="center" justify="center" gap="0">
              <Icon />
              <Text fz="12px" fw={700} mt="xs" c="#222222">
                {count}
              </Text>
              <Text fz="12px" size="sm" c="#222222">
                {label}
              </Text>
            </Stack>
          </Grid.Col>
        ))}
      </Grid>
    </Card>
  );
};

export default FollowUs;
