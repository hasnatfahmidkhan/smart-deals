import React, { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router";
import Container from "../../Components/Container/Container";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectCat, setSelectCat] = useState("");
  const handleCreateProduct = (e) => {
    e.preventDefault();
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
        <div className="max-w-2xl bg-white shadow-md p-7 md:p-10 mx-auto rounded-2xl">
          <form onSubmit={handleCreateProduct}>
            <fieldset className="fieldset space-y-3">
              <div className="flex flex-col md:flex-row items-center gap-3">
                <div className="w-full md:w-1/2">
                  <label className="label">Title</label>
                  <input
                    type="text"
                    className="input focus:outline-none focus:border-[#632ee3] w-full"
                    placeholder="Your Product Title"
                    name="title"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label className="label">Buyer Email</label>
                  <select
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
                    type="email"
                    className="input focus:outline-none focus:border-[#632ee3] w-full"
                    placeholder="Your Product Max Price"
                    name="price_max"
                  />
                </div>
              </div>

              {/* image  */}
              <div>
                <label className="label">Your Product Image URL</label>
                <input
                  type="text"
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

              <div className="flex flex-col md:flex-row items-center gap-3">
                <div className="w-full md:w-1/2">
                  <label className="label">Seller Contact</label>
                  <input
                    type="text"
                    className="input focus:outline-none focus:border-[#632ee3] w-full"
                    placeholder="Your Contact"
                    name="price_min"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label className="label">Seller Image URL</label>
                  <input
                    type="email"
                    className="input focus:outline-none focus:border-[#632ee3] w-full"
                    placeholder="Your Product Max Price"
                    name="price_max"
                  />
                </div>
              </div>

              {/* price  */}
              <div>
                <label className="label">Location</label>
                <input
                  type="text"
                  name="bidPrice"
                  className="input w-full focus:outline-none focus:border-[#632ee3]"
                  placeholder="City, Country"
                />
              </div>
              {/* contact info  */}
              <div>
                <label className="label">
                  Simple Description about your Product
                </label>
                <textarea
                  name="contactInfo"
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
