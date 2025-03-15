import React, { useState } from "react";
import './Viewmeal.css'
import { FaShoppingCart } from "react-icons/fa";
import Navbar from './Navbar';
import { useEffect } from "react";
import axios from 'axios';





// Custom cart icon as SVG instead of using react-icons
const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);


const Viewmeal = () => {

  const [mealItem, setmealItem] = useState([])

  // console.log(mealItem);




  useEffect(() => {


    axios.get("http://localhost:3006/user/viewmeal", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${localStorage.getItem("token")}`, // Add token from local storage
      },
    })
      .then(response => {
        setmealItem(response.data);
        // console.log(response.data);

      })
      .catch(error => console.error("Error:", error));

  }, [])





  return (
    <>
      {/* <Navbar/> */}
      <div className="food-page-container">
        {mealItem.map((food,) => (
          <div key={food.createdAt} className="food-card">
            <div className={`food-type ${food.category === "Veg" ? "veg" : "non-veg"}`}>
              {food.category}
            </div>
            <img src={`http://localhost:3006/my-upload/${food.photo}`} alt={food.name} className="food-image" />
            <div className="food-details">
              <h2 className="food-name">{food.mealname}</h2>
              <p className="food-price">Rs {food.price}</p>
              <p className="food-description">{food.discription}</p>
              <p className="food-quantity">Quantity: {food.quantity}</p>
            </div>
            <button className="add-to-cart-btn">
              <span>Add to Cart</span>
              <FaShoppingCart className="cart-icon" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Viewmeal;