"use client";
import { CameraIcon, GearsHandle } from "@/components/Icons";
import React from "react";
import { FaLocationDot, FaCalendarDays, FaClock } from "react-icons/fa6";
import {
  Box,
  Card,
  Group,
  Image,
  Title,
  Flex,
  Text,
  rem,
  Divider,
  Progress,
  ActionIcon,
} from "@mantine/core";
import { getTimeAgo } from "@/utils";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { IconStar } from "@tabler/icons-react";
import { Carousel } from "@mantine/carousel";
import classes from "./Card.module.css";

const CarCard = ({ vehicle, index }) => {
  return (
    <>
      <Link href={`/detail/${vehicle?.slug}`}>
        <Card
          shadow="0px 4px 20px 0px rgba(0, 0, 0, 0.0784313725)"
          radius="sm"
          mb="lg"
        >
          <Card.Section pos="relative">
            <Group c="white" gap={5} pos="absolute" left={15} top={15}>
              <CameraIcon width={20} height={20} />
              <Text span fw={600}>
                {vehicle?.images?.length}
              </Text>
            </Group>
            <Carousel classNames={classes}>
              <Carousel.Slide>
                <Image
                  mah={200}
                  mih={200}
                  fit="cover"
                  src={
                    vehicle?.defaultImage
                      ? vehicle?.defaultImage
                      : "/products/product-placeholder.png"
                  }
                />
              </Carousel.Slide>
              <Carousel.Slide>
                <Image
                  mah={200}
                  mih={200}
                  fit="cover"
                  src={
                    vehicle?.defaultImage
                      ? vehicle?.defaultImage
                      : "/products/product-placeholder.png"
                  }
                />
              </Carousel.Slide>
              <Carousel.Slide>
                <Image
                  mah={200}
                  mih={200}
                  fit="cover"
                  src={
                    vehicle?.defaultImage
                      ? vehicle?.defaultImage
                      : "/products/product-placeholder.png"
                  }
                />
              </Carousel.Slide>
            </Carousel>
            {/* <Image
              mah={200}
              mih={200}
              fit="cover"
              src={
                vehicle?.defaultImage
                  ? vehicle?.defaultImage
                  : "/products/product-placeholder.png"
              }
            /> */}
            <ActionIcon
              variant="transparent"
              c="white"
              pos="absolute"
              bottom={15}
              left={10}
            >
              <IconStar width={20} height={20} />
            </ActionIcon>
            <Group grow gap={2} my={2}>
              <Progress size="xs" value={100} color="#E90808" />
              <Progress size="xs" color="#E90808" />
              <Progress size="xs" color="#E90808" />
            </Group>
          </Card.Section>

          <Card.Section p="md">
            <Group justify="space-between" mb="md" align="center" wrap="nowrap">
              <Title
                // ff="text"
                order={6}
                lts={-0.3}
                fw={600}
                lineClamp={1}
              >{`${vehicle?.year}  ${vehicle?.make} ${vehicle?.model}`}</Title>
              <Box
                c="#FFF"
                bg="#E90808"
                p="5px 10px 5px 30px"
                style={{
                  clipPath: "polygon(22% 0, 100% 0, 100% 100%, 0% 100%)",
                  textWrap: "nowrap",
                }}
              >
                <Text fw={700} size="sm">
                  Rs {vehicle?.price}
                </Text>
              </Box>
            </Group>
            <Divider />
            <Flex mt="md" gap="md" justify="space-between" wrap="wrap">
              <Group c="dimmed" gap={rem(5)} align="center">
                <FaCalendarDays />
                <Text size="xs">{vehicle?.year}</Text>
              </Group>
              <Group c="dimmed" gap={rem(5)} align="center">
                <GearsHandle />
                <Text size="xs">{vehicle?.specifications?.transmission}</Text>
              </Group>
              <Group c="dimmed" gap={rem(5)} align="center">
                <FaLocationDot />
                <Text size="xs">{vehicle?.city}</Text>
              </Group>
            </Flex>
            <Flex mt="md" gap="md" justify="space-between" wrap="wrap">
              <Group c="dimmed" gap={rem(5)} align="center">
                <Text span c="dimmed" size="xs">
                  Stock#
                </Text>
                <Text c="dark" size="xs">
                  {vehicle?.specifications?.stockId}
                </Text>
              </Group>
              <Group c="dimmed" gap={rem(5)} align="center">
                <FaClock />
                <Text size="xs">{getTimeAgo(vehicle?.createdAt)}</Text>
              </Group>
            </Flex>
          </Card.Section>
        </Card>
      </Link>
    </>
  );
};

export default CarCard;
