import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../AxiosPublic/useAxiosPublic';

const UseMenu = () => {
    const axiosPublic = useAxiosPublic()
    // const [item, setItem] = useState([]);
    // const[loading,setLoading] = useState(true)
    // useEffect(() => {
    //   fetch("http://localhost:3000/menu")
    //     .then((res) => res.json())
    //     .then((data) => {
    //       console.log(data);
    //       setItem(data);
    //       setLoading(false);
    //     });
    // }, []);
    // return [item,loading]

    const { data: item = [], isPending: loading, refetch } = useQuery({
        queryKey: ['item'],
        queryFn: async () => {
            const res = await axiosPublic.get('/menu')
            return res.data
        }
        
    })
    return [item, loading,refetch]
};

export default UseMenu;