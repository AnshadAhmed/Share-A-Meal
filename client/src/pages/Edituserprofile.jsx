import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import '../App.css';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

function Edituserprofile() {
    const [error, seterror] = useState(false);
    const [alertMsg, setalertMsg] = useState("");
    const [alertType, setalertTupe] = useState("error");
    const [open, setOpen] = useState(true);


    const navigate = useNavigate();


    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [location, setLocation] = useState("");
    const [phone, setPhone] = useState("");
    const [profilePic, setProfilePic] = useState(null); // State for image file

    function handleFileChange(e) {
        setProfilePic(e.target.files[0]); // Store selected file
    }

    async function senddata(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("fullname", fullname);
        formData.append("phone", phone);
        formData.append("location", location);
        if (profilePic) {
            formData.append("profile-pic", profilePic); // Append the image file
        }

        try {
            const response = await axios.put("http://localhost:3006/user/edituserprofile", formData, {
                headers: {
                    'Authorization': `${localStorage.getItem("token")}`,
                    'Content-Type': 'multipart/form-data', // Important for file upload
                },
            });

            console.log(response.data.msg);
            setalertMsg(response.data.msg);
            setalertTupe("success");
            seterror(true);
            setOpen(true);
            setTimeout(()=>navigate('/userprofile'),2000)
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setalertMsg(error.response.data.msg);
                seterror(true);
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
                            src={profilePic ? URL.createObjectURL(profilePic) : "/node"}
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
                                <input type="text" className="edit-profile-form-input" onChange={(e) => setFullname(e.target.value)} />
                            </div>
                            <div className="edit-profile-form-group">
                                <label className="edit-profile-form-label">Email</label>
                                <input type="email" className="edit-profile-form-input" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="edit-profile-form-group">
                                <label className="edit-profile-form-label">Location</label>
                                <input type="text" className="edit-profile-form-input" onChange={(e) => setLocation(e.target.value)} />
                            </div>
                            <div className="edit-profile-form-group">
                                <label className="edit-profile-form-label">Phone no</label>
                                <input type="text" className="edit-profile-form-input" onChange={(e) => setPhone(e.target.value)} />
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

export default Edituserprofile;
