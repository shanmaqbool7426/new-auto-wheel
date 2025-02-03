"use client";
import React, { useState } from "react";
import {
  PhoneIcon,
  WhatsappIcon,
  MessageIcon,
  DollarIcon,
} from "@/components/Icons";
import { useDisclosure } from "@mantine/hooks";
import OfferPriceModal from "@/components/ui/OfferPrice";
import { Paper, rem, Title, Text, ThemeIcon } from "@mantine/core";
const SocialCards = ({ detail, scrollToMessage }) => {
  const [showPhone, setShowPhone] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  const phoneNumber =
    detail?.data?.seller?.phoneNumber ||
    detail?.data?.contactInfo?.mobileNumber;
  const whatsappNumber =
    detail?.data?.seller?.whatsappNumber ||
    detail?.data?.seller?.phoneNumber ||
    detail?.data?.contactInfo?.mobileNumber;
  const maskedNumber = phoneNumber
    ? `(${phoneNumber.slice(0, 2)}${"*".repeat(7)})`
    : "(**********)";

  const socialsCards = [
    {
      icon: <PhoneIcon />,
      title: showPhone ? phoneNumber : maskedNumber,
      subtitle: !showPhone && phoneNumber ? "Show Number" : "",
      underline: !showPhone,
      onClick: phoneNumber ? () => setShowPhone(true) : undefined,
    },
    {
      icon: (
        <>
          <WhatsappIcon />
        </>
      ),
      title: "CHAT VIA WHATSAPP",
      onClick: whatsappNumber
        ? () =>
            window.open(
              `https://api.whatsapp.com/send/?phone=${whatsappNumber}&text&app_absent=0&lang=en`,
              "_blank"
            )
        : undefined,
    },
    {
      icon: <MessageIcon />,
      title: "Message To Dealer",
      uppercase: true,
      onClick: scrollToMessage,
    },
    {
      icon: <DollarIcon />,
      title: "Make an offer price",
      uppercase: true,
      onClick: open,
    },
  ];

  return (
    <>
      {socialsCards.map((card, index) => (
        <Paper
          p="md"
          radius={rem(5)}
          shadow="0px 4px 20px 0px #00000014"
          key={index}
          display="flex"
          mb="lg"
          withBorder
          className="align-items-center gap-2"
        >
          <ThemeIcon
            bg="white"
            color=""
            className="text-primary"
            size={rem(24)}
          >
            {card.icon}
          </ThemeIcon>
          <Title
            ff="text"
            tt={card.uppercase && "uppercase"}
            size={card.subtitle ? rem(20) : rem(16)}
            m={0}
          >
            {card.title}
          </Title>
          {card.subtitle && (
            <Text
              onClick={card.onClick}
              size={rem(12)}
              className={`${
                card.underline ? "text-decoration-underline" : ""
              } text-muted`}
              style={{ cursor: "pointer" }}
            >
              {card.subtitle}
            </Text>
          )}
        </Paper>
      ))}
      {/* Offer Price Modal */}
      <OfferPriceModal opened={opened} close={close} detail={detail} />
    </>
  );
};

export default SocialCards;
