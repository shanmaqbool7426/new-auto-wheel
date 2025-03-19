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
import CardsCarousel from "@/components/sections/CardsCarousel";
import { BsStarFill, BsStar } from "react-icons/bs";
import {
  Box,
  Card,
  Flex,
  Group,
  Image,
  List,
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
import { getLocalStorage, reorderSlug } from "@/utils";
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

  const userData = getLocalStorage('user')
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
      salesHours: detail?.data?.seller?.workingHours,
      workingHours: detail?.data?.seller?.workingHours || {},
    }),
    [detail?.data?.seller]
  );


  // Memoized vehicle information
  const vehicleInfo = useMemo(
    () => ({
      title: `${detail?.data?.year} ${detail?.data?.make} ${detail?.data?.model}`,
      engine: detail?.data?.specifications?.engine,
      isFeatured: detail?.data?.isFeatured,
      condition: detail?.data?.condition,
      price: formatPrice(detail?.data?.price),
      updatedAt: getTimeAgo(detail?.data?.updatedAt),
      features: detail?.data?.features || [],
      sellerNotes: detail?.data?.sellerNotes,
    }),
    [detail?.data]
  );

  { console.log("detail?.data?.specifications", detail?.data?.specifications) }

  // Memoized car summary items
  const carSummaryItems = useMemo(
    () => [
      {
        icon: <FuelTank />,
        label: "Engine",
        value: detail?.data?.specifications?.engineCapacity,
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

  console.log("Detail Data:", detail);

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
  const RatingStars = ({ rating, size }) => (
    <Box className="fs-6 text-warning d-flex align-items-center">
      {[...Array(5)].map((_, index) => (
        <span key={index}>
          {index < Math.floor(rating) ? <BsStarFill size={size} /> : <BsStar size={size} />}
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
        <Box className="row mt-3 mb-4" align="center">
          <Box className="col">
            <Card
              padding={rem(8)}
              radius="sm"
              withBorder
              style={{
                width: '130px',
                height: '41.7px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Link
                href={`/dealer-profile/${detail?.data?.seller?._id}`}
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Image
                  src={sellerInfo.image}
                  alt={sellerInfo.dealerName}
                />
              </Link>
            </Card>
          </Box>
          <Box className="col">
            <Box className="rating">
              <RatingStars rating={sellerInfo.rating} size={15} />
              <Text className="text-muted" size={12} lh={1.2} >
                (Reviews {sellerInfo.reviewCount})
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    ),
    [sellerInfo, detail?.data?.seller?._id]
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

  const WorkingHours = ({ hours }) => {
    const [expanded, setExpanded] = React.useState(false);
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    const openDays = days.filter(day => hours[day]?.isOpen);
    const displayDays = expanded ? openDays : openDays.slice(0, 1);

    if (openDays.length === 0) return null;

    return (
      <Box className="working-hours">
        {displayDays.map(day => (
          <Group key={day} justify="space-between" mb={4} pl={5}>
            <Text size="xs" tt="capitalize" w={100}>
              {day}:
            </Text>
            <Text size="xs">
              {hours[day].start} - {hours[day].end}
            </Text>
          </Group>
        ))}
        {openDays.length > 1 && (
          <Group justify="flex-end" mt={8}>
            <Text
              size="xs"
              c="#E90808"
              td="underline"
              style={{ cursor: 'pointer' }}
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? 'Show less' : `See ${openDays.length - 1} more`}
            </Text>
          </Group>
        )}
      </Box>
    );
  };

  return (
    <>
      <Box
        component="section"
        className="product-detail"
        style={{ paddingTop: "100px" }}
      >
        <Box className="container-xl">
          {/* Service Cards */}
          <Box className="row g-4">
            {serviceCards.map((card, index) => (
              <Box className="col-md-4" key={index}>
                <Card
                  shadow="sm"
                  padding="md"
                  radius="sm"
                  withBorder={false}
                  style={{
                    backgroundColor: 'white',
                    height: '66px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Group gap="md" wrap="nowrap" align="flex-start">
                    <ThemeIcon 
                      size={24}
                      radius="sm"
                      style={{ 
                        backgroundColor: 'transparent',
                        color: '#E90808',
                        minWidth: '24px',
                        height: '24px'
                      }}
                    >
                      {card.icon}
                    </ThemeIcon>
                    <Box>
                      <Text 
                        size="16px"
                        fw={400}
                        lh="20px"
                        mb={4}
                        style={{
                          color: '#242424'
                        }}
                      >
                        {card.title}
                      </Text>
                      <Text
                        size="12px"
                        lh="16px"
                        style={{
                          color: '#6B6B6B'
                        }}
                      >
                        {card.content}
                      </Text>
                    </Box>
                  </Group>
                </Card>
              </Box>
            ))}
          </Box>

          <Box className="row mt-4 ms-2 social-section">
            <Box className="col-md-8">
              {/* Car Pricing Section */}
              <Box component="section" className="car-price-section">
                <Flex align="center" justify="space-between">
                  <Box className="title-section">
                    {/* className="title-sm fs-5 fw-semibold lh-sm" */}
                    <Text fw={600} mb={rem(3)} className="text-primary">
                      {vehicleInfo.condition}
                    </Text>
                    <Title size={rem(36)} className="text-primary">
                      {vehicleInfo.title}
                    </Title>
                  </Box>
                  <Text
                    size={rem(16)}
                    className="price-field"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    ${vehicleInfo.price}
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
                    {vehicleInfo?.isFeatured && <Group gap={0} className="text-primary">
                      <FeaturedCrownIcon />
                      <Text
                        span
                        tt="uppercase"
                        size={rem(14)}
                        fw={600}
                        className="text-primary"
                        ml="xs"
                      >
                        featured listing
                      </Text>
                    </Group>}
                  </Box>
                </Box>
              </Box>

              {/* Gallery Section */}
              {/* <Box
                component="section"
                className="product-image-section"
                my="xl"
              > */}
              <Gellary images={detail?.data?.images} />
              {/* </Box> */}

              {/* Car Summary Section */}
              <Box component="section" className="summary-section">
                <Title order={3} mb="lg">
                  Car Summary
                </Title>
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
                        <List
                          styles={{
                            itemWrapper: { width: "100%" },
                            itemLabel: { display: "block", width: "100%" },
                          }}
                        >
                          {columnItems.map((item, index) => (
                            <List.Item icon={item.icon} key={index}>
                              <Group justify="space-between" align="center">
                                <Text span size={rem(14)}>
                                  {item.label}
                                </Text>
                                <Text span size={rem(14)} fw={600} ml="auto">
                                  {item.value}
                                </Text>
                              </Group>
                            </List.Item>
                          ))}
                        </List>
                      </Box>
                    ))}
                </Box>
              </Box>

              {/* Features List Section */}
              <Box component="section" className="featured-section">
                <Title order={3} mb="lg">
                  Feature
                </Title>
                <List size={rem(14)} className="d-flex flex-wrap gap-3">
                  {vehicleInfo.features.map((feature, index) => (
                    <List.Item
                      icon={<FaCheckCircle color="#E90808" />}
                      key={index}
                      mb="0"
                    >
                      {feature}
                    </List.Item>
                  ))}
                </List>
                {/* <ul
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
                </ul> */}
              </Box>

              {/* Seller Notes Section */}
              <Box component="section" className="seller-section">
                <Title order={3} mb="lg">
                  Sellers Notes
                </Title>
                <Text ff="heading" c="dimmed" size="sm" mb="lg">
                  Fusce viverra, ligula quis pellentesque interdum, leo felis congue dui, ac accumsan sem nulla id lorem. Praesent ut tristique dui, nec condimentum lacus. Maecenas lobortis ante id egestas placerat. Nullam at ultricies lacus. Nam in nulla consectetur, suscipit mauris eu, fringilla augue. Phasellus gravida, dui quis dignissim tempus, tortor orci tristique leo, ut congue diam ipsum at massa. Pellentesque ut vestibulum erat. Donec a felis eget tellus laoreet ultrices.
                  {/* {vehicleInfo.sellerNotes} */}
                </Text>
                <Calculator data={detail?.data} />
              </Box>
            </Box>

            {/* Seller Information Sidebar */}
            <Box className="col-md-4">
              {SellerCard}
              <SocialCards detail={detail} scrollToMessage={scrollToMessage} />
              <Box className="col-12">
                <Card
                  mb="lg"
                  withBorder
                  p="sm"
                  radius={rem(5)}
                  shadow="0px 4px 20px 0px #00000014"
                  display="flex"
                  className="flex-column"
                >
                  <Group mb="xs">
                    <ThemeIcon color="#E90808" variant="white">
                      <LocationPinIcon />
                    </ThemeIcon>
                    <Text ff="heading" size={rem(14)}>
                      {sellerInfo.location}
                    </Text>
                  </Group>
                  {Object.keys(sellerInfo.workingHours).length > 0 && (
                    <>
                      <Text fw={500} pl={5} size={rem(14)} mb="xs">Working Hours:</Text>
                      <WorkingHours hours={sellerInfo.workingHours} />
                    </>
                  )}
                </Card>
              </Box>
              <ReportAdd />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Contact Seller Section */}
      <Box component="section" className="contact-seller" py="xl">
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
            <Box className="col-md-8" ref={messageRef}>
              <MessageToDealer sellerId={detail?.data?.seller} />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Similar Products Section */}
      <section className="similar-product py-5">
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4"></h2>
          <CardsCarousel
            title={'Similar Vehicles'}
            primaryTitle={''}
            userData={userData}
            data={listOfSimilarVehicles?.data}
            isRating={false}
          />
        </div>
      </section>
    </>
  );
};

export default VehicleDetailModule;
