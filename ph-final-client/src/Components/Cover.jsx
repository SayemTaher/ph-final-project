import React from 'react';
import { Parallax } from "react-parallax";
const Cover = ({ img, title, description }) => {
    return (
      <Parallax
        blur={{ min: -50, max: 50 }}
        bgImage={img}
        bgImageAlt="Our Menu"
        strength={500}
      >
        <div className="hero min-h-[880px]">
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-xl lg:text-5xl font-bold">{title}</h1>
              <p className="mb-5">{description}</p>
            </div>
          </div>
        </div>
      </Parallax>
    );
};

export default Cover;