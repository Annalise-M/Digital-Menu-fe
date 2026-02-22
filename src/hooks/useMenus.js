import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMenus, postMenu, deleteMenu } from '../services/api/menusApi';

// Query key factory
const menuKeys = {
  all: ['menus'],
};

// Fetch all menus
export const useMenus = (options = {}) => {
  return useQuery({
    queryKey: menuKeys.all,
    queryFn: getMenus,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options, // Allow overriding with custom options (like refetchInterval)
  });
};

// Create a new menu
export const useCreateMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postMenu,
    onSuccess: (newMenu) => {
      // Optimistically update the cache
      queryClient.setQueryData(menuKeys.all, (oldMenus) => {
        return oldMenus ? [newMenu, ...oldMenus] : [newMenu];
      });
    },
  });
};

// Update a menu
export const useUpdateMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...updates }) =>
      fetch(`${process.env.API_URL}/api/v1/menus/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      }).then(res => res.json()),
    onSuccess: (updatedMenu) => {
      // Update the cache
      queryClient.setQueryData(menuKeys.all, (oldMenus) => {
        return oldMenus ? oldMenus.map(menu =>
          menu.id === updatedMenu.id ? updatedMenu : menu
        ) : [updatedMenu];
      });
    },
  });
};

// Delete a menu
export const useDeleteMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMenu,
    onSuccess: (deletedMenu) => {
      // Remove from cache
      queryClient.setQueryData(menuKeys.all, (oldMenus) => {
        return oldMenus ? oldMenus.filter(menu => menu.id !== deletedMenu.id) : [];
      });
    },
  });
};
