import React, { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';
import { useSession } from "next-auth/react";

export default function useChat() {
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [socket, setSocket] = useState(null);
  const { data: session, status } = useSession();
  const [selectedUserId, setSelectedUserId] = React.useState(null);
const [selectedUser,setSelectedUser]=useState({})
  const updateConversations = useCallback((messageData) => {
    setConversations((prevConversations) => {
      const updatedConversations = prevConversations.map(conv => {
        if (conv.otherUser.id === messageData.sender || conv.otherUser.id === messageData.receiver) {
          return {
            ...conv,
            lastMessage: {
              id: messageData.id,
              content: messageData.content,
              sender: messageData.sender,
              receiver: messageData.receiver,
              createdAt: messageData.createdAt
            }
          };
        }
        return conv;
      });
      return updatedConversations;
    });
  }, []);

  const handleUserSelect = useCallback((userId) => {
    console.log('get_messages',{userId: session.user._id, otherUserId: userId})

    setSelectedUserId(userId);
    if (socket && session?.user?._id) {

      socket.emit('get_messages', { userId: session.user._id, otherUserId: userId });
    }
  }, [socket, session]);

  useEffect(() => {
    if (status === "authenticated" && session?.user?._id) {
      const newSocket = io('http://localhost:5000', {
        withCredentials: true,
      });
      setSocket(newSocket);

      newSocket.on('connect', () => {
        console.log('Connected to server');
        newSocket.emit('authenticate', session.user._id);
      });

      newSocket.on('conversations_list', (conversationsList) => {
        console.log('Received conversations list:', conversationsList);
        setConversations(conversationsList);
      });

      newSocket.on('conversation_messages', (messagesList) => {
        console.log('Received messages for conversation:', messagesList);
        setMessages(messagesList);
      });


      newSocket.on('new_message', (messageData) => {
        console.log('Received new message:', messageData);
        setMessages((prevMessages) => [...prevMessages, messageData]);
        updateConversations(messageData);
      });

      newSocket.on('error', (error) => {
        console.error('Socket error:', error);
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [session, status, updateConversations]);

  useEffect(() => {
    if (socket && session?.user?._id) {
    console.log('get_conversations')
      socket.emit('get_conversations');
    }
  }, [socket, session]);

  const handleChangeSendMessage = (event) => {
    setValue(event.currentTarget.value);
  };
console.log('messsages',messages)
  const sendMessage = (receiverId) => {
    // if (value.trim() && socket && session?.user?._id) {
      const messageData = {
        sender: session.user._id,
        receiver: receiverId,
        content: value
      };
      console.log('Sending message:', messageData);
      socket.emit('send_message', messageData);
      setValue('');
    }
  // };

  return {
    value,
    messages,
    conversations,
    handleChangeSendMessage,
    sendMessage,
    sendMessage,
    selectedUserId,
    handleUserSelect
  };
}