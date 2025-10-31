import { NavLink, Link } from "react-router";
import BtnPrimary from "../Buttons/BtnPrimary/BtnPrimary";
import BtnSecondary from "../Buttons/BtnSecondary/BtnSecondary";

const Navbar = () => {
  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"all-products"}>All Products</NavLink>
      </li>
      <li>
        <NavLink to={"my-products"}>My Products</NavLink>
      </li>
      <li>
        <NavLink to={"my-bids"}>My Bids</NavLink>
      </li>
      <li>
        <NavLink to={"create-product"}>Create Product</NavLink>
      </li>
    </>
  );
  return (
    <nav className={"py-2 bg-base-100 shadow-sm sticky top-0 z-50"}>
      <div className="navbar md:w-11/12 2xl:w-10/12 mx-auto">
        <div className="navbar-start">
          <Link to="/" className="relative">
            <h2 className="text-2xl md:text-3xl font-bold tracking-wide">
              Smart
              <span
                style={{ backgroundImage: "var(--gradient-primary)" }}
                className="bg-clip-text text-transparent"
              >
                Deals
              </span>
            </h2>
          </Link>
        </div>

        {/* desktop menu  */}
        <div className="navbar-center hidden lg:flex">
          <ul className="navlinks flex gap-9 font-medium">{links}</ul>
        </div>
        <div className="navbar-end">
          <div className="hidden lg:flex items-center gap-6">
            <BtnSecondary to={"/login"}>Login</BtnSecondary>

            <BtnPrimary to={"/register"} className={"text-white"}>
              Register
            </BtnPrimary>
          </div>

          {/* mobile menu  */}
          <div className="dropdown dropdown-end ">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 rotate-y-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="navlinks menu menu-lg dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text divide-y divide-gray-300"
            >
              {links}
              <li>
                <NavLink to={"/login"}>Login</NavLink>
              </li>
              <li>
                <NavLink to={"/register"}>Register</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
