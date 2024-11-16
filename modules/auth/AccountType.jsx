import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Grid,
  Image,
  Modal,
  Paper,
  rem,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import NextImage from "next/image";
import personal from "../../public/auth/personal.svg";
import dealer_icon from "../../public/auth/dealer_icon.svg";
import SocialsLogin from "./SocialsLogins";

const AccountTypeModal = ({ opened, onClose, isSignUp }) => {
  const [activeType, setActiveType] = useState("personal");
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    if (!isSignUp && opened) {
      setModalOpened(true);
      onClose();
    }
  }, [isSignUp,opened]);
  const handleAccountTypeClick = (type) => {
    setModalOpened(true);
    localStorage.setItem("account-type", type);

    setActiveType(type);
    onClose();
  };
  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        withCloseButton={false}
        centered
        size="lg"
        padding="xl"
        // className="select-auth-modal"
      >
        <Box className="row" py="xl" px="xl">
          <Box className="col-lg-12">
            <Title order={3} fw={700} ta="left" pb="lg">
              Choose Account Type!
            </Title>
          </Box>
          <Box className="col-lg-6">
            <Paper
              p="md"
              radius="md"
              // className={`account-type-box ${
              //   activeType === "personal" ? "active" : ""
              // }`}
              className="account-type-box"
              onClick={() => handleAccountTypeClick("personal")}
            >
              <Flex align="center" gap="md">
                <NextImage
                  src={personal}
                  alt="Personal Account"
                  width={30}
                  height={30}
                />

                <Box>
                  <Title fw={600} order={5}>
                    Personal Account
                  </Title>
                  <Text size="sm" mt="3">
                    If you work individual or Want to Browse <br /> Listings
                  </Text>
                </Box>
              </Flex>
            </Paper>
          </Box>
          <Box className="col-lg-6">
            <Paper
              onClick={() => handleAccountTypeClick("dealer")}
              className="account-type-box"
              p="md"
              radius="md"
            >
              <Flex align="center" gap="md">
                <NextImage
                  src={dealer_icon}
                  alt="Personal Account"
                  width={30}
                  height={30}
                />

                <Box>
                  <Title fw={600} order={5}>
                    Dealer Account
                  </Title>
                  <Text size="sm" mt="3">
                    For Official or Private Dealers who have bulk Listings
                  </Text>
                </Box>
              </Flex>
            </Paper>
          </Box>
        </Box>
      </Modal>

      <SocialsLogin
        socialOpened={modalOpened}
        socialOnClose={() => setModalOpened(false)}
      />
    </>
  );
};

export default AccountTypeModal;
