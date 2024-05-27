import React from 'react';
import { Link } from 'react-router-dom';

const PopularDishes = ({ data }) => {
    const {name,recipe,image,category,price} = data
    return (
        <div className='flex gap-5 justify-center w-[620px] p-2 '>
            <div>
                <img src={image} style={{borderRadius:'0px 200px 200px 200px'}} className='h-[100px] rounded-xl w-[100px] object-cover' alt={`image of ${name}`} />
            </div>
            <div className='flex flex-col gap-2 '>
                <div className='flex gap-2 justify-between items-center'>
                    <h1 className='text-2xl uppercase '>{name} --------</h1>
                    <p className='text-2xl text-yellow-500'>${ price}</p>
                </div>
                <span>{ recipe}</span>
            </div>
            
            
        </div>
    );
};

export default PopularDishes;