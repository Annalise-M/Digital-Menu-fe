import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBeers, postBeer, deleteBeer } from '../services/api/beersApi';

// Query key factory
const beerKeys = {
  all: ['beers'],
};

// Fetch all beers
export const useBeers = () => {
  return useQuery({
    queryKey: beerKeys.all,
    queryFn: getBeers,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Create a new beer
export const useCreateBeer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postBeer,
    onSuccess: (newBeer) => {
      // Optimistically update the cache
      queryClient.setQueryData(beerKeys.all, (oldBeers) => {
        return oldBeers ? [newBeer, ...oldBeers] : [newBeer];
      });
    },
  });
};

// Delete a beer
export const useDeleteBeer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBeer,
    onSuccess: (deletedBeer) => {
      // Remove from cache
      queryClient.setQueryData(beerKeys.all, (oldBeers) => {
        return oldBeers ? oldBeers.filter(beer => beer.id !== deletedBeer.id) : [];
      });
    },
  });
};
