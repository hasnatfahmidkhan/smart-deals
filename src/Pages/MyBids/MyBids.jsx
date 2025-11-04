import { useEffect, useState } from "react";
import Container from "../../Components/Container/Container";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyBids = () => {
  const { user } = useAuth();
  const [bids, setBids] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get(`/bids/?email=${user?.email}`).then(({ data }) => {
      data.sort((a, b) => b.bid_price - a.bid_price);
      setBids(data);
    });
  }, [user, axiosSecure]);

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
          {bids.length}
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
                        <img
                          src={bid?.productsInfo?.image}
                          alt={bid?.productsInfo?.title}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">
                        {bid?.productsInfo?.title}
                      </div>
                      <div className="text-sm opacity-50">
                        ${bid?.productsInfo?.price_min}-
                        {bid?.productsInfo?.price_max}
                      </div>
                    </div>
                  </div>
                </td>
                {/* seller info  */}
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="rounded-full h-10 w-10">
                        <img
                          src={bid?.productsInfo?.seller_image}
                          alt={bid?.productsInfo?.seller_name}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">
                        {bid?.productsInfo?.seller_name}
                      </div>
                      <div className="text-sm opacity-50">
                        {bid?.productsInfo?.email}
                      </div>
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
