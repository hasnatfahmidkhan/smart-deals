import { useEffect, useRef, useState } from "react";
import Container from "../../Components/Container/Container";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
const MyProducts = () => {
  const [title, setTitle] = useState("");
  const [pImage, setPImage] = useState("");
  const [pLocation, setPLocation] = useState("");
  const [pDescription, setPDescription] = useState("");
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState({});
  const productEditRef = useRef(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get(`/my-products?email=${user?.email}`).then((data) => {
      setProducts(data.data);
    });
  }, [user, axiosSecure]);

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
        axiosSecure.delete(`products/${productId}`).then((data) => {
          if (data.data.deletedCount == 1) {
            const remainings = products.filter(
              (product) => product._id !== productId
            );
            setProducts(remainings);
          }
        });

        Swal.fire({
          title: "Deleted!",
          text: "Your bid has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handleUpdateStatus = (productId) => {
    axiosSecure
      .patch(`/products/${productId}`, { status: "sold" })
      .then((data) => {
        if (data.data.modifiedCount) {
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
    setTitle(product.title);
    setPImage(product.image);
    setPLocation(product.location);
    setPDescription(product.description);
    setEditProduct(product);
  };

  const handleEditProduct = (e) => {
    e.preventDefault();
    const editedProduct = {
      title: title,
      image: pImage,
      location: pLocation,
      description: pDescription,
    };
    axiosSecure
      .patch(`/products/${editProduct._id}`, { ...editedProduct })
      .then(({ data }) => {
        if (data.modifiedCount == 1) {
          const modifiedProducts = products.map((p) => {
            if (p._id === editProduct._id) {
              p.title = title;
              p.image = pImage;
              p.location = pLocation;
              p.description = pDescription;
            }
            return p;
          });
          setProducts(modifiedProducts);
          productEditRef.current.close();
          toast.success("Product Updated Successfully!");
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
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
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
                    onChange={(e) => setPImage(e.target.value)}
                    value={pImage}
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
                    onChange={(e) => setPLocation(e.target.value)}
                    value={pLocation}
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
                    onChange={(e) => setPDescription(e.target.value)}
                    value={pDescription}
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
