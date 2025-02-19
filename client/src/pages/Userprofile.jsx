import React from 'react'
import '../App.css'
import axios from 'axios';
import { useEffect } from 'react'
import { useState } from 'react'



function Userprofile() {
    const [user, setUser] = useState({});

    useEffect(() => {


        axios.get("http://localhost:3006/userprofile", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem("token")}`, // Add token from local storage
            },
        })
            .then(response => {setUser(response.data);
                console.log(response.data);
                
            })
            .catch(error => console.error("Error:", error));


    }, [])
    
    



    return (
        <>
            <div className="userprofile-container">
                <div className="userprofile-profile-header">
                    <img
                        src="lkjj"
                        alt="Profile Picture"
                        className="userprofile-profile-picture"
                    />
                    <h1 className="userprofile-profile-name">@Adnan</h1>
                    <p className="userprofile-profile-bio">Adnan | 938429808</p>
                    <button className='userprofile-button'>Edit</button>
                </div>
                <div className="userprofile-profile-stats">
                    <div className="userprofile-stat-card">
                        <div className="userprofile-stat-value">1.2K</div>
                        <div className="userprofile-stat-label">Followers</div>
                    </div>
                    <div className="userprofile-stat-card">
                        <div className="userprofile-stat-value">348</div>
                        <div className="userprofile-stat-label">Following</div>
                    </div>
                    <div className="userprofile-stat-card">
                        <div className="userprofile-stat-value">42</div>
                        <div className="userprofile-stat-label">Post</div>
                    </div>
                </div>
                <div className="userprofile-profile-details">
                    <div className="userprofile-details-section">
                        <h2 className="userprofile-details-heading">Personal Information</h2>
                        <div className="userprofile-details-grid">
                            <div className="userprofile-details-item">
                                <div className="userprofile-details-label">First name</div>
                                <div className="userprofile-details-value">{user.username}</div>
                            </div>
                            <div className="userprofile-details-item">
                                <div className="userprofile-details-label">Email</div>
                                <div className="userprofile-details-value">{user.email}</div>
                            </div>
                            <div className="userprofile-details-item">
                                <div className="userprofile-details-label">Location</div>
                                <div className="userprofile-details-value">San Francisco, CA</div>
                            </div>
                            <div className="userprofile-details-item">
                                <div className="userprofile-details-label">Joined</div>
                                <div className="userprofile-details-value">January 2023</div>
                            </div>
                            <div className="userprofile-details-item">
                                <div className="userprofile-details-label">Phone no</div>
                                <div className="userprofile-details-value">38491884098</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Userprofile