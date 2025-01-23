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
  Button,
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
              <Box key={index} miw="100%" pos="relative">
                {/* Image Background */}
                <Image 
                  src={item.image} 
                  h={440} 
                  style={{
                    cursor: item.link ? 'pointer' : 'default',
                    filter: 'brightness(0.7)' // Darker overlay for better text visibility
                  }}
                  onClick={() => item.link && window.open(item.link, '_blank')}
                />
                
                {/* Content Overlay - Moved to right side */}
                <Box
                  pos="absolute"
                  top="50%"
                  right={240}
                  style={{
                    transform: 'translateY(-50%)',
                    maxWidth: '600px',
                    zIndex: 2,
                    textAlign: 'center' // Align text to right
                  }}
                >
                  {/* Title */}
                  <Title
                    order={1}
                    mb={16}
                    c="white"
                    style={{
                      fontSize: '48px',
                      fontWeight: 700,
                      lineHeight: 1.2,
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                      textAlign: 'right' // Ensure title is right-aligned
                    }}
                  >
                    {item.title}
                  </Title>

                  {/* Description */}
                  {item.description && (
                    <Text
                      c="white"
                      mb={32}
                      style={{
                        fontSize: '18px',
                        lineHeight: 1.5,
                        opacity: 0.9,
                        marginLeft: 'auto', // Push text to right
                        textAlign: 'right', // Right align text
                        maxWidth: '80%'
                      }}
                    >
                      {item.description}
                    </Text>
                  )}

                  {/* Link Button - Right aligned */}
                  {item.link && (
                    <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        variant="filled"
                        bg="#E90808"
                        size="lg"
                        radius="md"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(item.link, '_blank');
                        }}
                        style={{
                          padding: '12px 32px',
                          fontSize: '16px',
                          fontWeight: 600,
                          textTransform: 'none',
                          border: 'none',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }}
                      >
                        Learn More
                      </Button>
                    </Box>
                  )}
                </Box>
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
