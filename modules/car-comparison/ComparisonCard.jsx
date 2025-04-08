// ComparisonCard.jsx
import React from "react";
import {
    Card,
    Flex,
    Image,
    Text,
    Anchor,
    Box,
    Center,
} from "@mantine/core";
import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";
import styles from './ComparisonCard.module.css';
import { IconSmbolAngleDown, IconCloseCompCard } from "@/components/Icons";

const ComparisonCard = ({ vehicle, onRemove, onClick }) => {
    return (
        <Card className={styles.compCard} withBorder shadow="none">
            {/* {vehicle._id && <CloseButton ml="auto" />} */}
            <Flex direction="column" gap="5" align="center">
                <Image h={120}
                    w={120}
                    mb="xs"
                    className="img-fluid mx-auto" alt={`Compare ${vehicle.make}`} src={vehicle.defaultImage || "/compare/compare-car.svg"} />
                <Text className="text-primary" fw={400} size="14px">
                    {`${vehicle.make} ${vehicle.model}`}
                </Text>
                {/* <Text c="dimmed" mb="md">
                    {
                        vehicle.make &&
                        `${vehicle.make} ${vehicle.model} ${vehicle.variant}` ||
                        `Add Vehicle`
                    }
                </Text> */}
                <Box className={styles.compButton} onClick={onClick}>
                    {vehicle.make && `${vehicle.variant}` || ""}
                    <IconSmbolAngleDown />
                </Box>
                {/* <Input value={vehicle.make && `${vehicle.make} ${vehicle.model} ${vehicle.variant}` || ""} placeholder="Please Select Vehicle" /> */}
                {vehicle.engine && (
                    <Text size="14px" c={'#333'} mt="12px">
                        {`${vehicle.engine?.displacement || ''} cc | ${vehicle.engine.type || ''} | ${vehicle.transmission.type || vehicle.transmission || 'N/A'}`}
                    </Text>
                )}
                {/* {vehicle.minPrice && (
                    <Text lh="1" fw={700} size="20px" mt="12px">
                        {`$${vehicle.minPrice} - $${vehicle.maxPrice}`}
                    </Text>
                )} */}
                {vehicle._id &&
                    <Anchor component={Link} href={`/listing/cars/search/-/mk_${vehicle.make}/md_${vehicle.model}/`} size="12px" lh="1" mt="12px" className="text-primary">
                        <Center inline>
                            <Box mr={5}>Buy Used {`${vehicle.make} ${vehicle.model}`}</Box>
                            <IconArrowUpRight style={{ width: "16px", height: "16px" }} />
                        </Center>
                    </Anchor>
                }
            </Flex>
            <Box className={styles.closeButton}
                onClick={(e) => {
                    e.stopPropagation();
                    onRemove();
                }}
                >
                <IconCloseCompCard />
            </Box>
        </Card>
    );
};

export default ComparisonCard;
