// VehicleComparisonDetail.jsx
"use client";
import React from "react";
import { Box, Card, Title } from "@mantine/core";
import ComparisonCard from "./ComparisonCard";
import DetailSection from "./DetailSection";
import VehicleComparisonLabels from "./VehicleComparisonLabels";
import Header from "./vehicleDetailHeader";
// import { comparisonData } from "@/mock-data/comparions-data";
import { mapVehicleData } from "@/utils/comparisonData"
const VehicleComparisonDetail = ({ vehicles,type }) => {
    const comparisonData = mapVehicleData(vehicles)?.comparisonData;
    const carDetailLabel = [
        { name: "Overview", href: "#overview" },
        { name: "Dimensions", href: "#dimension" },
        { name: "Engine & Performance", href: "#performance" },
        { name: "Transmission", href: "#transmission" },
        { name: "Suspension, Steering & Brakes", href: "#suspension_steering_brakes" },
        { name: "Wheels & Tyres", href: "#wheels_tyres" },
        { name: "Fuel Consumptions", href: "#fuel_consumptions" },
        { name: "Safety", href: "#safety" },
        { name: "Exterior", href: "#exterior" },
    ];

    return (
        <>
            <Box className="comparison-detail">
                <Box className="background-search-overlay" mb="120">
                    <div className="container-xl">
                        {/* <div className="row">
                            <div className="col-md-12">
                                <Card shadow="0px 4px 20px 0px #00000014" padding="lg" radius="sm">
                                    <Title order={3} mb="md">New Cars Comparison</Title>
                                    <div className="row mb-3">
                                        {vehicles?.map((vehicle, index) => (
                                            <div className="col-md-3" key={index}>
                                                <ComparisonCard vehicle={vehicle} />
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </div>
                        </div> */}
                        <Header vehicles={vehicles} type={type}/>
                        {/* Display Vehicle Comparison Labels */}
                        <VehicleComparisonLabels labels={carDetailLabel} />
                    </div>
                </Box>
            </Box>

            {/* Display Each Comparison Data Section */}
            <Box component="section" className="comparison-detail-wrapper" mb="xl">
                <div className="container-xl">
                    <div className="row">
                        {comparisonData.map((section, sectionIndex) => (
                            <DetailSection key={sectionIndex} section={section} />
                        ))}
                    </div>
                </div>
            </Box>
        </>
    );
};

export default VehicleComparisonDetail;
