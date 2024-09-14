"use client";
import React, { useState } from "react";
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
    Collapse
} from "@mantine/core";
import NextImage from "next/image";
import ComparisonProducts from "@/modules/home/ComparisonProducts";
import BrowseBlogs from "@/components/blog/browse-blogs";
import BrowseVideos from "@/components/videos/browse-videos";
import { Carousel } from "@mantine/carousel";
import Link from "next/link";
import FAQ from "@/components/Faq";
import PopularNewCars from "../../components/sections/PopularNewCars";
import UpcomingCars from "../../components/sections/UpcomingCars";
import Comments from "@/components/sections/Comments";

const MakesVehicles = ({ slugMake, popularVehicles, fetchUpComingVehicles,matchedMake }) => {
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
    const brandsURLs = [
        { url: "/brands/acura.svg", name: "Acura" },
        { url: "/brands/hyundai.svg", name: "Hyundai", isHeightLarger: false },
        { url: "/brands/ford.svg", name: "Ford" },
        { url: "/brands/kia.svg", name: "KIA" },
        { url: "/brands/nissan.svg", name: "Nissan" },
        { url: "/brands/bmw.svg", name: "BMW" },
        { url: "/brands/bentley.svg", name: "Bentley" },
        { url: "/brands/toyota.svg", name: "Toyota" },
        { url: "/brands/chevrolet.svg", name: "Chevrolet" },
    ];

    const [isExpanded, setIsExpanded] = useState(false);
    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    console.log('matchedMake',matchedMake)

    const text = `The prices of a ${slugMake} Car in Pakistan start from PKR 4,399,000.0 
    for a new ${slugMake} Yaris to PKR 156,829,000.0 for a new ${slugMake} Land Cruiser. 
    There are currently 12 new car models available at ${slugMake} dealerships across Pakistan. 
    ${slugMake} Cars are also widely available in used conditions starting from PKR 180,000 for a used 
    ${slugMake} Corolla to PKR 145,000,000 for a used ${slugMake} Land Cruiser. 
    There are a total of 26648 ${slugMake} Cars available for sale in Pakistan on PakWheels.  There are currently 12 new car models available at ${slugMake} dealerships across Pakistan. 
    ${slugMake} Cars are also widely available in used conditions starting from PKR 180,000 for a used 
    ${slugMake} Corolla to PKR 145,000,000 for a used ${slugMake} Land Cruiser. 
    There are a total of 26648 ${slugMake} Cars available for sale in Pakistan on PakWheels.  There are currently 12 new car models available at ${slugMake} dealerships across Pakistan. 
    ${slugMake} Cars are also widely available in used conditions starting from PKR 180,000 for a used 
    ${slugMake} Corolla to PKR 145,000,000 for a used ${slugMake} Land Cruiser. 
    There are a total of 26648 ${slugMake} Cars available for sale in Pakistan on PakWheels  There are currently 12 new car models available at ${slugMake} dealerships across Pakistan. 
    ${slugMake} Cars are also widely available in used conditions starting from PKR 180,000 for a used 
    ${slugMake} Corolla to PKR 145,000,000 for a used ${slugMake} Land Cruiser. 
    There are a total of 26648 ${slugMake} Cars available for sale in Pakistan on PakWheels`;

    const shortText = text.slice(0, 430); // Shortened text with a limit of 150 characters.

    return (
        <>
            <section className="find-cars">
                <Box className="background-search-verlay" mb="220">
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
                            </div>
                            <div className="col-md-12">
                                <Box className="search-wrapper-card">
                                    <Card
                                        shadow="0px 4px 20px 0px #00000014"
                                        padding="lg"
                                        radius="sm"
                                    >
                                        <Title order={3} mb="md">
                                            {slugMake} {new Date().getFullYear()} Car Models, Prices & Pictures in Pakistan
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
                                                            src={matchedMake?.companyImage}
                                                            alt="Toyota Logo"
                                                            h={100}
                                                            w={100}
                                                        />
                                                        <Title order={5} fw={600} c="#E90808">
                                                            {slugMake} Pricelist
                                                        </Title>
                                                        <Button variant="outline" color="#E90808" mt="sm">
                                                            Used {slugMake} Cars for sale
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
                                                    {isExpanded ? 'Show Less' : 'Read More'}
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                </Box>
                            </div>
                        </div>
                    </div>
                </Box>

                <PopularNewCars popularVehicles={popularVehicles} />

                <UpcomingCars fetchUpComingVehicles={fetchUpComingVehicles} />
                <ComparisonProducts />
                <BrowseVideos />
                <BrowseBlogs />

<Comments/>

                <section className="brands-faq-section pb-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <Title order={2} mb="lg">
                                    {slugMake}{" "}
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
                                    {brandsURLs.map((item, index) => {
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
                                                        src={item.url}
                                                        className="mx-auto text-center"
                                                    />
                                                    <Anchor component={Link} href="#" c="#333">
                                                        {item.name}
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

                <FAQ />
            </section>
        </>
    );
};

export default MakesVehicles;
