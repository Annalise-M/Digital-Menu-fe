import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMenus, postMenu, deleteMenu } from '../services/api/menusApi';

// Query key factory
const menuKeys = {
  all: ['menus'],
};

// Fetch all menus
export const useMenus = () => {
  return useQuery({
    queryKey: menuKeys.all,
    queryFn: getMenus,
    staleTime: 1000 * 60 * 5, // 5 minutes
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
