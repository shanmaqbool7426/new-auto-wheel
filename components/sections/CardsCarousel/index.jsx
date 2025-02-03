'use client';
import React from 'react';
import { Box, Title, Text } from '@mantine/core';
import styles from './CardsCarousel.module.css';
import { Carousel } from '@mantine/carousel';
import NewCarsCard from '@/components/ui/NewCarsCard';

const cars = [
  {
    "_id": "67977c987c0db87256d94bbb",
    "make": "Honda",
    "model": "Civic",
    "variant": "VTI Oriel",
    "type": "car",
    "year": 2025,
    "minPrice": 637000,
    "maxPrice": 8110000,
    "defaultImage": "https://res.cloudinary.com/dcfpazr4b/image/upload/v1737981222/b82kwuay3dmmlf3wxax6.png",
    "views": 0,
    "slug": "honda-civic-vti-oriel-2025",
    "averageRating": 0,
    "reviewCount": 0
  },
  {
    "_id": "67977c987c0db8dsd7256d94bbb",
    "make": "Honda",
    "model": "Civic",
    "variant": "VTI Oriel",
    "type": "car",
    "year": 2025,
    "minPrice": 637000,
    "maxPrice": 8110000,
    "defaultImage": "https://res.cloudinary.com/dcfpazr4b/image/upload/v1737981222/b82kwuay3dmmlf3wxax6.png",
    "views": 0,
    "slug": "honda-civic-vti-oriel-2025",
    "averageRating": 0,
    "reviewCount": 0
  },
  {
    "_id": "67977c987c0db8dsd7256d94bbb",
    "make": "Honda",
    "model": "Civic",
    "variant": "VTI Oriel",
    "type": "car",
    "year": 2025,
    "minPrice": 637000,
    "maxPrice": 8110000,
    "defaultImage": "https://res.cloudinary.com/dcfpazr4b/image/upload/v1737981024/wm2t5rmyl5fpkt4hvdqb.png",
    "views": 0,
    "slug": "honda-civic-vti-oriel-2025",
    "averageRating": 0,
    "reviewCount": 0
  },
  {
    "_id": "67977c987c0db8dsd7256d94bbb",
    "make": "Honda",
    "model": "Civic",
    "variant": "VTI Oriel",
    "type": "car",
    "year": 2025,
    "minPrice": 637000,
    "maxPrice": 8110000,
    "defaultImage": "https://res.cloudinary.com/dcfpazr4b/image/upload/v1737981222/b82kwuay3dmmlf3wxax6.png",
    "views": 0,
    "slug": "honda-civic-vti-oriel-2025",
    "averageRating": 0,
    "reviewCount": 0
  },
  {
    "_id": "67977c987c0db8dsd7256d94bbb",
    "make": "Honda",
    "model": "Civic",
    "variant": "VTI Oriel",
    "type": "car",
    "year": 2025,
    "minPrice": 637000,
    "maxPrice": 8110000,
    "defaultImage": "https://res.cloudinary.com/dcfpazr4b/image/upload/v1737981024/wm2t5rmyl5fpkt4hvdqb.png",
    "views": 0,
    "slug": "honda-civic-vti-oriel-2025",
    "averageRating": 0,
    "reviewCount": 0
  },
  {
    "_id": "67977c987c0db8dsd7256d94bbb",
    "make": "Honda",
    "model": "Civic",
    "variant": "VTI Oriel",
    "type": "car",
    "year": 2025,
    "minPrice": 637000,
    "maxPrice": 8110000,
    "defaultImage": "https://res.cloudinary.com/dcfpazr4b/image/upload/v1737981024/wm2t5rmyl5fpkt4hvdqb.png",
    "views": 0,
    "slug": "honda-civic-vti-oriel-2025",
    "averageRating": 0,
    "reviewCount": 0
  },
  {
    "_id": "67977c987c0db8dsd7256d94bbb",
    "make": "Honda",
    "model": "Civic",
    "variant": "VTI Oriel",
    "type": "car",
    "year": 2025,
    "minPrice": 637000,
    "maxPrice": 8110000,
    "defaultImage": "https://res.cloudinary.com/dcfpazr4b/image/upload/v1737981024/wm2t5rmyl5fpkt4hvdqb.png",
    "views": 0,
    "slug": "honda-civic-vti-oriel-2025",
    "averageRating": 0,
    "reviewCount": 0
  },
  {
    "_id": "67977c987c0db8dsd7256d94bbb",
    "make": "Honda",
    "model": "Civic",
    "variant": "VTI Oriel",
    "type": "car",
    "year": 2025,
    "minPrice": 637000,
    "maxPrice": 8110000,
    "defaultImage": "https://res.cloudinary.com/dcfpazr4b/image/upload/v1737981024/wm2t5rmyl5fpkt4hvdqb.png",
    "views": 0,
    "slug": "honda-civic-vti-oriel-2025",
    "averageRating": 0,
    "reviewCount": 0
  },
  {
    "_id": "67977c987c0db8dsd7256d94bbb",
    "make": "Honda",
    "model": "Civic",
    "variant": "VTI Oriel",
    "type": "car",
    "year": 2025,
    "minPrice": 637000,
    "maxPrice": 8110000,
    "defaultImage": "https://res.cloudinary.com/dcfpazr4b/image/upload/v1737981222/b82kwuay3dmmlf3wxax6.png",
    "views": 0,
    "slug": "honda-civic-vti-oriel-2025",
    "averageRating": 0,
    "reviewCount": 0
  },
]

export default function CardsCarousel({ bg = "#fff" }) {
  return (
    <Box component="section" className={styles.section} bg={bg}>
      <Box className="container-xl">
        <Box className={styles.sectionHeader}>
          <Title order={2} lh={'1'}>
            {`Toyota Corolla 2023`}{" "}
            <Text span inherit className="text-primary">
              Competitors
            </Text>
          </Title>
        </Box>

        <Box className={styles.sectionBody}>
          <Carousel
            align="start"
            slideSize={{ base: '100%', sm: '50%', md: '33.333333%', lg: '25%' }}
            slideGap={{ base: 0, sm: 'md', md: 'md', lg: 'md' }}
            withControls={true}
            controlSize={24}
            slidesToScroll={1}
            classNames={{ viewport: styles.viewPort, controls: styles.controls, control: styles.control }}
          >
            {cars.map((vehicle, index) => (
              <Carousel.Slide key={vehicle?._id}>
                <NewCarsCard vehicle={vehicle} isRating={true} mb="0" />
              </Carousel.Slide>
            ))}

          </Carousel>
        </Box>
      </Box>
    </Box>
  )
}
