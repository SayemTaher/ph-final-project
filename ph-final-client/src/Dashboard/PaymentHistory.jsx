import {  useQuery } from '@tanstack/react-query';
import React from 'react';
import SectionTitle from '../Components/SectionTitle';
import useAxios from '../Custom/CustomAxios/useAxios';
import UseAuth from '../Custom/cutomAuth/UseAuth';

const PaymentHistory = () => {
    const { user } = UseAuth()
    const axiosSecure = useAxios()
    const { data: payments } = useQuery({
        queryKey: ['payments', user?.email],

        queryFn: async () => {
            const res = await axiosSecure.get(`/payment/${user?.email}`)
            console.log(res.data);
            return res.data
            
        }
        
    })
    return (
      <div className="flex flex-col gap-2 justify-center p-10">
        <div>
          <SectionTitle
            heading="View payment history"
            subHeading="All of your payment History"
          ></SectionTitle>
        </div>
        <div className="border-b-2 border-dashed pb-5 border-blue-300">
          <h2 className="text-xl font-bold w-[200px] bg-green-200 text-blue-600 p-2 rounded-md text-center">
            Total Payments - <span className="">{payments?.length}</span>{" "}
          </h2>
        </div>
        <div className='mt-5'>
          <div className="overflow-x-auto">
            <table className="table table-xs">
              <thead>
                <tr>
                  <th>Serial</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Transaction ID</th>
                  <th>Paid Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {payments?.map((payment,idx) => (
                  <tr key={payment._id}>
                        <th>{idx + 1}</th>
                        <td>{payment.name }</td>
                        <td>{ payment.email}</td>
                        <td>{ payment.transactionId}</td>
                        <td className='font-bold text-blue-600 text-lg'> $ { payment.price}</td>
                        <td>{ payment.date}</td>
                        <td className='bg-green-200 text-center text-green-600 p-1 rounded-md'>{ payment.status}</td>
                  </tr>
                ))}

               
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
};

export default PaymentHistory;