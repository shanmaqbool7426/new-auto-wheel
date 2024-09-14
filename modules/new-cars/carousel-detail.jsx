"use client";
import React from "react";
import {
  Box,
  Group,
  Button,
  Title,
  Text,
  Image,
  Flex,
  Rating,
  rem,
  SimpleGrid,
  UnstyledButton,
  Anchor,
  Paper,
  Table
} from "@mantine/core";
import { AirBags, DimensionIcon, FuelTank, TransmissionIcon } from "@/components/Icons";
import { Carousel } from "@mantine/carousel";
import Link from "next/link";

const CarouselDetail = ({ vehicle }) => {
    const { ScrollContainer } = Table;
  const { carInfo, startPrice, endPrice, specifications, features, price, sellerNotes, images,model } = vehicle || {};
  const { engine, mileage, fuelType, transmission, exteriorColor, interiorColor,bodyType,dimensions,groundClearance,displacement,horsePower,torque,bootSpace,kerbWeight,fuelTankCapacity,seats ,topSpeed,tyreSize} = specifications || {};

  return (
    <>
      {/* Header Section */}
      <Box bg="rgba(233, 8, 8, 0.8)" pb="xl">
        <Box className="container">
          <Box className="row">
            <Box className="col-md-12">
              <nav className="mt-3">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Anchor href="#">Cars</Anchor>
                  </li>
                  <li className="breadcrumb-item" aria-current="page">
                    <Anchor href="#">New Cars</Anchor>
                  </li>
                  <li className="breadcrumb-item" aria-current="page">
                    <Anchor href="#">Toyota Cars</Anchor>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    <Anchor href="#">Toyota Corolla 2023</Anchor>
                  </li>
                </ol>
              </nav>
            </Box>
            <Title order={2} c="white">
              New Toyota Corolla 2023 Price in Pakistan, Pictures and Specs
            </Title>
          </Box>
        </Box>
      </Box>

      {/* Main Section */}
      <Box component="section" className="cars-detail" py="xl">
        <Box className="container">
          <Box className="row">
            {/* Carousel Section */}
            <Box className="col-lg-7">
              <Box className="gallery-slider">
                <Box className="large-thumbnail" pos="relative">
                  <Carousel withIndicators={false} controlSize={40} mb="md">
                    {/* Use provided images or default placeholder */}
                    {(images || ["/cars-detaill-placeholder-large.png"]).map((img, index) => (
                      <Carousel.Slide key={index}>
                        <Image
                          radius="sm"
                          alt="car-detail"
                          src={img || "/cars-detaill-placeholder-large.png"}
                          h="100%"
                          w="100%"
                          fit="cover"
                        />
                      </Carousel.Slide>
                    ))}
                  </Carousel>
                  <Box className="img-gallery-slider">
                    <SimpleGrid cols={5}>
                      {/* Image thumbnails */}
                      {(images || ["/cars-detaill-placeholder-large.png"]).map((img, index) => (
                        <UnstyledButton key={index}>
                          <Image
                            radius="sm"
                            alt="car-thumbnail"
                            src={img || "/cars-detaill-placeholder-large.png"}
                            h="100%"
                            w="100%"
                            fit="cover"
                          />
                        </UnstyledButton>
                      ))}
                    </SimpleGrid>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Car Details Section */}
            <Box className="col-lg-5" px="lg">
              <Box className="row">
                <Box className="col-12">
                  <Text c="dimmed" size="md">
                    {carInfo || model|| "Car Details"} Price Range in Pakistan
                  </Text>
                  <Box my="lg">
                    {/* Avoid nesting <Text> directly */}
                    <Text c="#E90808" fw="bold" size={rem(26)}>
                      <span style={{ color: "#E90808", fontWeight: 600 }}>PKR</span> {startPrice || "N/A"} - {endPrice || "N/A"}
                    </Text>
                    <Text size="md" c="dimmed" ml="xs">
                      (*Ex-Factory Price)
                    </Text>
                  </Box>
                  <Flex gap="md" align="center">
                    <Flex align="center" gap="3">
                      <Rating defaultValue={4} count={5} />
                      <Text span inherit>
                        (3)
                      </Text>
                    </Flex>
                    <Text c="dimmed">(Review 15)</Text>
                  </Flex>
                </Box>
              </Box>

              {/* Car Specifications */}
              <Box className="row border-bottom" mt="xl" pb="md" mb="md">
                <Box className="col-lg-6 border-end">
                  <Flex align="flex-start" gap="sm" c="dimmed">
                    <FuelTank style={{ width: rem(24), height: rem(24) }} />
                    <Text c="dimmed">
                      Engine <span style={{ color: "#000", fontWeight: 600 }}>{engine || "N/A"}</span>
                    </Text>
                  </Flex>
                </Box>
                <Box className="col-lg-6">
                  <Flex align="flex-start" gap="sm" c="dimmed">
                    <AirBags style={{ width: rem(24), height: rem(24), marginTop: rem(6) }} />
                    <Text c="dimmed">
                      Airbags <span style={{ color: "#000", fontWeight: 600 }}>{features?.includes("Air Bags") ? "Yes" : "No"}</span>
                    </Text>
                  </Flex>
                </Box>
              </Box>

              <Box className="row border-bottom" pb="md" mb="lg">
                <Box className="col-lg-6 border-end">
                  <Flex align="flex-start" gap="sm" c="dimmed">
                    <DimensionIcon style={{ width: rem(24), height: rem(24), marginTop: rem(6) }} />
                    <Text c="dimmed">
                      Fuel Type <span style={{ color: "#000", fontWeight: 600 }}>{fuelType || "N/A"}</span>
                    </Text>
                  </Flex>
                </Box>
                <Box className="col-lg-6">
                  <Flex align="flex-start" gap="sm" c="dimmed">
                    <TransmissionIcon style={{ width: rem(24), height: rem(24), marginTop: rem(6) }} />
                    <Text c="dimmed">
                      Transmission <span style={{ color: "#000", fontWeight: 600 }}>{transmission || "N/A"}</span>
                    </Text>
                  </Flex>
                </Box>
              </Box>

              {/* Color options (static example) */}
              <Box className="row">
                <Box className="col-lg-12">
                  <Title order={4} fw={600} mb="md">
                    Available Colors
                  </Title>
                  <Group>
                    {/* Static color options */}
                    <Button size="xs" radius="xl" bg="#888888" />
                    <Button size="xs" radius="xl" bg="#C4C4C4" />
                    <Button size="xs" radius="xl" bg="#C1A3A3" />
                    <Button size="xs" radius="xl" bg="#E90808" />
                    <Button size="xs" radius="xl" bg="#C6BA7A" />
                  </Group>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Additional Car Info */}
        <Box className="container" mt="xl">
          <Box className="row">
            <Box className="col-lg-12">
              <Title order={2}>
                {carInfo || model || "Vehicle"}{" "}
                <Text span inherit c="#E90808">
                  Price in Pakistan
                </Text>
              </Title>
              <Text mt="md">The price of {carInfo || model||"Car Details"} in Pakistan starts from PKR {price || "N/A"}.</Text>
              <Text mt="md">{sellerNotes || "No additional information from the seller."}</Text>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Detail Specification Section */}
      <Box component="section" className="pros-const-section bg-light" py="xl">
      <Box className="container" py="xl">
        <Box className="row">
          <Box className="col-lg-12">
            <Flex justify="space-between" align="center">
              <Title mb="lg" order={2}>
              {carInfo || model||"Car Details"}{" "}
                <Text span inherit className="text-primary">
                  Specifications
                </Text>
              </Title>
              <Anchor href="#" underline="hover" className="text-primary">
              {carInfo || model||"Car Details"} Specifications
              </Anchor>
            </Flex>
          </Box>
          <Box className="col-lg-12">
            <Paper shadow="0px 4px 20px 0px #00000014" radius="sm" mb="md">
              <Box className="row">
                <Box className="col-lg-12">
                  <ScrollContainer pt="sm">
                    <Table verticalSpacing="md" horizontalSpacing="md">
                      <Table.Tbody>
                        <Table.Tr>
                          <Table.Td c="dimmed">Price</Table.Td>
                          <Table.Td>{`${startPrice} - ${endPrice}` || "N/A"}</Table.Td>
                          <Table.Td c="dimmed">Body Type</Table.Td>
                          <Table.Td>{bodyType || "Sedan"}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td c="dimmed">Dimensions (L x W x H)</Table.Td>
                          <Table.Td>{dimensions || "4620 x 1775 x 1475 mm"}</Table.Td>
                          <Table.Td c="dimmed">Ground Clearance</Table.Td>
                          <Table.Td>{groundClearance || "175 mm"}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td c="dimmed">Displacement</Table.Td>
                          <Table.Td>{displacement || "1298 - 1800 cc"}</Table.Td>
                          <Table.Td c="dimmed">Transmission</Table.Td>
                          <Table.Td>{transmission || "Manual & Automatic"}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td c="dimmed">Horse Power</Table.Td>
                          <Table.Td>{horsePower || "84 - 138 hp"}</Table.Td>
                          <Table.Td c="dimmed">Torque</Table.Td>
                          <Table.Td>{torque || "121 - 173 Nm"}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td c="dimmed">Boot Space</Table.Td>
                          <Table.Td>{bootSpace || "470 L"}</Table.Td>
                          <Table.Td c="dimmed">Kerb Weight</Table.Td>
                          <Table.Td>{kerbWeight || "1320 KG"}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td c="dimmed">Fuel Type</Table.Td>
                          <Table.Td>{fuelType || "Petrol"}</Table.Td>
                          <Table.Td c="dimmed">Mileage</Table.Td>
                          <Table.Td>{mileage || "8 - 16 KM/L"}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td c="dimmed">Fuel Tank Capacity</Table.Td>
                          <Table.Td>{fuelTankCapacity || "55 L"}</Table.Td>
                          <Table.Td c="dimmed">Seating Capacity</Table.Td>
                          <Table.Td>{seats || "5 Persons"}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td c="dimmed">Top Speed</Table.Td>
                          <Table.Td>{topSpeed || "180 - 240 KM/H"}</Table.Td>
                          <Table.Td c="dimmed">Tyre Size</Table.Td>
                          <Table.Td>{tyreSize || "195/65/R15"}</Table.Td>
                        </Table.Tr>
                      </Table.Tbody>
                    </Table>
                  </ScrollContainer>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
    </>
  );
};

export default CarouselDetail;
