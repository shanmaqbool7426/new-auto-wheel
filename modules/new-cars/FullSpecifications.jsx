import React, { useState, useRef } from 'react'
import { Box, Table, Title, Tabs, Button, Anchor, Flex } from "@mantine/core";
import { AirBags, DimensionIcon, FuelTank, SpecificationIcon, TransmissionIcon } from "@/components/Icons";
const FullSpecifications = ({ vehicle }) => {
    const { vehicleDetails } = vehicle || {};
    const [expanded, setExpanded] = useState({
        overview: false,
        dimensions: false,
        engine: false,
        transmission: false,
        safety: false,
        wheels: false
    });

    const toggleExpanded = (tab) => {
        setExpanded((prev) => ({ ...prev, [tab]: !prev[tab] }));
    };
    const tabRefs = {
        overview: useRef(null),
        dimensions: useRef(null),
        engine: useRef(null),
        transmission: useRef(null),
        safety: useRef(null),
        wheels: useRef(null),
    };
    const handleTabSelect = (key) => {
        tabRefs[key].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    const specificationsMapping = {
        overview: {
            title: "Overview",
            fields: [
                { label: "Size", value: (data) => `${data?.dimensions?.overallLength || '-'} L x ${data?.dimensions?.overallWidth || '-'} W x ${data?.dimensions?.overallHeight || '-'} H` },
                { label: "Mileage", value: (data) => `${data?.mileage?.city || '-'} - ${data?.mileage?.highway || '-'} Km/l` },
                { label: "Engine", value: (data) => `${data?.engine?.displacement || '-'} cc` },
                { label: "No. of Airbags", value: (data) => data?.safety?.airbags || '-' },
                { label: "User Rating", value: (data) => data?.userRating || "3.5" },
                { label: "Transmission", value: (data) => data?.transmission?.type || '-' },
                { label: "Anti-lock Braking System", value: (data) => data?.safety?.abs ? "Yes" : "No" },
                { label: "Trunk Space", value: (data) => `${data?.dimensions?.bootSpace || '-'} L` },
                { label: "Brochure", value: (data) => <Anchor href={data?.brochureLink} target="_blank"><Button color="red" variant="outline" radius="md">Download Brochure</Button></Anchor> }
            ]
        },
        dimensions: {
            title: "Dimensions",
            icon: "dimension",
            fields: [
                { label: "Overall Length", value: (data) => data?.dimensions?.overallLength || '-' },
                { label: "Overall Width", value: (data) => data?.dimensions?.overallWidth || '-' },
                { label: "Overall Height", value: (data) => data?.dimensions?.overallHeight || '-' },
                { label: "Wheel Base", value: (data) => data?.dimensions?.wheelBase || '-' },
                { label: "Boot Space", value: (data) => data?.dimensions?.bootSpace || '-' },
                { label: "Kerb Weight", value: (data) => data?.dimensions?.kerbWeight || '-' },
                { label: "Ground Clearance", value: (data) => data?.dimensions?.groundClearance || '-' },
            ]
        },
        engine: {
            title: "Engine & Performance",
            icon: "engine",
            fields: [
                { label: "Engine Type", value: (data) => data?.engine?.type || '-' },
                { label: "Displacement", value: (data) => `${data?.engine?.displacement || '-'} cc` },
                { label: "Horsepower", value: (data) => data?.engine?.horsepower || '-' },
                { label: "Torque", value: (data) => data?.engine?.torque || '-' },
                { label: "Max Speed", value: (data) => data?.engine?.maxSpeed || '-' },
                { label: "Compression Ratio", value: (data) => data?.engine?.compressionRatio || '-' },
                { label: "Valve Mechanism", value: (data) => data?.engine?.valveMechanism || '-' },
            ]
        },
        transmission: {
            title: "Transmission",
            icon: "transmission",
            fields: [
                { label: "Transmission Type", value: (data) => data?.transmission?.type || '-' },
                { label: "CVT", value: (data) => data?.transmission?.cvt ? "Yes" : "No" }
            ]
        },
        safety: {
            title: "Safety",
            icon: "safety",
            fields: [
                { label: "No. of Airbags", value: (data) => data?.safety?.airbags || '-' },
                { label: "ABS", value: (data) => data?.safety?.abs ? "Yes" : "No" },
                { label: "Traction Control", value: (data) => data?.safety?.tractionControl ? "Yes" : "No" },
                { label: "Hill Assist", value: (data) => data?.safety?.hillAssist ? "Yes" : "No" },
            ]
        },
        wheels: {
            title: "Wheels & Tyres",
            icon: "wheel",
            fields: [
                { label: "Wheel Type", value: (data) => data?.wheelsAndTyres?.wheelType || '-' },
                { label: "Tyre Size", value: (data) => data?.wheelsAndTyres?.tyreSize || '-' }
            ]
        }
    };

    return (
        <div>
            {/* Header Section */}
            <Box
                style={{
                    backgroundColor: 'rgba(233, 8, 8, 0.8)',
                    padding: '30px 0', // Adjust padding to reduce top space
                    borderRadius: '8px 8px 0 0',
                    border: '2px solid #E90808', // Match the border color
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Optional shadow for a card effect
                    position: 'relative', // Keep the header positioned relative
                }}
            >
                <Box className="container absolute bottom-[0]" style={{ maxWidth: '960px', margin: '0 auto', backgroundColor: 'white', padding: '20px', borderRadius: '4px' }}>
                    <Flex gap="md" align="center" justify="space-between">
                        {/* Image Container */}
                        <Box style={{ flex: '0 0 250px', textAlign: 'center' }}>
                            <Image
                                src={defaultImage || '/default-image.jpg'}
                                alt="Vehicle image"
                                width={220} // Adjusted width
                                height={150} // Adjusted height to keep the aspect ratio
                                radius="md"
                                style={{ margin: 'auto' }}
                            />
                            <Button mt="md" color="red" variant="outline" radius="md" style={{ marginTop: '15px' }}>
                                Used Toyota Cars
                            </Button>
                        </Box>

                        {/* Text Information */}
                        <Box style={{ flex: '1', paddingLeft: '20px' }}>
                            <Title order={2} color="black" style={{ fontSize: '24px', marginBottom: '10px' }}>
                                {`${make} ${model} ${variant} Specifications`}
                            </Title>
                            <Text size="sm" color="dimmed">
                                The prices of a Toyota car in Pakistan start from PKR {minPrice.toLocaleString()} for a new Toyota Yaris to PKR {maxPrice.toLocaleString()} for a Toyota Land Cruiser. Toyota cars are also widely available in used conditions starting from lower prices. Explore a wide variety of options to find your perfect fit.
                            </Text>
                        </Box>
                    </Flex>
                </Box>
            </Box>

            {/* Specifications Section */}
            <Box component="section" py="xl" className="container-xl">
                <Tabs variant='pills' color='red' defaultValue="overview" onTabChange={handleTabSelect}>
                    <Tabs.List>
                        {Object.keys(specificationsMapping).map((key) => (
                            <Tabs.Tab
                                key={key} value={key} onClick={() => handleTabSelect(key)}>
                                {specificationsMapping[key].title}
                            </Tabs.Tab>
                        ))}
                    </Tabs.List>

                    {/* Display all tab panels and set refs to them */}
                    {Object.keys(specificationsMapping).map((key, index) => {
                        const tabData = specificationsMapping[key];
                        const visibleFields = expanded[key] ? tabData?.fields : tabData?.fields.slice(0, 4);

                        return (
                            <div key={key} ref={tabRefs[key]} style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                                {index < 2 && <Title order={3} mb="md">
                                    {index == 0 ? "Overview" : "Key Features & Specs"}
                                </Title>}
                                <Table striped withTableBorder highlightOnHover verticalSpacing="md" horizontalSpacing="md">
                                    <Table.Tbody>
                                        {tabData.icon && <>
                                            <Table.Tr>
                                                <Table.Td bg="white">
                                                    <Flex align="center" gap="md">
                                                        <SpecificationIcon specKey={tabData.icon} /><Title order={3}>
                                                            {tabData?.title}
                                                        </Title>
                                                    </Flex>
                                                </Table.Td>
                                            </Table.Tr>
                                        </>}
                                        {visibleFields.map((field, index) => (
                                            <Table.Tr key={index}>
                                                <Table.Td>{field.label}</Table.Td>
                                                <Table.Td>{typeof field.value === "function" ? field.value(vehicleDetails) : field.value}</Table.Td>
                                            </Table.Tr>
                                        ))}
                                    </Table.Tbody>
                                </Table>
                                {tabData?.fields.length > 4 && (
                                    <Button
                                        onClick={() => toggleExpanded(key)}
                                        className='py-10'
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
                </Tabs>
            </Box>
            {/* <Tabs defaultValue="overview">
      <Tabs.List>
        {Object.keys(specificationsMapping).map((key) => (
          <Tabs.Tab key={key} value={key}>
            {specificationsMapping[key].title}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {Object.keys(specificationsMapping).map((key) => {
        const tabData = specificationsMapping[key];
        const visibleFields = expanded[key] ? tabData?.fields : tabData?.fields.slice(0, 4);

        return (
          <Tabs.Panel key={key} value={key} pt="xs">
            <Title order={3} mb="md">
              {tabData?.title}
            </Title>
            <Table striped withTableBorder  highlightOnHover verticalSpacing="md" horizontalSpacing="md">
              <Table.Tbody>
                {visibleFields.map((field, index) => (
                  <Table.Tr key={index}>
                    <Table.Td>{field.label}</Table.Td>
                    <Table.Td>{typeof field.value === "function" ? field.value(vehicleDetails) : field.value}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
            {tabData?.fields.length > 4 && (
              <Button
                onClick={() => toggleExpanded(key)}
                mt="md"
                color="red"
                variant="outline"
                fullWidth
              >
                {expanded[key] ? "View Less ▲" : "View More ▼"}
              </Button>
            )}
          </Tabs.Panel>
        );
      })}
    </Tabs> */}
        </div>
    )
}

export default FullSpecifications
