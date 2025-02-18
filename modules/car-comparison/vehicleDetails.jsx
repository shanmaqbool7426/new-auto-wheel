// VehicleComparisonDetail.jsx
"use client";
import React from "react";
import { Box,} from "@mantine/core";
import DetailSection from "./DetailSection";
import VehicleComparisonLabels from "./VehicleComparisonLabels";
import Header from "./vehicleDetailHeader";
// import { comparisonData } from "@/mock-data/comparions-data";
import { mapVehicleData } from "@/utils/comparisonData"
const VehicleComparisonDetail = ({ vehicles, type }) => {
    const [hideCommonFeatures, setHideCommonFeatures] = React.useState(false);
    const [activeVehicles, setActiveVehicles] = React.useState(vehicles || []);
    const comparisonData = mapVehicleData(activeVehicles,hideCommonFeatures,type)?.comparisonData;
    const carDetailLabel = [
        { name: "Overview", href: "#overview" },
        { name: "Dimensions", href: "#dimension" },
        { name: "Engine & Performance", href: "#engine-performance" },
        { name: "Transmission", href: "#transmission" },
        { name: "Suspension, Steering & Brakes", href: "#suspension-steering-brakes" },
        { name: "Wheels & Tyres", href: "#wheels-tyres" },
        { name: "Fuel Consumptions", href: "#fuel-consumptions" },
        { name: "Safety", href: "#safety" },
        { name: "Exterior", href: "#exterior" },
    ];

    // Handle vehicle removal
    const handleVehicleRemove = (vehicleIndex) => {
        setActiveVehicles(prev => prev.filter((_, index) => index !== vehicleIndex));
    };
    return (
        <>
            <Box className="comparison-detail">
                <Box className="background-search-verlay"
                    mb={{ base: 1080, sm: 420 }}
                    pt={80}
                    h={250}
                >
                    <div className="container-xl">
                        <Header vehicles={activeVehicles} type={type} onVehicleRemove={handleVehicleRemove} />
                        <VehicleComparisonLabels labels={carDetailLabel} />
                    </div>
                </Box>
            </Box>

            {/* Display Each Comparison Data Section */}
            <Box component="section" className="comparison-detail-wrapper" mb="xl">
                <div className="container-xl">
                    <div className="row">
                        {comparisonData.map((section, sectionIndex) => (
                            <DetailSection key={sectionIndex} section={section} setHideCommonFeatures={setHideCommonFeatures} hideCommonFeatures={hideCommonFeatures}/>
                        ))}
                    </div>
                </div>
            </Box>
        </>
    );
};

export default VehicleComparisonDetail;
