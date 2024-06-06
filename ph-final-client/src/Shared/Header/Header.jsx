import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { TiShoppingCart } from "react-icons/ti";
import { AuthContext } from '../../Providers/AuthContextProvider/AuthProvider';
import toast from 'react-hot-toast';
import useCart from '../../Custom/useCart/useCart';

const Header = () => {
  const { user, logOut } = useContext(AuthContext)
  const [cart] = useCart()
  const handleSignOut = () => {
    logOut()
      .then(() => {
      toast.success('Successfully logged out')
      })
      .catch(error => {
      toast.error(error.message)
    })
  
  }
    const navBar = (
      <div className="flex lg:flex-row items-center flex-col gap-2  ">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link>Dashboard</Link>
        </li>

        <li>
          <Link>Contact Us</Link>
        </li>
        <li>
          <Link to="/menu">Our Menu</Link>
        </li>
        <li>
          <Link to="/order/salad">Our Shop</Link>
        </li>
        <li>
          <Link to='/dashboard/cart'>
            <button className='flex'>
               <TiShoppingCart className="text-2xl"></TiShoppingCart>
              <sup className="badge badge-secondary">{cart.length}</sup>
            </button>
           
          </Link>
        </li>
        {!user && (
          <li>
            <Link to="/register">Register</Link>
          </li>
        )}
        {!user && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </div>
    );
    return (
      <div>
        <div className="flex items-center justify-between text-white fixed w-[1280px]   container mx-auto z-50 bg-opacity-50 bg-black">
          <div>
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
          <div className="flex gap-5">
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">{navBar}</ul>
            </div>
            <div>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    {user ? (
                      <img
                        alt="Tailwind CSS Navbar component"
                        src={user.photoURL}
                      />
                    ) : (
                      <img
                        alt="Tailwind CSS Navbar component"
                        src="https://i.ibb.co/nC23FQB/Screenshot-2024-04-15-at-15-53-08.png"
                      />
                    )}
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a className="justify-between text-gray-700 text-xl">{user?.displayName}</a>
                  </li>
                  <li>
                    <a className="text-gray-500">{user?.email}</a>
                  </li>
                  <li>
                    {user ? (
                      <Link>
                        <button
                          className="btn btn-error text-white rounded-full"
                          onClick={handleSignOut}
                        >
                          Sign Out
                        </button>
                      </Link>
                    ) : (
                      <Link to='/login'>
                        <button
                          className="btn btn-error text-white rounded-full"
                          
                        >
                          Sign In
                        </button>
                      </Link>
                    )}
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