import React from 'react';
import { Box } from '@mantine/core';
import CarCard from "@/components/ui/CarCard";
import VehicleSearch from './VehicleSearch';
import { fetchVehiclesByType } from "@/services/vehicles";
import { getLocalStorage } from "@/utils";
const Vehicles = async () => {
    const vehicles = await fetchVehiclesByType();
    const token = getLocalStorage('token')
    return (
        <>
            <VehicleSearch  />
            <section className="blog-products py-5">
                <Box className="container-xl">
                    <Box className="row">
                        {vehicles?.data?.map((vehicle, index) => {
                            return (
                                <Box className="col-md-3" key={index}>
                                    <CarCard bg="transparent" vehicle={vehicle} token={token} />
                                </Box>
                            );
                        })}
                    </Box>
                </Box>
            </section>
        </>
    );
};

export default Vehicles;
