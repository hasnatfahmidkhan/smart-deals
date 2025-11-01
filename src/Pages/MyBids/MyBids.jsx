import React, { use, useEffect, useState } from "react";
import Container from "../../Components/Container/Container";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import sellerimg from "../../assets/thumbnail-row.png";
import Swal from "sweetalert2";

const MyBids = () => {
  const { user } = use(AuthContext);
  const [bids, setBids] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/bids/?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        data.sort((a, b) => b.bid_price - a.bid_price);
        setBids(data);
      });
  }, [user?.email]);

  //   delete bid
  const handleDeleteBid = (id) => {
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
        fetch(`http://localhost:3000/bids/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount == 1) {
              const remainings = bids.filter((bid) => bid._id !== id);
              setBids(remainings);
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

  return (
    <Container className={"md:pt-20"}>
      <h3 className="text-5xl font-bold text-center tracking-wide">
        My Bids:{" "}
        <span
          style={{ backgroundImage: "var(--gradient-primary)" }}
          className="bg-clip-text text-transparent"
        >
          {10}
        </span>
      </h3>

      {/* Table  */}
      <div className="overflow-x-auto mt-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL NO</th>
              <th>Product</th>
              <th>Seller</th>
              <th>Bid Price</th>
              <th>Status</th>
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
                        {/* <img src={image} alt={title} /> */}
                      </div>
                    </div>
                    <div>
                      {/* <div className="font-bold">{title}</div> */}
                      <div className="text-sm opacity-50">
                        {/* ${price_min}-{price_max} */}
                      </div>
                    </div>
                  </div>
                </td>
                {/* seller info  */}
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="rounded-full h-10 w-10">
                        {/* <img src={sellerimg} alt={seller_name} /> */}
                      </div>
                    </div>
                    <div>
                      {/* <div className="font-bold">{seller_name}</div> */}
                      {/* <div className="text-sm opacity-50">{email}</div> */}
                    </div>
                  </div>
                </td>

                {/* bid price  */}
                <td className="font-semibold">${bid.bid_price}</td>

                {/* status  */}
                <td>
                  <span className="badge badge-warning text-primary">
                    {bid.status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteBid(bid._id)}
                    className="btn btn-outline btn-sm btn-error"
                  >
                    Remove Bid
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

export default MyBids;
