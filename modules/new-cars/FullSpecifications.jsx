"use client"
import React, { useState, useRef } from 'react'
import { Box, Table, Title, Tabs, Button, Anchor, Flex, Text, Image, Rating, Group } from "@mantine/core";
import { SpecificationIcon } from "@/components/Icons";
import { GetColor } from '@/constants/colors';

const FullSpecifications = ({ vehicle }) => {
    const { vehicleDetails ,averageRating = 0} = vehicle || {};
    const [expanded, setExpanded] = useState({});
    const GreenTick = () => (
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.55097 10.9466L0.586967 6.20057C0.516364 6.13444 0.460084 6.05453 0.421609 5.96577C0.383133 5.87702 0.363281 5.78131 0.363281 5.68458C0.363281 5.58784 0.383133 5.49213 0.421609 5.40338C0.460084 5.31462 0.516364 5.23471 0.586967 5.16858L1.66297 4.13958C1.80924 4.00226 2.00234 3.92583 2.20297 3.92583C2.4036 3.92583 2.59669 4.00226 2.74297 4.13958L6.08697 7.33457L13.25 0.491575C13.3962 0.354262 13.5893 0.277832 13.79 0.277832C13.9906 0.277832 14.1837 0.354262 14.33 0.491575L15.41 1.52357C15.4806 1.5897 15.5368 1.66962 15.5753 1.75838C15.6138 1.84713 15.6337 1.94284 15.6337 2.03958C15.6337 2.13631 15.6138 2.23202 15.5753 2.32077C15.5368 2.40953 15.4806 2.48944 15.41 2.55557L6.63097 10.9466C6.48469 11.0839 6.2916 11.1603 6.09097 11.1603C5.89034 11.1603 5.69724 11.0839 5.55097 10.9466Z" fill="#1BC744" />
        </svg>
    );
    // Helper function to format value based on type
    const formatValue = (value) => {
        if (typeof value === 'boolean') return value ? <GreenTick /> : '-';
        if (value === null || value === undefined || value === '') return '-';
        return value;
    };

    // Helper function to generate fields from nested object
    const generateFields = (obj, parentKey = '') => {
        if (!obj) return [];
        return Object.entries(obj).reduce((acc, [key, value]) => {
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                return [...acc, ...generateFields(value, `${parentKey}${key}_`)];
            }
            // Skip arrays and empty/null values
            if (!Array.isArray(value)) {
                return [...acc, {
                    label: key.split(/(?=[A-Z])/).join(' ').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                    value: formatValue(value)
                }];
            }
            return acc;
        }, []);
    };

    // Dynamically generate specifications mapping
    const generateSpecificationsMapping = () => {
        const mapping = {};
        const excludeKeys = ['_id', '__v', 'createdAt', 'updatedAt', 'slug', 'reviews', 'images', 'defaultImage', 'Info', 'reviewsIds', 'pros', 'cons', 'views', 'colorsAvailable', 'description', 'bodyType', 'type', 'releaseDate', 'minPrice', 'maxPrice', 'make', 'model', 'variant', 'year'];

        Object.entries(vehicleDetails || {}).forEach(([key, value]) => {
            if (!excludeKeys.includes(key) && typeof value === 'object' && value !== null) {
                mapping[key] = {
                    title: key.split(/(?=[A-Z])/).join(' ').replace(/\b\w/g, l => l.toUpperCase()),
                    icon: key.toLowerCase(),
                    fields: generateFields(value)
                };
            }
        });

        // Ensure 'overview' is first
        const overview = {
            title: "Overview",
            fields: [
                { label: "Make", value: vehicleDetails?.make || '-' },
                { label: "Model", value: vehicleDetails?.model || '-' },
                { label: "Variant", value: vehicleDetails?.variant || '-' },
                { label: "Year", value: vehicleDetails?.year || '-' },
                { label: "Type", value: vehicleDetails?.type?.charAt(0).toUpperCase() + vehicleDetails?.type?.slice(1) || '-' },
                { label: "Price Range", value: `PKR ${vehicleDetails?.minPrice?.toLocaleString()} - ${vehicleDetails?.maxPrice?.toLocaleString()}` || '-' },
                { 
                    label: "Rating", 
                    value: (
                        <Flex align="center" gap="3">
                            <Rating value={averageRating} readOnly count={5} />
                            <Text span inherit className='text-bold'>{averageRating || 0}</Text>
                        </Flex>
                    ) 
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
                    ) 
                },
                // Dynamic overview fields based on vehicle type
                ...(vehicleDetails?.dimensions ? [
                    { label: "Dimensions", value: `${vehicleDetails.dimensions.overallLength || '-'} L x ${vehicleDetails.dimensions.overallWidth || '-'} W x ${vehicleDetails.dimensions.overallHeight || '-'} H` }
                ] : []),
                ...(vehicleDetails?.engine ? [
                    { label: "Engine", value: `${vehicleDetails.engine.displacement || '-'} cc` }
                ] : []),
                ...(vehicleDetails?.transmission ? [
                    { label: "Transmission", value: typeof vehicleDetails.transmission === 'object' ? vehicleDetails.transmission.type : vehicleDetails.transmission }
                ] : []),
                ...(vehicleDetails?.safety ? [
                    { label: "Airbags", value: vehicleDetails.safety.airbags || '-' },
                    { label: "ABS", value: vehicleDetails.safety.abs ? 'Yes' : 'No' }
                ] : [])
            ]
        };

        return { overview, ...mapping };
    };

    const specificationsMapping = generateSpecificationsMapping();

    const toggleExpanded = (tab) => {
        setExpanded(prev => ({ ...prev, [tab]: !prev[tab] }));
    };

    const tabRefs = Object.keys(specificationsMapping).reduce((acc, key) => {
        acc[key] = useRef(null);
        return acc;
    }, {});

    const handleTabSelect = (key) => {
        tabRefs[key].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div>
            <Box
                style={{
                    backgroundColor: 'rgba(233, 8, 8, 0.8)',
                    padding: '30px 0',
                    borderRadius: '8px 8px 0 0',
                    border: '2px solid #E90808',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                    position: 'relative',
                }}
            >
                <Box className="container absolute bottom-[0]" style={{ maxWidth: '960px', margin: '0 auto', backgroundColor: 'white', padding: '20px', borderRadius: '4px' }}>
                    <Flex gap="md" align="center" justify="space-between">
                        <Box style={{ flex: '0 0 250px', textAlign: 'center' }}>
                            <Image
                                src={vehicleDetails?.defaultImage || '/default-image.jpg'}
                                alt={`${vehicleDetails?.make} ${vehicleDetails?.model}`}
                                width={220}
                                height={150}
                                radius="md"
                                style={{ margin: 'auto' }}
                            />
                            <Button mt="md" color="red" variant="outline" radius="md" style={{ marginTop: '15px' }}>
                                Used {vehicleDetails?.make} {vehicleDetails?.type === 'car' ? 'Cars' : vehicleDetails?.type === 'bike' ? 'Bikes' : 'Vehicles'}
                            </Button>
                        </Box>

                        <Box style={{ flex: '1', paddingLeft: '20px' }}>
                            <Title order={2} color="black" style={{ fontSize: '24px', marginBottom: '10px' }}>
                                {`${vehicleDetails?.make} ${vehicleDetails?.model} ${vehicleDetails?.variant} Specifications`}
                            </Title>
                            <Text size="sm" color="dimmed">
                                {vehicleDetails?.description || `Explore detailed specifications of the ${vehicleDetails?.make} ${vehicleDetails?.model} ${vehicleDetails?.variant}.`}
                            </Text>
                        </Box>
                    </Flex>
                </Box>
            </Box>

            <Box component="section" py="xl" className="container-xl">
                <Tabs variant='pills' color='red' defaultValue="overview" onTabChange={handleTabSelect}>
                    <Tabs.List>
                        {Object.keys(specificationsMapping).map((key) => (
                            <Tabs.Tab key={key} value={key}>
                                {specificationsMapping[key].title}
                            </Tabs.Tab>
                        ))}
                    </Tabs.List>

                    {Object.keys(specificationsMapping).map((key, index) => {
                        const tabData = specificationsMapping[key];
                        const visibleFields = expanded[key] ? tabData?.fields : tabData?.fields.slice(0, 4);

                        return (
                            <div key={key} ref={tabRefs[key]} style={{ paddingTop: "20px", paddingBottom: "20px" }}>
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
                                        {tabData.icon && key !== 'overview' && (
                                            <Table.Tr>
                                                <Table.Td bg="white">
                                                    <Flex align="center" gap="md">
                                                        <SpecificationIcon specKey={tabData.icon} />
                                                        <Title order={3}>{tabData?.title}</Title>
                                                    </Flex>
                                                </Table.Td>
                                            </Table.Tr>
                                        )}
                                        {visibleFields.map((field, index) => (
                                            <Table.Tr key={index}>
                                                <Table.Td fw={600} size="md" c="dimmed" className="border-end-0">{field.label}</Table.Td>
                                                <Table.Td>{field.value}</Table.Td>
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
        </div>
    );
};

export default FullSpecifications;