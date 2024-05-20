import React from 'react';
import Banner from './Banner';
import Slider from './Slider';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <div className='mt-5 mb-5'>
                <Slider></Slider>
            </div>
        </div>
    );
};

export default Home;