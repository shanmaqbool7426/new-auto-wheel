"use client";
import React, { useState, useRef } from "react";
import {
  Box,
  Table,
  Title,
  Tabs,
  Button,
  Anchor,
  Flex,
  Text,
  Image,
  Rating,
  Group,
  rem,
  Paper,
} from "@mantine/core";
import { SpecificationIcon } from "@/components/Icons";
import { GetColor } from "@/constants/colors";
import { Carousel } from "@mantine/carousel";
import EditorRenderer from "@/components/EditorRenderer";

const FullSpecifications = ({ vehicle }) => {
  const { vehicleDetails, averageRating = 0 } = vehicle || {};
  const [expanded, setExpanded] = useState({});
  const GreenTick = () => (
    <svg
      width="16"
      height="12"
      viewBox="0 0 16 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.55097 10.9466L0.586967 6.20057C0.516364 6.13444 0.460084 6.05453 0.421609 5.96577C0.383133 5.87702 0.363281 5.78131 0.363281 5.68458C0.363281 5.58784 0.383133 5.49213 0.421609 5.40338C0.460084 5.31462 0.516364 5.23471 0.586967 5.16858L1.66297 4.13958C1.80924 4.00226 2.00234 3.92583 2.20297 3.92583C2.4036 3.92583 2.59669 4.00226 2.74297 4.13958L6.08697 7.33457L13.25 0.491575C13.3962 0.354262 13.5893 0.277832 13.79 0.277832C13.9906 0.277832 14.1837 0.354262 14.33 0.491575L15.41 1.52357C15.4806 1.5897 15.5368 1.66962 15.5753 1.75838C15.6138 1.84713 15.6337 1.94284 15.6337 2.03958C15.6337 2.13631 15.6138 2.23202 15.5753 2.32077C15.5368 2.40953 15.4806 2.48944 15.41 2.55557L6.63097 10.9466C6.48469 11.0839 6.2916 11.1603 6.09097 11.1603C5.89034 11.1603 5.69724 11.0839 5.55097 10.9466Z"
        fill="#1BC744"
      />
    </svg>
  );
  // Helper function to format value based on type
  const formatValue = (value) => {
    if (typeof value === "boolean") return value ? <GreenTick /> : "-";
    if (value === null || value === undefined || value === "") return "-";
    return value;
  };

  // Helper function to generate fields from nested object
  const generateFields = (obj, parentKey = "") => {
    if (!obj) return [];
    return Object.entries(obj).reduce((acc, [key, value]) => {
      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        return [...acc, ...generateFields(value, `${parentKey}${key}_`)];
      }
      // Skip arrays and empty/null values
      if (!Array.isArray(value)) {
        return [
          ...acc,
          {
            label: key
              .split(/(?=[A-Z])/)
              .join(" ")
              .replace(/_/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase()),
            value: formatValue(value),
          },
        ];
      }
      return acc;
    }, []);
  };

  // Dynamically generate specifications mapping
  const generateSpecificationsMapping = () => {
    const mapping = {};
    const excludeKeys = [
      "_id",
      "__v",
      "createdAt",
      "updatedAt",
      "slug",
      "reviews",
      "images",
      "defaultImage",
      "Info",
      "reviewsIds",
      "pros",
      "cons",
      "views",
      "colorsAvailable",
      "description",
      "bodyType",
      "type",
      "releaseDate",
      
      "make",
      "model",
      "variant",
      "year",
    ];

    Object.entries(vehicleDetails || {}).forEach(([key, value]) => {
      if (
        !excludeKeys.includes(key) &&
        typeof value === "object" &&
        value !== null
      ) {
        mapping[key] = {
          title: key
            .split(/(?=[A-Z])/)
            .join(" ")
            .replace(/\b\w/g, (l) => l.toUpperCase()),
          icon: key.toLowerCase(),
          fields: generateFields(value),
        };
      }
    });

    // Ensure 'overview' is first
    const overview = {
      title: "Overview",
      fields: [
        { label: "Make", value: vehicleDetails?.make || "-" },
        { label: "Model", value: vehicleDetails?.model || "-" },
        { label: "Variant", value: vehicleDetails?.variant || "-" },
        { label: "Year", value: vehicleDetails?.year || "-" },
        {
          label: "Type",
          value:
            vehicleDetails?.type?.charAt(0).toUpperCase() +
              vehicleDetails?.type?.slice(1) || "-",
        },
        {
          label: "Price",
          value:
            `$${vehicleDetails?.price?.toLocaleString()}` ||
            "-",
        },
        {
          label: "Rating",
          value: (
            <Flex align="center" gap="3">
              <Rating value={averageRating} readOnly count={5} />
              <Text span inherit className="text-bold">
                {averageRating || 0}
              </Text>
            </Flex>
          ),
        },
        {
          label: "Available Colors",
          value: (
            <Group>
              {vehicleDetails?.colorsAvailable?.map((color, index) => (
                <Button
                  key={index}
                  size="xs"
                  radius="xl"
                  bd="1px solid #EEE"
                  bg={GetColor(color)}
                />
              ))}
            </Group>
          ),
        },
        // Dynamic overview fields based on vehicle type
        ...(vehicleDetails?.dimensions
          ? [
              {
                label: "Dimensions",
                value: `${vehicleDetails.dimensions.overallLength || "-"} L x ${
                  vehicleDetails.dimensions.overallWidth || "-"
                } W x ${vehicleDetails.dimensions.overallHeight || "-"} H`,
              },
            ]
          : []),
        ...(vehicleDetails?.engine
          ? [
              {
                label: "Engine",
                value: `${vehicleDetails.engine.displacement || "-"} cc`,
              },
            ]
          : []),
        ...(vehicleDetails?.transmission
          ? [
              {
                label: "Transmission",
                value:
                  typeof vehicleDetails.transmission === "object"
                    ? vehicleDetails.transmission.type
                    : vehicleDetails.transmission,
              },
            ]
          : []),
        ...(vehicleDetails?.safety
          ? [
              { label: "Airbags", value: vehicleDetails.safety.airbags || "-" },
              { label: "ABS", value: vehicleDetails.safety.abs ? "Yes" : "No" },
            ]
          : []),
      ],
    };

    return { overview, ...mapping };
  };

  const specificationsMapping = generateSpecificationsMapping();

  const toggleExpanded = (tab) => {
    setExpanded((prev) => ({ ...prev, [tab]: !prev[tab] }));
  };

  const tabRefs = Object.keys(specificationsMapping).reduce((acc, key) => {
    acc[key] = useRef(null);
    return acc;
  }, {});

  const handleTabSelect = (key) => {
    tabRefs[key].current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <Box h={rem(178)} bg="#E90808B2" />
      <Box className="container-xl" mt={rem(-80)}>
        <Paper shadow="0px 4px 20px 0px #00000014" py={rem(24)} px={rem(16)}>
          <Box className="row">
            <Box className="col-12">
              <Title size={rem(26)} mb={rem(24)}>
                {`${vehicleDetails?.make} ${vehicleDetails?.model} ${vehicleDetails?.variant} Specifications`}
              </Title>
            </Box>
            <Box className="col-xl-3">
              <Flex
                gap="lg"
                direction="column"
                className="border p-4"
                style={{ borderRadius: rem(5) }}
              >
                <Image
                  src={vehicleDetails?.defaultImage || "/default-image.jpg"}
                  alt={`${vehicleDetails?.make} ${vehicleDetails?.model}`}
                  width={180}
                  height={100}
                />
                <Button
                  color="red"
                  variant="outline"
                  radius={rem(5)}
                  size="md"
                  fw={500}
                >
                  Used {vehicleDetails?.make}{" "}
                  {vehicleDetails?.type === "car"
                    ? "Cars"
                    : vehicleDetails?.type === "bike"
                    ? "Bikes"
                    : "Vehicles"}
                </Button>
              </Flex>
            </Box>
            <Box className="col-xl-8">
              <Text size="sm" c="dimmed">
                {<EditorRenderer  data={JSON.parse(vehicleDetails?.description)} /> ||
                  `Explore detailed specifications of the ${vehicleDetails?.make} ${vehicleDetails?.model} ${vehicleDetails?.variant}.`}
              </Text>
{/* <EditorRenderer data={JSON.parse(vehicleDetails?.description)} /> */}
</Box>
          </Box>
        </Paper>

        <Paper
          shadow="0px 4px 20px 0px #00000014"
          bg="#F3F3F3"
          className="overflow-auto tabs-scroller"
          style={{ scrollbarWidth: "none" }}
        >
          <Tabs
            keepMounted={false}
            variant="default"
            color="red"
            defaultValue="overview"
            onTabChange={handleTabSelect}
          >
            <Tabs.List styles={{ list: { flexWrap: "nowrap", gap: 0 } }}>
              {Object.keys(specificationsMapping).map((key) => (
                <Tabs.Tab key={key} value={key} py={12} styles={{}}>
                  {specificationsMapping[key].title}
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs>
        </Paper>
      </Box>
      <Box className="container-xl">
        <Box className="row">
          <Box className="col-12">
            {" "}
            {Object.keys(specificationsMapping).map((key, index) => {
              const tabData = specificationsMapping[key];
              const visibleFields = expanded[key]
                ? tabData?.fields
                : tabData?.fields.slice(0, 4);

              return (
                <div
                  key={key}
                  ref={tabRefs[key]}
                  style={{ paddingTop: "20px", paddingBottom: "20px" }}
                >
                  {index < 2 && (
                    <Title order={3} mb="md">
                      {index === 0 ? "Overview" : "Key Features & Specs"}
                    </Title>
                  )}
                  <Table
                    mb="lg"
                    borderColor="hsla(0, 0%, 95%, 1)"
                    withTableBorder
                    withColumnBorders
                    verticalSpacing="md"
                    horizontalSpacing="md"
                  >
                    <Table.Tbody>
                      {tabData.icon && key !== "overview" && (
                        <Table.Tr>
                          <Table.Td bg="white" colSpan={2}>
                            <Flex align="center" gap="md">
                              <SpecificationIcon specKey={tabData.icon} />
                              <Title order={3}>{tabData?.title}</Title>
                            </Flex>
                          </Table.Td>
                        </Table.Tr>
                      )}
                      {visibleFields.map((field, index) => (
                        <Table.Tr key={index}>
                          <Table.Td
                            fw={600}
                            size="md"
                            c="dimmed"
                            className="border-end-0"
                            style={{ width: '40%' }}
                          >
                            {field.label}
                          </Table.Td>
                          <Table.Td style={{ width: '60%', textAlign: 'center' }}>
                            {field.value}
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                  {tabData?.fields.length > 4 && (
                    <Button
                      onClick={() => toggleExpanded(key)}
                      className="py-10"
                      color="red"
                      variant="subtle"
                      fullWidth
                    >
                      {expanded[key] ? "View Less ▲" : "View More ▼"}
                    </Button>
                  )}
                </div>
              );
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default FullSpecifications;
