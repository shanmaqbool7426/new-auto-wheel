import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useSession } from "next-auth/react";

export default function useChat() {
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [socket, setSocket] = useState(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    
      const newSocket = io('http://localhost:5000'); // Replace with your server URL
      setSocket(newSocket);

      newSocket.on('connect', () => {
        console.log('Connected to server');
        // Authenticate the user
        newSocket.emit('authenticate', session?.user?._id);
      });

      newSocket.on(`new_message`, (messageData) => {
        console.log('Received new message:', messageData);
        setMessages((prevMessages) => [...prevMessages, messageData]);
      });                                                             
      
      newSocket.on('conversations_list', (conversationsList) => {
        console.log('Received conversations list:', conversationsList);
        setConversations(conversationsList);
      });

      newSocket.on('error', (error) => {
        console.error('Socket error:', error);
        // Handle error (e.g., show a notification to the user)
      });

      return () => {
        newSocket.disconnect();
      };
    
  }, [session, status]);

  useEffect(() => {
    if (socket && session?.user?._id) {
      socket.emit('get_conversations');
    }
  }, [socket, session]);

  const handleChangeSendMessage = (event) => {
    setValue(event.currentTarget.value);
  };

  const sendMessage = (receiver) => {
    if (value.trim() && socket && session?.user?._id) {
      const messageData = {
        sender: session.user._id,
        receiver: receiver,
        content: value
      };
      console.log('Sending message:', messageData);
      socket.emit(`send_message`, messageData);
      // Add the sent message to the local state
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setValue('');
    }
  };

  return {
    value,
    messages,
    conversations,
    handleChangeSendMessage,
    sendMessage,
  };
}