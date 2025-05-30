"use client";
import { useEffect, useState, useRef } from "react";
import { CameraIcon, GearsHandle } from "@/components/Icons";
import { useUser } from '@/contexts/user'; 
import React from "react";
import { FaLocationDot, FaCalendarDays, FaClock } from "react-icons/fa6";
import {
  Box,
  Card,
  Group,
  Image as MantineImage,
  Flex,
  Text,
  rem,
  Divider,
  Progress,
  ActionIcon,
  Anchor,
  Overlay,
  Menu,
  Button,
  Title,
} from "@mantine/core";
import NextLink from "next/link";
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { formatPrice, getTimeAgo } from "@/utils";
import { useRouter } from "next/navigation";
import viewTrackingService from '@/services/viewTrackingService';
import { event } from "@/lib/googleConfig";
import Image from 'next/image';

const CarCard = ({ vehicle }) => {
  const router = useRouter();
  const { isFavorite, toggleFavorite, isFavoriteLoading } = useUser();
  const [activeSlide, setActiveSlide] = useState(0);
  const images = vehicle?.images?.slice(0, 5) || []; // Max 5 images
  const cardRef = useRef(null);

  // Preload images
  useEffect(() => {
    images.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, [images]);

  // Track view when card becomes visible
  useEffect(() => {
    if (cardRef.current && vehicle?._id) {
      viewTrackingService.trackCardView(cardRef.current, vehicle._id);
    }
    
    return () => {
      if (vehicle?._id) {
        const observer = viewTrackingService.observers.get(vehicle._id);
        if (observer) {
          observer.disconnect();
          viewTrackingService.observers.delete(vehicle._id);
        }
      }
    };
  }, [vehicle?._id]);

  // Function to change slide based on mouse position
  const handleMouseMove = (e) => {
    const { offsetX, target } = e.nativeEvent;
    const sectionWidth = target.clientWidth / images.length;
    const newSlide = Math.floor(offsetX / sectionWidth);
    setActiveSlide(newSlide);
  };

  // Reset to the first slide on mouse leave
  const handleMouseLeave = () => {
    setActiveSlide(0);
  };

  const handleCardClick = (e) => {
    // Don't navigate if clicking the favorite button or within its area
    if (e.target.closest(".favorite-button-area")) {
      return;
    }

    // Track the card click event with vehicle type
    event({
      action: "vehicle_card_click",
      category: vehicle?.type || 'car', // 'car', 'bike', or 'truck'
      label: `${vehicle?.year} ${vehicle?.make} ${vehicle?.model}`,
      value: vehicle?.price || 0
    });

    // Track detailed vehicle information
    router.push(`/used-${vehicle?.type}s/${vehicle?.slug}`);
  };

  const handleToggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Track favorite toggle event
    event({
      action: isFavorite(vehicle._id) ? 'remove_favorite' : 'add_favorite',
      category: 'engagement',
      label: `${vehicle?.year} ${vehicle?.make} ${vehicle?.model}`,
      value: 1
    });

    await toggleFavorite(vehicle._id);
  };

  // Simplified favorite button component
  const FavoriteButton = () => (
    <div 
      className="favorite-button-area"
      style={{
        position: 'absolute',
        bottom: 5,
        left: 5,
        width: '40px',
        height: '40px',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleToggleFavorite(e);
        return false;
      }}
    >
      <ActionIcon
        className="favorite-button"
        variant="transparent"
        size="lg"
        loading={isFavoriteLoading(vehicle._id)}
      >
        {isFavorite(vehicle._id) ? (
          <IconHeartFilled
            size={20}
            style={{
              color: "#E90808", // Your primary red color
              fill: "#E90808",
            }}
          />
        ) : (
          <IconHeart
            size={20}
            style={{
              color: "#fff",
            }}
          />
        )}
      </ActionIcon>
    </div>
  );

  return (
    <Card
      ref={cardRef}
      shadow="0px 4px 20px 0px rgba(0, 0, 0, 0.0784313725)"
      radius="sm"
      mb="lg"
      onClick={handleCardClick}
    >
      <Card.Section pos="relative">
        {/* Display total images */}
        <Group
          c="white"
          gap={5}
          pos="absolute"
          right={15}
          style={{ zIndex: "100", justifyContent: "space-between" }}
          left={15}
          top={15}
        >
          <Box style={{ display: "flex", alignItems: "center", gap: 5, color: "white" }}>
      <CameraIcon width={18} height={18}    style={{
            color: "#fff",
          }}/> {/* Add color prop if CameraIcon accepts it */}
      <Text span fw={500} size="sm" c="white">
        {vehicle?.images?.length}
      </Text>
    </Box>
          {vehicle?.isFeatured && (
            <Text
              style={{ borderRadius: "5px" }}
              span
              fw={400}
              size="12px"
              rounded="md"
              bg="black"
              c="white"
              p={5}
              position="absolute"
              right={15}
              top={15}
            >
              Featured
            </Text>
          )}
        </Group>
        {/* Custom image slider controlled by mouse hover */}
        <Anchor
          component={NextLink}
          href={`/used-${vehicle?.type}s/${vehicle?.slug}`}
          style={{
            display: "block",
            position: "relative",
            cursor: "pointer",
            textDecoration: "none",
          }}
          onClick={(e) => {
            // Prevent the card's onClick from firing
            e.stopPropagation();
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {images.length > 0 ? (
            <MantineImage
              mah={160}
              mih={160}
              fit="cover"
              src={images[activeSlide] || "https://placehold.co/270x160"}
              alt={`${vehicle?.make.toLowerCase()}_${vehicle?.model.toLowerCase()}_${
                activeSlide + 1
              }`}
            />
          ) : (
            <MantineImage
              mah={160}
              mih={160}
              fit="cover"
              src={vehicle?.defaultImage || "https://placehold.co/270x160"}
              alt=""
            />
          )}
                <Overlay opacity={0.3} bg="#333" zIndex={1} />

          {/* <Overlay color="#000" backgroundOpacity={0.3} zIndex={100} /> */}
        </Anchor>

        {/* Progress bar with hover functionality */}
        <Group grow gap={2} my={2}>
          {images.map((_, index) => (
            <Progress
              key={index}
              size="xs"
              value={index === activeSlide ? 100 : 30}
              color={index === activeSlide ? "#E90808" : "#E0E0E0"}
              onMouseEnter={() => setActiveSlide(index)}
            />
          ))}
        </Group>

        <FavoriteButton />
      </Card.Section>

      <Card.Section p="sm">
        {/* Car details */}
        <Group
          h="100%"
          grow
          mb="md"
          align="center"
          wrap="nowrap"
        >
          <Text
            lts={-0.3}
            c="dark"
            component={Anchor}
            underline="hover"
            href={`/used-${vehicle?.type}s/${vehicle?.slug}`}
            size="sm"
            fw={600}
            lineClamp={2}
            style={{ flex: 1 }}
          >
            {`${vehicle?.year} ${vehicle?.make} ${vehicle?.model}`}
          </Text>
          <Box
            c="#000"
            bg="#E6E6E6"
            ta="right"
            h={32}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 15px',
              minWidth: 'auto',
              width: 'fit-content',
              marginLeft:"auto",
              flex: '0 0 auto',
              whiteSpace: 'nowrap',
              borderRadius: '50px',
            }}
          >
            <Text
              fw={600}
              size="sm"
            >
              ${formatPrice(vehicle?.price)}
            </Text>
          </Box>
        </Group>
        <Divider
          size="md"
          color={`${vehicle?.isFeatured ? "#E90808" : "#ddd"}`}
        />
        <Flex mt="md" gap="sm" justify="space-between" wrap="wrap">
          <Group c="dimmed" gap={rem(5)} align="center">
            <FaCalendarDays />
            <Text style={{ fontSize: "12px" }}>{vehicle?.year}</Text>
          </Group>
          <Group c="dimmed" gap={rem(5)} align="center">
            <GearsHandle />
            <Text style={{ fontSize: "12px" }}>
              {vehicle?.specifications?.transmission}
            </Text>
          </Group>
          <Group c="dimmed" gap={rem(5)} align="center">
            <FaLocationDot />
            <Text style={{ fontSize: "12px" }}>{vehicle?.city}</Text>
          </Group>
          <Group c="dimmed" gap={rem(5)} align="center">
            <Text span c="dimmed" style={{ fontSize: "12px" }}>
              ID#
            </Text>
            <Text c="dark" style={{ fontSize: "12px" }}>
              {vehicle?.customId}
            </Text>
          </Group>
          <Group c="dimmed" gap={rem(5)} align="center">
            <FaClock />
            <Text style={{ fontSize: "12px" }}>
              {getTimeAgo(vehicle?.createdAt)}
            </Text>
          </Group>
        </Flex>
        {/* <Flex mt="md" gap="md" wrap="nowrap">
          <Group c="dimmed" gap={rem(5)} align="center">
            <Text span c="dimmed" size="xs">
              ID#
            </Text>
            <Text c="dark" size="xs">
              {vehicle?.specifications?.stockId?.slice(0,4)}
            </Text>
          </Group>
          <Group c="dimmed" gap={rem(5)} align="center">
            <FaClock />
            <Text size="xs">{getTimeAgo(vehicle?.createdAt)}</Text>
          </Group>
        </Flex> */}
      </Card.Section>
    </Card>
  );
};

export default CarCard;
