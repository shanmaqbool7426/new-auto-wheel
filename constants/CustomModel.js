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

const CustomModel = ({
  isOpen,
  onClose: closeModal,
  selection,
  setSelection,
  fetchMakesByTypeData,
  hide = false,
}) => {
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState({});
  const [variants, setVariants] = useState({});
  const [activeTab, setActiveTab] = useState("make"); // State to track active tab

  useEffect(() => {
    const fetchedMakes = [];
    const fetchedModels = {};
    const fetchedVariants = {};


    fetchMakesByTypeData?.data?.forEach((make) => {
      // Store full make object instead of just the name
      fetchedMakes.push({
        name: make.name,
        image: make.companyImage || null, // Add image from API
        _id: make._id
      });
      fetchedModels[make.name] = [];
      make.models.forEach((model) => {
        fetchedModels[make.name].push(model.name);
        fetchedVariants[model.name] = model.variants;
      });
    });

    setMakes(fetchedMakes);
    setModels(fetchedModels);
    setVariants(fetchedVariants);
  }, [fetchMakesByTypeData]);


  const [makeSearch, setMakeSearch] = useState("");
  const [modelSearch, setModelSearch] = useState("");
  const [variantSearch, setVariantSearch] = useState("");

  const filteredMakes = makes.filter((make) =>
    make.name.toLowerCase().includes(makeSearch.toLowerCase())
  );

  const filteredModels =
    selection.make && models[selection.make]
      ? models[selection.make].filter((model) =>
        model.toLowerCase().includes(modelSearch.toLowerCase())
      )
      : [];

  const filteredVariants =
    selection.model && variants[selection.model]
      ? variants[selection.model].filter((variant) =>
        variant.toLowerCase().includes(variantSearch.toLowerCase())
      )
      : [];

  const [opened, { open, close }] = useDisclosure(isOpen);
  const handleSelection = (type, value) => {
    setSelection((prev) => {
      const updatedSelection = { ...prev, [type]: value };

      if (type === "make") {
        setActiveTab("model"); // Set active tab to model
        return {
          ...updatedSelection,
          model: "", // Reset model and variant
          variant: "",
        };
      }

      if (type === "model") {
        setActiveTab("variant"); // Set active tab to variant
        hide && closeModal();
        return {
          ...updatedSelection,
          variant: "", // Reset variant
        };
      }

      if (type === "variant") {
        closeModal();
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

  useEffect(() => {
    () => {
      return closeModal();
    };
  }, [selection]);


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
      size={"xl"}
      padding={0}
      styles={{
        inner: {
          paddingTop: '80px' // Add top padding to create gap from header
        },
        content: {
          maxHeight: 'calc(100vh - 100px)' // Adjust max height to account for top gap
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
          <Button
            className={`tab-button`}
            variant="subtle"
            bg={activeTab === "make" ? "#E90808" : "#F3F3F3"}
            color={activeTab === "make" ? "white" : "#878787"}
            size="xs"
            mr="md"
            autoContrast
            onClick={() => {
              setActiveTab("make");
              if (selection.make) {
                setSelection((prev) => ({ ...prev, make: "" }));
              }
            }}
          >
            Make
          </Button>
          <Button
            className={`tab-button`}
            variant="subtle"
            bg={activeTab === "model" ? "#E90808" : "#F3F3F3"}
            color={activeTab === "model" ? "white" : "#878787"}
            size="xs"
            mr="md"
            autoContrast
            onClick={() => {
              setActiveTab("model");
              if (selection.model) {
                setSelection((prev) => ({ ...prev, model: "" }));
              }
            }}
          >
            Model
          </Button>
          {!hide && ( // Conditionally render Variants tab button
            <Button
              className={`tab-button`}
              variant="subtle"
              bg={activeTab === "variant" ? "#E90808" : "#F3F3F3"}
              color={activeTab === "variant" ? "white" : "#878787"}
              size="xs"
              mr="md"
              autoContrast
              onClick={() => {
                setActiveTab("variant");
                if (selection.variant) {
                  setSelection((prev) => ({ ...prev, variant: "" }));
                }
              }}
            >
              Variants
            </Button>
          )}
          <CloseButton pos="absolute" right={20} onClick={closeModal} />
        </Center>
      </Paper>
      <Grid gutter={0}>
        <Grid.Col span={hide ? 6 : 4} p="md" pt="xl" className="border-end">
          {/* Make Section */}
          <Input
            placeholder="Search by Car Make"
            leftSection={<BsSearch />}
            value={makeSearch}
            onChange={(e) => setMakeSearch(e.target.value)}
          />
          <Title order={5} my="sm" fw={600}>
            Popular
          </Title>
          <ScrollArea
            h={230}
            offsetScrollbars
            scrollbarSize={5}
            scrollHideDelay={500}
            scrollbars="y"
          >
            {filteredMakes.length > 0 ? (
              <List className="search-dropdown-lists" listStyleType="none">
                {filteredMakes.map((make) => (
                  <List.Item
                    key={make._id}
                    className={`search-dropdown-lists__item ${selection.make === make.name ? "selected" : ""
                      }`}
                    icon={
                      <Image
                        src={make.image}
                        // alt={make.name}
                        fallbackSrc="/megamenu/search-menu/default-make.svg" // Add a default image
                        width={24}
                        height={24}
                      />
                    }
                    onClick={() => {
                      handleSelection("make", make.name);
                      setActiveTab("model"); // Set active tab to model
                    }}
                  >
                    {make.name} <BsArrowRight />
                  </List.Item>
                ))}
              </List>
            ) : (
              <NoResultsMessage text={`No makes found matching "${makeSearch}"`} />
            )}
          </ScrollArea>
        </Grid.Col>
        <Grid.Col span={hide ? 6 : 4} p="md" pt="xl" className="border-end">
          {/* Model Section */}
          <Input
            placeholder="Search by Car Model"
            leftSection={<BsSearch />}
            value={modelSearch}
            onChange={(e) => setModelSearch(e.target.value)}
          />
          <Title order={5} my="sm" fw={600}>
            All Models
          </Title>
          <ScrollArea
            h={220}
            offsetScrollbars
            scrollbarSize={5}
            scrollHideDelay={500}
            scrollbars="y"
          >
            {selection.make ? (
              filteredModels.length > 0 ? (
                <List className="search-dropdown-lists" listStyleType="none">
                  {selection.make &&
                    filteredModels.map((model) => (
                      <List.Item
                        key={model}
                        className={`search-dropdown-lists__item ${selection.model === model ? "selected" : ""
                          }`}
                        onClick={() => {
                          handleSelection("model", model);
                          setActiveTab("variant"); // Set active tab to variant
                        }}
                      >
                        {model} <BsArrowRight />
                      </List.Item>
                    ))}
                </List>
              ) : (
                <NoResultsMessage text={`No models found matching "${modelSearch}"`} />
              )
            ) : (
              <NoResultsMessage text="Please select a make first" />
            )}
          </ScrollArea>
        </Grid.Col>
        {!hide && ( // Conditionally render Variants column
          <Grid.Col span={4} p="md" pt="xl" className="border-end">
            <Input
              placeholder="Search by Car Variant"
              leftSection={<BsSearch />}
              value={variantSearch}
              onChange={(e) => setVariantSearch(e.target.value)}
            />
            <Title order={5} my="sm" fw={600}>
              Variants
            </Title>
            <ScrollArea
              h={230}
              offsetScrollbars
              scrollbarSize={5}
              scrollHideDelay={500}
              scrollbars="y"
            >
              {selection.model ? (
                filteredVariants.length > 0 ? (
                  <List className="search-dropdown-lists" listStyleType="none">
                    {selection.model &&
                      filteredVariants.map((variant) => (
                        <List.Item
                          key={variant}
                          className={`search-dropdown-lists__item ${selection.variant === variant ? "selected" : ""
                            }`}
                          onClick={() => {
                            handleSelection("variant", variant);
                            setActiveTab("variant"); // Set active tab to variant
                          }}
                        >
                          {variant} <BsArrowRight />
                        </List.Item>
                      ))}
                  </List>
                ) : (
                  <NoResultsMessage text={`No variants found matching "${variantSearch}"`} />
                )
              ) : (
                <NoResultsMessage text="Please select a model first" />
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
          onClick={closeModal}
          ff="heading"
        >
          Done
        </Button>
      </Paper>
    </Modal>
  );
};

export default CustomModel;
