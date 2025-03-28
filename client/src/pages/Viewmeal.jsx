import React, { useState } from "react";
import './Viewmeal.css'
import { FaShoppingCart } from "react-icons/fa";
import Navbar from './Navbar';
import { useEffect } from "react";
import axios from 'axios';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';


import Swal from 'sweetalert2';






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



  const [error, seterror] = useState(false);
  const [alertMsg, setalertMsg] = useState('');
  const [alertType, setalertTupe] = useState('error');

  const [open, setOpen] = useState(true);

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
        console.log(response.data);

      })
      .catch(error => {
        console.error("Error:", error)
        if (error.response.status === 401) {
          Swal.fire({
            title: 'Unauthorized',
            text: 'Please login to use this option',
            icon: 'error',
            allowOutsideClick: false,
            confirmButtonText: 'Login',
            preConfirm: () => {
              window.location.href = '/login';
            }
          });
        }
      });

  }, [])


  // Function to add item to cart
  const addToCart = async (food) => {
    try {
      const response = await axios.post("http://localhost:3006/user/addtocart",
        { mealId: food._id, quantity: 1, price: food.price, image: food.photo, name: food.mealname, inquantity: food.quantity, prdiscription: food.discription },

        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${localStorage.getItem("token")}`, // Ensure user authentication
          },
        }
      );

      // Update cart state with the new cart data


      console.log(response.data);
      Swal.fire({
        title: `${food.mealname} added to cart!`,
        icon: "success",
        draggable: true
      });


      // seterror(true)
      // setalertMsg(`${food.mealname} added to cart!`)
      // setalertTupe('success')
      // setOpen(true)


      // alert(`${food.mealname} added to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      seterror(true)
      setalertMsg('Failed to add to cart')
      setalertTupe('error')
      setOpen(true)




      // alert("Failed to add item to cart");
    }
  };




  return (
    <>
      <Navbar />


      {
        mealItem.length === 0 ? (
          <div className="no-items-message">
            <h2>No items available</h2>
            <p>currently no meal is available🥺.</p>
          </div>
        ) : (

          <div className="food-page-container">
            {mealItem.map((food) => (
              <div key={food._id} className="food-card">
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
                <button className="add-to-cart-btn" onClick={() => addToCart(food)}>
                  <span>Add to Cart</span>
                  <FaShoppingCart className="cart-icon" />
                </button>
              </div>
            ))}
          </div>

        )
      }





      {/* <div className="food-page-container">
        {mealItem.map((food) => (
          <div key={food._id} className="food-card">
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
            <button className="add-to-cart-btn" onClick={() => addToCart(food)}>
              <span>Add to Cart</span>
              <FaShoppingCart className="cart-icon" />
            </button>
          </div>
        ))}
      </div> */}
      <div className='Alert'>
        <Box sx={{ width: '100%' }}>
          <Collapse in={open}>
            {alertMsg && (
              <Alert
                variant="filled"
                severity={alertType}
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {alertMsg}
              </Alert>
            )}
          </Collapse>
        </Box>
      </div>
    </>
  );
};

export default Viewmeal;