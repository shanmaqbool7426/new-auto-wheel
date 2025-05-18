import React from 'react';
import { Accordion, Input, ScrollArea, Box, Checkbox, Badge, Text } from '@mantine/core';
import { CiSearch } from "react-icons/ci";

const VariantFilter = ({ 
  search, 
  setSearch, 
  filters, 
  handleFilterChange, 
  getVariantsByModels,
  decodedFilterVariant,
  getCountByTypeAndKey 
}) => {
  const variants = getVariantsByModels();

  return (
    <Accordion
      variant="contained"
      mb="lg"
      defaultValue="Variant"
      transitionDuration={500}
    >
      <Accordion.Item
        value="Variant"
        style={{ background: "white", borderColor: "#E3E3E3" }}
      >
        <Accordion.Control>
          <Text size="sm" fw={500}>Variant</Text>
        </Accordion.Control>
        <Accordion.Panel pt="sm">
          <Input
            size="sm"
            leftSection={<CiSearch />}
            placeholder="eg. 1.5L VTi"
            value={search.variant}
            onChange={(e) =>
              setSearch((prevSearch) => ({
                ...prevSearch,
                variant: e.target.value,
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
              {variants.map((variant) => (
                <Box pos="relative" key={variant._id}>
                  <Checkbox
                    mb="xs"
                    size="xs"
                    color="#E90808"
                    label={variant.name}
                    checked={decodedFilterVariant.includes(variant.name.toLowerCase())}
                    onChange={(e) =>
                      handleFilterChange(
                        "variant",
                        variant.name.toLowerCase(),
                        e.target.checked
                      )
                    }
                  />
                  {typeof getCountByTypeAndKey("variantCounts", variant.name) !== "undefined" &&
                    getCountByTypeAndKey("variantCounts", variant.name) !== null && (
                      <Badge
                        pos="absolute"
                        right={0}
                        top={0}
                        color="#706f6f"
                        size="md"
                        fw={600}
                        variant="outline"
                      >
                        {getCountByTypeAndKey("variantCounts", variant.name)}
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

export default VariantFilter; 