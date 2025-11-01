import { use, useRef } from "react";
import Container from "../../Components/Container/Container";
import { useLoaderData, useNavigate } from "react-router";
import { FiArrowLeft } from "react-icons/fi";
import { format } from "date-fns";
import sellerimg from "../../assets/thumbnail-row.png";
import BtnPrimary from "../../Components/Buttons/BtnPrimary/BtnPrimary";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
const ProductDetails = () => {
  const { user } = use(AuthContext);
  const { data: product } = useLoaderData();
  const navigate = useNavigate();
  const bidModalRef = useRef();
  console.log(product);

  const {
    seller_contact,
    seller_name,
    title,
    price_min,
    price_max,
    email,
    category,
    image,
    status,
    location,
    condition,
    usage,
    description,
    _id,
    created_at,
    seller_image,
  } = product;

  const handleBidSubmit = (e) => {
    e.preventDefault();
    const bidPrice = e.target.bidPrice.value;
    const contactInfo = e.target.contactInfo.value;
    console.log(bidPrice, contactInfo);
  };

  return (
    <Container className={"my-10"}>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center gap-7">
          <div>
            <img
              className="w-full h-[300px] md:h-[500px] object-cover rounded-lg"
              src={image}
              alt=""
            />
          </div>
          <div className="bg-white py-6 px-5 rounded-md">
            <div className="space-y-7">
              <h3 className="text-xl font-semibold">Product Description</h3>
              <div className="flex items-center justify-between border-b py-2">
                <h4 className="font-medium">
                  <span
                    style={{ backgroundImage: "var(--gradient-primary)" }}
                    className="bg-clip-text text-transparent"
                  >
                    Condition:{" "}
                  </span>
                  {condition}
                </h4>

                <h4 className="font-medium ">
                  <span
                    style={{ backgroundImage: "var(--gradient-primary)" }}
                    className="bg-clip-text text-transparent"
                  >
                    Usage Time:{" "}
                  </span>
                  {usage}
                </h4>
              </div>
              <p className="text-accent-content">{description}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 justify-center">
          <div className="space-y-3">
            <button
              onClick={() => navigate(-1)}
              className="cursor-pointer inline-flex items-center gap-2 hover:text-accent-content transition-colors duration-100"
            >
              <FiArrowLeft size={20} />
              Back To Products
            </button>
            <h1 className="text-3xl xl:text-5xl font-bold">{title}</h1>
            <div
              style={{
                backgroundImage:
                  "linear-gradient(to right bottom, #632ee326, #9f62f226)",
              }}
              className="badge badge-soft badge-secondary text-[#632ee3] font-medium "
            >
              {category}
            </div>
          </div>

          {/* price  */}
          <div className="py-6 px-5 bg-white rounded-md space-y-1 shadow-md">
            <p className="text-xl text-[#4CAF50] font-semibold">
              ${price_min} - {price_max}
            </p>
            <p className="text-sm">Price starts from</p>
          </div>

          {/* product details  */}
          <div className="py-6 px-5 bg-white rounded-md shadow-md space-y-4">
            <p className="text-xl font-semibold">Product Details</p>
            <div className="space-y-1">
              <p className="text-sm">Product ID: {_id}</p>
              <p className="text-sm">
                Posted:{" "}
                {format(new Date(created_at).toLocaleString(), "MM/dd/yyyy")}
              </p>
            </div>
          </div>

          {/* seller info  */}
          <div className="py-6 px-5 bg-white rounded-md shadow-md space-y-4">
            <p className="text-xl font-semibold">Seller Information</p>
            <div className="flex items-center gap-5">
              <img className="w-12 h-12 rounded-full" src={sellerimg} alt="" />
              <div className="text-sm space-y-1">
                <p>{seller_name}</p>
                <p>{email}</p>
              </div>
            </div>

            {/* location contact status  */}
            <div className="space-y-2">
              <p>Location: {location}</p>
              <p>Contact: {seller_contact}</p>
              <p>
                Status:{" "}
                <span className="badge badge-warning text-secondary">
                  {status}
                </span>
              </p>
            </div>
          </div>
          {/* buy btn  */}
          <BtnPrimary
            onClick={() => bidModalRef.current.showModal()}
            className={"py-6.5"}
          >
            I want to Buy This Product
          </BtnPrimary>
        </div>
        {/* Bid MODAL  */}
        <dialog ref={bidModalRef} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-2xl text-center mt-3 mb-5">Give Seller your Offer Price</h3>

            <form onSubmit={handleBidSubmit}>
              <fieldset className="fieldset space-y-3">
                <div className="flex items-center gap-3">
                  <div>
                    <label className="label">Buyer Name</label>
                    <input
                      type="text"
                      defaultValue={user?.displayName}
                      readOnly
                      className="input focus:outline-none focus:border-[#632ee3]"
                      placeholder="Your Name"
                      name="name"
                    />
                  </div>
                  <div>
                    <label className="label">Buyer Email</label>
                    <input
                      defaultValue={user?.email}
                      readOnly
                      type="email"
                      className="input focus:outline-none focus:border-[#632ee3]"
                      placeholder="Your Email"
                      name="email"
                    />
                  </div>
                </div>

                {/* image  */}
                <div>
                  <label className="label">Buyer Image URL</label>
                  <input
                    type="text"
                    defaultValue={user?.photoURL}
                    readOnly
                    className="input w-full focus:outline-none focus:border-[#632ee3]"
                    placeholder="https://...your_img_url"
                  />
                </div>

                {/* price  */}
                <div>
                  <label className="label">Place Your Price</label>
                  <input
                    type="text"
                    name="bidPrice"
                    className="input w-full focus:outline-none focus:border-[#632ee3]"
                    placeholder="Place Your Price"
                  />
                </div>
                {/* contact info  */}
                <div>
                  <label className="label">Contact info</label>
                  <input
                    name="contactInfo"
                    type="text"
                    className="input w-full focus:outline-none focus:border-[#632ee3]"
                    placeholder="Your Contact Info"
                  />
                </div>
                <div className="justify-self-end space-x-3 mt-4">
                  <button
                    onClick={() => bidModalRef.current.close()}
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
                    Submit Bid
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
        </dialog>
      </div>
    </Container>
  );
};

export default ProductDetails;
