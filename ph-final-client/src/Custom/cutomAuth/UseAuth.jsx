import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthContextProvider/AuthProvider";


const UseAuth = () => {
    const auth = useContext(AuthContext)
    return auth
};

export default UseAuth;