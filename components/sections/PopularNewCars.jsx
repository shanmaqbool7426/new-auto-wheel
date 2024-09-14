import { Box, Card, Flex, Image, Rating, Text, Title } from "@mantine/core";
import React from "react";

const PopularNewCars = ({ bg = true , popularVehicles}) => {

  console.log('popularVehicles.....',popularVehicles)
  return (
    <Box
      component="section"
      className={`popular-new-cars ${bg ? "bg-light" : ""} py-5`}
    >
      <Box className="container">
        <Box className="row">
          <Box className="col-md-12" mb="xl">
            <Title order={2}>
              Popular New{" "}
              <Text span c="#E90808" inherit>
                Cars
              </Text>
            </Title>
          </Box>
          {popularVehicles?.data?.results?.map((vehicle, index) => {
            return (
              <Box className="col-md-3" key={index}>
                <Card
                  shadow="0px 4px 20px 0px #00000014"
                  pb="xl"
                  pt="0"
                  px="0"
                  mb="xl"
                >
                  <Image
                    p="lg"
                    pt="xl"
                    src={vehicle?.defaultImage}
                    height={130}
                    alt="Mehran"
                    className="img-fluid"
                  />

                  <Flex direction="column" align="center" gap="xs">
                    <Title order={5} fw={500} c="#E90808">
                        {vehicle?.make}   {vehicle?.model}
                    </Title>
                    <Text fw={600} fs="xl">
                      Rs {vehicle?.startPrice} - {vehicle?.startPrice} Lacs
                    </Text>
                    <Flex align="center" justify="center" gap="xs">
                      <Rating defaultValue={2} />
                      <Text span inherit>
                        (3/5)
                      </Text>
                    </Flex>
                  </Flex>
                </Card>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default PopularNewCars;
