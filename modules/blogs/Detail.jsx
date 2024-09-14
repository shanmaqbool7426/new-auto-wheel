import React from "react";
import {Box,Text,Title,Image} from "@mantine/core";
import ReplyBlog from "@/components/blog/reply-blog"
import BlogDetailHtml from "@/components/blog/blog-detail-html";
const Detail = ({ blog }) => {
    return (
        <>
            <Title order={2} mb="lg">
                {blog?.title}
            </Title>
            {/* Main Post Image and description */}
            <Box className="article-large" component="article">
                <Image
                    mb="md"
                    src={blog?.imageUrl}
                    radius="md"
                    alt="Norway"
                    height={381}
                />
                <Text lineClamp={4} size="md">
                    {blog?.content}
                </Text>
            </Box>
            {/* Blog Detail Html */}
            <BlogDetailHtml/>
            {/* Reply Section */}
            <ReplyBlog blog={blog} />

        </>

    )
}

export default Detail
