import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import auth from "../../Authentication/firebase.config";
import useAxiosPublic from "../../Custom/AxiosPublic/useAxiosPublic";

export const AuthContext = createContext(null);


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()
    const axiosPublic = useAxiosPublic()


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            if (currentUser) {
                const userInfo = {
                    email : currentUser.email
                }
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                          localStorage.setItem('access-token', res.data.token)
                      }
                })
            }
            else {
                localStorage.removeItem('access-token')
            }
            console.log(currentUser)
            setLoading(false)
            
        })
        return () => {
            return unsubscribe()
        }
        
    }, [axiosPublic])
    
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }
    const updateUserProfile = (name,photo) => {
        return updateProfile(auth.currentUser, {
            displayName:name,photoURL:photo
        })
        //     .then(() => {
        //         toast.success('User profile updated successfully!')
        //             .catch(error => {
        //             toast.error(error.message)
        //         })
        // })
    }

    const info = { user, loading,updateUserProfile, signIn,signInWithGoogle, createUser ,logOut,setLoading};
    
  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
