'use client';

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
} from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { getCompares } from "@/services/comparison";
import { MdEdit, MdDelete } from "react-icons/md";

const ComparisonProducts = ({ title,type }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCompares({type: type});
        setData(result);
      } catch (error) {
        console.error('Error fetching comparisons:', error);
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
    <section className="comparison-products bg-light py-5">
      <div className="container-xl">
        <div className="row">
          <div className="col">
            <Flex justify="space-between" align="center" mb="xl">
              {title ? (
                <Title order={2} lts={-0.5}>{title}</Title>
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
          </div>
          <div className="col-lg-12">
            <div className="row">
              { data?.length >0 && data?.map((pair, idx) => (
                <div className="col-lg-4 col-sm-6" key={idx}>
                  <div className="card comparison-card position-relative">
                    <div className="two-col-comparison position-relative">
                      {[pair.vehicle1, pair.vehicle2].map((vehicle, index) => (
                        <React.Fragment key={vehicle._id}>
                          <div
                            className={`product-compare ${
                              index === 0
                                ? "product-first justify-content-start"
                                : "product-second justify-content-end"
                            }`}
                          >
                            <Image
                              src={vehicle.defaultImage || "/compare/compare-product.png"}
                              width={120}
                              height={80}
                              alt={`${vehicle.make} ${vehicle.model}`}
                              className="img-fluid"
                            />
                          </div>
                          {index === 0 && <span className="compare-txt">VS</span>}
                        </React.Fragment>
                      ))}
                    </div>
                    <div className="card-body">
                      <Flex direction="column" justify="space-between">
                        <Group
                          wrap="nowrap"
                          className="car-compare-info text-center"
                          mb="lg"
                          justify="space-between"
                        >
                          {[pair.vehicle1, pair.vehicle2].map((vehicle) => (
                            <Flex key={vehicle._id} direction="column" gap="xs">
                              <Title ff="text" size={rem(13)} fw={600}>
                                {vehicle.year} {vehicle.make} {vehicle.model}
                              </Title>
                              <Flex align="center" justify="center" gap={5}>
                                <Rating 
                                  value={vehicle.averageRating || 0} 
                                  size="sm" 
                                  readOnly 
                                />
                                <Text span size="sm">
                                  ({vehicle.reviewCount || 0})
                                </Text>
                              </Flex>
                            </Flex>
                          ))}
                        </Group>

                        <Button
                          variant="outline"
                          color="#E90808"
                          fullWidth
                          size="md"
                          component={Link}
                          href={`/comparison/${pair.vehicle1.type}/${[pair.vehicle1, pair.vehicle2].map(vehicle => 
                            `${vehicle.make}-${vehicle.model}${vehicle.variant ? '-' + vehicle.variant : ''}`
                          ).join('_')}`}
                        >
                          Compare
                        </Button>
                      </Flex>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonProducts;