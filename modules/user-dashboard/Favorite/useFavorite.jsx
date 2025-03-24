import React, { useEffect } from 'react';
import { vehiclesService } from '../../../app/(user-dashboard)/services/vehiclesService';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

export default function useFavorite(userId) {
  const [favoriteVehicles, setFavoriteVehicles] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [searchBy, setSearchBy] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [totalVehicles, setTotalVehicles] = React.useState(0);
  const [filterParams, setFilterParams] = React.useState({
    date: 'newToOld',
  });

  console.log("userId.......",userId)
  console.log('searchBy',searchBy)
  const fetchFavoriteVehicles = async () => {
    console.log('fetchVehicles>>>>')
    setLoading(true);
    try {
      const data = await vehiclesService.getUserFavoriteVehicles(userId, {
        ...filterParams,
        search: searchBy ?? '',
        page: page,
        limit: 10, // You can adjust this as needed
      });

      console.log('data>>>>', data)
      if (data.data) {
        setFavoriteVehicles(data.data.vehicles || []);
        setTotalPages(data.data.totalPages || 1);
        setTotalVehicles(data.data.totalVehicles || 0);
      }
    } catch (err) {
      setError('Failed to fetch vehicles');
      console.error(err);
      
      notifications.show({
        title: 'Error',
        message: 'Failed to fetch favorite vehicles',
        color: 'red',
        icon: <IconX size={18} />,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchFavoriteVehicles();
    }
  }, [searchBy, filterParams, page, userId]);

  const handleChangeFilter = (name, value) => {
    setFilterParams(prev => ({ ...prev, [name]: value }));
    setPage(1); // Reset to first page when changing filters
  };

  const handleClickDeleteRow = async (id) => {
    try {
      await vehiclesService.deleteFavoriteVehicle(userId, id);
      
      // Show success notification
      notifications.show({
        title: 'Success',
        message: 'Vehicle removed from favorites',
        color: 'green',
        icon: <IconCheck size={18} />,
      });
      
      fetchFavoriteVehicles(); // Refresh the list after deletion
    } catch (err) {
      console.error('Error deleting favorite vehicle:', err);
      
      // Show error notification
      notifications.show({
        title: 'Error',
        message: 'Failed to remove vehicle from favorites',
        color: 'red',
        icon: <IconX size={18} />,
      });
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return {
    favoriteVehicles,
    loading,
    error,
    setSearchBy,
    filterParams,
    handleChangeFilter,
    handleClickDeleteRow,
    page,
    totalPages,
    totalVehicles,
    handlePageChange,
  };
}
