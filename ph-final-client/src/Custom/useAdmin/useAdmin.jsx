import { isAdmin } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from '../CustomAxios/useAxios';
import UseAuth from '../cutomAuth/UseAuth';

const useAdmin = () => {
    const { user } = UseAuth()
    const axiosSecure = useAxios()
    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            console.log(res.data)
            return res.data?.admin
        }
    })
    return [isAdmin, isAdminLoading]
};

export default useAdmin;