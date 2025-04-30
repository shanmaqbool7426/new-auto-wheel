"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  CameraIcon,
  CompareIcon,
  FuelTank,
  LocationPinIcon,
  ShareIcon,
} from "@/components/Icons";
import { useUser } from '@/contexts/user';
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
import { BsFuelPumpFill } from "react-icons/bs";
import viewTrackingService from '@/services/viewTrackingService'; // Import the service

import { IconStar,IconHeart, IconStarFilled, IconCopy, IconHeartFilled } from "@tabler/icons-react";
import { formatPrice, getTimeAgo } from "@/utils";
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
import { useComparison } from '@/contexts/comparison';

const ListCardView = ({ vehicle }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const { isFavorite, toggleFavorite, isFavoriteLoading } = useUser();
  const images = vehicle?.images?.slice(0, 5) || [];
  const { addToComparison } = useComparison();
  const cardRef = useRef(null); // Add ref for tracking visibility

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
      // Use the trackCardView method from the service
      viewTrackingService.trackCardView(cardRef.current, vehicle._id);
    }
    
    // Clean up when component unmounts
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
    await toggleFavorite(vehicle._id);
  };

  const handleCopyLink = () => {
    const url = `${typeof window !== "undefined" ? window.location.origin : ""}/used-${vehicle?.type}s/${vehicle?.slug}`;
    navigator.clipboard.writeText(url).then(() => {
      notifications.show({
        title: 'Success',
        message: 'Link copied to clipboard',
        color: 'green',
      });
    });
  };

  const FavoriteButton = () => (
    <div 
      className="favorite-button-area"
      style={{
        position: 'absolute',
        bottom: 20,
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
            style={{ color: "#E90808", fill: "#E90808" }}
          />
        ) : (
          <IconHeart size={20} style={{ color: "#fff" }} />
        )}
      </ActionIcon>
    </div>
  );

  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/used-${vehicle?.type}s/${vehicle?.slug}`;
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
    <Card
      ref={cardRef}
      shadow="0px 4px 20px 0px rgba(0, 0, 0, 0.0784313725)"
      radius="sm"
      mb="lg"
    >
      <Grid>
        <Grid.Col span={4}>
          <Card.Section>
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
            </Group>

            {vehicle?.isFeatured && (
              <Box
                pos="absolute"
                top={10}
                left={220}
                style={{ zIndex: "100" }}
              >
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
              </Box>
            )}

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
              <Anchor href={`/used-${vehicle?.type}s/${vehicle?.slug}`} style={{ textDecoration: 'none' }}>
                <Image
                  radius={rem(5)}
                  h={180}
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

            {/* <Title ff="text" mb={rem(3)} lts={-0.9} c="red" order={6}>
                {vehicle?.condition?.toUpperCase() || "USED"}
              </Title> */}
              <Text c="red" fw={600} size="sm">
                {vehicle?.condition?.toUpperCase() || "USED"} {vehicle?.specifications?.engineCapacity} L
              </Text>
              <Title ff="text" mb={rem(3)} lts={-0.3} c="dark" order={4}>
                <Anchor
                  inherit
                  underline="hover"
                  c="dark"
                  href={`/used-${vehicle?.type}s/${vehicle?.slug}`}
                >
                  {`${vehicle?.year} ${vehicle?.make} ${vehicle?.model}`}
                </Anchor>
              </Title>
              <Text size="sm" c="dimmed">
                {getTimeAgo(vehicle?.createdAt)}
              </Text>
            </Box>
            <Text
              bg="#E6E6E6"
              p="8px 20px"
              c="black"
              fw="600"
              style={{
                borderRadius: "50px",
              }}
            >
              ${formatPrice(vehicle?.price)}
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
                {vehicle?.specifications?.engineCapacity} L
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
                  {vehicle?.customId}
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
              onClick={() => addToComparison(vehicle)}
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