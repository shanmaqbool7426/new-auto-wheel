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
import AccountTypeModal from "../auth/AccountType";
import { useSession } from "next-auth/react";
import io from "socket.io-client";
import { BASE_URL } from "@/constants/api-endpoints";
import { getLocalStorage } from "@/utils";
import { useUser } from "@/contexts/user";
import { useAuthModalContext } from "@/contexts/auth-modal";
import { AUTH_VIEWS } from '@/constants/auth-config';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useForm } from '@mantine/form';

const MessageToDealer = ({ sellerId, vehicleDetails }) => {
  const [socket, setSocket] = useState(null);
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const { userData } = useUser();
  const { openAuthModal } = useAuthModalContext();


  console.log("userData.......",userData)
  
  const form = useForm({
    initialValues: {
      message: "",
      name: "",
      email: "",
      phone: "",
      acceptedPolicy: false,
    },
    validate: {
      message: (value) => value.trim().length === 0 ? 'Message is required' : null,
      name: (value) => value.trim().length === 0 ? 'Name is required' : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      phone: (value) => value.trim().length === 0 ? 'Phone number is required' : null,
      acceptedPolicy: (value) => value ? null : 'You must accept the Privacy Policy',
    },
  });

  const token = getLocalStorage("token");

  useEffect(() => {
    if (status === "authenticated" && session?.user?._id) {
      const newSocket = io(BASE_URL, {
        withCredentials: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });
      
      setSocket(newSocket);

      newSocket.on("connect", () => {
        console.log("Connected to server");
        newSocket.emit("authenticate", session.user._id);
      });

      newSocket.on("connect_error", (error) => {
        console.error("Connection error:", error);
        notifications.show({
          title: "Connection Error",
          message: "Unable to connect to messaging service. Please try again later.",
          color: "red",
          icon: <IconX size="1.1rem" />,
        });
      });

      newSocket.on("message_sent", (data) => {
        console.log("Message sent confirmation:", data);
        handleMessageSuccess();
      });

      newSocket.on("message_error", (error) => {
        console.error("Message error:", error);
        handleMessageError(error.message || "Failed to send message");
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [session, status]);

  useEffect(() => {
    if (session?.user) {
      form.setValues({
        ...form.values,
        name: userData?.fullName || "",
        email: session.user.email || "",
        phone: session.user.phone || "",
      });
    } else if (userData) {
      form.setValues({
        ...form.values,
        name:userData?.fullName || "",
        email: userData.email || "",
        phone: userData.phone || "",
      });
    }
  }, [session, userData]);

  const handleMessageSuccess = () => {
    setIsLoading(false);
    setMessageSent(true);
    form.reset();
    
    notifications.show({
      title: "Message Sent",
      message: "Your message has been sent to the seller successfully!",
      color: "green",
      icon: <IconCheck size="1.1rem" />,
      autoClose: 5000,
    });
    
    setTimeout(() => {
      setMessageSent(false);
    }, 5000);
  };

  const handleMessageError = (errorMessage) => {
    setIsLoading(false);
    
    notifications.show({
      title: "Error",
      message: errorMessage || "Failed to send message. Please try again.",
      color: "red",
      icon: <IconX size="1.1rem" />,
      autoClose: 5000,
    });
  };

  const handleSubmit = (values) => {
    if (!session && !userData) {
      openAuthModal(AUTH_VIEWS.SOCIAL_LOGIN);
      return;
    }
    
    sendMessage(values);
  };

  const sendMessage = async (values) => {
    if (!socket) {
      handleMessageError("Messaging service not available. Please try again later.");
      return;
    }
    
    if (!(session?.user?._id || userData?._id)) {
      openAuthModal(AUTH_VIEWS.SOCIAL_LOGIN);
      return;
    }
    
    setIsLoading(true);
    
    try {
      const vehicleInfo = vehicleDetails ? 
        `${vehicleDetails.year} ${vehicleDetails.make} ${vehicleDetails.model}` : 
        "Vehicle";
      
      const messageData = {
        sender: session?.user?._id || userData?._id,
        receiver: sellerId,
        content: values.message,
        senderName: values.name,
        senderEmail: values.email,
        senderPhone: values.phone,
        vehicleInfo: vehicleInfo,
        timestamp: new Date().toISOString(),
      };
      
      console.log("Sending message:", messageData);
      
      const timeoutId = setTimeout(() => {
        if (isLoading) {
          handleMessageError("Request timed out. Please try again later.");
        }
      }, 10000);
      
      socket.emit("send_message", messageData, (response) => {

        console.log("response",response)
        clearTimeout(timeoutId);
        
        if (response) {
          handleMessageSuccess();
        } else {
          handleMessageError(response?.message || "Failed to send message");
        }
      });
    } catch (error) {
      console.error("Error sending message:", error);
      handleMessageError("An unexpected error occurred");
    }
  };

  return (
    <>
      <Box className="contact-form">
        {messageSent ? (
          <Box p="md" bg="rgba(0, 128, 0, 0.1)" mb="md" style={{ borderRadius: '8px' }}>
            <Flex align="center" gap="sm">
              <IconCheck size="1.5rem" color="green" />
              <Text fw={500}>Your message has been sent successfully! The seller will contact you soon.</Text>
            </Flex>
          </Box>
        ) : null}
        
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Box className="row">
            <Box className="col-md-12">
              <Title size={rem(20)} mb="md" fw={600} tt="uppercase">
                Message to Seller
              </Title>
              <Textarea
                autosize
                minRows={6}
                maxRows={6}
                placeholder="Write your message here..."
                styles={{ 
                  input: { 
                    border: 0,
                    backgroundColor: '#f9f9f9',
                    '&:focus': {
                      borderColor: '#EB2321',
                    }
                  },
                  error: { color: '#EB2321' }
                }}
                {...form.getInputProps('message')}
              />
            </Box>
            <Box className="col-md-4">
              <TextInput
                label="Name"
                my="md"
                placeholder="John Doe"
                disabled={!!userData?.fullName}
                styles={{ 
                  input: { 
                    border: 0,
                    backgroundColor: '#f9f9f9',
                    '&:focus': {
                      borderColor: '#EB2321',
                    }
                  },
                  error: { color: '#EB2321' }
                }}
                {...form.getInputProps('name')}
              />
            </Box>
            <Box className="col-md-4">
              <TextInput
                my="md"
                label="Email"
                placeholder="your@email.com"
                disabled={!!session?.user?.email || !!userData?.email}
                styles={{ 
                  input: { 
                    border: 0,
                    backgroundColor: '#f9f9f9',
                    '&:focus': {
                      borderColor: '#EB2321',
                    }
                  },
                  error: { color: '#EB2321' }
                }}
                {...form.getInputProps('email')}
              />
            </Box>
            <Box className="col-md-4">
              <TextInput
                my="md"
                label="Phone"
                placeholder="+1 (555) 123-4567"
                disabled={!!session?.user?.phone || !!userData?.phone}
                styles={{ 
                  input: { 
                    border: 0,
                    backgroundColor: '#f9f9f9',
                    '&:focus': {
                      borderColor: '#EB2321',
                    }
                  },
                  error: { color: '#EB2321' }
                }}
                {...form.getInputProps('phone')}
              />
            </Box>
            <Box className="col-md-12">
              <Group gap="md" align="center" mb="md">
                <Checkbox
                  styles={{ 
                    input: { 
                      borderColor: form.errors.acceptedPolicy ? '#EB2321' : undefined,
                      '&:checked': {
                        backgroundColor: '#EB2321',
                        borderColor: '#EB2321',
                      }
                    },
                    error: { color: '#EB2321' }
                  }}
                  {...form.getInputProps('acceptedPolicy', { type: 'checkbox' })}
                />
                <Text span size="sm">
                  I accept the{" "}
                  <Link href="/privacy-policy" className="text-decoration-none" style={{ color: '#EB2321' }}>
                    Privacy Policy
                  </Link>
                </Text>
              </Group>
              {/* {form.errors.acceptedPolicy && (
                <Text size="xs" c="red" mb="sm">
                  {form.errors.acceptedPolicy}
                </Text>
              )} */}
            </Box>
            <Box className="col-md-12">
              <Button
                type="submit"
                size="md"
                fw={500}
                ff="heading"
                tt="uppercase"
                bg="#EB2321"
                loading={isLoading}
                disabled={isLoading || messageSent}
                styles={{
                  root: {
                    '&:hover': {
                      backgroundColor: '#c41c1a',
                    }
                  }
                }}
              >
                {isLoading ? "Sending..." : "Send Message"}
              </Button>
            </Box>
          </Box>
        </form>
      </Box>

      {/* <AccountTypeModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
      /> */}
    </>
  );
};

export default MessageToDealer;
