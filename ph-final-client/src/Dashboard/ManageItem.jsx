import React from 'react';
import SectionTitle from '../Components/SectionTitle';
import UseMenu from '../Custom/useMenu/UseMenu';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useAxios from '../Custom/CustomAxios/useAxios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const ManageItem = () => {
    const [item,loading,refetch] = UseMenu()
    const axiosSecure = useAxios()
    const handleItemDeletion = (id) => {
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then(async(result) => {
            if (result.isConfirmed) {
                try {
                  const res = await axiosSecure.delete(`/menu/${id}`);
                  console.log("Deletion response:", res); 
                  if (res.data.deletedCount > 0) {
                    Swal.fire({
                      title: "Deleted!",
                      text: "Your file has been deleted.",
                      icon: "success",
                    });
                    refetch(); 
                  }
                } catch (error) {
                  console.error("Deletion error:", error); 
                }
               
              
            }
          });

    }
    
    const handleItemEdit = (item) => {

    };





  
    return (
      <div>
        <div>
          <SectionTitle
            heading="All Available Items"
            subHeading="Maintain Items below"
          ></SectionTitle>
        </div>
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead className="font-bold text-blue-900 text-lg">
                <tr>
                  <th>Serial</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>

                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {item.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td className="border-t-2 ">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </td>
                    <td className="border-t-2 ">{item.name}</td>
                    <td className="border-t-2 font-bold text-orange-600">
                      $ {item.price}
                    </td>
                    <td className="border-t-2 ">
                      <Link to={`/dashboard/updateItem/${item._id}`}>
                        <button
                          className="btn btn-ghost shadow-md text-xl bg-white text-blue-500 "
                          onClick={() => handleItemEdit(item._id)}
                        >
                          <FaEdit></FaEdit>
                        </button>
                      </Link>
                    </td>
                    <td className="border-t-2 ">
                      <button
                        className="btn btn-ghost shadow-md text-xl bg-white text-red-500 "
                        onClick={() => handleItemDeletion(item._id)}
                      >
                        {" "}
                        <MdDelete></MdDelete>{" "}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
};

export default ManageItem;