"use client";
import React, { useState } from "react";
import {
  Anchor,
  Box,
  Button,
  Card,
  Title,
  Text,
  Image,
  Flex,
  rem,
  Collapse,
} from "@mantine/core";
import NextImage from "next/image";
import ComparisonProducts from "@/modules/home/ComparisonProducts";
import BrowseBlogs from "@/components/blog/browse-blogs";
import BrowseVideos from "@/components/videos/browse-videos";
import { Carousel } from "@mantine/carousel";
import Link from "next/link";
import PopularNewCars from "../../components/sections/PopularNewCars";
import UpcomingCars from "../../components/sections/UpcomingCars";

const BodiesVehicles = ({
  slugBody,
  popularVehicles,
  fetchUpComingVehicles,
  matchedBody,
  altraNativesBody,
  vehicleType,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const getBodyTypeDescription = (bodyType) => {
    const descriptions = {
      'suv': 'SUVs (Sport Utility Vehicles) are versatile vehicles built for various purposes. They offer higher ground clearance, commanding driving position, and spacious interiors. Most SUVs come with ample cargo space, making them ideal for family trips and outdoor adventures. Their robust build and optional all-wheel-drive systems provide better capability in challenging road conditions.',
      
      'sedan': 'Sedans are classic four-door cars that offer a perfect balance of comfort and sophistication. They feature a separate trunk for secure luggage storage and typically provide excellent fuel efficiency. With their lower center of gravity, sedans offer superior handling and a smooth driving experience, making them perfect for daily commuting and long-distance travel.',
      
      'hatchback': 'Hatchbacks are practical vehicles that combine compact dimensions with impressive versatility. Their distinctive rear door that opens upwards provides easy access to the cargo area. The folding rear seats offer flexible space management, making hatchbacks particularly popular in urban environments where maneuverability and parking convenience are essential.',
      
      'crossover': 'Crossovers blend the comfort of a car with SUV-like capabilities. They offer elevated seating position for better visibility while maintaining car-like handling characteristics. These vehicles are perfect for urban families who want extra space and versatility without the bulk of a full-size SUV.',
      
      'pickup': 'Pickup trucks are utility-focused vehicles designed for both work and lifestyle needs. Their defining feature is the open cargo bed, perfect for hauling large items. Modern pickups offer comfortable cabins with advanced features while maintaining their robust capability for towing and off-road adventures.',
      
      'van': 'Vans are spacious vehicles designed to excel in passenger comfort and cargo capacity. They offer flexible seating configurations and abundant storage space. Whether for commercial purposes or family transport, vans provide unmatched versatility and practicality.',
      
      'coupe': 'Coupes are sporty two-door cars that emphasize style and performance. Their sleek profile and typically lower roofline create an athletic appearance. These vehicles often feature powerful engines and sport-tuned suspensions, delivering an engaging driving experience for enthusiasts.',
      
      'convertible': `Convertibles offer the unique pleasure of open-top driving. With their retractable roofs, they transform from secure, weather-proof vehicles to open-air cruisers at the touch of a button. They're perfect for drivers who want to combine style with the excitement of wind-in-your-hair motoring.`,
      
      'mpv': 'MPVs (Multi-Purpose Vehicles) are designed with family functionality in mind. They offer flexible seating arrangements, numerous storage solutions, and easy access through sliding doors. These vehicles excel in providing comfortable transportation for larger families while maintaining good fuel efficiency.',
      
      'wagon': 'Wagons combine the driving dynamics of a sedan with extended cargo capabilities. Their elongated roof and cargo area provide SUV-like storage space while maintaining a lower profile. Wagons are perfect for those who want extra practicality without compromising on car-like handling and fuel efficiency.'
    };
    
    const normalizedBodyType = bodyType.toLowerCase();
    return descriptions[normalizedBodyType] || `${bodyType} vehicles offer unique characteristics and features designed to meet specific driving needs and preferences. These vehicles come in various configurations to suit different lifestyle requirements.`;
  };

  const bodyTypeInfo = getBodyTypeDescription(slugBody);
  const text = bodyTypeInfo;
  const shortText = text.slice(0, 250);

  return (
    <>
      {/* style={{ marginTop: "50px" }} */}
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
                      {slugBody}
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
                  <Title order={3} mb="md" tt="capitalize">
                    {slugBody} {new Date().getFullYear()} Car Models, Prices &
                    Pictures in Pakistan
                  </Title>
                  <div className="row mb-2">
                    <div className="col-md-3">
                      <Card shadow="none" h="100%" withBorder py="lg">
                        <Flex
                          direction="column"
                          gap="xs"
                          justify="center"
                          align="center"
                        >
                          <Image
                            src={matchedBody?.bodyImage}
                            alt="Body Logo"
                            h={100}
                            w={100}
                          />
                          <Title order={5} fw={600} c="#E90808" tt="capitalize">
                            {slugBody}
                          </Title>
                          <Button
                            href={`/listing/${vehicleType}s/search/-/bt_${slugBody.toLowerCase()}`}
                            variant="outline"
                            color="#E90808"
                            mt="sm"
                            component={Link}
                          >
                            Used {slugBody} Cars for sale
                          </Button>
                        </Flex>
                      </Card>
                    </div>
                    <div className="col-md-9">
                      <Text mb="md">{shortText}</Text>
                      <Collapse in={isExpanded} transitionDuration={500}>
                        <Text mb="md">{text.slice(150)}</Text>
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

        <PopularNewCars popularVehicles={popularVehicles} type={vehicleType} />

        <UpcomingCars
          fetchUpComingVehicles={fetchUpComingVehicles}
          type={vehicleType}
        />
        <ComparisonProducts type={vehicleType} />
        <BrowseVideos type={vehicleType} />
        <BrowseBlogs />

        <section className="brands-faq-section pb-5">
          <div className="container-xl">
            <div className="row">
              <div className="col-md-12">
                <Title order={2} mb="lg" tt="capitalize">
                  {slugBody}{" "}
                  <Text span c="#E90808" inherit>
                    Alternatives
                  </Text>
                </Title>
              </div>

              <div className="brands-carousel my-3">
                <Carousel
                  loop
                  withControls={true}
                  slideSize="14.28571%"
                  slideGap=""
                  align="start"
                  slidesToScroll={7}
                >
                  {altraNativesBody?.map((item, index) => {
                    return (
                      <Carousel.Slide key={index}>
                        <Flex
                          direction="column"
                          justify="center"
                          align="center"
                          className="single-brand-item"
                        >
                          <NextImage
                            width={100}
                            height={100}
                            src={item.bodyImage}
                            className="mx-auto text-center"
                          />
                          <Anchor
                            component={Link}
                            href={`/new/${vehicleType}/body/${item.title}`}
                            c="#333"
                          >
                            {item.title}
                          </Anchor>
                        </Flex>
                      </Carousel.Slide>
                    );
                  })}
                </Carousel>
              </div>
            </div>
          </div>
        </section>

      </section>
    </>
  );
};

export default BodiesVehicles;
