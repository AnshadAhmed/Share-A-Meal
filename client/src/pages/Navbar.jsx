import React, { useEffect } from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import Dropdown from './Dropdown';




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
                    <a href="" className='links'>Home</a>
                    <a href="" className='links'>About</a>
                    <a href="" className='links'>Contact</a>
                    <a href="" className='links'>Order</a>
                    <a href="/login" className='links'>Log in</a>
                    {/* <a href=""  className='links' onClick={handleLogout}>Log out</a> */}


                    <button className="search-btn">Donate</button>
                    <button className="Spot" onClick={() => { navigate('/viewmeal') }}><img src="/view-food.jpg" alt="" /></button>
                    {/* <button className="home-Profile" onClick={() => { navigate('/userprofile') }}><img src={`http://localhost:3006/my-upload/${user.profilePicture}`} alt="" /></button> */}
                    <Dropdown userData={user}/>
                </div>
            </nav>

        </>
    )
}

export default Navbar