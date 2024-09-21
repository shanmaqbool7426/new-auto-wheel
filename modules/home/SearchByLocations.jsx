"use client";
// import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { City } from "country-state-city";
import {
  Anchor,
  Autocomplete,
  Card,
  Flex,
  Text,
  Paper,
  Title,
  Box,
  Image,
} from "@mantine/core";
import { useRouter } from "next/navigation";

const SearchByLocations = () => {
  const router = useRouter();

  const [cityOptions, setCityOptions] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for button

  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const handleInputChange = (input) => {
    setQuery(input);

    if (input.length > 0) {
      const cities = City.getCitiesOfCountry("PK");

      const filtered = cities
        .filter((city) =>
          city.name.toLowerCase().startsWith(input.toLowerCase())
        )
        .map((city) => city.name);

      if (filtered.length == 1) {
        const cityQuery = `/ct_${filtered[0].toLowerCase()}`;
        const searchUrl = `/listing/cars/search/-${cityQuery}`;
        router.push(searchUrl)?.finally(() => {
          setLoading(false); // Reset loading state after redirect
        });
      }

      setCityOptions(filtered);
    } else {
      setCityOptions([]); // Clear the options if input is empty
    }
  };
  const locations = [
    { name: "Karachi", slug: "ct_karachi", image: "/locations/karachi.svg" },
    {
      name: "Islamabad",
      slug: "ct_islamabad",
      image: "/locations/islamabad.svg",
    },
    { name: "Lahore", slug: "ct_lahore", image: "/locations/lahore.svg" },
    {
      name: "Faisalabad",
      slug: "ct_faisalabad",
      image: "/locations/faisalabad.svg",
    },
    { name: "Peshawar", slug: "ct_peshawar", image: "/locations/peshawar.svg" },
  ];
  return (
    <Box component="section" className="search-by-location py-5">
      <Box className="container">
        <Box className="row">
          <Box className="col-12">
            <Flex justify="space-between" align="center" mb="xl">
              <Title order={2}>
                Get trusted used Cars{" "}
                <Text span c="#E90808" inherit>
                  Nearby
                </Text>
              </Title>
            </Flex>
          </Box>
        </Box>
        <Box className="row">
          <Box className="col-lg-8">
            <Box className="row">
              {locations.map((location) => (
                <Box className="col" key={location.slug}>
                  <Card
                    bg="#fff"
                    shadow="0px 4px 20px 0px rgba(0, 0, 0, 0.0784313725)"
                    mb="lg"
                    ta="center"
                  >
                    <Anchor
                      underline="none"
                      component={Link}
                      href={`/listing/cars/search/-/${location.slug}`}
                    >
                      <Image
                        src={location.image}
                        w={70}
                        h={70}
                        mx="auto"
                        mb="md"
                        alt={location.name}
                      />
                      <Text size="sm" c="dimmed">
                        Used cars in
                      </Text>
                      <Text c="dark" fw={600} ff="heading" size="sm">
                        {location.name}
                      </Text>
                    </Anchor>
                  </Card>
                </Box>
              ))}
            </Box>
            <Box className="row">
              {locations.map((location) => (
                <Box className="col" key={location.slug}>
                  <Card
                    bg="#fff"
                    shadow="0px 4px 20px 0px rgba(0, 0, 0, 0.0784313725)"
                    mb="lg"
                    ta="center"
                  >
                    <Anchor
                      underline="none"
                      component={Link}
                      href={`/listing/cars/search/-/${location.slug}`}
                    >
                      <Image
                        src={location.image}
                        w={70}
                        h={70}
                        mx="auto"
                        alt={location.name}
                        mb="md"
                      />
                      <Text size="sm" c="dimmed">
                        Used cars in
                      </Text>
                      <Text c="dark" fw={600} ff="heading" size="sm">
                        {location.name}
                      </Text>
                    </Anchor>
                  </Card>
                </Box>
              ))}
            </Box>
          </Box>
          <Box className="col-lg-4" pos="relative">
            <Paper p="lg">
              <Title order={4} c="dimmed" fw={500} ta="center" mt="lg">
                I am looking to buy a second <br /> hand car in
              </Title>
              <Autocomplete
                size="md"
                leftSection={<FaLocationDot />}
                placeholder="Enter your city"
                data={cityOptions}
                value={query}
                onChange={handleInputChange}
                withScrollArea={false}
                styles={{ dropdown: { maxHeight: 250, overflowY: "auto" } }}
                mt="md"
              />
              <Image
                src={"/locations/locations-bg.svg"}
                pos="absolute"
                w="auto"
                bottom={0}
                alt="Location Vector Background"
              />
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SearchByLocations;
