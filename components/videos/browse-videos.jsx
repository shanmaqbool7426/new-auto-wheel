"use client";
import React, { useState, useEffect } from "react";
import { Box, Flex, Title, Text, Anchor, Image, Card, LoadingOverlay } from "@mantine/core";
import { PlayButton } from "@/components/Icons";
import Link from "next/link";
import { fetchVideoDataServer } from "@/actions/index"; // Your action to fetch video data

const BrowseVideos = ({ initialSlug, search,hideViewAll,title }) => {
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
      fetchVideoData({ slug, search });
    } else {
      fetchVideoData();
    }
  }, [slug, search]);

  const handleVideoSelect = (newSlug) => {
    setSlug(newSlug);
  };

  if (firstTimeLoading) {
    return (
      <section className="browse-videos bg-white py-5">
        <Box className="container min-h[500]" pos="relative" h="500">
        <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        </Box>
      </section>
    )
  }

  if (!currentVideo) {
    return (
      <section className="browse-videos bg-white py-5">
        <Box className="container">
          <Flex justify="space-between" align="center" mb="xl">
            <Title order={2}>
              {title||'Browse Our'}{" "}
              <Text span c="#E90808" inherit>
                Videos
              </Text>
            </Title>
            {!hideViewAll &&           
            <Anchor component={Link} href="/videos" c="#E90808">
              View all Videos
            </Anchor>
            }
          </Flex>
          <Text size="lg" align="center">
            No video found
          </Text>
        </Box>
      </section>
    );
  }

  return (
    <section className="browse-videos bg-white py-5">
      <Box className="container" pos="relative">
        {loading && <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />}
        <Box className="row">
          <Box className="col-12">
            <Flex justify="space-between" align="center" mb="xl">
              <Title order={2}>
              {title||'Browse Our'}{" "}
                <Text span c="#E90808" inherit>
                  Videos
                </Text>
              </Title>
              {!hideViewAll &&           
            <Anchor component={Link} href="/videos" c="#E90808">
              View all Videos
            </Anchor>
            }
            </Flex>
          </Box>
        </Box>

        {/* Main video display */}
        <Box className="row">
          <Box className="col-lg-6">
            <Card padding={0} className="video-thumbnail">
              <Card.Section className="position-relative">
                <iframe
                  width="100%"
                  height="400"
                  src={currentVideo.url} // Use the full URL from the current video
                  title={currentVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </Card.Section>
              <Title order={3} mt="xs" fw={600} className="title">
                {currentVideo.title}
              </Title>
            </Card>
          </Box>

          {/* Video suggestions */}
          <Box className="col-lg-6">
            <Box className="row">
              {suggestions.map((video) => (
                <Box className="col-lg-6" key={video.slug}>
                  <Card
                    mb="xs"
                    padding={0}
                    className="video-thumbnail video-thumbnail-sm"
                    onClick={() => handleVideoSelect(video.slug)}
                  >
                    <Card.Section className="position-relative">
                      <span className="play-button position-absolute">
                        <PlayButton />
                      </span>
                      <Image
                        src={video.thumbnail}
                        radius="sm"
                        className="img-fluid"
                        alt={video.title}
                      />
                    </Card.Section>
                    <Title order={5} mt="5" fw={600} className="title">
                      {video.title}
                    </Title>
                  </Card>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </section>
  );
};

export default BrowseVideos;
