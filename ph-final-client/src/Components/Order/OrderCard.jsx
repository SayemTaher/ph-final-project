
import UseAuth from "../../Custom/cutomAuth/UseAuth";


import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAxios from "../../Custom/CustomAxios/useAxios";
import useCart from "../../Custom/useCart/useCart";

const OrderCard = ({ data }) => {
    const { user } = UseAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const axiosSecure = useAxios()
    const [,refetch] = useCart()
    
    const { name, recipe, image, price, _id } = data;
    
    const handleAddToCart = food => {
        if (user && user.email) {

            const cartItem = {
                MenuId: _id,
                email: user.email,
                name,
                image,
                price
            }
            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    console.log(res.data)
                    if (res.data.insertedId) {
                    Swal.fire({
                      position: "center",
                      icon: "success",
                      title: `${name} has been added to the cart.`,
                      showConfirmButton: false,
                      timer: 1500,
                    });
                    }
                    refetch()
            })
            
        }
        else {
            Swal.fire({
              title: "You are not Logged In",
              text: "Please login first to continue",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Log In",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate('/login',{state:{from:location}} )
              }
            });
        }
        console.log(food)

    }
    return (
      <div className="mt-10">
        <div className="card border-2 border-gray-100 w-96 bg-base-100 flex flex-col justify-between h-[500px] shadow-md">
                <figure >
                    
            <img
              src={image}
              alt="Shoes"
              
            />
                </figure>
                <p className="absolute right-0 mr-4 mt-4 px-4 bg-black text-white">$ { price}</p>
          <div className="card-body items-center text-center">
                    <h2 className="card-title">{name}</h2>
                    <p>{ recipe}</p>
            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleAddToCart(data)}>Add to order</button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default OrderCard;