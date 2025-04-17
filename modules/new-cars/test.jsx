"use client";
import {
    Box,
    Group,
    Button,
    Title,
    Text,
    Image,
    Flex,
    Rating,
    rem,
    SimpleGrid,
    UnstyledButton,
    Anchor,
    Paper,
    Table,
    List,
    ThemeIcon,
    Checkbox,
  } from '@mantine/core';
  import { Carousel } from '@mantine/carousel';
  import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
  import { IconCheck, CloseIcon } from '@tabler/icons-react';
  
  const VehicleDetailsTest = ({ vehicle }) => {
    console.log(vehicle)
    const {
        vehicleDetails: {
            make,
            model,
            variant,
            minPrice,
            maxPrice,
            averageRating,
            reviewCount,
            description,
            images,
            bodyType,
            pros,
            cons,
            dimensions,
            engine,
            transmission,
            fuelConsumption,
            safety,
            exterior,
            comfort,
            brochureLink,
        },
        variants
      } = vehicle || {};
  
    return (
      <>
        {/* Main Section */}
        <Box component="section" className="cars-detail" py="xl">
          <Box className="container-xl">
            <Box className="row">
              {/* Carousel Section */}
              <Box className="col-lg-7">
                <Box className="gallery-slider">
                  <Box className="large-thumbnail" pos="relative">
                    <Carousel withIndicators={false} controlSize={40} mb="md">
                      {images.map((img, index) => (
                        <Carousel.Slide key={index}>
                          <Image
                            radius="sm"
                            alt={`vehicle-image-${index}`}
                            src={img || '/cars-detaill-placeholder-large.png'}
                            h="100%"
                            w="100%"
                            fit="cover"
                          />
                        </Carousel.Slide>
                      ))}
                    </Carousel>
                    <Box className="img-gallery-slider">
                      <SimpleGrid cols={5}>
                        {images.map((img, index) => (
                          <UnstyledButton key={index}>
                            <Image
                              radius="sm"
                              alt={`vehicle-thumb-${index}`}
                              src={img || '/cars-detaill-placeholder-large.png'}
                              h="100%"
                              w="100%"
                              fit="cover"
                            />
                          </UnstyledButton>
                        ))}
                      </SimpleGrid>
                    </Box>
                  </Box>
                </Box>
              </Box>
  
              {/* Car Details Section */}
              <Box className="col-lg-5" px="lg">
                <Box className="row">
                  <Box className="col-12">
                    <Text c="dimmed" size="md">
                      {`${make} ${model} ${variant} Price Range in Australia`}
                    </Text>
                    <Text c="#E90808" fw="bold" my="lg" size={rem(26)}>
                      <Text span c="#E90808" size="md" fw={600} mr="xs">
                        $
                      </Text>
                      {`${minPrice} - ${maxPrice}`}
                      <Text span size="md" c="dimmed" ml="xs">
                        (*Ex-Factory Price)
                      </Text>
                    </Text>
                    <Flex gap="md" align="center">
                      <Flex align="center" gap="3">
                        <Rating defaultValue={averageRating} count={5} />
                        <Text span inherit>
                          ({reviewCount})
                        </Text>
                      </Flex>
                    </Flex>
                  </Box>
                </Box>
  
                {/* Specifications */}
                <Box className="row border-bottom" mt="xl" pb="md" mb="md">
                  <Box className="col-lg-6 border-end">
                    <Flex align="flex-start" gap="sm" c="dimmed">
                      <Text c="dimmed">
                        Engine{' '}
                        <Text c="dark" fw={600}>
                          {`${engine.displacement} cc`}
                        </Text>
                      </Text>
                    </Flex>
                  </Box>
                  <Box className="col-lg-6">
                    <Flex align="flex-start" gap="sm" c="dimmed">
                      <Text c="dimmed">
                        No of Airbags{' '}
                        <Text c="dark" fw={600}>
                          {safety.airbags}
                        </Text>
                      </Text>
                    </Flex>
                  </Box>
                </Box>
                <Box className="row border-bottom" pb="md" mb="lg">
                  <Box className="col-lg-6 border-end">
                    <Flex align="flex-start" gap="sm" c="dimmed">
                      <Text c="dimmed">
                        Size{' '}
                        <Text c="dark" fw={600}>
                          {`${dimensions.overallLength} L x ${dimensions.overallWidth} W x ${dimensions.overallHeight} H`}
                        </Text>
                      </Text>
                    </Flex>
                  </Box>
                  <Box className="col-lg-6">
                    <Flex align="flex-start" gap="sm" c="dimmed">
                      <Text c="dimmed">
                        Transmission{' '}
                        <Text c="dark" fw={600}>
                          {transmission.type}
                        </Text>
                      </Text>
                    </Flex>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
  
        {/* Pros and Cons */}
 
  
        {/* Rich Text Overview */}
        <Box component="section" className="detail-overview" py="xl">
          <Box className="container-xl" py="xl">
            <Box className="row">
              <Box className="col-lg-12">
                <Paper p="xl" shadow="0px 4px 20px 0px #00000014" radius="sm">
                  <Title mb="lg" order={3}>
                    {`${make} ${model}`} Overview
                  </Title>
                  {/* Render Rich Text Description */}
                  <Box
                    className="has-typography"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                </Paper>
              </Box>
            </Box>
          </Box>
        </Box>
  
        {/* Variants Comparison */}
        <Box className="container-xl" mt="xl">
          <Title order={2}>{make} {model} Variants</Title>
          <Table verticalSpacing="sm" horizontalSpacing="sm" withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr bg="#E90808" c="white">
                <Table.Th w="50%">Variants</Table.Th>
                <Table.Th w="40%">Ex-Factory Price</Table.Th>
                <Table.Th w="10%" align="center" ta="center">
                  Compare
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {variants.map((variant, index) => (
                <Table.Tr key={index}>
                  <Table.Td>
                    <Flex justify="space-between">
                      <Text fw={500} size="md" c="#E90808">
                        {`${variant.make} ${variant.model}`}
                        <Text c="dimmed">{`${variant.engine.displacement} cc, ${variant.transmission.type}, Petrol`}</Text>
                      </Text>
                      <Text>Delivery Time: 1 Month</Text>
                    </Flex>
                  </Table.Td>
                  <Table.Td>
                    <Text size="xl" fw="bold">
                      ${variant.minPrice} - {variant.maxPrice}
                    </Text>
                  </Table.Td>
                  <Table.Td align="center">
                    <Checkbox labelPosition="left" />
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Box>
  
        {/* Detail Specification */}
        <Box component="section" className="pros-const-section bg-light" py="xl">
          <Box className="container-xl" py="xl">
            <Box className="row">
              <Box className="col-lg-12">
                <Flex justify="space-between" align="center">
                  <Title mb="lg" order={2}>
                    {make} {model} Specifications
                  </Title>
                  <Anchor href={brochureLink} underline="hover" className="text-primary">
                    View {make} {model} Brochure
                  </Anchor>
                </Flex>
              </Box>
              <Box className="col-lg-12">
                <Paper shadow="0px 4px 20px 0px #00000014" radius="sm" mb="md">
                  <Box className="row">
                    <Box className="col-lg-12">
                      <Table verticalSpacing="md" horizontalSpacing="md">
                        <Table.Tbody>
                          <Table.Tr>
                            <Table.Td c="dimmed">Price</Table.Td>
                            <Table.Td>{`${minPrice} - ${maxPrice}`}</Table.Td>
                            <Table.Td c="dimmed">Body Type</Table.Td>
                            <Table.Td>{bodyType}</Table.Td>
                          </Table.Tr>
                          <Table.Tr>
                            <Table.Td c="dimmed">Dimensions (Length x Width x Height)</Table.Td>
                            <Table.Td>{`${dimensions.overallLength} x ${dimensions.overallWidth} x ${dimensions.overallHeight}`}</Table.Td>
                            <Table.Td c="dimmed">Ground Clearance</Table.Td>
                            <Table.Td>{dimensions.groundClearance}</Table.Td>
                          </Table.Tr>
                          <Table.Tr>
                            <Table.Td c="dimmed">Displacement</Table.Td>
                            <Table.Td>{engine.displacement} cc</Table.Td>
                            <Table.Td c="dimmed">Transmission</Table.Td>
                            <Table.Td>{transmission.type}</Table.Td>
                          </Table.Tr>
                          <Table.Tr>
                            <Table.Td c="dimmed">Horse Power</Table.Td>
                            <Table.Td>{engine.horsepower}</Table.Td>
                            <Table.Td c="dimmed">Torque</Table.Td>
                            <Table.Td>{engine.torque}</Table.Td>
                          </Table.Tr>
                          <Table.Tr>
                            <Table.Td c="dimmed">Boot Space</Table.Td>
                            <Table.Td>{dimensions.bootSpace} L</Table.Td>
                            <Table.Td c="dimmed">Kerb Weight</Table.Td>
                            <Table.Td>{dimensions.kerbWeight} Kg</Table.Td>
                          </Table.Tr>
                          <Table.Tr>
                            <Table.Td c="dimmed">Fuel Type</Table.Td>
                            <Table.Td>{engine.type}</Table.Td>
                            <Table.Td c="dimmed">Mileage</Table.Td>
                            <Table.Td>{`${fuelConsumption.mileageCity} - ${fuelConsumption.mileageHighway} KM/L`}</Table.Td>
                          </Table.Tr>
                          <Table.Tr>
                            <Table.Td c="dimmed">Fuel Tank Capacity</Table.Td>
                            <Table.Td>{fuelConsumption.tankCapacity} L</Table.Td>
                            <Table.Td c="dimmed">Seating Capacity</Table.Td>
                            <Table.Td>{dimensions.seatingCapacity} Persons</Table.Td>
                          </Table.Tr>
                          <Table.Tr>
                            <Table.Td c="dimmed">Top Speed</Table.Td>
                            <Table.Td>{engine.maxSpeed} Km/h</Table.Td>
                            <Table.Td c="dimmed">Tyre Size</Table.Td>
                            <Table.Td>{`${exterior.tyreSize}`}</Table.Td>
                          </Table.Tr>
                        </Table.Tbody>
                      </Table>
                    </Box>
                  </Box>
                </Paper>
              </Box>
            </Box>
          </Box>
        </Box>
      </>
    );
  };
  
  export default VehicleDetailsTest;
  