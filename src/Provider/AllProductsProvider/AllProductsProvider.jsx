import { useEffect, useState } from "react";
import AllProductsContext from "../../Context/AllProductsContext";
import useAxios from "../../hooks/useAxios";

const AllProductsProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();

  useEffect(() => {
    setLoading(true);
    axiosInstance.get("/products").then((data) => {
      setAllProducts(data.data);
      setLoading(false);
    });
  }, [axiosInstance]);

  useEffect(() => {
    setLoading(true);
    axiosInstance.get("/latest-products").then((data) => {
      setLatestProducts(data.data);
      setLoading(false);
    });
  }, [axiosInstance]);
  const products = {
    allProducts,
    latestProducts,
    setAllProducts,
    setLatestProducts,
    loading,
  };

  return <AllProductsContext value={products}>{children}</AllProductsContext>;
};

export default AllProductsProvider;
