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

} from "@mantine/core";
import { GetColor } from '@/constants/colors'
import { AirBags, DimensionIcon, FuelTank, TransmissionIcon } from "@/components/Icons";
import {
  IconCheck,
} from "@tabler/icons-react";
import { Carousel } from "@mantine/carousel";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa6";

const VehicleDetail = ({ vehicle }) => {
  const {
    vehicleDetails: {
      make,
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
      entertainment,
      comfort,
      averageRating,
      reviewCount,
      brochureLink,
      description,
      pros,
      cons,
      year,
      bodyType,
      faqs
    },
    variants
  } = vehicle || {};
  return (
    <>
      {/* Header Section */}
      <Box bg="rgba(233, 8, 8, 0.8)" pb="xl">
        <Box className="container">
          <Box className="row">
            <Box className="col-md-12">
              <nav className="mt-3">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Anchor href="#">Cars</Anchor>
                  </li>
                  <li className="breadcrumb-item" aria-current="page">
                    <Anchor href="#">New Cars</Anchor>
                  </li>
                  <li className="breadcrumb-item" aria-current="page">
                    <Anchor href="#">{make} Cars</Anchor>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    <Anchor href="#">{`${make} ${model} ${variant} ${vehicle.year}`}</Anchor>
                  </li>
                </ol>
              </nav>
            </Box>
            <Title order={2} c="white">
              {`${make} ${model} ${variant} ${year}`} Price in Pakistan, Pictures, and Specs
            </Title>
          </Box>
        </Box>
      </Box>

      {/* Main Section */}
      <Box component="section" className="cars-detail" py="xl">
        <Box className="container">
          <Box className="row">
            {/* Carousel Section */}
            <Box className="col-lg-7">
              <Box className="gallery-slider">
                <Box className="large-thumbnail" pos="relative">
                  <Carousel withIndicators={false} controlSize={40} mb="md">
                    {(images || [defaultImage]).map((img, index) => (
                      <Carousel.Slide key={index}>
                        <Image
                          radius="sm"
                          alt="car-detail"
                          src={img || defaultImage}
                          h="433"
                          w="100%"
                          fit="cover"
                        />
                      </Carousel.Slide>
                    ))}
                  </Carousel>
                  <Box className="img-gallery-slider">
                    <SimpleGrid cols={5}>
                      {(images || [defaultImage]).map((img, index) => (
                        <UnstyledButton key={index}>
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
                </Box>
              </Box>
            </Box>

            {/* Car Details Section */}
            <Box className="col-lg-5" px="lg">
              <Box className="row">
                <Box className="col-12">
                  <Text c="dimmed" size="md">
                    {make} {model} {variant} {year} Price Range in Pakistan
                  </Text>
                  <Box my="lg">
                    <Text c="#E90808" fw="bold" size={rem(26)}>
                      <span style={{ color: "#E90808", fontWeight: 600 }}>PKR</span> {minPrice} - {maxPrice}
                    </Text>
                    <Text size="md" c="dimmed" ml="xs">
                      (*Ex-Factory Price)
                    </Text>
                  </Box>
                  <Flex gap="md" align="center">
                    <Flex align="center" gap="3">
                      <Rating defaultValue={averageRating} count={5} />
                      <Text span inherit>
                        ({averageRating || 0})
                      </Text>
                    </Flex>
                    <Text c="dimmed">(Reviews {reviewCount || 0})</Text>
                  </Flex>
                </Box>
              </Box>

              {/* Car Specifications */}
              <Box className="row border-bottom" mt="xl" pb="md" mb="md">
                <Box className="col-lg-6 border-end">
                  <Flex align="flex-start" gap="sm" c="dimmed">
                    <FuelTank style={{ width: rem(24), height: rem(24) }} />
                    <Text c="dimmed">
                      Engine <span style={{ color: "#000", fontWeight: 600 }}>{engine.type || "N/A"}</span>
                    </Text>
                  </Flex>
                </Box>
                <Box className="col-lg-6">
                  <Flex align="flex-start" gap="sm" c="dimmed">
                    <AirBags style={{ width: rem(24), height: rem(24), marginTop: rem(6) }} />
                    <Text c="dimmed">
                      Airbags <span style={{ color: "#000", fontWeight: 600 }}>{safety.airbags ? safety.airbags : "No"}</span>
                    </Text>
                  </Flex>
                </Box>
              </Box>

              <Box className="row border-bottom" pb="md" mb="lg">
                <Box className="col-lg-6 border-end">
                  <Flex align="flex-start" gap="sm" c="dimmed">
                    <DimensionIcon style={{ width: rem(24), height: rem(24), marginTop: rem(6) }} />
                    <Text c="dimmed">
                      Mileage <span style={{ color: "#000", fontWeight: 600 }}>{mileage.city || "N/A"}</span>
                    </Text>
                  </Flex>
                </Box>
                <Box className="col-lg-6">
                  <Flex align="flex-start" gap="sm" c="dimmed">
                    <TransmissionIcon style={{ width: rem(24), height: rem(24), marginTop: rem(6) }} />
                    <Text c="dimmed">
                      Transmission <span style={{ color: "#000", fontWeight: 600 }}>{transmission.type || "N/A"}</span>
                    </Text>
                  </Flex>
                </Box>
              </Box>

              {/* Color options */}
              <Box className="row">
                <Box className="col-lg-12">
                  <Title order={4} fw={600} mb="md">
                    Available Colors
                  </Title>
                  <Group>
                    {exterior?.colorsAvailable?.map((color, index) => (
                      <Button key={index} size="xs" radius="xl" bg={GetColor(color)} />
                    ))}
                  </Group>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* Additional Car Info */}
        <Box className="container" mt="xl">
          <Box className="row">
            <Box className="col-lg-12">
              <Title order={2}>
                {`${make} ${model} ${variant} ${year}`}{" "}
                <Text span inherit c="#E90808">
                  Price in Pakistan
                </Text>
              </Title>
              <Text mt="md">The price of {`${make} ${model} ${variant} ${year}`} in Pakistan starts from PKR {minPrice}.</Text>
              <Text mt="md">{vehicle.description || "No additional information available."}</Text>
              <Anchor href={brochureLink} underline="hover" className="text-primary" target="_blank">
                View Brochure
              </Anchor>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* Variants Comparison */}
      <Box className="container mb-4" mt="xl">
        <Title order={2}>
          {make} {model} Variants
        </Title>
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
            {variants?.map((variant, index) => (
              <Table.Tr key={index}>
                <Table.Td>
                  <Flex justify="space-between">
                    {/* Use Flex and multiple Text components instead of nesting */}
                    <div>
                      <Text fw={500} size="md" c="#E90808">
                        {`${variant.make} ${variant.model}`}
                      </Text>
                      <Text c="dimmed">
                        {`${variant.engine.displacement} cc, ${variant.transmission.type}, Petrol`}
                      </Text>
                    </div>
                    <Text>Delivery Time: 1 Month</Text>
                  </Flex>
                </Table.Td>
                <Table.Td>
                  <Text size="xl" fw="bold">
                    PKR {variant.minPrice} - {variant.maxPrice}
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

      {/* Pros and Cons Section */}
      <Box
        component="section"
        className="pros-const-section bg-light"
        py="xl"
      >
        <Box className="container" py="xl">
          <Box className="row">
            <Box className="col-lg-12">
              <Paper p="xl" shadow="0px 4px 20px 0px #00000014" radius="sm">
                <Title mb="lg" order={3}>
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
                        <ThemeIcon
                          color="green"
                          variant="white"
                          size={rem(18)}
                        >
                          <IconCheck
                            style={{ width: rem(18), height: rem(18) }}
                          />
                        </ThemeIcon>
                      }
                    >
                      {pros && pros.length && pros.map((pros, index) => (
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
                      {cons && cons.length && cons.map((cons, index) => (
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
      <Box component="section" className="detail-overview" py="xl">
        <Box className="container" py="xl">
          <Box className="row">
            <Box className="col-lg-12">
              <Paper p="xl" shadow="0px 4px 20px 0px #00000014" radius="sm">
                <Title mb="lg" order={3}>
                  {`${make} ${model} ${variant} ${year}`} Overview
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
      <Box component="section" className="pros-const-section bg-light" py="xl">
        <Box className="container" py="xl">
          <Box className="row">
            <Box className="col-lg-12">
              <Flex justify="space-between" align="center">
                <Title mb="lg" order={2}>
                  {`${make} ${model} ${variant} ${year}`}{" "}
                  <Text span inherit className="text-primary">
                    Specifications
                  </Text>
                </Title>
                <Anchor href="#" underline="hover" className="text-primary">
                  Full Specifications
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
                          <Table.Td>{`PKR ${minPrice} - ${maxPrice}` || "N/A"}</Table.Td>
                          <Table.Td c="dimmed">Body Type</Table.Td>
                          <Table.Td>{bodyType || "N/A"}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td c="dimmed">Dimensions (L x W x H)</Table.Td>
                          <Table.Td>{`${dimensions?.overallLength} x ${dimensions?.overallWidth} x ${dimensions?.overallHeight}` || "N/A"}</Table.Td>
                          <Table.Td c="dimmed">Ground Clearance</Table.Td>
                          <Table.Td>{dimensions?.groundClearance || "N/A"}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td c="dimmed">Displacement</Table.Td>
                          <Table.Td>{engine?.displacement || "N/A"}</Table.Td>
                          <Table.Td c="dimmed">Transmission</Table.Td>
                          <Table.Td>{transmission?.type || "N/A"}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td c="dimmed">Horse Power</Table.Td>
                          <Table.Td>{engine?.horsepower || "N/A"}</Table.Td>
                          <Table.Td c="dimmed">Torque</Table.Td>
                          <Table.Td>{engine?.torque || "N/A"}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td c="dimmed">Boot Space</Table.Td>
                          <Table.Td>{dimensions?.bootSpace || "N/A"}</Table.Td>
                          <Table.Td c="dimmed">Kerb Weight</Table.Td>
                          <Table.Td>{dimensions?.kerbWeight || "N/A"}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td c="dimmed">Fuel Type</Table.Td>
                          <Table.Td>{engine?.type || "N/A"}</Table.Td>
                          <Table.Td c="dimmed">Mileage</Table.Td>
                          <Table.Td>{`${fuelConsumption?.mileageCity} / ${fuelConsumption?.mileageHighway}` || "N/A"}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td c="dimmed">Fuel Tank Capacity</Table.Td>
                          <Table.Td>{fuelConsumption?.tankCapacity || "N/A"}</Table.Td>
                          <Table.Td c="dimmed">Seating Capacity</Table.Td>
                          <Table.Td>{dimensions?.seatingCapacity || "N/A"}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td c="dimmed">Top Speed</Table.Td>
                          <Table.Td>{engine?.maxSpeed || "N/A"}</Table.Td>
                          <Table.Td c="dimmed">Tyre Size</Table.Td>
                          <Table.Td>{wheelsAndTyres?.tyreSize || "N/A"}</Table.Td>
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

export default VehicleDetail;
