import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxios from "../Custom/CustomAxios/useAxios";
import { RiDeleteBin4Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import { FaUsers } from "react-icons/fa6";
const Users = () => {
  const axiosSecure = useAxios();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
        const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleDelete = (user) => {
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
          axiosSecure.delete(`/users/${user._id}`)
              .then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
        refetch();
      }
    });
  };
    
// make an user an admin
    
  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Successfull!",
          text: `${user.name} is now an Admin`,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch()
      }
    });
  };
  return (
    <div className="flex flex-col justify-center    pl-10 pr-10 ">
      <div>
        <h1 className="text-2xl bg-green-200 p-2 rounded-md shadow-md max-w-[250px] text-center font-bold ">
          Number of Users - {users.length}{" "}
        </h1>
        <div className="mt-10 ">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="font-bold text-lg">
                  <th>Serial </th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr className="border-t-2 border-b-2" key={user._id}>
                    <th className="border-t-2 border-b-2">{index + 1}</th>
                    <td className="border-t-2 border-b-2">{user.name}</td>
                    <td className="border-t-2 font-bold border-b-2">
                      {user.email}
                    </td>

                    <td className="border-t-2 border-b-2">
                      { user.role === 'admin' ? <span className="bg-blue-100 p-2 font-bold rounded-md">Admin</span>  :
                        <button
                          className="btn btn-ghost text-blue-500 bg-white text-xl "
                          onClick={() => handleMakeAdmin(user)}
                        >
                          <FaUsers></FaUsers>
                        </button>
                      }
                    </td>
                    <th className="border-t-2 border-b-2">
                      <button
                        className="btn btn-ghost text-red-500 bg-white text-xl "
                        onClick={() => handleDelete(user)}
                      >
                        <RiDeleteBin4Fill></RiDeleteBin4Fill>
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
