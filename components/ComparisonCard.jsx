"use client"
import { Box, Card, Group, Text, Button, CloseButton, Select } from '@mantine/core';
import { usePathname, useRouter } from 'next/navigation';  // Add this import

import Image from 'next/image';
import { useComparison } from '@/contexts/comparison';
import React, { useState, useEffect } from 'react';
import CustomModel from '@/constants/CustomModel';
import { fetchMakesByTypeServer } from '@/actions';
import { typeMapping } from '@/constants/vehicle-constants';
import axios from 'axios';
import { BASE_URL } from '@/constants/api-endpoints';




const ComparisonCard = ({ onClose, vehicle, onVariantChange, variants, setIsModalOpen }) => {
  return (
    <Card
      shadow="sm"
      padding="xs"
      radius="md"
      withBorder
      style={{
        width: 300,
        position: 'relative',
        backgroundColor: '#fff'
      }}
    >
      <CloseButton
        onClick={onClose}
        style={{
          position: 'absolute',
          right: 5,
          top: 5,
          zIndex: 2
        }}
      />
      <Group noWrap align="flex-start" spacing="xs">
        <Image
          src={vehicle?.image}
          alt={vehicle.name}
          width={90}
          height={80}
          style={{
            objectFit: 'cover',
            borderRadius: '4px'
          }}
        />

        <Box>
          <Text size="sm" fw={500} mb={4}>
            {vehicle.name}
          </Text>
          <Text size="sm" fw={500} c="dimmed" mb={8}>
            ${vehicle.price}
          </Text>
          <Select
            data={variants}
            value={vehicle.variant}
            onChange={onVariantChange}
            onClick={() => setIsModalOpen(true)}
            size="xs"
            styles={{
              input: {
                border: '1px solid #e0e0e0',
                '&:focus': {
                  borderColor: '#228be6'
                }
              },
              root: {
                width: '150px'
              }
            }}
          />
        </Box>
      </Group>
    </Card>
  );
};

const VehicleComparison = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selection, setSelection] = useState({});
  const [activeComparisonIndex, setActiveComparisonIndex] = useState(null);
  const [newVehicleDetails, setNewVehicleDetails] = useState([]);



  // Watch for selection changes
  useEffect(() => {
    const updateVehicleDetails = async () => {
      if (!selection.make || !selection.model || !selection.variant || activeComparisonIndex === null) {
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL}/api/new-vehicles/get-newVehicle-details`, {
          params: {
            make: selection.make,
            model: selection.model,
            variant: selection.variant
          }
        });

        // Update the specific vehicle in newVehicleDetails array
        if (response.data?.data) {
          setComparisonVehicles(prev => {
            const updated = [...prev];
            updated[activeComparisonIndex] = response.data;
            return updated;
          });
          setIsModalOpen(false);
          setActiveComparisonIndex(null);
        }
      } catch (error) {
        console.error('Error fetching updated vehicle details:', error);
      }
    };


    updateVehicleDetails();
  }, [selection.variant]); // Only trigger when variant changes


  const router = useRouter();
  const pathname = usePathname();

  // Extract the vehicle type (new-cars, new-bikes, new-trucks) from the pathname
  const segments = pathname.split('/');
  const vehicleType = segments.find(segment =>
    ['new-cars', 'new-bikes', 'new-trucks'].includes(segment)
  )?.replace('new-', '');

  const [fetchMakesByTypeData, setFetchMakesByTypeData] = useState([]);
  const { comparisonVehicles, setComparisonVehicles ,handleRemoveComparison} = useComparison();

  const fetchMakesByType = async (vehicleType) => {
    try {
      const fetchMakes = await fetchMakesByTypeServer(typeMapping[vehicleType]);
      setFetchMakesByTypeData(fetchMakes);
    } catch (error) { }
  };

  // useEffect hook to fetch data when makesByType changes
  useEffect(() => {
    fetchMakesByType(vehicleType);
  }, []);


  const handleCompareNow = () => {
    if (comparisonVehicles.length < 2) {
      // You might want to add a notification here
      return;
    }

    // Use vehicleType instead of slug for the URL
    const comparisonUrl = `/comparison/${typeMapping[vehicleType]}/${comparisonVehicles
      .map(
        (vehicle) =>
          `${vehicle?.data?.make}-${vehicle?.data?.model}${vehicle?.data?.variant ? "-" + vehicle?.data?.variant : ""
          }`
      )
      .join("_")}`;

    router.push(comparisonUrl);
  };


  

  if (comparisonVehicles.length === 0) return null;

  return (
    <>
      <Box
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'white',
          borderTop: '1px solid #ddd',
          padding: '15px 20px',
          boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
          zIndex: 1000
        }}
      >
        
        <Group position="apart" align="center">

          <Group spacing={10} position="center" align="center">
            {comparisonVehicles.map((vehicleResponse, index) => {
              const vehicle = vehicleResponse.data;

              return (
                <React.Fragment key={vehicle._id}>
                  {index > 0 && (
                    <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Text size="lg" fw={500}>VS</Text>
                    </Box>
                  )}
                  <ComparisonCard
                    vehicle={{
                      name: `${vehicle.make} ${vehicle.model}`,
                      price: vehicle.price,
                      variant: vehicle.variant,
                      image: vehicle.defaultImage
                    }}
                    variants={[
                      { value: vehicle.Info?.variant, label: vehicle.Info?.variant }
                    ]}
                    onClose={() => handleRemoveComparison(vehicle._id)}
                    setIsModalOpen={() => {
                      setActiveComparisonIndex(index);
                      setIsModalOpen(true);
                    }}
                  />
                </React.Fragment>
              );
            })}
          </Group>

          <Button
            color="red"
            radius="md"
            onClick={handleCompareNow}
            disabled={comparisonVehicles.length < 2}
            style={{
              backgroundColor: '#E90808',
              color: 'white'
            }}
          >
            Compare Now
          </Button>
        </Group>
      </Box>

      <CustomModel
        isOpen={isModalOpen}
        selection={selection}
        setSelection={setSelection}
        onClose={() => {
          setIsModalOpen(false);
          // setActiveComparisonIndex(null);
          // setSelection({});
        }}
        fetchMakesByTypeData={fetchMakesByTypeData}
        hide={false}
      />

    </>
  );
};

export default VehicleComparison;