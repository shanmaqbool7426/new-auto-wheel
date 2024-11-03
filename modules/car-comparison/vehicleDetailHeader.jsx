"use client";
import { CarComparisonSmall, CarSmall, MotorBikeSmall, SmallReviewIcon, TruckSmall } from '@/components/Icons';
import { Anchor, Box, Button, Card, Group, Image, Input, Text, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import CustomModel from '@/constants/CustomModel';
import { fetchMakesByTypeServer } from '@/actions';
import { useRouter } from 'next/navigation';
import ComparisonCard from './ComparisonCard';
import Link from 'next/link';

const Header = ({ vehicles, type }) => {
    console.log(vehicles, "Test")
    const router = useRouter();
    const [fetchMakesByTypeData, setFetchMakesByTypeData] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Manage three separate vehicles
    const [vehicle1, setVehicle1] = useState(vehicles?.length ? vehicles[0] : { make: "", model: "", variant: "" });
    const [vehicle2, setVehicle2] = useState(vehicles?.length > 1 ? vehicles[1] : { make: "", model: "", variant: "" });
    const [vehicle3, setVehicle3] = useState(vehicles?.length > 2 ? vehicles[2] : { make: "", model: "", variant: "" });

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
                                <Anchor href="/" component={Link}>Home</Anchor>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                <Anchor href={`/comparison/${type}`} component={Link} tt="capitalize">{type} Comparison</Anchor>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                <Anchor tt="capitalize">
                                    {[vehicle1, vehicle2, vehicle3].map((vehicle, index) => (
                                        <span key={index}>
                                            {
                                                vehicle.make &&
                                                `${vehicle.make} ${vehicle.model} ${vehicle.variant} ${(index == 0 && index < 2) ? 'VS ' : ""}` ||
                                                ``
                                            }
                                        </span>
                                    ))}
                                </Anchor>
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
                            component={Link} href={`/reviews/${type}`}
                        >
                            {type} Reviews
                        </Button>
                    </Group>
                </div>
                <div className="col-md-12">
                    <Box className="search-wrapper-card" mt="xl" >
                        <Card shadow="0px 4px 20px 0px #00000014" padding="lg" radius="sm">
                            <Title order={3} mb="md" tt="capitalize">
                                New {`${type}s`} Comparison
                            </Title>
                            <div className="row mb-2">
                                {[vehicle1, vehicle2, vehicle3].map((vehicle, index) => (
                                    <div key={index} className="col-md-4" onClick={() => openModal(index + 1)}>
                                        <ComparisonCard vehicle={vehicle} />
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
