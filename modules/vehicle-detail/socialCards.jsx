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
import { useUser } from "@/contexts/user";
import { useAuthModalContext } from "@/contexts/auth-modal";
import { AUTH_VIEWS } from '@/constants/auth-config';

const SocialCards = ({ detail, scrollToMessage }) => {
  const [showPhone, setShowPhone] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const { userData } = useUser();
  const { openAuthModal } = useAuthModalContext();

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

  const handleAction = (action) => {
    if (!userData?._id) {
      openAuthModal(AUTH_VIEWS.SOCIAL_LOGIN);
      return;
    }
    action();
  };

  const socialsCards = [
    {
      icon: <PhoneIcon />,
      title: showPhone ? phoneNumber : maskedNumber,
      subtitle: !showPhone && phoneNumber ? "Show Number" : "",
      underline: !showPhone,
      onClick: phoneNumber 
        ? () => handleAction(() => setShowPhone(true)) 
        : undefined,
    },
    {
      icon: (
        <>
          <WhatsappIcon />
        </>
      ),
      title: "CHAT VIA WHATSAPP",
      onClick: whatsappNumber
        ? () => handleAction(() => 
            window.open(
              `https://api.whatsapp.com/send/?phone=${whatsappNumber}&text&app_absent=0&lang=en`,
              "_blank"
            )
          )
        : undefined,
    },
    {
      icon: <MessageIcon />,
      title: "Message To Dealer",
      uppercase: true,
      onClick: () => handleAction(scrollToMessage),
    },
    {
      icon: <DollarIcon />,
      title: "Make an offer price",
      uppercase: true,
      onClick: () => handleAction(open),
    },
  ];

  return (
    <>
      {socialsCards.map((card, index) => (
        <Paper
          p="sm"
          radius={rem(5)}
          shadow="0px 4px 20px 0px #00000014"
          key={index}
          display="flex"
          mb="lg"
          withBorder
          className="align-items-center gap-2"
          onClick={card.onClick}
          style={{ cursor: card.onClick ? "pointer" : "auto" }}
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
            size={card.subtitle ? rem(14) : rem(14)}
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
