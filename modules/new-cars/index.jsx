"use client";
import React, { useEffect, useState } from "react";
import {
  Anchor,
  Box,
  Group,
  Badge,
  Button,
  Card,
  Title,
  Input,
  Select,
  Text,
  Image,
  Flex,
  Rating,
  rem,
  Grid,

  Tabs,
} from "@mantine/core";
import {
  CarComparisonSmall,
  CarSmall,
  GearsHandle,
  SmallReviewIcon,
} from "@/components/Icons";
import WriteReviewModal from "@/components/ui/WriteReviewModal";
import QuickLinks from "@/components/QuickLinks";
import SearchBar from "./SearchBar"
import Comments from "@/components/sections/Comments"
import NewCarsCard from "@/components/ui/NewCarsCard"
import { IconSearch } from "@tabler/icons-react";
import BrowseByCategory from "@/modules/home/BrowseByCategory";
import ComparisonProducts from "@/modules/home/ComparisonProducts";
import BrowseVideos from "@/components/videos/browse-videos";
import BrowseBlogs from "@/components/blog/browse-blogs";
import { Carousel } from "@mantine/carousel";
import { useDisclosure } from "@mantine/hooks";

import BrowseByMakeAndBodies from "@/components/sections/BrowseByMakeAndBodies"
import ListingFilter from "@/components/listing/sidebar-filter";
import { getAllReviews } from "@/services/vehicles";
import { formatToMonthYear } from "@/utils";

