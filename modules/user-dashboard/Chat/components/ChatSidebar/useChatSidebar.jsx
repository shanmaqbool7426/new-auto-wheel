import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

export default function useChatSidebar(onSelectUser) {
  const [searchBy, setSearchBy] = useState('');
  const [conversations, setConversations] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [socket, setSocket] = useState(null);

  // useEffect(() => {
  //   const newSocket = io('http://localhost:3000'); // Replace with your server URL
  //   setSocket(newSocket);

  //   newSocket.on('connect', () => {
  //     console.log('Connected to server');
  //     // Authenticate the user (replace '123' with the actual user ID)
  //     newSocket.emit('authenticate', '123');
  //   });

  //   newSocket.on('conversations_list', (conversationsList) => {
  //     setConversations(conversationsList);
  //   });

  //   newSocket.on('conversation_update', (updatedConversation) => {
  //     setConversations((prevConversations) => {
  //       const index = prevConversations.findIndex(
  //         (conv) => conv.userId === updatedConversation.userId
  //       );
  //       if (index !== -1) {
  //         const newConversations = [...prevConversations];
  //         newConversations[index] = updatedConversation;
  //         return newConversations;
  //       }
  //       return [...prevConversations, updatedConversation];
  //     });
  //   });

  //   return () => {
  //     newSocket.disconnect();
  //   };
  // }, []);

  // useEffect(() => {
  //   if (socket) {
  //     socket.emit('get_conversations');
  //   }
  // }, [socket]);

  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
    onSelectUser(userId);
  };

  return {
    setSearchBy,
    conversations,
    selectedUserId,
    handleUserSelect,
  };
}