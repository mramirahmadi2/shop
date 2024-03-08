import { useState } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
interface ApiResponse<T> {
    data?: T;
    error: string | null;
  }
  

const usePostRequest = <T>(url: string): [(data: any) => Promise<ApiResponse<T>>, boolean, string | null] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postData = async (data: any): Promise<ApiResponse<T>> => {
    try {
      setLoading(true);
      const config: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers here if needed
        },
      };
      const response: AxiosResponse<T> = await axios.post(url, data, config);
      return { data: response.data, error: null };
    } catch (err:any) {
      setError(err.message || 'An error occurred');
      return { data: undefined, error: err.message || 'An error occurred' };
    } finally {
      setLoading(false);
    }
  };
  

  return [postData, loading, error];
};

export default usePostRequest;