const NewCarsModule = ({ makes, bodies, popularVehicles, fetchUpComingVehicles, fetchToyotaVehicles, fetchHondaVehicles, fetchMakesByTypeData, params, searchParams }) => {
  console.log('New Cars', fetchToyotaVehicles?.data)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  // const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // Initialize filter state

  const [reviews, setReviews] = useState([]);
  const [counts, setCounts] = useState({
    service: 0,
    mileage: 0,
    looks: 0,
    comfort: 0,
    space: 0,
    power: 0,
    total: 0,
  });
  const company_1 = {
    car: "Toyota",
    bike: "Suzuki",
    truck: "Forland"
  }
  const company_2 = {
    car: "Honda",
    bike: "Honda",
    truck: "ISUZU"
  }
  const tagsArray = [
    { name: "All (601)", isSelected: true },
    { name: "Service (39)" },
    { name: "Mileage (217)" },
    { name: "Looks (96)", isSelected: true },
    { name: "Comfort (155)" },
    { name: "Space (53)" },
    { name: "Power (53)" },
    { name: "More ..." },
  ];

  const filterOptions = [
    { type: 'all', label: 'All', countKey: 'total' },
    { type: 'service', label: 'Service', countKey: 'service' },
    { type: 'mileage', label: 'Mileage', countKey: 'mileage' },
    { type: 'looks', label: 'Looks', countKey: 'looks' },
    { type: 'comfort', label: 'Comfort', countKey: 'comfort' },
    { type: 'space', label: 'Space', countKey: 'space' },
    { type: 'power', label: 'Power', countKey: 'power' },
  ];


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await getAllReviews(filter);
        setReviews(response);
        setReviews(response?.reviews);
        setCounts(response?.counts);
      } catch (err) {
        setError('Error fetching reviews');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [filter]);


  console.log('reviews', reviews)
  return (
    <>
      <section className="find-cars">


        <Box className="background-search-verlay" mb="100">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <nav className="mt-3">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Anchor href="#">Bikes</Anchor>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      <Anchor href="#">New Bikes</Anchor>
                    </li>
                  </ol>
                </nav>
                <Group>
                  <Button
                    leftSection={<CarSmall />}
                    variant="light"
                    radius="md"
                    size="md"
                    bg="#333"
                    c="white"
                    autoContrast
                  >
                    New {params.params.newcarslug[0]}
                  </Button>
                  <Button
                    leftSection={<CarSmall />}
                    variant="light"
                    size="md"
                    radius="md"
                    bg="white"
                    c="#333"
                    autoContrast
                  >
                    Used {params.params.newcarslug[0]}
                  </Button>
                  <Button
                    leftSection={<CarComparisonSmall />}
                    variant="light"
                    size="md"
                    radius="md"
                    bg="white"
                    c="#333"
                    autoContrast
                  >
                    {params.params.newcarslug[0]} Comparison
                  </Button>
                  <Button
                    leftSection={<SmallReviewIcon />}
                    variant="light"
                    size="md"
                    radius="md"
                    bg="white"
                    c="#333"
                    autoContrast
                  >
                    {params.params.newcarslug[0]} Reviews
                  </Button>
                </Group>
              </div>
              <div className="col-md-12">
                <SearchBar fetchMakesByTypeData={fetchMakesByTypeData} />
              </div>
            </div>
          </div>
        </Box>

        <BrowseByMakeAndBodies makes={makes} bodies={bodies} />
        <section className="popular-new-cars py-5">
          <div className="container">
            <div className="row">
              <Box className="col-md-12" mb="xl">
                <Title order={2}>
                  Popular New{" "}
                  <Text span c="#E90808" inherit>
                    {params.params.newcarslug[0]}
                  </Text>
                </Title>
              </Box>
              {popularVehicles?.data?.results?.map((vehicle, index) => {
                return (
                  <Box className="col-md-3">
                    <NewCarsCard vehicle={vehicle} isRating={true} />
                  </Box>
                );
              })}
            </div>
          </div>
        </section>
        <section className="newly-launched-cars bg-light py-5">
          <div className="container">
            <div className="row">
              <Box className="col-md-12" mb="xl">
                <Title order={2}>
                  Newly Launched{" "}
                  <Text span c="#E90808" inherit>
                    {params.params.newcarslug[0]}
                  </Text>
                </Title>
              </Box>
              {fetchUpComingVehicles?.data?.results.map((vehicle, index) => {

                return (
                  <Box className="col-md-3" key={index}>
                    <NewCarsCard vehicle={vehicle} isRating={false} />

                  </Box>
                );
              })}
            </div>
          </div>
        </section>
        <section className="upcoming-cars py-5">
          <div className="container">
            <div className="row">
              <Box className="col-md-12" mb="xl">
                <Title order={2}>
                  Newly Launched{" "}
                  <Text span c="#E90808" inherit>
                    {params.params.newcarslug[0]}
                  </Text>
                </Title>
              </Box>
              {fetchUpComingVehicles?.data?.results?.map((vehicle, index) => {
                return (
                  <Box className="col-md-3" key={index}>
                    <NewCarsCard vehicle={vehicle} isRating={false} />
                  </Box>
                );
              })}
            </div>
          </div>
        </section>
        <section className="cars-by-model bg-light py-5">
          <div className="container">
            <div className="row">
              <Box className="col-md-12" mb="xl">
                <Title order={2}>
                  {company_1[params.params.newcarslug[0]]} New {params.params.newcarslug[0]}{" "}
                  <Text span c="#E90808" inherit>
                    Models
                  </Text>
                </Title>
              </Box>
              {fetchToyotaVehicles?.data?.results?.map((vehicle, index) => {
                return (
                  <Box className="col-md-3" key={index}>
                    <NewCarsCard vehicle={vehicle} isRating={false} />
                  </Box>
                );
              })}
            </div>
          </div>
        </section>
        <section className="cars-by-model py-5">
          <div className="container">
            <div className="row">
              <Box className="col-md-12" mb="xl">
                <Title order={2}>
                  {company_2[params.params.newcarslug[0]]} New {params.params.newcarslug[0]}{" "}
                  <Text span c="#E90808" inherit>
                    Models
                  </Text>
                </Title>
              </Box>
              {fetchHondaVehicles?.data?.results?.map((vehicle, index) => {
                return (
                  <Box className="col-md-3" key={index}>
                    <NewCarsCard vehicle={vehicle} isRating={false} />
                  </Box>
                );
              })}
            </div>
          </div>
        </section>

        <ComparisonProducts />
        <BrowseVideos />
        <BrowseBlogs />

  <Comments/>

        <QuickLinks />
      </section>
      {/* <WriteReviewModal opened={isModalOpen} close={closeModal} /> */}
    </>
  );
};

export default NewCarsModule;
