import axios from "axios"
import { useNavigate } from "react-router-dom";
import UseAuth from "../cutomAuth/UseAuth";

export const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxios = () => {
    const { logOut } = UseAuth()
    const navigate = useNavigate()
    
    axiosSecure.interceptors.request.use(
      function (config) {
        const token = localStorage.getItem("access-token");
        console.log("Request Intercepted, token:", token); // Log token
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        } else {
          console.log("No token found, stopping request"); // Log no token case
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
    // for responses 
    axiosSecure.interceptors.response.use(function (response) {
        return response
    }, async function(error) {
       
        const status = error.response.status
        console.log(status);
        if (status === 401 || status === 403) {
            await logOut()
            navigate('/login')
            
        }
         return Promise.reject(error);
    })
    return axiosSecure
};

export default useAxios;