import React from 'react'
import '../App.css'
import {useNavigate } from 'react-router-dom';



function Navbar() {
    const navigate = useNavigate();

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
                    <a href="">Log out</a>


                    <button className="search-btn">Donate</button>
                    <button className="Spot" ><img src="" alt="" /></button>
                    <button className="home-Profile" onClick={() => { navigate('/userprofile') }}><img src="File4.png" alt="" /></button>
                </div>
            </nav>

        </>
    )
}

export default Navbar