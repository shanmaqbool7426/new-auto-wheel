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
} from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ComparisonProducts = ({ title }) => {
  return (
    <section className="comparison-products bg-light py-5">
      <div className="container-xl">
        <div className="row">
          <div className="col">
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

              <Anchor component={Link} href="#" c="#E90808">
                Show all Comparison
              </Anchor>
            </Flex>
          </div>
          <div className="col-lg-12">
            <div className="row">
              {[1, 2, 3, 4, 5, 6].map((_, index) => {
                return (
                  <>
                    <div className="col-lg-4 col-sm-6" key={index}>
                      <div className="card comparison-card">
                        <div className="two-col-comparison position-relative">
                          <div className="product-compare product-first justify-content-start">
                            <Image
                              src="/compare/compare-product.png"
                              width={143}
                              height={88}
                              className="img-fluid"
                            />
                          </div>
                          <span className="compare-txt">VS</span>
                          <div className="product-compare product-second justify-content-end">
                            <Image
                              src="/compare/compare-2.png"
                              width={143}
                              height={88}
                              className="img-fluid"
                            />
                          </div>
                        </div>
                        <div className="card-body">
                          <Flex direction="column" justify="space-between">
                            <Group
                              wrap="nowrap"
                              className="car-compare-info text-center"
                              mb="lg"
                            >
                              <Flex direction="column" gap="5">
                                <Title ff="text" size={rem(14)} fw={500}>
                                  2016 Ford Escape Cape
                                </Title>
                                <Flex align="center" justify="center" gap={5}>
                                  <Rating defaultValue={2} />
                                  (4/5)
                                </Flex>
                              </Flex>
                              <Flex direction="column" gap="5">
                                <Title ff="text" size={rem(14)} fw={500}>
                                  2016 Ford Escape Cape
                                </Title>
                                <Flex align="center" justify="center" gap={5}>
                                  <Rating defaultValue={2} />
                                  (4/5)
                                </Flex>
                              </Flex>
                            </Group>

                            <Button
                              variant="outline"
                              color="#E90808"
                              fullWidth
                              size="md"
                            >
                              <Text span inherit ff="heading" fw={500}>
                                Compare
                              </Text>
                            </Button>
                          </Flex>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonProducts;
