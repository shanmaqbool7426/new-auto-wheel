"use client";
import {
  Anchor,
  Flex,
  Text,
  Title,
  rem,
  Image,
  Overlay,
  Box,
  Paper,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { fetchBrowseBlogsServer } from "@/actions/index";
import { formatDate } from "@/utils/index";
import { useRouter } from "next/navigation";
import { convert } from "html-to-text";

const BrowseBlogs = ({ type }) => {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await fetchBrowseBlogsServer(type);
        setBlogs(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (blogs.length === 0) {
    return (
      <Box component="section" className="blogs py-5">
        <Box className="container-xl">
          <Flex justify="space-between" align="center" mb="xl">
            <Title order={2} lts={-0.5}>
              Our Latest{" "}
              <Text span c="#E90808" inherit>
                Blogs
              </Text>
            </Title>
            <Anchor component={Link} href="#" c="#E90808">
              Read all Blogs
            </Anchor>
          </Flex>
          <Text size="lg" align="center">
            No blogs to show
          </Text>
        </Box>
      </Box>
    );
  }

  const firstBlog = blogs[0];
  const remainingBlogs = blogs?.slice(1);

  return (
    <Box component="section" className="blogs py-5">
      <Box className="container-xl">
        <Flex justify="space-between" align="center" mb="xl">
          <Title order={2} lts={-0.5}>
            Our Latest{" "}
            <Text span c="#E90808" inherit>
              Blogs
            </Text>
          </Title>
          <Anchor component={Link} href={`/blog`} c="#E90808">
            Read all Blogs
          </Anchor>
        </Flex>
        <Box className="row">
          <Box className="col-lg-6">
            <Link href={`/blog/${firstBlog?.slug}`}>
              <Box
                component="figure"
                className="overflow-hidden position-relative"
              >
                <Image
                  src={firstBlog?.imageUrl}
                  alt={firstBlog?.title}
                  h={462}
                  radius={rem(5)}
                  className="img-fluid object-fit-cover"
                />
                <Overlay radius={rem(5)} color="#000" opacity={0.7} />
                <figcaption
                  className="position-absolute bottom-0 p-3 text-white"
                  style={{ zIndex: "200" }}
                >
                  <Anchor component={Title} order={3} fw={600} c="white" lineClamp={2}>
                    {firstBlog?.title}
                  </Anchor>
                </figcaption>
              </Box>
            </Link>
          </Box>
          <Box className="col-lg-6">
            {remainingBlogs.map((blog) => (
              <article className="mb-2" key={blog._id}>
                <Box className="row">
                  <Box className="col">
                    <Text c="dimmed" size="xs">
                      {formatDate(blog.publishDate)}
                    </Text>
                    <Title
                      my={5}
                      href={`/blog/${blog.slug}`}
                      component={Anchor}
                      order={6}
                      fw={600}
                      lineClamp={1}
                      c="#333"
                    >
                      {blog.title}
                    </Title>
                    <Text c="dimmed" size="sm" lineClamp={3} mb="0">
                      {convert(blog.content, {
                        wordwrap: 130,
                        selectors: [
                          { selector: "img", format: "skip" },
                          { selector: "a", options: { ignoreHref: true } },
                        ],
                      }).substring(0, 100)}
                      ...
                    </Text>
                    <Anchor c="#E90808" href={`/blog/${blog.slug}`} size="sm">
                      Read More <BsArrowRight />
                    </Anchor>
                  </Box>
                  <Box className="col-auto">
                    <Paper shadow="0px 4px 4px 0px #00000026;" pos="relative">
                      <Image
                        w={128}
                        h={100}
                        radius={rem(5)}
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="img-fluid object-fit-cover"
                      />
                      <Overlay radius={rem(5)} color="#000" opacity={0.2} />
                    </Paper>
                  </Box>
                </Box>
              </article>
            ))}
          </Box>
        </Box>
        {/* <Grid>
          <Grid.Col span={{ base: 12, md: 12, lg: 6 }}>
            <Box
              w="100%"
              h={{ base: 350, lg: "534px" }}
              className="position-relative"
              component={Link}
              href={`/blog/${firstBlog?.slug}`}
              pos="relative"
              style={{ overflow: "hidden" }}
            >
              <Overlay color="#000" backgroundOpacity={0.3} zIndex={0} />
              <BackgroundImage src={firstBlog?.imageUrl} radius="sm" h="100%">
                <Flex p="xl" w="100%" className="position-absolute bottom-0">
                  <Text fw={600} size={rem(24)} c="white">
                    {firstBlog?.title}
                  </Text>
                </Flex>
              </BackgroundImage>
            </Box>
          </Grid.Col>
          {remainingBlogs?.length > 0 && (
            <Grid.Col span={{ base: 12, md: 12, lg: 6 }}>
              {remainingBlogs.map((blog) => (
                <article className="article-inline mb-2" key={blog._id}>
                  <Grid justify="space-between" align="stretch">
                    <Grid.Col span={9}>
                      <Text c="dimmed" size="xs">
                        {formatDate(blog.publishDate)}
                      </Text>
                      <Title
                        my={5}
                        href={`/blog/${blog.slug}`}
                        component={Anchor}
                        order={6}
                        fw={600}
                        lineClamp={1}
                        c="#333"
                        className="text-decoration-none"
                      >
                        {blog.title}
                      </Title>
                      <Text c="dimmed" size="sm" lineClamp={3} mb="5">
                        {blog.content.replace(/<[^>]*>/g, '').substring(0, 100)}...
                      </Text>
                      <Anchor c="#E90808" href={`/blog/${blog.slug}`} size="sm">
                        Read More <BsArrowRight />
                      </Anchor>
                    </Grid.Col>
                    <Grid.Col span={3}>
                      <Image
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="img-fluid"
                      />
                    </Grid.Col>
                  </Grid>
                </article>
              ))}
            </Grid.Col>
          )}
        </Grid> */}
      </Box>
    </Box>
  );
};

export default BrowseBlogs;
