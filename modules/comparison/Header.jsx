"use client";
import { CarComparisonSmall, CarSmall, SmallReviewIcon } from '@/components/Icons';
import { Anchor, Box, Button, Card, Group, Image, Input, Text, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import CustomModel from '@/constants/CustomModel';
import { fetchMakesByTypeServer } from '@/actions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Header = ({type}) => {
    console.log(type,"Test")
  const router = useRouter();
  const [fetchMakesByTypeData, setFetchMakesByTypeData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [vehicle1, setVehicle1] = useState({ make: "", model: "", variant: "" });
  const [vehicle2, setVehicle2] = useState({ make: "", model: "", variant: "" });
  const [vehicle3, setVehicle3] = useState({ make: "", model: "", variant: "" });

  const [currentVehicle, setCurrentVehicle] = useState(null);

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
        console.log(vehicleType,"un")
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
    // Allow comparisons without the variant, only make and model are mandatory
    const selectedVehicles = [vehicle1, vehicle2, vehicle3].filter(vehicle => vehicle.make && vehicle.model);

    if (selectedVehicles.length < 2) {
      alert("You must select at least 2 vehicles for comparison");
      return;
    }

    // Create a slug from the selected vehicles (handle optional variants)
    const slug = selectedVehicles.map(vehicle => 
      `${encodeURIComponent(vehicle.make)}-${encodeURIComponent(vehicle.model)}${vehicle.variant ? `-${encodeURIComponent(vehicle.variant)}` : ''}`
    ).join('_');
    router.push(`/comparison/${type}/${slug}`);

  };

  const getSetVehicleFunction = () => {
    if (currentVehicle === 1) return setVehicle1;
    if (currentVehicle === 2) return setVehicle2;
    if (currentVehicle === 3) return setVehicle3;
    return null;
  };

  return (
    <>
      <CustomModel
        isOpen={isModalOpen}
        selection={
          currentVehicle === 1 ? vehicle1 :
          currentVehicle === 2 ? vehicle2 :
          currentVehicle === 3 ? vehicle3 : {}
        } 
        setSelection={getSetVehicleFunction()}  // Pass the correct setVehicle function
        onClose={closeModal}
        fetchMakesByTypeData={fetchMakesByTypeData}
        hide={false}
      />
      <Box 
              className="background-search-verlay"
              mb={{ base: 850, sm: 300 }}
              pt={70}
              h={400}
      >
        <div className="container-xl">
          <div className="row">
            <div className="col-md-12">
              {/* <nav className="mt-3">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Anchor href="#">Bikes</Anchor>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    <Anchor href="#">New Bikes</Anchor>
                  </li>
                </ol>
              </nav> */}
              <Group>
                <Button component={Link} href={`/new/${type}`} leftSection={<CarSmall />} variant="light" radius="md" size="md" bg="white" c="#333" autoContrast tt='capitalize'>
                  New {type}s
                </Button>
                <Button  component={Link} href={`/listing/${type}s`} leftSection={<CarSmall />} variant="light" size="md" radius="md" bg="white" c="#333" autoContrast tt='capitalize'>
                  Used {type}s
                </Button>
                <Button leftSection={<CarComparisonSmall />} variant="light" size="md" radius="md" bg="#333" c="white" autoContrast tt='capitalize'>
                  {type} Comparison
                </Button>
                <Button component={Link} href={`/car-reviews`} leftSection={<SmallReviewIcon />} variant="light" size="md" radius="md" bg="white" c="#333" autoContrast tt='capitalize'>
                  {type} Reviews
                </Button>
              </Group>
            </div>
            <div className="col-md-12">
              <Box className="search-wrapper-card" mt="lg">
                <Card shadow="0px 4px 20px 0px #00000014" padding="lg" radius="sm">
                  <Title order={3} mb="md">
                    New Cars Comparison
                  </Title>
                  <div className="row mb-2">
                    {[1, 2, 3].map((vehicleNumber) => (
                      <div key={vehicleNumber} className="col-md-4">
                        <Card
                          mb={{ base: "md", sm: 0 }}
                          shadow="none"
                          withBorder
                          padding="xl"
                          radius="md"
                          className="text-center"
                          onClick={() => openModal(vehicleNumber)}
                        >
                          <Image
                            src="/compare/compare-car.svg"
                            h={120}
                            w={120}
                            mb="xs"
                            className="img-fluid mx-auto"
                            alt={`Car Comparison ${vehicleNumber}`}
                          />
                          <Text c="dimmed" mb="md">
                            {
                              vehicleNumber === 1 && vehicle1.make ? `${vehicle1.make} ${vehicle1.model} ${vehicle1.variant}` :
                              vehicleNumber === 2 && vehicle2.make ? `${vehicle2.make} ${vehicle2.model} ${vehicle2.variant}` :
                              vehicleNumber === 3 && vehicle3.make ? `${vehicle3.make} ${vehicle3.model} ${vehicle3.variant}` :
                              `Add Car ${vehicleNumber}`
                            }
                          </Text>
                          <Input size="md" radius="md" placeholder="Search by Car Variant" />
                        </Card>
                      </div>
                    ))}
                    <div className="col-md-12">
                      <Box mt="lg" mx="auto" maw={300}>
                        <Button bg="#E90808" autoContrast fw={500} size="md" fullWidth onClick={handleCompare}>
                          Compare
                        </Button>
                      </Box>
                    </div>
                  </div>
                </Card>
              </Box>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};

export default Header;


