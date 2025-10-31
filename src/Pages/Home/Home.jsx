import axios from "axios";
import Banner from "../../Components/Banner/Banner";
import Container from "../../Components/Container/Container";
import LatestProducts from "../../Components/LatestProducts/LatestProducts";
import { Suspense } from "react";
import ProductCardSkeleton from "../../Components/ProductCardSkeleton/ProductCardSkeleton";

const latestProductsPromise = axios.get(
  "http://localhost:3000/latest-products"
);

const Home = () => {
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
        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
              {[...Array(8)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <LatestProducts latestProductsPromise={latestProductsPromise} />
        </Suspense>
      </Container>
    </section>
  );
};

export default Home;
