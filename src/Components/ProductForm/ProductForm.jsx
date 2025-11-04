import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const ProductForm = ({ submitHandler }) => {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

  return (
    <div className="max-w-2xl bg-white shadow-md mx-auto rounded-2xl p-7 md:p-10">
      <form onSubmit={submitHandler}>
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
                required
              />
            </div>
            {/* Select category  */}
            <div className="w-full md:w-1/2">
              <label className="label">Category</label>
              <select
                name="category"
                className="select focus-within:outline-none focus-within:border-[#632ee3] w-full"
              >
                <option disabled={true} selected>
                  Select A Category
                </option>
                {categories?.map((cat) => (
                  <option key={cat._id}>{cat.category}</option>
                ))}
              </select>
            </div>
          </div>
          {/* product price  */}
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-full md:w-1/2">
              <label className="label">Min Price You want to Sale ($)</label>
              <input
                type="text"
                className="input focus:outline-none focus:border-[#632ee3] w-full"
                placeholder="Your Product Min Price"
                required
                name="price_min"
              />
            </div>
            <div className="w-full md:w-1/2">
              <label className="label">Max Price You want to Sale ($)</label>
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
                <label className="label cursor-pointer font-semibold text-black">
                  <input
                    required
                    type="radio"
                    name="pCondition"
                    className="radio radio-primary"
                    defaultValue={"Brand New"}
                    defaultChecked
                  />
                  Brand New
                </label>
                <label className="label cursor-pointer font-semibold text-black">
                  <input
                    type="radio"
                    required
                    name="pCondition"
                    className="radio radio-primary"
                    defaultValue={"Used"}
                  />
                  Used
                </label>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <label className="label">Product Usage Time</label>
              <input
                required
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
              required
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
                defaultValue={user?.displayName}
                readOnly
              />
            </div>
            <div className="w-full md:w-1/2">
              <label className="label">Seller Email</label>
              <input
                type="email"
                className="input focus:outline-none focus:border-[#632ee3] w-full"
                placeholder="Your Email"
                name="email"
                defaultValue={user?.email}
                readOnly
              />
            </div>
          </div>
          {/* seller contact  */}
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-full md:w-1/2">
              <label className="label">Seller Contact</label>
              <input
                type="text"
                required
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
                defaultValue={user.photoURL}
                readOnly
              />
            </div>
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
  );
};

export default ProductForm;
