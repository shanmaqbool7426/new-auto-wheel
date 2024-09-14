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
  Autocomplete
} from "@mantine/core";
import { BsArrowRight, BsSearch } from "react-icons/bs";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { City } from 'country-state-city';

import CustomModel from "../constants/CustomModel"
import { fetchMakesByTypeServer } from "@/actions";
import { useRouter } from "next/navigation";

const HeroTabs = () => {
  const router = useRouter();

  const [opened, { open, close }] = useDisclosure(false);
  const [query, setQuery] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [loading, setLoading] = useState(false);  // Loading state for button

  const [cityOptions, setCityOptions] = useState([]);

  const [makesByType, setMakesByType] = useState('car');
  const [fetchMakesByTypeData, setFetchMakesByTypeData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selection, setSelection] = useState({
    make: '',
    model: '',
    variant: '',
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const fetchMakesByType = async (vehicleType) => {
    try {
      const fetchMakes = await fetchMakesByTypeServer(vehicleType);
      setFetchMakesByTypeData(fetchMakes);
    } catch (error) {
    }
  };


  // useEffect hook to fetch data when makesByType changes
  useEffect(() => {
    fetchMakesByType(makesByType);
  }, [makesByType]);

  const handleInputChange = (input) => {
    setQuery(input);

    if (input.length > 0) {
      // Fetch cities from the country-state-city library (for Pakistan 'PK')
      const cities = City.getCitiesOfCountry('PK');

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
    setLoading(true);  // Start loading state when button is clicked

    const cityQuery = query ? `/ct_${query.toLowerCase()}` : '';
    const makeQuery = make ? `/mk_${make.toLowerCase()}` : '';
    const modelQuery = model ? `/md_${model.toLowerCase()}` : '';
    // const variantQuery = variant ? `/vr_${variant.toLowerCase()}` : '';
    const searchUrl = `/listing/cars/search/-${makeQuery}${modelQuery}${cityQuery}`;
    router.push(searchUrl)?.finally(() => {
      setLoading(false);  // Reset loading state after redirect
    });
  };

  return (
    <>
      <Tabs color="pink" radius="xs" defaultValue="cars" autoContrast>
        <Tabs.List grow justify="center">
          <Tabs.Tab value="cars" leftSection={<CarFrontView />} c="#6c757d"  onClick={()=>{
            setMakesByType("car")
            closeModal()
          }}>
            Car
          </Tabs.Tab>
          <Tabs.Tab
            value="bikes"
            leftSection={<MotorBike />}
            c="#6c757d"
            onClick={()=>{
              setMakesByType("bike")
              closeModal()
            }}
          >
            Bike
          </Tabs.Tab>
          <Tabs.Tab value="trucks" leftSection={<Truck />} c="#6c757d" onClick={()=>{
            setMakesByType("truck")
            closeModal()
          }}>
            Truck
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="cars" p="xs">
          <Input placeholder={`${makesByType} Make or Model`} size="md" mt="lg" value={`${selection?.make && selection?.make } ${selection?.model && selection?.model } ${selection?.variant && selection?.variant }`} onClick={openModal} />
          <Autocomplete
            label="Select your city"
            placeholder="Enter Your Location"
            data={cityOptions}  // Dynamically populated city options
            value={query}
            onChange={handleInputChange}  // Call handler on input change
            withScrollArea={false}
            styles={{ dropdown: { maxHeight: 200, overflowY: 'auto' } }}  // Add scroll to dropdown
            mt="md"
          />
         <Button
        mt="lg"
        fullWidth
        size="md"
        ff="heading"
        tt="uppercase"
        color="#E90808"
        loading={loading}  // Show loading spinner while processing
        onClick={handleSubmit}
      >
            Search
          </Button>
          <Group justify="end" mt="sm">
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
            >
              Advance Search
            </Button>
          </Group>
        </Tabs.Panel>
        <Tabs.Panel value="bikes" p="xs">
          <Input placeholder={`${makesByType} Make or Model`} size="md" mt="lg" value={`${selection?.make && selection?.make } ${selection?.model && selection?.model } ${selection?.variant && selection?.variant }`} onClick={openModal} />
          <Autocomplete
            label="Select your city"
            placeholder="Enter Your Location"
            data={cityOptions}  // Dynamically populated city options
            value={query}
            onChange={handleInputChange}  // Call handler on input change
            withScrollArea={false}
            styles={{ dropdown: { maxHeight: 200, overflowY: 'auto' } }}  // Add scroll to dropdown
            mt="md"
          />
         <Button
        mt="lg"
        fullWidth
        size="md"
        ff="heading"
        tt="uppercase"
        color="#E90808"
        loading={loading}  // Show loading spinner while processing
        onClick={handleSubmit}
      >
            Search
          </Button>
          <Group justify="end" mt="sm">
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
            >
              Advance Search
            </Button>
          </Group>
        </Tabs.Panel>
        <Tabs.Panel value="trucks" p="xs">
          <Input placeholder={`${makesByType} Make or Model`} size="md" mt="lg" value={`${selection?.make && selection?.make } ${selection?.model && selection?.model } ${selection?.variant && selection?.variant }`} onClick={openModal} />
          <Autocomplete
            label="Select your city"
            placeholder="Enter Your Location"
            data={cityOptions}  // Dynamically populated city options
            value={query}
            onChange={handleInputChange}  // Call handler on input change
            withScrollArea={false}
            styles={{ dropdown: { maxHeight: 200, overflowY: 'auto' } }}  // Add scroll to dropdown
            mt="md"
          />
         <Button
        mt="lg"
        fullWidth
        size="md"
        ff="heading"
        tt="uppercase"
        color="#E90808"
        loading={loading}  // Show loading spinner while processing
        onClick={handleSubmit}
      >
            Search
          </Button>
          <Group justify="end" mt="sm">
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
            >
              Advance Search
            </Button>
          </Group>
        </Tabs.Panel>
      </Tabs>
      {/* <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        size="50%"
        padding={0}
      >
        <Paper
          clasName="saerch-modal-header"
          p="xs"
          shadow="0px 2px 5px 0px #00000014"
        >
          <Center>
            <Button color="#E90808" size="xs" mr="md">
              Make
            </Button>
            <Button
              variant="subtle"
              bg="#F3F3F3"
              color="#878787"
              size="xs"
              mr="md"
              autoContrast
            >
              Model
            </Button>
            <Button
              variant="subtle"
              bg="#F3F3F3"
              color="#878787"
              size="xs"
              mr="md"
              autoContrast
            >
              Variants
            </Button>
          </Center>
        </Paper>
        <Grid gutter={0}>
          <Grid.Col span={4} p="md" pt="xl" className="border-end">
            <Input
              placeholder="Search by Car Make"
              leftSection={<BsSearch />}
            />
            <Title order={5} my="sm" fw={600}>
              Popular
            </Title>
            <ScrollArea
              h={250}
              offsetScrollbars
              scrollbarSize={5}
              scrollHideDelay={500}
              scrollbars="y"
            >
              <List className="search-dropdown-lists" listStyleType="none">
                <List.Item
                  className="search-dropdown-lists__item"
                  icon={<Image src="/megamenu/search-menu/honda-sm.svg" />}
                >
                  Honda <BsArrowRight />
                </List.Item>
                <List.Item
                  className="search-dropdown-lists__item"
                  icon={<Image src="/megamenu/search-menu/kia-sm.svg" />}
                >
                  Kia <BsArrowRight />
                </List.Item>
                <List.Item
                  className="search-dropdown-lists__item"
                  icon={<Image src="/megamenu/search-menu/bmw-sm.svg" />}
                >
                  BMW <BsArrowRight />
                </List.Item>
                <List.Item
                  className="search-dropdown-lists__item"
                  icon={<Image src="/megamenu/search-menu/hyundai-sm.svg" />}
                >
                  Hyundai <BsArrowRight />
                </List.Item>
                <List.Item
                  className="search-dropdown-lists__item"
                  icon={<Image src="/megamenu/search-menu/acura-sm.svg" />}
                >
                  Acura <BsArrowRight />
                </List.Item>
                <List.Item
                  className="search-dropdown-lists__item"
                  icon={<Image src="/megamenu/search-menu/nissan-sm.svg" />}
                >
                  Toyota <BsArrowRight />
                </List.Item>
              </List>
            </ScrollArea>
          </Grid.Col>
          <Grid.Col span={4} p="md" pt="xl" className="border-end">
            <Input
              placeholder="Search by Car Model"
              leftSection={<BsSearch />}
            />
            <Title order={5} my="sm" fw={600}>
              All Models
            </Title>
            <ScrollArea
              h={250}
              offsetScrollbars
              scrollbarSize={5}
              scrollHideDelay={500}
              scrollbars="y"
            >
              <List className="search-dropdown-lists" listStyleType="none">
                <List.Item className="search-dropdown-lists__item">
                  Honda Civic <BsArrowRight />
                </List.Item>
                <List.Item className="search-dropdown-lists__item">
                  Honda City <BsArrowRight />
                </List.Item>
                <List.Item className="search-dropdown-lists__item">
                  Honda BR-V <BsArrowRight />
                </List.Item>
                <List.Item className="search-dropdown-lists__item">
                  Honda HR-V <BsArrowRight />
                </List.Item>
                <List.Item className="search-dropdown-lists__item">
                  Honda Accord <BsArrowRight />
                </List.Item>
                <List.Item className="search-dropdown-lists__item">
                  Honda Accord <BsArrowRight />
                </List.Item>
              </List>
            </ScrollArea>
          </Grid.Col>
          <Grid.Col span={4} p="md" pt="xl" className="border-end">
            <Input
              placeholder="Search by Car Variant"
              leftSection={<BsSearch />}
            />
            <Title order={5} my="sm" fw={600}>
              2022-2023
            </Title>
            <ScrollArea
              offsetScrollbars
              scrollbarSize={5}
              scrollHideDelay={500}
              scrollbars="y"
            >
              <List className="search-dropdown-lists" listStyleType="none">
                <List.Item className="search-dropdown-lists__item">
                  Standard <BsArrowRight />
                </List.Item>
                <List.Item className="search-dropdown-lists__item">
                  RS <BsArrowRight />
                </List.Item>
                <List.Item className="search-dropdown-lists__item">
                  Oriel <BsArrowRight />
                </List.Item>
              </List>
            </ScrollArea>
          </Grid.Col>
        </Grid>
      </Modal> */}

      <CustomModel
        isOpen={isModalOpen}
        selection={selection}
        setSelection={setSelection}
        onClose={closeModal}
        fetchMakesByTypeData={fetchMakesByTypeData}
        hide={false}
      />
    </>
  );
};

export default HeroTabs;
