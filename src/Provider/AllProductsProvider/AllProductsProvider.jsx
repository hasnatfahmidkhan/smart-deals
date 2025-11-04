import { useEffect, useState } from "react";
import AllProductsContext from "../../Context/AllProductsContext";

const AllProductsProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/latest-products")
      .then((res) => res.json())
      .then((data) => {
        setLatestProducts(data);
        setLoading(false);
      });
  }, []);
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
