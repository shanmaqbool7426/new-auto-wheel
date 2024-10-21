'use client';
import React, { useState ,useEffect} from 'react';
import { Box } from '@mantine/core';
import useChat from './useChat';
import styles from './Chat.module.css';
import ChatSidebar from './components/ChatSidebar';
import ChatContent from './components/ChatContent';
import { useSession } from "next-auth/react";

export default function Chat() {
  const [selectedUser, setSelectedUser] = useState({})
  const { data: session, status } = useSession();
  const {
    value,
    messages,
    conversations,
    handleChangeSendMessage,
    sendMessage,
    handleUserSelect,
    selectedUserId
  } = useChat();

  useEffect(() => {
   setSelectedUser(conversations.find((item)=>  item.otherUser._id==selectedUserId))
  }, [selectedUserId])
  

  



  console.log('selectedUser',selectedUser)

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.sidebar}>
        <ChatSidebar 
          conversations={conversations}
          onSelectUser={handleUserSelect}
          selectedUserId={selectedUserId}
        />
      </Box>

      <Box className={styles.content}>
        <ChatContent 
          value={value}
          messages={messages}
          onChangeMessage={handleChangeSendMessage}
          onSendMessage={() => sendMessage(selectedUserId)}
          selectedUserId={selectedUserId}
          currentUserId ={session?.user?._id}
          selectedUser={selectedUser}
        />
      </Box>
    </Box>
  )
}