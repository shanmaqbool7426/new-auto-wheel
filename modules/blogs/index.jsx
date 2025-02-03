'use client';
import React, { useState } from "react";
import Vehicles from "@/modules/blogs/Vehicles";
import { Box, Card, Title, Badge, Flex, Text } from "@mantine/core";
import { fetchTags } from "@/services/tags";
import { fetchBlogsPageData } from "@/services/blogs";
import PopularTags from "@/modules/blogs/PopularTags";
import FeatureGrid from "@/modules/blogs/FeatureGrid";
import FollowUs from "@/modules/blogs/FollowUs";
import PopularPosts from "@/modules/blogs/PopularPosts";
import Posts from "@/modules/blogs/Posts";
import TopCategory from "@/modules/blogs/TopCategory";
import CategoryPosts from "@/modules/blogs/CategoryPosts";
import BlogDetails from "@/modules/blogs/Detail";
import BrowseVideos from "@/components/videos/browse-videos";
import Image from "next/image";
import styles from "./blogs.module.css";
const BlogModule = async ({ params }) => {
  const [refresh, setRefresh] = useState(0);

  // Fetch data concurrently with refresh dependency
  const [tags, blogsData] = await Promise.all([
    fetchTags(),
    fetchBlogsPageData(params)
  ]);

  const handleRefresh = () => {
    setRefresh(prev => prev + 1);
  };

  const { data } = blogsData || {};
  const isBlogsPage = data?.type === 'blogs';
  const isSingleBlog = data?.type === 'blog';
  const filteredCategories = data?.categories?.filter(category => category.slug !== 'news') || [];
  const newsCategory = data?.categories?.find(category => category.slug === 'news');
  return (
    <Box component="section" className="blog-page" pt={100}>
      {/* Feature Grid Section */}
      {isBlogsPage && (
        <Box className="container-xl">
          <FeatureGrid items={data?.featurePosts} />
        </Box>
      )}

      {/* Recent Posts Section */}
      <section className={`recent-posts border-box ${styles.section}`}>
        <Box className="container-xl">
          <Box className="row">
            <Box className="col-md-8">
              {!isSingleBlog && (
                <Posts
                  title={isBlogsPage ? "Recent" : data?.category || data?.tag}
                  description={data?.description || ''}
                  posts={data?.blogs}
                  count={data?.count}
                />
              )}
              {
                isSingleBlog && (
                  <BlogDetails
                    blog={data?.blog}
                    comments={data?.comments}
                    onCommentSubmit={handleRefresh}
                  />
                )
              }
              {isBlogsPage && newsCategory && (
                <TopCategory category={newsCategory} />
              )}
            </Box>

            {/* Sidebar Section */}
            <Box className="col-md-4">
              <FollowUs />
              <PopularPosts posts={data?.blogs} />
              <PopularTags tags={tags} />
            </Box>
          </Box>
        </Box>

        <Box>
          {/* <section className="tips-section">
            <Box className="row">
              <Title order={2} mb="lg">
                Tips & Advice
              </Title>

              <Box className="row container">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => {
                  return (
                    <Box className="col-md-3 container" key={index}>
                      <Card padding="none" mb="xl">
                        <Card.Section className="position-relative">
                          <Badge
                            bg="#E90808"
                            c="white"
                            radius="sm"
                            size="lg"
                            className="position-absolute bottom-0"
                          >
                            GUIDES
                          </Badge>
                          <Image
                            src="/blogs/img-large.png"
                            alt="Norway"
                            width={300}
                            height={300}
                            radius="md"
                          />
                        </Card.Section>

                        <Title order={5} fw={600} lineClamp={2} mt="md">
                          Your Electric Motorcycles Care Guide
                        </Title>
                        <Flex gap="sm" mt="5">
                          <Text
                            span
                            fw={400}
                            className="d-flex gap-1 align-items-center"
                          >
                            Sulman Ali <span className="dot"></span>
                          </Text>
                          <Text span>Oct 23, 2023</Text>
                        </Flex>
                      </Card>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </section> */}
        </Box>
      </section>

      <Box className="container-xl">
        <Box className="border-bottom pt-5"></Box>
      </Box>

      {/* Additional Categories Section */}
      <Box component="section" className="category-section" pt="24px">
        <Box className="container-xl">
          {isBlogsPage && filteredCategories.map((category, index) => (
            <Box key={index} pt="20px">
              <CategoryPosts category={category} />
            </Box>
          ))}
        </Box>
      </Box>

      {/* Vehicles Section */}
      {isBlogsPage && <Vehicles />}

      <BrowseVideos type="car" />
    </Box>
  );
};

export default BlogModule;
