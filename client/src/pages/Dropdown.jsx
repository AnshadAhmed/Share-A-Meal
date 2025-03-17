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
                    <img src={`http://localhost:3006/my-upload/${userData.profilePicture}`} alt="" className="profile-img" />
                </button>
                {isOpen && (
                    <div className="dropdown-menu">
                        <div className="dropdown-header">
                            <p className="username">{userData.username}</p>
                            <p className="email">{userData.email}</p>
                        </div>
                        <a href="/userprofile" className="dropdown-item">Profile</a>
                        <a href="/addmeal" className="dropdown-item">Add meal</a>
                        <a href="/mymeal" className="dropdown-item">My uploads</a>
                        <a href="#" className="dropdown-item">Notification</a>
                        {/* <a href="#" className="dropdown-item">MAL Import / Export</a> */}
                        {/* <a href="#" className="dropdown-item border-bottom">Settings</a> */}
                        <a href="" className="dropdown-item logout" onClick={handleLogout}>Logout →</a>
                    </div>
                )}
            </div >
        </>
    )
}

export default Dropdown