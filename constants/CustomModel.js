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
  Loader,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { BsArrowRight, BsSearch } from "react-icons/bs";
import { useGetAllMakesQuery, useGetAllModelsQuery, useGetAllVarientsQuery, useGetMakesQuery, useGetPopularMakesQuery, useGetPopularModelsQuery, useGetVarientsInRangeQuery } from "@/api-services/make";

const CustomModel = ({
  isOpen,
  onClose: closeModal,
  selection,
  setSelection,
  fetchMakesByTypeData,
  hide = false,
  type = 'car',
  rangeVarients = false
}) => {
  const { data: makesdata, isLoading: makesLoading } = useGetMakesQuery({ type });
  const { data: modelsdata, isLoading: modelsLoading } = useGetAllModelsQuery({ type });
  const { data: variantsdata, isLoading: variantsLoading } = useGetAllVarientsQuery({ type });
  const { data: varientsInRange, isLoading: varientsInRangeLoading } = useGetVarientsInRangeQuery({year: selection.year, type, make: selection.make?.name, model: selection.model?.name }, { skip: !selection.make || !selection.model });

  console.log(selection, "selection......")
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState({});
  const [variants, setVariants] = useState({});
  const [activeTab, setActiveTab] = useState("year");
  const [hasVariants, setHasVariants] = useState(false);

  // Generate years array from current year to 1990
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1989 }, (_, i) => currentYear - i);

  // Process makes data
  useEffect(() => {
    if (makesdata?.data) {
      const fetchedMakes = makesdata.data.map(make => ({
        name: make.name,
        image: make.companyImage || null,
        _id: make._id,
        isPopular: make.isPopular,
        order: make.order
      }));
      setMakes(fetchedMakes);
    }
  }, [makesdata]);

  // Process models data
  useEffect(() => {
    if (modelsdata?.data) {
      const modelMap = {};
      modelsdata.data.forEach(model => {
        if (!modelMap[model.makeId]) {
          modelMap[model.makeId] = [];
        }
        modelMap[model.makeId].push({
          name: model.name,
          _id: model._id,
          isPopular: model.isPopular,
          order: model.order
        });
      });
      setModels(modelMap);
    }
  }, [modelsdata]);

  // Process variants data
  useEffect(() => {
    if (variantsdata?.data) {
      const variantMap = {};
      variantsdata.data.forEach(variant => {
        if (!variantMap[variant.modelId]) {
          variantMap[variant.modelId] = [];
        }
        variantMap[variant.modelId].push({
          name: variant.name,
          _id: variant._id
        });
      });
      setVariants(variantMap);
    }
  }, [variantsdata]);

  const [yearSearch, setYearSearch] = useState("");
  const [makeSearch, setMakeSearch] = useState("");
  const [modelSearch, setModelSearch] = useState("");
  const [variantSearch, setVariantSearch] = useState("");

  const filteredYears = years.filter((year) =>
    year.toString().includes(yearSearch)
  );

  const filteredMakes = makes.filter((make) =>
    make.name.toLowerCase().includes(makeSearch.toLowerCase())
  );

  // Define popular and other makes for rendering

  const popularMakes = filteredMakes.filter(make => make.isPopular);
  const otherMakes = filteredMakes.filter(make => !make.isPopular);

  const filteredModels = selection.make && models[selection.make._id]
    ? models[selection.make._id].filter((model) =>
      model.name.toLowerCase().includes(modelSearch.toLowerCase())
    )
    : [];

  // Define popular and other models for rendering
  const popularModels = filteredModels.filter(model => model.isPopular);
  const otherModels = filteredModels.filter(model => !model.isPopular);

  // Use model._id for variant lookup
  const filteredVariants = selection.model && variants[selection.model._id]
    ? variants[selection.model._id].filter((variant) =>
      variant.name.toLowerCase().includes(variantSearch.toLowerCase())
    )
    : [];

  // Check if selected model has variants
  useEffect(() => {
    if (selection.model && variants[selection.model._id] && variants[selection.model._id].length > 0) {
      setHasVariants(true);
    } else {
      setHasVariants(false);
    }
  }, [selection.model, variants]);

  const [opened, { open, close }] = useDisclosure(isOpen);

  // Update handleSelection to store objects for year/make/model/variant
  const handleSelection = (type, value) => {
    setSelection((prev) => {
      let updatedSelection = { ...prev };
      if (type === "year" && rangeVarients) {
        setActiveTab("make");
        updatedSelection = {
          ...updatedSelection,
          year: value,
          make: "",
          model: "",
          variant: "",
        };
      } else if (type === "make") {
        setActiveTab("model");
        updatedSelection = {
          ...updatedSelection,
          make: value,
          model: "",
          variant: "",
        };
        if (rangeVarients) {
          updatedSelection.year = updatedSelection.year || selection.year;
        } else {
          delete updatedSelection.year;
        }
      } else if (type === "model") {
        if (variants[value._id] && variants[value._id].length > 0) {
          setActiveTab("variant");
          updatedSelection = {
            ...updatedSelection,
            model: value,
            variant: "",
          };
        } else {
          closeModal();
          updatedSelection = {
            ...updatedSelection,
            model: value,
            variant: "",
          };
        }
      } else if (type === "variant") {
        closeModal();
        updatedSelection = {
          ...updatedSelection,
          variant: value,
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


  console.log(selection, "selection....")

  const getVisibleColumns = () => {
    if (rangeVarients) {
      if (!selection.year) {
        return { year: true, make: false, model: false, variant: false };
      } else if (selection.year && !selection.make) {
        return { year: true, make: true, model: false, variant: false };
      } else if (selection.year && selection.make && !selection.model) {
        return { year: true, make: true, model: true, variant: false };
      } else if (selection.year && selection.make && selection.model) {
        return { year: true, make: true, model: true, variant: hasVariants && !hide };
      }
      return { year: true, make: false, model: false, variant: false };
    } else {
      if (!selection.make) {
        return { year: false, make: true, model: false, variant: false };
      } else if (selection.make && !selection.model) {
        return { year: false, make: true, model: true, variant: false };
      } else if (selection.make && selection.model) {
        return { year: false, make: true, model: true, variant: hasVariants && !hide };
      }
      return { year: false, make: true, model: false, variant: false };
    }
  };

  const visibleColumns = getVisibleColumns();
  const totalVisibleColumns = Object.values(visibleColumns).filter(Boolean).length;

  const getModalSize = () => {
    if (visibleColumns.model &&  rangeVarients) return "75vw";
    if (totalVisibleColumns === 1) return "md";
    if (totalVisibleColumns === 2) return "lg";
    return "xl";
  };

  const COLUMN_HEIGHT = 340; // consistent height for all columns

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
          width: `${totalVisibleColumns * 50}px`,
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
          {visibleColumns.year && (
            <Button
              className={`tab-button`}
              variant="subtle"
              bg={activeTab === "year" ? "#E90808" : "#F3F3F3"}
              color={activeTab === "year" ? "white" : "#878787"}
              size="xs"
              mr="md"
              autoContrast
              onClick={() => {
                setActiveTab("year");
                if (selection.year) {
                  setSelection((prev) => ({ ...prev, year: "" }));
                }
              }}
            >
              Year
            </Button>
          )}
          {visibleColumns.make && (
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
          )}
          {visibleColumns.model && (
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
          )}
          {visibleColumns.variant && (
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
        {visibleColumns.year && (
          <Grid.Col span={12 / totalVisibleColumns} p="md" pt="xl" className="border-end">
            <Input
              placeholder="Search by Year"
              leftSection={<BsSearch />}
              value={yearSearch}
              onChange={(e) => setYearSearch(e.target.value)}
            />
            <Title order={5} my="sm" fw={600}>
              Select Year
            </Title>
            <ScrollArea
              h={230}
              offsetScrollbars
              scrollbarSize={5}
              scrollHideDelay={500}
              scrollbars="y"
            >
              {filteredYears.length > 0 ? (
                <List className="search-dropdown-lists" listStyleType="none">
                  {filteredYears.map((year) => (
                    <List.Item
                      key={year}
                      className={`search-dropdown-lists__item ${selection.year === year ? "selected" : ""}`}
                      onClick={() => {
                        handleSelection("year", year);
                        setActiveTab("make");
                      }}
                    >
                      {year} <BsArrowRight />
                    </List.Item>
                  ))}
                </List>
              ) : (
                <NoResultsMessage text={`No years found matching "${yearSearch}"`} />
              )}
            </ScrollArea>
          </Grid.Col>
        )}
        {visibleColumns.make && (
          <Grid.Col span={12 / totalVisibleColumns} p="md" pt="xl" className="border-end" style={{ height: COLUMN_HEIGHT }}>
            <Input
              placeholder="Search by Car Make"
              leftSection={<BsSearch />}
              value={makeSearch}
              onChange={(e) => setMakeSearch(e.target.value)}
            />
            <ScrollArea
              h={COLUMN_HEIGHT - 60} // adjust for input height
              offsetScrollbars
              scrollbarSize={5}
              scrollHideDelay={500}
              scrollbars="y"
            >
              <Title order={5} my="sm" fw={600}>Popular</Title>
              {popularMakes.length > 0 ? (
                <List className="search-dropdown-lists" listStyleType="none">
                  {popularMakes.map((make) => (
                    <List.Item
                      key={make._id}
                      className={`search-dropdown-lists__item ${selection.make && selection.make._id === make._id ? "selected" : ""}`}
                      icon={
                        <Image
                          src={make.image}
                          fallbackSrc="/megamenu/search-menu/default-make.svg"
                          width={24}
                          height={24}
                        />
                      }
                      onClick={() => {
                        handleSelection("make", make);
                        setActiveTab("model");
                      }}
                    >
                      {make.name} <BsArrowRight />
                    </List.Item>
                  ))}
                </List>
              ) : (
                <NoResultsMessage text="No popular makes found" />
              )}
              <Title order={5} my="sm" fw={600}>Others</Title>
              {otherMakes.length > 0 ? (
                <List className="search-dropdown-lists" listStyleType="none">
                  {otherMakes.map((make) => (
                    <List.Item
                      key={make._id}
                      className={`search-dropdown-lists__item ${selection.make && selection.make._id === make._id ? "selected" : ""}`}
                      icon={
                        <Image
                          src={make.image}
                          fallbackSrc="/megamenu/search-menu/default-make.svg"
                          width={24}
                          height={24}
                        />
                      }
                      onClick={() => {
                        handleSelection("make", make);
                        setActiveTab("model");
                      }}
                    >
                      {make.name} <BsArrowRight />
                    </List.Item>
                  ))}
                </List>
              ) : (
                <NoResultsMessage text="No other makes found" />
              )}
            </ScrollArea>
          </Grid.Col>
        )}
        {visibleColumns.model && (
          <Grid.Col span={12 / totalVisibleColumns} p="md" pt="xl" className="border-end" style={{ height: COLUMN_HEIGHT }}>
            <Input
              placeholder="Search by Car Model"
              leftSection={<BsSearch />}
              value={modelSearch}
              onChange={(e) => setModelSearch(e.target.value)}
            />
            <ScrollArea
              h={COLUMN_HEIGHT - 60}
              offsetScrollbars
              scrollbarSize={5}
              scrollHideDelay={500}
              scrollbars="y"
            >
              {popularModels.length > 0 && (<>
                <Title order={5} my="sm" fw={600}>Popular</Title>
                <List className="search-dropdown-lists" listStyleType="none">
                  {popularModels.map((model) => (
                    <List.Item
                      key={model._id}
                      className={`search-dropdown-lists__item ${selection.model && selection.model._id === model._id ? "selected" : ""}`}
                      onClick={() => {
                        handleSelection("model", model);
                      }}
                    >
                      {model.name} <BsArrowRight />
                    </List.Item>
                  ))}
                </List>
              </>
              ) }
              {popularModels.length > 0 && <Title order={5} my="sm" fw={600}>Others</Title>}
              {otherModels.length > 0 ? (
                <List className="search-dropdown-lists" listStyleType="none">
                  {otherModels.map((model) => (
                    <List.Item
                      key={model._id}
                      className={`search-dropdown-lists__item ${selection.model && selection.model._id === model._id ? "selected" : ""}`}
                      onClick={() => {
                        handleSelection("model", model);
                      }}
                    >
                      {model.name} <BsArrowRight />
                    </List.Item>
                  ))}
                </List>
              ) : (
                <NoResultsMessage text="No other models found" />
              )}
            </ScrollArea>
          </Grid.Col>
        )}
        {visibleColumns.variant && (
          <Grid.Col span={12 / totalVisibleColumns} p="md" pt="xl" className="border-end">
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
                rangeVarients ? (
                  varientsInRangeLoading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                      <Loader size="md" />
                    </div>
                  ) : varientsInRange?.data && varientsInRange.data.length > 0 ? (
                    <List className="search-dropdown-lists" listStyleType="none">
                      {Object.entries(
                        varientsInRange.data.reduce((acc, variant) => {
                          acc[variant.yearRange] = acc[variant.yearRange] || [];
                          acc[variant.yearRange].push(variant);
                          return acc;
                        }, {})
                      ).map(([yearRange, variants]) => (
                        <React.Fragment key={yearRange}>
                          <strong>{yearRange}</strong>
                          {variants.map((variant) => (
                            <List.Item
                              key={variant.id}
                              className={`search-dropdown-lists__item ${selection.variant && selection.variant.id === variant.id ? "selected" : ""}`}
                              onClick={() => {
                                handleSelection("variant", variant);
                              }}
                            >
                              <div>
                                <div>{variant.variant}</div>
                                <div style={{ fontSize: 12, color: "#888" }}>
                                  {variant.engine && <span>{variant.engine}</span>}
                                  {variant.transmission && <span> | {variant.transmission}</span>}
                                  {variant.fuelType && <span> | {variant.fuelType}</span>}
                                </div>
                              </div>
                              <BsArrowRight />
                            </List.Item>
                          ))}
                        </React.Fragment>
                      ))}
                    </List>
                  ) : (
                    <NoResultsMessage text="No range variants found" />
                  )
                ) : (
                  filteredVariants.length > 0 ? (
                    <List className="search-dropdown-lists" listStyleType="none">
                      {filteredVariants.map((variant) => (
                        <List.Item
                          key={variant._id}
                          className={`search-dropdown-lists__item ${selection.variant && selection.variant._id === variant._id ? "selected" : ""}`}
                          onClick={() => {
                            handleSelection("variant", variant);
                          }}
                        >
                          {variant.name} <BsArrowRight />
                        </List.Item>
                      ))}
                    </List>
                  ) : (
                    <NoResultsMessage text={`No variants found matching "${variantSearch}"`} />
                  )
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
