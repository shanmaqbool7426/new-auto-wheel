'use client';
import { Box, Title, Text, Flex, Anchor, Grid } from '@mantine/core';
import VideoCard from '@/components/videos/video-card';
import Link from 'next/link';

const CategoryVideos = ({ category, breadcrumb }) => {
  const VideosTitle = breadcrumb ? breadcrumb[0]?.title : '';
  if (!category?.videos || category?.videos?.length === 0) {
    return (
      <Text align="center" c="dimmed">
        No videos available.
      </Text>
    );
  }

  return (
    <>
      <Flex justify="space-between" align="center" mb="xl">
        <Title order={2}>
          {category.category || VideosTitle || ''}
        </Title>
        {category.categorySlug &&
          <Anchor component={Link} href={`/videos/${category.categorySlug}`} c="#E90808">
            View all
          </Anchor>
        }
      </Flex>
      <Grid gutter="22px">
        {category.videos.map((video) => (
          <Grid.Col key={video._id} span={{ base: 6, xs: 6, sm: 4 }}>
            <VideoCard video={video} />
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
};

export default CategoryVideos;
