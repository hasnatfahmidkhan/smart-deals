import { useEffect, useState } from "react";
import AllProductsContext from "../../Context/AllProductsContext";

const AllProductsProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/latest-products")
      .then((res) => res.json())
      .then((data) => {
        setLatestProducts(data);
      });
  }, []);
  const products = {
    allProducts,
    latestProducts,
    setAllProducts,
    setLatestProducts,
  };
  return <AllProductsContext value={products}>{children}</AllProductsContext>;
};

export default AllProductsProvider;
