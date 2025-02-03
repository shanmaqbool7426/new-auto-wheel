"use client";
import React, { useRef, useMemo } from "react";
import {
  CalendarIcon,
  CarKey,
  ClipboardIcon,
  ClockIcon,
  DocumentSquareIcon,
  FeaturedCrownIcon,
  FuelIcon,
  FuelTank,
  GearIcon,
  HistoryIcon,
  LocationPinIcon,
  MeterSquareIcon,
  PaintIcon,
  RanchIcon,
  RatingIcon,
  RoadIcon,
  SearchIcon,
  ShareSquareIcon,
  SmallCarIcon,
  SteeringIcon,
  TransmissionIcon,
  TrustCar,
  VerifiedUser,
} from "@/components/Icons";
import { BsStarFill, BsStar } from "react-icons/bs";
import {
  Box,
  Card,
  Flex,
  Group,
  Image,
  rem,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { formatPrice, getTimeAgo } from "@/utils/index";
import NextImage from "next/image";

// Import your components
import Calculator from "./calculator";
import SocialCards from "./socialCards";
import MessageToDealer from "./messageToDealer";
import SocialContact from "./socialContact";
import ReportAdd from "./report-add";
import Gellary from "./imagesGellary";

const VehicleDetailModule = ({ detail, listOfSimilarVehicles }) => {
  const messageRef = useRef(null);
  const scrollToMessage = () => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Memoized seller information
  const sellerInfo = useMemo(
    () => ({
      name: detail?.data?.seller?.fullName || "N/A",
      isDealer: detail?.data?.seller?.accountType === "Dealer",
      type:
        detail?.data?.seller?.accountType === "Dealer"
          ? "Private Dealer"
          : "Personal Seller",
      image: detail?.data?.seller?.profileImage || "/detail/seller-company.png",
      dealerName: detail?.data?.seller?.dealerName || "Seller Banner",
      rating: detail?.data?.seller?.rating || 0,
      reviewCount: detail?.data?.seller?.reviewCount || 0,
      location:
        detail?.data?.seller?.locationAddress || "Location not available",
      salesHours: detail?.data?.seller?.salesHours,
    }),
    [detail?.data?.seller]
  );

  // Memoized vehicle information
  const vehicleInfo = useMemo(
    () => ({
      title: `${detail?.data?.year} ${detail?.data?.make} ${detail?.data?.model}`,
      engine: detail?.data?.specifications?.engine,
      price: formatPrice(detail?.data?.price),
      updatedAt: getTimeAgo(detail?.data?.updatedAt),
      features: detail?.data?.features || [],
      sellerNotes: detail?.data?.sellerNotes,
    }),
    [detail?.data]
  );

  // Memoized car summary items
  const carSummaryItems = useMemo(
    () => [
      {
        icon: <FuelTank />,
        label: "Engine",
        value: detail?.data?.specifications?.engine,
      },
      {
        icon: <GearIcon />,
        label: "Drive",
        value: detail?.data?.specifications?.drive,
      },
      {
        icon: <CarKey />,
        label: "Rego Expire",
        value: "10/2023",
      },
      {
        icon: <SmallCarIcon />,
        label: "Body",
        value: detail?.data?.specifications?.bodyType,
      },
      {
        icon: <RoadIcon />,
        label: "Mileage",
        value: `${detail?.data?.specifications?.mileage} Km`,
      },
      {
        icon: <CalendarIcon />,
        label: "Year",
        value: detail?.data?.year,
      },
      {
        icon: <PaintIcon />,
        label: "Exterior",
        value: detail?.data?.specifications?.exteriorColor,
      },
      {
        icon: <FuelIcon />,
        label: "Fuel Type",
        value: detail?.data?.specifications?.fuelType,
      },
      {
        icon: <TransmissionIcon />,
        label: "Transmission",
        value: detail?.data?.specifications?.transmission,
      },
      {
        icon: <HistoryIcon />,
        label: "History",
        value: detail?.data?.specifications?.bodyType,
      },
      {
        icon: <ClipboardIcon />,
        label: "VIN",
        value: detail?.data?.specifications?.vin,
      },
    ],
    [detail?.data]
  );

  // Memoized service cards
  const serviceCards = useMemo(
    () => [
      {
        icon: <SearchIcon />,
        title: "Wide range of Brands",
        content: "Our services department maintains your vehicle",
      },
      {
        icon: <RanchIcon />,
        title: "Wide range of Brands",
        content: "Our services department maintains your vehicle",
      },
      {
        icon: <TrustCar />,
        title: "Trusted by thousands",
        content: "Department maintains your car to stay safe",
      },
    ],
    []
  );

  // Reusable components
  const RatingStars = ({ rating }) => (
    <Box className="fs-5 text-warning d-flex align-items-center">
      {[...Array(5)].map((_, index) => (
        <span key={index}>
          {index < Math.floor(rating) ? <BsStarFill /> : <BsStar />}
        </span>
      ))}
      <span className="text-dark ms-2 fs-6">({rating.toFixed(1)}/5)</span>
    </Box>
  );

  const SellerCard = useMemo(
    () => (
      <Box className="seller-info">
        <Title
          fw={700}
          size={rem(28)}
          display="flex"
          className="align-items-center gap-1"
        >
          {sellerInfo.name}
          {sellerInfo.isDealer && (
            <ThemeIcon w={26} h={24} bg="white">
              <VerifiedUser />
            </ThemeIcon>
          )}
        </Title>
        <Text span className="text-muted">
          {sellerInfo.type}
        </Text>
        <Box className="row mt-3 mb-4">
          <Box className="col">
            <Card padding={rem(8)} radius="sm" withBorder>
              <Image src={sellerInfo.image} alt={sellerInfo.dealerName} />
            </Card>
          </Box>
          <Box className="col">
            <Box className="rating">
              <RatingStars rating={sellerInfo.rating} />
              <Text className="text-muted">
                (Reviews {sellerInfo.reviewCount})
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    ),
    [sellerInfo]
  );

  const SimilarVehicleCard = ({ vehicle }) => (
    <Box className="card product-card">
      <Box className="product-image position-relative">
        <Box className="featured-badge">Special</Box>
        <Box className="product-price">{formatPrice(vehicle?.price)}</Box>
        {vehicle.defaultImage && (
          <Image
            component={NextImage}
            className="card-img-top object-fit-cover img-fluid"
            alt="Product Placeholder"
            width={270}
            height={160}
            src={vehicle.defaultImage}
          />
        )}
      </Box>
      <Box className="progress-bars">
        <span className="single-bar active"></span>
        <span className="single-bar"></span>
        <span className="single-bar"></span>
      </Box>
      <Box className="card-body">
        <Box className="product-content">
          <Link href="#" className="d-inline-block product-title">
            {`${vehicle?.condition} ${vehicle?.specifications?.engine} ${vehicle?.make} ${vehicle?.model}`}
          </Link>
        </Box>
        <Box className="product-meta">
          <Box className="meta-info d-flex justify-content-between align-items-center">
            <span className="text-muted d-flex align-items-center gap-1">
              <RoadIcon /> {vehicle?.specifications?.mileage}
            </span>
            <span className="text-muted d-flex align-items-center gap-1">
              <FuelTank /> {vehicle?.specifications?.engine}
            </span>
            <span className="text-muted d-flex align-items-center gap-1">
              <LocationPinIcon /> {vehicle?.city}
            </span>
          </Box>
          <Box className="stock-info d-flex justify-content-between align-items-center mt-2">
            <span>
              <span className="text-muted">stock#</span>{" "}
              {vehicle?.specifications?.stockId}
            </span>
            <span className="text-muted">
              <FaClock /> {getTimeAgo(new Date())}
            </span>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <Box
        component="section"
        className="product-detail"
        style={{ paddingTop: "100px" }}
      >
        <Box className="container-xl">
          {/* Service Cards */}
          <Box className="row">
            {serviceCards.map((card, index) => (
              <Box className="col-md-4" key={index}>
                <Card
                  shadow="0px 4px 20px 0px #00000014"
                  padding="md"
                  radius={rem(5)}
                >
                  <Group gap="xs" wrap="nowrap" flex={1} align="self-start">
                    <ThemeIcon size={rem(40)} bg="white">
                      {card.icon}
                    </ThemeIcon>
                    <Box>
                      <Title order={5} fw={600}>
                        {card.title}
                      </Title>
                      <Text
                        c="#878787"
                        size="sm"
                        className="mb-0 text-muted content"
                      >
                        {card.content}
                      </Text>
                    </Box>
                  </Group>
                </Card>
              </Box>
            ))}
          </Box>

          <Box className="row mt-5">
            <Box className="col-md-8">
              {/* Car Pricing Section */}
              <Box component="section" className="car-price-section">
                <Flex align="center" justify="space-between">
                  <Box className="title-section">
                    {/* className="title-sm fs-5 fw-semibold lh-sm" */}
                    <Text fw={600} mb={rem(3)} className="text-primary">
                      {vehicleInfo.engine}
                    </Text>
                    <Title size={rem(36)} className="text-primary">
                      {vehicleInfo.title}
                    </Title>
                  </Box>
                  <Text size={rem(16)} className="price-field">
                    Rs {vehicleInfo.price}
                  </Text>
                </Flex>
                {/* Features Section */}
                <Box className="features-section">
                  <Box className="text-dark d-flex gap-2 my-2 align-items-center">
                    <ClockIcon /> {vehicleInfo.updatedAt}
                  </Box>
                  <Box className="featured my-3">
                    <ul className="list-unstyled list-inline m-0">
                      <li className="list-inline-item">
                        <DocumentSquareIcon />
                      </li>
                      <li className="list-inline-item">
                        <RatingIcon />
                      </li>
                      <li className="list-inline-item">
                        <SteeringIcon />
                      </li>
                      <li className="list-inline-item">
                        <ShareSquareIcon />
                      </li>
                      <li className="list-inline-item">
                        <MeterSquareIcon />
                      </li>
                    </ul>
                    <Group gap={0} className="text-primary">
                      <FeaturedCrownIcon />
                      <Text span tt="uppercase" size={rem(14)} fw={600} className="text-primary" ml="xs">
                        featured listing
                      </Text>
                    </Group>
                  </Box>
                </Box>
              </Box>

              {/* Gallery Section */}
              <section className="product-image-section my-5">
                <Gellary images={detail?.data?.images} />
              </section>

              {/* Car Summary Section */}
              <section className="summary-section">
                <h4 className="section-title fw-semibold mb-4">Car Summary</h4>
                <Box className="row">
                  {carSummaryItems
                    .reduce((acc, item, index) => {
                      const colIndex = Math.floor(index / 4);
                      if (!acc[colIndex]) acc[colIndex] = [];
                      acc[colIndex].push(item);
                      return acc;
                    }, [])
                    .map((columnItems, columnIndex) => (
                      <Box className="col-md-4" key={columnIndex}>
                        <ul className="list-unstyled">
                          {columnItems.map((item, index) => (
                            <li
                              key={index}
                              className="mb-4 flex flex-col"
                              style={{ flexWrap: "wrap", display: "flex" }}
                            >
                              <span className="fs-6 text-primary icon">
                                {item.icon}
                              </span>
                              <span className="text-muted summary-info">
                                {item.label}
                              </span>
                              <span
                                className={`text-dark fw-semibold ${
                                  item.label == "Drive"
                                    ? "text-uppercase"
                                    : "text-capitalize"
                                }`}
                                style={{ display: "flex", marginLeft: "auto" }}
                              >
                                {item.value}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </Box>
                    ))}
                </Box>
              </section>

              {/* Features List Section */}
              <section className="featured-section">
                <h4 className="section-title fw-semibold mb-4">Feature</h4>
                <ul
                  className="list-unstyled list-inline"
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "0.5rem",
                    flexWrap: "wrap",
                  }}
                >
                  {vehicleInfo.features.map((feature, index) => (
                    <li className="list-inline-item" key={index}>
                      <span className="icon text-primary me-2 fs-6">
                        <FaCheckCircle />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Seller Notes Section */}
              <section className="seller-section">
                <h4 className="section-title fw-semibold mb-4">
                  Sellers Notes
                </h4>
                <p>{vehicleInfo.sellerNotes}</p>
                <Calculator data={detail?.data} />
              </section>
            </Box>

            {/* Seller Information Sidebar */}
            <Box className="col-md-4">
              {SellerCard}
              <SocialCards detail={detail} scrollToMessage={scrollToMessage} />
              <Box className="col-12">
                <Box className="card address-card mb-3">
                  <Box className="card-body gap-2 align-items-center text-primary">
                    <LocationPinIcon />
                    <Box className="text-muted address-info">
                      {sellerInfo.location}
                      {sellerInfo.salesHours && (
                        <ul className="list-unstyled mb-0 text-muted mt-2">
                          <li>
                            Sales Hours:
                            <span className="ms-3">
                              {sellerInfo.salesHours}
                            </span>
                          </li>
                        </ul>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
              <ReportAdd />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Contact Seller Section */}
      <section className="contact-seller">
        <Box className="container-xl">
          <Box className="row">
            <Box className="col-md-4">
              <Box className="card border-0 shadow-none contact-seller-info">
                <Box className="card-body card-border">{SellerCard}</Box>
                <Box className="px-3">
                  <SocialContact detail={detail} />
                </Box>
              </Box>
            </Box>
            <Box className="col-md-7" ref={messageRef}>
              <MessageToDealer sellerId={detail?.data?.seller} />
            </Box>
          </Box>
        </Box>
      </section>

      {/* Similar Products Section */}
      <section className="similar-product py-5">
        <Box className="container-xl">
          <Box className="row">
            <Box className="col-md-12">
              <Title order={2} mb="lg">
                Similar Results
              </Title>
              {listOfSimilarVehicles?.data?.length === 0 && (
                <Text>No Similar Vehicles Found</Text>
              )}
            </Box>
            {listOfSimilarVehicles?.data?.map((vehicle, index) => (
              <Box className="col-md-3" key={index}>
                <SimilarVehicleCard vehicle={vehicle} />
              </Box>
            ))}
          </Box>
        </Box>
      </section>
    </>
  );
};

export default VehicleDetailModule;
