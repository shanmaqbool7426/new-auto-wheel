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
import { MdArrowDropDown, MdCheckCircle } from "react-icons/md";

import { FaLocationDot } from "react-icons/fa6";
import { PhoneIcon } from "@/components/Icons";
import QuickLinks from "@/components/QuickLinks";
import { BASE_URL } from "@/constants/api-endpoints";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import LocationSelector from '@/components/LocationSelector';

import { Form } from "@mantine/form";
import { useUser } from "@/contexts/user";
import { useAuthModalContext } from "@/contexts/auth-modal";
import { AUTH_VIEWS } from '@/constants/auth-config';

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

  const [sortOption, setSortOption] = useState("newest");

  // Search parameters state (only updated when search button is clicked)
  const [searchParams, setSearchParams] = useState({
    type: "",
    location: "",
    sort: "newest",
    page: 1
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

  const { userData } = useUser();
  const { openAuthModal } = useAuthModalContext();

  const fetchDealers = async () => {
    try {
      setLoading(true);
      
      // Build query parameters
      const queryParams = new URLSearchParams({
        page: searchParams.page.toString(),
        limit: limit.toString(),
        sort: searchParams.sort
      });
      
      if (searchParams.type && searchParams.type.toLowerCase() !== 'all') {
        queryParams.append('type', searchParams.type.toLowerCase());
      }
      
      if (searchParams.location) {
        queryParams.append('location', searchParams.location);
      }

      const response = await fetch(
        `${BASE_URL}/api/user/get-dealers?${queryParams}`
      );
      const data = await response.json();
      setDealers(data.data.dealers);
      setTotalPages(data.data.totalPages);
    } catch (error) {
      console.error("Error fetching dealers:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search button click
  const handleSearch = () => {
    const locationValue = selection.city?.name || selection.province?.name || '';
    
    setSearchParams({
      type: selectedType,
      location: locationValue,
      sort: sortOption,
      page: 1 // Reset to first page on new search
    });
    
    setPage(1); // Reset pagination
  };

  // Handle page change
  useEffect(() => {
    if (page !== searchParams.page) {
      setSearchParams(prev => ({
        ...prev,
        page: page
      }));
    }
  }, [page]);

  // Handle sort change
  useEffect(() => {
    if (sortOption !== searchParams.sort) {
      setSearchParams(prev => ({
        ...prev,
        sort: sortOption
      }));
    }
  }, [sortOption]);

  // Fetch dealers when search parameters change
  useEffect(() => {
    fetchDealers();
  }, [searchParams]);

  // Initial load
  useEffect(() => {
    fetchDealers();
  }, []);

  const handleShowNumber = (index, e) => {
    if (e) e.stopPropagation(); // Prevent row click when clicking show number

    // Check if user is logged in
    if (!userData?._id) {
      openAuthModal(AUTH_VIEWS.SOCIAL_LOGIN);
      return;
    }

    // If user is logged in, show/hide the number
    setShowNumbers((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const profileHnadler = (slug) => {
    router.push(`/dealer-profile/${slug}`);
  };


  const sortOptions = [
    { value: 'newest', label: 'Date: Newest First' },
    { value: 'oldest', label: 'Date: Oldest First' },
    { value: 'rating_desc', label: 'Rating: Highest First' },
    { value: 'rating_asc', label: 'Rating: Lowest First' },
    { value: 'ads_desc', label: 'Ads: Most First' },
    { value: 'ads_asc', label: 'Ads: Least First' }
  ];  return (
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
              <Box className="col-md-12" style={{ marginTop: "4px" }}>
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
                          rightSection={<MdArrowDropDown size={24} color="#E90808" />}

                          data={["All", "Car", "Bike", "Truck"]}
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
                          rightSection={<MdArrowDropDown size={24} color="#E90808" />}

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
                          onClick={handleSearch}
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
          <Box style={{ paddingLeft: '10px', paddingRight: '10px' }}>
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
                    Sorted by:
                  </Text>
                  <Select
                    size="sm"
                    placeholder="Sort By"
                    data={sortOptions}
                    value={sortOption}
                    onChange={setSortOption}
                    comboboxProps={{ shadow: "xl" }}
                    styles={(theme) => ({
                      input: {
                        '&:focus': {
                          borderColor: '#E90808',
                        },
                      },
                      item: {
                        '&[data-selected]': {
                          '&, &:hover': {
                            backgroundColor: '#E90808',
                            color: 'white',
                          },
                        },
                      },
                    })}
                  />
                </Flex>
              </Box>
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
                  {dealers && dealers.length > 0 ? (
                    dealers.map((dealer, index) => (
                      <Table.Tr
                        key={index}
                        className="border-bottom cursor"
                        onClick={() => profileHnadler(dealer._id)}
                      >
                        <Table.Td w="35%">
                          <Flex gap="xs">
                            <Image
                              src={`${dealer.profileImage || '/user-profile.png'}`}
                              h={50}
                              w={50}
                              radius="sm"
                              className="img-fluid"
                            />
                            <Stack gap={0} align="flex-start">
                              <Flex align="center">
                                <Text fw="bold" size="lg" mr="sm">
                                  {dealer.fullName || "Unnamed Dealer"}
                                </Text>
                                <Rating
                                  defaultValue={dealer.rating || 0}
                                  count={5}
                                  readOnly
                                  size="sm"
                                />
                                ({dealer.rating || 0}/5)
                              </Flex>
                              Reviews ({dealer.reviewCount || 0})
                            </Stack>
                          </Flex>
                        </Table.Td>
                        <Table.Td align="center" w="15%">
                          <Text size="md">
                            No of Ads <strong>({dealer.adsCount || 0})</strong>
                          </Text>
                        </Table.Td>
                        <Table.Td align="center" w="30%">
                          <Flex justify="center" align="center" gap={5}>
                            <PhoneIcon />
                            <Text size="lg" component="strong" fw="bold">
                              {dealer.phone ? (
                                showNumbers[index]
                                  ? dealer.phone
                                  : `(${dealer.phone.slice(0, 2)}****)`
                              ) : (
                                "Not Available"
                              )}
                            </Text>
                            {dealer.phone && (
                              <Anchor
                                style={{ alignSelf: "flex-start", marginBottom: "15px" }}
                                component="button"
                                onClick={(e) => handleShowNumber(index, e)}
                                underline="always"
                                c="dimmed"
                                size="sm"
                              >
                                {showNumbers[index] ? "Hide Number" : "Show Number"}
                              </Anchor>
                            )}
                          </Flex>
                        </Table.Td>
                        <Table.Td w="20%" align="center">
                          <Text fw={600}>
                            <FaLocationDot color="#E90808" className="me-2" />
                            {dealer.locationAddress || "Not Available"}
                          </Text>
                        </Table.Td>
                      </Table.Tr>
                    ))
                  ) : (
                    <Table.Tr>
                      <Table.Td colSpan={4}>
                        <Box py={50} ta="center">
                          <Text size="lg" fw={500} c="dimmed">
                            No dealers found
                          </Text>
                          <Text size="sm" c="dimmed" mt={10}>
                            Try changing your search criteria or location
                          </Text>
                        </Box>
                      </Table.Td>
                    </Table.Tr>
                  )}
                </Table.Tbody>
              </Table>
              {console.log("totalPages", totalPages)}
              {totalPages > 0 && (
                <Pagination
                  mt="sm"
                  total={totalPages}
                  onChange={setPage}
                  value={page}
                  classNames={{
                    root: 'custom-pagination',
                  }}
                  siblings={0}
                  boundaries={0}
                />
              )}
            </Box>
          </Box>

          <Box className="row">
            <Box className="col-md-12">
            </Box>
          </Box>
        </Box>

        {/* Give Rating Modal */}
      </Box>
    </>
  );
};


export default CarsDealerShip;
