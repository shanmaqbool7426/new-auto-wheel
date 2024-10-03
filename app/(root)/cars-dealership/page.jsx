"use client";
import React, { useEffect, useState } from "react";
import {
  Anchor,
  Box,
  Button,
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
} from "@mantine/core";
import { BiSearch } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { PhoneIcon } from "@/components/Icons";
import Link from "next/link";
import QuickLinks from "@/components/QuickLinks";
import { API_ENDPOINTS, BASE_URL } from "@/constants/api-endpoints";

const CarsDealerShip = () => {
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [showNumbers, setShowNumbers] = useState({});
  const [selectedType, setSelectedType] = useState("");

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

  return (
    <>
      <Box component="section" className="car-specification">
        <Box className="background-search-verlay" mb="80">
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
                    padding="xl"
                    radius="sm"
                  >
                    <Title order={3} mb="lg">
                      Browse Reviews For Your Perfect New Car
                    </Title>
                    <Box className="row mb-2">
                      <Box className="col-md-3">
                        <Select
                          size="md"
                          placeholder="Choose Type"
                          data={["Car", "Bike", "Truck"]}
                          value={selectedType}
                          onChange={setSelectedType}
                        />
                      </Box>
                      <Box className="col-md-3">
                        <Select
                          size="md"
                          placeholder="Choose Location"
                          data={["React", "Angular", "Vue", "Svelte"]}
                        />
                      </Box>
                      <Box className="col-md-3">
                        <Button
                          variant="filled"
                          fullWidth
                          size="md"
                          bg="#E90808"
                          autoContrast
                          fw="normal"
                          leftSection={<BiSearch />}
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
                <Text c="dimmed" mr="md">
                  SORT BY:
                </Text>
                <Select
                  size="sm"
                  placeholder="Date: newest First"
                  data={["React", "Angular", "Vue", "Svelte"]}
                />
              </Flex>
            </Box>
          </Box>
          <Box className="row">
            <Box className="col-12 text-center">
              <Table
                horizontalSpacing={0}
                withRowBorders={false}
                verticalSpacing="sm"
              >
                <Table.Tbody>
                  {dealers?.map((dealer, index) => (
                    <Table.Tr key={index} className="border-bottom">
                      <Table.Td w="25%">
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
                              <Rating defaultValue={dealer.rating} count={5} size="sm" />
                              ({dealer.rating}/5)
                            </Flex>
                            Reviews ({dealer.reviewCount})
                          </Stack>
                        </Flex>
                      </Table.Td>
                      <Table.Td w="25%" align="center">
                        <Text size="md">
                          No of Ads <strong>({dealer.adsCount})</strong>
                        </Text>
                      </Table.Td>
                      <Table.Td w="25%" align="center">
                        <Flex justify="center" align="center" gap={5}>
                          <PhoneIcon />
                          <Text size="lg" component="strong" fw="bold">
                            {showNumbers[index] ? dealer.phone : `(${dealer.phone.slice(0, 2)}****)`}
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
                      <Table.Td w="25%" align="center">
                        <Text fw={600}>
                          <FaLocationDot color="#E90808" className="me-2" />
                          {dealer.location ?? "Not Available"}
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
      </Box>
    </>
  );
};

export default CarsDealerShip;