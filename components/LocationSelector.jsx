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
import { useGetProvincesQuery, useGetCitiesQuery, useGetSuburbsQuery } from "@/api-services/location";

const LocationSelector = ({
  isOpen,
  onClose: closeModal,
  selection,
  setSelection,
  redirect,
  hide = false,
}) => {
  const { provinces: reduxProvinces, cities: reduxCities, suburbs: reduxSuburbs } = useSelector(state => state.location);
  
  // Use RTK Query hooks to fetch data if not available in Redux
  const { data: apiProvinces, isLoading: isLoadingProvinces } = useGetProvincesQuery(undefined, {
    skip: Array.isArray(reduxProvinces) && reduxProvinces.length > 0
  });
  
  const { data: apiCities, isLoading: isLoadingApiCities } = useGetCitiesQuery(undefined, {
    skip: Array.isArray(reduxCities) && reduxCities.length > 0
  });
  
  const { data: apiSuburbs, isLoading: isLoadingApiSuburbs } = useGetSuburbsQuery(undefined, {
    skip: Array.isArray(reduxSuburbs) && reduxSuburbs.length > 0
  });

  // Use data from Redux or API
  const provincesData = (Array.isArray(reduxProvinces) && reduxProvinces.length > 0) 
    ? reduxProvinces 
    : apiProvinces?.data || [];
    
  const citiesData = (Array.isArray(reduxCities) && reduxCities.length > 0) 
    ? reduxCities 
    : apiCities?.data || [];
    
  const suburbsData = (Array.isArray(reduxSuburbs) && reduxSuburbs.length > 0) 
    ? reduxSuburbs 
    : apiSuburbs?.data || [];

  const [activeTab, setActiveTab] = useState("province");
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [isLoadingSuburbs, setIsLoadingSuburbs] = useState(false);

  const [provinceSearch, setProvinceSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [suburbSearch, setSuburbSearch] = useState("");

  const getFilteredProvinces = () => {
    if (!Array.isArray(provincesData)) {
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

  // Calculate visible columns based on active tab and data availability
  const getVisibleColumns = () => {
    const hasSuburbs = suburbsData?.some(suburb => suburb.parentId === selection.city?._id);
    
    switch (activeTab) {
      case "province":
        return { province: true, city: false, suburb: false };
      case "city":
        return { province: true, city: true, suburb: false };
      case "suburb":
        return { 
          province: true, 
          city: true, 
          suburb: hasSuburbs && !hide 
        };
      default:
        return { province: true, city: false, suburb: false };
    }
  };

  const visibleColumns = getVisibleColumns();
  const totalVisibleColumns = Object.values(visibleColumns).filter(Boolean).length;

  // Determine modal size based on visible columns
  const getModalSize = () => {
    if (totalVisibleColumns === 1) return "md";
    if (totalVisibleColumns === 2) return "lg";
    return "xl";
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

  // Determine if loading data
  const isLoading = isLoadingProvinces || isLoadingApiCities || isLoadingApiSuburbs;

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
    const hasSuburbs = suburbsData?.some(suburb => suburb.parentId === city._id);
    setSelection({
      ...selection,
      city,
      suburb: null
    });
    setSuburbSearch("");
    setActiveTab(hasSuburbs ? "suburb" : "city");
  };

  const handleSuburbSelect = (suburb) => {
    setSelection({
      ...selection,
      suburb
    });
    closeModal();
  };

  return (
    <Modal
      opened={isOpen}
      onClose={closeModal}
      withCloseButton={false}
      size={getModalSize()}
      padding={0}
      styles={{
        inner: {
          paddingTop: '80px'
        },
        content: {
          maxHeight: 'calc(100vh - 100px)',
          width: `${totalVisibleColumns * 350}px`,
          maxWidth: '100%',
          margin: '0 auto'
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
            className={`tab-button`}
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
          {visibleColumns.suburb && (
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
          )}
          <CloseButton pos="absolute" right={20} onClick={closeModal}/>
        </Center>
      </Paper>
      <Grid gutter={0}>
        {visibleColumns.province && (
          <Grid.Col span={12 / totalVisibleColumns} p="md" pt="xl" className="border-end">
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
              {isLoadingProvinces ? (
                <Center h={200}>
                  <Loader color="#E90808" />
                </Center>
              ) : filteredProvinces?.length > 0 ? (
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
        )}
        {visibleColumns.city && (
          <Grid.Col span={12 / totalVisibleColumns} p="md" pt="xl" className="border-end">
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
                isLoadingCities || isLoadingApiCities ? (
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
        )}
        {visibleColumns.suburb && (
          <Grid.Col span={12 / totalVisibleColumns} p="md" pt="xl" className="border-end">
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
                isLoadingSuburbs || isLoadingApiSuburbs ? (
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