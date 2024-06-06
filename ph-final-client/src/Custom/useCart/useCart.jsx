
import { useQuery } from "@tanstack/react-query";

import useAxios from "../CustomAxios/useAxios";
import UseAuth from "../cutomAuth/UseAuth";


const useCart = () => {
    // use tanstack query
    const axiosSecure = useAxios()
    const {user} = UseAuth()
    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user.email}`)
            return res.data
        }
    })
    return [cart,refetch]
    
}
export default useCart