import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Checkbox,
  Group,
  rem,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import AuthModal from "@/modules/auth/AuthModal";
import { AUTH_VIEWS } from "@/constants/auth-config";
import { useSession } from "next-auth/react";
import io from "socket.io-client";
import { BASE_URL } from "@/constants/api-endpoints";
import { getLocalStorage } from "@/utils";

const MessageToDealer = ({ sellerId }) => {
  console.log("sellerId", sellerId);
  const [socket, setSocket] = useState(null);
  const { data: session, status } = useSession();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [formData, setFormData] = useState({
    message: "",
    name: "",
    email: "",
    phone: "",
    acceptedPolicy: false,
  });

  const token = getLocalStorage("token");

  useEffect(() => {
    if (status === "authenticated" && session?.user?._id) {
      const newSocket = io(BASE_URL, {
        withCredentials: true,
      });
      setSocket(newSocket);

      newSocket.on("connect", () => {
        console.log("Connected to server");
        newSocket.emit("authenticate", session.user._id);
      });

      newSocket.on(`new_message_`, (messageData) => {
        console.log("Received new message:", messageData);
        // Handle incoming message if needed
      });

      newSocket.on("error", (error) => {
        console.error("Socket error:", error);
        // Handle error (e.g., show a notification to the user)
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [session, status]);

  useEffect(() => {
    if (session) {
      setFormData({
        ...formData,
        name: session.user.name || "",
        email: session.user.email || "",
      });
    }
  }, [session]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!session) {
      setOpenAuthModal(true);
      return;
    }

    sendMessage();
  };

  const sendMessage = () => {
    if (formData.message.trim() && socket && session?.user?._id) {
      const messageData = {
        sender: session.user._id,
        receiver: sellerId,
        content: formData.message,
      };
      console.log("Sending message:", messageData);
      socket.emit("send_message", messageData);
      setFormData({ ...formData, message: "" });
    }
  };

  return (
    <>
      <Box className="contact-form">
        <form onSubmit={handleSubmit}>
          <Box className="row">
            <Box className="col-md-12">
              <Title size={rem(20)} mb="md" fw={600} tt="uppercase">
                Message to Seller
              </Title>
              <Textarea
                autosize
                minRows={6}
                maxRows={6}
                name="message"
                value={formData.message}
                onChange={handleChange}
                styles={{ input: { border: 0 } }}
              />
            </Box>
            <Box className="col-md-4">
              <TextInput
                label="Name"
                my="md"
                placeholder="John Doe"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!!session?.user?.name}
                styles={{ input: { border: 0 } }}
              />
            </Box>
            <Box className="col-md-4">
              <TextInput
                my="md"
                label="Email"
                placeholder="your@email.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!!session?.user?.email}
                styles={{ input: { border: 0 } }}
              />
            </Box>
            <Box className="col-md-4">
              <TextInput
                my="md"
                label="Phone"
                placeholder="+91 321 674 9854"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                styles={{ input: { border: 0 } }}
              />
            </Box>
            <Box className="col-md-12">
              <Group gap="md" align="center" mb="md">
                <Checkbox
                styles={{ input: { border: 0 } }}
                  name="acceptedPolicy"
                  size="sm"
                  checked={formData.acceptedPolicy}
                  onChange={handleChange}
                />
                <Text span size="sm">
                  I accept the{" "}
                  <Link href="#" className="text-decoration-none">
                    Privacy Policy
                  </Link>
                </Text>
              </Group>
            </Box>
            <Box className="col-md-12">
              <Button
                type="submit"
                size="md"
                fw={500}
                ff="heading"
                tt="uppercase"
                color="#EB2321"
              >
                Send Message
              </Button>
            </Box>
          </Box>
        </form>
      </Box>

      <AuthModal 
        opened={openAuthModal} 
        onClose={() => setOpenAuthModal(false)} 
        initialView={AUTH_VIEWS.SIGN_IN}
      />
    </>
  );
};

export default MessageToDealer;
