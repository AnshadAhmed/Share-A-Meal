import React, { use, useState } from 'react'
import axios from 'axios';
// import '../App.css';
import './Addmeal.css';


import { useNavigate } from 'react-router-dom';



import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';


function Addmeal() {

    const [mealname, setmealName] = useState("")
    const [price, setPrice] = useState("")
    const [location, setLocation] = useState("")
    const [quantity, setQuantity] = useState("")
    const [pickupAddress, setpickupAddress] = useState("")
    const [discription, setDiscription] = useState("")
    const [category, setCategory] = useState("")
    const [option, setOption] = useState("")

    const [profilePic, setProfilePic] = useState(null);

    function handleFileChange(e) {
        setProfilePic(e.target.files[0]);
    }

    const navigate = useNavigate();




    const [error, setError] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const [alertType, setAlertType] = useState("error");

    const [open, setOpen] = useState(true);


    async function senddata(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("mealname", mealname);
        formData.append("price", price);
        formData.append("location", location);
        formData.append("quantity", quantity);
        formData.append("pickupAddress", pickupAddress);
        formData.append("discription", discription);
        formData.append("category", category);
        formData.append("option", option);

        if (profilePic) {
            formData.append("food-image", profilePic);
        }


        try {
            const response = await axios.post("http://localhost:3006/user/addmeal", formData, {
                headers: {
                    'Authorization': `${localStorage.getItem("token")}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data.msg);

            setAlertType("success");
            setAlertMsg(response.data.msg);
            setError(true);
            setOpen(true);

            setTimeout(()=>navigate('/'),2000)

            // alert(response.data.msg);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setAlertMsg(error.response.data.errors[0].msg);
                setError(true);
                setOpen(true);
                setAlertType('error');

                console.log(error);

            }
            else if (error.response && error.response.status === 400) {
                setAlertType('error');
                setAlertMsg(error.response.data.msg);
                setError(true);
                setOpen(true);
            }


            else if (error.response) {
                console.log(error.response);

                alert(`Error ${error.response.status}: ${error.response.statusText}`);
            } else {
                console.error(error);
                alert('An unexpected error occurred');
            }
        }

    }









    return (
        <>
            <div className="add-edit-profile-container">
                <form className="add-edit-profile-edit-form" onSubmit={senddata} encType="multipart/form-data">
                    <div className="add-edit-profile-form-section">
                        <h2 className="add-edit-profile-section-title">Share the meal</h2>
                        <div className="add-form-group">
                            <label>Food Images</label>
                            {/* Image Upload Section */}
                            <div className="add-image-upload-container">
                                <p>Upload a picture of your own food</p>
                                <br />
                                <img
                                    src={profilePic ? URL.createObjectURL(profilePic) : "/OIP.jpeg"}
                                    alt="Meal"
                                    className="add-food-meal-picture"
                                />
                                <label className="add-custom-file-upload">
                                    <input type="file" accept="image/*" name="food-image" onChange={handleFileChange} />
                                    Choose File
                                </label>
                            </div>
                        </div>
                        <br />
                        <br />
                        <div className="add-edit-profile-form-grid">
                            <div className="add-edit-profile-form-group">
                                <label className="form-label">Food Name</label>
                                <input
                                    type="text"
                                    className="edit-profile-form-input"
                                    defaultValue=""
                                    onChange={(e) => setmealName(e.target.value)}

                                />
                            </div>
                            <div className="add-edit-profile-form-group">
                                <label className="add-form-label">Price</label>
                                <input
                                    type="text"
                                    className="edit-profile-form-input"
                                    defaultValue=""
                                    onChange={(e) => setPrice(e.target.value)}

                                />
                            </div>

                            <div className="add-edit-profile-form-group">
                                <label className="add-form-label">Location</label>
                                <input
                                    type="text"
                                    className="edit-profile-form-input"
                                    defaultValue=""
                                    onChange={(e) => setLocation(e.target.value)}


                                />
                            </div>

                            <div className="add-edit-profile-form-group">
                                <label className="add-form-label">Quantity</label>
                                <input
                                    type="text"
                                    className="edit-profile-form-input"
                                    defaultValue=""
                                    onChange={(e) => setQuantity(e.target.value)}

                                />
                            </div>
                            <div className="add-form-group">
                                <label htmlFor="add-delivery-address">
                                    Pickup Address <span className="required" />
                                </label>
                                <textarea
                                    id="add-delivery-address"
                                    name="delivery-address"
                                    placeholder="Enter you'r Location..."
                                    defaultValue=""
                                    onChange={(e) => setpickupAddress(e.target.value)}
                                />
                            </div>

                            <div className="add-form-group">
                                <label htmlFor="add-special-instructions">Discription</label>
                                <textarea
                                    id="add-special-instructions"
                                    name="special-instructions"
                                    placeholder="Allergies, preferences, or special requests..."
                                    defaultValue=""
                                    onChange={(e) => setDiscription(e.target.value)}
                                />
                            </div>

                            <div className="add-edit-profile-form-group">
                                <label className="add-form-label">
                                    Category <span className="required" />
                                </label>
                                <select name="meal" required="" className="edit-profile-form-input" onChange={(e) => setCategory(e.target.value)}>
                                    <option value="">Choose ...</option>
                                    <option value="Veg">Veg</option>
                                    <option value="Non-veg">Non-veg</option>
                                </select>
                            </div>
                            <div className="add-edit-profile-form-group">
                                <label className="add-form-label">
                                    Option <span className="required" />
                                </label>
                                <select name="meal" required="" className="edit-profile-form-input" onChange={(e) => setOption(e.target.value)}>
                                    <option value="">Choose ...</option>
                                    <option value="Sell">Sell</option>
                                    <option value="Donate">Donate</option>
                                </select>
                            </div>

                        </div>
                        <br />
                        <br></br>
                        <button type="submit" className="submit-btn">
                            Add Order
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
    )
}

export default Addmeal