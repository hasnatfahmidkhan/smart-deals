import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./Routes/Router.jsx";
import AuthProvider from "./Provider/AuthProvider/AuthProvider.jsx";
import AllProductsProvider from "./Provider/AllProductsProvider/AllProductsProvider.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <AllProductsProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AllProductsProvider>
    </AuthProvider>
  </StrictMode>
);
