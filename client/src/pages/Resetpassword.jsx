import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import '../App.css';
import { useParams } from "react-router-dom";
import axios from 'axios';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';





function Resetpassword() {

    const { token } = useParams();


    const [newpassword, setNewpassword] = useState("")
    const [confirmnewpassword, setConfirmnewpassword] = useState("")


    const [error, seterror] = useState(false);
    const [alertMsg, setalertMsg] = useState('');
    const [alertType, setalertTupe] = useState('error');

    const [open, setOpen] = useState(true);

    const navigate = useNavigate();




    async function senddata() {


        if (newpassword != confirmnewpassword) {
            seterror(true);
            setalertMsg('Passwords do not match');
            setalertTupe('error');
            setOpen(true);

        } else {


            try {
                const response = await axios.post(`http://localhost:3006/auth/resetpassword/${token}`, {
                    newPassword: newpassword,
                    confirmnewpassword: confirmnewpassword
                });

                if (response.status === 200) {
                    seterror(true)
                    setalertMsg(response.data.msg)
                    setalertTupe('success')
                    setTimeout(() => navigate('/login'), 2000)


                } else {
                    setalertTupe("error")
                    seterror(true)
                    setalertMsg(response.data.msg)
                }

                // alert(response.data.msg);

            } catch (error) {
                console.log(error);
                if (error.response) {
                    if (error.response.status === 401) {
                        setalertMsg(error.response.data.errors[0].msg);
                    } else {
                        setalertMsg(error.response.data.msg);
                    }
                    seterror(true);
                    setalertTupe('error');
                    setOpen(true);
                } else {
                    setalertMsg("An unknown error occurred");
                    seterror(true);
                    setalertTupe('error');
                }
                // alert(error.response.data.msg)
            }
            setOpen(true)
        }


    }



    return (
        <>
            <div className='apx'>
                <div className='Alert'>
                    <Box sx={{ width: '100%' }}>
                        <Collapse in={open}>
                            {alertMsg && (
                                <Alert
                                    variant="filled"
                                    severity={alertType}
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
                            )}
                        </Collapse>
                    </Box>
                </div>
                <div className='cen'>
                    <div className="container">
                        <div className="community-panel">
                            <div className="Logo-title">
                                <div className="Logo" />
                                <h1>Share a meal</h1>
                            </div>
                            <div className="Pic" />
                            <div className="welcome">
                                Welcome back to the
                                <br />
                                Share a meal Community
                            </div>
                            <p>
                                Share A Meal connects donors with those in need, making it easy to fight
                                hunger. With just a few clicks, you can provide a meal and make a
                                difference!
                            </p>
                        </div>
                        <div className="reset-login-panel">
                            <div className="forgot-divider">Reset password</div>
                            <form onSubmit={(e) => { e.preventDefault(); senddata() }}>
                                <div className="form-group">
                                    <input type="text" placeholder="New password" onChange={(e) => { setNewpassword(e.target.value) }} value={newpassword} />
                                </div>
                                <div className="form-group">
                                    <input type="password" placeholder="confirm New Password" onChange={(e) => { setConfirmnewpassword(e.target.value) }} value={confirmnewpassword} />
                                </div>

                                <button type="submit" className="login-btn">
                                    Change Password
                                </button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Resetpassword