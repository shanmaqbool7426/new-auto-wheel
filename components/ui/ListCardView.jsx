"use client";
import React, { useState, useEffect } from "react";
import {
  CameraIcon,
  CompareIcon,
  FuelTank,
  LocationPinIcon,
  ShareIcon,
} from "@/components/Icons";
import { useRouter } from "next/navigation";
import {
  Anchor,
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
  ActionIcon,
  Overlay,
  Menu,
} from "@mantine/core";
import { FaRoad } from "react-icons/fa6";
import { BsCameraFill, BsFuelPumpFill, BsStar } from "react-icons/bs";

import { IconStar, IconStarFilled, IconCopy } from "@tabler/icons-react";
import { formatPrice, getTimeAgo } from "@/utils";
import { BASE_URL } from "@/constants/api-endpoints";
import { notifications } from "@mantine/notifications";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";

const ListCardView = ({ vehicle, userData }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [localUserData, setLocalUserData] = useState(userData);
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();
  const images = vehicle?.images?.slice(0, 5) || [];

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
        const updatedUserData = {
          ...localUserData,
          favoriteVehicles: data.data.favoriteVehicles,
        };
        localStorage.setItem("user", JSON.stringify(updatedUserData));
        setLocalUserData(updatedUserData);
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

  const handleCopyLink = () => {
    const url = `${typeof window !== "undefined" ? window.location.origin : ""}/detail/${vehicle?.slug}`;
    navigator.clipboard.writeText(url).then(() => {
      notifications.show({
        title: 'Success',
        message: 'Link copied to clipboard',
        color: 'green',
      });
    });
  };

  const FavoriteButton = () => (
    <ActionIcon
      className="favorite-button"
      variant="transparent"
      pos="absolute"
      size="lg"
      bottom={14}
      left={10}
      loading={isLoading}
      onClick={handleToggleFavorite}
      style={{ zIndex: 201 }}
    >
      {isFavorite ? (
        <IconStarFilled
          size={20}
          style={{ color: "#E90808", fill: "#E90808" }}
        />
      ) : (
        <IconStar size={20} style={{ color: "#fff" }} />
      )}
    </ActionIcon>
  );

  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/detail/${vehicle?.slug}`;
  const shareTitle = `Check out this ${vehicle?.year} ${vehicle?.make} ${vehicle?.model}`;
  const shareMessage = `${shareTitle} on AutoWheel`;

  const ShareMenu = () => (
    <Menu shadow="md" width={200}>
      <Menu.Target>
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
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Share via</Menu.Label>

        <Menu.Item
          onClick={handleCopyLink}
          leftSection={<IconCopy size={24} style={{ color: '#666' }} />}
        >
          <Text size="sm">Copy Link</Text>
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item>
          <FacebookShareButton url={shareUrl} quote={shareMessage} style={{ width: "100%" }}>
            <Group>
              <FacebookIcon size={24} round />
              <Text size="sm">Facebook</Text>
            </Group>
          </FacebookShareButton>
        </Menu.Item>

        <Menu.Item>
          <TwitterShareButton url={shareUrl} title={shareMessage} style={{ width: "100%" }}>
            <Group>
              <TwitterIcon size={24} round />
              <Text size="sm">Twitter</Text>
            </Group>
          </TwitterShareButton>
        </Menu.Item>

        <Menu.Item>
          <WhatsappShareButton url={shareUrl} title={shareMessage} style={{ width: "100%" }}>
            <Group>
              <WhatsappIcon size={24} round />
              <Text size="sm">WhatsApp</Text>
            </Group>
          </WhatsappShareButton>
        </Menu.Item>

        <Menu.Item>
          <EmailShareButton url={shareUrl} subject={shareTitle} body={shareMessage} style={{ width: "100%" }}>
            <Group>
              <EmailIcon size={24} round />
              <Text size="sm">Email</Text>
            </Group>
          </EmailShareButton>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );

  return (
    <Card radius={0} mb="lg" pb="lg" padding={0} style={{ borderBottom: `2px solid ${vehicle?.isFeatured ? "#E90808" : "#ddd"}` }}>
      <Grid gutter={0} align="center">
        <Grid.Col span={4}>
          <Card.Section pos="relative">
            <Group
              c="white"
              gap={5}
              pos="absolute"
              right={15}
              style={{ zIndex: "10", justifyContent: "space-between" }}
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
                  span
                  fw={400}
                  size="12px"
                  bg="black"
                  c="white"
                  p={5}
                  style={{ borderRadius: rem(5) }}
                >
                  Featured
                </Text>
              )}
            </Group>

            <Box
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                borderRadius: rem(5),
              }}
            >
              <Anchor href={`/detail/${vehicle?.slug}`} style={{ textDecoration: 'none' }}>
                <Image
                  radius={rem(5)}
                  h={160}
                  fit="cover"
                  className="overflow-hidden"
                  src={
                    images[activeSlide] ||
                    vehicle?.defaultImage ||
                    "/products/product-placeholder.png"
                  }
                  alt={`${vehicle?.year} ${vehicle?.make} ${vehicle?.model}`}
                />
                <Overlay opacity={0.3} bg="#333" zIndex={1} />
              </Anchor>
            </Box>

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

            <FavoriteButton />
          </Card.Section>
        </Grid.Col>

        <Grid.Col span={8} pl="lg">
          <Group justify="space-between" mb="lg">
            <Box>
              <Title ff="text" mb={rem(3)} lts={-0.3} c="dark" order={4}>
                <Anchor
                  inherit
                  underline="hover"
                  c="dark"
                  href={`/detail/${vehicle?.slug}`}
                >
                  {`${vehicle?.year} ${vehicle?.make} ${vehicle?.model}`}
                </Anchor>
              </Title>
              <Text size="sm" c="dimmed">
                {getTimeAgo(vehicle?.createdAt)}
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
              Rs {formatPrice(vehicle?.price)}
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
                ID#{" "}
                <Text span size="xs" c="dark" fw={500}>
                  {vehicle?._id?.slice(0, 4)}
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
            <ShareMenu />
          </Group>
        </Grid.Col>
      </Grid>
    </Card>
  );
};

export default ListCardView;
