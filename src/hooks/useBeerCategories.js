import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getBeerCategories,
  getBeersGroupedByCategory,
  createBeerCategory,
  updateBeerCategory,
  deleteBeerCategory
} from '../services/api/beerCategoriesApi';

// Query key factory
const beerCategoryKeys = {
  all: ['beerCategories'],
  grouped: ['beerCategories', 'grouped'],
};

// Fetch all beer categories
export const useBeerCategories = (options = {}) => {
  return useQuery({
    queryKey: beerCategoryKeys.all,
    queryFn: getBeerCategories,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
};

// Fetch beers grouped by category
export const useBeersGroupedByCategory = (options = {}) => {
  return useQuery({
    queryKey: beerCategoryKeys.grouped,
    queryFn: getBeersGroupedByCategory,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
};

// Create a new beer category
export const useCreateBeerCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBeerCategory,
    onSuccess: () => {
      // Invalidate and refetch categories
      queryClient.invalidateQueries({ queryKey: beerCategoryKeys.all });
      queryClient.invalidateQueries({ queryKey: beerCategoryKeys.grouped });
    },
  });
};

// Update a beer category
export const useUpdateBeerCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...updates }) => updateBeerCategory(id, updates),
    onSuccess: () => {
      // Invalidate and refetch categories
      queryClient.invalidateQueries({ queryKey: beerCategoryKeys.all });
      queryClient.invalidateQueries({ queryKey: beerCategoryKeys.grouped });
    },
  });
};

// Delete a beer category
export const useDeleteBeerCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBeerCategory,
    onSuccess: () => {
      // Invalidate and refetch categories
      queryClient.invalidateQueries({ queryKey: beerCategoryKeys.all });
      queryClient.invalidateQueries({ queryKey: beerCategoryKeys.grouped });
    },
  });
};
