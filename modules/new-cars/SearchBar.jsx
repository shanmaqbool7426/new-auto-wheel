"use client";
import React, { useState, useRef } from "react";
import {
  Anchor,
  Box,
  Group,
  Badge,
  Button,
  Card,
  Title,
  Input,
  Select,
  Text,
  Image,
  Flex,
  Rating,
  rem,
  Grid,
  Tabs,
} from "@mantine/core";
import {
  CarComparisonSmall,
  CarSmall,
  GearsHandle,
  SmallReviewIcon,
} from "@/components/Icons";
import { IconSearch } from "@tabler/icons-react";
import CustomModel from "@/constants/CustomModel";
import { useRouter } from "next/navigation";

const SearchBar = ({ fetchMakesByTypeData }) => {
  const router = useRouter(); // Use the useRouter hook to handle URL updates
  const [filters, setFilters] = useState({
    query: "",
    city: [],
    search: "",
    make: [],
    model: [],
    price: [0, 2000000000],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selection, setSelection] = useState({
    make: "",
    model: "",
    variant: "",
  });

  const debounceTimeoutRef = useRef(null);

  const rangeData = [
    { value: "0-5", label: "0-5 lac" },
    { value: "5-10", label: "5-10 lac" },
    { value: "10-15", label: "10-15 lac" },
    { value: "15-20", label: "15-20 lac" },
    { value: "20-25", label: "20-25 lac" },
    { value: "25+", label: "25 lac and above" },
  ];

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [filterName]: value };
      return newFilters;
    });
  };

  const updateFiltersInUrl = (newFilters) => {
    const query = {
      make: newFilters.make.join(","),
      model: newFilters.model.join(","),
      price: `${newFilters.price[0]}_${newFilters.price[1]}`,
    };

    const queryString = Object.keys(query)
      .map((key) => (query[key] ? `${key}_${query[key]}` : ""))
      .filter(Boolean)
      .join("/");

    router.push(`/new/cars/search/-/${queryString}`);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSearch = () => {
    updateFiltersInUrl(filters);
  };

  return (
    <>
      <Box className="search-wrapper-card" mt="xl">
        <Card shadow="0px 4px 20px 0px #00000014" padding="lg" radius="md">
          <Title order={3} mb="md">Find New Cars in Pakistan</Title>
          <div className="row mb-2">
            <div className="col-md-3">
              <Input
                onClick={openModal}
                size="md"
                radius="md"
                value={`${selection.make} ${selection.model}`}
                placeholder="Search by Car Make or Model"
                leftSection={<IconSearch size={16} />}
              />
            </div>
            <div className="col-md-3">
              <Select
                size="md"
                radius="md"
                leftSection={<GearsHandle />}
                placeholder="Choose Make"
                data={["React", "Angular", "Vue", "Svelte"]}
                onChange={(value) => handleFilterChange("make", value)}
              />
            </div>
            <div className="col-md-3">
              <Select
                size="md"
                radius="md"
                placeholder="Choose Price Range"
                data={rangeData}
                onChange={(value) =>
                  handleFilterChange("price", value.split("-").map(Number))
                }
              />
            </div>
            <div className="col-md-3">
              <Button
                fullWidth
                size="md"
                radius="md"
                bg="#E90808"
                leftSection={<IconSearch size={16} />}
                onClick={handleSearch} // Call handleSearch on button click
              >
                Search
              </Button>
            </div>
          </div>
        </Card>
      </Box>

      <CustomModel
        isOpen={isModalOpen}
        selection={selection}
        setSelection={setSelection}
        onClose={closeModal}
        fetchMakesByTypeData={fetchMakesByTypeData}
        hide={true}
      />
    </>
  );
};

export default SearchBar;
