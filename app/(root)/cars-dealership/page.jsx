"use client";
import React, { useEffect, useState } from "react";
import {
  Anchor,
  Box,
  Card,
  Title,
  Text,
  Image,
  Flex,
  Rating,
  Table,
  Select,
  Stack,
  Pagination,
  Modal,
  Button,
  FileInput,
  Input,
  Textarea,
  Checkbox,
  Group,
  Radio,
  rem,
} from "@mantine/core";
import { BiSearch } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { PhoneIcon } from "@/components/Icons";
import QuickLinks from "@/components/QuickLinks";
import { BASE_URL } from "@/constants/api-endpoints";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import LocationSelector from '@/components/LocationSelector';

import { Form } from "@mantine/form";
const CarsDealerShip = () => {
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [showNumbers, setShowNumbers] = useState({});
  const [selectedType, setSelectedType] = useState("");

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [selection, setSelection] = useState({
    country: "PK",
    province: "",
    city: "",
    suburb: ""
  });

  // Format the display value for the Select
  const displayValue = selection.suburb
    ? `${selection.suburb}, ${selection.city}`
    : selection.city
      ? selection.city
      : selection.province?.name
        ? selection.province.name
        : "";
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);


  const fetchDealers = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/user/get-dealers?page=${page}&limit=${limit}&type=${selectedType}`
      );
      const data = await response.json();
      setDealers(data.data.dealers);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching dealers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDealers();
  }, [page, limit, selectedType]);

  const handleShowNumber = (index) => {
    setShowNumbers((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const profileHnadler = (slug) => {
    router.push(`/dealer-profile/${slug}`);
  };
  return (
    <>
      <Box component="section" className="car-specification">
        <Box
          className="background-search-verlay"
          pt={60}
          mb={{ base: 250, sm: 120 }}
        >
          <Box className="container-xl">
            <Box className="row">
              <Box className="col-md-12">
                <nav className="mt-3">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Anchor href="#">Home</Anchor>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      <Anchor href="#">Dealer List</Anchor>
                    </li>
                  </ol>
                </nav>
              </Box>
              <Box className="col-md-12">
                <Box className="search-wrapper-card">
                  <Card
                    shadow="0px 4px 20px 0px #00000014"
                    padding="24px 16px"
                    radius="sm"
                  >
                    <Title order={3} mb="lg">
                      Browse Reviews For Your Perfect New Car
                    </Title>
                    <Box className="row mb-2">
                      <Box className="col-lg-5 col-md-4 mb-lg-0 mb-3">
                        <Select
                          size="md"
                          placeholder="Choose Type"
                          data={["All","Car", "Bike", "Truck"]}
                          value={selectedType}
                          onChange={setSelectedType}
                          comboboxProps={{ shadow: "xl" }}
                        />
                      </Box>
                      <Box className="col-lg-5 col-md-4 mb-lg-0 mb-3">
                        <Select
                          size="md"
                          placeholder="Choose Location"
                          value={displayValue || null}
                          data={displayValue ? [{ value: displayValue, label: displayValue }] : []}
                          onClick={() => setIsLocationModalOpen(true)}
                          searchable={false}
                          readOnly
                        />

                        <LocationSelector
                          isOpen={isLocationModalOpen}
                          onClose={() => setIsLocationModalOpen(false)}
                          selection={selection}
                          hideCountry={false}
                          setSelection={setSelection}
                        />
                      </Box>
                      <Box className="col-lg-2 col-md-4">
                        <Button
                          variant="filled"
                          fullWidth
                          size="md"
                          bg="#E90808"
                          autoContrast
                          fw="normal"
                          leftSection={<BiSearch fontSize={rem(18)} />}
                        >
                          Search
                        </Button>
                      </Box>
                    </Box>
                  </Card>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className="container-xl">
          {/* <Button onClick={open}>Open centered Modal</Button> */}
          <Box
            className="row g-0 border-bottom border-primary border-2 align-items-center"
            pb="md"
          >
            <Box className="col-md-6">
              <Title order={3}>
                Local Car{" "}
                <Text span inherit className="text-primary">
                  Dealerships
                </Text>
              </Title>
            </Box>
            <Box className="col-md-6 text-end">
              <Flex align="center" justify="flex-end">
                <Text c="dimmed" mr="md" size="sm">
                  SORT BY:
                </Text>
                <Select
                  size="sm"
                  placeholder="Date: newest First"
                  data={["React", "Angular", "Vue", "Svelte"]}
                  comboboxProps={{ shadow: "xl" }}  
                />
              </Flex>
            </Box>
          </Box>
          <Box className="row">
            <Box className="col-12 text-center">
              <Table
                scrollable
                horizontalSpacing={0}
                withRowBorders={false}
                verticalSpacing="sm"
              >
                <Table.Tbody>
                  {dealers?.map((dealer, index) => (
                    <Table.Tr
                      key={index}
                      className="border-bottom cursor"
                      onClick={() => profileHnadler(dealer._id)}
                    >
                      <Table.Td w="35%">
                        <Flex gap="xs">
                          <Image
                            src="/user-profile.png"
                            h={50}
                            w={50}
                            radius="sm"
                            className="img-fluid"
                          />
                          <Stack gap={0} align="flex-start">
                            <Flex align="center">
                              <Text fw="bold" size="lg" mr="sm">
                                {dealer.fullName}
                              </Text>
                              <Rating
                                defaultValue={dealer.rating}
                                count={5}
                                size="sm"
                              />
                              ({dealer.rating}/5)
                            </Flex>
                            Reviews ({dealer.reviewCount})
                          </Stack>
                        </Flex>
                      </Table.Td>
                      <Table.Td align="center" w="15%">
                        <Text size="md">
                          No of Ads <strong>({dealer.adsCount})</strong>
                        </Text>
                      </Table.Td>
                      <Table.Td align="center" w="30%">
                        <Flex justify="center" align="center" gap={5}>
                          <PhoneIcon />
                          <Text size="lg" component="strong" fw="bold">
                            {showNumbers[index]
                              ? dealer.phone
                              : `(${dealer.phone.slice(0, 2)}****)`}
                          </Text>
                          <Anchor
                            style={{ alignSelf: "flex-start" }}
                            component="button"
                            onClick={() => handleShowNumber(index)}
                            underline="always"
                            c="dimmed"
                            size="sm"
                          >
                            {showNumbers[index] ? "Hide Number" : "Show Number"}
                          </Anchor>
                        </Flex>
                      </Table.Td>
                      <Table.Td w="20%" align="center">
                        <Text fw={600}>
                          <FaLocationDot color="#E90808" className="me-2" />
                          {dealer.locationAddress ?? "Not Available"}
                        </Text>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
              <Pagination
                mt="sm"
                color="#E90808"
                total={totalPages}
                onChange={setPage}
                value={page}
              />
            </Box>
          </Box>

          <Box className="row">
            <Box className="col-md-12">
              <QuickLinks />
            </Box>
          </Box>
        </Box>

        {/* Give Rating Modal */}
      </Box>
    </>
  );
};


export default CarsDealerShip;
