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
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { BsArrowRight, BsSearch } from "react-icons/bs";
import { Country, State, City } from "country-state-city";
import {getSuburbs} from "@/constants/suburbs";
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
  const [suburbs, setSuburbs] = useState([]);
  const [activeTab, setActiveTab] = useState("province"); // State to track active tab

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
      setSuburbs([]);
    }
  }, [selection.province]);

  useEffect(() => {
    if (selection.city) {
      const fetchedSuburbs = getSuburbs(selection.city);
      setSuburbs(fetchedSuburbs);
    } else {
      setSuburbs([]);
    }
  }, [selection.city]);

  const [countrySearch, setCountrySearch] = useState("");
  const [provinceSearch, setProvinceSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [suburbSearch, setSuburbSearch] = useState("");

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(countrySearch.toLowerCase()) && country.isoCode === "PK"
  );

  const filteredProvinces = provinces.filter((province) =>
    province.name.toLowerCase().includes(provinceSearch.toLowerCase())
  );

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(citySearch.toLowerCase())
  );

  const filteredSuburbs = suburbs.filter((suburb) =>
    suburb.toLowerCase().includes(suburbSearch.toLowerCase())
  );

  const [opened, { open, close }] = useDisclosure(isOpen);
  const handleSelection = (type, value) => {
    setSelection((prev) => {
      const updatedSelection = { ...prev, [type]: value };

      if (type === "country") {
        setActiveTab("province");
        return {
          ...updatedSelection,
          province: null,
          city: null,
          suburb: null
        };
      }

      if (type === "province") {
        setActiveTab("city");
        return {
          ...updatedSelection,
          city: null,
          suburb: null
        };
      }

      if (type === "city") {
        setActiveTab("suburb");
        return {
          ...updatedSelection,
          suburb: null
        };
      }
      
      if (type === "suburb") {
        if (!redirect) {
          closeModal();
        }
        return updatedSelection;
      }
      return updatedSelection;
    });
  };

  // Add this function to handle tab clicks
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    // Reset selections based on which tab was clicked
    if (tab === "province") {
      setSelection(prev => ({ ...prev, province: null, city: null, suburb: null }));
    } else if (tab === "city") {
      setSelection(prev => ({ ...prev, city: null, suburb: null }));
    } else if (tab === "suburb") {
      setSelection(prev => ({ ...prev, suburb: null }));
    }
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

  // Add NoResultsMessage component
  const NoResultsMessage = ({ text }) => (
    <Text c="dimmed" ta="center" py="xl" fz="sm">
      {text}
    </Text>
  );

  return (
    <Modal
      opened={isOpen}
      onClose={closeModal}
      withCloseButton={false}
      size="60%"
      padding={0}
      styles={{
        inner: {
          paddingTop: '80px' // Add top padding
        },
        content: {
          maxHeight: 'calc(100vh - 100px)'
        }
      }}
      closeOnClickOutside={false} // Prevent modal from closing on outside click
    >
      <Paper
        className="search-modal-header"
        p="xs"
        shadow="0px 2px 5px 0px #00000014"
      >
        <Center>
          {/* <Button
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
          </Button> */}
          <Button
            className={`tab-button ${activeTab === "province" ? "active" : ""}`}
            variant="subtle"
            bg={activeTab === "province" ? "#E90808" : "#F3F3F3"}
            color={activeTab === "province" ? "white" : "#878787"}
            size="xs"
            mr="md"
            autoContrast
            onClick={() => handleTabClick("province")}
          >
            Province
          </Button>
          {!hide && ( // Conditionally render Cities tab button
            <>            
            <Button
              className={`tab-button ${activeTab === "city" ? "active" : ""}`}
              variant="subtle"
              bg={activeTab === "city" ? "#E90808" : "#F3F3F3"}
              color={activeTab === "city" ? "white" : "#878787"}
              size="xs"
              mr="md"
              autoContrast
              onClick={() => handleTabClick("city")}
            >
              City
            </Button>
          <Button
              className={`tab-button ${activeTab === "suburb" ? "active" : ""}`}
              variant="subtle"
              bg={activeTab === "suburb" ? "#E90808" : "#F3F3F3"}
              color={activeTab === "suburb" ? "white" : "#878787"}
              size="xs"
              mr="md"
              autoContrast
              onClick={() => handleTabClick("suburb")}
            >
              Suburb
            </Button>
            </>
          )}
          <CloseButton pos="absolute" right={20} onClick={closeModal}/>
        </Center>
      </Paper>
      <Grid gutter={0}>
          {/* Country Section */}
        {/* <Grid.Col span={hide ? 6 : 4} p="md" pt="xl" className="border-end">
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
        </Grid.Col> */}
        <Grid.Col span={4} p="md" pt="xl" className="border-end">
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
            {selection.country ? (
              filteredProvinces.length > 0 ? (
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
              ) : (
                <NoResultsMessage text={`No provinces found matching "${provinceSearch}"`} />
              )
            ) : (
              <NoResultsMessage text="Please select a country first" />
            )}
          </ScrollArea>
        </Grid.Col>
        {!hide && ( // Conditionally render Cities column
        <>        
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
              {selection.province ? (
                filteredCities.length > 0 ? (
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
                ) : (
                  <NoResultsMessage text={`No cities found matching "${citySearch}"`} />
                )
              ) : (
                <NoResultsMessage text="Please select a province first" />
              )}
            </ScrollArea>
          </Grid.Col>
          <Grid.Col span={4} p="md" pt="xl" className="border-end">
            <Input
              placeholder="Search by Suburb"
              leftSection={<BsSearch />}
              value={suburbSearch}
              onChange={(e) => setSuburbSearch(e.target.value)}
            />
            <Title order={5} my="sm" fw={600}>
              Suburbs
            </Title>
            <ScrollArea
              h={250}
              offsetScrollbars
              scrollbarSize={5}
              scrollHideDelay={500}
              scrollbars="y"
            >
              {selection.city ? (
                filteredSuburbs.length > 0 ? (
                  <List className="search-dropdown-lists" listStyleType="none">
                    {selection.city&&
                      filteredSuburbs.map((suburb) => (
                        <List.Item
                          key={suburb}
                          className={`search-dropdown-lists__item ${
                            selection.suburb?.toLowerCase() === suburb?.toLowerCase() ? "selected" : ""
                          }`}
                          onClick={() => {
                            handleSelection("suburb", suburb);
                            setActiveTab("suburb"); // Set active tab to suburb
                          }}
                        >
                          {suburb} <BsArrowRight />
                        </List.Item>
                      ))}
                  </List>
                ) : (
                  <NoResultsMessage text={`No suburbs found matching "${suburbSearch}"`} />
                )
              ) : (
                <NoResultsMessage text="Please select a city first" />
              )}
            </ScrollArea>
          </Grid.Col>
        </>
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