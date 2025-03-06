import React from "react";
import { Comparison } from "@/services/comparison";
import VehicleComparisonDetail from "./vehicleDetails";
import LoadingWrapper from "@/components/loading-wrapper";
const ComparisonDetails = async ({ params ,type}) => {
    const comparisonData = await Comparison({ params, type });
    return (
        <>
            <LoadingWrapper>
            <VehicleComparisonDetail vehicles={comparisonData?.comparison} type={type} />
            </LoadingWrapper>
        </>
    )
}

export default ComparisonDetails
