import React from 'react'
import '../App.css';


function Addmeal() {

    
    return (
        <>
            <div className="add-edit-profile-container">
                <form className="add-edit-profile-edit-form">
                    <div className="add-edit-profile-form-section">
                        <h2 className="add-edit-profile-section-title">Share the meal</h2>
                        <div className="add-form-group">
                            <label>Food Images</label>
                            {/* Image Upload Section */}
                            <div className="add-image-upload-container">
                                <p>Upload a picture of your own food</p>
                                <label className="add-custom-file-upload">
                                    <input type="file" accept="image/*" name="food-image" />
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
                                    defaultValue={9879875474}
                                />
                            </div>
                            <div className="add-edit-profile-form-group">
                                <label className="add-form-label">Phone no</label>
                                <input
                                    type="text"
                                    className="edit-profile-form-input"
                                    defaultValue={9879875474}
                                />
                            </div>
                            <div className="add-form-group">
                                <label>
                                    Category <span className="required" />
                                </label>
                                <select name="meal" required="">
                                    <option value="">Choose ...</option>
                                    <option value="Veg">Veg</option>
                                    <option value="Non-veg">Non-veg</option>
                                </select>
                            </div>
                            <div className="add-edit-profile-form-group">
                                <label className="add-form-label">Quantity</label>
                                <input
                                    type="text"
                                    className="edit-profile-form-input"
                                    defaultValue={1}
                                />
                            </div>
                            <div className="add-form-group">
                                <label htmlFor="add-delivery-address">
                                    Pickup Address <span className="required" />
                                </label>
                                <textarea
                                    id="add-delivery-address"
                                    name="delivery-address"
                                    required=""
                                    placeholder="Enter you'r Location..."
                                    defaultValue={""}
                                />
                            </div>
                            <div className="add-form-group">
                                <label htmlFor="add-special-instructions">Discription</label>
                                <textarea
                                    id="add-special-instructions"
                                    name="special-instructions"
                                    placeholder="Allergies, preferences, or special requests..."
                                    defaultValue={""}
                                />
                            </div>
                            <div className="add-edit-profile-form-group">
                                <label className="edit-profile-form-label">Quantity</label>
                                <input
                                    type="text"
                                    className="edit-profile-form-input"
                                    defaultValue="San Francisco, CA"
                                />
                            </div>
                        </div>
                        <button type="submit" className="submit-btn">
                            Add Order
                        </button>
                    </div>
                </form>
            </div>

        </>
    )
}

export default Addmeal