import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { getLocalStorage } from "@/utils";
import React from "react";

export default function useUserReviews() {
  const [reviews, setReviews] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const fetchDealerReviews = async (dealerId) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_ENDPOINTS.USER_REVIEWS.GET_USER_REVIEWS_BY_DEALER_ID}/${dealerId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      const data = await response.json();
      setReviews(data?.reviews || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const token = getLocalStorage('token');
    if (token?._id) {
      fetchDealerReviews(token._id);
    }
  }, []);

  return {
    reviews,
    loading
  };
}