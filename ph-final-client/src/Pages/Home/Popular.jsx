import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../../Components/SectionTitle';
import UseMenu from '../../Custom/useMenu/UseMenu';
import PopularDishes from './PopularDishes';

const Popular = () => {
    const [item] = UseMenu()
    const popular = item.filter(item => item.category === 'popular')
    console.log(item)
    console.log(popular)
    // const [item, setItem] = useState([])
    // useEffect(() => {
    //     fetch("menu.json")
    //       .then((res) => res.json())
    //       .then((data) => {
    //         const popularItem = data.filter(
    //           (item) => item.category === "popular"
    //         );
    //         setItem(popularItem);
    //       });

    // },[])
    
    return (
      <div>
        <SectionTitle
          heading={"Check them out"}
          subHeading={"From our Menu"}
        ></SectionTitle>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 justify-center mb-10">
          {popular.map((data) => (
            <PopularDishes key={data._id} data={data}>
              
            </PopularDishes>
          ))}
        </div>
      </div>
    );
};

export default Popular;