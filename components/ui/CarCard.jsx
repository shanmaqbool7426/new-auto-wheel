import { GearsHandle } from "@/components/Icons";
// import Image from "next/image";
import Link from "next/link";
import styles from "../../app/styles/components/product.module.scss";

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
  Paper,
} from "@mantine/core";

const CarCard = ({ vehicle, index }) => {
  return (
    <>
    {/* 0px 4px 20px 0px rgba(0, 0, 0, 0.0784313725) */}
      <Card shadow="md" radius="md" mb="lg">
        <Paper
          withBorder={true}
          radius="md"
          shadow="none"
          pos="relative"
          style={{ overflow: "hidden" }}
        >
          <Image
            mah={200}
            mih={200}
            radius="md"
            fit="cover"
            src={
              vehicle?.defaultImage
                ? vehicle?.defaultImage
                : "/products/product-placeholder.png"
            }
          />
          <Box
            pos="absolute"
            bottom={0}
            right={0}
            c="#FFF"
            bg="#E90808"
            p="10px 10px 10px 50px"
            fw={700}
            style={{ clipPath: "polygon(22% 0, 100% 0, 100% 100%, 0% 100%)" }}
          >
            Rs {vehicle?.price}
          </Box>
        </Paper>
        <Title
          order={5}
          ff="text"
          lts={-0.3}
          fw={600}
          my="md"
        >{`${vehicle?.year}  ${vehicle?.make} ${vehicle?.model}`}</Title>
        <Divider />
        <Flex mt="md" gap="md" justify="space-between" wrap="wrap">
          <Group c="dimmed" gap={rem(5)} align="center">
            <FaCalendarDays />
            <Text size="sm">{vehicle?.year}</Text>
          </Group>
          <Group c="dimmed" gap={rem(5)} align="center">
            <GearsHandle />
            <Text size="sm">{vehicle?.specifications?.transmission}</Text>
          </Group>
          <Group c="dimmed" gap={rem(5)} align="center">
            <FaLocationDot />
            <Text size="sm">{vehicle?.city}</Text>
          </Group>
          <Group c="dimmed" gap={rem(5)} align="center">
            <Text span c="dimmed" size="sm">
              Stock#
            </Text>
            <Text c="dark" size="sm">
              {vehicle?.specifications?.stockId}
            </Text>
          </Group>
          <Group c="dimmed" gap={rem(5)} align="center">
            <FaClock />
            <Text size="sm">1 month ago</Text>
          </Group>
        </Flex>
      </Card>
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
