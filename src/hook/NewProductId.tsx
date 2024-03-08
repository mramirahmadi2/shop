import { useState, useEffect } from "react";

const useNewProductId = (url: string) => {
  const [latestProductId, setLatestProductId] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestProductId = async () => {
      try {
        const response = await fetch(url);
        const products = await response.json();
        const latestProduct = products[products.length - 1];
        setLatestProductId(`${++latestProduct.id }`);
      } catch (error) {
        console.error("Error fetching latest product id:", error);
        setLatestProductId(null);
      }
    };

    fetchLatestProductId();
  }, [url]);

  return latestProductId;
};

export default useNewProductId;
