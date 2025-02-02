"use client";
import React, { useState, useEffect } from "react";
import {
  Flex, Text, Title, Anchor, Rating, Button, Box,
  Loader, Card, Grid, Image, AspectRatio,Group
} from "@mantine/core";
import Link from "next/link";
import { getCompares } from "@/services/comparison";

const ComparisonProducts = ({ title, type }) => {
  const [state, setState] = useState({
    data: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true }));
        const result = await getCompares({ type });

        console.log("result", result);
        setState({ data: result, loading: false, error: null });
      } catch (error) {
        console.error("Error fetching comparisons:", error);
        setState({ 
          data: [], 
          loading: false, 
          error: error.message || 'Failed to load comparisons' 
        });
      }
    };

    fetchData();
  }, [type]);

  // Loading state
  if (state.loading) {
    return (
      <Box component="section" className="comparison-products bg-light py-5">
        <Box className="container-xl">
          <Flex justify="center" align="center" h={300}>
            <Loader color="red" size="lg" />
          </Flex>
        </Box>
      </Box>
    );
  }

  // Error state
  if (state.error) {
    return (
      <Box component="section" className="comparison-products bg-light py-5">
        <Box className="container-xl">
          <Flex direction="column" justify="center" align="center" h={300} gap="md">
            <Text c="red" size="lg">Failed to load comparisons</Text>
            <Button 
              variant="outline" 
              color="red"
              onClick={() => setState(prev => ({ ...prev, loading: true }))}
            >
              Retry
            </Button>
          </Flex>
        </Box>
      </Box>
    );
  }

  // Empty state
  if (!state.data?.length) {
    return (
      <Box component="section" className="comparison-products bg-light py-5">
        <Box className="container-xl">
          <Flex direction="column" justify="center" align="center" h={300}>
            <Text size="lg">No comparisons available</Text>
          </Flex>
        </Box>
      </Box>
    );
  }

  // Success state
  return (
    <Box component="section" className="comparison-products bg-light py-5">
      <Box className="container-xl">
        <Box className="row">
          <Box className="col">
            <Flex justify="space-between" align="center" mb="xl">
              {title ? (
                <Title order={2} lts={-0.5}>{title}</Title>
              ) : (
                <Title order={2} lts={-0.5}>
                  Top <Text span c="#E90808" inherit>Comparison</Text>
                </Title>
              )}
              <Anchor component={Link} href="/compare" c="#E90808">
                Show all Comparison
              </Anchor>
            </Flex>
          </Box>
          <Box className="col-lg-12">
            <Box className="row">
              {state?.data?.map((pair, idx) => (
                <ComparisonCard key={idx} pair={pair} />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

// Extracted card component for better organization
const ComparisonCard = ({ pair }) => (
  <Box className="col-lg-4 col-sm-6">
    <Card className="card comparison-card position-relative">
      <Card.Section mb="md" withBorder>
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
    </Card>
  </Box>
);

export default ComparisonProducts;
