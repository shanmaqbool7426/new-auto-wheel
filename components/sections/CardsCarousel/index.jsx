'use client';
import React from 'react';
import { Box, Title, Text, Flex } from '@mantine/core';
import styles from './CardsCarousel.module.css';
import { Carousel } from '@mantine/carousel';
import NewCarsCard from '@/components/ui/NewCarsCard';
import CarCard from '@/components/ui/CarCard';

export default function CardsCarousel({ title, primaryTitle, bg = "#fff", isRating = true, data , isUsedVehicle=true,userData}) {

  return (
    <Box component="section" className={styles.section} bg={bg}>
      <Box className="container-xl">
        <Box className={styles.sectionHeader}>
          <Title order={2} lh={'1'}>
            {title}{" "}
            <Text span inherit className="text-primary">
              {primaryTitle}
            </Text>
          </Title>
        </Box>

        <Box className={styles.carouselWrapper}>
          <Carousel
            align="start"
            slideSize={{ base: '100%', sm: '50%', md: '33.333333%', lg: '25%' }}
            slideGap={{ base: 0, sm: 'md', md: 'md', lg: 'md' }}
            withControls={true}
            controlSize={24}
            slidesToScroll={1}
            classNames={{ viewport: styles.viewPort, controls: styles.controls, control: styles.control }}
          >
            {data?.map((vehicle, index) => (
              <Carousel.Slide key={vehicle?._id}>
                 {isUsedVehicle ? <CarCard vehicle={vehicle} userData={userData}/> : <NewCarsCard vehicle={vehicle} isRating={isRating} mb="0" />}
              </Carousel.Slide>
            ))}

          </Carousel>
        </Box>
      </Box>
    </Box>
  )
}
