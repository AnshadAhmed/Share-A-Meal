import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

function EditUserProfile() {
    const [user, setUser] = useState({});

    
    const [error, setError] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const [alertType, setAlertType] = useState("error");


    const [open, setOpen] = useState(true);



    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [location, setLocation] = useState("");
    const [phone, setPhone] = useState("");
    
    const [profilePic, setProfilePic] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3006/user/userprofile", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem("token")}`,
            },
        })
            .then(response => {
                setUser(response.data);
                setFullname(response.data.fullname);
                setEmail(response.data.email);
                setLocation(response.data.location);
                setPhone(response.data.phone);
                console.log(response.data);
            })
            .catch(error => console.error("Error:", error));
    }, []);

    function handleFileChange(e) {
        setProfilePic(e.target.files[0]);
    }

    async function senddata(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("fullname", fullname);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("location", location);
        
        if (profilePic) {
            formData.append("profile-pic", profilePic);
        }
    

        try {
            const response = await axios.put("http://localhost:3006/user/edituserprofile", formData, {
                headers: {
                    'Authorization': `${localStorage.getItem("token")}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data.msg);
            setAlertMsg(response.data.msg);
            setAlertType("success");
            setError(true);
            setOpen(true);
            setTimeout(() => navigate('/userprofile'), 2000)
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setAlertMsg(error.response.data.msg);
                setError(true);
                setOpen(true);
            } else {
                console.log(error);
            }
        }
    }

    return (
        <>
            <div className="edit-profile-container">
                <div className="edit-profile-edit-header">
                    <h1>Edit Profile</h1>
                </div>
                <form className="edit-profile-edit-form" onSubmit={senddata} encType="multipart/form-data">
                    <div className="edit-profile-profile-picture-container">
                        <img
                            src={profilePic ? URL.createObjectURL(profilePic) : `http://localhost:3006/my-upload/${user.profilePicture}`}
                            alt="Profile"
                            className="edit-profile-profile-picture"
                        />
                        <label className="edit-profile-picture-upload">
                            <input type="file" accept="image/*" name="profile-pic" onChange={handleFileChange} />
                            +
                        </label>
                    </div>
                    <div className="edit-profile-form-section">
                        <h2 className="edit-profile-section-title">Personal Information</h2>
                        <div className="edit-profile-form-grid">
                            <div className="edit-profile-form-group">
                                <label className="edit-profile-form-label">Full Name</label>
                                <input type="text" className="edit-profile-form-input" value={fullname} onChange={(e) => setFullname(e.target.value)} />
                            </div>
                            <div className="edit-profile-form-group">
                                <label className="edit-profile-form-label">Email</label>
                                <input type="email" className="edit-profile-form-input" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="edit-profile-form-group">
                                <label className="edit-profile-form-label">Location</label>
                                <input type="text" className="edit-profile-form-input" value={location} onChange={(e) => setLocation(e.target.value)} />
                            </div>
                            <div className="edit-profile-form-group">
                                <label className="edit-profile-form-label">Phone no</label>
                                <input type="text" className="edit-profile-form-input" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="edit-profile-button-group">
                        <button type="submit" className="edit-profile-button">
                            <span>Save</span>
                        </button>
                    </div>
                </form>
            </div>
            <div className='profile-alert'>
                <Box sx={{ width: '100%' }}>
                    <Collapse in={open}>
                        {alertMsg && <Alert variant="filled" severity={alertType}
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => { setOpen(false); }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                            {alertMsg}
                        </Alert>}
                    </Collapse>
                </Box>
            </div>
        </>
    );
}

export default EditUserProfile;