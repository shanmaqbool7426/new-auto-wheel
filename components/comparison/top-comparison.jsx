"use client";
import {
  Flex,
  Text,
  Title,
  Anchor,
  Rating,
  Button,
  Group,
  Loader,
  Alert,
  Box
} from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { fetchTopComparisonByTypeServer } from "@/actions/index"; // Adjust the import path as needed

const TopComparison = ({ title, type }) => {
  const [comparisons, setComparisons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchComparisons = async () => {
      try {
        const data = await fetchTopComparisonByTypeServer(type);

        setComparisons(data); // Adjust based on your API response structure
      } catch (err) {
        console.error("Error fetching comparisons:", err);
        setError("Failed to load comparisons. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchComparisons();
  }, [type]);

  if (loading) {
    return (
      <Box component="section" className="comparison-products py-5" bg="#F3F3F3">
        <div className="container-xl">
          <Flex justify="center" align="center" direction="column" gap="md">
            <Loader />
            <Text>Loading comparisons...</Text>
          </Flex>
        </div>
      </Box>
    );
  }

  if (error) {
    return (
      <Box component="section" className="comparison-products py-5" bg="#F3F3F3">
        <div className="container-xl">
          <Alert title="Error" color="red">
            {error}
          </Alert>
        </div>
      </Box>
    );
  }

  if (comparisons?.data?.length === 0 || !comparisons?.data) {
    return (
      <Box component="section" className="comparison-products py-5" bg="#F3F3F3">
        <div className="container-xl">
          <Flex justify="space-between" align="center" mb="xl">
            {title ? (
              <Title order={2} lts={-0.5}>
                {title}
              </Title>
            ) : (
              <Title order={2} lts={-0.5}>
                Top{" "}
                <Text span color="#E90808" inherit>
                  Comparison
                </Text>
              </Title>
            )}

            {/* <Anchor component={Link} href="#" color="#E90808">
              Show all Comparisons
            </Anchor> */}
          </Flex>
          <Text size="lg" align="center">
            No comparisons to show
          </Text>
        </div>
      </Box>
    );
  }


  return (
    <section className="comparison-products bg-light py-5">
      <div className="container-xl">
        <Flex justify="space-between" align="center" mb="xl">
          {title ? (
            <Title order={2} lts={-0.5}>
              {title}
            </Title>
          ) : (
            <Title order={2} lts={-0.5}>
              Top{" "}
              <Text span color="#E90808" inherit>
                Comparison
              </Text>
            </Title>
          )}
        </Flex>
        <div className="row">
          {comparisons?.data?.map((comparison, index) => (
            <Box className="col-lg-4" key={index}>
              <Box className="card comparison-card">
                <Box className="two-col-comparison position-relative h-100">
                  <Box className="product-compare product-first justify-content-start" h={100}>
                    <Image
                      src={comparison.vehicle1.defaultImage || ""}
                      width={143}
                      height={88}
                      className="img-fluid object-fit-cover"
                    // alt={`${comparison.vehicle1.make} ${comparison.vehicle1.model}`}
                    />
                  </Box>
                  <span className="compare-txt">VS</span>
                  <Box className="product-compare product-second justify-content-end" h={100}>
                    <Image
                      src={comparison.vehicle2.defaultImage || ""}
                      width={143}
                      height={88}
                      className="img-fluid object-fit-cover"
                    // alt={`${comparison.vehicle2.make} ${comparison.vehicle2.model}`}
                    />
                  </Box>
                </Box>
                <Box className="card-body">
                  <Group justify="space-between">
                    <Flex direction="column" gap="5">
                      <Title order={6} fw={600}>
                        {`${comparison.vehicle1.make} ${comparison.vehicle1.model} (${comparison.vehicle1.year})`}
                      </Title>
                      <Flex align="center" justify="center" gap={5}>
                        <Rating
                          value={comparison.vehicle1.averageRating || 0}
                          fractions={2}
                          readOnly
                        />
                        ({comparison.vehicle1.reviewCount || 0})
                      </Flex>
                    </Flex>
                    <Flex direction="column" gap="5">
                      <Title order={6} fw={600}>
                        {`${comparison.vehicle2.make} ${comparison.vehicle2.model} (${comparison.vehicle2.year})`}
                      </Title>
                      <Flex align="center" justify="center" gap={5}>
                        <Rating
                          value={comparison.vehicle2.averageRating || 0}
                          fractions={2}
                          readOnly
                        />
                        ({comparison.vehicle2.reviewCount || 0})
                      </Flex>
                    </Flex>
                    <Button
                      variant="outline"
                      color="#E90808"
                      fullWidth
                      size="md"
                      component={Link}
                      href={`/comparison/${type}/${comparison.vehicle1.make}-${comparison.vehicle1.model}-${comparison.vehicle1.variant}_${comparison.vehicle2.make}-${comparison.vehicle2.model}-${comparison.vehicle2.variant}`}
                    >
                      Compare
                    </Button>
                  </Group>
                </Box>
              </Box>
            </Box>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopComparison;
