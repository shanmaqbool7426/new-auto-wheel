import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Button,
  Checkbox,
  Group,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import AccountTypeModal from "../auth/AccountType";
import { useSession } from "next-auth/react";
import io from 'socket.io-client';
import { BASE_URL } from "@/constants/api-endpoints";

const MessageToDealer = ({ sellerId }) => {
  console.log('sellerId',sellerId)
  const [socket, setSocket] = useState(null);
  const { data: session, status } = useSession();
  const [modalOpened, setModalOpened] = useState(false);
  const [formData, setFormData] = useState({
    message: "",
    name: "",
    email: "",
    phone: "",
    acceptedPolicy: false,
  });

  let token =localStorage.getItem('token')
  console.log('token>>>>',JSON.parse(token))
  token=JSON.parse(token)

  useEffect(() => {
    if (status === "authenticated" && session?.user?._id) {
      const newSocket = io(BASE_URL, {
        withCredentials: true,
      });
      setSocket(newSocket);

      newSocket.on('connect', () => {
        console.log('Connected to server');
        newSocket.emit('authenticate', session.user._id);
      });

      newSocket.on(`new_message_`, (messageData) => {
        console.log('Received new message:', messageData);
        // Handle incoming message if needed
      });

      newSocket.on('error', (error) => {
        console.error('Socket error:', error);
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
      setModalOpened(true);
    } else {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (formData.message.trim() && socket && session?.user?._id) {
      const messageData = {
        sender: session.user._id,
        receiver: sellerId,
        content: formData.message
      };
      console.log('Sending message:', messageData);
      socket.emit('send_message', messageData);
      setFormData({ ...formData, message: '' });
    }
  };

  return (
    <>
      <div className="contact-form">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-12">
              <Text size="xl" mb="md" fw={600} className="text-uppercase">
                Message to Seller
              </Text>
              <Textarea
                size="md"
                autosize
                minRows={10}
                maxRows={10}
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <TextInput
                size="md"
                label="Name"
                my="md"
                placeholder="John Doe"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!!session?.user?.name}
              />
            </div>
            <div className="col-md-4">
              <TextInput
                my="md"
                size="md"
                label="Email"
                placeholder="your@email.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!!session?.user?.email}
              />
            </div>
            <div className="col-md-4">
              <TextInput
                my="md"
                size="md"
                label="Phone"
                placeholder="+91 321 674 9854"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-12">
              <Group gap="md" align="center" mb="md">
                <Checkbox
                  name="acceptedPolicy"
                  checked={formData.acceptedPolicy}
                  onChange={handleChange}
                />
                <Text>
                  I accept the{" "}
                  <Link href="#" className="text-decoration-none">
                    Privacy Policy
                  </Link>
                </Text>
              </Group>
            </div>
            <div className="col-md-12">
              <Button type="submit" size="lg" color="#EB2321">
                Send Message
              </Button>
            </div>
          </div>
        </form>
      </div>

      <AccountTypeModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
      />
    </>
  );
};

export default MessageToDealer;