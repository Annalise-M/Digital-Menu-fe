import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBeers, postBeer, deleteBeer } from '../services/api/beersApi';

// Query key factory
const beerKeys = {
  all: ['beers'],
};

// Fetch all beers
export const useBeers = (options = {}) => {
  return useQuery({
    queryKey: beerKeys.all,
    queryFn: getBeers,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options, // Allow overriding with custom options (like refetchInterval)
  });
};

// Create a new beer
export const useCreateBeer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postBeer,
    onSuccess: () => {
      // Invalidate both queries to refetch fresh data
      queryClient.invalidateQueries({ queryKey: beerKeys.all });
      queryClient.invalidateQueries({ queryKey: ['beerCategories', 'grouped'] });
    },
  });
};

// Update a beer
export const useUpdateBeer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...updates }) =>
      fetch(`${process.env.API_URL}/api/v1/beers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      }).then(res => res.json()),
    onSuccess: () => {
      // Invalidate both queries to refetch fresh data
      queryClient.invalidateQueries({ queryKey: beerKeys.all });
      queryClient.invalidateQueries({ queryKey: ['beerCategories', 'grouped'] });
    },
  });
};

// Delete a beer
export const useDeleteBeer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBeer,
    onSuccess: () => {
      // Invalidate both queries to refetch fresh data
      queryClient.invalidateQueries({ queryKey: beerKeys.all });
      queryClient.invalidateQueries({ queryKey: ['beerCategories', 'grouped'] });
    },
  });
};
