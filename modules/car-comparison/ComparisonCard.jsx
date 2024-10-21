// ComparisonCard.jsx
import React from "react";
import {
  Card,
  Flex,
  Image,
  Text,
  Select,
  Anchor,
  Box,
  Center,
  CloseButton,
  Input,
} from "@mantine/core";
import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";

const ComparisonCard = ({ vehicle }) => {
    return (
        <Card withBorder radius="sm" padding="lg" shadow="none" className="position-relative">
            {/* <CloseButton ml="auto" /> */}
            <Flex direction="column" gap="5" align="center">
                <Image h={80} mx="auto" alt={`Compare ${vehicle.make}`} src={vehicle.defaultImage || "/compare/compare-car.svg"} />
                <Text className="text-primary" fw={500} size="lg">
                    {`${vehicle.make} ${vehicle.model}`}
                </Text>
                <Text c="dimmed" mb="md">
                    {
                        vehicle.make &&
                        `${vehicle.make} ${vehicle.model} ${vehicle.variant}` ||
                        `Add Vehicle`
                    }
                </Text>
                <Input value={vehicle.make&&`${vehicle.make} ${vehicle.model} ${vehicle.variant}`||""} placeholder="Please Select Vehicle"/>
                {vehicle.engine && <Text>{`${vehicle.engine?.displacement || ''} cc | ${vehicle.fuelAverage || 'N/A'} Km/l | ${vehicle.transmission || 'N/A'}`}</Text>}
                {vehicle.minPrice && <Text fw={700} size="xl">
                    {`Rs ${vehicle.minPrice / 100000} - ${vehicle.maxPrice / 100000} Lacs`}
                </Text>}
                {vehicle.id &&
                    <Anchor component={Link} href="#" size="sm" className="text-primary">
                        <Center inline>
                            <Box mr={5}>Buy Used {`${vehicle.make} ${vehicle.model}`}</Box>
                            <IconArrowUpRight style={{ width: "16px", height: "16px" }} />
                        </Center>
                    </Anchor>
                }
            </Flex>
        </Card>
    );
};

export default ComparisonCard;
