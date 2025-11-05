import React, { use } from "react";
import AllProductsContext from "../../Context/AllProductsContext";
import ProductCard from "../../Components/ProductCard/ProductCard";
import Container from "../../Components/Container/Container";
import ProductCardSkeleton from "../../Components/ProductCardSkeleton/ProductCardSkeleton";

const AllProducts = () => {
  const { allProducts, loading } = use(AllProductsContext);

  return (
    <Container>
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {allProducts.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </Container>
  );
};

export default AllProducts;
