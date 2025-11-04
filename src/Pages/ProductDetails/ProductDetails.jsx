import { useEffect, useRef, useState } from "react";
import Container from "../../Components/Container/Container";
import { useNavigate, useParams } from "react-router";
import { FiArrowLeft } from "react-icons/fi";
import { format } from "date-fns";
import BtnPrimary from "../../Components/Buttons/BtnPrimary/BtnPrimary";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
const ProductDetails = () => {
  const { user } = useAuth();
  const [bids, setBids] = useState([]);
  const navigate = useNavigate();
  const [product, setProduct] = useState("");
  const bidModalRef = useRef();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    axiosSecure.get(`/products/${id}`).then(({ data }) => {
      setProduct(data);
    });
  }, [axiosSecure, id]);

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
    if (bidPrice.length === 1 || contactInfo.length === 1) {
      return "";
    }
    const newBid = {
      product: _id,
      buyer_image: user?.photoURL,
      buyer_name: user?.displayName,
      buyer_contact: contactInfo,
      buyer_email: user?.email,
      bid_price: bidPrice,
      status: "pending",
    };

    fetch("https://smart-deals-api-server-phi.vercel.app/bids", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          newBid._id = data.insertedId;
          const newBids = [...bids, newBid].sort(
            (a, b) => b.bid_price - a.bid_price
          );
          setBids(newBids);
          bidModalRef.current.close();
        }
      });
  };

  useEffect(() => {
    fetch(
      `https://smart-deals-api-server-phi.vercel.app/bids/byProduct/${_id}`,
      {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setBids(data);
      });
  }, [_id, user]);

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
                {created_at
                  ? format(new Date(created_at), "MM/dd/yyyy")
                  : "N/A"}
              </p>
            </div>
          </div>

          {/* seller info  */}
          <div className="py-6 px-5 bg-white rounded-md shadow-md space-y-4">
            <p className="text-xl font-semibold">Seller Information</p>
            <div className="flex items-center gap-5">
              <img
                className="w-12 h-12 rounded-full"
                src={seller_image}
                alt={seller_name}
              />
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
            <h3 className="font-bold text-2xl text-center mt-3 mb-5">
              Give Seller your Offer Price
            </h3>

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
                    required
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
                    required
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

      {/* Bids for this product  */}
      {bids.length > 0 && (
        <div className="md:mt-30">
          <h2 className="capitalize md:text-5xl font-bold tracking-wide">
            Bids for this product:{" "}
            <span
              style={{ backgroundImage: "var(--gradient-primary)" }}
              className="bg-clip-text text-transparent"
            >
              {bids.length}
            </span>
          </h2>

          {/* Table  */}
          <div className="overflow-x-auto mt-10">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>SL NO</th>
                  <th>Product</th>
                  <th>Buyer</th>
                  <th>Bid Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bids.map((bid, index) => (
                  <tr key={bid._id} className="">
                    <td className="font-semibold">{index + 1}</td>
                    {/* product  */}
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="rounded-md h-8 w-12">
                            <img src={image} alt={title} />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{title}</div>
                          <div className="text-sm opacity-50">
                            ${price_min}-{price_max}
                          </div>
                        </div>
                      </div>
                    </td>
                    {/* seller info  */}
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="rounded-full h-10 w-10">
                            <img src={bid.buyer_image} alt={bid.buyer_name} />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{bid.buyer_name}</div>
                          <div className="text-sm opacity-50">
                            {bid.buyer_email}
                          </div>
                        </div>
                      </div>
                    </td>
                    {/* bid price  */}
                    <td className="font-semibold">${bid.bid_price}</td>
                    <td className="space-x-3">
                      <button className="btn btn-outline btn-sm btn-success">
                        Accept Offer
                      </button>
                      <button className="btn btn-outline btn-sm btn-error">
                        Reject Offer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Container>
  );
};

export default ProductDetails;
