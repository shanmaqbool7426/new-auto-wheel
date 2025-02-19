import React,{useState} from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { BASE_URL } from '@/constants/api-endpoints';
import { getLocalStorage } from '@/utils';
// import { useRouter } from 'next/router';
export default function useInventory() {

  const router = useRouter();
  const [searchBy, setSearchBy] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return getLocalStorage('inventorySearchBy') || '';
    }
    return '';
  });  const [vehicles, setVehicles] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [totalPages, setTotalPages] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [expandedRowIds, setExpandedRowIds] = React.useState([]);
  const [totalVehicles, setTotalVehicles] = React.useState(0);
  const [selectedVehicleId, setSelectedVehicleId] =   useState(null);

  const [isSessionReady, setIsSessionReady] = React.useState(false);
  const { data: session, status } = useSession();
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
  const token = getLocalStorage('token');


  const fetchVehicles = React.useCallback(async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        search: searchBy,
        type: filterParams.type,
        status: filterParams.status,
        sort: filterParams.date,
        page: currentPage,
        limit: 5, // Adjust as needed
      }).toString();

      console.log('token?._id',token?._id,token)

      const response = await fetch(`${BASE_URL}/api/user/vehicles-by-user/${token?._id}?${queryParams}`);
      const data = await response.json();
      if (data.success) {

        const transformedVehicles = data.data.vehicles.map((vehicle) => ({
          id: vehicle._id,
          title: {
            title: vehicle.specifications.stockId || `${vehicle.make} ${vehicle.model} ${vehicle.year}`, // Fallback if stockId doesn't exist
            image: vehicle.defaultImage,
            modal: `${vehicle.Info.make} ${vehicle.Info.model} ${vehicle.Info.variant}` // Properly format the modal string
          },
          createdDate: vehicle.updatedAt,
          type: vehicle.type,
          price: vehicle.price.toLocaleString(),
          city: vehicle.city,
          isFeatured: vehicle.featured,
          status: vehicle.status,
          views: vehicle.views,
          slug: vehicle?.slug,
          mileage: vehicle.specifications.mileage,
          transmission: vehicle.specifications.transmission,
          fuelType: vehicle.specifications.fuelType,
        }));
        console.log('transformedVehicles', transformedVehicles);
        setVehicles(transformedVehicles);
        setTotalPages(data?.data.totalPages);
        setTotalVehicles(data?.data?.totalVehicles)
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
    if (status === "authenticated" && session?.user?._id) {
      setIsSessionReady(true);
      fetchVehicles();
    }
  }, [status, session,searchBy,filterParams]);
  
  // React.useEffect(() => {
  //   if (isSessionReady) {
  //     fetchVehicles();
  //   }
  // }, [fetchVehicles, isSessionReady]);

  const handleChangeFilter = (name, value) => {
    setFilterParams(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1); // Reset to first page when changing filters
  };

  const handleSearch = (value) => {
    setSearchBy(value);
    if (typeof window !== 'undefined') {
      localStorage.setItem('inventorySearchBy', value);
    }
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Update handleToggleFeature to open modal
const handleToggleFeature = (id) => {
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

  const handleClickEditRow = (e, id) => {
    e.stopPropagation();
    router.push(`/sale/car/post-ad?vehicleId=${id}`)
    // console.log('Edit Row', id);
    // alert(`Edit Row ${id}`);
  }

  const handleClickDeleteRow = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/api/vehicle/${id}`, {
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
    handleSubmit
  };
}