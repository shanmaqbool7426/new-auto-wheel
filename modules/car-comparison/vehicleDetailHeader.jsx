"use client";
import {
  CarComparisonSmall,
  CarSmall,
  MotorBikeSmall,
  SmallReviewIcon,
  TruckSmall,
} from "@/components/Icons";
import {
  Anchor,
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Group,
  Image,
  Input,
  Text,
  Title,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import CustomModel from "@/constants/CustomModel";
import { fetchMakesByTypeServer } from "@/actions";
import { useRouter } from "next/navigation";
import ComparisonCard from "./ComparisonCard";
import Link from "next/link";

const Header = ({ vehicles, type, onVehicleRemove, hideCompareButton=false }) => {
  const router = useRouter();
  const [fetchMakesByTypeData, setFetchMakesByTypeData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState(null);

  // Manage three separate vehicles
  const [vehicle1, setVehicle1] = useState(
    vehicles?.length ? vehicles[0] : { make: "", model: "", variant: "" }
  );
  const [vehicle2, setVehicle2] = useState(
    vehicles?.length > 1 ? vehicles[1] : { make: "", model: "", variant: "" }
  );
  const [vehicle3, setVehicle3] = useState(
    vehicles?.length > 2 ? vehicles[2] : { make: "", model: "", variant: "" }
  );

  const openModal = (vehicleNumber) => {
    setCurrentVehicle(vehicleNumber);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentVehicle(null);
  };

  const fetchMakesByType = async (vehicleType) => {
    try {
      const fetchMakes = await fetchMakesByTypeServer(vehicleType);
      setFetchMakesByTypeData(fetchMakes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMakesByType(type);
  }, []);

  const handleCompare = () => {
    // Ensure at least 2 vehicles are selected
    console.log("vehicle>>>>>>>>");
    const selectedVehicles = [vehicle1, vehicle2, vehicle3].filter(
      (vehicle) => vehicle.make && vehicle.model
    );

    if (selectedVehicles.length < 2) {
      alert("You must select at least 2 vehicles for comparison");
      return;
    }

  

    // Create slug from selected vehicles
    const slug = selectedVehicles
      .map(
        (vehicle) =>
          `${encodeURIComponent(vehicle.make)}-${encodeURIComponent(
            vehicle.model
          )}${vehicle.variant ? `-${encodeURIComponent(vehicle.variant)}` : ""}`
      )
      .join("_");
    router.push(`/comparison/${type}/${slug}`);
  };

  const getSetVehicleFunction = () => {
    if (currentVehicle === 1) return setVehicle1;
    if (currentVehicle === 2) return setVehicle2;
    if (currentVehicle === 3) return setVehicle3;
    return null;
  };
  const getIconByType = () => {
    switch (type) {
      case "bike":
        return <MotorBikeSmall />;
      case "car":
        return <CarSmall />;
      case "truck":
        return <TruckSmall />;
      default:
        return null;
    }
  };
  const getComparisonIconByType = () => {
    switch (type) {
      case "bike":
        return <MotorBikeSmall />;
      case "car":
        return <CarComparisonSmall />;
      case "truck":
        return <TruckSmall />;
      default:
        return null;
    }
  };
  const handleRemoveVehicle = (vehicleNumber) => {
    onVehicleRemove(vehicleNumber);
    switch (vehicleNumber + 1) {
      case 1:
        setVehicle1({ make: "", model: "", variant: "" });
        break;
      case 2:
        setVehicle2({ make: "", model: "", variant: "" });
        break;
      case 3:
        setVehicle3({ make: "", model: "", variant: "" });
        break;
    }
  };

  console.log("setVehicle1setVehicle1", vehicle3);
  useEffect(() => {
    if (vehicle1.variant && vehicle2.variant && vehicle3.variant) {
      handleCompare();
    }
  }, [vehicle3.variant, vehicle2.variant, vehicle1.variant])
  

  return (
    <>
      <CustomModel
        isOpen={isModalOpen}
        selection={
          currentVehicle === 1
            ? vehicle1
            : currentVehicle === 2
              ? vehicle2
              : currentVehicle === 3
                ? vehicle3
                : {}
        }
        setSelection={getSetVehicleFunction()}
        onClose={closeModal}
        fetchMakesByTypeData={fetchMakesByTypeData}
        hide={false}
      />
      <div className="row">
        <div className="col-md-12">
          <nav className="">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Anchor href="/" component={Link}>
                  Home
                </Anchor>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <Anchor
                  href={`/comparison/${type}`}
                  component={Link}
                  tt="capitalize"
                >
                  {type} Comparison
                </Anchor>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <Anchor tt="capitalize">
                  {[vehicle1, vehicle2, vehicle3]
                    .filter(vehicle => vehicle.make && vehicle.model) 
                    .map((vehicle, index, filteredArray) => (
                      <span key={index}>
                        {`${vehicle.make} ${vehicle.model} ${vehicle.variant || ''}`}
                        {index < filteredArray.length - 1 ? " VS " : ""}
                      </span>
                    ))}
                </Anchor>
              </li>
            </ol>
          </nav>
          {/* <Group>
            <Button
              leftSection={getIconByType()}
              variant="light"
              radius="md"
              size="sm"
              bg="white"
              c="#333"
              autoContrast
              tt="capitalize"
              component={Link}
              href={`/new/${type}`}
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
              component={Link}
              href={`/listing/${type}s`}
            >
              Used {type}s
            </Button>
            <Button
              leftSection={getComparisonIconByType()}
              variant="light"
              size="sm"
              radius="md"
              bg="#333"
              c="white"
              autoContrast
              tt="capitalize"
            >
              {type} Comparison
            </Button>
            <Button
              leftSection={<SmallReviewIcon />}
              variant="light"
              size="sm"
              radius="md"
              bg="white"
              c="#333"
              autoContrast
              tt="capitalize"
              component={Link}
              href={`/reviews/${type}`}
            >
              {type} Reviews
            </Button>
          </Group> */}
        </div>
        <div className="col-md-12">
          <Box className="search-wrapper-card">
            <Card shadow="0px 4px 20px 0px #00000014" pt="24px" pl="16px" radius="4px">
              <Title order={2} mb="24px" tt="capitalize">
                New {`${type}s`} Comparison
              </Title>
              <Box pb={'30px'}>
                <div className="row">
                  <div className="col-md-3 d-none d-md-block">
                    <Flex
                      h="100%"
                      py={{ base: "xl", sm: "0" }}
                      direction={{ base: "row", sm: "column" }}
                      justify="center"
                      align="center"
                      gap="xs"
                    >
                      {[vehicle1, vehicle2, vehicle3]
                    .filter(vehicle => vehicle.make && vehicle.model) 
                    .map((vehicle, index, filteredArray) => (
                        <React.Fragment key={index}>
                          <Text fw={600}>
                            {(vehicle.make &&
                              `${vehicle.make} ${vehicle.model} ${vehicle.variant}`) ||
                              ``}
                          </Text>
                          {(index < filteredArray.length - 1) && (
                            <Badge
                              h={40}
                              w={40}
                              radius={40}
                              size="md"
                              fw={500}
                              bg="#E90808"
                            >
                              VS
                            </Badge>
                          )}
                        </React.Fragment>
                      ))}
                    </Flex>
                  </div>
                  {[vehicle1, vehicle2, vehicle3].map((vehicle, index) => (
                    <div
                      key={index}
                      className="col-md-3"
                    >
                      <ComparisonCard vehicle={vehicle} onRemove={() => handleRemoveVehicle(index)} onClick={() => openModal(index + 1)} />
                    </div>
                  ))}
                </div>
                {!hideCompareButton && (
                  <div className="col-md-12">
                    <Box mt="lg" mx="auto" maw={300}>
                      <Button
                        bg="#E90808"
                        autoContrast
                        fw={500}
                        size="md"
                      fullWidth
                      onClick={handleCompare}
                    >
                      Compare
                    </Button>
                  </Box>
                  </div>
                )}
              </Box>
            </Card>
          </Box>
        </div>
      </div>
    </>
  );
};

export default Header;
