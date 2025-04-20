import React, { useEffect, useState } from "react";
import { CarFrontView, MotorBike, Truck } from "@/components/Icons";
import {
  Anchor,
  Box,
  Button,
  Center,
  Grid,
  Group,
  Image,
  Input,
  List,
  Modal,
  Paper,
  ScrollArea,
  Tabs,
  Title,
  Autocomplete,
  Card,
} from "@mantine/core";
import { BsArrowRight, BsSearch } from "react-icons/bs";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { City } from "country-state-city";

import CustomModel from "@/constants/CustomModel";
import LocationSelector from "@/components/LocationSelector.jsx"; // Import LocationSelector
import { fetchMakesByTypeServer } from "@/actions";
import { useRouter } from "next/navigation";
import styles from "./HeroTabs.module.css";
import { typeMapping } from "@/constants/vehicle-constants";

const HeroTabs = ({ setType }) => {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [query, setQuery] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state for button

  const [cityOptions, setCityOptions] = useState([]);

  const [makesByType, setMakesByType] = useState("cars");
  const [fetchMakesByTypeData, setFetchMakesByTypeData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false); // State for LocationSelector modal
  const [selection, setSelection] = useState({
    make: "",
    model: "",
    variant: "",
  });
  const [locationSelection, setLocationSelection] = useState({
    country: "PK",
    province: null,
    city: null,
    suburb: null
  });
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openLocationModal = () => setIsLocationModalOpen(true);
  const closeLocationModal = () => setIsLocationModalOpen(false);
  const clearSelection = () => {
    setSelection({
      make: "",
      model: "",
      variant: "",
    });
  };
  const clearLocationSelection = () => {
    setLocationSelection({
      country: "PK",
      province: null,
      city: null,
      suburb: null
    });
  };

  const normalizeVehicleType = (type) => {
    if (!type) return 'car';
    
    // Convert to lowercase for consistent comparison
    const normalizedType = type.toLowerCase();
    
    // Handle plural forms
    switch (normalizedType) {
      case 'cars':
        return 'car';
      case 'bikes':
        return 'bike';
      case 'trucks':
        return 'truck';
      default:
        return normalizedType;
    }
  };

  const fetchMakesByType = async (vehicleType) => {
    try {
      const normalizedType = normalizeVehicleType(vehicleType);
      const fetchMakes = await fetchMakesByTypeServer(normalizedType);
      
      console.log("fetchMakes", fetchMakes);
      setFetchMakesByTypeData(fetchMakes);
    } catch (error) {
      console.log("error", error);
    }
  };

  // useEffect hook to fetch data when makesByType changes
  useEffect(() => {
    fetchMakesByType(makesByType);
  }, [makesByType]);

  const handleInputChange = (input) => {
    setQuery(input);

    if (input.length > 0) {
      // Fetch cities from the country-state-city library (for Australia 'PK')
      const cities = City.getCitiesOfCountry("PK");

      // Filter cities based on user input
      const filtered = cities
        .filter((city) =>
          city.name.toLowerCase().startsWith(input.toLowerCase())
        )
        .map((city) => city.name);

      // Set the filtered city names as the Autocomplete options
      setCityOptions(filtered);
    } else {
      setCityOptions([]); // Clear the options if input is empty
    }
  };

  const handleSuggestionClick = (city) => {
    setQuery(city.name);
    setSelectedCity(city);
    setFilteredCities([]);
  };

  const getLocationDisplayText = () => {
    if (!locationSelection.province) return "";
    
    const parts = [];
    if (locationSelection.province?.name) parts.push(locationSelection.province.name);
    if (locationSelection.city?.name) parts.push(locationSelection.city.name);
    if (locationSelection.suburb?.name) parts.push(locationSelection.suburb.name);
    
    return parts.join(", ");
  };

  const handleSubmit = async () => {
    const { make, model, variant } = selection;
    const { province, city, suburb } = locationSelection;
    setLoading(true);

    try {
      const queryParts = [];

      // Helper function to format string for URL
      const formatForUrl = (str) => {
        return str.toLowerCase().replace(/\s+/g, '-');
      };

      // Add make and model to query if they exist
      if (make) queryParts.push(`mk_${formatForUrl(make)}`);
      if (model) queryParts.push(`md_${formatForUrl(model)}`);
      //  ad varient
      if (variant) queryParts.push(`vr_${formatForUrl(variant)}`);
      
      // Add location parameters if they exist
      if (province?.name) queryParts.push(`pv_${formatForUrl(province.name)}`);
      if (city?.name) queryParts.push(`ct_${formatForUrl(city.name)}`);
      if (suburb?.name) queryParts.push(`sb_${formatForUrl(suburb.name)}`);

      // Construct the search URL
      const queryString = queryParts.length > 0 ? `${queryParts.join("/")}` : "";
      const searchUrl = `/used-${makesByType}/search/-/${queryString}`;
      console.log("searchUrl...........", searchUrl);
      await router.push(searchUrl);
    } catch (error) {
      console.error('Navigation error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderTabPanel = (vehicleType) => (
    <Tabs.Panel value={vehicleType}>
      <Input
        placeholder={`${vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1)} Make or Model`}
        mt="32px"
        value={
          selection?.make || selection?.model || selection?.variant
            ? `${selection?.make || ""} ${selection?.model || ""} ${
                selection?.variant || ""
              }`.trim()
            : ""
        }
        onClick={() => setIsModalOpen(true)}
        classNames={{ wrapper: styles.wrapper, input: styles.input }}
      />
      
      <Input
        placeholder="Enter Your Location"
        mt="20px"
        value={getLocationDisplayText()}
        onClick={() => setIsLocationModalOpen(true)}
        classNames={{ wrapper: styles.wrapper, input: styles.input }}
      />
      
      <Button
        mt="24px"
        fullWidth
        size="md"
        ff="heading"
        tt="uppercase"
        color="#E90808"
        loading={loading}
        onClick={handleSubmit}
        classNames={{ root: styles.buttonRoot, label: styles.buttonLabel }}
      >
        Search
      </Button>
      
      <Group justify="end" mt="20px">
        <Button
          component={Link}
          href={`/used-${makesByType}/search/-`}
          fw={700}
          rightSection={<BsArrowRight fw={700}/>}
          variant="transparent"
          px={0}
          
          tt="uppercase"
          color="#E90808"
          ff="heading"
          classNames={{ root: styles.advroot, label: styles.advanceSearch }}
        >
          Advance Search
        </Button>
      </Group>
    </Tabs.Panel>
  );

  return (
    <>
      <Tabs
        bg="white"
        color="pink"
        radius="xs"
        defaultValue="cars"
        autoContrast
        classNames={{ list: styles.list, tab: styles.tab, tabLabel: styles.tabLabel }}
      >
        <Tabs.List justify="space-between">
          {[
            { value: "cars", icon: <CarFrontView />, label: "Car" },
            { value: "bikes", icon: <MotorBike />, label: "Bike" },
            { value: "trucks", icon: <Truck />, label: "Truck" }
          ].map(({ value, icon, label }) => (
            <Tabs.Tab
              key={value}
              value={value}
              leftSection={icon}
              c={makesByType === value ? "#E90808" : "#6c757d"}
              onClick={() => {
                setMakesByType(value);
                setType(value.slice(0, -1)); // Remove 's' from plural
                clearSelection();
                clearLocationSelection();
                setIsModalOpen(false);
              }}
            >
              {label}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {["cars", "bikes", "trucks"].map((type) => renderTabPanel(type))}
      </Tabs>

      <CustomModel
        isOpen={isModalOpen}
        selection={selection}
        setSelection={setSelection}
        onClose={() => setIsModalOpen(false)}
        fetchMakesByTypeData={fetchMakesByTypeData}
        hide={false}
      />

      <LocationSelector
        isOpen={isLocationModalOpen}
        selection={locationSelection}
        setSelection={setLocationSelection}
        onClose={() => setIsLocationModalOpen(false)}
        hide={false}
      />
    </>
  );
};

export default HeroTabs;