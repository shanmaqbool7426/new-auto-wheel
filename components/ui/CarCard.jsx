"use client";
import { useEffect, useState } from "react";
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
  Anchor,
  Overlay,
} from "@mantine/core";
import NextLink from "next/link";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import { formatPrice, getTimeAgo } from "@/utils";
import { BASE_URL } from "@/constants/api-endpoints";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { getLocalStorage } from "@/utils";

const CarCard = ({ vehicle, userData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [localUserData, setLocalUserData] = useState(userData);
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);
  const images = vehicle?.images?.slice(0, 5) || []; // Max 5 images

  useEffect(() => {
    if (userData && vehicle) {
      setIsFavorite(userData.favoriteVehicles?.includes(vehicle._id));
    }
  }, [userData, vehicle]);

  useEffect(() => {
    setLocalUserData(userData);
  }, [userData]);

  useEffect(() => {
    images.forEach((src) => {
      const img = new window.Image(); // Use native Image constructor explicitly
      img.src = src;
    });
  }, [images]);

  console.log("userData", userData);

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
    // Don't navigate if clicking the favorite button
    if (e.target.closest(".favorite-button")) {
      return;
    }
    router.push(`/detail/${vehicle?.slug}`);
  };

  const handleToggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!localUserData) {
      notifications.show({
        title: "Login Required",
        message: "Please login first to add vehicles to favorites",
        color: "red",
      });
      router.push("/login");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `${BASE_URL}/api/user/${vehicle._id}/toggle-favorite/${localUserData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localUserData._id}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        // Update local storage with new user data
        const updatedUserData = {
          ...localUserData,
          favoriteVehicles: data.data.favoriteVehicles,
        };
        localStorage.setItem("user", JSON.stringify(updatedUserData));
        setLocalUserData(updatedUserData);
        console.log("updatedUserData", data.data.favoriteVehicles);
        setIsFavorite(data.data.favoriteVehicles.includes(vehicle._id));

        notifications.show({
          title: "Success",
          message: data.message,
          color: "green",
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      notifications.show({
        title: "Error",
        message: error.message || "Failed to update favorite status",
        color: "red",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Simplified favorite button component
  const FavoriteButton = () => (
    <ActionIcon
      className="favorite-button"
      variant="transparent"
      pos="absolute"
      size="lg"
      bottom={15}
      left={10}
      loading={isLoading}
      onClick={handleToggleFavorite}
      style={{
        zIndex: 201,
        // backgroundColor: "rgba(0, 0, 0, 0.3)",
        // borderRadius: "50%",
        padding: "5px",
      }}
    >
      {isFavorite ? (
        <IconStarFilled
          size={20}
          style={{
            color: "#E90808", // Your primary red color
            fill: "#E90808",
          }}
        />
      ) : (
        <IconStar
          size={20}
          style={{
            color: "#fff",
          }}
        />
      )}
    </ActionIcon>
  );

  return (
    <Card
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
          <Box style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <CameraIcon width={18} height={18} />
            <Text span fw={500} size="sm">
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
          href={`/detail/${vehicle?.slug}`}
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
            <Image
              mah={160}
              mih={160}
              fit="cover"
              src={images[activeSlide] || "https://placehold.co/270x160"}
              alt={`${vehicle?.make.toLowerCase()}_${vehicle?.model.toLowerCase()}_${
                activeSlide + 1
              }`}
            />
          ) : (
            <Image
              mah={160}
              mih={160}
              fit="cover"
              src={vehicle?.defaultImage || "https://placehold.co/270x160"}
              alt=""
            />
          )}
          <Overlay color="#000" backgroundOpacity={0.3} zIndex={100} />
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
          // justify="space-between"
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
            href={`/detail/${vehicle.slug}`}
            size="sm"
            fw={600}
            lineClamp={2}
          >
            {`${vehicle?.year} ${vehicle?.make} ${vehicle?.model}`}
          </Text>
          <Box
            c="#FFF"
            bg="#E90808"
            p="10px 5px 10px 15px"
            ta="right"
            h={32}
            display="inline-flex" // Changed to inline-flex
            style={{
              clipPath: "polygon(22% 0, 100% 0, 100% 100%, 0% 100%)",
              minWidth: "fit-content", // Changed to fit-content
              width: "auto",
              alignItems: "center", // Added to center content vertically
              justifyContent: "flex-end", // Added to align content to the right
            }}
          >
            <Text
              fw={600}
              size="xs"
              style={{ whiteSpace: "nowrap", lineHeight: 1 }}
            >
              Rs {formatPrice(vehicle?.price)}
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
              {vehicle?.specifications?.stockId?.slice(0, 4)}
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
