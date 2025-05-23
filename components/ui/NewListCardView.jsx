"use client";
import React from "react";
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
    const conditionMap = {
        new: "New",
        used: "Used",
        certified: "Certified Used",
    };
    return (
        <>
            <Card shadow="sm" padding="lg" radius="md" withBorder mb="lg"
                component={Link}
                href={`/new-vehicle/${vehicle?.slug}`}

                pb="lg">
                <Group noWrap>
                    {/* Car Image */}
                    <Image fit="cover" src={
                        vehicle?.defaultImage
                            ? vehicle?.defaultImage
                            : "/products/product-placeholder.png"
                    } height={100} width={150} radius="md" />

                    {/* Car Details */}
                    <div style={{ flex: 1 }}>
                        {/* Car Title */}
                        <Text weight={500} size="lg" style={{ marginBottom: "5px" }}>
                        {`${vehicle?.year}  ${vehicle?.make} ${vehicle?.model}`}
                        </Text>

                        {/* Car Specs */}
                        <Text c="dimmed" size="sm">
                            {vehicle?.transmission?.type} | {vehicle?.engine?.type}
                        </Text>
                    </div>

                    {/* Car Price */}
                    <div>
                        <Text weight={700} size="lg" color="green">
                           views ({vehicle?.views})
                        </Text>
                        {/* Ratings */}
                        {/* <Badge
                            color="yellow"
                            variant="filled"
                            style={{ marginTop: "5px" }}
                        >
                            ★★★★☆
                        </Badge> */}
                    </div>
                </Group>
            </Card>
            {/* <Card
        radius={0}
        mb="lg"
        pb="lg"
        padding={0}
        style={{ borderBottom: "2px solid #ddd" }}
      >
        <Grid gutter={0} align="center">
          <Grid.Col span={4}>
            <Card.Section pos="relative" style={{ overflow: "hidden" }}>
              <Button
                pos="absolute"
                top={8}
                left={10}
                p={0}
                variant="transparent"
                color="white"
                leftSection={<CameraIcon width="20px" height="20px" />}
              >
                6
              </Button>
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
              <Image
                radius="sm"
                h={190}
                fit="cover"
                src={
                  vehicle?.defaultImage
                    ? vehicle?.defaultImage
                    : "/products/product-placeholder.png"
                }
              />
              <Group grow my={3} gap={5}>
                <Progress radius="0" size={4} value={100} color="#E90808" />
                <Progress radius="0" size={4} />
                <Progress radius="0" size={4} />
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
                  {conditionMap[vehicle?.condition]}
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
                ${vehicle?.price}
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
      </Card> */}
        </>
    );
};

export default ListCardView;
