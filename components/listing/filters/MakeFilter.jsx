import React from 'react';
import { Accordion, Input, ScrollArea, Box, Checkbox, Badge, Text, Title } from '@mantine/core';
import { CiSearch } from "react-icons/ci";

const MakeFilter = ({ 
  search, 
  setSearch, 
  filters, 
  handleFilterChange, 
  popularMakes, 
  otherMakes, 
  decodedFilterMake,
  getCountByTypeAndKey 
}) => {
  return (
    <Accordion
      variant="contained"
      mb="lg"
      defaultValue="Make"
      transitionDuration={500}
    >
      <Accordion.Item
        value="Make"
        style={{ background: "white", borderColor: "#E3E3E3" }}
      >
        <Accordion.Control>
          <Text size="sm" fw={500}>Make</Text>
        </Accordion.Control>
        <Accordion.Panel pt="sm">
          <Input
            size="sm"
            leftSection={<CiSearch />}
            placeholder="eg. Honda"
            value={search.make}
            onChange={(e) =>
              setSearch((prevSearch) => ({
                ...prevSearch,
                make: e.target.value,
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
              {popularMakes.length > 0 && (
                <>
                  <Title order={6} mb="xs">Popular</Title>
                  {popularMakes.map((make) => (
                    <Box pos="relative" key={make._id}>
                      <Checkbox
                        mb="xs"
                        size="xs"
                        color="#E90808"
                        label={make.name}
                        checked={decodedFilterMake.includes(make.name.toLowerCase())}
                        onChange={(e) =>
                          handleFilterChange(
                            "make",
                            make.name.toLowerCase(),
                            e.target.checked
                          )
                        }
                      />
                      {getCountByTypeAndKey("makeCounts", make.name) && (
                        <Badge
                          pos="absolute"
                          right={0}
                          top={0}
                          color="#706f6f"
                          size="md"
                          fw={600}
                          variant="outline"
                        >
                          {getCountByTypeAndKey("makeCounts", make.name)}
                        </Badge>
                      )}
                    </Box>
                  ))}
                </>
              )}
              {otherMakes.length > 0 && (
                <>
                  <Title order={6} mb="xs" mt="md">Others</Title>
                  {otherMakes.map((make) => (
                    <Box pos="relative" key={make._id}>
                      <Checkbox
                        mb="xs"
                        size="xs"
                        color="#E90808"
                        label={make.name}
                        checked={decodedFilterMake.includes(make.name.toLowerCase())}
                        onChange={(e) =>
                          handleFilterChange(
                            "make",
                            make.name.toLowerCase(),
                            e.target.checked
                          )
                        }
                      />
                      {getCountByTypeAndKey("makeCounts", make.name) && (
                        <Badge
                          pos="absolute"
                          right={0}
                          top={0}
                          color="#706f6f"
                          size="md"
                          fw={600}
                          variant="outline"
                        >
                          {getCountByTypeAndKey("makeCounts", make.name)}
                        </Badge>
                      )}
                    </Box>
                  ))}
                </>
              )}
            </div>
          </ScrollArea>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default MakeFilter; 