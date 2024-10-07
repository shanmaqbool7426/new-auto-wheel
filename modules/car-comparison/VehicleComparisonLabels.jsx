// VehicleComparisonLabels.jsx
import React from "react";
import { Box, Button, Card } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import Link from "next/link";

const VehicleComparisonLabels = ({ labels }) => {
    return (
        <Card shadow="lg" padding="0" bg="#f3f3f3">
            <Box className="car-detail-lists">
                <Carousel withIndicators={false} withControls={false} draggable={true} slideSize="5%" slideGap="0" align="start" slidesToScroll={7}>
                    {labels.map((item, index) => (
                        <Carousel.Slide key={index}>
                            <Button
                                component={Link}
                                href={item.href}
                                variant="transparent"
                                size="md"
                                fw={500}
                                c="#333333"
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
