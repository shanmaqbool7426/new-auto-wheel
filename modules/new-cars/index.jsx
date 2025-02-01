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
  MotorBikeSmall,
  SmallReviewIcon,
  TruckSmall,
} from "@/components/Icons";
import WriteReviewModal from "@/components/ui/WriteReviewModal";
import QuickLinks from "@/components/QuickLinks";
import SearchBar from "./SearchBar";
import Comments from "@/components/sections/Comments";
import NewCarsCard from "@/components/ui/NewCarsCard";
import { IconSearch } from "@tabler/icons-react";
import BrowseByCategory from "./browse-by-category";
import ComparisonProducts from "@/modules/home/ComparisonProducts";
import BrowseVideos from "@/components/videos/browse-videos";
import BrowseBlogs from "@/components/blog/browse-blogs";
import { Carousel } from "@mantine/carousel";
import { useDisclosure } from "@mantine/hooks";

import BrowseByMakeAndBodies from "@/components/sections/BrowseByMakeAndBodies";
import ListingFilter from "@/components/listing/sidebar-filter";
import { getAllReviews } from "@/services/vehicles";
import { formatToMonthYear } from "@/utils";
import Link from "next/link";

const NewCarsModule = ({
  makes,
  bodies,
  popularVehicles,
  fetchUpComingVehicles,
  fetchMakebyVehicles,
  fetchHondaVehicles,
  fetchMakesByTypeData,
  type,
  fetchNewlyLaunchedVehicles,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  // const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // Initialize filter state

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
    truck: "Forland",
  };
  const company_2 = {
    car: "Honda",
    bike: "Honda",
    truck: "ISUZU",
  };
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
    { type: "all", label: "All", countKey: "total" },
    { type: "service", label: "Service", countKey: "service" },
    { type: "mileage", label: "Mileage", countKey: "mileage" },
    { type: "looks", label: "Looks", countKey: "looks" },
    { type: "comfort", label: "Comfort", countKey: "comfort" },
    { type: "space", label: "Space", countKey: "space" },
    { type: "power", label: "Power", countKey: "power" },
  ];
  const getIconByType = () => {
    switch (type) {
      case 'bike':
        return <MotorBikeSmall />;
      case 'car':
        return <CarSmall />;
      case 'truck':
        return <TruckSmall />;
      default:
        return null;
    }
  };
  const getComparisonIconByType = () => {
    switch (type) {
      case 'bike':
        return <MotorBikeSmall />;
      case 'car':
        return <CarComparisonSmall />;
      case 'truck':
        return <TruckSmall />;
      default:
        return null;
    }
  };
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await getAllReviews(filter);
        setReviews(response);
        setReviews(response?.reviews);
        setCounts(response?.counts);
      } catch (err) {
        setError("Error fetching reviews");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [filter]);

  return (
    <>
      <section className="find-cars">
        <Box
          className="background-search-verlay"
          h={rem(250)}
          pt={80}
          mb={{ base: 550, sm: 120 }}
        >
          <div className="container-xl">
            <div className="row">
              <div className="col-md-12">
                <nav>
                  <ol className="breadcrumb mb-3">
                    <li className="breadcrumb-item">
                      <Anchor component={Link} href={`/`} tt="capitalize">Home</Anchor>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      <Anchor href="#" tt="capitalize">New {type}</Anchor>
                    </li>
                  </ol>
                </nav>
                <Group>
                  <Button
                    leftSection={getIconByType()}
                    variant="light"
                    size="md"
                    bg="#333"
                    c="white"
                    tt="capitalize"
                    autoContrast
                    h={39}
                    radius="16px"
                  >
                    New {type}
                  </Button>
                  <Button
                    leftSection={getIconByType()}
                    variant="light"
                    size="md"
                    bg="white"
                    c="#878787"
                    tt="capitalize"
                    component={Link}
                    href={`/listing/${type}s`}
                    autoContrast
                    h={39}
                    radius="16px"
                  >
                    Used {type}
                  </Button>
                  <Button
                    leftSection={getComparisonIconByType()}
                    variant="light"
                    size="md"
                    bg="white"
                    c="#878787"
                    tt="capitalize"
                    component={Link}
                    href={`/comparison/${type}`}
                    autoContrast
                    h={39}
                    radius="16px"
                  >
                    {type} Comparison
                  </Button>
                  <Button
                    leftSection={<SmallReviewIcon />}
                    variant="light"
                    size="md"
                    bg="white"
                    c="#878787"
                    tt="capitalize"
                    component={Link}
                    href={`/reviews/${type}`}
                    autoContrast
                    h={39}
                    radius="16px"
                  >
                    {type} Reviews
                  </Button>

                  <Button
                    leftSection={<SmallReviewIcon />}
                    variant="light"
                    size="md"
                    bg="white"
                    c="#878787"
                    tt="capitalize"
                    component={Link}
                    href={`/cars-dealership`}
                    autoContrast
                    h={39}
                    radius="16px"
                  >
                    {type} Dealer
                  </Button>
                </Group>
              </div>
              <div className="col-md-12">
                <SearchBar fetchMakesByTypeData={fetchMakesByTypeData} type={type} />
              </div>
            </div>
          </div>
        </Box>

        {/* <BrowseByMakeAndBodies makes={makes} bodies={bodies} type={type}/> */}
        <BrowseByCategory makes={makes} bodies={bodies} type={type} />
        <Box component="section" className="popular-new-cars" pt="27px" pb="24px">
          <div className="container-xl">
            <div className="row">
              <Box className="col-md-12" mb="40px">
                <Title order={2} lh="1">
                  Popular New{" "}
                  <Text span c="#E90808" inherit tt="capitalize">
                    {`${type}s`}
                  </Text>
                </Title>
              </Box>
              {popularVehicles?.data?.map((vehicle, index) => {
                return (
                  <Box className="col-md-3">
                    <NewCarsCard vehicle={vehicle} isRating={true} />
                  </Box>
                );
              })}
            </div>
          </div>
        </Box>
        <Box component="section" className="newly-launched-cars bg-light" pt="40px" pb="8px">
          <div className="container-xl">
            <div className="row">
              <Box className="col-md-12" mb="32px">
                <Title order={2} lh="1">
                  Newly Launched{" "}
                  <Text span c="#E90808" inherit tt="capitalize">
                    {`${type}s`}
                  </Text>
                </Title>
              </Box>
              {fetchNewlyLaunchedVehicles?.data?.map((vehicle, index) => {
                return (
                  <Box className="col-md-3" key={index}>
                    <NewCarsCard vehicle={vehicle} isRating={false} />
                  </Box>
                );
              })}
            </div>
          </div>
        </Box>
        <Box component="section" className="upcoming-cars" pt="56px" pb="24px">
          <div className="container-xl">
            <div className="row">
              <Box className="col-md-12" mb="32px">
                <Title order={2} lh="1">
                  Upcoming{" "}
                  <Text span c="#E90808" inherit tt="capitalize">
                    {`${type}s`}
                  </Text>
                </Title>
              </Box>
              {fetchUpComingVehicles?.data?.map((vehicle, index) => {
                return (
                  <Box className="col-md-3" key={index}>
                    <NewCarsCard vehicle={vehicle} isRating={false} />
                  </Box>
                );
              })}
            </div>
          </div>
        </Box>
        <Box component="section" className="cars-by-model bg-light" pt="40px" pb="8px">
          <div className="container-xl">
            <div className="row">
              <Box className="col-md-12" mb="32px">
                <Title order={2} tt="capitalize" lh={'1'}>
                  {company_1[type]} New{" "}
                  {type}{" "}
                  <Text span c="#E90808" inherit>
                    Models
                  </Text>
                </Title>
              </Box>
              {fetchMakebyVehicles?.data?.map((vehicle, index) => {
                return (
                  <Box className="col-md-3" key={index}>
                    <NewCarsCard vehicle={vehicle} isRating={false} />
                  </Box>
                );
              })}
            </div>
          </div>
        </Box>
        <Box component="section" className="cars-by-model" pt="56px">
          <div className="container-xl">
            <div className="row">
              <Box className="col-md-12" mb="32px">
                <Title order={2} tt="capitalize" lh="1">
                  {company_2[type]} New{" "}
                  {type}{" "}
                  <Text span c="#E90808" inherit>
                    Models
                  </Text>
                </Title>
              </Box>
              {fetchHondaVehicles?.data?.map((vehicle, index) => {
                return (
                  <Box className="col-md-3" key={index}>
                    <NewCarsCard vehicle={vehicle} isRating={false} />
                  </Box>
                );
              })}
            </div>
          </div>
        </Box>

        <ComparisonProducts type={type} />
        <BrowseVideos type={type} />
        <BrowseBlogs />

        <Comments fetchMakesByTypeData={fetchMakesByTypeData} />

        <QuickLinks />
      </section>
      <WriteReviewModal opened={isModalOpen} close={closeModal} fetchMakesByTypeData={fetchMakesByTypeData} />
    </>
  );
};

export default NewCarsModule;
