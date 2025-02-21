import { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';
import { useSession } from "next-auth/react";
import { BASE_URL } from '@/constants/api-endpoints';
import axios from 'axios';
import { getLocalStorage } from '@/utils';

export default function useChat() {
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [socket, setSocket] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { data: session } = useSession();
  const token = getLocalStorage('token');
  const handleMessageChange = (value) => {
    setMessageInput(value);
  };
  // Fetch conversations list
  const fetchConversations = useCallback(async () => {
    try {
      console.log('token',token?.token?.token)
      const response = await axios.get(`${BASE_URL}/api/chat/conversations`, {
        headers: {
          'Authorization': token?.token?.token
        }
      });
      setConversations(response.data.data);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  }, []);

  // Fetch messages for selected conversation
  const fetchMessages = useCallback(async (otherUserId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/chat/messages/${otherUserId}`,{
        headers: {
          'Authorization': token?.token?.token
        }
      });
      setMessages(response.data.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }, []);

  // Socket connection
  useEffect(() => {
    if (session?.user?._id) {
      const newSocket = io(BASE_URL, { withCredentials: true });
      
      newSocket.on('connect', () => {
        newSocket.emit('authenticate', session.user._id);
      });

      newSocket.on('new_message', (message) => {
        setMessages(prev => [...prev, message]);
        fetchConversations(); // Update conversations list
      });

      setSocket(newSocket);
      return () => newSocket.disconnect();
    }
  }, [session, fetchConversations]);

  // Select user and fetch messages
  const handleUserSelect = useCallback((userId) => {
    setSelectedUserId(userId);
    fetchMessages(userId);
  }, [fetchMessages]);

  useEffect(() => {
    fetchConversations()
  }, [])
  

  // Send message
  const sendMessage = useCallback((receiver) => {
    if (true) {
      socket.emit('send_message', {
        sender: session.user._id,
        receiver,
        content: messageInput
      });
      setMessageInput('');
    }
  }, [messageInput, socket, session]);

  return {
    messages,
    conversations,
    messageInput,
    setMessageInput,
    sendMessage,
    handleUserSelect,
    handleMessageChange,
    selectedUserId,
    fetchConversations
  };
}