import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Center,
  CloseButton,
  Flex,
  Grid,
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
  locationData,
}) => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState({});
  const [areas, setAreas] = useState({});
  const [activeTab, setActiveTab] = useState("state");

  // Process location data when it changes
  useEffect(() => {
    if (!locationData) return;

    const fetchedStates = [];
    const fetchedCities = {};
    const fetchedAreas = {};

    locationData.forEach((state) => {
      fetchedStates.push(state.name);
      fetchedCities[state.name] = state.cities.map(city => city.name);
      
      state.cities.forEach((city) => {
        fetchedAreas[city.name] = city.areas || [];
      });
    });

    setStates(fetchedStates);
    setCities(fetchedCities);
    setAreas(fetchedAreas);
  }, [locationData]);

  const [stateSearch, setStateSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [areaSearch, setAreaSearch] = useState("");

  // Filter functions
  const filteredStates = states.filter((state) =>
    state.toLowerCase().includes(stateSearch.toLowerCase())
  );

  const filteredCities = selection.state && cities[selection.state]
    ? cities[selection.state].filter((city) =>
        city.toLowerCase().includes(citySearch.toLowerCase())
      )
    : [];

  const filteredAreas = selection.city && areas[selection.city]
    ? areas[selection.city].filter((area) =>
        area.toLowerCase().includes(areaSearch.toLowerCase())
      )
    : [];

  const [opened, { open, close }] = useDisclosure(isOpen);

  // Handle selection and tab progression
  const handleSelection = (type, value) => {
    setSelection((prev) => {
      const updatedSelection = { ...prev };

      switch (type) {
        case "state":
          updatedSelection.state = value;
          updatedSelection.city = "";
          updatedSelection.area = "";
          setActiveTab("city");
          break;
        case "city":
          updatedSelection.city = value;
          updatedSelection.area = "";
          setActiveTab("area");
          break;
        case "area":
          updatedSelection.area = value;
          closeModal();
          break;
      }

      return updatedSelection;
    });
  };

  // Tab change handler
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Clear selections after the selected tab
    switch (tab) {
      case "state":
        setSelection(prev => ({ ...prev, state: "", city: "", area: "" }));
        break;
      case "city":
        setSelection(prev => ({ ...prev, city: "", area: "" }));
        break;
      case "area":
        setSelection(prev => ({ ...prev, area: "" }));
        break;
    }
  };

  // Modal open/close effect
  useEffect(() => {
    if (isOpen) {
      open();
      // Reset searches when modal opens
      setStateSearch("");
      setCitySearch("");
      setAreaSearch("");
    } else {
      close();
    }
  }, [isOpen, open, close]);

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
      size="xl"
      padding={0}
      styles={{
        inner: { paddingTop: "80px" },
        content: { maxHeight: "calc(100vh - 100px)" },
      }}
      closeOnClickOutside={false}
    >
      <Paper className="search-modal-header" p="xs" shadow="0px 2px 5px 0px #00000014">
        <Center>
          {["state", "city", "area"].map((tab) => (
            <Button
              key={tab}
              className={`tab-button ${activeTab === tab ? "active" : ""}`}
              variant="subtle"
              bg={activeTab === tab ? "#E90808" : "#F3F3F3"}
              color={activeTab === tab ? "white" : "#878787"}
              size="xs"
              mr="md"
              autoContrast
              onClick={() => handleTabChange(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Button>
          ))}
          <CloseButton pos="absolute" right={20} onClick={closeModal} />
        </Center>
      </Paper>

      <Grid gutter={0}>
        {/* States Column */}
        <Grid.Col span={4} p="md" pt="xl" className="border-end">
          <Input
            placeholder="Search State"
            leftSection={<BsSearch />}
            value={stateSearch}
            onChange={(e) => setStateSearch(e.target.value)}
          />
          <Title order={5} my="sm" fw={600}>States</Title>
          <ScrollArea h={250} offsetScrollbars scrollbarSize={5}>
            {filteredStates.length > 0 ? (
              <List className="search-dropdown-lists" listStyleType="none">
                {filteredStates.map((state) => (
                  <List.Item
                    key={state}
                    className={`search-dropdown-lists__item ${
                      selection.state === state ? "selected" : ""
                    }`}
                    onClick={() => handleSelection("state", state)}
                  >
                    {state} <BsArrowRight />
                  </List.Item>
                ))}
              </List>
            ) : (
              <NoResultsMessage text={`No states found matching "${stateSearch}"`} />
            )}
          </ScrollArea>
        </Grid.Col>

        {/* Cities Column */}
        <Grid.Col span={4} p="md" pt="xl" className="border-end">
          <Input
            placeholder="Search City"
            leftSection={<BsSearch />}
            value={citySearch}
            onChange={(e) => setCitySearch(e.target.value)}
            disabled={!selection.state}
          />
          <Title order={5} my="sm" fw={600}>Cities</Title>
          <ScrollArea h={250} offsetScrollbars scrollbarSize={5}>
            {selection.state ? (
              filteredCities.length > 0 ? (
                <List className="search-dropdown-lists" listStyleType="none">
                  {filteredCities.map((city) => (
                    <List.Item
                      key={city}
                      className={`search-dropdown-lists__item ${
                        selection.city === city ? "selected" : ""
                      }`}
                      onClick={() => handleSelection("city", city)}
                    >
                      {city} <BsArrowRight />
                    </List.Item>
                  ))}
                </List>
              ) : (
                <NoResultsMessage text={`No cities found matching "${citySearch}"`} />
              )
            ) : (
              <NoResultsMessage text="Please select a state first" />
            )}
          </ScrollArea>
        </Grid.Col>

        {/* Areas Column */}
        <Grid.Col span={4} p="md" pt="xl">
          <Input
            placeholder="Search Area"
            leftSection={<BsSearch />}
            value={areaSearch}
            onChange={(e) => setAreaSearch(e.target.value)}
            disabled={!selection.city}
          />
          <Title order={5} my="sm" fw={600}>Areas</Title>
          <ScrollArea h={250} offsetScrollbars scrollbarSize={5}>
            {selection.city ? (
              filteredAreas.length > 0 ? (
                <List className="search-dropdown-lists" listStyleType="none">
                  {filteredAreas.map((area) => (
                    <List.Item
                      key={area}
                      className={`search-dropdown-lists__item ${
                        selection.area === area ? "selected" : ""
                      }`}
                      onClick={() => handleSelection("area", area)}
                    >
                      {area} <BsArrowRight />
                    </List.Item>
                  ))}
                </List>
              ) : (
                <NoResultsMessage text={`No areas found matching "${areaSearch}"`} />
              )
            ) : (
              <NoResultsMessage text="Please select a city first" />
            )}
          </ScrollArea>
        </Grid.Col>
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
          onClick={closeModal}
          ff="heading"
        >
          Done
        </Button>
      </Paper>
    </Modal>
  );
};

export default LocationSelector;