"use client";
import {
  Modal,
  Box,
  Title,
  Flex,
  Text,
  rem,
  CloseButton,
  TextInput,
  Button,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { DollarIcon } from "../Icons";
import { useSession } from "next-auth/react";
import io from 'socket.io-client';
import { BASE_URL } from "@/constants/api-endpoints";
import { useForm } from "@mantine/form";
import AuthModal from "@/modules/auth/AuthModal";
import { AUTH_VIEWS } from "@/constants/auth-config";

const OfferPriceModal = ({ opened, close, detail }) => {
  const { data: session, status } = useSession();
  const [socket, setSocket] = useState(null);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  
  const form = useForm({
    initialValues: {
      name: session?.user?.fullName || "",
      email: session?.user?.email || "",
      phone: "",
      offerPrice: "",
    },
    validate: {
      offerPrice: (value) => (!value ? 'Price is required' : null),
      phone: (value) => (!value ? 'Phone number is required' : null),
      name: (value) => (!value ? 'Name is required' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  // Socket connection setup
  useEffect(() => {
    if (status === "authenticated" && session?.user?._id) {
      const newSocket = io(BASE_URL);
      setSocket(newSocket);

      newSocket.on('connect', () => {
        console.log('Connected to server');
        newSocket.emit('authenticate', session.user._id);
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [session, status]);

  // Populate form with user data if logged in
  useEffect(() => {
    if (session) {
      form.setValues({
        name: session.user.fullName || "",
        email: session.user.email || "",
      });
    }
  }, [session]);

  useEffect(() => {
    // If modal is opened but user is not logged in, show auth modal instead
    if (opened && !session) {
      setOpenAuthModal(true);
      close(); // Close the price modal
    }
  }, [opened, session]);

  const handleSubmit = (values) => {
    if (!session) return;

    if (socket && session?.user?._id) {
      const messageContent = `Offer Price Request for ${detail?.data?.year} ${detail?.data?.make} ${detail?.data?.model}:\nPrice Offered: Rs ${values.offerPrice}\nContact: ${values.phone}`;

      const messageData = {
        sender: session.user._id,
        receiver: detail?.data?.seller?._id,
        content: messageContent
      };

      socket.emit('send_message', messageData);
      close();
      form.reset();
    }
  };

  if (!session) {
    return (
      <AuthModal 
        opened={openAuthModal} 
        onClose={() => {
          setOpenAuthModal(false);
          close();
        }}
        initialView={AUTH_VIEWS.SIGN_IN}
      />
    );
  }

  // Main modal with form
  return (
    <Modal
      opened={opened}
      size="lg"
      padding={0}
      onClose={close}
      withCloseButton={false}
    >
      {/* ...existing modal header... */}
      <Box className="modal-header" p="xl" bg="#333" c="white">
        <Flex gap="sm" align="center">
          <DollarIcon style={{ width: rem(40), height: rem(40) }} />
          <Title order={4} fw={500}>
            OFFER PRICE
            <Text size="sm" ff="text">
              {detail?.data?.year} {detail?.data?.make} {detail?.data?.model}
            </Text>
          </Title>
        </Flex>
        <CloseButton c="#878787" bg="transparent" ml="auto" onClick={close} />
      </Box>
      
      <Box className="modal-body" p="xl">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Box className="row g-4">
            <Box className="col-md-6">
              <TextInput
                withAsterisk
                label="Name"
                placeholder="John Doe"
                {...form.getInputProps("name")}
              />
            </Box>
            <Box className="col-md-6">
              <TextInput
                withAsterisk
                label="Email"
                placeholder="your@email.com"
                {...form.getInputProps("email")}
                disabled={!!session?.user?.email}
              />
            </Box>
            <Box className="col-md-6">
              <TextInput
                withAsterisk
                label="Phone"
                placeholder="+91 321 674 9854"
                {...form.getInputProps("phone")}
              />
            </Box>
            <Box className="col-md-6">
              <TextInput
                withAsterisk
                label="Trade Price"
                placeholder="Rs 9,750,000"
                {...form.getInputProps("offerPrice")}
              />
            </Box>
            <Box className="col-md-12 text-end">
              <Button 
                type="submit" 
                bg="#EB2321" 
                autoContrast 
                w={rem(150)} 
                fw={500} 
                size="md"
              >
                Request
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default OfferPriceModal;
