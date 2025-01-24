'use client'
import React, { useState } from 'react';
import {
    PhoneIcon,
    WhatsappIcon,
    MessageIcon,
    DollarIcon,
} from "@/components/Icons";

const SocialCards = ({ detail, scrollToMessage }) => {
    const [showPhone, setShowPhone] = useState(false);
    
    const phoneNumber = detail?.data?.seller?.phoneNumber || detail?.data?.contactInfo?.mobileNumber
    const whatsappNumber = detail?.data?.seller?.whatsappNumber || detail?.data?.seller?.phoneNumber || detail?.data?.contactInfo?.mobileNumber
    const maskedNumber = phoneNumber 
        ? `(${phoneNumber.slice(0, 2)}${'*'.repeat(7)})` 
        : '(**********)'

    const socialsCards = [
        {
            icon: <PhoneIcon />,
            title: showPhone ? phoneNumber : maskedNumber,
            subtitle: !showPhone && phoneNumber ? "Show Number" : "",
            underline: !showPhone,
            onClick: phoneNumber ? () => setShowPhone(true) : undefined,
        },
        {
            icon: <WhatsappIcon />,
            title: "CHAT VIA WHATSAPP",
            onClick: whatsappNumber 
                ? () => window.open(`https://api.whatsapp.com/send/?phone=${whatsappNumber}&text&app_absent=0&lang=en`, '_blank')
                : undefined,
        },
        {
            icon: <MessageIcon />,
            title: "Message To Dealer",
            uppercase: true,
            onClick: scrollToMessage
        },
        {
            icon: <DollarIcon />,
            title: "Make an offer price",
            uppercase: true,
        },
    ];

    return (
        <div className="row">
            {socialsCards.map((card, index) => (
                <div className="col-12" key={index}>
                    <div
                        className={`card mb-3 ${index > 0 ? 'whatsapp-icon' : 'seller-phone-card'}`}
                        onClick={card.onClick}
                        style={{ cursor: card.onClick ? 'pointer' : 'default' }}
                    >
                        <div className="card-body gap-2 align-items-center">
                            {card.icon}
                            <h5 className={`fw-bold mb-0 ${card.uppercase ? 'text-uppercase' : ''}`}>
                                {card.title}
                            </h5>
                            {card.subtitle && (
                                <span className={`${card.underline ? 'text-decoration-underline' : ''} text-muted`}>
                                    {card.subtitle}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SocialCards;