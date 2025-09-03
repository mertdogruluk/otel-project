// Authentication hooks isolated in this file
// Keeps auth concerns separate from hotel-related hooks

import { useState, useEffect, useCallback } from 'react';
import { authAPI } from '@/data/apiService';

interface UseAPIState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useAPI<T>(apiCall: () => Promise<T>, dependencies: unknown[] = []): UseAPIState<T> & { refetch: () => void } {
  const [state, setState] = useState<UseAPIState<T>>({ data: null, loading: true, error: null });

  const fetchData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const result = await apiCall();
      setState({ data: result, loading: false, error: null });
    } catch (error) {
      setState({ data: null, loading: false, error: error instanceof Error ? error.message : 'An error occurred' });
    }
  }, [apiCall]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { ...state, refetch: fetchData };
}

export const useMutation = <T, R>(mutationFn: (data: T) => Promise<R>) => {
  const [state, setState] = useState<{ loading: boolean; error: string | null; data: R | null }>({
    loading: false,
    error: null,
    data: null,
  });

  const mutate = useCallback(async (data: T) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const result = await mutationFn(data);
      setState({ loading: false, error: null, data: result });
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setState({ loading: false, error: errorMessage, data: null });
      throw error;
    }
  }, [mutationFn]);

  return { ...state, mutate };
};

// Auth-specific hooks
export const useLogin = () =>
  useMutation((credentials: { email: string; password: string }) => authAPI.login(credentials));

export const useRegister = () =>
  useMutation((userData: { name: string; email: string; password: string; role?: string }) => authAPI.register(userData));

export const useLogout = () => useMutation<void, unknown>(() => authAPI.logout());

export const useVerifyToken = () => useAPI(() => authAPI.verifyToken());

const authHooks = {
  useLogin,
  useRegister,
  useLogout,
  useVerifyToken,
};

export default authHooks;


