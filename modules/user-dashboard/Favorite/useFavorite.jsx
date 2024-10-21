import React, { useEffect } from 'react';
import { vehiclesService } from '../../../app/(user-dashboard)/services/vehiclesService';

export default function useFavorite(userId) {
  const [favoriteVehicles, setFavoriteVehicles] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [searchBy, setSearchBy] = React.useState(null);
  const [filterParams, setFilterParams] = React.useState({
    date: 'newToOld',
  });


  console.log('searchBy',searchBy)
  const fetchFavoriteVehicles = async () => {
    console.log('fetchVehicles>>>>')
    setLoading(true);
    try {
      const data = await vehiclesService.getUserFavoriteVehicles(userId, {
        ...filterParams,
        search: searchBy ?? '',
      });

      console.log('data>>>>', data.data)
      setFavoriteVehicles(data.data || []);
    } catch (err) {
      setError('Failed to fetch vehicles');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // if (userId) {
      fetchFavoriteVehicles();
    // }
  }, [searchBy,filterParams]);

  const handleChangeFilter = (name, value) => {
    setFilterParams(prev => ({ ...prev, [name]: value }));
  };

  const handleClickDeleteRow =async (id) => {

    const data = await vehiclesService.deleteFavoriteVehicle(userId,id);
    const getlist = await vehiclesService.getUserFavoriteVehicles(userId, {
      ...filterParams,
      search: searchBy ?? '',
    });

    setFavoriteVehicles(getlist.data || []);
  };

  return {
    favoriteVehicles,
    loading,
    error,
    setSearchBy,
    filterParams,
    handleChangeFilter,
    handleClickDeleteRow,
  };
}
