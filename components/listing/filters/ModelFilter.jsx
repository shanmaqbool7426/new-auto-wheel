import React from 'react';
import { Accordion, Input, ScrollArea, Box, Checkbox, Badge, Text } from '@mantine/core';
import { CiSearch } from "react-icons/ci";

const ModelFilter = ({ 
  search, 
  setSearch, 
  filters, 
  handleFilterChange, 
  getModelsByMakes,
  decodedFilterModel,
  getCountByTypeAndKey 
}) => {
  const models = getModelsByMakes();

  return (
    <Accordion
      variant="contained"
      mb="lg"
      defaultValue="Model"
      transitionDuration={500}
    >
      <Accordion.Item
        value="Model"
        style={{ background: "white", borderColor: "#E3E3E3" }}
      >
        <Accordion.Control>
          <Text size="sm" fw={500}>Model</Text>
        </Accordion.Control>
        <Accordion.Panel pt="sm">
          <Input
            size="sm"
            leftSection={<CiSearch />}
            placeholder="eg. Civic"
            value={search.model}
            onChange={(e) =>
              setSearch((prevSearch) => ({
                ...prevSearch,
                model: e.target.value,
              }))
            }
            mb="md"
          />
          <ScrollArea
            h={130}
            scrollbarSize={6}
            scrollHideDelay={1000}
            offsetScrollbars
          >
            <div className="checkbox-group-filters">
              {models.map((model) => (
                <Box pos="relative" key={model._id}>
                  <Checkbox
                    mb="xs"
                    size="xs"
                    color="#E90808"
                    label={model.name}
                    checked={decodedFilterModel.includes(model.name.toLowerCase())}
                    onChange={(e) =>
                      handleFilterChange(
                        "model",
                        model.name.toLowerCase(),
                        e.target.checked
                      )
                    }
                  />
                  {getCountByTypeAndKey("modelCounts", model.name) && (
                    <Badge
                      pos="absolute"
                      right={0}
                      top={0}
                      color="#706f6f"
                      size="md"
                      fw={600}
                      variant="outline"
                    >
                      {getCountByTypeAndKey("modelCounts", model.name)}
                    </Badge>
                  )}
                </Box>
              ))}
            </div>
          </ScrollArea>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default ModelFilter; 