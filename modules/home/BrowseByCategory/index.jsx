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
import Link from "next/link";
import React from "react";
import styles from './BrowseByCategory.module.css'

const BrowseByCategory = ({ makes, bodies }) => {
  return (
    <Box className="browse-cats-section bg-light" pt="55px" pb="25px">
      <Box className="container-xl">
        <Box className="row">
          <Box className="col-lg-6">
            <Flex justify="space-between" align="center" mb="10px">
              <Title order={2} lts={-0.5} className={styles.browseByHeading}>
                Browse by{" "}
                <Text
                  span
                  c="#E90808"
                  inherit
                  className="text-decoration-underline"
                >
                  Make
                </Text>
              </Title>
            </Flex>

            <Box className="cat-by-brand">
              <Box className="row">
                {makes?.data?.slice(0, 8).map((item, index) => {
                  return (
                    <Box className="col-sm-3 text-center" key={index} py="30px">
                      <Anchor href={`/new/car/${item.name}`} td="none" className={styles.browseItem}>
                        <NextImage
                          width={70}
                          height={60}
                          src={item.companyImage}
                        />
                        <Title order={6} lts={-0.4} mt="sm" fw={400}>
                          {item.name}
                        </Title>
                      </Anchor>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
          <Box className="col-lg-6 ps-5">
            <Flex justify="space-between" align="center" mb="10px">
              <Title order={2} lts={-0.5} className={styles.browseByHeading}>
                Browse by{" "}
                <Text
                  span
                  c="#E90808"
                  inherit
                  className="text-decoration-underline"
                >
                  Body
                </Text>
              </Title>
            </Flex>

            <Box className="cat-by-brand cat-by-body">
              <Box className="row">
                {bodies?.data?.map((body, index) => {
                  return (
                    <Box className="col-sm-3 text-center" key={index} py="30px">
                      <Anchor
                        href={`/listing/cars/search/-/bt_${body?.name?.toLowerCase()}`}
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
                          {body.name}
                        </Title>
                      </Anchor>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BrowseByCategory;
