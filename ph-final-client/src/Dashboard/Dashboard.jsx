import { NavLink, Outlet } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { RiUserReceived2Line } from "react-icons/ri";
import { MdShoppingCart } from "react-icons/md";
import { VscPreview } from "react-icons/vsc";
import { FaListUl } from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";
import { ImSpoonKnife } from "react-icons/im";
import { FaUserEdit } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import useAdmin from "../Custom/useAdmin/useAdmin";
import useCart from "../Custom/useCart/useCart";
import { MdPayment } from "react-icons/md";
const Dashboard = () => {
    const [isAdmin] = useAdmin()
    const[cart] = useCart()
    return (
      <div className="flex ">
        <div className="w-64 flex flex-col  p-5 min-h-screen bg-blue-100">
          {isAdmin ? (
            <>
              <h1 className="text-2xl bg-white shadow-md border-2 border-blue-900   p-5 rounded-xl text-center font-bold">
                Bistro Boss <br />
                <span className="text-sm">Admin Dashboard</span>
              </h1>
            </>
          ) : (
            <>
              <h1 className="text-2xl bg-white shadow-md border-2 border-blue-900   p-5 rounded-xl text-center font-bold">
                Bistro Boss <br />
                <span className="text-sm">Customer Dashboard</span>
              </h1>
            </>
          )}
          <ul className="border-2 menu mt-5 rounded-xl p-5 h-[600px] justify-center gap-5 border-blue-900">
            {isAdmin ? (
              <>
                <li>
                  <NavLink to="/dashboard/adminHome">
                    {" "}
                    <FaHome></FaHome> Admin Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/addItems">
                    {" "}
                    <ImSpoonKnife></ImSpoonKnife> Add Items
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manageItem">
                    {" "}
                    <FaUserEdit></FaUserEdit> Manage Items
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/bookings">
                    {" "}
                    <GiNotebook></GiNotebook> Manage Bookings
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/users">
                    {" "}
                    <FaUsers></FaUsers> All Users
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/dashboard/userHome">
                    {" "}
                    <FaHome></FaHome> User Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/reservation">
                    {" "}
                    <RiUserReceived2Line></RiUserReceived2Line> Reservation
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/cart">
                    {" "}
                    <MdShoppingCart></MdShoppingCart> My Cart ({cart.length})
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/review">
                    {" "}
                    <VscPreview></VscPreview> Add a review
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/bookings">
                    {" "}
                    <FaListUl></FaListUl> My Bookings
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/paymentHistory">
                    {" "}
                    <MdPayment></MdPayment>Payment History
                  </NavLink>
                </li>
              </>
            )}
            <div className="divider"></div>
            <li>
              <NavLink to="/">
                {" "}
                <FaHome></FaHome> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/menu">
                {" "}
                <MdRestaurantMenu></MdRestaurantMenu> Menu
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="flex-1 bg-gray-100 p-5">
          <Outlet></Outlet>
        </div>
      </div>
    );
};

export default Dashboard;