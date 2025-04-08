"use client";
import React from "react";
import { Box, Text, Title, Image, Flex } from "@mantine/core";
import ReplyBlog from "@/components/blog/reply-blog";
import BlogDetailHtml from "@/components/blog/blog-detail-html";
import BlogComments from "./BlogComments";
import { EyeIcon, ViewIcon } from "@/components/Icons";
import { formatDate } from "@/utils";
import dynamic from "next/dynamic";
import EditorRenderer from "@/components/EditorRenderer";


const Detail = ({ blog, comments, onCommentSubmit }) => {

  return (
    <>
      <Title order={2} mb="lg">
        {blog?.title}
      </Title>
      {/* Main Post Image and description */}
      <Box className="article-large" component="article">
        <Flex
          direction="row"
          c="dimmed"
          mb={6}
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
              {blog.author} <span className="dot"></span>
            </Text>
            <Text span size="sm" fz="12px">
              {formatDate(blog.publishDate)}
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
              {blog.viewCount}
            </Text>
            <Text
              span
              className="d-flex gap-1 align-items-center"
              size="sm"
              fz="12px"
            >
              <ViewIcon />
              {blog?.commentCount}
            </Text>
          </Flex>
        </Flex>
        <Image
          mb="md"
          src={blog?.imageUrl}
          radius="md"
          alt="Norway"
          height={381}
        />
        
        {/* <Text  size="md">
          <EditorRenderer data={JSON.parse(blog?.content)} />
        </Text> */}
      </Box>
      {/* Blog Detail Html */}  
      <BlogDetailHtml content={blog?.content} blog={blog} />
      {/* Comments */}
      <BlogComments blog={blog} comments={comments} />

      {/* Reply Section */}
      <ReplyBlog blog={blog} onCommentSubmit={onCommentSubmit} />
    </>
  );
};

export default Detail;