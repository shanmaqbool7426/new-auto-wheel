import { formatToLacOrCrore } from "@/utils";
import { Box, Card, Flex, Image, Rating, Text, Title } from "@mantine/core";
import React from "react";
import NewCarsCard from "../ui/NewCarsCard";

const PopularNewCars = ({ bg = true, popularVehicles, type }) => {

  const transitionStyles = {
    transition: 'all 0.3s ease-in-out',
    opacity: false ? 0 : 1,
    transform: false ? 'translateY(20px)' : 'translateY(0)'
  };
  console.log(">>>>>>>>>>>>>popularVehicles", popularVehicles)

  return (
    <Box
      component="section"
      className={`popular-new-cars ${bg ? "bg-light" : ""} py-5`}
    >
      <Box className="container-xl">
        <Box className="row">
          <Box className="col-md-12" mb="xl">
            <Title order={2}>
              Popular New{" "}
              <Text span c="#E90808" inherit tt="capitalize">
                {`${type}s`}
              </Text>
            </Title>
          </Box>
          {popularVehicles?.data?.map((vehicle, index) => {
            return (
              <Box
                className="col-md-3"
                key={index}
                style={transitionStyles}
              >
                {console.log(">>>>>>>>>>>>>vehicle....", vehicle)}
                <NewCarsCard vehicle={vehicle} isRating={true} />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default PopularNewCars;
