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
} from "@mantine/core";
import { getTimeAgo } from "@/utils";
import Link from "next/link";

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
      {/* <Box className="card product-card">
        <img
          src={
            vehicle?.defaultImage
              ? vehicle?.defaultImage
              : "/products/product-placeholder.png"
          }
          alt="..."
          style={{ objectFit: "cover", maxHeight: "160px", minHeight: "160px" }}
        />
        <div className="progress-bars">
          <span className="single-bar active"></span>
          <span className="single-bar"></span>
          <span className="single-bar"></span>
        </div>
        <div className="card-body">
          <div className="product-content">
            <Link
              href={`/detail/${vehicle?.slug}`}
              className="d-inline-block w-50 lc-2 product-title"
            >
              {`${vehicle?.year}  ${vehicle?.make} ${vehicle?.model}`}
            </Link>
            <div className="product-price">Rs {vehicle?.price}</div>
          </div>
          <div className="product-meta">
            <div className="meta-info d-flex justify-content-between align-items-center">
              <span className="text-muted d-flex align-items-center gap-1">
                <FaCalendarDays /> {vehicle?.year}
              </span>
              <span className="text-muted d-flex align-items-center gap-1">
                <GearsHandle /> {vehicle?.specifications?.transmission}
              </span>
              <span className="text-muted d-flex align-items-center gap-1">
                <FaLocationDot /> {vehicle?.city}
              </span>
            </div>
            <div className="stock-info d-flex justify-content-between align-items-center mt-2">
              <span>
                <span className="text-muted">stock#</span>{" "}
                {vehicle?.specifications?.stockId}
              </span>
              <span className="text-muted">
                <FaClock /> (Updated 1 month ago)
              </span>
            </div>
          </div>
        </div>
      </Box> */}
    </>
  );
};

export default CarCard;
