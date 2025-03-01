import React from 'react';
import '../App.css';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setemail] = useState('');
    const [pass, setpass] = useState('');

    const [error, seterror] = useState(false);
    const [alertMsg, setalertMsg] = useState('');
    const [alertType, setalertTupe] = useState('error');

    const [open, setOpen] = useState(true);

    const navigate = useNavigate();

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    async function senddata() {
        if (!email || !pass) {
            seterror(true);
            setalertMsg('Please fill all the fields');
            setalertTupe('error');
            setOpen(true);
        } else {
            try {
                const response = await axios.post('http://localhost:3006/auth/login', {
                    email: email,
                    pwd: pass
                });

                setalertMsg(response.data.msg);

                if (response.data.msg === 'Login Successful') {
                    localStorage.setItem('token', response.data.token);
                    setalertTupe('success');
                    setTimeout(() => {
                        navigate('/');
                    }, 2000);
                } else {
                    setalertTupe('error');
                }

                seterror(true);
                setOpen(true);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setalertMsg(error.response.data.errors[0].msg);
                    seterror(true);
                    setOpen(true);
                    setalertTupe('error');
                } else if (error.response) {
                    alert(`Error ${error.response.status}: ${error.response.statusText}`);
                } else {
                    console.error(error);
                    alert('An unexpected error occurred');
                }
            }
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
                        <div className="login-panel">
                            <div className="social-login">
                                <button className="social-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                        <path
                                            fill="#EA4335"
                                            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                                        />
                                        <path
                                            fill="#4285F4"
                                            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                                        />
                                        <path
                                            fill="#FBBC05"
                                            d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                                        />
                                        <path
                                            fill="#34A853"
                                            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                                        />
                                        <path fill="none" d="M0 0h48v48H0z" />
                                    </svg>
                                    Google
                                </button>
                            </div>
                            <div className="divider">or</div>
                            <form onSubmit={(e) => { e.preventDefault(); senddata() }}>
                                <div className="form-group">
                                    <input type="text" placeholder="Email" onChange={(e) => { setemail(e.target.value) }} value={email} ref={inputRef} />
                                </div>
                                <div className="form-group">
                                    <input type="password" placeholder="Password" onChange={(e) => { setpass(e.target.value) }} value={pass} />
                                </div>
                                <div className="signup-link">
                                    No Account yet? <a href="/register"> SIGN UP</a>
                                </div>
                                <button type="submit" className="login-btn">
                                    LOG IN
                                </button>
                            </form>
                            <div className="remember-forgot">
                                <a href="#">Forgot password?</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;