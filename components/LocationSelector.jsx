import React, { useState, useEffect } from "react";
import axios from "axios";
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

  const getProvinces = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/location/provinces');
      setProvinces(response.data.data);
    } catch (error) {
      console.error("Error fetching provinces:", error);
      setProvinces([]);
    }
  };

  const getCities = async (provinceId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/location/children/${provinceId}`);
      setCities(response.data.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
      setCities([]);
    }
  };

  const getSuburbs = async (cityId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/location/children/${cityId}`);
      setSuburbs(response.data.data);
    } catch (error) {
      console.error("Error fetching suburbs:", error);
      setSuburbs([]);
    }
  };

  useEffect(() => {
    getProvinces();
  }, []);

  useEffect(() => {
    if (selection.province?._id) {
      getCities(selection.province._id);
    } else {
      setCities([]);
      setSuburbs([]);
    }
  }, [selection.province]);

  useEffect(() => {
    if (selection.city?._id) {
      getSuburbs(selection.city._id);
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
  suburb.name.toLowerCase().includes(suburbSearch.toLowerCase())
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
  
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "province") {
      setSelection(prev => ({ ...prev, province: null, city: null, suburb: null }));
    } else if (tab === "city") {
      setSelection(prev => ({ ...prev, city: null, suburb: null }));
    } else if (tab === "suburb") {
      setSelection(prev => ({ ...prev, suburb: null }));
    }
  };
  console.log("filteredProvinces",filteredProvinces)
  
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
          paddingTop: '80px'
        },
        content: {
          maxHeight: 'calc(100vh - 100px)'
        }
      }}
      closeOnClickOutside={false}
    >
      <Paper
        className="search-modal-header"
        p="xs"
        shadow="0px 2px 5px 0px #00000014"
      >
        <Center>

          <Button
            className={`tab-button}`}
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
          {!hide && (
            <>            
            <Button
              className={`tab-button`}
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
              className={`tab-button`}
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

        <Grid.Col span={4} p="md" pt="xl" className="border-end">
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
         
              {filteredProvinces.length > 0 ? (
                <List className="search-dropdown-lists" listStyleType="none">
                  {filteredProvinces.map((province) => (
                    <List.Item
                      key={province._id}
                      className={`search-dropdown-lists__item ${
                        selection.province && selection.province._id === province._id ? "selected" : ""
                      }`}
                      onClick={() => {
                        handleSelection("province", province);
                        setActiveTab("city");
                      }}
                    >
                      {province.name} <BsArrowRight />
                    </List.Item>
                  ))}
                  {console.log("filteredProvinces...",filteredProvinces)}
                </List>
              ) : (
                <NoResultsMessage text={`No provinces found matching "${provinceSearch}"`} />
              )}
           
          </ScrollArea>
        </Grid.Col>
        {!hide && (
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
                    {filteredCities.map((city) => (
                      <List.Item
                        key={city._id}
                        className={`search-dropdown-lists__item ${
                          selection.city?._id === city._id ? "selected" : ""
                        }`}
                        onClick={() => {
                          handleSelection("city", city);
                          setActiveTab("suburb");
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
                    {filteredSuburbs.map((suburb) => (
                      <List.Item
                        key={suburb._id}
                        className={`search-dropdown-lists__item ${
                          selection.suburb?._id === suburb._id ? "selected" : ""
                        }`}
                        onClick={() => {
                          handleSelection("suburb", suburb);
                          setActiveTab("suburb");
                        }}
                      >
                        {suburb.name} <BsArrowRight />
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