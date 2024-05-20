
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Banner = () => {
    return (
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        className="flex flex-col justify-center items-center"
      >
        
          <div>
            <img src="https://i.ibb.co/c6wJXLp/01.jpg" />
          </div>
          <div>
            <img src="https://i.ibb.co/ZVP1T5p/02.jpg" />
          </div>
          <div>
            <img src="https://i.ibb.co/SQ83NPp/03.png" />
          </div>
          <div>
            <img src="https://i.ibb.co/JkHSPM4/04.jpg" />
          </div>
          <div>
            <img src="https://i.ibb.co/MDzbGbL/05.png" />
          </div>
          <div>
            <img src="https://i.ibb.co/G0pBwPP/06.png " />
          </div>
    
      </Carousel>
    );
};
/*
https://i.ibb.co/c6wJXLp/01.jpg
https://i.ibb.co/ZVP1T5p/02.jpg
https://i.ibb.co/SQ83NPp/03.png
https://i.ibb.co/JkHSPM4/04.jpg
https://i.ibb.co/MDzbGbL/05.png
https://i.ibb.co/G0pBwPP/06.png 
*/
export default Banner;
