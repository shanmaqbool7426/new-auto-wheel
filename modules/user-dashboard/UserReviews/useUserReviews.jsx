// ... existing imports ...

import { BASE_URL } from "@/constants/api-endpoints";
import { getLocalStorage } from "@/utils";
import React from "react";

export default function useUserReviews() {
  const [reviews, setReviews] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  // ... existing state ...

  const fetchDealerReviews = async (dealerId) => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/user-reviews/dealer/${dealerId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      const data = await response.json();
      console.log('data>>>', data);
      setReviews(data?.reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    // Replace with actual dealer ID from context/props
   const token= getLocalStorage('token')
    fetchDealerReviews(token?._id);
  }, []);

  const [searchBy, setSearchBy] = React.useState(null);

  const [filterParams, setFilterParams] = React.useState({
    date: 'newToOld',
  });

  const handleChangeFilter = (name, value) => {
    setFilterParams(prev => ({ ...prev, [name]: value }));
  };

  const handleClickDeleteRow = (id) => {
    alert(`Delete Row ${id}`);
  }


  return {
    reviews,
    loading,
    setSearchBy,
    filterParams,
    handleChangeFilter,
    handleClickDeleteRow,
  };
}