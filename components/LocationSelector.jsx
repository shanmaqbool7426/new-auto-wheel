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
  Loader,
  Modal,
  Paper,
  ScrollArea,
  Title,
  Text,
  Tabs,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { BsArrowRight, BsSearch } from "react-icons/bs";
import { BASE_URL } from "@/constants/api-endpoints";
import { useSelector } from "react-redux";

const LocationSelector = ({
  isOpen,
  onClose: closeModal,
  selection,
  setSelection,
  redirect,
  hide = false,
}) => {
  const { provinces: provincesData, cities: citiesData, suburbs: suburbsData } = useSelector(state => state.location);
  const [activeTab, setActiveTab] = useState("province");
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [isLoadingSuburbs, setIsLoadingSuburbs] = useState(false);

  const [provinceSearch, setProvinceSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [suburbSearch, setSuburbSearch] = useState("");

  const getFilteredProvinces = () => {
    if (!Array.isArray(provincesData)) {
      console.log("provincesData:", provincesData);
      return [];
    }

    return provincesData.filter((province) => {
      const searchTerm = provinceSearch.toLowerCase().trim();
      if (!searchTerm) return true;

      const provinceName = province.name.toLowerCase();
      return provinceName.includes(searchTerm);
    });
  };

  const getFilteredCities = () => {
    if (!Array.isArray(citiesData) || !selection.province?._id) return [];

    const relevantCities = citiesData.filter(
      (city) => city.parentId === selection.province._id
    );

    return relevantCities.filter((city) => {
      const searchTerm = citySearch.toLowerCase().trim();
      if (!searchTerm) return true;

      const cityName = city.name.toLowerCase();
      return cityName.includes(searchTerm);
    });
  };

  const getFilteredSuburbs = () => {
    if (!Array.isArray(suburbsData) || !selection.city?._id) return [];

    const relevantSuburbs = suburbsData.filter(
      (suburb) => suburb.parentId === selection.city._id
    );

    return relevantSuburbs.filter((suburb) => {
      const searchTerm = suburbSearch.toLowerCase().trim();
      if (!searchTerm) return true;

      const suburbName = suburb.name.toLowerCase();
      return suburbName.includes(searchTerm);
    });
  };

  const filteredProvinces = getFilteredProvinces();
  const filteredCities = getFilteredCities();
  const filteredSuburbs = getFilteredSuburbs();

  const handleProvinceSelect = (province) => {
    setSelection({
      ...selection,
      province,
      city: null,
      suburb: null
    });
    setCitySearch("");
    setActiveTab("city");
  };

  const handleCitySelect = (city) => {
    setSelection({
      ...selection,
      city,
      suburb: null
    });
    setSuburbSearch("");
    setActiveTab("suburb");
  };

  const handleSuburbSelect = (suburb) => {
    setSelection({
      ...selection,
      suburb
    });
    closeModal();
  };

  const [opened, { open, close }] = useDisclosure(isOpen);

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
            onClick={() => setActiveTab("province")}
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
                onClick={() => setActiveTab("city")}
                disabled={!selection.province}
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
                onClick={() => setActiveTab("suburb")}
                disabled={!selection.city}
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
            {filteredProvinces?.length > 0 ? (
              <List className="search-dropdown-lists" listStyleType="none">
                {filteredProvinces?.map((province) => (
                  <List.Item
                    key={province._id}
                    className={`search-dropdown-lists__item ${
                      selection.province && selection.province._id === province._id ? "selected" : ""
                    }`}
                    onClick={() => handleProvinceSelect(province)}
                  >
                    {province.name} <BsArrowRight />
                  </List.Item>
                ))}
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
                  isLoadingCities ? (
                    <Center h={200}>
                      <Loader color="#E90808" />
                    </Center>
                  ) : (
                    filteredCities.length > 0 ? (
                      <List className="search-dropdown-lists" listStyleType="none">
                        {filteredCities.map((city) => (
                          <List.Item
                            key={city._id}
                            className={`search-dropdown-lists__item ${
                              selection.city?._id === city._id ? "selected" : ""
                            }`}
                            onClick={() => handleCitySelect(city)}
                          >
                            {city.name} <BsArrowRight />
                          </List.Item>
                        ))}
                      </List>
                    ) : (
                      <NoResultsMessage text={`No cities found matching "${citySearch}"`} />
                    )
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
                  isLoadingSuburbs ? (
                    <Center h={200}>
                      <Loader color="#E90808" />
                    </Center>
                  ) : (
                    filteredSuburbs.length > 0 ? (
                      <List className="search-dropdown-lists" listStyleType="none">
                        {filteredSuburbs.map((suburb) => (
                          <List.Item
                            key={suburb._id}
                            className={`search-dropdown-lists__item ${
                              selection.suburb?._id === suburb._id ? "selected" : ""
                            }`}
                            onClick={() => handleSuburbSelect(suburb)}
                          >
                            {suburb.name} <BsArrowRight />
                          </List.Item>
                        ))}
                      </List>
                    ) : (
                      <NoResultsMessage text={`No suburbs found matching "${suburbSearch}"`} />
                    )
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