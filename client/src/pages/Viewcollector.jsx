import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Viewcollector.css";
import Swal from 'sweetalert2';


const Viewcollector = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3006/user/supplier-order", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem("token")}`,
            },
        })
            .then(response => {
                setOrders(response.data);
                console.log(response.data);

            })
            .catch(error => console.error("Error:", error));
    }, []);




    const updateOrderStatus = (orderId, newStatus) => {
        axios.patch(`http://localhost:3006/user/update-collector-order/${orderId}`, { status: newStatus }, {
            headers: { "Authorization": `${localStorage.getItem("token")}` },
        })


            .then(() => {
                setOrders(prevOrders => prevOrders.map(order =>
                    order._id === orderId ? { ...order, status: newStatus } : order
                ));

            
                Swal.fire({
                    title: "Done ",
                    icon: "success",
                    draggable: true
                });

            }



            )


   

            .catch (error => {
    console.error("Error updating order:", error)
    console.log(error);
    Swal.fire({
        title: "Hai?",
        text: `${error.response.data.msg}`,
        icon: "info"
    });
});
    };












return (
    <div className="collector-container">
        <h2 className="collector-title">📦 Order Collector Details</h2>
        {orders.length > 0 ? (
            <div className="collector-list">
                {orders.map(order =>
                    order.items.map(item => (
                        <div className="order-card" key={item._id}>
                            {/* Order Header with Status */}
                            <div className="order-header">
                                <h3>Order #{order._id.slice(-6)}</h3>

                            </div>

                            {/* Structured Order Data */}
                            <div className="order-content">
                                {/* Customer Details */}
                                <div className="order-section">
                                    <h4>👤 Customer</h4>
                                    <p><strong>Name:</strong> {order.customer.username}</p>
                                    <p><strong>Email:</strong> {order.customer.email}</p>
                                    <p><strong>Phone:</strong> {order.customer.phone}</p>
                                </div>

                                {/* Product Details */}
                                <div className="order-section">
                                    <h4>🍽 Product</h4>
                                    <p className="product-name">{item.productId.mealname}</p>
                                    <p className="product-description">{item.productId.discription}</p>
                                </div>

                                {/* Order Summary */}
                                <div className="order-section">
                                    <h4>📊 Order Summary</h4>
                                    <p><strong>Quantity: </strong> {item.quantity}</p>
                                    <p><strong>Total: </strong> ₹{order.totalAmount.toFixed(2)}</p>
                                    <p><strong>Ordered: </strong> {new Date(order.createdAt).toLocaleString()}</p>
                                    <p><strong>Payment: </strong> {order.mode}</p>
                                </div>
                            </div>


                            <span className={`status-badge ${order.status.toLowerCase()}`}>
                                {order.status}
                            </span>
                            <br />

                            <div className="collector-button-container">
                                <button
                                    className="collector-button collector-button-confirm"
                                    onClick={() => updateOrderStatus(order._id, "Collected")}
                                // disabled={order.status === "Confirmed"}
                                >
                                    Order Collected
                                </button>
                                <button
                                    className="collector-button collector-button-cancel"
                                    onClick={() => updateOrderStatus(order._id, "Cancelled")}
                                // disabled={order.status === "Cancelled"}
                                >
                                    Cancel Order
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        ) : (
            <p className="no-orders">🚫 No Customers found</p>
        )}
    </div>
);
};

export default Viewcollector;
