"use client";
import {
  Anchor,
  Flex,
  Text,
  Title,
  Image,
  Center,
  Grid,
  Box,
  Paper,
  Card,
} from "@mantine/core";
import NextImage from "next/image";
import { Carousel } from '@mantine/carousel';
import Link from "next/link";
import React from "react";
import styles from './BrowseByCategory.module.css'

const BrowseByCategory = ({ makes, bodies, type, isNew }) => {
  // Helper function to generate the correct URL
  const getMakeUrl = (make) => {
    return isNew 
      ? `/new-${type}s/${make.toLowerCase()}`  // Format: /new-cars/make/Honda
      : `/listing/cars/search/-/mk_${make}?view=list`; // Regular format
  };

  const getBodyUrl = (bodyType) => {
    return isNew
      ? `/new-${type}s/${bodyType.toLowerCase()}`  // Format: /new-cars/body/suv
      : `/listing/cars/search/-/bt_${bodyType.toLowerCase()}?view=list`; // Regular format
  };

  // Updated carousel configuration
  const carouselProps = {
    slideSize: '25%',
    slideGap: 'md',
    align: 'start',
    slidesToScroll: 3,
    withControls: true,
    withIndicators: true,
    loop: true, // Enable infinite loop
    dragFree: true, // Enables free-form dragging
    speed: 0.5, // Smooth transition speed
    breakpoints: [
      { maxWidth: 'md', slideSize: '50%', slidesToScroll: 2 },
      { maxWidth: 'sm', slideSize: '100%', slidesToScroll: 1 },
    ],
    classNames: {
      indicator: styles.indicator,
      indicators: styles.indicators,
      controls: styles.controls,
      control: styles.control,
    },
  };

  // Helper function to chunk array
  const chunkArray = (array, size) => {
    if (!array) return [];
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  // Helper function to repeat array for infinite scroll effect
  const repeatArray = (array, count) => {
    if (!array || array.length === 0) return [];
    return Array(count).fill([...array]).flat();
  };

  return (
    <Box className="browse-cats-section bg-light" pt="55px" pb="55px">
      <Box className="container-xl">
        <Box className="row">
          {/* Makes Section */}
          <Box className="col-lg-6">
            <Flex justify="space-between" align="center" mb="10px">
              <Title order={2} lts={-0.5} className={styles.browseByHeading}>
                Browse by{" "}
                <Text span c="#E90808" inherit className="text-decoration-underline">
                  Make
                </Text>
              </Title>
            </Flex>
            <Box className="cat-by-brand">
              <Carousel {...carouselProps}>
                {makes?.data && makes.data.length > 0 ? (
                  // Repeat the makes array 3 times for smooth infinite scroll
                  chunkArray(repeatArray(makes.data, 3), 2).map((group, groupIndex) => (
                    <Carousel.Slide key={groupIndex}>
                      <Flex direction="column" gap="md">
                        {group.map((item, index) => (
                          <Box 
                            key={`${groupIndex}-${index}`} 
                            className="text-center" 
                            py="15px"
                          >
                            <Anchor
                              href={getMakeUrl(item.name)}
                              td="none"
                              className={styles.browseItem}
                            >
                              <NextImage
                                width={70}
                                height={60}
                                src={item.companyImage}
                                alt={item.name}
                              />
                              <Title order={6} lts={-0.4} mt="sm" fw={400}>
                                {item.name}
                              </Title>
                            </Anchor>
                          </Box>
                        ))}
                      </Flex>
                    </Carousel.Slide>
                  ))
                ) : (
                  <Text>No makes available</Text>
                )}
              </Carousel>
            </Box>
          </Box>

          {/* Bodies Section */}
          <Box className="col-lg-6 ps-5">
            <Flex justify="space-between" align="center" mb="10px">
              <Title order={2} lts={-0.5} className={styles.browseByHeading}>
                Browse by{" "}
                <Text span c="#E90808" inherit className="text-decoration-underline">
                  Body
                </Text>
              </Title>
            </Flex>
            <Box className="cat-by-brand cat-by-body">
              <Carousel {...carouselProps}>
                {bodies?.data && chunkArray(repeatArray(bodies.data, 3), 2).map((group, groupIndex) => (
                  <Carousel.Slide key={groupIndex}>
                    <Flex direction="column" gap="md">
                      {group.map((body, index) => (
                        <Box 
                          key={`${groupIndex}-${index}`} 
                          className="text-center" 
                          py="15px"
                        >
                          <Anchor
                            href={getBodyUrl(body.title)}
                            td="none"
                            className={styles.browseItem}
                          >
                            <NextImage
                              width={108}
                              height={50}
                              mx="auto"
                              src={body.bodyImage}
                              alt={body.title}
                            />
                            <Title order={6} lts={-0.4} mt="sm" fw={400}>
                              {body.title}
                            </Title>
                          </Anchor>
                        </Box>
                      ))}
                    </Flex>
                  </Carousel.Slide>
                ))}
              </Carousel>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BrowseByCategory;