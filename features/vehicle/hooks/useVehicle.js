import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { vehicleApi } from '../api/queries';
import { queryKeys } from '@/lib/react-query/constants';

export function useVehiclesByType(type) {
  return useQuery({
    queryKey: queryKeys.vehicles.list({ type }),
    queryFn: () => vehicleApi.getVehiclesByType(type),
    enabled: !!type,
  });
}

export function useVehiclesListing(filters = {}) {
  return useQuery({
    queryKey: queryKeys.vehicles.list(filters),
    queryFn: () => vehicleApi.getVehiclesListing(filters),
  });
}

export function useVehicleDetail(id) {
  return useQuery({
    queryKey: queryKeys.vehicles.detail(id),
    queryFn: () => vehicleApi.getVehicleDetail(id),
    enabled: !!id,
  });
}

export function useFavoriteVehicles(userId, filters = {}) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: queryKeys.vehicles.favorites(userId),
    queryFn: () => vehicleApi.getFavoriteVehicles(userId, filters),
    enabled: !!userId,
  });

  const addMutation = useMutation({
    mutationFn: (vehicleId) => vehicleApi.addToFavorites(userId, vehicleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.vehicles.favorites(userId) });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (vehicleId) => vehicleApi.deleteFavoriteVehicle(userId, vehicleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.vehicles.favorites(userId) });
    },
  });

  return {
    ...query,
    addToFavorites: addMutation.mutate,
    deleteFavorite: deleteMutation.mutate,
  };
}

export function useBrowseByMake() {
  return useQuery({
    queryKey: queryKeys.vehicles.browse.byMake(),
    queryFn: vehicleApi.getBrowseByMake,
  });
}

export function useBrowseByBody() {
  return useQuery({
    queryKey: queryKeys.vehicles.browse.byBody(),
    queryFn: vehicleApi.getBrowseByBody,
  });
}