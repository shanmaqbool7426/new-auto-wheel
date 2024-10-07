import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Center,
  CloseButton,
  Flex,
  Grid,
  Image,
  Input,
  List,
  Modal,
  Paper,
  ScrollArea,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { BsArrowRight, BsSearch } from "react-icons/bs";
import { Country, State, City } from "country-state-city";

const LocationSelector = ({
  isOpen,
  onClose: closeModal,
  selection,
  setSelection,
  redirect,
  hide = false,
}) => {
  const [countries, setCountries] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [activeTab, setActiveTab] = useState("country"); // State to track active tab

  useEffect(() => {
    const fetchedCountries = Country.getAllCountries();
    setCountries(fetchedCountries);
  }, []);

  useEffect(() => {
    if (selection.country) {
      const fetchedProvinces = State.getStatesOfCountry(selection.country);
      setProvinces(fetchedProvinces);
    } else {
      setProvinces([]);
    }
  }, [selection.country]);

  useEffect(() => {
    if (selection.province) {
      const fetchedCities = City.getCitiesOfState(selection.country, selection.province?.isoCode);
      setCities(fetchedCities);
    } else {
      setCities([]);
    }
  }, [selection.province]);

  const [countrySearch, setCountrySearch] = useState("");
  const [provinceSearch, setProvinceSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(countrySearch.toLowerCase()) && country.isoCode === "PK"
  );

  const filteredProvinces = provinces.filter((province) =>
    province.name.toLowerCase().includes(provinceSearch.toLowerCase())
  );

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(citySearch.toLowerCase())
  );

  const [opened, { open, close }] = useDisclosure(isOpen);
  const handleSelection = (type, value) => {
    setSelection((prev) => {
      const updatedSelection = { ...prev, [type]: value };

      if (type === "country") {
        setActiveTab("province"); // Set active tab to province
        return {
          ...updatedSelection,
          province: "", // Reset province and city
          city: "",
        };
      }

      if (type === "province") {
        setActiveTab("city"); // Set active tab to city
        return {
          ...updatedSelection,
          city: "", // Reset city
        };
      }

      if (type === "city") {
        // closeModal();
        return {
          ...updatedSelection,
        };
      }
      return updatedSelection;
    });
  };

  useEffect(() => {
    if (isOpen) open();
    else close();
  }, [isOpen, open, close]);

 const done=()=>{
  if (redirect) {
    redirect();
  }
  closeModal();
 }
  return (
    <Modal
      opened={isOpen}
      onClose={closeModal}
      withCloseButton={false}
      size="60%"
      padding={0}
      closeOnClickOutside={false} // Prevent modal from closing on outside click
    >
      <Paper
        className="search-modal-header"
        p="xs"
        shadow="0px 2px 5px 0px #00000014"
      >
        <Center>
          <Button
            className={`tab-button ${activeTab === "country" ? "active" : ""}`}
            variant="subtle"
            bg={activeTab === "country" ? "#E90808" : "#F3F3F3"}
            color={activeTab === "country" ? "white" : "#878787"}
            size="xs"
            mr="md"
            onClick={() => {
              setActiveTab("country");
              if (selection.country) {
                setSelection((prev) => ({ ...prev, country: "PK" }));
              }
            }}
          >
            Country
          </Button>
          <Button
            className={`tab-button ${activeTab === "province" ? "active" : ""}`}
            variant="subtle"
            bg={activeTab === "province" ? "#E90808" : "#F3F3F3"}
            color={activeTab === "province" ? "white" : "#878787"}
            size="xs"
            mr="md"
            autoContrast
            onClick={() => {
              setActiveTab("province");
              if (selection.province) {
                setSelection((prev) => ({ ...prev, province: "" }));
              }
            }}
          >
            Province
          </Button>
          {!hide && ( // Conditionally render Cities tab button
            <Button
              className={`tab-button ${activeTab === "city" ? "active" : ""}`}
              variant="subtle"
              bg={activeTab === "city" ? "#E90808" : "#F3F3F3"}
              color={activeTab === "city" ? "white" : "#878787"}
              size="xs"
              mr="md"
              autoContrast
              onClick={() => {
                setActiveTab("city");
                if (selection.city) {
                  setSelection((prev) => ({ ...prev, city: "" }));
                }
              }}
            >
              City
            </Button>
          )}
          <CloseButton pos="absolute" right={20} onClick={closeModal}/>
        </Center>
      </Paper>
      <Grid gutter={0}>
        <Grid.Col span={hide ? 6 : 4} p="md" pt="xl" className="border-end">
          {/* Country Section */}
          <Input
            placeholder="Search by Country"
            leftSection={<BsSearch />}
            value={countrySearch}
            onChange={(e) => setCountrySearch(e.target.value)}
          />
          <Title order={5} my="sm" fw={600}>
            Country
          </Title>
          <ScrollArea
            h={250}
            offsetScrollbars
            scrollbarSize={5}
            scrollHideDelay={500}
            scrollbars="y"
          >
            <List className="search-dropdown-lists" listStyleType="none">
              {filteredCountries.map((country) => (
                <List.Item
                  key={country.isoCode}
                  className={`search-dropdown-lists__item ${
                    selection.country === country.isoCode ? "selected" : ""
                  }`}
                  icon={
                    <Image
                      src={`/megamenu/search-menu/${country.isoCode.toLowerCase()}-sm.svg`}
                    />
                  }
                  onClick={() => {
                    handleSelection("country", country.isoCode);
                    setActiveTab("province"); // Set active tab to province
                  }}
                >
                  {country.name} <BsArrowRight />
                </List.Item>
              ))}
            </List>
          </ScrollArea>
        </Grid.Col>
        <Grid.Col span={hide ? 6 : 4} p="md" pt="xl" className="border-end">
          {/* Province Section */}
          <Input
            placeholder="Search by Province"
            leftSection={<BsSearch />}
            value={provinceSearch}
            onChange={(e) => setProvinceSearch(e.target.value)}
          />
          <Title order={5} my="sm" fw={600}>
            All Provinces
          </Title>
          <ScrollArea
            h={250}
            offsetScrollbars
            scrollbarSize={5}
            scrollHideDelay={500}
            scrollbars="y"
          >
            <List className="search-dropdown-lists" listStyleType="none">
              {selection.country &&
                filteredProvinces.map((province) => (
                  <List.Item
                    key={province.isoCode}
                    className={`search-dropdown-lists__item ${
                      selection.province.isoCode === province.isoCode ? "selected" : ""
                    }`}
                    onClick={() => {
                      handleSelection("province", province);
                      setActiveTab("city"); // Set active tab to city
                    }}
                  >
                    {province.name} <BsArrowRight />
                  </List.Item>
                ))}
            </List>
          </ScrollArea>
        </Grid.Col>
        {!hide && ( // Conditionally render Cities column
          <Grid.Col span={4} p="md" pt="xl" className="border-end">
            <Input
              placeholder="Search by City"
              leftSection={<BsSearch />}
              value={citySearch}
              onChange={(e) => setCitySearch(e.target.value)}
            />
            <Title order={5} my="sm" fw={600}>
              Cities
            </Title>
            <ScrollArea
              h={250}
              offsetScrollbars
              scrollbarSize={5}
              scrollHideDelay={500}
              scrollbars="y"
            >
              <List className="search-dropdown-lists" listStyleType="none">
                {selection.province &&
                  filteredCities.map((city) => (
                    <List.Item
                      key={city.name}
                      className={`search-dropdown-lists__item ${
                        selection.city === city.name ? "selected" : ""
                      }`}
                      onClick={() => {
                        handleSelection("city", city.name);
                        setActiveTab("city"); // Set active tab to city
                      }}
                    >
                      {city.name} <BsArrowRight />
                    </List.Item>
                  ))}
              </List>
            </ScrollArea>
          </Grid.Col>
        )}
      </Grid>
      <Paper
        withBorder
        className="search-modal-footer"
        p="xs"
        px="md"
        radius={0}
        shadow="none"
        ta="right"
      >
        <Button
          color="#E90808"
          rightSection={<BsArrowRight />}
          onClick={done}
          ff="heading"
        >
          Done
        </Button>
      </Paper>
    </Modal>
  );
};

export default LocationSelector;