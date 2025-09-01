// Custom hook for API operations
// This hook provides state management and error handling for API calls

import { useState, useEffect, useCallback } from 'react';
import { authAPI, hotelAPI, roomAPI, reservationAPI, userAPI, ratingAPI, chatAPI, messageAPI, imageAPI } from '@/data/apiService';

// Generic API hook type
interface UseAPIState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Generic API hook
function useAPI<T>(
  apiCall: () => Promise<T>,
  dependencies: any[] = []
): UseAPIState<T> & { refetch: () => void } {
  const [state, setState] = useState<UseAPIState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const result = await apiCall();
      setState({ data: result, loading: false, error: null });
    } catch (error) {
      setState({ 
        data: null, 
        loading: false, 
        error: error instanceof Error ? error.message : 'An error occurred' 
      });
    }
  }, [apiCall]);

  useEffect(() => {
    fetchData();
  }, dependencies);

  return { ...state, refetch: fetchData };
}

// Hotel hooks
export const useHotels = () => useAPI(() => hotelAPI.getAll());
export const useHotel = (id: number) => useAPI(() => hotelAPI.getById(id), [id]);
export const useHotelsByLocation = (location: string) => 
  useAPI(() => hotelAPI.getByLocation(location), [location]);
export const useHotelsByCategory = (category: string) => 
  useAPI(() => hotelAPI.getByCategory(category), [category]);
export const useHotelSearch = (query: string) => 
  useAPI(() => hotelAPI.search(query), [query]);

// Room hooks
export const useRooms = () => useAPI(() => roomAPI.getAll());
export const useRoomsByHotel = (hotelId: number) => 
  useAPI(() => roomAPI.getByHotelId(hotelId), [hotelId]);
export const useRoom = (id: number) => useAPI(() => roomAPI.getById(id), [id]);

// Reservation hooks
export const useReservations = () => useAPI(() => reservationAPI.getAll());
export const useReservationsByUser = (userId: number) => 
  useAPI(() => reservationAPI.getByUserId(userId), [userId]);
export const useReservation = (id: number) => 
  useAPI(() => reservationAPI.getById(id), [id]);

// Authentication hooks
export const useLogin = () => 
  useMutation((credentials: { email: string; password: string }) => 
    authAPI.login(credentials)
  );

export const useRegister = () => 
  useMutation((userData: { name: string; email: string; password: string; role?: string }) => 
    authAPI.register(userData)
  );

export const useLogout = () => 
  useMutation(() => authAPI.logout());

export const useVerifyToken = () => 
  useAPI(() => authAPI.verifyToken());

// User hooks
export const useUserProfile = () => useAPI(() => userAPI.getProfile());
export const useUser = (id: number) => useAPI(() => userAPI.getById(id), [id]);

// Rating hooks
export const useRatingsByHotel = (hotelId: number) => 
  useAPI(() => ratingAPI.getByHotelId(hotelId), [hotelId]);

// Chat hooks
export const useUserChats = () => useAPI(() => chatAPI.getUserChats());
export const useChat = (id: number) => useAPI(() => chatAPI.getById(id), [id]);
export const useChatMessages = (chatId: number) => 
  useAPI(() => chatAPI.getMessages(chatId), [chatId]);

// Message hooks
export const useMessages = () => useAPI(() => messageAPI.getAll());
export const useMessage = (id: number) => useAPI(() => messageAPI.getById(id), [id]);

// Mutation hooks for POST/PUT/DELETE operations
export const useMutation = <T, R>(
  mutationFn: (data: T) => Promise<R>
) => {
  const [state, setState] = useState<{
    loading: boolean;
    error: string | null;
    data: R | null;
  }>({
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

// Specific mutation hooks
export const useCreateReservation = () => 
  useMutation(reservationAPI.create);

export const useUpdateReservation = () => 
  useMutation(({ id, data }: { id: number; data: any }) => 
    reservationAPI.update(id, data)
  );

export const useCancelReservation = () => 
  useMutation(reservationAPI.cancel);

export const useCreateRating = () => 
  useMutation(ratingAPI.create);

export const useUpdateRating = () => 
  useMutation(({ id, data }: { id: number; data: any }) => 
    ratingAPI.update(id, data)
  );

export const useDeleteRating = () => 
  useMutation(ratingAPI.delete);

export const useSendMessage = () => 
  useMutation(({ chatId, data }: { chatId: number; data: any }) => 
    chatAPI.sendMessage(chatId, data)
  );

export const useUploadImage = () => 
  useMutation(imageAPI.upload);

export const useUpdateUserProfile = () => 
  useMutation(userAPI.updateProfile);

// Export all hooks
export default {
  // Authentication hooks
  useLogin,
  useRegister,
  useLogout,
  useVerifyToken,
  
  // Query hooks
  useHotels,
  useHotel,
  useHotelsByLocation,
  useHotelsByCategory,
  useHotelSearch,
  useRooms,
  useRoomsByHotel,
  useRoom,
  useReservations,
  useReservationsByUser,
  useReservation,
  useUserProfile,
  useUser,
  useRatingsByHotel,
  useUserChats,
  useChat,
  useChatMessages,
  useMessages,
  useMessage,
  
  // Mutation hooks
  useCreateReservation,
  useUpdateReservation,
  useCancelReservation,
  useCreateRating,
  useUpdateRating,
  useDeleteRating,
  useSendMessage,
  useUploadImage,
  useUpdateUserProfile,
};
