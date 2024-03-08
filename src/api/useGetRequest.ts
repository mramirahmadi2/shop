import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

interface ApiResponse {
  id: number;
  group: string;
  title: string;
  writer: string;
  category: string;
  price: number;
  number: number;
  image: string;
}

const useGetRequest = (url: string) => {
  const [data, setData] = useState<ApiResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<ApiResponse[]> = await axios.get(url);
        setData(response.data);
      } catch (error) {
        setError('خطا در دریافت اطلاعات');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useGetRequest;
