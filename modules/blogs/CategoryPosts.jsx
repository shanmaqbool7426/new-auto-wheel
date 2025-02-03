"use client";

import React from 'react';
import { Box, Card, Flex, Image, Title, Text, Badge } from '@mantine/core';
import { formatDate } from '@/utils/index';
import Link from 'next/link';

const CategoryPosts = ({ category }) => {
  if (!category?.blogs || category?.blogs?.length === 0) {
    return (
      <Text align="center" c="dimmed">
        No posts available in this category.
      </Text>
    );
  }

  return (
    <Box className="row">
      <Title order={2} mb="32px" lh="1">
        {category.category}
      </Title>

      <Box className="row">
        {category.blogs.map((blog) => (
          <Box className="col-md-3" key={blog._id}>
            <Card padding="none" mb="xl">
              <Card.Section className="position-relative">
                <Link href={`/blog/${category.slug}`}>
                  <Badge
                    bg="#E90808"
                    c="white"
                    radius="sm"
                    size="lg"
                    fw={"normal"}
                    className="position-absolute bottom-0"
                    fz="11px"
                  >
                    {category.category}
                  </Badge>
                </Link>
                <Image
                  src={blog.imageUrl || "/blogs/img-large.png"}
                  alt={blog.title}
                  radius="md"
                  height={133}
                />
              </Card.Section>
              <Link href={`/blog/${category.slug}`} className='text-decoration-none text-black'>
                <Title order={5} fw={700} lineClamp={2} mt="md" fz="14px" lh="1.2857">
                  {blog.title}
                </Title>
              </Link>
              <Flex gap="sm" mt="5">
                <Text span fw={400} className="d-flex gap-1 align-items-center" fz="12px" lh="1" c="#878787">
                  {blog.author} <span className="dot"></span>
                </Text>
                <Text span fz="12px" lh="1" c="#878787">
                  {formatDate(blog.publishDate)}
                </Text>
              </Flex>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CategoryPosts;
