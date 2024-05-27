import React from 'react';
import { Link } from 'react-router-dom';
import PopularDishes from '../Pages/Home/PopularDishes';
import Cover from './Cover';

const MenuMapItem = ({items,title,img,description}) => {
    return (
      <div className="mt-5 mb-5 flex flex-col ">
        <Cover className='w-full'
          img={img}
                title={title}
                description={description}
          
        ></Cover>
        <div className="grid grid-cols-1 mt-10 lg:grid-cols-2 gap-5 justify-center mb-10">
          {items.map((data) => (
            <PopularDishes key={data._id} data={data}></PopularDishes>
          ))}
        </div>
        <Link to={`/order/${title}`}>
          <button className="border-b-4 border-black  border-r-0 border-l-0 border-t-0 rounded-2xl p-3 uppercase">
            Order Your Favourite Item
          </button>
        </Link>
      </div>
    );
};

export default MenuMapItem;