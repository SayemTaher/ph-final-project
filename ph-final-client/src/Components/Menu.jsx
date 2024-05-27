import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import UseMenu from '../Custom/useMenu/UseMenu';
import Popular from '../Pages/Home/Popular';
import PopularDishes from '../Pages/Home/PopularDishes';
import Cover from './Cover';
import MenuMapItem from './MenuMapItem';
import SectionTitle from './SectionTitle';

const Menu = () => {
    const [item] = UseMenu()
    
    const dessert = item.filter((item) => item.category === "dessert");
    const offer = item.filter((item) => item.category === "offered");
    const pizzas = item.filter(item => item.category === 'pizza')
    const salads = item.filter((item) => item.category === "salad");
    const soups = item.filter((item) => item.category === "soup");
    const drinks = item.filter((item) => item.category === "drinks");

    return (
      <div>
        <Helmet>
          <title>Restaurant | Menu</title>
        </Helmet>
        <Cover
          img="https://i.ibb.co/7YKzRf4/image-5.jpg"
          title="Our Menu"
          description="Here you will find all of our available items"
        ></Cover>

        <div className="flex flex-col gap-5">
          <SectionTitle
            heading="Todays Offer"
            subHeading="Grab them before they are still available"
          ></SectionTitle>
          <MenuMapItem
            items={offer}
            title="offer"
            description="Explore the latest offer"
            img="https://i.ibb.co/JkHSPM4/04.jpg"
          ></MenuMapItem>
        </div>
        <div className="flex flex-col gap-5">
          <SectionTitle
            heading="Dessert Menu"
            subHeading="Authentic delicious home made desserts"
          ></SectionTitle>
          <MenuMapItem
            items={dessert}
            title="dessert"
            description="Explore the latest Desserts"
            img="https://i.ibb.co/JkHSPM4/04.jpg"
          ></MenuMapItem>
        </div>
        {/* pizzas */}
        <div className="flex flex-col gap-5">
          <SectionTitle
            heading="Pizza Menu"
            subHeading="Authentic delicious home made Pizzas"
          ></SectionTitle>
          <MenuMapItem
            items={pizzas}
            title="pizza"
            description="Explore the latest Pizzas"
            img="https://i.ibb.co/JkHSPM4/04.jpg"
          ></MenuMapItem>
        </div>
        <div className="flex flex-col gap-5">
          <SectionTitle
            heading="Salad Menu"
            subHeading="Fresh and Healthy in every way"
          ></SectionTitle>
          <MenuMapItem
            items={salads}
            title="salad"
            description="Explore the latest Salads"
            img="https://i.ibb.co/JkHSPM4/04.jpg"
          ></MenuMapItem>
        </div>
        <div className="flex flex-col gap-5">
          <SectionTitle
            heading="Soup Menu"
            subHeading="Fresh and Healthy in every way"
          ></SectionTitle>
          <MenuMapItem
            items={soups}
            title="soup"
            description="Explore the latest soups"
            img="https://i.ibb.co/JkHSPM4/04.jpg"
          ></MenuMapItem>
        </div>
        <div className="flex flex-col gap-5">
          <SectionTitle
            heading="Drinks Menu"
            subHeading="Fresh and Healthy "
          ></SectionTitle>
          <MenuMapItem
            items={drinks}
            title="drinks"
            description="Order as a side"
            img="https://i.ibb.co/JkHSPM4/04.jpg"
          ></MenuMapItem>
        </div>
      </div>
    );
};

export default Menu;