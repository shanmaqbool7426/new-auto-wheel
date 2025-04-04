"use client"
import { Box, Button, Select, Title } from '@mantine/core';
import React, { useEffect, useState, useCallback } from 'react';
import { fetchMakesByTypeServer } from "@/actions/index";
import { useRouter } from 'next/navigation';
import { MdArrowDropDown, MdCheckCircle } from "react-icons/md";

const VehicleSearch = () => {
    const router = useRouter();

    const typeMapping = {
        cars: 'car',
        bikes: 'bike',
        trucks: 'truck',
    };

    const [makes, setMakes] = useState([]);
    const [filters, setFilters] = useState({
        type: 'cars',
        make: '',
        model: ''
    });

    // Fetch makes based on the selected vehicle type
    const fetchMakes = useCallback(async () => {
        setFilters(prevFilters => ({
            ...prevFilters,
            make: '',
            model: ''
        }));
        const data = await fetchMakesByTypeServer(typeMapping[filters.type]);
        setMakes(data);
    }, [filters.type]);

    useEffect(() => {
        fetchMakes();
    }, [fetchMakes]);

    const handleFilterChange = useCallback((field, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [field]: value
        }));
    }, []);

    const findNow = () => {
        let query = `/listing/${filters.type}/search/-`;

        if (filters.make) {
            query += `/mk_${encodeURIComponent(filters.make)}`;
        }

        if (filters.model) {
            query += `/md_${encodeURIComponent(filters.model)}`;
        }

        router.push(query, { scroll: false });
    };

    return (
        <Box component='section' className="find-section" py="40px">
            <Box className="container-xl">
                <Box className="row">
                    <Box className="col-12">
                        <Title
                            order={2}
                            pb="24px"
                            mb="32px"
                            className="title-with-border--lg"
                            tt="uppercase"
                            lh="1.153846"
                        >
                            Find whatever you want
                        </Title>
                    </Box>
                    <Box className="col-md-3">
                        <Select
                            size="md"
                            value={filters.type}
                            rightSection={<MdArrowDropDown size={24} color="#E90808" />}

                            onChange={(value) => handleFilterChange('type', value)}
                            placeholder="Select vehicle type"
                            data={[
                                { value: "cars", label: "Car" },
                                { value: "bikes", label: "Bike" },
                                { value: "trucks", label: "Truck" }
                            ]}
                        />
                    </Box>
                    <Box className="col-md-3">
                        <Select
                            size="md"
                            value={filters.make}
                            rightSection={<MdArrowDropDown size={24} color="#E90808" />}
                                
                            onChange={(value) => handleFilterChange('make', value)}
                            placeholder="Choose Make"
                            data={makes?.data?.map(make => ({
                                value: make.name.toLowerCase(),
                                label: make.name
                            })) || []}
                        />
                    </Box>
                    <Box className="col-md-3">
                        <Select
                            size="md"
                            value={filters.model}
                            rightSection={<MdArrowDropDown size={24} color="#E90808" />}

                            onChange={(value) => handleFilterChange('model', value)}
                            placeholder="Choose Model"
                            data={filters.make
                                ? makes?.data?.find(make => make.name.toLowerCase() === filters.make)?.models.map(model => ({
                                    value: model.name.toLowerCase(),
                                    label: model.name
                                })) || []
                                : []
                            }
                        />
                    </Box>
                    <Box className="col-md-3">
                        <Button
                            color="#E90808"
                            autoContrast
                            ff="heading"
                            tt="uppercase"
                            onClick={findNow}
                        >
                            Find Now
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default VehicleSearch;
