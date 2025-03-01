import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewApi } from '../api/queries';
import { queryKeys } from '@/lib/react-query/constants';

// Hook for user/dealer reviews
export function useUserReviews(dealerId, filters = {}) {
  return useQuery({
    queryKey: queryKeys.reviews.dealer(dealerId),
    queryFn: () => reviewApi.getUserReviews(dealerId, filters),
    enabled: !!dealerId,
  });
}

// Hook for vehicle reviews
export function useVehicleReviews(vehicleId) {
  return useQuery({
    queryKey: queryKeys.reviews.vehicle(vehicleId),
    queryFn: () => reviewApi.getVehicleReviews(vehicleId),
    enabled: !!vehicleId,
  });
}

// Hook for vehicle overall ratings
export function useVehicleOverallRatings(vehicleId) {
  return useQuery({
    queryKey: [...queryKeys.reviews.vehicle(vehicleId), 'overall'],
    queryFn: () => reviewApi.getVehicleOverallRatings(vehicleId),
    enabled: !!vehicleId,
  });
}

// Hook for submitting reviews
export function useSubmitReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reviewApi.submitReview,
    onSuccess: (_, variables) => {
      // Invalidate relevant queries based on the review type
      if (variables.vehicleId) {
        queryClient.invalidateQueries({ 
          queryKey: queryKeys.reviews.vehicle(variables.vehicleId) 
        });
      }
      if (variables.dealerId) {
        queryClient.invalidateQueries({ 
          queryKey: queryKeys.reviews.dealer(variables.dealerId) 
        });
      }
    },
  });
}

// Hook for managing reviews (with delete and update functionality)
export function useManageReview(reviewId) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => reviewApi.deleteReview(reviewId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.reviews.all 
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (reviewData) => reviewApi.updateReview(reviewId, reviewData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.reviews.all 
      });
    },
  });

  return {
    deleteReview: deleteMutation.mutate,
    updateReview: updateMutation.mutate,
    isDeleting: deleteMutation.isPending,
    isUpdating: updateMutation.isPending,
  };
}

// Hook for all reviews (with filters)
export function useAllReviews(filters = {}) {
  return useQuery({
    queryKey: [...queryKeys.reviews.all, filters],
    queryFn: () => reviewApi.getAllReviews(filters),
  });
}