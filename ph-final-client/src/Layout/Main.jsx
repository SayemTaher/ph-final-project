import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';

const Main = () => {
    return (
        <div className=''>
            <Header></Header>
            <div className='min-h-[900px] '>
              <Outlet></Outlet>  
            </div>
            
            <Footer></Footer>
        </div>
    );
};

export default Main;