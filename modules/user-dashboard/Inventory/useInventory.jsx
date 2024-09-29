'use client'
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { vehiclesService } from '../services/vehiclesService';

const useInventory = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterParams, setFilterParams] = useState({
    type: '',
    status: '',
    date: '',
  });
  const [searchBy, setSearchBy] = useState('');
  const { data: session } = useSession();

  useEffect(() => {
    console.log('session>>>>', session)
    // if (session?.user?.id) {
      fetchVehicles();
    // }
  }, [session, filterParams, searchBy]);

  const fetchVehicles = async () => {
    console.log('fetchVehicles>>>>')
    setLoading(true);
    try {
      const data = await vehiclesService.getUserVehicles('66e08a35e874573aeab6d39e', {
        ...filterParams,
        search: searchBy,
      });

      console.log('data>>>>', data.results)
      setVehicles(data.data || []);
    } catch (err) {
      setError('Failed to fetch vehicles');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeFilter = (key, value) => {
    setFilterParams(prev => ({ ...prev, [key]: value }));
  };

  const handleClickEditRow = (id) => {
    // Implement edit functionality
    console.log('Edit row', id);
  };

  const handleClickDeleteRow = (id) => {
    // Implement delete functionality
    console.log('Delete row', id);
  };

  const handleClickToggleRow = (id) => {
    // Implement toggle functionality
    console.log('Toggle row', id);
  };

  return {
    vehicles,
    loading,
    error,
    setSearchBy,
    filterParams,
    handleChangeFilter,
    handleClickEditRow,
    handleClickDeleteRow,
    handleClickToggleRow,
  };
};

export default useInventory;