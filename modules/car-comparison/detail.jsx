import React from "react";
import { Comparison } from "@/services/comparison";
import VehicleComparisonDetail from "./vehicleDetails";
const ComparisonDetails = async ({ params ,type}) => {
    const comparisonData = await Comparison({ params, type });
    return (
        <>
            <VehicleComparisonDetail vehicles={comparisonData?.comparison} type={type} />
        </>
    )
}

export default ComparisonDetails
