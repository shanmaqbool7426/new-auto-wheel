'use client'
import React, { useState, useEffect } from 'react'
import {
    LocationPinIcon,
    PhoneIcon,
    WhatsappIcon,
} from "@/components/Icons";
import { Box, Text, Group, BackgroundImage, ThemeIcon } from '@mantine/core';
import viewTrackingService from '@/services/viewTrackingService';

// Separate WorkingHours component
const WorkingHours = ({ hours }) => {
    const [expanded, setExpanded] = useState(false);
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    const openDays = days.filter(day => hours[day]?.isOpen);
    const displayDays = expanded ? openDays : openDays.slice(0, 1);

    if (openDays.length === 0) return null;

    return (
        <Box className="working-hours">
            {displayDays.map(day => (
                <Group key={day} justify="space-between" mb={4}>
                    <Text size="xs" tt="capitalize" w={100}>
                        {day}:
                    </Text>
                    <Text size="xs">
                        {hours[day].start} - {hours[day].end}
                    </Text>
                </Group>
            ))}
            {openDays.length > 1 && (
                <Group justify="flex-end" mt={8}>
                    <Text
                        size="xs"
                        c="#E90808"
                        td="underline"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setExpanded(!expanded)}
                    >
                        {expanded ? 'Show less' : `See ${openDays.length - 1} more`}
                    </Text>
                </Group>
            )}
        </Box>
    );
};

const SocialContact = ({ detail }) => {
    const [showPhone, setShowPhone] = useState(false);

    const sellerAddress = detail?.data?.seller?.address || detail?.data?.seller?.locationAddress || 'Address not available';
    const phoneNumber = detail?.data?.seller?.phoneNumber || detail?.data?.contactInfo?.mobileNumber;
    const whatsappNumber = detail?.data?.seller?.whatsappNumber || detail?.data?.seller?.phoneNumber || detail?.data?.contactInfo?.mobileNumber;
    const workingHours = detail?.data?.seller?.workingHours || {};
    const vehicleId = detail?.data?._id;

    const maskedNumber = phoneNumber
        ? `(${phoneNumber.slice(0, 2)}${'*'.repeat(7)})`
        : '(**********)';

    // Track mobile interaction when user shows phone number
    const handleShowPhone = () => {
        console.log("vehicleId",vehicleId)
        setShowPhone(true);
        // Track as a mobile interaction
        if (vehicleId) {
            viewTrackingService.trackView(vehicleId, 'mobile');
        }
    };

    // Track mobile interaction when user clicks on WhatsApp
    const handleWhatsAppClick = () => {
        // Track as a mobile interaction
        if (vehicleId) {
            viewTrackingService.trackView(vehicleId, 'mobile');
        }
        window.open(`https://api.whatsapp.com/send/?phone=${whatsappNumber}&text&app_absent=0&lang=en`, '_blank');
    };

    return (
        <>
            <div className="col-12">
                <div className="card seller-phone-card mb-3">
                    <div className="card-body gap-2">
                        <PhoneIcon />
                        <h5 className="fw-bold mb-0">
                            {showPhone ? phoneNumber : maskedNumber}
                        </h5>
                        {!showPhone && (
                            <span
                                className="text-decoration-underline text-muted cursor-pointer"
                                onClick={handleShowPhone}
                            >
                                Show Number
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="col-12">
                <div className="card whatsapp-icon mb-3">
                    <div
                        className="card-body gap-2 align-items-center"
                        onClick={handleWhatsAppClick}
                        style={{ cursor: 'pointer' }}
                    >
                        <WhatsappIcon />
                        <h5 className="fw-bold mb-0">CHAT VIA WHATSAPP</h5>
                    </div>
                </div>
            </div>

            <div className="col-12">
                <div className="card address-card mb-3">
                    <div className="card-body gap-2 align-items-top ">
                        <ThemeIcon color="#E90808" variant="white">
                            <LocationPinIcon />
                        </ThemeIcon>                    
                        <Box>
                            <Text size="sm" mb={8}>
                                {sellerAddress}
                            </Text>
                            {Object.keys(workingHours).length > 0 && (
                                <>
                                    <Text fw={500} size="sm" mb={8}>
                                        Working Hours:
                                    </Text>
                                    <WorkingHours hours={workingHours} />
                                </>
                            )}
                        </Box>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SocialContact;