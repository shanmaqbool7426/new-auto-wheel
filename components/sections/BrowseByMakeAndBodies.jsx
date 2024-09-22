import { Anchor, Box, Flex, Text, Title } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import NextImage from "next/image";

const BrowseByMakeAndBodies = ({ makes, bodies }) => {
  return (
    <Box className="browse-cats-section py-5 bg-light">
      <Box className="container">
        <Box className="row">
          <Box className="col-lg-6">
            <Flex justify="space-between" align="center" mb="xl">
              <Title order={2} lts={-0.5}>
                Browse by{" "}
                <Text span c="#E90808" inherit>
                  Make
                </Text>
              </Title>

              <Anchor component={Link} href="#" c="#E90808">
                Show all Makes
              </Anchor>
            </Flex>
            <Box className="cat-by-brand">
              <Box className="row">
                {makes?.data?.map((item, index) => {
                  return (
                    <>
                      <Box className="col-sm-3" key={index}>
                        <Flex direction="column" className="single-brand-item">
                          <Image
                            width={100}
                            height={100}
                            component={NextImage}
                            src={item.companyImage}
                            className="mx-auto text-center"
                          />
                          <Link href={`/new/car/${item.name}`}>{item.name}</Link>
                        </Flex>
                      </Box>
                    </>
                  );
                })}
              </Box>
            </Box>
          </Box>
          <Box className="col-lg-6 ps-5">
            <Flex justify="space-between" align="center" mb="xl">
              <Title order={2} lts={-0.5}>
                Browse by{" "}
                <Text span c="#E90808" inherit>
                  Body
                </Text>
              </Title>
              <Anchor component={Link} href="#" c="pink">
                Show all Makes
              </Anchor>
            </Flex>

            <Box className="cat-by-brand cat-by-body">
              <Box className="row">
                {bodies?.data?.map((body, index) => {
                  return (
                 <>
                    <Box className="col-sm-3" key={index}>
                      <Flex direction="column" className="single-brand-item">
                        <Image
                          width={100}
                          height={100}
                          src={body.bodyImage}
                          className="mx-auto text-center"
                        />
                        <Link href={"#"}>{body.name}</Link>
                      </Flex>
                    </Box>
                 </>
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

export default BrowseByMakeAndBodies;
