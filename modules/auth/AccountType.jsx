import React from "react";
import {
  Box,
  Flex,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import NextImage from "next/image";
import personal from "../../public/auth/personal.svg";
import dealer_icon from "../../public/auth/dealer_icon.svg";

const AccountType = ({ onSelectType }) => {
  const accountTypes = [
    {
      id: "Personal",
      title: "Personal Account",
      description: "If you work individual or Want to Browse Listings",
      icon: personal,
    },
    {
      id: "Dealer",
      title: "Dealer Account",
      description: "For Official or Private Dealers who have bulk Listings",
      icon: dealer_icon,
    }
  ];

  const handleAccountTypeClick = (type) => {
    localStorage.setItem("account-type", type);
    localStorage.setItem("accountType", type);
    onSelectType?.(type);
  };

  return (
    <Box className="row" py="xl" px="xl">
      <Box className="col-lg-12">
        <Title order={3} fw={700} ta="left" pb="lg">
          Choose Account Type!
        </Title>
      </Box>
        {accountTypes.map((type) => (
          <Box key={type.id} className="col-lg-6">
            <Paper
              p="md"
              radius="md"
              className="account-type-box"
              onClick={() => handleAccountTypeClick(type.id)}
            >
              <Flex align="center" gap="md">
                <NextImage
                  src={type.icon}
                  alt={type.title}
                  width={30}
                  height={30}
                />

                <Box>
                  <Title fw={600} order={5}>
                    {type.title}
                  </Title>
                  <Text size="sm" mt="3">
                    {type.description}
                  </Text>
                </Box>
              </Flex>
            </Paper>
          </Box>
        ))}
    </Box>
  );
};

export default AccountType;