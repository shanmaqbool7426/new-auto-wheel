"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Title,
  Text,
  Anchor,
  Image,
  Card,
  LoadingOverlay,
  AspectRatio,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { PlayButton } from "@/components/Icons";
import Link from "next/link";
import { fetchVideoDataServer } from "@/actions/index"; // Your action to fetch video data

const BrowseVideos = ({ initialSlug, search, hideViewAll, title, type }) => {
  const [slug, setSlug] = useState(initialSlug || null); // Manage the slug in the state
  const [currentVideo, setCurrentVideo] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [firstTimeLoading, setFirstTimeLoading] = useState(true);

  // Function to fetch video data (current video and suggestions)
  const fetchVideoData = async (params) => {
    try {
      setLoading(true);
      const data = await fetchVideoDataServer(params); // Pass both slug and search to the fetch function

      setCurrentVideo(data.currentVideo);
      setSuggestions(data.suggestions);
      setLoading(false);
      setFirstTimeLoading(false);
    } catch (error) {
      console.error("Error fetching video data:", error);
      setLoading(false);
      setFirstTimeLoading(false);
    }
  };
  useEffect(() => {
    // Fetch video data when the slug or search changes
    if (slug || search) {
      fetchVideoData({ slug, search, type });
    } else {
      fetchVideoData({ type });
    }
  }, [slug, search, type]);

  const handleVideoSelect = (newSlug) => {
    setSlug(newSlug);
  };

  if (firstTimeLoading) {
    return (
      <section className="browse-videos py-5">
        <Box className="container min-h[500]" pos="relative" h="500">
          <LoadingOverlay
            visible={true}
            zIndex={1000}
            overlayProps={{ radius: "md", blur: 2 }}
          />
        </Box>
      </section>
    );
  }

  if (!currentVideo) {
    return (
      <section className="browse-videos py-5">
        <Box className="container-xl">
          <Flex justify="space-between" align="center" mb="xl">
            <Title order={2} lts={-0.4}>
              {title || "Browse Our"}{" "}
              <Text span c="#E90808" inherit>
                Videos
              </Text>
            </Title>
            {!hideViewAll && (
              <Anchor component={Link} href="/videos" c="#E90808">
                View all Videos
              </Anchor>
            )}
          </Flex>
          <Text size="lg" align="center">
            No video found
          </Text>
        </Box>
      </section>
    );
  }

  console.log("currentVideo", currentVideo);

  return (
    <Box component="section" className="browse-videos bg-light py-5">
      <Box className="container-xl" pos="relative">
        {loading && (
          <LoadingOverlay
            visible={true}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
        )}
        <Box className="row">
          <Box className="col-12">
            <Flex justify="space-between" align="center" mb="xl">
              <Title order={2} lts={-0.4}>
                {title || "Browse Our"}{" "}
                <Text span c="#E90808" inherit>
                  Videos
                </Text>
              </Title>
              {!hideViewAll && (
                <Anchor component={Link} href="/videos" c="#E90808">
                  View all Videos
                </Anchor>
              )}
            </Flex>
          </Box>
        </Box>

        {/* Main video display */}
        <Box className="row">
          <Box className="col">
            {/* <AspectRatio ratio={16 / 10} mah={450}> */}
            <iframe
              height={365}
              width="620px"
              style={{ borderRadius: "5px" }}
              src={currentVideo.url} // Use the full URL from the current video
              title={currentVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            {/* </AspectRatio> */}
            <Anchor
              ff="heading"
              size={"xl"}
              c="dark"
              fw={600}
              component={Link}
              href={currentVideo.url}
            >
              {currentVideo.title}
            </Anchor>
          </Box>

          {/* Video suggestions */}
          <Box className="col">
            <Box className="row">
              {suggestions.map((video) => (
                <Box className="col-lg-6 col-sm-6 mb-3" key={video.slug}>
                  <Card
                    padding={0}
                    // onClick={() => handleVideoSelect(video.slug)}
                  >
                    <Card.Section className="position-relative" mb={rem(5)}>
                      <UnstyledButton
                        pos="absolute"
                        left="40%"
                        top="40%"
                        onClick={() => handleVideoSelect(video.slug)}
                      >
                        <PlayButton />
                      </UnstyledButton>
                      <Image
                        src={video.thumbnail}
                        radius={rem(5)}
                        h={160}
                        className="img-fluid"
                        alt={video.title}
                      />
                    </Card.Section>
                    <Anchor
                      ff="heading"
                      size="sm"
                      lineClamp={1}
                      c="dark"
                      fw={600}
                      onClick={() => handleVideoSelect(video.slug)}
                    >
                      {video.title}
                    </Anchor>
                    {/* <Title mt="xs" lineClamp={1} fw={600} order={6}>
                      {video.title}
                    </Title> */}
                  </Card>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BrowseVideos;
