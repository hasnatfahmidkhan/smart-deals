import { NavLink, Link } from "react-router";
import BtnPrimary from "../Buttons/BtnPrimary/BtnPrimary";
import BtnSecondary from "../Buttons/BtnSecondary/BtnSecondary";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, signoutFunc } = useAuth();
  const handleSignOut = () => {
    signoutFunc()
      .then(() => {
        toast.success("Logout Successfully!");
      })
      .then((err) => {
        alert(err.message);
      });
  };
  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/all-products"}>All Products</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to={"/my-products"}>My Products</NavLink>
          </li>
          <li>
            <NavLink to={"/my-bids"}>My Bids</NavLink>
          </li>
          <li>
            <NavLink to={"/create-product"}>Create Product</NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <nav className={"py-2 bg-base-100 shadow-sm sticky top-0 z-50"}>
      <div className="navbar md:w-11/12 2xl:w-7xl mx-auto md:px-4">
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
            {user ? (
              <>
                <label className="swap swap-rotate">
                  {/* this hidden checkbox controls the state */}
                  <input
                    type="checkbox"
                    className="theme-controller"
                    value="dark"
                  />

                  {/* sun icon */}
                  <svg
                    className="swap-off h-8 w-8 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                  </svg>

                  {/* moon icon */}
                  <svg
                    className="swap-on h-8 w-8 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                  </svg>
                </label>
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn border-none bg-transparent p-0"
                  >
                    <img
                      className="w-12 h-12 rounded-full"
                      src={user.photoURL}
                      alt={user.displayName}
                    />
                  </div>
                  <ul
                    tabIndex="-1"
                    className="dropdown-content menu bg-base-100 rounded-box z-1 p-4 space-y-2 shadow-sm text-center"
                  >
                    <div className="text-accent-content">
                      <h4>{user.displayName}</h4>
                      <p>{user.email}</p>
                    </div>
                    <BtnPrimary onClick={handleSignOut}>Signout</BtnPrimary>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <BtnSecondary to={"/login"}>Login</BtnSecondary>

                <BtnPrimary to={"/register"} className={"text-white"}>
                  Register
                </BtnPrimary>
              </>
            )}
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
              {user ? (
                <li onClick={handleSignOut} className="text-lg cursor-pointer">
                  <span>Signout</span>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to={"/login"}>Login</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/register"}>Register</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
