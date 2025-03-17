import React, { useEffect, useState } from 'react';
import './Mymealupload.css';
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from 'axios';


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
      .catch(error => console.error("Error:", error));


  }, [])
  

  return (
    <>
      <div className="edit-del-food-page-container">
        {foods.map((food) => (
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
              <button className="edit-btn" >
                <FaEdit /> Edit
              </button>
              <button className="remove-btn">
                <FaTrash /> Remove
              </button>
            </div>

          </div>
        ))}
      </div>
    </>
  )
}

export default Mymealupload