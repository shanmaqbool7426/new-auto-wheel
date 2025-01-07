"use client";
import React, { useState } from "react";
import HeroTabs from "@/components/HeroTabs";
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
import styles from "./Hero.module.css";

const Hero = ({banner}) => {
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
          <Box
            className="hero-banner__slider"
            h={440}
            display="flex"
            style={{
              transition: "transform 0.5s ease-in-out",
              transform: `translateX(-${currentIndex * 100}%)`, // Slide effect
            }}
          >
            {banner.map((item, index) => (
              <Box key={index} miw="100%">
                <Image src={item.image} h={440} />
              </Box>
            ))}
          </Box>

          <Box className="container-xl" pos="absolute" inset={0} py={rem(32)}>
            <Box className="row">
              <Box className="col-lg-4 col-sm-6">
                <Card shadow="xl" padding={0} radius="md" className={styles.card}>
                  <Box ta="left" className={styles.cardHeader}>
                    <Title order={4} className={styles.cardTitle}>
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
                  <Box className={styles.cardBody}>
                    <HeroTabs setType={setType} />
                  </Box>
                </Card>
              </Box>
              <Box className="col-lg-8 col-sm-12" pos="relative">
                <List
                  pos={{ md: "absolute" }}
                  mt={{ base: "lg", md: 0 }}
                  bottom={0}
                  className="car-lists-slider"
                  listStyleType="none"
                  size="sm"
                  display="flex"
                // style={{ color: "#fff", cursor: "pointer" }} // Make list items clickable
                >
                  {banner.map((item, index) => (
                    <List.Item
                      key={index}
                      className={currentIndex === index ? "active" : ""}
                      onClick={() => changeSlide(index)} // Switch to corresponding slide
                    >
                      {item.title}
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
