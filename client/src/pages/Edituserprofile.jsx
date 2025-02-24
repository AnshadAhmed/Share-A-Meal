import React, { useState } from 'react'
import '../App.css'


function Edituserprofile() {

    const[firstname,setFirstname]=useState("")
    const[email,setEmail]=useState("")
    const[location,setLocation]=useState("")
    const[phone,setPhone]=useState("")




    return (
        <>
            <div className="edit-profile-container">
                <div className="edit-profile-edit-header">
                    <div className="edit-profile-profile-picture-container">
                        <img
                            src="/File4.png"
                            alt="Profile Picture"
                            className="edit-profile-profile-picture"
                        />
                        <label className="edit-profile-picture-upload">
                            <input type="file" accept="image/*" />+
                        </label>
                    </div>
                    <h1>Edit Profile</h1>
                </div>
                <form className="edit-profile-edit-form">
                    <div className="edit-profile-form-section">
                        <h2 className="edit-profile-section-title">Personal Information</h2>
                        <div className="edit-profile-form-grid">
                            <div className="edit-profile-form-group">
                                <label className="edit-profile-form-label">Full Name</label>
                                <input
                                    type="text"
                                    className="edit-profile-form-input"
                                    defaultValue=""
                                    onChange={(e)=>{setFirstname(e.target.value)}}
                                />
                            </div>
                            <div className="edit-profile-form-group">
                                <label className="edit-profile-form-label">Email</label>
                                <input
                                    type="email"
                                    className="edit-profile-form-input"
                                    defaultValue=""
                                    onChange={(e)=>{setEmail(e.target.value)}}
                                />
                            </div>
                            <div className="edit-profile-form-group">
                                <label className="edit-profile-form-label">Location</label>
                                <input
                                    type="text"
                                    className="edit-profile-form-input"
                                    defaultValue=""
                                    onChange={(e)=>{setLocation(e.target.value)}}
                                />
                            </div>
                            <div className="edit-profile-form-group">
                                <label className="edit-profile-form-label">Phone no</label>
                                <input
                                    type="text"
                                    className="edit-profile-form-input"
                                    defaultValue=""
                                    onChange={(e)=>{setFirstname(e.target.value)}}
                                />
                            </div>
                            <div className="edit-profile-form-group">
                                <label className="edit-profile-form-label">Location</label>
                                <input
                                    type="text"
                                    className="edit-profile-form-input"
                                    defaultValue=""
                                />
                            </div>
                            <div className="edit-profile-form-group">
                                <label className="edit-profile-form-label">Website</label>
                                <input
                                    type="url"
                                    className="edit-profile-form-input"
                                    defaultValue=""
                                />
                            </div>
                        </div>
                    </div>
                    <div className="edit-profile-button-group">
                        {/* <button type="submit"><span>Cancel</span></button> */}
                        <button type="submit" className="edit-profile-button">
                            {" "}
                            <span>Save</span>
                        </button>
                        {/* <button type="submit" class="save-button">Save Changes</button> */}
                    </div>
                </form>
            </div>

        </>
    )
}

export default Edituserprofile