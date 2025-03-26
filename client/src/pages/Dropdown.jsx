import React from 'react'
import './Dropdown.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Dropdown({ userData }) {

    const navigate = useNavigate();


    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token from local storage
        navigate("/login"); // Redirect to login page
    };

    return (
        <>
            <div className="dropdown-container">
                <button onClick={() => setIsOpen(!isOpen)} className="home-Profile">
                    <img src={userData?.profilePicture ? `http://localhost:3006/my-upload/${userData.profilePicture}` : "/user.png"} className="profile-img" />                </button>
                {isOpen && (
                    <div className="dropdown-menu">
                        <div className="dropdown-header">
                            <p className="username">{userData.username}</p>
                            <p className="email">{userData.email}</p>
                        </div>
                        <a href="/userprofile" className="dropdown-item">Profile</a>
                        <a href="/viewcart" className="dropdown-item">My cart</a>

                        <a href="/addmeal" className="dropdown-item">Add meal</a>
                        <a href="/mymeal" className="dropdown-item">My uploads</a>
                        <a href="/view-collector" className="dropdown-item">View Customer</a>


                        <a href="#" className="dropdown-item">Notification</a>
                        <a href="/vieworder" className="dropdown-item">My order</a>
                        {/* <a href="#" className="dropdown-item border-bottom">Settings</a> */}
                        <a href="" className="dropdown-item logout" onClick={handleLogout}>Logout →</a>
                    </div>
                )}
            </div >
        </>
    )
}

export default Dropdown