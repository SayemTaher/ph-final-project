import React from 'react';
import { Link } from 'react-router-dom';
import { TiShoppingCart } from "react-icons/ti";

const Header = () => {
    const navBar = (
      <div className='flex lg:flex-row items-center flex-col gap-2 p-3 '>
        <li>
          <Link>Home</Link>
        </li>
        <li>
          <Link>Dashboard</Link>
        </li>

        <li>
          <Link>Contact Us</Link>
        </li>
        <li>
          <Link>Our Menu</Link>
        </li>
        <li>
          <Link>Our Shop</Link>
        </li>
        <li>
          <Link><TiShoppingCart></TiShoppingCart></Link>
            </li>
            
      </div>
    );
    return (
      <div>
        <div className="navbar text-white fixed max-w-screen-xl mx-auto z-50 bg-opacity-50 bg-black">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
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
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {navBar}
              </ul>
            </div>
            <a className="btn btn-ghost text-xl">Bistro Boss</a>
          </div>
          <div className='flex gap-5'>
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">{navBar}</ul>
            </div>
            <div className="navbar-end">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Header;