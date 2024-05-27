import Cover from "../Cover";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useState } from "react";
import UseMenu from "../../Custom/useMenu/UseMenu";
import OrderCard from "./OrderCard";
import OrderTab from "./OrderTab";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Order = () => {
    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks']
    const { category } = useParams();
    const initialIndex = categories.indexOf(category)
  const [tabIndex, setTabIndex] = useState(initialIndex);
    const [item] = UseMenu();
    
    console.log(category);
  const dessert = item.filter((item) => item.category === "dessert");
//   const offer = item.filter((item) => item.category === "offered");
  const pizzas = item.filter((item) => item.category === "pizza");
  const salads = item.filter((item) => item.category === "salad");
    const soups = item.filter((item) => item.category === "soup");
    const drinks = item.filter(item => item.category==='drinks')
  return (
      <div>
          <Helmet>
              <title>Restaurant | Order Food</title>
          </Helmet>
      <Cover
        img="https://i.ibb.co/7YKzRf4/image-5.jpg"
        title="Order Food"
        description="Here you will find all of our available items"
      ></Cover>
      <div className="mt-10 mb-10">
              <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                  
          <TabList>
            <Tab>Salad</Tab>
            <Tab>Pizzas</Tab>
            <Tab>Soup</Tab>
            <Tab>Dessert</Tab>
            <Tab>Drinks</Tab>
          </TabList>
          <TabPanel>
            <OrderTab items={salads}></OrderTab>
          </TabPanel>
          <TabPanel>
            <OrderTab items={pizzas}></OrderTab>
          </TabPanel>
          <TabPanel>
            <OrderTab items={soups}></OrderTab>
          </TabPanel>
          <TabPanel>
            <OrderTab items={dessert}></OrderTab>
          </TabPanel>
          <TabPanel>
            <OrderTab items={drinks}></OrderTab>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default Order;
