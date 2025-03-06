"use client"
import { createContext, useContext } from 'react';
import { useAuthModal } from '@/hooks/useAuthModal';
import AuthModal from "@/modules/auth/AuthModal";

const AuthModalContext = createContext({});

export const AuthModalProvider = ({ children }) => {
  const {isAuthModalOpen, initialAuthView, openAuthModal, closeAuthModal, handleAuthSuccess} = useAuthModal();
  return (
    <AuthModalContext.Provider value={{isAuthModalOpen, initialAuthView, openAuthModal, closeAuthModal, handleAuthSuccess}}>
      {children}
      {isAuthModalOpen && (
        <AuthModal
          opened={isAuthModalOpen}
          onClose={closeAuthModal}
          initialView={initialAuthView}
          onSuccess={handleAuthSuccess}
        />
      )}
    </AuthModalContext.Provider>
  );
};

export const useAuthModalContext = () => {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error('useAuthModalContext must be used within AuthModalProvider');
  }
  return context;
};