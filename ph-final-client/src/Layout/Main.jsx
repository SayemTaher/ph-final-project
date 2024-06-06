import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';

const Main = () => {
    const location = useLocation()
    const noHeader = location.pathname.includes('login')
    const noFooter = location.pathname.includes('register')

    return (
        <div className=''>
            {noHeader || noFooter || <Header></Header>}
            <div className='min-h-[900px] '>
              <Outlet></Outlet>  
            </div>
            
            {noHeader || noFooter || <Footer></Footer>}
        </div>
    );
};

export default Main;