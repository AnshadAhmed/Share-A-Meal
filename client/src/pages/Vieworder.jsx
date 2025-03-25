import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Vieworder.css";

const Vieworder = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:3006/user/vieworder", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                setOrders(response.data.orders || []);
                console.log(response.data.orders);

            })
            .catch((error) => {
                console.error("Error:", error);
                setError("Failed to fetch orders.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);




    const handleCancelOrder = (orderId) => {
        if (!window.confirm("Are you sure you want to cancel this order?")) return;

        axios
            .post(
                `http://localhost:3006/user/cancelorder/${orderId}`,
                {},
                {
                    headers: { Authorization: `${localStorage.getItem("token")}` },
                }
            )
            .then(() => {
                setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
            })
            .catch((error) => console.error("Error cancelling order:", error));
    };




    return (
        <div className="order-container">
            <h2 className="order-title">Your Orders</h2>

            {loading && <div className="loading">Fetching your orders...</div>}
            {error && <div className="error-message">{error}</div>}

            {orders.length === 0 && !loading ? (
                <p className="no-orders">You have no orders yet.</p>
            ) : (
                <div className="order-list">
                    {orders.map((order) => (
                        <div key={order.id} className="order-card">
                            {order.items.length > 0 && (
                                <img
                                    src={`http://localhost:3006/my-upload/${order.items[0].image}`}
                                    alt="Product"
                                    className="order-image"
                                />
                            )}
                            <div className="order-details">
                                <h3 className="order-id">Order ID: {order.id}</h3>
                                <div className="order-grid">
                                    <p>Meal: <span>{order.items[0]?.name || "N/A"}</span></p>
                                    <p>Total: <span>Rs {order.totalAmount}</span></p>
                                    <p>Quantity: <span>{order.items[0]?.quantity}</span></p>
                                    <p>Status: <span className={order.status === "Pending" ? "pending" : "completed"}>{order.status}</span></p>
                                </div>
                                <div className="order-actions">
                                    <button className="cancel-btn" onClick={() => handleCancelOrder(order.id)}>Cancel</button>
                                    <button className="details-btn" onClick={() => setSelectedOrder(order)}>Details</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedOrder && (
                <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal" onClick={() => setSelectedOrder(null)}>×</button>

                        <div className="modal-header">
                            <h2 className="modal-title">Order Details</h2>
                            <p className="order-id">Order ID: {selectedOrder.id}</p>
                        </div>

                        <div className="two-column-grid">
                            {/* Column 1 */}
                            <div className="grid-column">
                                <div className="detail-item">
                                    <span className="detail-label">Meal:</span>
                                    <span className="detail-value">{selectedOrder.items[0]?.name || "N/A"}</span>
                                </div>

                                <div className="detail-item">
                                    <span className="detail-label">Quantity:</span>
                                    <span className="detail-value">{selectedOrder.items[0]?.quantity}</span>
                                </div>

                                <div className="detail-item">
                                    <span className="detail-label">Category:</span>
                                    <span className={`detail-value category ${selectedOrder.items[0]?.isVeg ? 'veg' : 'non-veg'}`}>
                                        {selectedOrder.items[0]?.isVeg ? 'Veg' : 'Non-Veg'}
                                    </span>
                                </div>

                                <div className="detail-item">
                                    <span className="detail-label">Status:</span>
                                    <span className={`detail-valuestatus${selectedOrder.status.toLowerCase()}`}>
                                        {selectedOrder.status}
                                    </span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Total:</span>
                                    <span className="detail-value" style={{ fontWeight: 600 }}>₹{selectedOrder.totalAmount}</span>
                                </div>


                            </div>

                            {/* Column 2 */}
                            <div className="grid-column">

                                <div className="detail-item">
                                    <span className="detail-label">Supplier:</span>
                                    <span className="detail-value">{selectedOrder.items[0]?.owner.name}</span>
                                </div>

                                <div className="detail-item">
                                    <span className="detail-label">Phone no:</span>
                                    <span className="detail-value">{selectedOrder.items[0]?.owner.phone}</span>
                                </div>

                                <div className="detail-item">
                                    <span className="detail-label">Email:</span>
                                    <span className="detail-value">{selectedOrder.items[0]?.owner.email}</span>
                                </div>

                                <div className="detail-item">
                                    <span className="detail-label">Address:</span>
                                    <h1 className="detail-value-address">{selectedOrder.items[0]?.owner.address}</h1>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Vieworder;
