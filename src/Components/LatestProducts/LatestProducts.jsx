import React, { use } from "react";
import ProductCard from "../ProductCard/ProductCard";

const LatestProducts = ({ latestProductsPromise }) => {
  const { data: products } = use(latestProductsPromise);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default LatestProducts;
