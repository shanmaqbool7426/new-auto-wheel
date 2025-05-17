import React from 'react';
import { Accordion, ScrollArea, Box, Checkbox, Badge, Text, Group, Button, Tooltip, rem } from '@mantine/core';

const CheckboxFilter = ({
  title,
  options,
  value,
  onChange,
  getCountByTypeAndKey,
  countType,
  isColorFilter = false
}) => {

  if(title === "Fuel Type"){
    console.log(options, "options>>>>>,,,")
  }
  return (
    <Accordion
      variant="contained"
      mb="lg"
      defaultValue={title}
      transitionDuration={500}
    >

      <Accordion.Item
        value={title}
        style={{ background: "white", borderColor: "#E3E3E3" }}
      >
        <Accordion.Control>
          <Text size="sm" fw={500}>{title}</Text>
        </Accordion.Control>
        <Accordion.Panel pt="sm">
          <ScrollArea
            h={options.length > 5 ? 150 : 'auto'}
            scrollbarSize={6}
            scrollHideDelay={1000}
            offsetScrollbars
          >
            <div className="checkbox-group-filters">
              {options?.map((option, index) => (
                <Box pos="relative" key={index}>
                  <Checkbox
                    mb="xs"
                    size="xs"
                    color="#E90808"
                    styles={isColorFilter ? {
                      body: { alignItems: "center" },
                      labelWrapper: { width: "100%" },
                    } : undefined}
                    label={isColorFilter ? (
                      <Group justify="space-between" align="center">
                        <Group gap="sm">
                          <Tooltip
                            label={option.label ? option.label : option.title}
                            position="top"
                            withArrow
                          >

                            <Button
                              p={0}
                              radius={rem(20)}
                              h={rem(20)}
                              w={rem(20)}
                              bg={option.color}
                              style={{
                                border: '1px solid #E3E3E3',
                                boxShadow: option.color.toLowerCase() === '#ffffff' ? '0 0 0 1px #ddd' : 'none'
                              }}
                            />
                          </Tooltip>
                          {option.label ? option.label : option.title}
                        </Group>
                      </Group>
                    ) : option.label ? option.label : option.title}
                    checked={option.value === value}
                    onChange={(e) => onChange(option.value)}
                  />
                  {getCountByTypeAndKey(
                        countType,
                        countType === "conditionCounts" ? option.label : 
                        (countType === "driveCounts" || countType === "transmissionCounts" || countType === "fuelTypeCounts") ? option.label :
                        (isColorFilter ? option.label : option.value)
                      ) && (
                    <Badge
                      pos="absolute"
                      right={0}
                      top={0}
                      color="#706f6f"
                      size="md"
                      fw={600}
                      variant="outline"
                    >
                      {getCountByTypeAndKey(
                        countType,
                        countType === "conditionCounts" ? option.label : 
                        (countType === "driveCounts" || countType === "transmissionCounts" || countType === "fuelTypeCounts") ? option.label :
                        (isColorFilter ? option.label : option.value)
                      )}
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

export default CheckboxFilter; 