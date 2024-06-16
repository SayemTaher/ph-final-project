import React from 'react';
import useCart from '../Custom/useCart/useCart';
import { MdArrowForwardIos, MdOutlineArrowBackIosNew } from "react-icons/md";
import { ImBin2 } from "react-icons/im";
import Swal from "sweetalert2";
import useAxios from '../Custom/CustomAxios/useAxios';
import { Link } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";



const Mycart = () => {
    const [cart,refetch] = useCart()
    
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0)
    const axiosSecure = useAxios()
    const handleDelete = id => {
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
                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            
                          Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success",
                          });
                        refetch();
                        }
                    })
                
                
          }
        });
    }
    

    return (
      <div className="flex  flex-col justify-center items-center w-full  p-5 bg-gray-100 rounded-xl">
        <div className="flex flex-col gap-2 w-full border-b-2 border-dashed border-gray-4 00">
          <div className="flex items-center w-full justify-between">
            {cart.length === 0 ? (
              <Link to="/order/salad">
                <button className="btn btn-primary text-white">
                  <MdOutlineArrowBackIosNew /> Continue Shopping
                </button>
              </Link>
            ) : (
              <h1 className="font-bold text-2xl">
                Total Items - {cart.length}
              </h1>
            )}
            <h2 className="font-semibold text-xl  text-gray-800 rounded-md p-2">
              Total Price -{" "}
              <span className="text-orange-600 font-bold">$ {totalPrice}</span>{" "}
            </h2>
          </div>

          <div className="flex justify-end mb-10 ">
            <Link to="/dashboard/payment">
              <button
                disabled={!cart.length}
                className="flex items-center gap-2 bg-purple-900 text-white p-3 rounded-md  shadow-md"
              >
                {" "}
                Proceed to payment <MdArrowForwardIos></MdArrowForwardIos>{" "}
              </button>
            </Link>
          </div>
            </div>
            {
                cart.length === 0 && <div className="mt-5 mb-5 text-xl font-semibold bg-blue-100 text-blue-600 p-3 rounded-md">
           <span>You have no items in the cart !!</span>
        </div>
            }
        
        <div className="mt-5   w-full  p-5 ">
          {cart.length > 0 && (
            <div className="overflow-x-auto bg-white shadow-md p-5 ">
              <table className="table w-full">
                {/* head */}
                <thead>
                  <tr className="font-bold text-lg text-blue-900">
                    <th>Number</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, idx) => (
                    <tr key={item._id}>
                      <td>{idx + 1}</td>
                      <td>
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={item.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </td>
                      <td>{item.name}</td>
                      <td className="font-bold text-orange-600">
                        {" "}
                        $ {item.price}
                      </td>
                      <th>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="btn  text-red-600 btn-md"
                        >
                          <ImBin2></ImBin2>{" "}
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
};

export default Mycart;