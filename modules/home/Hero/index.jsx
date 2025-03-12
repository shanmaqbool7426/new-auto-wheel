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
  Button,
  BackgroundImage,
} from "@mantine/core";
import styles from "./Hero.module.css";

const Hero = ({ banner }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [type, setType] = useState("car");

  const changeSlide = (newIndex) => {
    setCurrentIndex(newIndex);
  };

  return (
    <Box
      pos="relative"
      h={{ base: 800, md: 510, lg: 510 }}
      style={{ overflow: "hidden" }}
      pt={rem(60)}
      className="hero-banner"
    >
      {/* Sliding Backgrounds */}
      <Box
        h="100%"
        display="flex"
        style={{
          transition: "transform 0.5s ease-in-out",
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {banner.map((item, index) => (
          <BackgroundImage
            key={index}
            src={item.image}
            h="100%"
            w="100%"
            style={{
              flexShrink: 0,
              width: "100%",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Box
              pos="absolute"
              top={0}
              left={0}
              w="100%"
              h="100%"
              bg="rgba(0, 0, 0, 0.03)" // Semi-transparent black
              style={{ zIndex: 1 }}
            />
          </BackgroundImage>
        ))}
      </Box>

      {/* Fixed Content */}
      <Box
        className="container-xl"
        pos="absolute"
        inset={0}
        pt={rem(60)}
        h="100%"
        style={{ zIndex: 1 }}
      >
        <Box
          className="row align-items-center"
          h={{ base: "auto", lg: "100%" }}
        >
          {/* Left Column */}
          <Box className="col-lg-4 h-100" py={{ base: "md", md: "xl" }}>
            <Card
              shadow="xl"
              padding={0}
              radius="md"
              w={{ base: "100%", sm: rem(330) }}
              className={styles.card}
            >
              <Box ta="left" className={styles.cardHeader}>
                <Title order={4} className={styles.cardTitle}>
                  Find your right{" "}
                  <Text span inherit className="text-primary" tt="capitalize">
                    {type.toLowerCase()}
                  </Text>
                </Title>
              </Box>
              <Box className={styles.cardBody}>
                <HeroTabs setType={setType} />
              </Box>
            </Card>
          </Box>

          {/* Right Column */}
          <Box
            className="col-lg-8 h-100"
            pt={{ md: 0, lg: rem(70) }}
            pb={{ md: 0, lg: "xl" }}
          >
            <Box className="content-area" pos="relative h-100">
              <Box className="hero-content" maw="90%">
                {/* <Title order={1} mb={16} c="white" size={rem(48)} lts={-0.5}>
                  {banner[currentIndex]?.title}
                </Title>
                <Text c="white" mb={32}>
                  {banner[currentIndex]?.description}
                </Text>
                {banner[currentIndex]?.link && (
                  <Button
                    variant="filled"
                    bg="#E90808"
                    ff="heading"
                    size="lg"
                    fw={500}
                    tt="capitalize"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(banner[currentIndex].link, "_blank");
                    }}
                  >
                    Read More
                  </Button>
                )} */}
              </Box>

              <Box className="banner-slides-list" pos="absolute" bottom="40px">
                <List
                  className="car-lists-slider"
                  listStyleType="none"
                  size="sm"
                  display="flex"
                  spacing="md"
                  style={{
                    gap: '30px'
                  }}
                >
                  {banner.map((item, index) => (
                    <List.Item
                      key={index}
                      className={`${styles.sliderItem} ${
                        currentIndex === index ? styles.sliderItemActive : ''
                      }`}
                      onClick={() => changeSlide(index)}
                      style={{
                        padding: '0 0 8px 0',
                        margin: 0,
                        borderBottom: `2px solid ${currentIndex === index ? 'white' : 'white'}`,
                        minWidth: index === 0 || index === banner.length - 1 ? 'auto' : '120px',
                      }}
                    >
                      <Text
                        size="sm"
                        lh={1.4}
                        style={{
                          color: 'white',
                          transition: 'all 0.3s ease',
                          whiteSpace: index === 0 || index === banner.length - 1 ? 'nowrap' : 'normal',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          textAlign: 'center'
                        }}
                      >
                        {item.title}
                      </Text>
                    </List.Item>
                  ))}
                </List>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
