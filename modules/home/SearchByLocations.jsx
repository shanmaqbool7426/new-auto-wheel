"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import {
  Anchor,
  Input,
  Card,
  Flex,
  Text,
  Paper,
  Title,
  Box,
  Image,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import LocationSelector from "@/components/LocationSelector.jsx";
import { fetchNearByLocation } from "@/actions";
const SearchByLocations = () => {
  const router = useRouter();
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [nearByLocation, setNearByLocation] = useState([]);
  const [locationSelection, setLocationSelection] = useState({
    country: "PK",
    province: "",
    city: "",
    suburb: "",
  });


  const [loading, setLoading] = useState(false);

  const openLocationModal = () => setIsLocationModalOpen(true);
  const closeLocationModal = () => setIsLocationModalOpen(false);

  const handleSubmit = () => {
    const {province, city, suburb } = locationSelection;
    setLoading(true);
    
    // Helper function to format location name
    const formatLocationName = (name) => {
      if (!name) return '';
      return name.toLowerCase().replace(/\s+/g, '-');
    };
    
    const provinceQuery = province ? `/ct_${formatLocationName(province.name)}` : "";
    const cityQuery = city ? `/ct_${formatLocationName(city.name)}` : "";
    const suburbQuery = suburb ? `/ca_${formatLocationName(suburb.name)}` : "";
    const searchUrl = `/used-cars/search/${provinceQuery}${cityQuery}${suburbQuery}`;
    
    router.push(searchUrl)?.finally(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    const fetchNearByLocationData = async () => {
      const nearByLocation = await fetchNearByLocation();
      setNearByLocation(nearByLocation);
    };
    fetchNearByLocationData();
  }, []);
  return (
    <Box component="section" className="search-by-location py-5">
      <Box className="container-xl">
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
          <Box className="col-lg-8  order-last order-lg-first">
            <Box className="row">
              {nearByLocation?.slice(0, 5)?.map((location) => (
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
                      href={`/used-cars/search/-/ct_${location.slug}`}
                    >
                      <Image
                        src={location.image}
                        w={70}
                        h={70}
                        mx="auto"
                        mb="md"
                        alt={location.title}
                      />
                      <Text size="sm" c="dimmed">
                        Used cars in
                      </Text>
                      <Text c="dark" fw={600} ff="heading" size="sm">
                        {location.title}
                      </Text>
                    </Anchor>
                  </Card>
                </Box>
              ))}
            </Box>
            <Box className="row">
            {nearByLocation?.slice(5, 10)?.map((location) => (
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
                      href={`/used-cars/search/-/ct_${location.slug}`}
                    >
                      <Image
                        src={location.image}
                        w={70}
                        h={70}
                        mx="auto"
                        alt={location.title}
                        mb="md"
                      />
                      <Text size="sm" c="dimmed">
                        Used cars in
                      </Text>
                      <Text c="dark" fw={600} ff="heading" size="sm">
                        {location.title}
                      </Text>
                    </Anchor>
                  </Card>
                </Box>
              ))}
            </Box>
          </Box>
          <Box className="col-lg-4 order-first order-lg-last mb-lg-0 mb-4" pos="relative">
            <Paper p="lg">
              <Title order={4} c="dimmed" fw={500} ta="center" mt="lg">
                I am looking to buy a second <br /> hand car in
              </Title>
              <Input
                size="md"
                leftSection={<FaLocationDot />}
                placeholder="Select your location"
                value={`${locationSelection?.province?.name || ""} ${locationSelection?.city?.name || ""} ${locationSelection?.suburb?.name || ""}`
                   || ""}
                onClick={openLocationModal}
                mt="md"
              />

              <Image
                src={"/locations/locations-bg.svg"}
                pos="absolute"
                w="auto"
                className="d-lg-block d-none "
                bottom={0}
                alt="Location Vector Background"
              />
            </Paper>
          </Box>
        </Box>
      </Box>
      <LocationSelector
        isOpen={isLocationModalOpen}
        selection={locationSelection}
        setSelection={setLocationSelection}
        onClose={closeLocationModal}
        redirect={handleSubmit}
        hide={false}
      />
    </Box>
  );
};

export default SearchByLocations;
