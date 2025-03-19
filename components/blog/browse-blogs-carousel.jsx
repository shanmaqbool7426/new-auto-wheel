"use client";
import { Box, Flex, Text, Title, Image, Grid } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Carousel } from "@mantine/carousel";
import { fetchBrowseBlogsServer, fetcSearchBlogsServer } from "@/actions/index";
import styles from "./browse-blogs-carousel.module.css"
// import Blocks from "editorjs-blocks-react-renderer";

const BrowseBlogCarousel = ({ type, title }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await fetcSearchBlogsServer({query:title, categories:'news'}); // Replace this with a real API call
        setNews(data?.blogs);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (news.length === 0) {
    return (
      <section className="news py-5 bg-light">
        <div className="container-xl">
          <Flex justify="space-between" align="center" mb="xl">
            <Title order={2}>
              {title}{" "}
              <Text span c="#E90808" inherit>
                News
              </Text>
            </Title>
          </Flex>
          <Text size="lg" align="center">
            No news to show
          </Text>
        </div>
      </section>
    );
  }

  return (
    <section className="news py-5 bg-light">
      <div className="container-xl">
        <Flex justify="space-between" align="center" mb="xl">
          <Title order={2}>
            {title}{" "}
            <Text span c="#E90808" inherit>
              News
            </Text>
          </Title>
        </Flex>

        <Carousel
          slideSize="25%"
          slideGap="md"
          align="start"
          controlsOffset="xs"
          withIndicators={false}
          controlSize={24}
          breakpoints={[
            { maxWidth: "lg", slideSize: "33.3333%" },
            { maxWidth: "sm", slideSize: "50%" },
            { maxWidth: "xs", slideSize: "100%" },
          ]}
          classNames={{ controls: styles.controls, control: styles.control }}
          >
          {news?.map((item) => (
            <Carousel.Slide key={item._id}>
              <div style={{width:'100%'}}>
              <Image
                src={item.imageUrl || "/default-image.jpg"}
                alt={item.title}
                radius="md"
                mb="md"
                h={160}
                w="100%"
              />
              <Title order={5} lineClamp={2} fw={600} mb="xs">
                {item.title}
              </Title>
              <Text size="sm" lineClamp={3} c="#878787">
                {/* {item.content.substring(0, 100)}... */}
                {/* <Blocks data={JSON.parse(item.content)} /> */}

              </Text>
              </div>
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default BrowseBlogCarousel;
