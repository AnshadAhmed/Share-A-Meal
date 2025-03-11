import React from 'react'
import '../App.css'
import axios from 'axios';
import { useEffect } from 'react'
import { useState } from 'react'



function Userprofile() {
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



    let text = `${user.createdAt}`;
    let part = text.substring(0, 10); // Extracts "World"





    return (
        <>

            <div className="userprofile-container">
                <div className="userprofile-profile-header">
                    <img
                        src={`locallhost:3006/${user.profilePicture}`}
                        alt="Profile Picture"
                        className="userprofile-profile-picture"
                    />
                    <h1 className="userprofile-profile-name">@{user.username}</h1>
                    {/* <p className="userprofile-profile-bio">Adnan | 938429808</p> */}
                    <button className='userprofile-button'><a href="/edituserprofile">Edit</a></button>
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
                                <div className="userprofile-details-value">{user.fullname}</div>
                            </div>
                            <div className="userprofile-details-item">
                                <div className="userprofile-details-label">Email</div>
                                <div className="userprofile-details-value">{user.email}</div>
                            </div>
                            <div className="userprofile-details-item">
                                <div className="userprofile-details-label">Location</div>
                                <div className="userprofile-details-value">{user.location}</div>
                            </div>
                            <div className="userprofile-details-item">
                                <div className="userprofile-details-label">Joined</div>
                                <div className="userprofile-details-value">{part}</div>
                            </div>
                            <div className="userprofile-details-item">
                                <div className="userprofile-details-label">Phone no</div>
                                <div className="userprofile-details-value">{user.phone}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Userprofile