"use client"
import { createContext, useContext, useState, useEffect } from 'react';
import { BASE_URL } from "@/constants/api-endpoints";
import { getLocalStorage } from "@/utils";
import { notifications } from '@mantine/notifications';
import { useSession } from "next-auth/react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [loadingFavorites, setLoadingFavorites] = useState(new Set());
  const { data: session } = useSession();

  // Initialize user from localStorage
  useEffect(() => {
    const storedUser = getLocalStorage('user');
    if (storedUser) {
      setUserData(storedUser);
      fetchUserFavorites(storedUser._id);
    }
    setLoading(false);
  }, [session]);

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
        setFavorites(new Set(data.data.map(fav => fav._id)));
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const toggleFavorite = async (vehicleId) => {
    if (!userData?._id) {
      notifications.show({
        title: "Login Required",
        message: "Please login first to add vehicles to favorites",
        color: "red",
      });
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