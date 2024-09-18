"use client";
import React from "react";
import {
  CameraIcon,
  CompareIcon,
  FuelIcon,
  FuelTank,
  LocationPinIcon,
  RoadIcon,
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
  List,
  rem,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { FaRoad } from "react-icons/fa6";
import { BsFuelPumpFill, BsStar } from "react-icons/bs";

const ListCardView = ({ vehicle, index }) => {
  const conditionMap = {
    new: "New",
    used: "Used",
    certified: "Certified Used",
  };
  return (
    <>
      <Card mb="sm" padding={0}>
        <Grid gutter={0} align="center">
          <Grid.Col span={4} p="sm">
            <Card.Section pos="relative" style={{ overflow: "hidden" }}>
              <Badge
                pos="absolute"
                top={10}
                left={0}
                variant="transparent"
                size="xl"
                color="white"
                leftSection={
                  <CameraIcon style={{ width: rem(12), height: rem(12) }} />
                }
              >
                6
              </Badge>
              <Badge
                className="featured-badge"
                pos="absolute"
                right={-110}
                top={20}
                radius={0}
                size="lg"
                fullWidth
                color="pink"
              >
                Special
              </Badge>
              <Image
                radius="md"
                h={220}
                fit="cover"
                className="img-fluid"
                src={
                  vehicle?.defaultImage
                    ? vehicle?.defaultImage
                    : "/products/product-placeholder.png"
                }
              />
              <Badge
                pos="absolute"
                bottom={10}
                left={0}
                variant="transparent"
                size="xl"
                color="white"
                leftSection={
                  <BsStar style={{ width: rem(20), height: rem(20) }} />
                }
              />
            </Card.Section>
          </Grid.Col>
          <Grid.Col span={8} p="sm">
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
                  {conditionMap[vehicle?.condition]}
                </Text>
                <Title mb={rem(3)} lts={-0.3} c="dark" order={4}>
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

            <Group mb="lg">
              <Box className="list-inline-item" c="dimmed">
                <FaRoad />{" "}
                <Text c="dark" span fw={500}>
                  {vehicle?.specifications?.mileage} Km
                </Text>
              </Box>
              <Divider orientation="vertical" size="sm" />

              <Box className="list-inline-item" c="dimmed">
                <BsFuelPumpFill />{" "}
                <Text span c="dark" fw={500}>
                  {vehicle?.specifications?.fuelType}
                </Text>
              </Box>
              <Divider orientation="vertical" size="sm" />

              <Box className="list-inline-item" c="dimmed">
                <FuelTank />{" "}
                <Text c="dark" fw={500} span>
                  {vehicle?.specifications?.engine}
                </Text>
              </Box>
              <Divider orientation="vertical" size="sm" />
              <Box className="list-inline-item" c="dimmed">
                <LocationPinIcon />{" "}
                <Text span c="dark" fw={500}>
                  {vehicle?.city}
                </Text>
              </Box>
            </Group>

            <Group>
              <Button size="md" radius="md" color="#F1EFEF" disabled>
                <Text size="sm" c="dimmed" fw={500}>
                  STOCK#{" "}
                  <Text span size="sm" c="dark" fw={500}>
                    {vehicle?.specifications?.stockId}
                  </Text>
                </Text>
              </Button>
              <Button
                size="md"
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
                size="md"
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
      {/* <div className="product-card product-list p-3 box-border-box" key={index}>
        <div className="row align-items-center">
          <div className="col-md-5">
            <div className="product-placeholder position-relative overflow-hidden">
              <div className="featured-badge">Special</div>
              <div className="image-counter">
        <CameraIcon />
        <span className="fw-bold">6</span>
      </div>
              <Image
        src={vehicle?.defaultImage}
        className="product-image object-fit-cover img-fluid"
        alt="..."
        width={280}
        height={200}
      />
              <img
                src={
                  vehicle?.defaultImage
                    ? vehicle?.defaultImage
                    : "/products/product-placeholder.png"
                }
                alt="..."
                className="product-image object-fit-cover img-fluid"
                style={{ maxHeight: "200px", minHeight: "200px" }}
              />
              <div className="progress-bars">
                <span className="single-bar active"></span>
                <span className="single-bar"></span>
                <span className="single-bar"></span>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="product-content list-content-listing">
              <div className="row align-items-center">
                <div className="col">
                  <div className="text-primary user-info fw-semibold">
                    {conditionMap[vehicle?.condition]}
                  </div>

                  <Link
                    href={`/detail${vehicle?.slug}`}
                    className="product-title"
                  >
                    <h4 className=" mb-0 fw-bold">
                      {`${vehicle?.year}  ${vehicle?.make} ${vehicle?.model}`}
                    </h4>
                  </Link>

                  <small className="text-muted">(Updated 1 month ago)</small>
                </div>
                <div className="col">
                  <div className="product-price">Rs {vehicle?.price}</div>
                </div>
              </div>
              <div className="row my-3 py-2">
                <div className="col-md-6 col-lg-4">
                  <div className="vehicle-info border-end">
                    <RoadIcon />
                    <span className="fw-bold ms-2">
                      {vehicle?.specifications?.mileage} Km
                    </span>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="vehicle-info border-end">
                    <FuelIcon />
                    <span className="fw-bold ms-2">
                      {vehicle?.specifications?.fuelType}
                    </span>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="vehicle-info border-end">
                    <FuelTank />
                    <span className="fw-bold ms-2">
                      {vehicle?.specifications?.engine}
                    </span>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="vehicle-info">
                    <LocationPinIcon />
                    <span className="fw-bold ms-2">{vehicle?.city}</span>
                  </div>
                </div>
              </div>
              <div className="product-actions">
                <button className="btn btn-stock btn-lg">
                  STOCK#{" "}
                  <span className="text-dark">
                    {vehicle?.specifications?.stockId}
                  </span>
                </button>
                <button className="btn btn-lg btn-compare">
                  <CompareIcon />
                  Add to compare
                </button>
                <button className="btn btn-lg btn-share">
                  <ShareIcon />
                  Share this
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default ListCardView;
