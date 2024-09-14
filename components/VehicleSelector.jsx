"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { fetchMakesByTypeServer } from "@/actions/index";
import { Flex, Group, SegmentedControl } from '@mantine/core';

const VehicleSelector = () => {
    const typeMapping = {
        cars: 'car',
        bikes: 'bike',
        trucks: 'truck',
    };

    const [makes, setMakes] = useState([]);
    const [variants, setVariants] = useState([]); // Variants for the selected model
    const [filters, setFilters] = useState({
        type: 'cars',
        make: '',
        model: '',
        variant: ''
    });

    // Fetch makes based on the selected vehicle type
    const fetchMakes = useCallback(async () => {
        setFilters(prevFilters => ({
            ...prevFilters,
            make: '',
            model: '',
            variant: ''
        }));
        const data = await fetchMakesByTypeServer(typeMapping[filters.type]);
        setMakes(data);
    }, [filters.type]);

    // Update the variants when a model is selected
    const handleModelChange = useCallback((value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            model: value,
            variant: '' // Reset variant when model changes
        }));

        const selectedMake = makes?.data?.find(make => make.name.toLowerCase() === filters.make);
        const selectedModel = selectedMake?.models.find(model => model.name.toLowerCase() === value);
        
        // Set the variants array for the selected model
        setVariants(selectedModel?.variants || []);
    }, [filters.make, makes]);

    // Handle filter change for make and variant
    const handleFilterChange = useCallback((field, value) => {
        setFilters(prevFilters => {
            if (field === 'make') {
                // Reset model and variant when make is changed
                return {
                    ...prevFilters,
                    make: value,
                    model: '',
                    variant: ''
                };
            } else if (field === 'model') {
                // Reset variant when model is changed
                return {
                    ...prevFilters,
                    model: value,
                    variant: ''
                };
            } else {
                // For variant or other fields, just update the value
                return {
                    ...prevFilters,
                    [field]: value
                };
            }
        });
    }, []);

    useEffect(() => {
        fetchMakes();
    }, [fetchMakes]);

    return (
        <div>
            <Group>
                {/* Dropdown for selecting Make */}
                <Flex direction="column" w='32%' gap="5">
                    <SegmentedControl
                        orientation="vertical" fullWidth
                        value={filters.make}
                        onChange={(value) => handleFilterChange('make', value)}
                        data={makes?.data?.map(make => ({
                            value: make.name.toLowerCase(),
                            label: make.name
                        })) || []}
                    />
                </Flex>

                {/* Dropdown for selecting Model */}
                <Flex direction="column" w='32%' gap="5">
                    {filters.make &&
                        <SegmentedControl
                            orientation="vertical" fullWidth
                            value={filters.model}
                            onChange={(value) => handleModelChange(value)}
                            data={filters.make
                                ? makes?.data?.find(make => make.name.toLowerCase() === filters.make)?.models.map(model => ({
                                    value: model.name.toLowerCase(),
                                    label: model.name
                                })) || []
                                : []
                            }
                        />
                    }
                </Flex>

                {/* Dropdown for selecting Variant */}
                <Flex direction="column" w='32%' gap="5">
                    {filters.model && variants.length > 0 &&
                        <SegmentedControl
                            orientation="vertical" fullWidth
                            value={filters.variant}
                            onChange={(value) => handleFilterChange('variant', value)}
                            data={variants.map(variant => ({
                                value: variant.toLowerCase(),
                                label: variant
                            })) || []}
                        />
                    }
                </Flex>
            </Group>
        </div>
    );
};

export default VehicleSelector;
