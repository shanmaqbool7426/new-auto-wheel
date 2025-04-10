import React, { useState, useCallback, useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { BASE_URL } from '@/constants/api-endpoints';
import { getLocalStorage } from '@/utils';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/reducers/authSlice';
import { vehiclesService } from '@/app/(user-dashboard)/services/vehiclesService';
// import { useRouter } from 'next/router';
export default function useInventory() {
  const user = useSelector(selectCurrentUser);
console.log("user........",user)
  const router = useRouter();
  const [searchBy, setSearchBy] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return getLocalStorage('inventorySearchBy') || '';
    }
    return '';
  });
  const [debouncedSearchTerm, setDebouncedSearchTerm] = React.useState(searchBy);
  const [vehicles, setVehicles] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [totalPages, setTotalPages] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [expandedRowIds, setExpandedRowIds] = React.useState([]);
  const [totalVehicles, setTotalVehicles] = React.useState(0);
  const [selectedVehicleId, setSelectedVehicleId] =   useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const { data: session, status } = useSession();
  const token = getLocalStorage('token');

  const handleExpandRow = (id) => {
    setExpandedRowIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((rowId) => rowId !== id);
      } else {
        return [id];
      }
    });
  };
  const [filterParams, setFilterParams] = React.useState({
    type: user?.vehicleType || '',
    status: '',
    date: 'newToOld',
  });
  console.log('>>>>>..........',user)

  // Add debounce effect for search term
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchBy);
      if (typeof window !== 'undefined') {
        localStorage.setItem('inventorySearchBy', searchBy);
      }
    }, 500); // 500ms delay

    return () => {
      clearTimeout(timerId);
    };
  }, [searchBy]);

  const [viewRejectionReason, setViewRejectionReason] = useState('');
  const [showViewRejectionModal, setShowViewRejectionModal] = useState(false);

  const handleShowRejectionReason = (reason) => {
    setViewRejectionReason(reason);
    setShowViewRejectionModal(true);
  };

  const handleCloseViewRejectionModal = () => {
    setShowViewRejectionModal(false);
    setViewRejectionReason('');
  };

  const fetchVehicles = React.useCallback(async () => {
    if (!isInitialized) return;

    try {
      setLoading(true);
      const userId = user?._id || session?.user?._id || token?._id;
      
      if (!userId) {
        throw new Error('User ID not found');
      }
      
      const params = {
        search: debouncedSearchTerm,
        type: filterParams.type,
        status: filterParams.status,
        sort: filterParams.date,
        page: currentPage,
        limit: 5,
      };
      
      const response = await vehiclesService.getUserVehicles(userId, params);
      const data = response.data;
      if (data) {
        const transformedVehicles = data.vehicles.map((vehicle) => ({
          id: vehicle._id,
          title: {
            title: vehicle.specifications.stockId || `${vehicle.make} ${vehicle.model} ${vehicle.year}`,
            image: vehicle.defaultImage,
            modal: `${vehicle.Info.make} ${vehicle.Info.model} ${vehicle.Info.variant}`
          },
          createdDate: vehicle.updatedAt,
          type: vehicle.type,
          price: vehicle.price.toLocaleString(),
          city: vehicle.city,
          isFeatured: vehicle.featured,
          status: vehicle.status,
          views: vehicle.views,
          slug: vehicle?.slug,
          regoExpire: vehicle?.rego,
          mileage: vehicle.specifications.mileage,
          transmission: vehicle.specifications.transmission,
          fuelType: vehicle.specifications.fuelType,
          viewCounts: vehicle.viewCounts,
          rejectionReason: vehicle.rejectionReason
        }));
        
        setVehicles(transformedVehicles);
        setTotalPages(data?.totalPages);
        setTotalVehicles(data?.totalVehicles);
      } else {
        throw new Error(data.message || 'Failed to fetch vehicles');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearchTerm, filterParams, currentPage, user?._id, session?.user?._id, token?._id, isInitialized]);

  // Initialize component and handle auth state
  React.useEffect(() => {
    if ((status === "authenticated" && session?.user?._id) || user?._id) {
      if (!isInitialized) {
        setIsInitialized(true);
      }
    }
  }, [status, session?.user?._id, user?._id]);

  // Fetch data when necessary dependencies change
  React.useEffect(() => {
    if (isInitialized) {
      fetchVehicles();
    }
  }, [fetchVehicles, isInitialized]);

  const handleChangeFilter = (name, value) => {
    setFilterParams(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1); // Reset to first page when changing filters
  };

  const handleSearch = (value) => {
    setSearchBy(value);
    // The API call will be triggered by the debounce effect
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Update handleToggleFeature to open modal
const handleToggleFeature = (id) => {
  console.log('id>>>>>>>',id)
  setSelectedVehicleId(id);
  openModalMakeFeature();
};

// Update handleSubmit to make API call
const handleSubmit = async (values) => {
  try {
    const duration = parseInt(values.featuresDays);
    const response = await fetch(`${BASE_URL}/api/vehicle/${selectedVehicleId}/toggle-featured`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Add your auth token if required
      },
      body: JSON.stringify({ duration }),
    });

    const data = await response.json();
    
    if (data.success) {
      // Update the local state
      setVehicles(prevVehicles =>
        prevVehicles.map(vehicle =>
          vehicle.id === selectedVehicleId 
            ? { ...vehicle, isFeatured: true } 
            : vehicle
        )
      );
      closeModalMakeFeature();
      form.reset();
      // Optionally show success notification
    } else {
      throw new Error(data.message || 'Failed to feature vehicle');
    }
  } catch (error) {
    console.error('Error featuring vehicle:', error);
    // Optionally show error notification
  }
};

  const handleClickEditRow = (e, id,type) => {
    e.stopPropagation();
    router.push(`/used-${type}s/sell?vehicleId=${id}`)
    // console.log('Edit Row', id);
    // alert(`Edit Row ${id}`);
  }

  // Add state for delete confirmation modal
  const [vehicleToDelete, setVehicleToDelete] = useState(null);

  // Delete confirmation modal controls
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);

  // Update the click delete handler to open confirmation modal
  const handleClickDeleteRow = (e, id) => {
    e.stopPropagation();
    setVehicleToDelete(id);
    openDeleteModal();
  };

  // Add a new function to handle the actual deletion
  const confirmDelete = async () => {
    if (!vehicleToDelete) return;
    
    try {
      const response = await fetch(`${BASE_URL}/api/vehicle/${vehicleToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
  
      if (data.success) {
        // Remove the deleted vehicle from the local state
        setVehicles(prevVehicles => prevVehicles.filter(vehicle => vehicle.id !== vehicleToDelete));
        closeDeleteModal();
        setVehicleToDelete(null);
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
   console.log('id>>>>>',id)
    if (id) {
      window.location.href = `/detail/${id}`;
    } else {
      console.error(`No slug found for vehicle with id ${id}`);
      // Optionally, you can show an error message to the user
      // alert(`Unable to view details for this vehicle.`);
    }
  };

  const [opened, { open: openModalMakeFeature, close: closeModalMakeFeature }] = useDisclosure(false);
// Modify the form initialization
const form = useForm({
  initialValues: {
    featuresDays: '',
  },
  validate: {
    featuresDays: (value) => (!value ? 'Please select duration' : null),
  },
});

  console.log('selectedVehicleId',selectedVehicleId)

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
    totalVehicles,
    handleExpandRow,
    expandedRowIds,
    handleToggleFeature,
    onPageChange: handlePageChange,
    opened,
    openModalMakeFeature,
    closeModalMakeFeature,
    form,
    handleSubmit,
    deleteModalOpened,
    openDeleteModal,
    closeDeleteModal,
    vehicleToDelete,
    confirmDelete,
    viewRejectionReason,
    showViewRejectionModal,
    handleShowRejectionReason,
    handleCloseViewRejectionModal
  };
}