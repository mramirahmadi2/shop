import { useState } from 'react';
import axios, { AxiosError } from 'axios';

interface UseDeleteHookResponse<T> {
  data: T | null;
  error: AxiosError | null;
  isLoading: boolean;
  deleteData: () => void;
}

const useDeleteHook = <T>(url: string): UseDeleteHookResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const deleteData = async () => {
    setIsLoading(true);
    try {
      await axios.delete<T>(url);
      setData(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, deleteData };
};

export default useDeleteHook;
