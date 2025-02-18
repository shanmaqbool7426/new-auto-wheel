// VehicleComparisonLabels.jsx
import React from "react";
import { Box, Button, Card } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import Link from "next/link";
import styles from "./VehicleComparisonLabels.module.css";
import { useHash } from "@/utils/useHash";

const VehicleComparisonLabels = ({ labels }) => {
    const hash = useHash();
    return (
        <Card shadow="lg" padding="0" bg="#f3f3f3">
            <Box className="car-detail-lists">
                <Carousel withIndicators={false} withControls={false} draggable={true} slideSize="5%" slideGap="0" align="start" slidesToScroll={7} classNames={{ slide: styles.slide }}>
                    {labels.map((item, index) => (
                        <Carousel.Slide key={index}>
                            <Button
                                component={Link}
                                href={item.href}
                                variant="transparent"
                                className={`${styles.slideLabel} ${
                                    hash === item.href ? styles.active : ''
                                }`}
                            >
                                {item.name}
                            </Button>
                        </Carousel.Slide>
                    ))}
                </Carousel>
            </Box>
        </Card>
    );
};

export default VehicleComparisonLabels;
