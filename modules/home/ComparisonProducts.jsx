"use client";

import {
  Flex,
  Text,
  Title,
  Anchor,
  Rating,
  Button,
  Group,
  Box,
  rem,
  Loader,
  Card,
  Grid,
  Divider,
  Image,
  AspectRatio,
  Avatar,
} from "@mantine/core";
import NextImage from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { getCompares } from "@/services/comparison";

const ComparisonProducts = ({ title, type }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCompares({ type: type });
        setData(result);
      } catch (error) {
        console.error("Error fetching comparisons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Flex justify="center" align="center" h={200}>
        <Loader color="red" />
      </Flex>
    );
  }

  return (
    <Box component="section" className="comparison-products bg-light py-5">
      <Box className="container-xl">
        <Box className="row">
          <Box className="col">
            <Flex justify="space-between" align="center" mb="xl">
              {title ? (
                <Title order={2} lts={-0.5}>
                  {title}
                </Title>
              ) : (
                <Title order={2} lts={-0.5}>
                  Top{" "}
                  <Text span c="#E90808" inherit>
                    Comparison
                  </Text>
                </Title>
              )}
              <Anchor component={Link} href="/compare" c="#E90808">
                Show all Comparison
              </Anchor>
            </Flex>
          </Box>
          <Box className="col-lg-12">
            <Box className="row">
              {data?.map((pair, idx) => (
                <Box className="col-lg-4 col-sm-6" key={idx}>
                  <Card className="card comparison-card position-relative">
                    <Card.Section mb="md" withBorder>
                      {/* className="two-col-comparison position-relative" */}
                      <Grid
                        grow
                        gutter={0}
                        justify="space-between"
                        align="center"
                        pos="relative"
                      >
                        {[pair.vehicle1, pair.vehicle2].map(
                          (vehicle, index) => (
                            <>
                              <Grid.Col
                                span="6"
                                key={vehicle._id}
                                ta="center"
                                className={` ${index === 0 && `border-end`}`}
                              >
                                <AspectRatio
                                  ratio={4 / 3}
                                  p={"md"}
                                  className={`compare-product`}
                                >
                                  <Image
                                    src={
                                      vehicle.defaultImage ||
                                      "/compare/compare-product.png"
                                    }
                                    fit="contain"
                                    alt={`${vehicle.make} ${vehicle.model}`}
                                    className="img-fluid"
                                  />
                                </AspectRatio>
                                {index === 0 && (
                                  <span className="compare-txt">VS</span>
                                )}
                              </Grid.Col>
                            </>
                          )
                        )}
                      </Grid>
                    </Card.Section>
                    {/* <Group
                        wrap="nowrap"
                        className="car-compare-info text-center"
                        mb="lg"
                        justify="space-between"
                      > */}
                    <Grid gutter="lg" grow justify="center" align="center">
                      {[pair.vehicle1, pair.vehicle2].map((vehicle) => (
                        <>
                          <Grid.Col span={6} ta={"center"}>
                            <Group gap={"xs"} align="center" justify="center">
                              <Text fw={600} size="sm">
                                {vehicle.year} {vehicle.make} {vehicle.model}
                              </Text>
                              <Rating
                                value={vehicle.averageRating || 0}
                                // value={vehicle.reviewCount || 0}
                                size="sm"
                                readOnly
                              />
                              <Text span size="sm">
                                ({vehicle.reviewCount || 0})
                              </Text>
                            </Group>
                          </Grid.Col>
                        </>
                      ))}
                      <Grid.Col span={12}>
                        <Button
                          variant="outline"
                          color="#E90808"
                          fullWidth
                          size="md"
                          component={Link}
                          href={`/comparison/${pair.vehicle1.type}/${[
                            pair.vehicle1,
                            pair.vehicle2,
                          ]
                            .map(
                              (vehicle) =>
                                `${vehicle.make}-${vehicle.model}${
                                  vehicle.variant ? "-" + vehicle.variant : ""
                                }`
                            )
                            .join("_")}`}
                        >
                          Compare
                        </Button>
                      </Grid.Col>
                    </Grid>
                    {/* </Group> */}
                  </Card>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ComparisonProducts;
