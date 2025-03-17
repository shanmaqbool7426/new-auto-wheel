import { formatDate, formatToLacOrCrore } from "@/utils";
import { Box, Card, Flex, Image, Text, Title } from "@mantine/core";
import React from "react";
import NewCarsCard from "../ui/NewCarsCard";

const UpcomingCars = ({ reviewsText, reviewRating, fetchUpComingVehicles, type }) => {
  const transitionStyles = {
    transition: 'all 0.3s ease-in-out',
    opacity: false ? 0 : 1,
    transform: false ? 'translateY(20px)' : 'translateY(0)'
  };
  return (
    <Box component="section" className="upcoming-cars py-5">
      <Box className="container-xl">
        <Box className="row">
          <Box className="col-md-12" mb="xl">
            <Title order={2}>
              Upcoming{" "}
              <Text span c="#E90808" inherit tt="capitalize">
                {`${type}s`}
              </Text>
            </Title>
          </Box>
          {fetchUpComingVehicles?.data?.map((vehicle, index) => {
            return (
              <Box
                className="col-md-3"
                key={index}
                style={transitionStyles}
              >
                <NewCarsCard vehicle={vehicle} isRating={false} />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default UpcomingCars;
