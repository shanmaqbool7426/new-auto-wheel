import React from 'react';

export default function useInventory() {
  const [searchBy, setSearchBy] = React.useState('');
  const [vehicles, setVehicles] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [totalPages, setTotalPages] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [expandedRowIds, setExpandedRowIds] = React.useState([]);

  const handleExpandRow = (id) => {
    console.log('>>>>>')
    setExpandedRowIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((rowId) => rowId !== id);
      } else {
        return [id];
      }
    });
  };
  const [filterParams, setFilterParams] = React.useState({
    type: '',
    status: '',
    date: 'newToOld',
  });

  const fetchVehicles = React.useCallback(async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        search: searchBy,
        type: filterParams.type,
        status: filterParams.status,
        sort: filterParams.date,
        page: currentPage,
        limit: 10, // Adjust as needed
      }).toString();

      const response = await fetch(`http://localhost:5000/api/user/vehicles-by-user/66e08a35e874573aeab6d39e?${queryParams}`);
      const data = await response.json();
      if (data.success) {
        console.log('data', data);

        const transformedVehicles = data.data.vehicles.map((vehicle) => ({
          id: vehicle._id,
          title: {
            title: vehicle.specifications.stockId,
            image: vehicle.defaultImage,
            modal: vehicle.carInfo
          },
          createdDate: vehicle.updatedAt,
          type: vehicle.type,
          price: vehicle.price.toLocaleString(),
          city: vehicle.city,
          isFeatured: vehicle.featured,
          status: vehicle.status,
          views: vehicle.views,
          mileage: vehicle.specifications.mileage,
          transmission: vehicle.specifications.transmission,
          fuelType: vehicle.specifications.fuelType,
        }));

        setVehicles(transformedVehicles);
        setTotalPages(data.totalPages);
        console.log('transformedVehicles', transformedVehicles);
      } else {
        throw new Error(data.message || 'Failed to fetch vehicles');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [searchBy, filterParams, currentPage]);

  React.useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const handleChangeFilter = (name, value) => {
    setFilterParams(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1); // Reset to first page when changing filters
  };

  const handleSearch = (value) => {
    setSearchBy(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  const handleToggleFeature = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/vehicle/${id}/toggle-featured`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Add any authentication headers if required
        },
      });

      const data = await response.json();
      console.log('datadata', data)
      if (data.success) {
        // Update the local state
        setVehicles(prevVehicles =>
          prevVehicles.map(vehicle =>
            vehicle.id === id ? { ...vehicle, isFeatured: !vehicle.isFeatured } : vehicle
          )
        );
      } else {
        throw new Error(data.message || 'Failed to toggle featured status');
      }
    } catch (error) {
      console.error('Error toggling featured status:', error);
      // Optionally, show an error message to the user
    }
  };

  const handleClickEditRow = (id) => {
    console.log('Edit Row', id);
    alert(`Edit Row ${id}`);
  }

  const handleClickDeleteRow = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/vehicle/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Add authentication header here, e.g.:
          // 'Authorization': `Bearer ${userToken}`
        },
      });
  
      const data = await response.json();
  
      if (data.success) {
        // Remove the deleted vehicle from the local state
        setVehicles(prevVehicles => prevVehicles.filter(vehicle => vehicle.id !== id));
        // Optionally, show a success message
      } else {
        throw new Error(data.message || 'Failed to delete vehicle');
      }
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      alert(`Failed to delete vehicle: ${error.message}`);
    }
  };

  const handleClickToggleRow = (id) => {
    alert(`Toggle Row ${id}`);
  }

  return {
    searchBy,
    setSearchBy: handleSearch,
    filterParams,
    handleChangeFilter,
    handleClickEditRow,
    handleClickDeleteRow,
    handleClickToggleRow,
    vehicles,
    loading,
    error,
    currentPage,
    totalPages,
    handleExpandRow,
    expandedRowIds,
    handleToggleFeature,
    onPageChange: handlePageChange,
  };
}