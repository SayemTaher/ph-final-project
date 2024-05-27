import React from 'react';
import OrderCard from './OrderCard';

const OrderTab = ({items}) => {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 justify-center">
        {items.map((data) => (
          <OrderCard key={data._id} data={data}></OrderCard>
        ))}
      </div>
    );
};

export default OrderTab;