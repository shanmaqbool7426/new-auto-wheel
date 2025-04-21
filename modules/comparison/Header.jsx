"use client";
import { CarComparisonSmall, CarSmall, SmallReviewIcon, MotorBikeSmall, TruckSmall } from '@/components/Icons';
import { Anchor, Box, Button, Card, Group, Image, Input, Text, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import CustomModel from '@/constants/CustomModel';
import { fetchMakesByTypeServer } from '@/actions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const   Header = ({ type }) => {
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
      `${encodeURIComponent(vehicle.make.replace(/\s+/g, '-')?.toLocaleLowerCase())}-${encodeURIComponent(vehicle.model.replace(/\s+/g, '-')?.toLocaleLowerCase())}${vehicle.variant ? `-${encodeURIComponent(vehicle.variant.replace(/\s+/g, '-')?.toLocaleLowerCase())}` : ''}`
    ).join('_');


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
        // mb={{ base: 650, sm: 300 }}
        pt={70}
        h={250}
        // bg={'rgba(233, 8, 8, 0.7)'}
      >
        <div className="container-xl">
          <div className="row">
            <div className="col-md-12">
              <nav className="mt-2">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Anchor href="/">Home</Anchor>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    <Anchor href="#" tt="capitalize">{type} Comparison</Anchor>
                  </li>
                </ol>
              </nav>
              <Group>
                <Button
                  autoContrast
                  component={Link}
                  href={`/new/${type}`}
                  leftSection={getIconByType()}
                  variant="light"
                  size="md"
                  tt='capitalize'
                  bg="white"
                  radius="16px"
                  c="#878787"
                  h={39}
                >
                  New {type}s
                </Button>
                <Button
                  autoContrast
                  component={Link}
                  href={`/listing/${type}s`}
                  leftSection={getIconByType()}
                  variant="light"
                  size="md"
                  tt='capitalize'
                  bg="white"
                  radius="16px"
                  c="#878787"
                  h={39}
                >
                  Used {type}s
                </Button>
                <Button
                  autoContrast
                  leftSection={getComparisonIconByType()}
                  variant="light"
                  size="md"
                  tt='capitalize'
                  bg="#333"
                  radius="16px"
                  c="white"
                  h={39}
                >
                  {type} Comparison
                </Button>
                <Button
                  autoContrast
                  component={Link}
                  href={`/reviews/${type}`}
                  leftSection={<SmallReviewIcon />}
                  variant="light"
                  size="md"
                  tt='capitalize'
                  radius="16px"
                  bg="white"
                  c="#878787"
                  h={39}
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

          </div>
        </div>
      </Box>

      <Box component='section' className="comparison-cards-section" pb="56px">
        <Box className="container-xl">
          <Box className="search-wrapper-card" mt="-70px">
            <Card shadow="0px 4px 20px 0px #00000014" padding="lg" radius="sm">
              <Title order={3} mb="md" tt="capitalize">
                New {`${type}s`} Comparison
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
                        {`Add ${type} ${vehicleNumber}`}
                      </Text>
                      <Input size="md" radius="md" placeholder="Search by Car Variant"
                        value={
                          vehicleNumber === 1 && vehicle1.make ? `${vehicle1.make} ${vehicle1.model} ${vehicle1.variant}` :
                            vehicleNumber === 2 && vehicle2.make ? `${vehicle2.make} ${vehicle2.model} ${vehicle2.variant}` :
                              vehicleNumber === 3 && vehicle3.make ? `${vehicle3.make} ${vehicle3.model} ${vehicle3.variant}` :
                                ""
                        }
                      />
                    </Card>
                  </div>
                ))}
                <div className="col-md-12">
                  <Box mt="lg" mx="auto" maw={300}>
                    <Button 
                      bg={[vehicle1, vehicle2, vehicle3].filter(v => v.make && v.model).length < 2 ? "#F8B5B5" : "#E90808"} 
                      autoContrast 
                      fw={500} 
                      size="md" 
                      fullWidth 
                      onClick={handleCompare}
                      disabled={
                        [vehicle1, vehicle2, vehicle3].filter(v => v.make && v.model).length < 2
                      }
                    >
                      Compare
                    </Button>
                  </Box>
                </div>
              </div>
            </Card>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Header;


