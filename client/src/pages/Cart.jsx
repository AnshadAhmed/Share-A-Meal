import React, { useState, useEffect, useCallback } from 'react';
import './Cart.css';
import axios from 'axios';

import Navbar from './Navbar';


import { FaEdit, FaTrash } from "react-icons/fa";


import Swal from 'sweetalert2';


const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [upiVerified, setUpiVerified] = useState(false);
    const [upiValue, setUpiValue] = useState('');
    const [checkoutProcessing, setCheckoutProcessing] = useState(false);
    const [subtotal, setSubtotal] = useState(0);

    // Fetch cart items from the backend
    useEffect(() => {
        axios.get("http://localhost:3006/user/viewcart", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem("token")}`,
            },
        })
            .then(response => {
                setCartItems(response.data);
            })
            .catch(error => console.error("Error:", error));
    }, []);





    // Update subtotal when cart items change



    useEffect(() => {
        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setSubtotal(total);
    }, [cartItems]);






    const handleQuantityChange = useCallback((id, increment) => {
        setCartItems(prevItems =>
            prevItems.map(item => {
                if (item._id === id) {
                    let newQuantity = item.quantity;
                    if (increment && newQuantity < item.inquantity) newQuantity += 1;
                    else if (!increment && newQuantity > 1) newQuantity -= 1;
                    return { ...item, quantity: newQuantity };
                }

                return item;
            })
        );
    }, []);





    const deleteItem = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`http://localhost:3006/user/viewcart/del/${id}`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `${localStorage.getItem("token")}`, // Add token from local storage
                        },
                    });

                    if (response.status === 200) {
                        setCartItems(cartItems.filter((item) => item._id !== id)); // Remove from UI

                        Swal.fire(
                            "Deleted!",
                            "Your item has been deleted.",
                            "success"
                        );
                    } else {
                        Swal.fire("Error!", "Failed to delete the item.", "error");
                    }
                } catch (error) {
                    Swal.fire("Error!", "Something went wrong.", "error");
                    console.log(error);

                }
            }
        });
    };














    const handleUpiChange = (e) => {
        setUpiValue(e.target.value);
    };

    const verifyUpi = () => {
        const upiPattern = /^[\w.-]+@[a-zA-Z]+$/;
        if (upiPattern.test(upiValue)) {
            setUpiVerified(true);
        } else {
            setUpiVerified(false);
            alert('Invalid UPI ID. Format should be name@bank');
        }
    };

    const handleCheckout = () => {
        if (paymentMethod === 'upi' && !upiVerified) {
            alert('Please verify your UPI ID before proceeding to checkout');
            return;
        }

        setCheckoutProcessing(true);
        setTimeout(() => {
            setCheckoutProcessing(false);
            alert('This is a demo. In a real implementation, you would be redirected to complete your purchase.');
        }, 1500);
    };


    return (
        <>
            <Navbar />

            <div className="alpha-cart-container">
                <div className="alpha-cart-left">
                    <div className="alpha-cart-bag">
                        <h1 className="alpha-cart-title">Shopping Bag</h1>
                        <p className="alpha-cart-items-count">{cartItems.length} items in the bag</p>

                        <table className="alpha-cart-table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total Price</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item, index) => (
                                    <React.Fragment key={item._id}>
                                        <tr>
                                            <td>
                                                <div className="alpha-cart-product">
                                                    <img src={`http://localhost:3006/my-upload/${item.image}`} className="alpha-cart-product-img" alt={item.name} />
                                                    <div className="alpha-cart-product-info">
                                                        <div className="alpha-cart-product-name">{item.name}</div>
                                                        <div className="alpha-cart-product-description">{item.prdiscription}</div>
                                                        <div className="alpha-cart-product-available">Available: {item.inquantity} in stock</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="alpha-cart-price">{item.price}</td>
                                            <td>
                                                <div className="alpha-cart-quantity">
                                                    <button className="alpha-cart-quantity-btn decrement" onClick={() => handleQuantityChange(item._id, false)}>-</button>
                                                    <input type="text" className="alpha-cart-quantity-input" value={item.quantity} readOnly />
                                                    <button className="alpha-cart-quantity-btn increment" onClick={() => handleQuantityChange(item._id, true)}>+</button>
                                                </div>
                                            </td>
                                            <td className="alpha-cart-total-price alpha-cart-total-price-green">{item.price * item.quantity}</td>
                                            <td>
                                                <span className="alpha-cart-delete" onClick={() => deleteItem(item._id)}><FaTrash /></span>
                                            </td>
                                        </tr>
                                        {index < cartItems.length - 1 && (
                                            <tr>
                                                <td colSpan="5"><div className="alpha-cart-item-divider"></div></td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="alpha-cart-right">
                    <div className="alpha-cart-payment">
                        <h2 className="alpha-cart-payment-title">Payment Method</h2>
                        <div className="alpha-cart-payment-options">
                            <div
                                className={`alpha-cart-payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}
                                onClick={() => setPaymentMethod('cod')}
                            >
                                <div className="alpha-cart-payment-radio"></div>
                                <div className="alpha-cart-payment-icon">💰</div>
                                <div className="alpha-cart-payment-details">
                                    <div className="alpha-cart-payment-name">Cash on Delivery</div>
                                    <div className="alpha-cart-payment-description">Pay when your order arrives</div>
                                </div>
                            </div>

                            <div
                                className={`alpha-cart-payment-option ${paymentMethod === 'upi' ? 'selected' : ''}`}
                                onClick={() => setPaymentMethod('upi')}
                            >
                                <div className="alpha-cart-payment-radio"></div>
                                <div className="alpha-cart-payment-icon">📱</div>
                                <div className="alpha-cart-payment-details">
                                    <div className="alpha-cart-payment-name">UPI Payment</div>
                                    <div className="alpha-cart-payment-description">Google Pay, PhonePe, Paytm, etc.</div>
                                </div>
                            </div>

                            <div className={`alpha-cart-upi-form ${paymentMethod === 'upi' ? 'active' : ''}`}>
                                <input
                                    type="text"
                                    className="alpha-cart-upi-input"
                                    placeholder="Enter your UPI ID (e.g. name@upi)"
                                    value={upiValue}
                                    onChange={handleUpiChange}
                                    style={{ borderColor: upiVerified ? '#3dd598' : '' }}
                                />
                                <button
                                    className="alpha-cart-upi-verify-btn"
                                    onClick={verifyUpi}
                                    style={{ backgroundColor: upiVerified ? '#3dd598' : '' }}
                                >
                                    {upiVerified ? '✓ Verified' : 'Verify UPI'}
                                </button>
                            </div>
                        </div>
                    </div>


                    <div className="alpha-cart-total">
                        <h2 className="alpha-cart-total-title">Cart Total</h2>
                        <div className="alpha-cart-total-row"><span>Subtotal:</span><span>{subtotal}</span></div>
                        <button className="alpha-cart-checkout-btn" onClick={handleCheckout}>
                            {checkoutProcessing ? 'Processing...' : 'Proceed to Checkout'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
