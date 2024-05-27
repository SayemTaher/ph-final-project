import "swiper/css";
import "swiper/css/pagination";


import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import SectionTitle from "../../Components/SectionTitle";

const Slider = () => {
    
        return (
          <section>
            <SectionTitle heading={'Open form 17:00 till 12:00'} subHeading={'Order Online'}></SectionTitle>
            <Swiper
              slidesPerView={4}
              spaceBetween={30}
              centeredSlides={true}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              <SwiperSlide>
                <div className="h-[500px]">
                  <img src="https://i.ibb.co/8BKmvyz/slide2.jpg" alt="" />
                  <h1 className="text-center uppercase -mt-20 font-bold  text-2xl text-white">
                    Pizzas
                  </h1>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="h-[500px]">
                  <img src="https://i.ibb.co/DQqyZyP/slide4.jpg" alt="" />
                  <h1 className="text-center uppercase -mt-20 font-bold  text-2xl text-white">
                    Salads
                  </h1>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="h-[500px]">
                  <img src="https://i.ibb.co/pnwPqJ5/slide3.jpg" alt="" />
                  <h1 className="text-center uppercase -mt-20 font-bold  text-2xl text-white">
                    Soups
                  </h1>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="h-[500px]">
                  <img src="https://i.ibb.co/DQqyZyP/slide4.jpg" alt="" />
                  <h1 className="text-center uppercase -mt-20 font-bold  text-2xl text-white">
                    Desserts
                  </h1>
                </div>
              </SwiperSlide>
            </Swiper>
          </section>
        );
     
};
/*
https://i.ibb.co/8BKmvyz/slide2.jpg
https://i.ibb.co/pnwPqJ5/slide3.jpg
https://i.ibb.co/DQqyZyP/slide4.jpg
*/ 

export default Slider;
