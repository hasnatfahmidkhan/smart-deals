import React, { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router";
import Container from "../../Components/Container/Container";
import Swal from "sweetalert2";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const handleCreateProduct = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const {
      title,
      category,
      email,
      location,
      name,
      pCondition,
      pImage,
      price_max,
      price_min,
      productInfo,
      sContact,
      sImgURL,
      usageTime,
    } = formJson;
    const newProduct = {
      title: title,
      price_min: price_min,
      price_max: price_max,
      email: email,
      category: category,
      image: pImage,
      location: location,
      seller_image: sImgURL,
      seller_name: name,
      condition: pCondition,
      usage: usageTime,
      description: productInfo,
      seller_contact: sContact,
      status: "pending",
      created_at: new Date().toISOString(),
    };

    fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          form.reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your Product added Successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)]">
        <div className="text-center mb-5">
          <button
            onClick={() => navigate(-1)}
            className="cursor-pointer inline-flex items-center gap-2 hover:text-accent-content transition-colors duration-100"
          >
            <FiArrowLeft size={20} />
            Back To Products
          </button>
          <h1 className="text-3xl xl:text-5xl font-bold">
            Create{" "}
            <span
              style={{ backgroundImage: "var(--gradient-primary)" }}
              className="bg-clip-text text-transparent"
            >
              a Product
            </span>
          </h1>
        </div>
        {/* product form  */}
        <div className="max-w-2xl bg-white shadow-md p-7 md:p-10 mx-auto rounded-2xl">
          <form onSubmit={handleCreateProduct}>
            <fieldset className="fieldset space-y-3">
              {/* product title and category  */}
              <div className="flex flex-col md:flex-row items-center gap-3">
                {/* title  */}
                <div className="w-full md:w-1/2">
                  <label className="label">Title</label>
                  <input
                    type="text"
                    className="input focus:outline-none focus:border-[#632ee3] w-full"
                    placeholder="Your Product Title"
                    name="title"
                  />
                </div>
                {/* Select category  */}
                <div className="w-full md:w-1/2">
                  <label className="label">Category</label>
                  <select
                    name="category"
                    defaultValue="Pick a color"
                    className="select focus-within:outline-none focus-within:border-[#632ee3] w-full"
                  >
                    <option disabled={true} selected>
                      Select A Category
                    </option>
                    {categories?.map((cat) => (
                      <option value={cat.category} key={cat._id}>
                        {cat.category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* product price  */}
              <div className="flex flex-col md:flex-row items-center gap-3">
                <div className="w-full md:w-1/2">
                  <label className="label">
                    Min Price You want to Sale ($)
                  </label>
                  <input
                    type="text"
                    className="input focus:outline-none focus:border-[#632ee3] w-full"
                    placeholder="Your Product Min Price"
                    name="price_min"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label className="label">
                    Max Price You want to Sale ($)
                  </label>
                  <input
                    type="text"
                    className="input focus:outline-none focus:border-[#632ee3] w-full"
                    placeholder="Your Product Max Price"
                    name="price_max"
                  />
                </div>
              </div>

              {/* product usage */}
              <div className="flex flex-col md:flex-row items-center gap-3">
                <div className="w-full md:w-1/2 space-y-1">
                  <label className="label">Product Condition</label>
                  <div className="flex items-center gap-5">
                    <div className="flex items-center gap-2">
                      <label className="label cursor-pointer font-semibold text-black">
                        <input
                          type="radio"
                          name="pCondition"
                          className="radio radio-primary"
                          defaultChecked
                          defaultValue={"Brand New"}
                        />
                        Brand New
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="label cursor-pointer font-semibold text-black">
                        <input
                          type="radio"
                          name="pCondition"
                          className="radio radio-primary"
                          defaultValue={"Used"}
                        />
                        Used
                      </label>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <label className="label">Product Usage Time</label>
                  <input
                    type="text"
                    className="input focus:outline-none focus:border-[#632ee3] w-full"
                    placeholder="Your Product Usage Time"
                    name="usageTime"
                  />
                </div>
              </div>

              {/* image  */}
              <div>
                <label className="label">Your Product Image URL</label>
                <input
                  type="text"
                  name="pImage"
                  className="input w-full focus:outline-none focus:border-[#632ee3]"
                  placeholder="https://...your_img_url"
                />
              </div>

              {/* seller info  */}
              <div className="flex flex-col md:flex-row items-center gap-3">
                <div className="w-full md:w-1/2">
                  <label className="label">Seller Name</label>
                  <input
                    type="text"
                    className="input focus:outline-none focus:border-[#632ee3] w-full"
                    placeholder="Your Name"
                    name="name"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label className="label">Seller Email</label>
                  <input
                    type="email"
                    className="input focus:outline-none focus:border-[#632ee3] w-full"
                    placeholder="Your Email"
                    name="email"
                  />
                </div>
              </div>

              {/* seller contact  */}
              <div className="flex flex-col md:flex-row items-center gap-3">
                <div className="w-full md:w-1/2">
                  <label className="label">Seller Contact</label>
                  <input
                    type="text"
                    className="input focus:outline-none focus:border-[#632ee3] w-full"
                    placeholder="Your Contact"
                    name="sContact"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label className="label">Seller Image URL</label>
                  <input
                    type="text"
                    className="input focus:outline-none focus:border-[#632ee3] w-full"
                    placeholder="Your Image URL"
                    name="sImgURL"
                  />
                </div>
              </div>

              {/* location  */}
              <div>
                <label className="label">Location</label>
                <input
                  type="text"
                  name="location"
                  className="input w-full focus:outline-none focus:border-[#632ee3]"
                  placeholder="City, Country"
                />
              </div>
              {/* product info  */}
              <div>
                <label className="label">
                  Simple Description about your Product
                </label>
                <textarea
                  name="productInfo"
                  type="text"
                  rows={4}
                  className="textarea w-full focus:outline-none focus:border-[#632ee3]"
                  placeholder="Your Product Info..."
                />
              </div>
              <button
                type="submit"
                style={{ background: "var(--gradient-primary)" }}
                className="btn rounded-md text-white"
              >
                Create A Product
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default CreateProduct;
