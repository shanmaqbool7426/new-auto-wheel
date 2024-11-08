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
    const comparisonData = mapVehicleData(vehicles,hideCommonFeatures,type)?.comparisonData;
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
                <Box className="background-search-verlay"
                    mb={{ base: 850, sm: 250 }}
                    pt={80}
                    h={550}
                >
                    <div className="container-xl">
                        <Header vehicles={vehicles} type={type} />
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
