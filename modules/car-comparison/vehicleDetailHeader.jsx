"use client";
import { CarComparisonSmall, CarSmall, SmallReviewIcon } from '@/components/Icons';
import { Anchor, Box, Button, Card, Group, Image, Input, Text, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import CustomModel from '@/constants/CustomModel';
import { fetchMakesByTypeServer } from '@/actions';
import { useRouter } from 'next/navigation';
import ComparisonCard from './ComparisonCard';

const Header = ({ vehicles }) => {
    const router = useRouter();
    const [fetchMakesByTypeData, setFetchMakesByTypeData] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Manage three separate vehicles
    const [vehicle1, setVehicle1] = useState(vehicles[0] || { make: "", model: "", variant: "" });
    const [vehicle2, setVehicle2] = useState(vehicles[1] || { make: "", model: "", variant: "" });
    const [vehicle3, setVehicle3] = useState(vehicles[2] || { make: "", model: "", variant: "" });

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
        fetchMakesByType("car");
    }, []);

    const handleCompare = () => {
        // Ensure at least 2 vehicles are selected
        const selectedVehicles = [vehicle1, vehicle2, vehicle3].filter(vehicle => vehicle.make && vehicle.model);

        if (selectedVehicles.length < 2) {
            alert("You must select at least 2 vehicles for comparison");
            return;
        }

        // Create slug from selected vehicles
        const slug = selectedVehicles.map(vehicle =>
            `${encodeURIComponent(vehicle.make)}-${encodeURIComponent(vehicle.model)}${vehicle.variant ? `-${encodeURIComponent(vehicle.variant)}` : ''}`
        ).join('_');
        router.push(`/car-comparison/${slug}`);
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
                setSelection={getSetVehicleFunction()}
                onClose={closeModal}
                fetchMakesByTypeData={fetchMakesByTypeData}
                hide={false}
            />
                    <div className="row">
                        <div className="col-md-12">
                            <Box className="search-wrapper-card" mt="xl">
                                <Card shadow="0px 4px 20px 0px #00000014" padding="lg" radius="sm">
                                    <Title order={3} mb="md">
                                        New Cars Comparison
                                    </Title>
                                    <div className="row mb-2">
                                        {[vehicle1, vehicle2, vehicle3].map((vehicle, index) => (
                                            <div key={index} className="col-md-4" onClick={() => openModal(index + 1)}>
                                                <ComparisonCard vehicle={vehicle}/>
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
        </>
    );
};

export default Header;
