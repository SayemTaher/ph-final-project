import React from 'react';
import Banner from './Banner';
import Popular from './Popular';
import Slider from './Slider';
import { Helmet, HelmetProvider } from "react-helmet-async";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Restaurant | Home</title>
            </Helmet>
            
            <Banner></Banner>
            <div className='mt-5 mb-5'>
                <Slider></Slider>
            </div>
            <div>
                <Popular></Popular>
            </div>
        </div>
    );
};

export default Home;