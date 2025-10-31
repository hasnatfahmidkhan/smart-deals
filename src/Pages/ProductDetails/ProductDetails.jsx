import React from "react";
import Container from "../../Components/Container/Container";
import { useLoaderData, useNavigate } from "react-router";
import productImg from "../../assets/thumbnail-details.png";
import { FiArrowLeft } from "react-icons/fi";
import { format } from "date-fns";
import sellerimg from "../../assets/thumbnail-row.png";
import BtnPrimary from "../../Components/Buttons/BtnPrimary/BtnPrimary";
const ProductDetails = () => {
  const { data: product } = useLoaderData();
  const navigate = useNavigate();
  console.log(product);
  //   {"_id":{"$oid":"6904bf12ac31646ca5c517b5"},
  // "title":"iPhone 13 Pro Max",
  // "price_min":{"$numberInt":"850"},
  // "price_max":{"$numberInt":"950"},
  // "email":"ahmedseller@gmail.com",
  // "category":"Electronics",
  // "created_at":"2025-10-25T14:32:00Z",
  // "image":"https://example.com/images/iphone13promax.jpg",
  // "status":"pending",
  // "location":"Dhaka",
  // "seller_image":"https://example.com/sellers/ahmed.jpg",
  // "seller_name":"Ahmed Rahman",
  // "condition":"used",
  // "usage":"8 months old",
  // "description":"iPhone 13 Pro Max 256GB, perfect condition, battery health 96%.",
  // "seller_contact":"+8801712345678"}
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
  return (
    <Container className={"my-10"}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center gap-7">
          <div>
            <img className="w-full max-h-[800px]" src={productImg} alt="" />
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
            onClick={() => document.getElementById("bidModal").showModal()}
            className={"py-6.5"}
          >
            I want to Buy This Product
          </BtnPrimary>
          {/* modal  */}
          <dialog id="bidModal" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Hello!</h3>
              <p className="py-4">
                Press ESC key or click the button below to close
              </p>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetails;
