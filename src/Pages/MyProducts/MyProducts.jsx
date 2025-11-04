import React, { useEffect, useRef, useState } from "react";
import Container from "../../Components/Container/Container";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const MyProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState({});
  const productEditRef = useRef(null);

  useEffect(() => {
    fetch(`http://localhost:3000/my-products?email=${user?.email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, [user]);

  const handleDeleteproduct = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/products/${productId}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount == 1) {
              const remainings = products.filter(
                (product) => product._id !== productId
              );
              setProducts(remainings);
            }
          });
        // fetch end
        Swal.fire({
          title: "Deleted!",
          text: "Your bid has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handleUpdateStatus = (productId) => {
    fetch(`http://localhost:3000/products/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "sold" }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          const modifiedProducts = products.map((p) => {
            if (p._id === productId) {
              p.status = "Sold";
            }
            return p;
          });
          setProducts(modifiedProducts);
        }
      });
  };

  const handleProductModal = (productId) => {
    productEditRef.current.showModal();
    const product = products.find((p) => p._id === productId);
    setEditProduct(product);
  };

  const handleEditProduct = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    fetch(`http://localhost:3000/products/${editProduct._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ ...formJson }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount == 1) {
          const modifiedProducts = products.map((p) => {
            if (p._id === editProduct._id) {
              p.title = formJson.title;
              p.image = formJson.image;
              p.location = formJson.location;
              p.description = formJson.description;
            }
            return p;
          });
          setProducts(modifiedProducts);
          productEditRef.current.close();
        }
      });
  };

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
                {/* action  */}
                <td className="flex items-center gap-3">
                  <button
                    onClick={() => handleProductModal(product._id)}
                    className="btn btn-outline btn-sm btn-primary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteproduct(product._id)}
                    className="btn btn-outline btn-sm btn-error"
                  >
                    Delete
                  </button>
                  <button
                    disabled={product.status !== "pending"}
                    onClick={() => handleUpdateStatus(product._id)}
                    className="btn btn-outline btn-sm btn-success"
                  >
                    {product.status == "pending" ? "Make sold" : "Already sold"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* update product modal  */}
      <dialog
        ref={productEditRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <div className="max-w-2xl bg-white shadow-md mx-auto rounded-2xl p-7 md:p-10">
            <form onSubmit={handleEditProduct}>
              <fieldset className="fieldset space-y-3">
                {/* product title and category  */}
                {/* title  */}
                <div className="w-full">
                  <label className="label">Title</label>
                  <input
                    defaultValue={editProduct?.title}
                    type="text"
                    className="input focus:outline-none focus:border-[#632ee3] w-full"
                    placeholder="Your Product Title"
                    name="title"
                    required
                  />
                </div>

                {/* image  */}
                <div>
                  <label className="label">Your Product Image URL</label>
                  <input
                    required
                    type="text"
                    name="image"
                    className="input w-full focus:outline-none focus:border-[#632ee3]"
                    placeholder="https://...your_img_url"
                    defaultValue={editProduct?.image}
                  />
                </div>

                {/* location  */}
                <div>
                  <label className="label">Location</label>
                  <input
                    type="text"
                    required
                    name="location"
                    className="input w-full focus:outline-none focus:border-[#632ee3]"
                    placeholder="City, Country"
                    defaultValue={editProduct?.location}
                  />
                </div>
                {/* product info  */}
                <div>
                  <label className="label">
                    Simple Description about your Product
                  </label>
                  <textarea
                    name="description"
                    type="text"
                    rows={4}
                    className="textarea w-full focus:outline-none focus:border-[#632ee3]"
                    placeholder="Your Product Info..."
                    defaultValue={editProduct?.description}
                  />
                </div>

                <div className="flex items-center justify-end gap-3">
                  <button
                    onClick={() => productEditRef.current.close()}
                    type="button"
                    className="btn font-semibold px-7 text-[#632ee3] border border-[#632ee3] rounded-md bg-transparent"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    style={{ background: "var(--gradient-primary)" }}
                    className="btn rounded-md text-white"
                  >
                    Update Details
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </dialog>
    </Container>
  );
};

export default MyProducts;
