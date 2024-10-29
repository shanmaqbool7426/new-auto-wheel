"use client";
import React, { useState } from "react";
import {
  Anchor,
  Box,
  Group,
  Button,
  Card,
  Title,
  Input,
  Text,
  Paper,
  rem,
  Flex,
  Image,
  Rating,
} from "@mantine/core";
import {
  CarComparisonSmall,
  CarSmall,
  MotorBikeSmall,
  SmallReviewIcon,
  TruckSmall,
} from "@/components/Icons";
import UpcomingCars from "@/components/sections/UpcomingCars";
import ProductCard from "@/components/ui/ProductCard";
import { IconSearch } from "@tabler/icons-react";
import QuickLinks from "@/components/QuickLinks";
import Link from "next/link";
import Comments from "@/components/sections/Comments";
import WriteReviewModal from "@/components/ui/WriteReviewModal";
import CarCard from "@/components/ui/CarCard";
import NewCarsCard from "@/components/ui/NewCarsCard";
import { useSession } from "next-auth/react";
import CustomModel from "@/constants/CustomModel";
import { useRouter } from "next/navigation";

const CarReviewsModule = ({
  fetchMakesByTypeData,
  popularVehicles,
  popularUsedVehicles,
  type
}) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenCommon, setIsModalOpenCommon] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [selection, setSelection] = useState({
    make: "",
    model: "",
    variant: "",
  });

  // Helper function to standardize vehicle names (same as backend)
  const standardizeVehicleName = (make, model) => {
    return `${make} ${model}`.toLowerCase().replace(/\s+/g, "-");
  };
  const openModalCommon = () => setIsModalOpenCommon(true);
  const closeModalCommon = () => setIsModalOpenCommon(false);
  console.log("session", session);

  const handleSearch = () => {
    if (selection.make && selection.model) {
      const standardizedVehicle = standardizeVehicleName(
        selection.make,
        selection.model
      );
      router.push(`/reviews/${type}/${standardizedVehicle}`);
    } else {
      alert("Please select both make and model before searching.");
    }
  };
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
  return (
    <>
      <Box component="section" className="cars-reviews">
        <Box className="background-search-verlay" mb="100" mt={60}>
          <Box className="container-xl">
            <Box className="row">
              <Box className="col-md-12">
                <nav className="mt-3">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Anchor href="/" component={Link}>Home</Anchor>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      <Anchor href={`/reviews/${type}`} component={Link} tt="capitalize">{type} Reviews</Anchor>
                    </li>
                  </ol>
                </nav>
                <Group>
                  <Button
                    leftSection={getIconByType()}
                    variant="light"
                    radius="md"
                    size="sm"
                    bg="white"
                    c="#333"
                    autoContrast
                    tt="capitalize"
                    component={Link} href={`/new/${type}`}
                  >
                    New {type}s
                  </Button>
                  <Button
                    leftSection={getIconByType()}
                    variant="light"
                    size="sm"
                    radius="md"
                    bg="white"
                    c="#333"
                    autoContrast
                    tt="capitalize"
                    component={Link} href={`/listing/${type}s`}
                  >
                    Used {type}s
                  </Button>
                  <Button
                    leftSection={getComparisonIconByType()}
                    variant="light"
                    size="sm"
                    radius="md"
                    bg="white"
                    c="#333"
                    autoContrast
                    tt="capitalize"
                    component={Link} href={`/comparison/${type}`}
                  >
                    {type} Comparison
                  </Button>
                  <Button
                    leftSection={<SmallReviewIcon />}
                    variant="light"
                    size="sm"
                    radius="md"
                    bg="#333"
                    c="white"
                    autoContrast
                    tt="capitalize"
                  >
                    {type} Reviews
                  </Button>
                </Group>
              </Box>
              <Box className="col-md-12">
                <Box className="search-wrapper-card" mt="lg">
                  <Card
                    shadow="0px 4px 20px 0px #00000014"
                    padding="lg"
                    radius="sm"
                  >
                    <Title order={3} mb="md" tt="capitalize">
                      Browse Reviews For Your Perfect New {type}
                    </Title>
                    <Box className="row" mb="md">
                      <Box className="col-md-9">
                        <Input
                          size="md"
                          value={`${selection?.make} ${selection?.model}`}
                          onClick={openModalCommon}
                          placeholder="Search by Car Make or Model"
                          leftSection={<IconSearch size={16} />}
                        />
                      </Box>
                      <Box className="col-md-3">
                        <Button
                          size="md"
                          bg="#E90808"
                          autoContrast
                          fullWidth
                          onClick={handleSearch}
                          leftSection={<IconSearch size={16} />}
                        >
                          Search
                        </Button>
                      </Box>
                    </Box>
                  </Card>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="container-xl">
        <Box className="row">
          <Box className="col-md-12">
            <Paper
              shadow="none"
              bg="#F3F3F3"
              radius="none"
              mb="0"
              p={0}
              className="position-relative overflow-hidden"
            >
              <Box className="row">
                <Box className="col-lg-5">
                  <Card h="100%" bg="transparent" p="xl">
                    <Text size="xl" fw="bold">
                      If you own a car, leave a review and let others know what
                      you think of it.
                    </Text>
                    <Button
                      bg="#EB2321"
                      autoContrast
                      size="lg"
                      fw="500"
                      mt="xl"
                      miw={rem(260)}
                      ff="heading"
                      onClick={openModal}
                    >
                      Write a Review
                    </Button>
                  </Card>
                </Box>
                {/*  */}
                <Box className="col-7 d-none d-lg-block">
                  <Image className="banner-bg" src="/reviews-banner-bg.svg" />
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>

      <Box className="container-xl">
        <Box className="row">
          <Box className="col-md-12">
            <Title order={3} mt="xl" mb="md">
              Popular New{" "}
              <Text span inherit className="text-primary" tt="capitalize">
              {`${type}s`}
              </Text>
            </Title>
          </Box>
          <Box className="row">
            {popularVehicles?.data?.map((vehicle, index) => (
              <Box className="col-lg-4 col-sm-4" key={index}>
                <NewCarsCard index={index} vehicle={vehicle} isRating={true} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box
        component="section"
        className="popular-used-vehicles bg-light"
        py="xl"
        mb="xl"
      >
        <Box className="container-xl">
          <Box className="row">
            <Box className="col-md-12">
              <Title order={2} mb="xl">
                Popular Used{" "}
                <Text span inherit className="text-primary" tt="capitalize">
                  {`${type}s`}
                </Text>
              </Title>
            </Box>
            {popularUsedVehicles?.data?.map((vehicle, index) => (
              <Box className="col-lg-3 col-sm-4" key={index}>
                <CarCard index={index} vehicle={vehicle} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <QuickLinks />
      <WriteReviewModal
        opened={isModalOpen}
        close={closeModal}
        fetchMakesByTypeData={fetchMakesByTypeData}
        fetchReviews={()=>{}}
      />
      <CustomModel
        isOpen={isModalOpenCommon}
        selection={selection}
        setSelection={setSelection}
        onClose={closeModalCommon}
        fetchMakesByTypeData={fetchMakesByTypeData}
        hide={true}
      />
    </>
  );
};

export default CarReviewsModule;
