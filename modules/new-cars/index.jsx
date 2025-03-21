"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
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
import BrowseByCategory from "../home/BrowseByCategory";
import ComparisonProducts from "@/modules/home/ComparisonProducts";
import BrowseVideos from "@/components/videos/browse-videos";
import BrowseBlogs from "@/components/blog/browse-blogs";
import { getAllReviews } from "@/services/vehicles";
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
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  // const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // Initialize filter state
  const [showAllLaunched, setShowAllLaunched] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showAllPopular, setShowAllPopular] = useState(false);
  const [showAllUpcoming, setShowAllUpcoming] = useState(false);
  const [showAllMake1, setShowAllMake1] = useState(false);
  const [showAllMake2, setShowAllMake2] = useState(false);

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
        const response = await getAllReviews(filter, type);
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
  }, [filter, type]);

  // Replace router.pathname check with pathname
  const isNew = pathname?.includes('/new/');

  const transitionStyles = {
    transition: 'all 0.3s ease-in-out',
    opacity: isTransitioning ? 0 : 1,
    transform: isTransitioning ? 'translateY(20px)' : 'translateY(0)'
  };

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
            <div className="row new-cars-search-breadcrumb">
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
                    href={`/dealers`}
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
      
        <BrowseByCategory 
          makes={makes} 
          bodies={bodies} 
          type={type} 
          isNew={isNew}  // Pass isNew prop
        />
        <Box component="section" className="popular-new-cars" pt="27px" pb="24px">
          <div className="container-xl">
            <div className="row" style={{ transition: 'all 0.3s ease-in-out' }}>
              <Box className="col-md-12" mb="13px">
                <Title order={2} lh="1">
                  Popular New{" "}
                  <Text span c="#E90808" inherit tt="capitalize">
                    {`${type}s`}
                  </Text>
                </Title>
              </Box>
              {(showAllPopular 
                ? popularVehicles?.data 
                : popularVehicles?.data?.slice(0, 8)
              )?.map((vehicle, index) => {
                return (
                  <Box 
                    className="col-md-3" 
                    key={index}
                    style={transitionStyles}
                  >
                    <NewCarsCard vehicle={vehicle} isRating={true} />
                  </Box>
                );
              })}
              {popularVehicles?.data?.length > 8 && (
                <Box className="col-12" mb="">
                  {/* <Text 
                    component="span" 
                    c="#E90808" 
                    style={{ 
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      float: 'right',
                      marginRight: '15px'
                    }}
                    onClick={() => {
                      setIsTransitioning(true);
                      setTimeout(() => {
                        setShowAllPopular(!showAllPopular);
                        setTimeout(() => {
                          setIsTransitioning(false);
                        }, 50);
                      }, 300);
                    }}
                  >
                    {showAllPopular ? "Show Less" : "Show More"}
                  </Text> */}
                </Box>
              )}
            </div>
          </div>
        </Box>
        <Box component="section" className="newly-launched-cars bg-light" pt="40px" pb="45px">
          <div className="container-xl">
            <div className="row" style={{ transition: 'all 0.3s ease-in-out' }}>
              <Box className="col-md-12" mb="13px">
                <Title order={2} lh="1">
                  Newly Launched{" "}
                  <Text span c="#E90808" inherit tt="capitalize">
                    {`${type}s`}
                  </Text>
                </Title>
              </Box>
              {(showAllLaunched 
                ? fetchNewlyLaunchedVehicles?.data 
                : fetchNewlyLaunchedVehicles?.data?.slice(0, 8)
              )?.map((vehicle, index) => {
                return (
                  <Box 
                    className="col-md-3" 
                    key={index}
                    style={transitionStyles}
                  >
                    <NewCarsCard vehicle={vehicle} isRating={false} />
                  </Box>
                );
              })}
              {fetchNewlyLaunchedVehicles?.data?.length > 8 && (
                <Box className="col-12" mb="13px">
                  <Text 
                    component="span" 
                    c="#E90808" 
                    style={{ 
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      float: 'right',
                      marginRight: '15px'
                    }}
                    onClick={() => {
                      setIsTransitioning(true);
                      setTimeout(() => {
                        setShowAllLaunched(!showAllLaunched);
                        setTimeout(() => {
                          setIsTransitioning(false);
                        }, 50);
                      }, 300);
                    }}
                  >
                    {showAllLaunched ? "Show Less" : "Show More"}
                  </Text>
                </Box>
              )}
            </div>
          </div>
        </Box>
        <Box component="section" className="upcoming-cars" pt="56px" pb="45px">
          <div className="container-xl">
            <div className="row" style={{ transition: 'all 0.3s ease-in-out' }}>
              <Box className="col-md-12" mb="13px">
                <Title order={2} lh="1">
                  Upcoming{" "}
                  <Text span c="#E90808" inherit tt="capitalize">
                    {`${type}s`}
                  </Text>
                </Title>
              </Box>
              {(showAllUpcoming 
                ? fetchUpComingVehicles?.data 
                : fetchUpComingVehicles?.data?.slice(0, 8)
              )?.map((vehicle, index) => {
                return (
                  <Box 
                    className="col-md-3" 
                    key={index}
                    style={transitionStyles}
                  >
                    <NewCarsCard vehicle={vehicle} isRating={false} />
                  </Box>
                );
              })}
              {fetchUpComingVehicles?.data?.length > 8 && (
                <Box className="col-12" mb="13px">
                  <Text 
                    component="span" 
                    c="#E90808" 
                    style={{ 
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      float: 'right',
                      marginRight: '15px'
                    }}
                    onClick={() => {
                      setIsTransitioning(true);
                      setTimeout(() => {
                        setShowAllUpcoming(!showAllUpcoming);
                        setTimeout(() => {
                          setIsTransitioning(false);
                        }, 50);
                      }, 300);
                    }}
                  >
                    {showAllUpcoming ? "Show Less" : "Show More"}
                  </Text>
                </Box>
              )}
            </div>
          </div>
        </Box>
        <Box component="section" className="cars-by-model bg-light" pt="40px" pb="45px">
          <div className="container-xl">
            <div className="row" style={{ transition: 'all 0.3s ease-in-out' }}>
              <Box className="col-md-12" mb="32px">
                <Title order={2} tt="capitalize" lh={'1'}>
                  {company_1[type]} New{" "}
                  {type}{" "}
                  <Text span c="#E90808" inherit>
                    Models
                  </Text>
                </Title>
              </Box>
              {(showAllMake1 
                ? fetchMakebyVehicles?.data 
                : fetchMakebyVehicles?.data?.slice(0, 8)
              )?.map((vehicle, index) => {
                return (
                  <Box 
                    className="col-md-3" 
                    key={index}
                    style={transitionStyles}
                  >
                    <NewCarsCard vehicle={vehicle} isRating={false} />
                  </Box>
                );
              })}
              {fetchMakebyVehicles?.data?.length > 8 && (
                <Box className="col-12" mb="20px">
                  <Text 
                    component="span" 
                    c="#E90808" 
                    style={{ 
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      float: 'right',
                      marginRight: '15px'
                    }}
                    onClick={() => {
                      setIsTransitioning(true);
                      setTimeout(() => {
                        setShowAllMake1(!showAllMake1);
                        setTimeout(() => {
                          setIsTransitioning(false);
                        }, 50);
                      }, 300);
                    }}
                  >
                    {showAllMake1 ? "Show Less" : "Show More"}
                  </Text>
                </Box>
              )}
            </div>
          </div>
        </Box>
        <Box component="section" className="cars-by-model" pt="45px" pb="45px">
          <div className="container-xl">
            <div className="row" style={{ transition: 'all 0.3s ease-in-out' }}>
              <Box className="col-md-12" mb="32px">
                <Title order={2} tt="capitalize" lh="1">
                  {company_2[type]} New{" "}
                  {type}{" "}
                  <Text span c="#E90808" inherit>
                    Models
                  </Text>
                </Title>
                {console.log(">>>>>",fetchHondaVehicles?.data)}
              </Box>
              {(showAllMake2 
                ? fetchHondaVehicles?.data 
                : fetchHondaVehicles?.data?.slice(0, 8)
              )?.map((vehicle, index) => {
                return (
                  <Box 
                    className="col-md-3" 
                    key={index}
                    style={transitionStyles}
                  >
                    <NewCarsCard vehicle={vehicle} isRating={false} />
                  </Box>
                );
              })}
              {fetchHondaVehicles?.data?.length > 8 && (
                <Box className="col-12" mb="20px">
                  <Text 
                    component="span" 
                    c="#E90808" 
                    style={{ 
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      float: 'right',
                      marginRight: '15px'
                    }}
                    onClick={() => {
                      setIsTransitioning(true);
                      setTimeout(() => {
                        setShowAllMake2(!showAllMake2);
                        setTimeout(() => {
                          setIsTransitioning(false);
                        }, 50);
                      }, 300);
                    }}
                  >
                    {showAllMake2 ? "Show Less" : "Show More"}
                  </Text>
                </Box>
              )}
            </div>
          </div>
        </Box>

        <ComparisonProducts type={type} />
        <BrowseVideos type={type} />
        <BrowseBlogs />

        <Comments fetchMakesByTypeData={fetchMakesByTypeData} />

        <QuickLinks vehicleType={type}/>
      </section>
      <WriteReviewModal opened={isModalOpen} close={closeModal} fetchMakesByTypeData={fetchMakesByTypeData} />
    </>
  );
};

export default NewCarsModule;
