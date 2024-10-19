import React from "react";
import { Comparison } from "@/services/comparison";
import VehicleComparisonDetail from "./vehicleDetails";
const ComparisonDetails = async ({ params }) => {
  const comparisonData = await Comparison(params);
  console.log(comparisonData?.comparison?.vehicles);
  return (
    <>
      <VehicleComparisonDetail
        vehicles={comparisonData?.comparison?.vehicles}
      />
    </>
  );
};

export default ComparisonDetails;
