"use client";
import React, { useState } from "react";
import HeroTabs from "@/components/hero-tabs";
import {
  Card,
  Title,
  Text,
  Box,
  rem,
  List,
  Transition,
  Image,
} from "@mantine/core";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // Current image index
  const [slideDirection, setSlideDirection] = useState("right"); // Direction of
  const [type, setType] = useState("car");
  // Array of background images
  const images = [
    { src: "/hero-banner.png", title: "Hyundai Car Review" },
    { src: "https://placehold.co/1920x550", title: "2023 Safari Review" },
    {
      src: "https://placehold.co/1920x550/green/white",
      title: "2023 Tesla Review",
    },
    {
      src: "https://placehold.co/1920x550/orange/white",
      title: "2023 Audi Review",
    },
    {
      src: "https://placehold.co/1920x550/purple/white",
      title: "2023 BMW Review",
    },
  ];
  // Function to change the background image and set slide direction
  const changeSlide = (newIndex) => {
    if (newIndex > currentIndex) {
      setSlideDirection("right"); // Slide to the right
    } else {
      setSlideDirection("left"); // Slide to the left
    }
    setCurrentIndex(newIndex); // Update the current index
  };

  return (
    <>
      {/* className="hero-banner" */}
      <Box pt={rem(60)}>
        <Box className="hero-banner" pos="relative">
          {/* Transition for sliding effect */}
          {/* <Box className="hero-banner__slider" h={550} pos="relative">
            {images.map((image, index) => (
              <Transition
                key={image.src}
                mounted={index === currentIndex} // Only mount the currently active slide
                transition={`slide-${slideDirection}`}
                duration={500} // Adjust duration for smooth slide
                timingFunction="ease"
              >
                {(styles) => (
                  <Box
                    style={{ ...styles, position: "absolute", width: "100%" }} // Position the slides absolutely for proper sliding
                  >
                    <Image src={image.src} h={550} />
                  </Box>
                )}
              </Transition>
            ))}
          </Box> */}
          <Box
            className="hero-banner__slider"
            h={550}
            style={{
              display: "flex",
              transition: "transform 0.5s ease-in-out",
              transform: `translateX(-${currentIndex * 100}%)`, // Slide effect
            }}
          >
            {images.map((image, index) => (
              <Box key={index} miw="100%">
                <Image src={image.src} h={550} />
              </Box>
            ))}
          </Box>

          <Box className="container" pos="absolute" inset={0} py={rem(50)}>
            <Box className="row">
              <Box className="col-lg-4">
                <Card shadow="xl" padding={0} radius="md">
                  <Box p="md" px="lg" ta="left" className="border-bottom">
                    <Title order={4}>
                      Find your right{" "}
                      <Text
                        span
                        inherit
                        className="text-primary"
                        tt="capitalize"
                      >
                        {type.toLowerCase()}
                      </Text>
                    </Title>
                  </Box>
                  <Box p="md" px="lg">
                    <HeroTabs setType={setType} />
                  </Box>
                </Card>
              </Box>
              <Box className="col-lg-8" pos="relative">
                <List
                  pos="absolute"
                  bottom={0}
                  className="car-lists-slider"
                  listStyleType="none"
                  size="sm"
                  display="flex"
                  style={{ color: "#fff", cursor: "pointer" }} // Make list items clickable
                >
                  {images.map((image, index) => (
                    <List.Item
                      key={index}
                      className={currentIndex === index ? "active" : ""}
                      onClick={() => changeSlide(index)} // Switch to corresponding slide
                    >
                      {image.title}
                    </List.Item>
                  ))}
                </List>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Hero;
