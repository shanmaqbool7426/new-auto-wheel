import { Box,Title, Text, Flex, Anchor } from '@mantine/core';
import VideoCard from '@/components/videos/video-card';
import Link from 'next/link';

const CategoryVideos = ({ category ,breadcrumb}) => {
  const VideosTitle = breadcrumb?breadcrumb[0]?.title:'';
  if (!category?.videos || category?.videos?.length === 0) {
    return (
      <Text align="center" c="dimmed">
        No videos available.
      </Text>
    );
  }

  return (
    <Box className="row">
      <Flex justify="space-between" align="center" mb="xl">
      <Title order={2} mb="lg">
        {category.category||VideosTitle||''}
      </Title>
      {category.categorySlug && 
      <Anchor component={Link} href={`/videos/${category.categorySlug}`} c="#E90808">
        View all
      </Anchor>
      }
      </Flex>
      <Box className="row row-gap-3">
        {category.videos.map((video) => (
          <Box className="col-md-4" key={video._id}>
            <VideoCard video={video} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CategoryVideos;
