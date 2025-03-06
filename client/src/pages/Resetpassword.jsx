import React, { useState } from 'react'
import '../App.css';
import { useParams } from "react-router-dom";
import axios from 'axios';





function Resetpassword() {

    const { token } = useParams();


    const[newpassword,setNewpassword]=useState("")
    const[confirmnewpassword,setConfirmnewpassword]=useState("")
    


    async function senddata(){


        try {
            const response = await axios.post(`http://localhost:3006/auth/resetpassword/${token}`, {
                newPassword: newpassword,
                confirmnewpassword:confirmnewpassword
            });

            alert(response.data.msg);
            
        } catch (error) {
            console.log(error);
            alert(error.response.data.msg)
        }

    }



    return (
        <>
            <div className='apx'>
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
                                    <input type="text" placeholder="New password" onChange={(e)=>{setNewpassword(e.target.value)}} value={newpassword}/>
                                </div>
                                <div className="form-group">
                                    <input type="password" placeholder="confirm New Password" onChange={(e)=>{setConfirmnewpassword(e.target.value)}}  value={confirmnewpassword}/>
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