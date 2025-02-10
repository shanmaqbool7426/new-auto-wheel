"use client";
import React, { useState, useEffect } from "react";
import {
  CameraIcon,
  CompareIcon,
  FuelTank,
  LocationPinIcon,
  ShareIcon,
} from "@/components/Icons";
import Link from "next/link";
import {
  Anchor,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Group,
  Image,
  Progress,
  rem,
  Text,
  Title,
} from "@mantine/core";
import { FaRoad } from "react-icons/fa6";
import { BsCameraFill, BsFuelPumpFill, BsStar } from "react-icons/bs";

const ListCardView = ({ vehicle, index }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const images = vehicle?.images?.slice(0, 5) || [];

  useEffect(() => {
    // Preload images
    images.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, [images]);

  const handleMouseMove = (e) => {
    const { offsetX, target } = e.nativeEvent;
    const sectionWidth = target.clientWidth / images.length;
    const newSlide = Math.floor(offsetX / sectionWidth);
    setActiveSlide(newSlide);
  };

  const handleMouseLeave = () => {
    setActiveSlide(0);
  };

  return (
    <>
      <Card
        radius={0}
        mb="lg"
        pb="lg"
        padding={0}
        style={{ borderBottom: "2px solid #ddd" }}
      >
        <Grid gutter={0} align="center">
          <Grid.Col span={4}>
            <Card.Section pos="relative" style={{ overflow: "hidden" }}>
              {/* Update camera count button to only show if there are images */}
              {true && (
                <Button
                  pos="absolute"
                  top={8}
                  left={10}
                  p={0}
                  variant="transparent"
                  color="white"
                  leftSection={<CameraIcon width="20px" height="20px" />}
                >
                  {vehicle.images.length}
                </Button>
              )}
              <Button
                pos="absolute"
                bottom={14}
                left={10}
                p={0}
                variant="transparent"
                color="white"
                leftSection={
                  <BsStar style={{ width: rem(20), height: rem(20) }} />
                }
              />
              <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ cursor: "pointer", position: "relative" }}
              >
                <Image
                  radius="sm"
                  h={190}
                  fit="cover"
                  src={
                    images[activeSlide] ||
                    vehicle?.defaultImage ||
                    "/products/product-placeholder.png"
                  }
                />
              </div>
              <Group grow my={3} gap={5}>
                {images.map((_, index) => (
                  <Progress
                    key={index}
                    radius="0"
                    size={4}
                    value={index === activeSlide ? 100 : 30}
                    color={index === activeSlide ? "#E90808" : "#E0E0E0"}
                  />
                ))}
              </Group>
            </Card.Section>
          </Grid.Col>
          <Grid.Col span={8} pl="lg">
            <Group justify="space-between" mb="lg">
              <Box>
                <Text
                  mb={rem(3)}
                  size="sm"
                  ff="heading"
                  fw={600}
                  tt="uppercase"
                  c="#E90808"
                >
                  {/* {conditionMap[vehicle?.condition]} */}
                </Text>
                <Title ff="text" mb={rem(3)} lts={-0.3} c="dark" order={4}>
                  <Anchor
                    inherit
                    underline="hover"
                    component={Link}
                    c="dark"
                    href={`/detail${vehicle?.slug}`}
                  >
                    {`${vehicle?.year}  ${vehicle?.make} ${vehicle?.model}`}
                  </Anchor>
                </Title>
                <Text mb="xs" size="sm" c="dimmed">
                  (Updated 1 month ago)
                </Text>
              </Box>
              <Text
                bg="#E90808"
                p="10px 15px 10px 50px"
                c="white"
                fw="bold"
                style={{
                  clipPath: "polygon(22% 0, 100% 0, 100% 100%, 0% 100%)",
                }}
              >
                Rs {vehicle?.price}
              </Text>
            </Group>

            <Group mb="lg" justify="space-between">
              <Box className="list-inline-item" c="dimmed">
                <FaRoad />{" "}
                <Text c="dark" size="sm" span fw={500}>
                  {vehicle?.specifications?.mileage} Km
                </Text>
              </Box>
              <Divider orientation="vertical" size="sm" />

              <Box className="list-inline-item" c="dimmed">
                <BsFuelPumpFill />{" "}
                <Text span c="dark" fw={500} size="sm">
                  {vehicle?.specifications?.fuelType}
                </Text>
              </Box>
              <Divider orientation="vertical" size="sm" />

              <Box className="list-inline-item" c="dimmed">
                <FuelTank />{" "}
                <Text c="dark" fw={500} span size="sm">
                  {vehicle?.specifications?.engine}
                </Text>
              </Box>
              <Divider orientation="vertical" size="sm" />
              <Box className="list-inline-item" c="dimmed">
                <LocationPinIcon />{" "}
                <Text span c="dark" fw={500} size="sm">
                  {vehicle?.city}
                </Text>
              </Box>
            </Group>

            <Group>
              <Button size="sm" radius="md" color="#F1EFEF" disabled>
                <Text size="xs" c="dimmed" fw={500}>
                  STOCK#{" "}
                  <Text span size="xs" c="dark" fw={500}>
                    {vehicle?.specifications?.stockId}
                  </Text>
                </Text>
              </Button>
              <Button
                size="sm"
                radius="md"
                variant="outline"
                color="#CCCCCC"
                fw={400}
                leftSection={
                  <Box c="dark">
                    <CompareIcon />
                  </Box>
                }
              >
                Add to compare
              </Button>
              <Button
                size="sm"
                radius="md"
                variant="outline"
                color="#CCCCCC"
                fw={400}
                leftSection={
                  <Box c="dark">
                    <ShareIcon />
                  </Box>
                }
              >
                Share this
              </Button>
            </Group>
          </Grid.Col>
        </Grid>
      </Card>
    </>
  );
};

export default ListCardView;
