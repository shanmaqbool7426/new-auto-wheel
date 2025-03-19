"use client";

import { Box, Card, Flex, Image, Text, Title, Badge } from '@mantine/core';
import React from 'react';
import Link from "next/link"
import BlogPagination from "@/components/blog/pagination"
import { EyeIcon, ViewIcon } from '@/components/Icons';
import { formatDate } from '@/utils/index';
import parse from "html-react-parser";
import EditorRenderer from '@/components/EditorRenderer';


const Posts = ({ title, posts, count, description }) => {
    console.log("description", description)
    return (
        <>
            <Title order={2} mb="lg">
                {title}{" "}
                <Text span className="text-primary" inherit>
                    Posts
                </Text>
            </Title>
            {description && <Text className="mb-4" inherit>
                {description}
            </Text>}
            {posts?.length > 0 ? (posts.map((post) => (
                <Card
                    key={post._id}
                    shadow="none"
                    padding="none"
                    className="pb-4 mb-4 card-border-bottom"
                    radius="0"
                >
                    <Flex align="top" wrap={{ sm: "wrap", md: "nowrap" }}>
                        <Box
                            h={192}
                            w={300}
                            radius="md"
                            pos={"relative"}
                            style={{ cursor: 'pointer' }}
                            component={Link}
                            href={`/blog/${post.slug}`}
                        >
                            <Image
                                src={post.imageUrl || "/blogs/recent-placeholder.png"}
                                alt={post.title}
                                h={192}
                                w={300}
                                radius="5px"
                            />
                            {post?.categories[0]?.name &&
                                <Badge
                                    bg="#E90808"
                                    c="white"
                                    radius="sm"
                                    size="md"
                                    pos={"absolute"}
                                    className="bottom-0"
                                    fw="normal"
                                >
                                    {post.categories[0]?.name}
                                </Badge>
                            }
                        </Box>
                        <Flex gap="xs" direction="column" pl="17px">
                            <Title fw={600} order={4}>
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="text-decoration-none text-dark"
                                >
                                    {post.title}
                                </Link>
                            </Title>
                            <Flex
                                direction="row"
                                c="dimmed"
                                wrap={true}
                                justify="space-between"
                                align="center"
                            >
                                <Box className="left d-flex gap-2">
                                    <Text
                                        span
                                        size="sm"
                                        className="d-flex gap-1 align-items-center"
                                        fz="12px"
                                    >
                                        {post.author} <span className="dot"></span>
                                    </Text>
                                    <Text span size="sm" fz="12px">
                                        {formatDate(post.publishDate)}
                                    </Text>
                                </Box>
                                <Flex gap="md" align="center">
                                    <Text
                                        span
                                        className="d-flex gap-1 align-items-center"
                                        size="sm"
                                        fz="12px"
                                    >
                                        <EyeIcon />
                                        {post.viewCount}
                                    </Text>
                                    <Text
                                        span
                                        className="d-flex gap-1 align-items-center"
                                        size="sm"
                                        fz="12px"
                                    >
                                        <ViewIcon />
                                        {post?.commentCount}
                                    </Text>
                                </Flex>
                            </Flex>
                            <Text lineClamp={4} size="sm">
                                {/* {parse(post.content)} */}
                                <EditorRenderer data={JSON.parse(post?.content)}  />

                            </Text>
                        </Flex>
                    </Flex>
                </Card>

            ))
            ) : (
                <Text c="dimmed" align="center" mt="md">
                    No posts available.
                </Text>
            )}
            {posts?.length > 0 && <BlogPagination count={count} />}

        </>
    );
};

export default Posts;
