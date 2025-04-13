"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Anchor,
  Box,
  Group,
  Button,
  Card,
  Title,
  Text,
  Image,
  Flex,
  Rating,
  rem,
  Grid,
  Tabs,
  Center,
  Collapse,
  ActionIcon,
  Loader,
} from "@mantine/core";
import NextImage from "next/image";
import ComparisonProducts from "@/modules/home/ComparisonProducts";
import BrowseBlogs from "@/components/blog/browse-blogs";
import BrowseVideos from "@/components/videos/browse-videos";
import { Carousel } from "@mantine/carousel";
import Link from "next/link";
import FAQ from "@/modules/new-cars/faqs";
import PopularNewCars from "../../components/sections/PopularNewCars";
import UpcomingCars from "../../components/sections/UpcomingCars";
import Comments from "@/components/sections/Comments";
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import styles from '@/components/sections/Comments.module.css';
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { fetchListData } from "@/services/vehicles";

const MakesVehicles = ({
  slugMake,
  makes,
  bodies,
  vehicleType,
  params,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    popularVehicles: null,
    upcomingVehicles: null,
    newlyLaunchedVehicles: null,
    makeVehicles: null,
    hondaVehicles: null,
    makesByType: null,
    matchedMake: null,
    alternativeMakes: null,
  });

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        // Fetch all required data in parallel
        const [
          popularVehicles,
          upcomingVehicles,
          newlyLaunchedVehicles,
          makeVehicles,
          hondaVehicles,
          makesByType
        ] = await Promise.all([
          fetchListData(API_ENDPOINTS.NEW_VEHICLE.MAKES_WITH_POPULAR(slugMake, vehicleType)),
          fetchListData(API_ENDPOINTS.NEW_VEHICLE.UPCOMMING(slugMake, vehicleType)),
          fetchListData(API_ENDPOINTS.NEW_VEHICLE.NEWLY_LAUNCHED_VEHICLES(slugMake, vehicleType)),
          fetchListData(API_ENDPOINTS.NEW_VEHICLE.MAKE_BY_VEHICLES(slugMake || "Toyota", vehicleType)),
          fetchListData(API_ENDPOINTS.NEW_VEHICLE.MAKE_BY_VEHICLES(slugMake || "Honda", vehicleType)),
          fetchListData(`${API_ENDPOINTS.BROWSE.BY_MAKE}?type=${vehicleType}`)
        ]);

        // Find matched make and alternatives
        const matchedMake = makesByType?.data?.find(
          (make) => make?.name?.toLowerCase() === slugMake?.toLowerCase()
        );
        
        const alternativeMakes = makesByType?.data?.filter(
          (make) => make?.name?.toLowerCase() !== slugMake?.toLowerCase()
        );

        // Update state with all fetched data
        setData({
          popularVehicles,
          upcomingVehicles,
          newlyLaunchedVehicles,
          makeVehicles,
          hondaVehicles,
          makesByType,
          matchedMake,
          alternativeMakes
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [slugMake, vehicleType]);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const shortText = data.matchedMake?.description?.slice(0, 430);

  if (isLoading) {
    return (
      <Center style={{ height: '50vh' }}>
        <Loader color="red" size="xl" />
      </Center>
    );
  }

  return (
    <>
      <section className="find-cars">
        <Box className="background-search-verlay" />
        <Box className="container-xl" mt={rem(-140)}>
          <div className="row">
            <div className="col-md-12">
              <nav className="mt-3">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Anchor href={`/`} tt="capitalize" component={Link}>
                      Home
                    </Anchor>
                  </li>
                  <li className="breadcrumb-item">
                    <Anchor
                      href={`/new/${vehicleType}`}
                      tt="capitalize"
                      component={Link}
                    >
                      New {vehicleType}
                    </Anchor>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    <Anchor href="#" tt="capitalize">
                      {slugMake}
                    </Anchor>
                  </li>
                </ol>
              </nav>
            </div>
            <div className="col-md-12">
              <Box className="search-wrapper-card">
                <Card
                  shadow="0px 4px 20px 0px #00000014"
                  padding="lg"
                  radius="sm"
                >
                  <Title order={3} mb="md">
                    {slugMake} Car Models, Prices
                  </Title>
                  <div className="row">
                    <div className="col-md-3">
                      <Card shadow="none"  withBorder py="lg" >
                        <Flex
                          direction="column"
                          gap="sm"
                          justify="center"
                          align="center"
                        >
                          <Image
                            src={data.matchedMake?.companyImage}
                            style={{ marginTop: "-20px" }}
                            alt={`${slugMake} Logo`}
                            h={50}
                            w={80}
                          />
                          <Title order={5} fw={600} c="#E90808">
                            {slugMake} Pricelist
                          </Title>
                          <Button
                            style={{ marginBottom: "-12px" }}
                            href={`/listing/${vehicleType}s/search/-/mk_${slugMake.toLowerCase()}`}
                            variant="outline"
                            color="#E90808"
                            component={Link}
                          >
                            Used {slugMake} Cars for sale
                          </Button>
                        </Flex>
                      </Card>
                    </div>
                    <div className="col-md-9">
                      <Text mb="md">{shortText}</Text>
                      <Collapse in={isExpanded} transitionDuration={500}>
                        <Text mb="md">{data.matchedMake?.description?.slice(150)}</Text>
                      </Collapse>
                      <Button color="red" fw={500} onClick={toggleReadMore}>
                        {isExpanded ? "Show Less" : "Read More"}
                      </Button>
                    </div>
                  </div>
                </Card>
              </Box>
            </div>
          </div>
        </Box>

        <PopularNewCars popularVehicles={data.popularVehicles} type={vehicleType} />

        <UpcomingCars
          fetchUpComingVehicles={data.upcomingVehicles}
          type={vehicleType}
        />
        <ComparisonProducts type={vehicleType} />
        <BrowseVideos type={vehicleType} />
        <BrowseBlogs />

        <Comments
          vehicleType={vehicleType}
          fetchMakesByTypeData={data.makesByType}
        />

        <section className="brands-faq-section pb-3">
          <div className="container-xl">
            <div className="row">
              <div className="col-md-12">
                <Title order={2} mb="lg">
                  {slugMake}{" "}
                  <Text span c="#E90808" inherit>
                    Alternatives
                  </Text>
                </Title>
              </div>

              <Box className="brands-carousel " sx={{ position: 'relative', paddingRight: '100px' }}>
                <Carousel
                  loop
                  withControls={true}
                  controlsOffset="xl"
                  controlSize={24}
                  slideSize="14.28571%"
                  slideGap="md"
                  align="start"
                  slidesToScroll={7}
                  classNames={{ controls: styles.controls, control: styles.control }}
                >
                  {data.alternativeMakes.map((item, index) => {
                    return (
                      <Carousel.Slide key={index}>
                        <Box
                          sx={{
                            '& a, & a:hover, & a:focus, & a:active': {
                              textDecoration: 'none !important',
                            }
                          }}
                        >
                          <Anchor
                            component={Link}
                            href={`/new/car/make/${item.name}`}
                            sx={{
                              textDecoration: 'none !important',
                              color: 'inherit',
                              display: 'block',
                              '&:hover, &:focus, &:active': {
                                textDecoration: 'none !important',
                              }
                            }}
                            underline={false}
                          >
                            <Flex
                              direction="column"
                              justify="center"
                              align="center"
                              className="single-brand-item"
                              p="md"
                              sx={{
                                transition: 'all 0.2s ease',
                                borderRadius: '8px',
                                '&:hover': {
                                  transform: 'translateY(-5px)',
                                  backgroundColor: '#F3F3F3'
                                }
                              }}
                            >
                              <NextImage
                                width={100}
                                height={100}
                                src={item.companyImage}
                                className="mx-auto text-center"
                              />
                              <Text 
                                c="#333" 
                                mt="xs" 
                                fw={500}
                                sx={{ 
                                  textAlign: 'center',
                                  '&:hover': { 
                                    color: '#EB2321'
                                  }
                                }}
                              >
                                {item.name}
                              </Text>
                            </Flex>
                          </Anchor>
                        </Box>
                      </Carousel.Slide>
                    );
                  })}
                </Carousel>
              </Box>
            </div>
          </div>
        </section>

        {/* <FAQ /> */}
        {<FAQ title={`${slugMake}`} titleSpan="FAQs" type={vehicleType} />}
      </section>
    </>
  );
};

export default MakesVehicles;
