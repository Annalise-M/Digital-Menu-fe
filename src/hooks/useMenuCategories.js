import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getMenuCategories,
  getMenusGroupedByCategory,
  createMenuCategory,
  updateMenuCategory,
  deleteMenuCategory
} from '../services/api/menuCategoriesApi';

// Query key factory
const menuCategoryKeys = {
  all: ['menuCategories'],
  grouped: ['menuCategories', 'grouped'],
};

// Fetch all menu categories
export const useMenuCategories = (options = {}) => {
  return useQuery({
    queryKey: menuCategoryKeys.all,
    queryFn: getMenuCategories,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
};

// Fetch menus grouped by category
export const useMenusGroupedByCategory = (options = {}) => {
  return useQuery({
    queryKey: menuCategoryKeys.grouped,
    queryFn: getMenusGroupedByCategory,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
};

// Create a new menu category
export const useCreateMenuCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMenuCategory,
    onSuccess: () => {
      // Invalidate and refetch categories
      queryClient.invalidateQueries({ queryKey: menuCategoryKeys.all });
      queryClient.invalidateQueries({ queryKey: menuCategoryKeys.grouped });
    },
  });
};

// Update a menu category
export const useUpdateMenuCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...updates }) => updateMenuCategory(id, updates),
    onSuccess: () => {
      // Invalidate and refetch categories
      queryClient.invalidateQueries({ queryKey: menuCategoryKeys.all });
      queryClient.invalidateQueries({ queryKey: menuCategoryKeys.grouped });
    },
  });
};

// Delete a menu category
export const useDeleteMenuCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMenuCategory,
    onSuccess: () => {
      // Invalidate and refetch categories
      queryClient.invalidateQueries({ queryKey: menuCategoryKeys.all });
      queryClient.invalidateQueries({ queryKey: menuCategoryKeys.grouped });
    },
  });
};
