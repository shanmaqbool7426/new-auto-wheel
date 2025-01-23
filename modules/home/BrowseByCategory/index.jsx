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

const BrowseByCategory = ({ makes, bodies }) => {
  // Updated carousel configuration
  const carouselProps = {
    slideSize: '25%',
    slideGap: 'md',
    align: 'start',
    slidesToScroll: 2, // Changed to scroll 2 items at a time
    withControls: true,
    loop: true,
    breakpoints: [
      { maxWidth: 'md', slideSize: '50%', slidesToScroll: 2 },
      { maxWidth: 'sm', slideSize: '100%', slidesToScroll: 1 },
    ],
  };

  // Helper function to chunk array into groups of 2 (for 2 items per slide)
  const chunkArray = (array, size) => {
    if (!array) return [];
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  // Add debugging
  console.log("Makes data:", makes?.data);
  console.log("Chunked makes:", makes?.data ? chunkArray(makes.data, 2) : []);

  return (
    <Box className="browse-cats-section bg-light" pt="55px" pb="25px">
      <Box className="container-xl">
        <Box className="row">
          <Box className="col-lg-6">
            <Flex justify="space-between" align="center" mb="10px">
              <Title order={2} lts={-0.5} className={styles.browseByHeading}>
                Browse by{" "}
                <Text span c="#E90808" inherit className="text-decoration-underline">
                  Make 
                </Text>
              </Title>
{/* 
              <Anchor component={Link} href="#" c="#E90808" size="xs" lts={-0.4}>
                Show all Makes
              </Anchor> */}
            </Flex>

            <Box className="cat-by-brand">
              <Carousel {...carouselProps}>
                {makes?.data && makes.data.length > 0 ? (
                  chunkArray(makes.data, 2).map((group, groupIndex) => (
                    <Carousel.Slide key={groupIndex}>
                      <Flex direction="column" gap="md">
                        {group.map((item, index) => (
                          <Box key={index} className="text-center" py="15px">
                            <Anchor 
                              href={`/listing/cars/search/-/mk_${item.name}`} 
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

          <Box className="col-lg-6 ps-5">
            <Flex justify="space-between" align="center" mb="10px">
              <Title order={2} lts={-0.5} className={styles.browseByHeading}>
                Browse by{" "}
                <Text span c="#E90808" inherit className="text-decoration-underline">
                  Body
                </Text>
              </Title>
{/* 
              <Anchor component={Link} href="#" c="#E90808" size="xs" lts={-0.4}>
                Show all Bodies
              </Anchor> */}
            </Flex>

            <Box className="cat-by-brand cat-by-body">
              <Carousel {...carouselProps}>
                {bodies?.data && chunkArray(bodies.data, 2).map((group, groupIndex) => (
                  <Carousel.Slide key={groupIndex}>
                    <Flex direction="column" gap="md">
                      {group.map((body, index) => (
                        <Box key={index} className="text-center" py="15px">
                          <Anchor
                            href={`/listing/cars/search/-/bt_${body?.title?.toLowerCase()}`}
                            td="none"
                            className={styles.browseItem}
                          >
                            <NextImage 
                              width={108} 
                              height={50} 
                              mx="auto" 
                              src={body.bodyImage} 
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