import React, { use, useEffect, useState } from "react";
import Container from "../../Components/Container/Container";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

const MyProducts = () => {
  const { user } = use(AuthContext);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/products?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, [user?.email]);
  return (
    <Container>
      <h3 className="text-5xl font-bold text-center tracking-wide">
        My products:{" "}
        <span
          style={{ backgroundImage: "var(--gradient-primary)" }}
          className="bg-clip-text text-transparent"
        >
          {products.length}
        </span>
      </h3>

      {/* Table  */}
      <div className="overflow-x-auto mt-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL NO</th>
              <th>Image</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id} className="">
                {/* Sl No */}
                <td className="font-semibold">{index + 1}</td>
                {/* Image  */}
                <td>
                  <div className="avatar">
                    <div className="rounded-md h-8 w-12">
                      <img src={product.image} alt={product.title} />
                    </div>
                  </div>
                </td>

                {/* Product Name */}
                <td className="font-semibold">{product.title}</td>
                {/* Product category */}
                <td className="font-semibold">{product.category}</td>

                {/* product price  */}
                <td className="font-semibold">
                  ${product.price_min} - {product.price_max}
                </td>

                {/* status  */}
                <td>
                  <span className="badge badge-warning text-primary">
                    {product.status}
                  </span>
                </td>
                <td className="space-x-3">
                  <button
                    // onClick={() => handleDeleteproduct(product._id)}
                    className="btn btn-outline btn-sm btn-primary"
                  >
                    Edit
                  </button>
                  <button
                    // onClick={() => handleDeleteproduct(product._id)}
                    className="btn btn-outline btn-sm btn-error"
                  >
                    Delete
                  </button>
                  <button
                    // onClick={() => handleDeleteproduct(product._id)}
                    className="btn btn-outline btn-sm btn-success"
                  >
                    Make Sold
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default MyProducts;
