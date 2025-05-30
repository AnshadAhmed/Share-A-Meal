import React, { useEffect, useState } from 'react';
import './Mymealupload.css';
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from 'axios';

import Swal from 'sweetalert2';

import Navbar from './Navbar';




function Mymealupload() {

  const [foods, setFoods] = useState([]);


  useEffect(() => {

    axios.get("http://localhost:3006/user/mymeal", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${localStorage.getItem("token")}`, // Add token from local storage
      },
    })
      .then(response => {
        setFoods(response.data);
        console.log(response.data);

      })
      .catch(error => {
        console.error("Error:", error)
        if (error.response.status === 401) {
          Swal.fire({
            title: 'Unauthorized',
            text: 'Please login to upload your meal',
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




  const deleteItem = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`http://localhost:3006/user/mymeal/del/${id}`);

          if (response.status === 200) {
            setFoods(foods.filter((item) => item._id !== id)); // Remove from UI

            Swal.fire(
              "Deleted!",
              "Your item has been deleted.",
              "success"
            );
          } else {
            Swal.fire("Error!", "Failed to delete the item.", "error");
          }
        } catch (error) {
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };






  return (
    <>
      <Navbar />
      <div className="edit-del-food-page-container">
        {foods.length === 0 ? (
          <div className="no-items-message">
            <h2>No items available</h2>
            <p>Your uploaded meals will appear here.</p>
          </div>
        ) : (
          foods.map((food) => (
            <div key={food._id} className="edit-del-food-card">
              <div className={`edit-del-food-type ${food.type === "Veg" ? "veg" : "non-veg"}`}>
                {food.category}
              </div>
              <img src={`http://localhost:3006/my-upload/${food.photo}`} alt={food.name} className="edit-del-food-image" />
              <div className="edit-del-food-details">
                <h2 className="edit-del-food-name">{food.mealname}</h2>
                <p className="edit-del-food-price">{food.price}</p>
                <p className="edit-del-food-description">{food.discription}</p>
                <p className="edit-del-food-quantity">Quantity: {food.quantity}</p>
              </div>
              <div className="food-actions">
                <button className="edit-btn">
                  <FaEdit /> Edit
                </button>
                <button className="remove-btn" onClick={() => deleteItem(food._id)}>
                  <FaTrash /> Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default Mymealupload