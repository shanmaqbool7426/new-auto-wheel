import { useState, useCallback } from 'react';
import { AUTH_VIEWS } from '@/constants/auth-config';

export const useAuthModal = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [initialAuthView, setInitialAuthView] = useState(AUTH_VIEWS.SOCIAL_LOGIN);
  const [postAuthAction, setPostAuthAction] = useState(null);

  const openAuthModal = useCallback((view = AUTH_VIEWS.SOCIAL_LOGIN, callback = null) => {
    setInitialAuthView(view);
    setPostAuthAction(() => callback);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
    setPostAuthAction(null);
  }, []);

  const handleAuthSuccess = useCallback(() => {
    if (postAuthAction) {
      postAuthAction();
    }
    closeAuthModal();
  }, [postAuthAction, closeAuthModal]);

  return {
    isAuthModalOpen,
    initialAuthView,
    openAuthModal,
    closeAuthModal,
    handleAuthSuccess,
  };
};