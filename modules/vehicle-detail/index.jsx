'use client'
import React, { useRef, useMemo } from "react";
import {
  CalendarIcon, CarKey, ClipboardIcon, ClockIcon,
  DocumentSquareIcon, FeaturedCrownIcon, FuelIcon,
  FuelTank, GearIcon, HistoryIcon, LocationPinIcon,
  MeterSquareIcon, PaintIcon, RanchIcon, RatingIcon,
  RoadIcon, SearchIcon, ShareSquareIcon, SmallCarIcon,
  SteeringIcon, TransmissionIcon, TrustCar, VerifiedUser,
} from "@/components/Icons";
import { BsStarFill, BsStar } from "react-icons/bs";
import { Card, Image, Text, Title } from "@mantine/core";
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
    messageRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Memoized seller information
  const sellerInfo = useMemo(() => ({
    name: detail?.data?.seller?.fullName || 'N/A',
    isDealer: detail?.data?.seller?.accountType === 'Dealer',
    type: detail?.data?.seller?.accountType === 'Dealer' ? 'Private Dealer' : 'Personal Seller',
    image: detail?.data?.seller?.profileImage || "/detail/seller-company.png",
    dealerName: detail?.data?.seller?.dealerName || "Seller Banner",
    rating: detail?.data?.seller?.rating || 0,
    reviewCount: detail?.data?.seller?.reviewCount || 0,
    location: detail?.data?.seller?.locationAddress || 'Location not available',
    salesHours: detail?.data?.seller?.salesHours
  }), [detail?.data?.seller]);

  // Memoized vehicle information
  const vehicleInfo = useMemo(() => ({
    title: `${detail?.data?.year} ${detail?.data?.make} ${detail?.data?.model}`,
    engine: detail?.data?.specifications?.engine,
    price: formatPrice(detail?.data?.price),
    updatedAt: getTimeAgo(detail?.data?.updatedAt),
    features: detail?.data?.features || [],
    sellerNotes: detail?.data?.sellerNotes
  }), [detail?.data]);

  // Memoized car summary items
  const carSummaryItems = useMemo(() => [
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
      value: "10/2023"
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
      value: detail?.data?.year
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
  ], [detail?.data]);

  // Memoized service cards
  const serviceCards = useMemo(() => [
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
  ], []);

  // Reusable components
  const RatingStars = ({ rating }) => (
    <div className="fs-5 text-warning d-flex align-items-center">
      {[...Array(5)].map((_, index) => (
        <span key={index}>
          {index < Math.floor(rating) ? <BsStarFill /> : <BsStar />}
        </span>
      ))}
      <span className="text-dark ms-2 fs-6">({rating.toFixed(1)}/5)</span>
    </div>
  );

  const SellerCard = useMemo(() => (
    <div className="seller-info">
      <h4 className="fw-semibold mb-1">
        {sellerInfo.name}
        {sellerInfo.isDealer && <VerifiedUser />}
      </h4>
      <span className="text-muted">{sellerInfo.type}</span>
      <div className="row mt-3 mb-4">
        <div className="col">
          <Card padding="xs" radius="sm" withBorder>
            <Image
              src={sellerInfo.image}
              height={160}
              alt={sellerInfo.dealerName}
            />
          </Card>
        </div>
        <div className="col">
          <div className="rating">
            <RatingStars rating={sellerInfo.rating} />
            <span className="d-block text-muted mt-2">
              (Reviews {sellerInfo.reviewCount})
            </span>
          </div>
        </div>

      </div>
    </div>
  ), [sellerInfo]);

  const SimilarVehicleCard = ({ vehicle }) => (
    <div className="card product-card">
      <div className="product-image position-relative">
        <div className="featured-badge">Special</div>
        <div className="product-price">{formatPrice(vehicle?.price)}</div>
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
      </div>
      <div className="progress-bars">
        <span className="single-bar active"></span>
        <span className="single-bar"></span>
        <span className="single-bar"></span>
      </div>
      <div className="card-body">
        <div className="product-content">
          <Link href="#" className="d-inline-block product-title">
            {`${vehicle?.condition} ${vehicle?.specifications?.engine} ${vehicle?.make} ${vehicle?.model}`}
          </Link>
        </div>
        <div className="product-meta">
          <div className="meta-info d-flex justify-content-between align-items-center">
            <span className="text-muted d-flex align-items-center gap-1">
              <RoadIcon /> {vehicle?.specifications?.mileage}
            </span>
            <span className="text-muted d-flex align-items-center gap-1">
              <FuelTank /> {vehicle?.specifications?.engine}
            </span>
            <span className="text-muted d-flex align-items-center gap-1">
              <LocationPinIcon /> {vehicle?.city}
            </span>
          </div>
          <div className="stock-info d-flex justify-content-between align-items-center mt-2">
            <span>
              <span className="text-muted">stock#</span> {vehicle?.specifications?.stockId}
            </span>
            <span className="text-muted">
              <FaClock /> {getTimeAgo(new Date())}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <section className="product-detail" style={{ paddingTop: "100px" }}>
        <div className="container-xl">
          {/* Service Cards */}
          <div className="row">
            {serviceCards.map((card, index) => (
              <div className="col-md-4" key={index}>
                <div className="card border-0">
                  <div className="card-body">
                    <span className="icon">{card.icon}</span>
                    <div>
                      <h5 className="card-title fw-semibold mb-1">{card.title}</h5>
                      <p className="mb-0 text-muted content">{card.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row mt-5">
            <div className="col-md-8">
              {/* Car Pricing Section */}
              <section className="car-price-section">
                <div className="product-info text-primary d-flex justify-content-between align-items-center">
                  <div className="title-section">
                    <div className="title-sm fs-5 fw-semibold lh-sm">
                      {vehicleInfo.engine}
                    </div>
                    <div className="main-title fs-1 fw-bold">{vehicleInfo.title}</div>
                  </div>
                  <div className="price-field">Rs {vehicleInfo.price}</div>
                </div>
                {/* Features Section */}
                <div className="features-section">
                  <div className="text-dark d-flex gap-2 my-2">
                    <ClockIcon /> {vehicleInfo.updatedAt}
                  </div>
                  <div className="featured my-3">
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
                    <div className="featrured-tag text-primary ms-auto text-uppercase fw-semibold">
                      <FeaturedCrownIcon />
                      <span className="ms-2">featured listing</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Gallery Section */}
              <section className="product-image-section my-5">
                <Gellary images={detail?.data?.images} />
              </section>

              {/* Car Summary Section */}
              <section className="summary-section">
                <h4 className="section-title fw-semibold mb-4">Car Summary</h4>
                <div className="row">
                  {carSummaryItems
                    .reduce((acc, item, index) => {
                      const colIndex = Math.floor(index / 4);
                      if (!acc[colIndex]) acc[colIndex] = [];
                      acc[colIndex].push(item);
                      return acc;
                    }, [])
                    .map((columnItems, columnIndex) => (
                      <div className="col-md-4" key={columnIndex}>
                        <ul className="list-unstyled">
                          {columnItems.map((item, index) => (
                            <li key={index} className="mb-4 flex flex-col" style={{ flexWrap: "wrap", display: "flex" }}>
                              <span className="fs-6 text-primary icon">{item.icon}</span>
                              <span className="text-muted summary-info">{item.label}</span>
                              <span className={`text-dark fw-semibold ${item.label == 'Drive' ? 'text-uppercase' : 'text-capitalize'}`} style={{ display: "flex", marginLeft: "auto" }}>{item.value}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                </div>
              </section>

              {/* Features List Section */}
              <section className="featured-section">
                <h4 className="section-title fw-semibold mb-4">Feature</h4>
                <ul className="list-unstyled list-inline" style={{ display: 'flex', alignItems: "baseline", gap: "0.5rem", flexWrap: 'wrap' }}>
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
                <h4 className="section-title fw-semibold mb-4">Sellers Notes</h4>
                <p>{vehicleInfo.sellerNotes}</p>
                <Calculator data={detail?.data} />
              </section>
            </div>

            {/* Seller Information Sidebar */}
            <div className="col-md-4">
              {SellerCard}
              <SocialCards detail={detail} scrollToMessage={scrollToMessage} />
              <div className="col-12">
                <div className="card address-card mb-3">
                  <div className="card-body gap-2 align-items-center text-primary">
                    <LocationPinIcon />
                    <div className="text-muted address-info">
                      {sellerInfo.location}
                      {sellerInfo.salesHours && (
                        <ul className="list-unstyled mb-0 text-muted mt-2">
                          <li>
                            Sales Hours:
                            <span className="ms-3">{sellerInfo.salesHours}</span>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <ReportAdd />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Seller Section */}
      <section className="contact-seller">
        <div className="container-xl">
          <div className="row">
            <div className="col-md-4">
              <div className="card border-0 shadow-none contact-seller-info">
                <div className="card-body card-border">
                  {SellerCard}
                </div>
                <div className="px-3">
                  <SocialContact detail={detail} />
                </div>

              </div>
            </div>
            <div className="col-md-7" ref={messageRef}>
              <MessageToDealer sellerId={detail?.data?.seller} />
            </div>
          </div>
        </div>
      </section>

      {/* Similar Products Section */}
      <section className="similar-product py-5">
        <div className="container-xl">
          <div className="row">
            <div className="col-md-12">
              <Title order={2} mb="lg">Similar Results</Title>
              {listOfSimilarVehicles?.data?.length === 0 && (
                <Text>No Similar Vehicles Found</Text>
              )}
            </div>
            {listOfSimilarVehicles?.data?.map((vehicle, index) => (
              <div className="col-md-3" key={index}>
                <SimilarVehicleCard vehicle={vehicle} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default VehicleDetailModule;