"use client"
import { createContext, useContext, useState, useEffect } from 'react';
import { BASE_URL } from "@/constants/api-endpoints";
import { notifications } from '@mantine/notifications';
import { useSession } from "next-auth/react";
import { useAuthModalContext } from './auth-modal';
import { AUTH_VIEWS } from '@/constants/auth-config';
import { useUpdateAccountTypeMutation } from '@/api-services/auth';
import { useSelector } from 'react-redux';

const UserContext = createContext();

export function UserProvider({ children }) {
  const user = useSelector((state) => state.auth.user);
  const [userData, setUserData] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [loadingFavorites, setLoadingFavorites] = useState(new Set());
  const { data: session } = useSession();
  const { openAuthModal } = useAuthModalContext();
  const [updateAccountType] = useUpdateAccountTypeMutation();

  // Check for reset password token in URL
  useEffect(() => {
    if (typeof window !== 'undefined' && openAuthModal) {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      if (token) {
        openAuthModal(AUTH_VIEWS.RESET_PASSWORD);
      }
    }
  }, [openAuthModal]);

  // Handle account type update
  useEffect(() => {
    const handleAccountTypeUpdate = async () => {
      if (session?.user && !session.user.accountType) {
        const storedAccountType = localStorage.getItem('accountType');
        if (storedAccountType) {
          try {
            const response = await updateAccountType({ 
              accountType: storedAccountType,
              token: session?.user?.token 
            }).unwrap();
            if (response.success) {
              // Update session user with new account type
              const updatedUser = { ...session.user, accountType: storedAccountType };
              setUserData(updatedUser);
            }
          } catch (error) {
            console.error('Error updating account type:', error);
          }
        }
      }
    };

    handleAccountTypeUpdate();
  }, [session, updateAccountType]);

  // Initialize user from Redux state only
  useEffect(() => {
    if (user) {
      setUserData(user);
      fetchUserFavorites(user._id);
    }
    setLoading(false);
  }, [user]);

  const fetchUserFavorites = async (userId) => {
    if (!userId) return;
    
    try {
      const response = await fetch(`${BASE_URL}/api/user/${userId}/favorites`, {
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setFavorites(new Set(data.data.vehicles?.map(fav => fav._id)));
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const toggleFavorite = async (vehicleId) => {
    if (!userData?._id) {
      openAuthModal(AUTH_VIEWS.SOCIAL_LOGIN);
      return false;
    }
    
    try {
      setLoadingFavorites(prev => new Set(prev).add(vehicleId));
      const response = await fetch(
        `${BASE_URL}/api/user/${vehicleId}/toggle-favorite/${userData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData._id}`,
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        setFavorites(prev => {
          const newFavorites = new Set(prev);
          if (newFavorites.has(vehicleId)) {
            newFavorites.delete(vehicleId);
          } else {
            newFavorites.add(vehicleId);
          }
          return newFavorites;
        });

        notifications.show({
          title: "Success",
          message: data.message,
          color: "green",
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error toggling favorite:', error);
      notifications.show({
        title: "Error",
        message: "Failed to update favorite status",
        color: "red",
      });
      return false;
    } finally {
      setLoadingFavorites(prev => {
        const newSet = new Set(prev);
        newSet.delete(vehicleId);
        return newSet;
      });
    }
  };

  return (
    <UserContext.Provider value={{
      userData,
      loading,
      favorites,
      isFavorite: (vehicleId) => favorites.has(vehicleId),
      isFavoriteLoading: (vehicleId) => loadingFavorites.has(vehicleId),
      toggleFavorite,
      refreshFavorites: () => fetchUserFavorites(userData?._id)
    }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};