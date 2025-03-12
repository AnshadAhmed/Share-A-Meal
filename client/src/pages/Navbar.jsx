import React, { useEffect } from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';




function Navbar() {
    const navigate = useNavigate();


    const [user, setUser] = useState({});


    useEffect(() => {

        axios.get("http://localhost:3006/user/userprofile", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem("token")}`, // Add token from local storage
            },
        })
            .then(response => {
                setUser(response.data);
                console.log(response.data);

            })
            .catch(error => console.error("Error:", error));




    }, [])

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token from local storage
        navigate("/login"); // Redirect to login page
    };




    return (
        <>
            <nav>
                <div className="logo">Share a meal</div>
                <div className="nav-links">
                    <a href="">Home</a>
                    <a href="">About</a>
                    <a href="">Contact</a>
                    <a href="">Order</a>
                    <a href="/login">Log in</a>
                    <a href="" onClick={handleLogout}>Log out</a>


                    <button className="search-btn">Donate</button>
                    <button className="Spot" ><img src="/view-food.jpg" alt="" /></button>
                    <button className="home-Profile" onClick={() => { navigate('/userprofile') }}><img src={`http://localhost:3006/my-upload/${user.profilePicture}`} alt="" /></button>
                </div>
            </nav>

        </>
    )
}

export default Navbar