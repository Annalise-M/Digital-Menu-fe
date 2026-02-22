import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const API_URL = process.env.API_URL || 'http://localhost:7890';

// Fetch restaurant settings
const fetchSettings = async () => {
  const response = await fetch(`${API_URL}/api/v1/settings`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch settings');
  }

  return response.json();
};

// Update restaurant settings
const updateSettings = async (settings) => {
  const response = await fetch(`${API_URL}/api/v1/settings`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(settings),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update settings');
  }

  return response.json();
};

export const useSettings = (options = {}) => {
  return useQuery({
    queryKey: ['settings'],
    queryFn: fetchSettings,
    staleTime: 10 * 60 * 1000, // 10 minutes (settings don't change often)
    ...options,
  });
};

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      // Invalidate settings query to refetch
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
  });
};
