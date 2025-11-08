import React, { use } from "react";
import { Link, NavLink } from "react-router";
import AuthContext from "../Context/AuthContext";
import { FaUserCircle } from "react-icons/fa";

import { toast, ToastContainer } from "react-toastify";


const Navbar = () => {
  const { user, UserSignOut } = use(AuthContext);

  const handleSignOut = () => {
    UserSignOut()
      .then(() => {
        toast("You signed out successfully.");
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/products">Products</NavLink>
      </li>
      {/* {user && (
        <>
          <li>
            <NavLink to="/myproducts">MyProducts</NavLink>
          </li>
          <li>
            <NavLink to="/mybids">MyBids</NavLink>
          </li>
          <li>
            <NavLink to="/createproduct">CreateAProduct</NavLink>
          </li>
        </>
      )} */}

      <li>
        <NavLink to="/aboutus">About Us</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 md:px-10">
      {/* <ToastContainer></ToastContainer> */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <div className="flex items-center justify-center gap-1.5">
          {/* <img className="w-5 h-5" alt="" /> */}
          <Link to="/" className=" normal-case text-xl font-bold">
            Smart<span>Deals</span>
          </Link>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end flex items-center gap-3">
        {user ? (
          <>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className=" m-1">
                <NavLink to="/profile">
                  <div className="flex flex-col items-center ">
                    <div
                      className="tooltip tooltip-bottom"
                      data-tip={user.displayName || "No User"}
                    >
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.displayName || "User"}
                          className="w-10 h-10 rounded-full border cursor-pointer"
                        />
                      ) : (
                        <FaUserCircle className="text-3xl text-gray-600 cursor-pointer" />
                      )}
                    </div>
                  </div>
                </NavLink>
              </div>
              <ul
                tabIndex="-1"
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <NavLink to="/myproducts">MyProducts</NavLink>
                </li>
                <li>
                  <NavLink to="/mybids">MyBids</NavLink>
                </li>
                <li>
                  <NavLink to="/createproduct">CreateAProduct</NavLink>
                </li>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="btn btn-outline btn-primary btn-sm"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <Link to="/auth/login" className="btn btn-primary btn-sm">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
