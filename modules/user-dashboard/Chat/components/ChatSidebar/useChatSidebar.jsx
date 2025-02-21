import { useState, useCallback } from 'react';

export default function useChatSidebar(conversations, onSelectUser) {
  const [searchBy, setSearchBy] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleUserSelect = useCallback((userId) => {
    setSelectedUserId(userId);
    onSelectUser(userId);
  }, [onSelectUser]);

  const filteredConversations = conversations
    .sort((a, b) => {
      // Ensure lastMessage exists and has valid timestamps
      const timeA = a.lastMessage?.createdAt ? new Date(a.lastMessage.createdAt).getTime() : 0;
      const timeB = b.lastMessage?.createdAt ? new Date(b.lastMessage.createdAt).getTime() : 0;
      return timeB - timeA;
    })
    .filter(conv => 
      conv.otherUser?.fullName?.toLowerCase().includes(searchBy.toLowerCase()) ||
      conv.otherUser?.email?.toLowerCase().includes(searchBy.toLowerCase())
    );

  return {
    searchBy,
    setSearchBy,
    selectedUserId,
    handleUserSelect,
    filteredConversations
  };
}