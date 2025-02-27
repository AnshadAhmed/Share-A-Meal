import React, { useState } from 'react'
import axios from 'axios';
import '../App.css';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

function Edituserprofile() {


    function senddata(e) {
        e.preventDefault();

        axios.put("http://localhost:3006/edituserprofile",
            {
                fullname: fullname,
                phone: phone,
                location: location
            },
            {
                headers: {
                    'Authorization': `${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(response => {


                console.log(response.data.msg);


                setalertMsg(response.data.msg)
                setalertTupe("success")
                seterror(true)
                setOpen(true)


                // alert(response.data.msg)
            })
            .catch(error => {
                // console.log(error);
                if (error.response && error.response.status === 400) {
                    setalertMsg(error.response.data.msg)
                    seterror(true)
                    setOpen(true)
                }
                else{
                    console.log(error);
                    
                }


            });

    }


    const [error, seterror] = useState(false)
    const [alertMsg, setalertMsg] = useState("")
    const [alertType, setalertTupe] = useState("error")

    const [open, setOpen] = useState(true);



    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [location, setLocation] = useState("")
    const [phone, setPhone] = useState("")



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
                <form className="edit-profile-edit-form" onSubmit={(e) => { senddata(e) }}>
                    <div className="edit-profile-form-section">
                        <h2 className="edit-profile-section-title">Personal Information</h2>
                        <div className="edit-profile-form-grid">
                            <div className="edit-profile-form-group">
                                <label className="edit-profile-form-label">Full Name</label>
                                <input
                                    type="text"
                                    className="edit-profile-form-input"
                                    defaultValue=""
                                    onChange={(e) => { setFullname(e.target.value) }}
                                />
                            </div>
                            <div className="edit-profile-form-group">
                                <label className="edit-profile-form-label">Email</label>
                                <input
                                    type="email"
                                    className="edit-profile-form-input"
                                    defaultValue=""
                                    onChange={(e) => { setEmail(e.target.value) }}
                                />
                            </div>
                            <div className="edit-profile-form-group">
                                <label className="edit-profile-form-label">Location</label>
                                <input
                                    type="text"
                                    className="edit-profile-form-input"
                                    defaultValue=""
                                    onChange={(e) => { setLocation(e.target.value) }}
                                />
                            </div>
                            <div className="edit-profile-form-group">
                                <label className="edit-profile-form-label">Phone no</label>
                                <input
                                    type="text"
                                    className="edit-profile-form-input"
                                    defaultValue=""
                                    onChange={(e) => { setPhone(e.target.value) }}
                                />
                            </div>
                            <div className="edit-profile-form-group">
                                <label className="edit-profile-form-label">arilla</label>
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
            <div className='profile-alert'>
                <Box sx={{ width: '100%' }}>
                    <Collapse in={open}>
                        {alertMsg && <Alert variant="filled" severity={alertType}
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                            {alertMsg}
                        </Alert>
                        }
                    </Collapse>
                </Box>
            </div>


        </>
    )
}

export default Edituserprofile