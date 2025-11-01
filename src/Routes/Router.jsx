import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AllProducts from "../Pages/AllProducts/AllProducts";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import axios from "axios";
import CreateProduct from "../Pages/CreateProduct/CreateProduct";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";
import MyBids from "../Pages/MyBids/MyBids";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/product-details/:id",
        element: (
          <PrivateRoutes>
            <ProductDetails />
          </PrivateRoutes>
        ),
        loader: ({ params }) =>
          axios.get(`http://localhost:3000/products/${params.id}`),
      },
      {
        path: "/all-products",
        Component: AllProducts,
      },
      {
        path: "/my-bids",
        element: (
          <PrivateRoutes>
            <MyBids />
          </PrivateRoutes>
        ),
      },
      {
        path: "/create-product",
        element: (
          <PrivateRoutes>
            <CreateProduct />
          </PrivateRoutes>
        ),
      },
    ],
  },
]);
export default router;
