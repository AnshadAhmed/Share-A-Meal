import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import "./Viewnotification.css";
import axios from 'axios';
import Navbar from './Navbar';



const Viewnotification = () => {
    const [notifications, setNotifications] = useState([]);



    useEffect(() => {

        axios.get("http://localhost:3006/user/view-notification", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem("token")}`, // Add token from local storage
            },
        })
            .then(response => {
                setNotifications(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error("Error:", error)

            });

    }, [])







    useEffect(() => {
        document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
        const handleResize = () => {
            document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <Navbar />
            <div className="view-notification-user-container">
                <h2 className="view-notification-user-title">
                    <Bell className="view-notification-user-icon" /> Notifications
                </h2>
                {notifications.length > 0 ? (
                    <div className="view-notification-user-list">
                        {notifications.map((notif) => (
                            <div
                                key={notif._id}
                                className={`view-notification-user-card ${notif.read ? "view-notification-user-read" : ""}`}
                                style={{ animation: "fadeIn 0.5s ease-in-out" }}
                            >
                                <div className="view-notification-user-content">
                                    <span className="view-notification-user-message">{notif.message}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="view-notification-user-empty">No new notifications</p>
                )}
            </div>
        </>
    );
};

export default Viewnotification;
