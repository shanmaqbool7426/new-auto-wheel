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

const BrowseByCategory = ({ makes, bodies }) => {
  return (
    <Box className="browse-cats-section py-5 bg-light">
      <Box className="container">
        <Box className="row">
          <Box className="col-lg-6">
            <Flex justify="space-between" align="center" mb="xl">
              <Title order={2}>
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
                    <Box className="col-sm-3 text-center" key={index} mb="lg">
                      <Anchor href="#" td="none">
                        <Card
                          radius="md"
                          mih={120}
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Image w={70} h={70} src={item.companyImage} />
                        </Card>
                        <Title order={4} mt="sm" fw={600}>
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
            <Flex justify="space-between" align="center" mb="xl">
              <Title order={2}>
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
                    <Box className="col-sm-3 text-center" key={index} mb="lg">
                      <Anchor href="#" td="none">
                        <Card
                          radius="md"
                          mih={120}
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Image w={70} h={70} src={body.bodyImage} />
                        </Card>
                        <Title order={4} mt="sm" fw={600}>
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
