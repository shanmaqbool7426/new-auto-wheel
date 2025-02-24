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
  ThemeIcon,
  List,
  CloseIcon,
  Checkbox,
  Grid,
} from "@mantine/core";
import { GetColor } from "@/constants/colors";
import {
  AirBags,
  CameraIcon,
  DetailTransmissionIcon,
  DimensionIcon,
  FuelTank,
  TransmissionIcon,
} from "@/components/Icons";
import { IconCheck } from "@tabler/icons-react";
import { Carousel } from "@mantine/carousel";

import { FaThumbsDown, FaThumbsUp } from "react-icons/fa6";
import { formatPrice, formatPriceInFactors } from "@/utils";
import Link from "next/link";
import { useState } from "react";

const VehicleDetail = ({ vehicle, variantsVehicles }) => {

  // selected vehicle for compare
  const [selectedVehicle, setSelectedVehicle] = useState([]);
  // Add state for active slide
  const [activeSlide, setActiveSlide] = useState(0);

  const {
    vehicleDetails: {
      make,
      type,
      model,
      variant,
      minPrice,
      maxPrice,
      defaultImage,
      images,
      dimensions,
      mileage,
      engine,
      transmission,
      safety,
      exterior,
      wheelsAndTyres,
      fuelConsumption,
      averageRating,
      reviewCount,
      brochureLink,
      description,
      pros,
      cons,
      year,
      bodyType,
      fuelAverage,
      fuelCapacity,
      slug
    },
    variants,
  } = vehicle || {};

  console.log(">>>>>>images", images)
  return (
    <>
      {/* Header Section */}
      <Box bg="rgba(233, 8, 8, 0.8)" pb="xl" pt={60} h={169}>
        <Box className="container-xl">
          <Box className="row">
            <Box className="col-md-12">
              <nav className="mt-3">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Anchor fz="14px" href="/" tt="capitalize" component={Link}>Home</Anchor>
                  </li>
                  <li className="breadcrumb-item" aria-current="page">
                    <Anchor fz="14px" href={`/new/${type}`} component={Link} tt="capitalize">New {`${type}s`}</Anchor>
                  </li>
                  <li className="breadcrumb-item" aria-current="page">
                    <Anchor fz="14px" component={Link} href={`/new/${type}/make/${make}`} tt="capitalize">{make} {`${type}s`}</Anchor>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    <Anchor fw="700" fz="14px" href="#">{`${make} ${model} ${variant}`}</Anchor>
                  </li>
                </ol>
              </nav>
            </Box>
            <Title order={2} c="white">
              {`${make} ${model} ${variant} ${year}`} Price in Pakistan,
              Pictures, and Specs
            </Title>
          </Box>
        </Box>
      </Box>

      {/* Main Section */}
      <Box component="section" className="cars-detail" pt="24px" pb="56px">
        <Box className="container-xl">
          <Grid gutter="32px">
            {/* Carousel Section */}
            <Grid.Col span={{ base: 12, lg: 8 }}>
              <Carousel 
                withIndicators={false} 
                controlSize={40} 
                mb="md"
                slideSize="100%"
                align="start"
                slidesToScroll={1}
                initialSlide={activeSlide}
                onSlideChange={setActiveSlide}
                styles={{
                  control: {
                    '&[data-inactive]': {
                      opacity: 0,
                      cursor: 'default',
                    },
                    color: 'white', // Red color for arrows
                    backgroundColor: '#E90808',
                    border: '1px solid #E90808',
                    '&:hover': {
                      backgroundColor: '#E90808',
                      color: 'white',
                    },
                  },
                }}
              >
                {(images).map((img, index) => (
                  <Carousel.Slide key={index}>
                    <Image
                      radius="5px"
                      alt="car-detail"
                      src={img || defaultImage}
                      h="433"
                      w="100%"
                      fit="cover"
                    />
                    <Group
                      gap="xs"
                      c="white"
                      pos="absolute"
                      top={rem(20)}
                      left={rem(20)}
                    >
                      <CameraIcon />
                      <Text>6</Text>
                    </Group>
                  </Carousel.Slide>
                ))}
              </Carousel>
              <Box className="img-gallery-slider">
                <SimpleGrid cols={5}>
                  {(images || [defaultImage]).map((img, index) => (
                    <UnstyledButton 
                      key={index}
                      onClick={() => setActiveSlide(index)}
                      style={{
                        opacity: activeSlide === index ? 1 : 0.6,
                        transition: 'opacity 0.2s ease'
                      }}
                    >
                      <Image
                        radius="sm"
                        alt="car-thumbnail"
                        src={img || defaultImage}
                        h="83"
                        w="100%"
                        fit="cover"
                      />
                    </UnstyledButton>
                  ))}
                </SimpleGrid>
              </Box>
            </Grid.Col>

            {/* Car Details Section */}
            <Grid.Col span={{ base: 12, lg: 4 }}>
              <Box>
                <Text c="dimmed" size={rem(16)}>
                  {make} {model} {variant} {year} Price Range in Pakistan
                </Text>
                <Group mt="20px" wrap="nowrap">
                  <Text c="#E90808" size="24px" lh="1">
                    <Text span fw="700" size="16px" c="#E90808">
                      PKR
                    </Text>{" "}
                    <Text span fw="700" size="24px" c="#E90808">
                      {formatPriceInFactors(minPrice)} -{" "}
                      {formatPriceInFactors(maxPrice)}
                    </Text>{" "}
                    <Text span size={'14px'} c="dimmed">
                      (*Ex-Factory Price)
                    </Text>
                  </Text>

                </Group>
                <Flex gap="md" align="center" mt="20px">
                  <Flex align="center" gap="3">
                    {console.log("averageRating",averageRating)}
                    <Rating defaultValue={averageRating} count={5} size={'16px'} readOnly/>
                    <Text span inherit size="16px" lh="1">
                      ({averageRating.toFixed(2) || 0})
                    </Text>
                  </Flex>
                  <Text lh="1" size="16px" c="dimmed">(Reviews {reviewCount || 0})</Text>
                </Flex>
                <Button
                  mt="20px"
                  size="md"
                  fw={400}
                  color="#E90808"
                  variant="outline"
                  h="29px"
                  fz={'14px'}
                >
                  Used Toyota Cars for sale
                </Button>
              </Box>

              {/* Car Specifications */}
              <Box className="row border-bottom" mt="xl" pb="md" mb="md">
                <Box className="col border-end">
                  <Flex align="flex-start" gap="sm" c="dimmed">
                    <FuelTank style={{ width: rem(24), height: rem(24) }} />
                    <Text c="dimmed" size="10px" lh="1">
                      Engine{" "}
                      <Text c="#333333" fw={700} mt="4px">
                        {engine.type || "N/A"}
                      </Text>
                    </Text>
                  </Flex>
                </Box>
                <Box className="col">
                  {type == "bike" ? (
                    <Flex align="flex-start" gap="sm" c="dimmed">
                      <FuelTank
                        style={{
                          width: rem(24),
                          height: rem(24),
                          marginTop: rem(6),
                        }}
                      />
                      <Text c="dimmed" size="10px" lh="1">
                        Fuel Tank{" "}
                        <Text c="#333333" fw={700} mt="4px">
                          {fuelCapacity || "N/A"}L
                        </Text>
                      </Text>
                    </Flex>
                  ) : (
                    <Flex align="flex-start" gap="sm" c="dimmed">
                      <AirBags
                        style={{
                          width: rem(24),
                          height: rem(24),
                          marginTop: rem(6),
                        }}
                      />
                      <Text c="dimmed" size="10px" lh="1">
                        No Of Air Bags{" "}
                        <Text c="#333333" fw={700} mt="4px">
                          {safety?.airbags ? safety.airbags : "No"}
                        </Text>
                      </Text>
                    </Flex>
                  )}
                </Box>
              </Box>

              <Box className="row border-bottom" pb="md" mb="lg">
                <Box className="col border-end">
                  {type == "bike" ? (
                    <Flex align="flex-start" gap="sm" c="dimmed">
                      <DimensionIcon
                        style={{
                          width: rem(24),
                          height: rem(24),
                          marginTop: rem(6),
                        }}
                      />
                      <Text c="dimmed" size="10px" lh="1">
                        Fuel Average{" "}
                        <Text span c="#333333" fw={700} mt="4px">
                          {fuelAverage || "N/A"}
                        </Text>
                      </Text>
                    </Flex>
                  ) : (
                    <Flex align="flex-start" gap="sm" c="dimmed">
                      <DimensionIcon
                        style={{
                          width: rem(24),
                          height: rem(24),
                          marginTop: rem(6),
                        }}
                      />
                      <Text c="dimmed" size="10px" lh="1">
                        Size{" "}
                        <Text c="#333333" fw={700} mt="4px">
                          {dimensions ? 
                            `${dimensions.overallLength}' ${dimensions.wheelBase}"L x ${dimensions.overallWidth}' ${dimensions.groundClearance}"W x ${dimensions.overallHeight}' ${dimensions.kerbWeight}"H` 
                            : "N/A"
                          }
                        </Text>
                      </Text>
                    </Flex>
                  )}
                </Box>
                <Box className="col">
                  <Flex align="flex-start" gap="sm" c="dimmed">
                    {/* <TransmissionIcon
                      style={{
                        width: rem(24),
                        height: rem(24),
                        marginTop: rem(6),
                      }}
                    /> */}
                    <DetailTransmissionIcon />
                    <Text c="dimmed" size="10px" lh="1">
                      Transmission{" "}
                      <Text c="#333333" fw={700} mt="4px">
                        {transmission.type || transmission || "N/A"}
                      </Text>
                    </Text>
                  </Flex>
                </Box>
              </Box>

              {/* Color options */}
              <Box className="row">
                <Box className="col-lg-12">
                  <Title order={5} fw={600} mb="md">
                    Available Colors
                  </Title>
                  <Group>
                    {type === "bike" &&
                      vehicle?.vehicleDetails?.colorsAvailable?.map(
                        (color, index) => (
                          <Button
                            key={index}
                            size="xs"
                            radius="xl"
                            bd="1px solid #EEE"
                            bg={GetColor(color)}
                          />
                        )
                      )}
                    {exterior?.colorsAvailable?.map((color, index) => (
                      <Button
                        key={index}
                        size="xs"
                        radius="xl"
                        bd="1px solid #EEE"
                        bg={color}
                      />
                    ))}
                  </Group>
                </Box>
              </Box>
            </Grid.Col>
          </Grid>
        </Box>
        {/* Additional Car Info */}
        <Box className="container-xl" mt="56px">
          <Box className="row">
            <Box className="col-lg-12">
              <Title order={2} fz="20px" lh={'1.25'}>
                {`${make} ${model} ${variant} ${year}`}{" "}
                <Text span inherit c="#E90808">
                  Price in Pakistan
                </Text>
              </Title>
              <Text mt="md">
                The price of {`${make} ${model} ${variant} ${year}`} in Pakistan
                starts from PKR {minPrice}.
              </Text>
              {/* <Anchor href={brochureLink} underline="hover" className="text-primary" target="_blank">
                View Brochure
              </Anchor> */}
            </Box>
            {variantsVehicles?.data?.variants && variantsVehicles?.data?.variants.length > 0 && (
              <Box className="col-lg-12" mt="xl">
                <Table
                  verticalSpacing="sm"
                  horizontalSpacing="sm"
                  withTableBorder
                  withColumnBorders
                >
                  <Table.Thead>
                    <Table.Tr bg="#E90808" c="white">
                      <Table.Th w="50%" fz="16px">Variants</Table.Th>
                      <Table.Th w="40%" fz="16px">Ex-Factory Price</Table.Th>
                      <Table.Th w="10%" fz="16px" align="center" ta="center">
                        Compare
                      </Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {variantsVehicles?.data?.variants?.map((variant, index) => (
                      <Table.Tr key={variant._id}>
                        <Table.Td>
                          <Flex justify="space-between">
                            <Box>
                              <Text fw={400} size="14px" c="#E90808">
                                {`${variant.make} ${variant.model} ${variant.variant}`}
                              </Text>
                              <Text size="12px" c="#878787" mt="6px">
                                {`${variant.engine?.displacement || 'N/A'} cc, ${variant.transmission?.type || 'N/A'}, ${variant.engine?.type || 'N/A'}`}
                              </Text>
                            </Box>
                          </Flex>
                          <Text size="12px" mt="12px" c="#878787">
                            {getKeyFeatures(variant)}
                          </Text>
                        </Table.Td>
                        <Table.Td>
                          <Text size="14px" fw="700" c="#333">
                            PKR {formatPrice(variant.minPrice)} - {formatPrice(variant.maxPrice)}
                          </Text>
                          <Text size="12px" c="#E90808" mt="12px">
                            Get {variant.make} {variant.model} {variant.transmission?.type ? variant.transmission?.type : ''} {variant.variant} On Road Price
                          </Text>
                        </Table.Td>
                        <Table.Td align="center">
                          <Checkbox labelPosition="left" color="#E90808" onChange={(e) => setSelectedVehicle(e.target.checked ? [...selectedVehicle, { make: variant?.make, model: variant?.model, variant: variant?.variant, year: variant?.year, _id: variant?._id }] : selectedVehicle.filter(item => item._id !== variant._id))} />
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
                <Box style={{ alignItems: 'center' }} display="flex" gap="10px" mt="xl">
                  <Box flex={"1"}>
                    <Text c="#E90808" size="12px">
                      {variantsVehicles?.data?.variants?.map((variant, index) => (
                        <>
                          <Text c="#E90808" span inherit mx="xs" key={index}>{variant.make} {variant.model} {variant.variant} {variant.year} Price</Text> {index < variantsVehicles?.data?.variants?.length - 1 && '|'}
                        </>
                      ))}
                    </Text>
                  </Box>
                  {/* //  href={`/comparison/${pair.vehicle1.type}/${[
              pair.vehicle1,
              pair.vehicle2,
            ]
              .map(
                (vehicle) =>
                  `${vehicle.make}-${vehicle.model}${
                    vehicle.variant ? "-" + vehicle.variant : ""
                  }`
              )
              .join("_")}`} */}
                  {selectedVehicle?.length > 1 && (
                    <Button component={Link} size="sm" radius="md" bg="#E90808" c="white" href={`/comparison/${type}/${selectedVehicle.map(vehicle => `${vehicle.make}-${vehicle.model}${vehicle.variant ? "-" + vehicle.variant : ""}`).join("_")}`} >
                      Compare
                    </Button>
                  )}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      {/* Pros and Cons Section */}
      <Box component="section" className="pros-const-section" py="48px" bg="#F3F3F3">
        <Box className="container-xl">
          <Box className="row">
            <Box className="col-lg-12">
              <Paper p="xl" shadow="0px 4px 20px 0px #00000014" radius="5px">
                <Title mb="lg" order={3} fz="20px">
                  {`${make} ${model} ${variant} ${year}`}{" "}
                  <Text span inherit className="text-primary">
                    Pros & Cons
                  </Text>
                </Title>
                <Box className="row">
                  <Box className="col-lg-6">
                    <Flex align="center" mb="md">
                      <ThemeIcon
                        variant="light"
                        color="green"
                        radius="xl"
                        mr="sm"
                      >
                        <FaThumbsUp />
                      </ThemeIcon>
                      <Title order={4} fw={600}>
                        What we like
                      </Title>
                    </Flex>
                    <List
                      spacing="xs"
                      size="sm"
                      center
                      icon={
                        <ThemeIcon color="green" variant="white" size={rem(18)}>
                          <IconCheck
                            style={{ width: rem(18), height: rem(18) }}
                          />
                        </ThemeIcon>
                      }
                    >
                      {pros &&
                        pros.length &&
                        pros.map((pros, index) => (
                          <List.Item key={index}>{pros}</List.Item>
                        ))}
                    </List>
                  </Box>
                  <Box className="col-lg-6">
                    <Flex align="center" mb="md">
                      <ThemeIcon
                        variant="light"
                        color="red"
                        radius="xl"
                        mr="sm"
                      >
                        <FaThumbsDown />
                      </ThemeIcon>
                      <Title order={4} fw={600}>
                        What we don't like
                      </Title>
                    </Flex>
                    <List
                      spacing="xs"
                      size="sm"
                      center
                      icon={
                        <ThemeIcon color="red" variant="white" size={rem(24)}>
                          <CloseIcon
                            style={{ width: rem(24), height: rem(24) }}
                          />
                        </ThemeIcon>
                      }
                    >
                      {cons &&
                        cons.length &&
                        cons.map((cons, index) => (
                          <List.Item key={index}>{cons}</List.Item>
                        ))}
                    </List>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Rich Text Overview */}
      <Box component="section" className="detail-overview" py="56px">
        <Box className="container-xl">
          <Box className="row">
            <Box className="col-lg-12">
              <Paper p="xl" shadow="0px 4px 20px 0px #00000014" radius="sm">
                <Title mb="lg" order={2}>
                  {`${make} ${model} ${variant} ${year}`} <Text span inherit className="text-primary">Overview</Text>
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

      {/* Detail Specification Section */}
      <Box component="section" className="pros-const-section" py="56px" bg="#F3F3F3">
        <Box className="container-xl">
          <Box className="row">
            <Box className="col-lg-12">
              <Flex justify="space-between" align="center" mb="lg">
                <Title order={2}>
                  {`${make} ${model} ${variant} ${year}`}{" "}
                  <Text span inherit className="text-primary">
                    Specifications
                  </Text>
                </Title>
                <Anchor component={Link} href={`/specification-detail/${slug}`} underline="hover" className="text-primary">
                  {`${make} ${model}`} Specifications
                </Anchor>
              </Flex>
            </Box>
            <Box className="col-lg-12">
              <Paper shadow="0px 4px 20px 0px #00000014" radius="sm" mb="md">
                <Box className="row">
                  <Box className="col-lg-12">
                    {renderSpecifications(vehicle?.vehicleDetails)}
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

export default VehicleDetail;

const renderSpecifications = (vehicle) => {
  if (vehicle.type === "bike") {
    return (
      <Table verticalSpacing="md" horizontalSpacing="md">
        <Table.Tbody>
          <Table.Tr>
            <Table.Td>Price</Table.Td>
            <Table.Td>{`PKR ${vehicle.minPrice} - PKR ${vehicle.maxPrice}`}</Table.Td>
            <Table.Td>Dimension (LxWxH)</Table.Td>
            <Table.Td>{`${vehicle.dimensions.length} x ${vehicle.dimensions.width} x ${vehicle.dimensions.height} mm`}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>Engine</Table.Td>
            <Table.Td>{vehicle.engine.type}</Table.Td>
            <Table.Td>Displacement</Table.Td>
            <Table.Td>{`${vehicle.engine.displacement} cc`}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>Clutch</Table.Td>
            <Table.Td>{vehicle.engine.clutch}</Table.Td>
            <Table.Td>Transmission</Table.Td>
            <Table.Td>{vehicle.transmission}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>Horsepower</Table.Td>
            <Table.Td>{vehicle.engine.horsepower}</Table.Td>
            <Table.Td>Torque</Table.Td>
            <Table.Td>{vehicle.engine.torque}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>Bore & Stroke</Table.Td>
            <Table.Td>{vehicle.engine.boreStroke}</Table.Td>
            <Table.Td>Compression Ratio</Table.Td>
            <Table.Td>{vehicle.engine.compressionRatio}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>Petrol Capacity</Table.Td>
            <Table.Td>{`${vehicle.fuelCapacity}L`}</Table.Td>
            <Table.Td>Fuel Average</Table.Td>
            <Table.Td>{vehicle.fuelAverage}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>Starting</Table.Td>
            <Table.Td>{vehicle.starting}</Table.Td>
            <Table.Td>Top Speed</Table.Td>
            <Table.Td>{vehicle.topSpeed}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>Dry Weight</Table.Td>
            <Table.Td>{`${vehicle.dryWeight}KG`}</Table.Td>
            <Table.Td>Frame</Table.Td>
            <Table.Td>{vehicle.frame}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>Ground Clearance</Table.Td>
            <Table.Td>{vehicle.groundClearance}</Table.Td>
            <Table.Td>Wheel Size</Table.Td>
            <Table.Td>{vehicle.wheelSize}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>Tyre at Back</Table.Td>
            <Table.Td>{vehicle.tyres.back}</Table.Td>
            <Table.Td>Tyre at Front</Table.Td>
            <Table.Td>{vehicle.tyres.front}</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    );
  } else if (vehicle.type === "car" || vehicle.type === "truck") {
    return (
      <Table verticalSpacing="md" horizontalSpacing="md">
        <Table.Tbody>
          <Table.Tr>
            <Table.Td c="dimmed">Price</Table.Td>
            <Table.Td>
              {`PKR ${vehicle?.minPrice} - ${vehicle?.maxPrice}` || "N/A"}
            </Table.Td>
            <Table.Td c="dimmed">Body Type</Table.Td>
            <Table.Td>{vehicle?.bodyType || "N/A"}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td c="dimmed">Dimensions (L x W x H)</Table.Td>
            <Table.Td>
              {`${vehicle?.dimensions?.overallLength} x ${vehicle?.dimensions?.overallWidth} x ${vehicle?.dimensions?.overallHeight}` ||
                "N/A"}
            </Table.Td>
            <Table.Td c="dimmed">Ground Clearance</Table.Td>
            <Table.Td>{vehicle?.dimensions?.groundClearance || "N/A"}</Table.Td>          </Table.Tr>          <Table.Tr>            <Table.Td c="dimmed">Displacement</Table.Td>            <Table.Td>{vehicle?.engine?.displacement || "N/A"}</Table.Td>            <Table.Td c="dimmed">Transmission</Table.Td>            <Table.Td>{vehicle?.transmission?.type || "N/A"}</Table.Td>          </Table.Tr>          <Table.Tr>            <Table.Td c="dimmed">Horse Power</Table.Td>            <Table.Td>{vehicle?.engine?.horsepower || "N/A"}</Table.Td>            <Table.Td c="dimmed">Torque</Table.Td>            <Table.Td>{vehicle?.engine?.torque || "N/A"}</Table.Td>          </Table.Tr>          <Table.Tr>            <Table.Td c="dimmed">Boot Space</Table.Td>            <Table.Td>{vehicle?.dimensions?.bootSpace || "N/A"}</Table.Td>            <Table.Td c="dimmed">Kerb Weight</Table.Td>            <Table.Td>{vehicle?.dimensions?.kerbWeight || "N/A"}</Table.Td>          </Table.Tr>          <Table.Tr>            <Table.Td c="dimmed">Fuel Type</Table.Td>            <Table.Td>{vehicle?.engine?.type || "N/A"}</Table.Td>            <Table.Td c="dimmed">Mileage</Table.Td>            <Table.Td>              {`${vehicle?.fuelConsumption?.mileageCity} / ${vehicle?.fuelConsumption?.mileageHighway}` || "N/A"}            </Table.Td>          </Table.Tr>          <Table.Tr>            <Table.Td c="dimmed">Fuel Tank Capacity</Table.Td>            <Table.Td>              {vehicle?.fuelConsumption?.tankCapacity || "N/A"}            </Table.Td>            <Table.Td c="dimmed">Seating Capacity</Table.Td>            <Table.Td>{vehicle?.dimensions?.seatingCapacity || "N/A"}</Table.Td>          </Table.Tr>          <Table.Tr>            <Table.Td c="dimmed">Top Speed</Table.Td>            <Table.Td>{vehicle?.engine?.maxSpeed || "N/A"}</Table.Td>            <Table.Td c="dimmed">Tyre Size</Table.Td>            <Table.Td>{vehicle?.wheelsAndTyres?.tyreSize || "N/A"}</Table.Td>          </Table.Tr>        </Table.Tbody>      </Table>);
  } else { return <p>No specifications available for this vehicle type.</p>; }
};

const getKeyFeatures = (variant) => {
  const features = [];

  // Priority features to check (in order of importance)
  if (variant.safety?.airbags) features.push(`${variant.safety.airbags} Airbags`);
  if (variant.engine?.type) features.push(variant.engine.type);
  if (variant.safety?.abs) features.push('ABS');
  if (variant.engine?.displacement) features.push(`${variant.engine.displacement} cc`);
  if (variant.engine?.horsepower) features.push(`${variant.engine.horsepower} HP`);
  if (variant.engine?.torque) features.push(`${variant.engine.torque} Nm`);
  if (variant.comfort?.navigation) features.push('Navigation');
  if (variant.comfort?.rearCamera) features.push('Rear Camera');

  if (variant.exterior?.sunRoof) features.push('Sunroof');
  if (variant.comfort?.ac) features.push('AC');
  if (variant.comfort?.keylessEntry) features.push('Keyless Entry');
  if (variant.comfort?.infotainment) features.push('Infotainment');
  if (variant.comfort?.steeringSwitches) features.push('Steering Switches');
  if (variant.comfort?.rearCamera) features.push('Rear Camera');

  // Only take the first 7 features
  return features.slice(0, 7).join(', ');
};