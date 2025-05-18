import React from 'react';
import { Accordion, Input, ScrollArea, Box, Checkbox, Badge, Text } from '@mantine/core';
import { CiSearch } from "react-icons/ci";

const CityFilter = ({ 
  search, 
  setSearch, 
  filters, 
  handleFilterChange, 
  filteredCities, 
  getCountByTypeAndKey 
}) => {
  return (
    <Accordion
      variant="contained"
      mb="lg"
      defaultValue="City"
      transitionDuration={500}
    >
      <Accordion.Item
        value="City"
        style={{ background: "white", borderColor: "#E3E3E3" }}
      >
        <Accordion.Control>
          <Text size="sm" fw={500}>City</Text>
        </Accordion.Control>
        <Accordion.Panel pt="sm">
          <Input
            size="sm"
            leftSection={<CiSearch />}
            placeholder="eg. Sydney"
            value={search.city}
            onChange={(e) =>
              setSearch((prevSearch) => ({
                ...prevSearch,
                city: e.target.value,
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
              {filteredCities?.map((city) => (
                <Box pos="relative" key={city._id}>
                  <Checkbox
                    mb="xs"
                    size="xs"
                    color="#E90808"
                    label={city.name}
                    checked={filters.city.includes(city.slug)}
                    onChange={(e) =>
                      handleFilterChange(
                        "city",
                        city.slug,
                        e.target.checked
                      )
                    }
                  />
               
                  {getCountByTypeAndKey("cityCounts", city.name) > 0 && (
                    <Badge
                      pos="absolute"
                      right={0}
                      top={0}
                      color="#706f6f"
                      size="md"
                      fw={600}
                      variant="outline"
                    >
                      {getCountByTypeAndKey("cityCounts", city.name)}
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

export default CityFilter; 