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

const HeroTabs = ({ setType }) => {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [query, setQuery] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state for button

  const [cityOptions, setCityOptions] = useState([]);

  const [makesByType, setMakesByType] = useState("car");
  const [fetchMakesByTypeData, setFetchMakesByTypeData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false); // State for LocationSelector modal
  const [selection, setSelection] = useState({
    make: "",
    model: "",
    variant: "",
  });
  const [locationSelection, setLocationSelection] = useState({ country: "PK", province: "", city: "",suburb:"" });
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
  }
  const clearLocatiopnSelection = () => {
    setLocationSelection({ country: "PK", province: "", city: "",suburb:"" });
  }
  const fetchMakesByType = async (vehicleType) => {
    try {
      const fetchMakes = await fetchMakesByTypeServer(vehicleType);
      setFetchMakesByTypeData(fetchMakes);
    } catch (error) { }
  };

  // useEffect hook to fetch data when makesByType changes
  useEffect(() => {
    fetchMakesByType(makesByType);
  }, [makesByType]);

  const handleInputChange = (input) => {
    setQuery(input);

    if (input.length > 0) {
      // Fetch cities from the country-state-city library (for Pakistan 'PK')
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

  const handleSubmit = () => {
    const { make, model, variant } = selection;
    const { city, province,suburb } = locationSelection;
    setLoading(true); // Start loading state when button is clicked

    // const cityQuery = query ? `/ct_${query.toLowerCase()}` : "";
    // const cityQuery = city ? `/ct_${city.toLowerCase()}` : "";
    const cityQuery = city ? `/ct_${encodeURIComponent(city.toLowerCase())}` : "";
    const suburbQuery = suburb ? `/ca_${encodeURIComponent(suburb.toLowerCase())}` : "";
    // const locationQuery = province ? `/ad_pakistan${province ? ` ${province?.name?.toLowerCase()}` : ''}${city ? ` ${city.toLowerCase()}` : ''}` : "";
    const makeQuery = make ? `/mk_${make.toLowerCase()}` : "";
    const modelQuery = model ? `/md_${model.toLowerCase()}` : "";
    // const variantQuery = variant ? `/vr_${variant.toLowerCase()}` : '';
    const searchUrl = `/listing/cars/search/-${makeQuery}${modelQuery}${cityQuery}${suburbQuery}`;
    router.push(searchUrl)?.finally(() => {
      setLoading(false); // Reset loading state after redirect
    });
  };

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
          <Tabs.Tab
            value="cars"
            leftSection={<CarFrontView />}
            c={makesByType === "car" ? "#E90808" : "#6c757d"}
            onClick={() => {
              setMakesByType("car");
              setType("car");
              clearSelection();
              clearLocatiopnSelection();
              closeModal();
            }}
          >
            Car
          </Tabs.Tab>
          <Tabs.Tab
            value="bikes"
            leftSection={<MotorBike />}
            c={makesByType === "bike" ? "#E90808" : "#6c757d"}
            onClick={() => {
              setMakesByType("bike");
              setType("bike");
              clearSelection();
              clearLocatiopnSelection();
              closeModal();
            }}
          >
            Bike
          </Tabs.Tab>
          <Tabs.Tab
            value="trucks"
            leftSection={<Truck />}
            c={makesByType === "truck" ? "#E90808" : "#6c757d"}
            onClick={() => {
              setMakesByType("truck");
              setType("truck");
              clearSelection();
              clearLocatiopnSelection();
              closeModal();
            }}
          >
            Truck
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="cars">
          <Input
            placeholder="Car Make or Model"
            mt="32px"
            value={
              selection?.make || selection?.model || selection?.variant
                ? `${selection?.make || ""} ${selection?.model || ""} ${selection?.variant || ""
                  }`.trim()
                : ""
            }
            onClick={openModal}
            classNames={{ wrapper: styles.wrapper, input: styles.input }}
          />
          <Input
            placeholder="Enter Your Location"
            mt="20px"
            value={
              locationSelection?.province
                ? `${locationSelection?.province?.name || ""} ${locationSelection?.city || ""
                  } ${locationSelection?.suburb || ""
                  }`.trim()
                : ""
            }
            onClick={openLocationModal} // Open LocationSelector modal on click
            classNames={{ wrapper: styles.wrapper, input: styles.input }}
          />
          <Button
            mt="24px"
            fullWidth
            size="md"
            ff="heading"
            tt="uppercase"
            color="#E90808"
            loading={loading} // Show loading spinner while processing
            onClick={handleSubmit}
            classNames={{ root: styles.buttonRoot, label: styles.buttonLabel }}
          >
            Search
          </Button>
          <Group justify="end" mt="20px">
            <Button
              component={Link}
              href={`/listing/${makesByType}s`}
              rightSection={<BsArrowRight />}
              variant="transparent"
              px={0}
              fw={500}
              tt="uppercase"
              color="#E90808"
              ff="heading"
              classNames={{ root: styles.advroot, label: styles.advanceSearch }}
            >
              Advance Search
            </Button>
          </Group>
        </Tabs.Panel>

        <Tabs.Panel value="bikes">
          <Input
            placeholder="Bike Make or Model"
            mt="32px"
            value={
              selection?.make || selection?.model || selection?.variant
                ? `${selection?.make || ""} ${selection?.model || ""} ${selection?.variant || ""
                  }`.trim()
                : ""
            }
            onClick={openModal}
            classNames={{ wrapper: styles.wrapper, input: styles.input }}
          />
          <Input
            placeholder="Enter Your Location"
            mt="20px"
            value={
              locationSelection?.province
                ? `${locationSelection?.province?.name || ""} ${locationSelection?.city || ""
                  }`.trim()
                : ""
            }
            onClick={openLocationModal} // Open LocationSelector modal on click
            classNames={{ wrapper: styles.wrapper, input: styles.input }}
          />
          <Button
            mt="24px"
            fullWidth
            size="md"
            ff="heading"
            tt="uppercase"
            color="#E90808"
            loading={loading} // Show loading spinner while processing
            onClick={handleSubmit}
            classNames={{ root: styles.buttonRoot, label: styles.buttonLabel }}
          >
            Search
          </Button>
          <Group justify="end" mt="20px">
            <Button
              component={Link}
              href={`/listing/${makesByType}s`}
              rightSection={<BsArrowRight />}
              variant="transparent"
              px={0}
              fw={500}
              tt="uppercase"
              color="#E90808"
              ff="heading"
              classNames={{ root: styles.advroot, label: styles.advanceSearch }}
            >
              Advance Search
            </Button>
          </Group>
        </Tabs.Panel>

        <Tabs.Panel value="trucks">
          <Input
            placeholder="Truck Make or Model"
            mt="32px"
            value={
              selection?.make || selection?.model || selection?.variant
                ? `${selection?.make || ""} ${selection?.model || ""} ${selection?.variant || ""
                  }`.trim()
                : ""
            }
            onClick={openModal}
            classNames={{ wrapper: styles.wrapper, input: styles.input }}
          />
          <Input
            placeholder="Enter Your Location"
            mt="20px"
            value={
              locationSelection?.province
                ? `${locationSelection?.province?.name || ""} ${locationSelection?.city || ""
                  }`.trim()
                : ""
            }
            onClick={openLocationModal} // Open LocationSelector modal on click
            classNames={{ wrapper: styles.wrapper, input: styles.input }}
          />
          <Button
            mt="24px"
            fullWidth
            size="md"
            ff="heading"
            tt="uppercase"
            color="#E90808"
            loading={loading} // Show loading spinner while processing
            onClick={handleSubmit}
            classNames={{ root: styles.buttonRoot, label: styles.buttonLabel }}
          >
            Search
          </Button>
          <Group justify="end" mt="20px">
            <Button
              component={Link}
              href={`/listing/${makesByType}s`}
              rightSection={<BsArrowRight />}
              variant="transparent"
              px={0}
              fw={500}
              tt="uppercase"
              color="#E90808"
              ff="heading"
              classNames={{ root: styles.advroot, label: styles.advanceSearch }}
            >
              Advance Search
            </Button>
          </Group>
        </Tabs.Panel>
      </Tabs>

      <CustomModel
        isOpen={isModalOpen}
        selection={selection}
        setSelection={setSelection}
        onClose={closeModal}
        fetchMakesByTypeData={fetchMakesByTypeData}
        hide={false}
      />

      <LocationSelector
        isOpen={isLocationModalOpen}
        selection={locationSelection}
        setSelection={setLocationSelection}
        onClose={closeLocationModal}
        hide={false}
      />
    </>
  );
};

export default HeroTabs;