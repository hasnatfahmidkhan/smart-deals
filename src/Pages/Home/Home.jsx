import Banner from "../../Components/Banner/Banner";
import Container from "../../Components/Container/Container";
import LatestProducts from "../../Components/LatestProducts/LatestProducts";
import { Suspense, use } from "react";
import ProductCardSkeleton from "../../Components/ProductCardSkeleton/ProductCardSkeleton";
import AllProductsContext from "../../Context/AllProductsContext";

const Home = () => {
  const { latestProducts, loading } = use(AllProductsContext);
  return (
    <section>
      <Banner />;
      <Container className={"md:mt-10"}>
        <h3 className="text-center text-3xl md:text-5xl font-bold mb-7">
          Recent{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "var(--gradient-primary)" }}
          >
            Products
          </span>
        </h3>
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        )}
        <LatestProducts latestProducts={latestProducts} />
        {/* </Suspense> */}
      </Container>
    </section>
  );
};

export default Home;
